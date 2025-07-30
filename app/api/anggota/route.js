// app/api/anggota/route.js
// Ini adalah Next.js API Route yang terhubung ke MongoDB Atlas menggunakan Mongoose.
// Data akan disimpan secara persisten di MongoDB Atlas.

import mongoose from "mongoose";
import { NextResponse } from "next/server";

// --- Konfigurasi MongoDB ---
// Ambil URI koneksi MongoDB dari variabel lingkungan.
// Pastikan Anda telah mengatur MONGODB_URI di file .env.local Anda.
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Skema Mongoose untuk model Anggota
const AnggotaSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    angkatan: { type: String, required: true },
    jurusan: { type: String },
    instansi: { type: String },
    nomor_kontak: { type: String },
    email: { type: String, required: true, unique: true },
    alamat: { type: String },
    status: { type: String, enum: ["Aktif", "Tidak Aktif"], default: "Aktif" },
    profile_image_url: { type: String },
    tanggal_daftar: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
); // `timestamps: true` akan menambahkan createdAt dan updatedAt secara otomatis

// Pastikan model tidak dibuat ulang jika sudah ada
const Anggota =
  mongoose.models.Anggota || mongoose.model("Anggota", AnggotaSchema);

// Fungsi untuk menghubungkan ke database
async function connectDB() {
  if (mongoose.connections[0].readyState) {
    // Gunakan koneksi yang sudah ada jika sudah terhubung
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Terhubung ke MongoDB Atlas.");
  } catch (error) {
    console.error("Gagal terhubung ke MongoDB Atlas:", error);
    throw new Error("Koneksi database gagal.");
  }
}

// Handler untuk metode GET (mengambil semua anggota dengan filter, pencarian, dan paginasi)
export async function GET(request) {
  try {
    await connectDB(); // Pastikan terhubung ke DB

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("searchTerm") || "";
    const filterStatus = searchParams.get("filterStatus") || "all";
    const page = parseInt(searchParams.get("page")) || 1; // Halaman saat ini, default 1
    const limit = parseInt(searchParams.get("limit")) || 10; // Item per halaman, default 10

    let queryConditions = {};

    // Terapkan filter status
    if (filterStatus === "active") {
      queryConditions.is_active = true;
    } else if (filterStatus === "inactive") {
      queryConditions.is_active = false;
    }

    // Terapkan pencarian (case-insensitive regex untuk pencarian fleksibel)
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // 'i' untuk case-insensitive
      queryConditions.$or = [
        { nama: { $regex: regex } },
        { angkatan: { $regex: regex } },
        { email: { $regex: regex } },
        { nomor_kontak: { $regex: regex } },
      ];
    }

    // Hitung total dokumen yang cocok dengan filter dan pencarian
    const totalCount = await Anggota.countDocuments(queryConditions);

    // Hitung offset untuk paginasi
    const skip = (page - 1) * limit;

    // Ambil data anggota dengan paginasi
    const anggotaList = await Anggota.find(queryConditions)
      .skip(skip)
      .limit(limit)
      .lean(); // .lean() untuk mendapatkan objek JS biasa

    // Format tanggal untuk konsistensi dengan data dummy sebelumnya jika diperlukan
    const formattedAnggotaList = anggotaList.map((anggota) => {
      const date = new Date(anggota.tanggal_daftar);
      return {
        ...anggota,
        tanggalDaftar: date.toISOString().split("T")[0], // YYYY-MM-DD
        jamDaftar: date.toTimeString().split(" ")[0].substring(0, 5), // HH:MM
        id: anggota._id.toString(), // Konversi ObjectId ke string untuk ID frontend
      };
    });

    return NextResponse.json(
      {
        data: formattedAnggotaList,
        total: totalCount,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalCount / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching anggota:", error);
    return NextResponse.json(
      { message: "Gagal memuat data anggota.", error: error.message },
      { status: 500 }
    );
  }
}

// Handler untuk metode POST (menambahkan anggota baru)
export async function POST(request) {
  try {
    await connectDB(); // Pastikan terhubung ke DB
    const newAnggotaData = await request.json();

    // Validasi data dasar
    if (!newAnggotaData.nama || !newAnggotaData.email) {
      return NextResponse.json(
        { message: "Nama dan email wajib diisi." },
        { status: 400 }
      );
    }

    // Pastikan is_active sesuai dengan status yang diberikan
    newAnggotaData.is_active = newAnggotaData.status === "Aktif" ? true : false;

    // Hapus profileImage dari data karena kita hanya menyimpan URL-nya
    delete newAnggotaData.profileImage;

    // Jika profile_image_url tidak disediakan, gunakan placeholder
    if (!newAnggotaData.profile_image_url) {
      newAnggotaData.profile_image_url = `https://placehold.co/40x40/e0e0e0/000000?text=${newAnggotaData.nama
        .charAt(0)
        .toUpperCase()}`;
    }

    const createdAnggota = await Anggota.create(newAnggotaData);

    // Format data yang dikembalikan agar konsisten dengan frontend
    const date = new Date(createdAnggota.tanggal_daftar);
    const formattedResponse = {
      ...createdAnggota.toObject(),
      tanggalDaftar: date.toISOString().split("T")[0],
      jamDaftar: date.toTimeString().split(" ")[0].substring(0, 5),
      id: createdAnggota._id.toString(),
    };

    return NextResponse.json(formattedResponse, { status: 201 });
  } catch (error) {
    console.error("Error adding anggota:", error);
    // Handle duplicate email error
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      return NextResponse.json(
        { message: "Email sudah terdaftar. Gunakan email lain." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Gagal menambahkan anggota.", error: error.message },
      { status: 500 }
    );
  }
}

// Handler untuk metode PUT (mengupdate anggota berdasarkan ID)
export async function PUT(request) {
  try {
    await connectDB(); // Pastikan terhubung ke DB
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID anggota wajib disertakan untuk update." },
        { status: 400 }
      );
    }

    // Pastikan is_active sesuai dengan status yang diberikan jika status diubah
    if (updates.status !== undefined) {
      updates.is_active = updates.status === "Aktif" ? true : false;
    }

    // Hapus profileImage dari updates jika ada, karena kita tidak menyimpannya langsung
    delete updates.profileImage;

    const updatedAnggota = await Anggota.findByIdAndUpdate(id, updates, {
      new: true,
    }).lean(); // { new: true } mengembalikan dokumen yang sudah diupdate

    if (!updatedAnggota) {
      return NextResponse.json(
        { message: "Anggota tidak ditemukan." },
        { status: 404 }
      );
    }

    // Format data yang dikembalikan agar konsisten dengan frontend
    const date = new Date(updatedAnggota.tanggal_daftar);
    const formattedResponse = {
      ...updatedAnggota,
      tanggalDaftar: date.toISOString().split("T")[0],
      jamDaftar: date.toTimeString().split(" ")[0].substring(0, 5),
      id: updatedAnggota._id.toString(),
    };

    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("Error updating anggota:", error);
    return NextResponse.json(
      { message: "Gagal mengupdate anggota.", error: error.message },
      { status: 500 }
    );
  }
}

// Handler untuk metode DELETE (menghapus anggota berdasarkan ID)
export async function DELETE(request) {
  try {
    await connectDB(); // Pastikan terhubung ke DB
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID anggota tidak valid." },
        { status: 400 }
      );
    }

    const deletedAnggota = await Anggota.findByIdAndDelete(id).lean();

    if (!deletedAnggota) {
      return NextResponse.json(
        { message: "Anggota tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Anggota dengan ID ${id} berhasil dihapus.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting anggota:", error);
    return NextResponse.json(
      { message: "Gagal menghapus anggota.", error: error.message },
      { status: 500 }
    );
  }
}

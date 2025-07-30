// app/api/anggota/[id]/route.js
// Ini adalah Next.js API Route dinamis untuk mengambil, mengupdate, atau menghapus anggota berdasarkan ID.

import mongoose from "mongoose";
import { NextResponse } from "next/server";

// --- Konfigurasi MongoDB ---
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
);

// Pastikan model tidak dibuat ulang jika sudah ada
const Anggota =
  mongoose.models.Anggota || mongoose.model("Anggota", AnggotaSchema);

// Fungsi untuk menghubungkan ke database
async function connectDB() {
  if (mongoose.connections[0].readyState) {
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

// Handler untuk metode GET (mengambil anggota berdasarkan ID)
// 'request' adalah objek Request, 'params' berisi parameter dinamis dari URL (misal: { id: '...' })
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params; // Mengambil ID langsung dari params

    if (!id) {
      return NextResponse.json(
        { message: "ID anggota tidak valid." },
        { status: 400 }
      );
    }

    const anggota = await Anggota.findById(id).lean();

    if (!anggota) {
      return NextResponse.json(
        { message: "Anggota tidak ditemukan." },
        { status: 404 }
      );
    }

    // Format tanggal untuk konsistensi dengan frontend
    const date = new Date(anggota.tanggal_daftar);
    const formattedAnggota = {
      ...anggota,
      tanggalDaftar: date.toISOString().split("T")[0], // YYYY-MM-DD
      jamDaftar: date.toTimeString().split(" ")[0].substring(0, 5), // HH:MM
      id: anggota._id.toString(), // Konversi ObjectId ke string
    };

    return NextResponse.json(formattedAnggota, { status: 200 });
  } catch (error) {
    console.error("Error fetching anggota by ID:", error);
    return NextResponse.json(
      { message: "Gagal memuat data anggota.", error: error.message },
      { status: 500 }
    );
  }
}

// Catatan: Fungsi PUT dan DELETE juga bisa ditambahkan di sini
// jika Anda ingin rute dinamis untuk update/delete berdasarkan ID.
// Namun, untuk saat ini, PUT dan DELETE masih di /api/anggota/route.js
// yang menerima ID di body atau query parameter.

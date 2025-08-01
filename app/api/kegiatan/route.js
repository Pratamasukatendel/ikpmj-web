// app/api/kegiatan/route.js

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Kegiatan from "@/models/Kegiatan";
import mongoose from "mongoose";

/**
 * @method GET
 * @description Mengambil daftar semua kegiatan.
 * @returns {NextResponse} Sebuah objek JSON berisi daftar kegiatan atau pesan error.
 */
export async function GET() {
  try {
    await connectMongoDB();
    // Mengambil semua dokumen kegiatan dari database
    const kegiatan = await Kegiatan.find({});
    return NextResponse.json(kegiatan, { status: 200 });
  } catch (error) {
    console.error("Error fetching all kegiatan:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data kegiatan.", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method POST
 * @description Membuat kegiatan baru.
 * @param {Request} request - Objek permintaan dari client, berisi data kegiatan.
 * @returns {NextResponse} Sebuah objek JSON berisi kegiatan yang baru dibuat atau pesan error.
 */
export async function POST(request) {
  try {
    await connectMongoDB();
    // Mengambil data dari body permintaan
    const body = await request.json();

    // Validasi data input
    if (
      !body.judul ||
      !body.deskripsi ||
      !body.tanggal_mulai ||
      !body.tanggal_selesai ||
      !body.lokasi ||
      !body.gambar_poster ||
      !body.user_id
    ) {
      return NextResponse.json(
        { message: "Semua field harus diisi." },
        { status: 400 }
      );
    }

    // Membuat dokumen kegiatan baru di database
    const newKegiatan = await Kegiatan.create(body);

    return NextResponse.json(
      { message: "Kegiatan berhasil ditambahkan!", kegiatan: newKegiatan },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating kegiatan:", error);
    // Menangani error validasi Mongoose
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { message: "Validasi gagal", errors: messages },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Gagal menambahkan kegiatan.", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @description Memperbarui data kegiatan berdasarkan ID.
 * @param {Request} request - Objek permintaan dari client, berisi data update.
 * @returns {NextResponse} Sebuah objek JSON berisi kegiatan yang diperbarui atau pesan error.
 */
export async function PUT(request) {
  try {
    const { _id, ...updateData } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { message: "ID kegiatan diperlukan untuk update." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Mencari dan memperbarui dokumen berdasarkan ID
    const updatedKegiatan = await Kegiatan.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true } // Mengembalikan dokumen yang diperbarui & menjalankan validasi skema
    );

    if (!updatedKegiatan) {
      return NextResponse.json(
        { message: "Kegiatan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Kegiatan berhasil diperbarui!", kegiatan: updatedKegiatan },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating kegiatan:", error);
    if (error instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { message: "Validasi gagal", errors: messages },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Gagal memperbarui kegiatan.", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @description Menghapus kegiatan berdasarkan ID.
 * @param {Request} request - Objek permintaan, berisi ID kegiatan.
 * @returns {NextResponse} Sebuah objek JSON dengan pesan sukses atau error.
 */
export async function DELETE(request) {
  try {
    const { _id } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { message: "ID kegiatan diperlukan untuk menghapus." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    // Mencari dan menghapus dokumen berdasarkan ID
    const deletedKegiatan = await Kegiatan.findByIdAndDelete(_id);

    if (!deletedKegiatan) {
      return NextResponse.json(
        { message: "Kegiatan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Kegiatan berhasil dihapus!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting kegiatan:", error);
    return NextResponse.json(
      { message: "Gagal menghapus kegiatan.", error: error.message },
      { status: 500 }
    );
  }
}

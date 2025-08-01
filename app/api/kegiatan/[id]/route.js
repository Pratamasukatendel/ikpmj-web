// app/api/kegiatan/[id]/route.js

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Kegiatan from "@/models/Kegiatan";

/**
 * @method GET
 * @description Mengambil satu kegiatan berdasarkan ID.
 * @param {Request} request - Objek permintaan.
 * @param {object} context - Objek konteks Next.js, berisi parameter URL.
 * @param {object} context.params - Berisi parameter dinamis dari URL, seperti `id`.
 * @returns {NextResponse} Sebuah objek JSON berisi data kegiatan atau pesan error.
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    // Mencari dokumen kegiatan berdasarkan ID
    const kegiatan = await Kegiatan.findById(id);

    if (!kegiatan) {
      return NextResponse.json(
        { message: "Kegiatan tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(kegiatan, { status: 200 });
  } catch (error) {
    console.error("Error fetching single kegiatan:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data kegiatan.", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @description Memperbarui data kegiatan berdasarkan ID.
 * @param {Request} request - Objek permintaan dari client, berisi data update.
 * @param {object} context - Objek konteks Next.js, berisi parameter URL.
 * @param {object} context.params - Berisi parameter dinamis dari URL, seperti `id`.
 * @returns {NextResponse} Sebuah objek JSON berisi kegiatan yang diperbarui atau pesan error.
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updateData = await request.json();
    await connectMongoDB();

    // Mencari dan memperbarui dokumen berdasarkan ID
    const updatedKegiatan = await Kegiatan.findByIdAndUpdate(id, updateData, {
      new: true, // Mengembalikan dokumen yang diperbarui
      runValidators: true, // Menjalankan validasi skema
    });

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
    return NextResponse.json(
      { message: "Gagal memperbarui kegiatan.", error: error.message },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @description Menghapus kegiatan berdasarkan ID.
 * @param {Request} request - Objek permintaan.
 * @param {object} context - Objek konteks Next.js, berisi parameter URL.
 * @param {object} context.params - Berisi parameter dinamis dari URL, seperti `id`.
 * @returns {NextResponse} Sebuah objek JSON dengan pesan sukses atau error.
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();

    // Mencari dan menghapus dokumen berdasarkan ID
    const deletedKegiatan = await Kegiatan.findByIdAndDelete(id);

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

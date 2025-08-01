// File: app/api/pengumuman/[id]/route.js
// Deskripsi: Handler untuk GET (by ID), PUT, dan DELETE, disesuaikan dengan koneksi Anda.

import { connectMongoDB } from "@/lib/mongodb"; // Disesuaikan
import Pengumuman from "@/models/Pengumuman";
import { NextResponse } from "next/server";

// --- Handler untuk method GET (Mengambil Satu Pengumuman by ID) ---
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB(); // Disesuaikan
    const pengumuman = await Pengumuman.findOne({ _id: id });

    if (!pengumuman) {
      return NextResponse.json({ message: "Pengumuman tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ pengumuman }, { status: 200 });
  } catch (error) {
    console.error("API GET by ID Error:", error);
    return NextResponse.json({ message: `Gagal mengambil data: ${error.message}` }, { status: 500 });
  }
}

// --- Handler untuk method PUT (Update Pengumuman by ID) ---
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const payload = await request.json();
    
    await connectMongoDB(); // Disesuaikan

    const updatedPengumuman = await Pengumuman.findByIdAndUpdate(id, payload, { new: true });

    if (!updatedPengumuman) {
      return NextResponse.json({ message: "Pengumuman tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ message: "Pengumuman berhasil diperbarui.", data: updatedPengumuman }, { status: 200 });
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json({ message: `Gagal memperbarui data: ${error.message}` }, { status: 500 });
  }
}

// --- Handler untuk method DELETE (Hapus Pengumuman by ID) ---
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectMongoDB(); // Disesuaikan
    const deletedPengumuman = await Pengumuman.findByIdAndDelete(id);

    if (!deletedPengumuman) {
      return NextResponse.json({ message: "Pengumuman tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ message: "Pengumuman berhasil dihapus." }, { status: 200 });
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json({ message: `Gagal menghapus data: ${error.message}` }, { status: 500 });
  }
}

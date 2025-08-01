// File: app/api/pengumuman/route.js
// Deskripsi: Handler untuk request GET dan POST dengan error reporting yang lebih baik.

import { connectMongoDB } from "@/lib/mongodb"; // Diubah sesuai dengan file Anda
import Pengumuman from "@/models/Pengumuman";
import { NextResponse } from "next/server";

// --- Handler untuk method POST (Membuat Pengumuman Baru) ---
export async function POST(request) {
  try {
    const { 
      judul, 
      isi, 
      tanggal_publikasi, 
      tanggal_berakhir, 
      status, 
      penulis, 
      lampiran_url 
    } = await request.json();

    await connectMongoDB(); // Diubah sesuai dengan file Anda
    await Pengumuman.create({ 
      judul, 
      isi, 
      tanggal_publikasi, 
      tanggal_berakhir, 
      status, 
      penulis, 
      lampiran_url 
    });

    return NextResponse.json(
      { message: "Pengumuman berhasil dibuat." },
      { status: 201 }
    );
  } catch (error) {
    // Mengirim respons error yang lebih spesifik untuk debugging
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: `Gagal membuat pengumuman: ${error.message}` },
      { status: 500 }
    );
  }
}

// --- Handler untuk method GET (Mengambil Semua Pengumuman) ---
export async function GET() {
  try {
    await connectMongoDB(); // Diubah sesuai dengan file Anda
    const pengumumans = await Pengumuman.find().sort({ createdAt: -1 });
    return NextResponse.json({ pengumumans });
  } catch (error) {
    // Mengirim respons error yang lebih spesifik untuk debugging
    console.error("API GET Error:", error);
    return NextResponse.json(
      { message: `Gagal mengambil data: ${error.message}` },
      { status: 500 }
    );
  }
}

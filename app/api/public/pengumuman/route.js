// File: app/api/public/pengumuman/route.js
// Deskripsi: API route ini khusus untuk halaman user, hanya mengambil pengumuman yang berstatus "Aktif".

import { connectMongoDB } from "@/lib/mongodb";
import Pengumuman from "@/models/Pengumuman";
import { NextResponse } from "next/server";

// --- Handler untuk method GET (Mengambil Semua Pengumuman Aktif) ---
export async function GET() {
  try {
    await connectMongoDB();

    // Mengambil semua dokumen yang statusnya "Aktif" dan mengurutkannya dari yang terbaru
    const pengumumans = await Pengumuman.find({ status: "Aktif" }).sort({
      createdAt: -1,
    });

    // Mengirim data sebagai respons
    return NextResponse.json({ pengumumans });
  } catch (error) {
    console.error("API GET Publik Error:", error);
    return NextResponse.json(
      { message: `Gagal mengambil data: ${error.message}` },
      { status: 500 }
    );
  }
}

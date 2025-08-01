// app/api/dashboard/stats/route.js

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Kegiatan from "@/models/Kegiatan";
// Asumsi: Anda sudah memiliki model untuk Anggota
// import Anggota from "@/models/Anggota";
import mongoose from "mongoose";

// Handler untuk metode GET (mengambil semua statistik dashboard)
export async function GET() {
  try {
    await connectMongoDB();

    // Data dari koleksi kegiatan
    const totalKegiatan = await Kegiatan.countDocuments({});
    const kegiatanAktifCount = await Kegiatan.countDocuments({
      status: "Aktif",
    });
    const kegiatanSelesaiCount = await Kegiatan.countDocuments({
      status: "Selesai",
    });
    const kegiatanTerbaru = await Kegiatan.find({})
      .sort({ tanggal_mulai: -1 })
      .limit(3);

    // Data dari koleksi anggota (jika ada)
    // const totalAnggota = await Anggota.countDocuments({});
    // const anggotaAktifCount = await Anggota.countDocuments({ status: "Aktif" });

    // Karena model Anggota tidak disediakan, saya menggunakan data dummy
    const totalAnggota = 120; // Data dummy
    const anggotaAktifCount = 8; // Data dummy

    // Asumsi: Pengumuman Aktif juga akan difilter dari koleksi pengumuman
    // const pengumumanAktifCount = await Pengumuman.countDocuments({ status: "Aktif" });
    const pengumumanAktifCount = 3; // Data dummy

    const stats = {
      totalAnggota,
      anggotaAktif: anggotaAktifCount,
      kegiatanAktif: kegiatanAktifCount,
      pengumumanAktif: pengumumanAktifCount,
      recentKegiatan: kegiatanTerbaru,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { message: "Gagal memuat statistik dashboard.", error: error.message },
      { status: 500 }
    );
  }
}

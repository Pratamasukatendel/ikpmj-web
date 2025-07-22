// app/admin/laporan/page.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import TabelLaporanKegiatan from "@/app/component/admin/tabelLaporanKegiatan"; // Import komponen laporan kegiatan

export default function Laporan() {
  const [searchTerm, setSearchTerm] = useState("");

  // Handler untuk perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1">
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Laporan Kegiatan Selesai
            </h1>
          </header>

          {/* Pencarian */}
          {/* Menambahkan styling shadow, rounded, dan border ke div pembungkus pencarian */}
          <div className="p-4  mb-4 flex justify-end">
            <input
              type="text"
              placeholder="Cari Judul, Lokasi, Jenis Kegiatan..."
              value={searchTerm}
              onChange={handleSearchChange}
              // Mengubah w-full max-w-lg menjadi w-full agar input mengisi lebar div pembungkusnya
              // dan membiarkan max-w-lg di div pembungkus jika ingin membatasi lebar total
              className="block max-w-lg w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
            />
          </div>

          {/* Tabel Laporan Kegiatan */}
          <TabelLaporanKegiatan searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}

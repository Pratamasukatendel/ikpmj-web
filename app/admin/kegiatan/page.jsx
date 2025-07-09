// app/admin/kegiatan/page.jsx
"use client"; // Pastikan ini ada jika menggunakan hooks atau interaktivitas klien

import React, { useState } from "react"; // Import useState
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import TabelKegiatan from "@/app/component/admin/tabelKegiatan";
import Link from "next/link";
// import Image from "next/image"; // Tidak digunakan lagi, diganti dengan SVG inline

export default function Kegiatan() {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian
  const [filterStatus, setFilterStatus] = useState("all"); // State untuk filter kegiatan ('all', 'inactive')

  // Handler untuk perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Di sini Anda bisa menambahkan logika untuk memfilter data TabelKegiatan
    // berdasarkan searchTerm, mungkin dengan passing searchTerm sebagai prop ke TabelKegiatan
  };

  // Handler untuk perubahan filter status
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    // Di sini Anda bisa menambahkan logika untuk memfilter data TabelKegiatan
    // berdasarkan filterStatus
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {" "}
      {/* Menambahkan min-h-screen dan bg-gray-100 */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {" "}
        {/* Menggunakan flex-1 untuk mengisi sisa lebar */}
        <Navbar />
        <div className="p-7 flex-1">
          {" "}
          {/* flex-1 agar konten mengisi ruang vertikal */}
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Manajemen Kegiatan
            </h1>
          </header>
          {/* Filter dan Tombol Tambah */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            {/* Filter Kegiatan */}
            <ul className="flex gap-6 text-lg font-medium">
              {" "}
              {/* Mengubah gap dan ukuran font */}
              <li>
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`pb-1 border-b-2 transition-colors duration-200 ${
                    filterStatus === "all"
                      ? "border-amber-500 text-amber-500"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Semua Kegiatan
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterChange("inactive")}
                  className={`pb-1 border-b-2 transition-colors duration-200 ${
                    filterStatus === "inactive"
                      ? "border-amber-500 text-amber-500"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Tidak Aktif (1)
                </button>
              </li>
            </ul>

            {/* Pencarian dan Tombol Tambah */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {" "}
              {/* Responsif untuk pencarian dan tombol */}
              <input
                id="search"
                name="search"
                type="text"
                placeholder="Cari Kegiatan..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full sm:w-64 rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
              />
              <Link
                href={"/admin/kegiatan/tambah"}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {/* SVG inline untuk ikon plus */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 5.25a.75.75 0 0 1 .75.75v5.25H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0v-5.25H6a.75.75 0 0 1 0-1.5h5.25V6a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Tambah Kegiatan
              </Link>
            </div>
          </div>
          {/* Tabel Kegiatan */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <TabelKegiatan
              searchTerm={searchTerm}
              filterStatus={filterStatus}
            />{" "}
            {/* Meneruskan props ke TabelKegiatan */}
          </div>
        </div>
      </div>
    </div>
  );
}

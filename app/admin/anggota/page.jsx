// app/admin/anggota/page.jsx
"use client"; // Pastikan ini ada jika menggunakan hooks atau interaktivitas klien

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import TabelAnggota from "@/app/component/admin/tabelAnggota";
import Link from "next/link";

export default function Anggota() {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian
  // State untuk filter anggota ('all', 'active', 'inactive')
  const [filterStatus, setFilterStatus] = useState("all");

  // Handler untuk perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handler untuk perubahan filter status
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1">
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Manajemen Anggota
            </h1>
          </header>

          {/* Filter dan Tombol Tambah */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            {/* Filter Anggota */}
            <ul className="flex flex-wrap gap-4 text-lg font-medium">
              <li>
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`pb-1 border-b-2 transition-colors duration-200 ${
                    filterStatus === "all"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Semua Anggota
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterChange("active")}
                  className={`pb-1 border-b-2 transition-colors duration-200 ${
                    filterStatus === "active"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Aktif
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleFilterChange("inactive")}
                  className={`pb-1 border-b-2 transition-colors duration-200 ${
                    filterStatus === "inactive"
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Tidak Aktif
                </button>
              </li>
              {/* Opsi "Pending" dihapus */}
            </ul>

            {/* Pencarian dan Tombol Tambah */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                id="search"
                name="search"
                type="text"
                placeholder="Cari Anggota..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full sm:w-64 rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
              />

              <Link
                href={"/admin/anggota/tambah"}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                {/* Ikon Plus (SVG) */}
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
                Tambah Anggota
              </Link>
            </div>
          </div>

          {/* Tabel Anggota */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <TabelAnggota searchTerm={searchTerm} filterStatus={filterStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

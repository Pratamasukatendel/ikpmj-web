// app/admin/surat/page.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";
import TabelSuratMasuk from "@/app/component/admin/tabelSuratMasuk"; // Import komponen tabel surat masuk
import TabelSuratKeluar from "@/app/component/admin/tabelSuratKeluar"; // Import komponen tabel surat keluar

export default function Surat() {
  const [activeTab, setActiveTab] = useState("masuk"); // State untuk mengelola tab aktif: 'masuk' atau 'keluar'
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian
  // Anda bisa menambahkan state lain untuk filter tanggal/pengirim di sini jika diperlukan pada halaman utama

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
              Manajemen Surat
            </h1>
          </header>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("masuk")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
                activeTab === "masuk"
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Surat Masuk
            </button>
            <button
              onClick={() => setActiveTab("keluar")}
              className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
                activeTab === "keluar"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Surat Keluar
            </button>
          </div>

          {/* Search and Add Button */}
          <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-6 mb-8">
            <input
              type="text"
              placeholder={
                activeTab === "masuk"
                  ? "Cari Surat Masuk..."
                  : "Cari Surat Keluar..."
              }
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full sm:w-64 rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
            />

            <Link
              href={
                activeTab === "masuk"
                  ? "/admin/surat/masuk/tambah"
                  : "/admin/surat/keluar/tambah"
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
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
              Tambah Surat {activeTab === "masuk" ? "Masuk" : "Keluar"}
            </Link>
          </div>

          {/* Tabel yang dirender berdasarkan tab aktif */}
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            {activeTab === "masuk" ? (
              <TabelSuratMasuk searchTerm={searchTerm} />
            ) : (
              <TabelSuratKeluar searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

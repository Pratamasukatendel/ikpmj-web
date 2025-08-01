// app/admin/kegiatan/page.jsx
"use client"; // Pastikan ini ada jika menggunakan hooks atau interaktivitas klien

import React, { useState, useEffect } from "react"; // Import useState dan useEffect
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import TabelKegiatan from "@/app/component/admin/tabelKegiatan";
import Link from "next/link";

export default function Kegiatan() {
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian
  const [filterStatus, setFilterStatus] = useState("all"); // State untuk filter kegiatan ('all', 'selesai', dll)
  const [kegiatanData, setKegiatanData] = useState([]); // State untuk menyimpan data dari API
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [selesaiCount, setSelesaiCount] = useState(0); // State untuk menyimpan hitungan kegiatan "Selesai"

  // Fungsi untuk mengambil data kegiatan dari API
  const fetchKegiatanData = async () => {
    setIsLoading(true);
    setStatusMessage("Sedang memuat data...");
    setIsError(false);
    try {
      const response = await fetch("/api/kegiatan", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Gagal mengambil data kegiatan.");
      }
      const data = await response.json();
      setKegiatanData(data);

      // Menghitung jumlah kegiatan dengan status "Selesai"
      const count = data.filter((item) => item.status === "Selesai").length;
      setSelesaiCount(count);

      setStatusMessage("Data kegiatan berhasil dimuat.");
    } catch (error) {
      console.error("Error fetching kegiatan:", error);
      setStatusMessage("Gagal memuat data kegiatan.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menjalankan penghapusan dari TabelKegiatan
  const executeHapus = async (id) => {
    setStatusMessage("Sedang menghapus...");
    setIsError(false);

    try {
      const response = await fetch(`/api/kegiatan/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus kegiatan.");
      }

      // Memperbarui state kegiatanData secara optimis
      const updatedKegiatan = kegiatanData.filter((item) => item._id !== id);
      setKegiatanData(updatedKegiatan);

      const count = updatedKegiatan.filter(
        (item) => item.status === "Selesai"
      ).length;
      setSelesaiCount(count);

      setStatusMessage("Kegiatan berhasil dihapus!");
      setIsError(false);
    } catch (error) {
      console.error("Error saat menghapus kegiatan:", error);
      setStatusMessage(`Gagal menghapus kegiatan: ${error.message}`);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchKegiatanData();
  }, []);

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
              Manajemen Kegiatan
            </h1>
          </header>
          {/* Filter dan Tombol Tambah */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            {/* Filter Kegiatan */}
            <ul className="flex gap-6 text-lg font-medium">
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
                  onClick={() => handleFilterChange("selesai")}
                  className={`pb-1 border-b-2 transition-colors duration-200 ${
                    filterStatus === "selesai"
                      ? "border-amber-500 text-amber-500"
                      : "border-transparent text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Selesai ({selesaiCount})
                </button>
              </li>
            </ul>

            {/* Pencarian dan Tombol Tambah */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
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
              kegiatan={kegiatanData}
              searchTerm={searchTerm}
              filterStatus={filterStatus}
              isLoading={isLoading}
              isError={isError}
              statusMessage={statusMessage}
              executeHapus={executeHapus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// app/admin/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/admin/navbar";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAnggota: "...",
    anggotaAktif: "...",
    kegiatanAktif: "...",
    pengumumanAktif: "...",
    recentKegiatan: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch("/api/dashboard/stats", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Gagal memuat data dashboard.");
        }

        const data = await response.json();
        setStats({
          totalAnggota: data.totalAnggota,
          anggotaAktif: data.anggotaAktif,
          kegiatanAktif: data.kegiatanAktif,
          pengumumanAktif: data.pengumumanAktif,
          recentKegiatan: data.recentKegiatan,
        });
        setStatusMessage("Data berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStatusMessage(`Gagal memuat data dashboard: ${error.message}`);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Fungsi untuk format tanggal (DD MMMM YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1">
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Admin IKPMJ
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoading
                ? "Memuat ringkasan..."
                : "Ringkasan cepat aktivitas organisasi."}
            </p>
          </header>

          {/* Menampilkan pesan error jika terjadi */}
          {isError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              {statusMessage}
            </div>
          )}

          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Total Semua Anggota
              </h3>
              <p className="text-4xl font-bold text-teal-600">
                {isLoading ? "..." : stats.totalAnggota}
              </p>
              <p className="text-sm text-gray-500 mt-1">per hari ini</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Anggota Aktif
              </h3>
              <p className="text-4xl font-bold text-blue-600">
                {isLoading ? "..." : stats.anggotaAktif}
              </p>
              <p className="text-sm text-gray-500 mt-1">per hari ini</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Kegiatan Aktif
              </h3>
              <p className="text-4xl font-bold text-purple-600">
                {isLoading ? "..." : stats.kegiatanAktif}
              </p>
              <p className="text-sm text-gray-500 mt-1">saat ini</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Pengumuman Aktif
              </h3>
              <p className="text-4xl font-bold text-orange-600">
                {isLoading ? "..." : stats.pengumumanAktif}
              </p>
              <p className="text-sm text-gray-500 mt-1">saat ini</p>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href={"/admin/anggota/tambah"}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2"
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
                Tambah Anggota Baru
              </Link>
              <Link
                href={"/admin/kegiatan/tambah"}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2"
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
                Buat Kegiatan Baru
              </Link>
              <Link
                href={"/admin/pengumuman/tambah"}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2"
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
                Buat Pengumuman Baru
              </Link>
            </div>
          </section>

          {/* Recent Activities & Notifications */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Kegiatan Terbaru
              </h2>
              {isLoading ? (
                <p className="text-gray-600">Memuat kegiatan...</p>
              ) : (
                <ul className="space-y-4">
                  {stats.recentKegiatan.length > 0 ? (
                    stats.recentKegiatan.map((item) => (
                      <li
                        key={item._id}
                        className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0"
                      >
                        <div className="font-semibold text-gray-700">
                          {item.judul}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(item.tanggal_mulai)}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">
                      Tidak ada kegiatan terbaru.
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Pengumuman Terbaru
              </h2>
              <ul className="space-y-4">
                {/* Data Pengumuman masih statis karena belum ada API */}
                <li className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                  <div className="font-semibold text-yellow-600">
                    Kegiatan 'Webinar Kewirausahaan' Mendekat
                  </div>
                  <div className="text-sm text-gray-500">Sisa 6 hari</div>
                </li>
                <li className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                  <div className="font-semibold text-blue-600">
                    1 Surat Masuk Baru
                  </div>
                  <div className="text-sm text-gray-500">
                    Cek kotak masuk laporan
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

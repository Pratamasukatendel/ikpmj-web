// app/admin/page.jsx (atau app/admin/dashboard/page.jsx)
"use client"; // Diperlukan karena masih menggunakan hooks seperti useState (jika ditambahkan di masa depan)

import React from "react"; // Tidak perlu useEffect lagi
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/admin/navbar";
import Link from "next/link";
// import Image from "next/image"; // Tidak digunakan lagi untuk ikon, hanya untuk logo jika ada

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1">
          {" "}
          {/* p-7 untuk padding, flex-1 untuk mengisi ruang */}
          {/* Header Dashboard */}
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Admin IKPMJ
            </h1>
            <p className="text-gray-600 mt-1">
              Ringkasan cepat aktivitas organisasi.
            </p>
          </header>
          {/* Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Total Anggota Aktif
              </h3>
              <p className="text-4xl font-bold text-teal-600">120</p>
              <p className="text-sm text-gray-500 mt-1">per 20 Juni 2025</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Anggota Baru Bulan Ini
              </h3>
              <p className="text-4xl font-bold text-blue-600">8</p>
              <p className="text-sm text-gray-500 mt-1">
                pertumbuhan bulan ini
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Kegiatan Mendatang
              </h3>
              <p className="text-4xl font-bold text-purple-600">5</p>
              <p className="text-sm text-gray-500 mt-1">
                dalam 30 hari ke depan
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Pengumuman Aktif
              </h3>
              <p className="text-4xl font-bold text-orange-600">3</p>
              <p className="text-sm text-gray-500 mt-1">saat ini</p>
            </div>
          </section>
          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href={"/admin/anggota/tambah"} // Link ke Tambah Anggota
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2"
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
                Tambah Anggota Baru
              </Link>
              <Link
                href={"/admin/kegiatan/tambah"} // Link ke Tambah Kegiatan
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2"
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
                Buat Kegiatan Baru
              </Link>
              <Link
                href={"/admin/pengumuman/tambah"} // Link ke Tambah Pengumuman
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2"
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
              <ul className="space-y-4">
                <li className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                  <div className="font-semibold text-gray-700">
                    Webinar Kewirausahaan
                  </div>
                  <div className="text-sm text-gray-500">25 Juni 2025</div>
                </li>
                <li className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                  <div className="font-semibold text-gray-700">
                    Bakti Sosial Bersama
                  </div>
                  <div className="text-sm text-gray-500">10 Juli 2025</div>
                </li>
                <li className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                  <div className="font-semibold text-gray-700">
                    Diskusi Rutin Bulanan
                  </div>
                  <div className="text-sm text-gray-500">15 Juli 2025</div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Notifikasi & Tugas Penting
              </h2>
              <ul className="space-y-4">
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

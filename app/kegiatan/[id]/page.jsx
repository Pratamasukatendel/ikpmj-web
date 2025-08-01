// app/kegiatan/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/component/user/navbar"; // Menggunakan Navbar dari folder user
import Footer from "@/app/component/user/footer"; // Menggunakan Footer dari folder user

export default function PublicKegiatanDetailPage() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [kegiatanData, setKegiatanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);

      if (!id) {
        setIsLoading(false);
        setIsError(true);
        setStatusMessage("ID kegiatan tidak ditemukan di URL.");
        return;
      }

      try {
        const response = await fetch(`/api/kegiatan/${id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data kegiatan.");
        }
        const data = await response.json();

        // Di halaman publik, kita hanya ingin menampilkan kegiatan yang relevan.
        // Asumsi: 'Aktif', 'Terencana', dan 'Selesai' adalah status publik.
        if (
          data.status !== "Aktif" &&
          data.status !== "Terencana" &&
          data.status !== "Selesai"
        ) {
          throw new Error("Kegiatan tidak tersedia untuk publik.");
        }

        setKegiatanData(data);

        setStatusMessage("Detail kegiatan berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching kegiatan detail:", error);
        setStatusMessage(`Gagal memuat detail kegiatan: ${error.message}`);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Fungsi untuk format tanggal (DD MMMM YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Memuat detail kegiatan...</p>
      </div>
    );
  }

  if (isError || !kegiatanData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <p className="text-xl text-red-600 mb-4">
          {statusMessage || "Kegiatan tidak ditemukan atau terjadi kesalahan."}
        </p>
        <Link
          href="/kegiatan"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
        >
          Kembali ke Daftar Kegiatan
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Navbar dari folder user */}
      <div className="flex-1 py-10 px-4">
        <div className="max-w-4xl mx-auto mt-16">
          <Link
            href="/kegiatan"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Kembali ke kegiatan
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            {kegiatanData.gambar_poster && (
              <img
                src={kegiatanData.gambar_poster}
                alt={kegiatanData.judul}
                className="w-full aspect-[16/9] object-cover rounded-md mb-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/800x450/e0e0e0/000000?text=Gambar+Tidak+Tersedia";
                }}
              />
            )}

            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              {kegiatanData.judul}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Tanggal: {formatDate(kegiatanData.tanggal_mulai)}
              {kegiatanData.tanggal_mulai !== kegiatanData.tanggal_selesai &&
                ` - ${formatDate(kegiatanData.tanggal_selesai)}`}
              {kegiatanData.lokasi && ` | Lokasi: ${kegiatanData.lokasi}`}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="whitespace-pre-wrap">{kegiatanData.deskripsi}</p>
            </div>

            {/* Lampiran tidak ada dalam model, jadi saya hapus. Jika Anda ingin menambahkannya, 
            silakan beritahu saya. */}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer dari folder user */}
    </div>
  );
}

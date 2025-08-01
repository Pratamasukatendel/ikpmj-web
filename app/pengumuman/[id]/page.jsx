// app/pengumuman/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../component/user/navbar";
import Footer from "../../component/user/footer";

export default function PublicPengumumanDetailPage() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [pengumumanData, setPengumumanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);

      try {
        // --- Mengambil data nyata dari API ---
        const response = await fetch(`/api/pengumuman/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || "Gagal mengambil data pengumuman."
          );
        }
        
        const data = await response.json();
        const pengumuman = data.pengumuman;

        // Keamanan: Pastikan hanya pengumuman aktif yang bisa diakses di detail publik
        if (!pengumuman || pengumuman.status !== "Aktif") {
          throw new Error("Pengumuman tidak aktif atau tidak ditemukan.");
        }
        
        setPengumumanData(pengumuman);
        setStatusMessage("Detail pengumuman berhasil dimuat.");

      } catch (error) {
        console.error("Error fetching pengumuman detail:", error);
        setStatusMessage(error.message); // Menampilkan pesan error yang lebih spesifik
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
  
  // Fungsi untuk memeriksa apakah URL adalah gambar
  const isImageUrl = (url) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  if (isLoading) {
    return (
       <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-100">
           <p className="text-xl text-gray-700">Memuat detail pengumuman...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !pengumumanData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 text-center p-4">
            <p className="text-xl font-bold text-red-600 mb-4">
            {statusMessage ||
                "Pengumuman tidak ditemukan atau terjadi kesalahan."}
            </p>
            <Link
            href="/pengumuman"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
            Kembali ke Daftar Pengumuman
            </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  const displayImageUrl = isImageUrl(pengumumanData.lampiran_url) 
    ? pengumumanData.lampiran_url 
    : `https://placehold.co/800x400/e2e8f0/4a5568?text=Info+IKPMJ`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="max-w-4xl mx-auto px-4 mt-20">
            <Link
            href="/pengumuman"
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
            Kembali ke Semua Pengumuman
            </Link>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <img
                src={displayImageUrl}
                alt={pengumumanData.judul}
                className="w-full aspect-vidio object-cover rounded-md mb-6"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/800x400/e2e8f0/4a5568?text=Gambar+Error`; }}
            />

            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                {pengumumanData.judul}
            </h1>
            <p className="text-sm text-gray-500 mb-6">
                Dipublikasikan oleh <strong>{pengumumanData.penulis}</strong> pada{" "}
                {formatDate(pengumumanData.tanggal_publikasi)}
                {pengumumanData.tanggal_berakhir &&
                ` | Berakhir pada: ${formatDate(pengumumanData.tanggal_berakhir)}`}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
                <p className="whitespace-pre-wrap">{pengumumanData.isi}</p>
            </div>

            {pengumumanData.lampiran_url && (
                <div className="border-t pt-6 mt-6">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                    Lampiran:
                </p>
                <a
                    href={pengumumanData.lampiran_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                    </svg>
                    Unduh Lampiran
                </a>
                </div>
            )}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

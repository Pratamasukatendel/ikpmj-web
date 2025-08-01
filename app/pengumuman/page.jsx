// app/pengumuman/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../component/user/navbar";
import Footer from "../component/user/footer";

export default function PublicPengumumanPage() {
  const [pengumuman, setPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPengumumanData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Mengambil data dari API publik yang sudah difilter
        const res = await fetch("/api/public/pengumuman", {
          cache: "no-store",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Gagal mengambil data pengumuman.");
        }

        const data = await res.json();
        setPengumuman(data.pengumumans);
      } catch (err) {
        console.error("Error fetching pengumuman:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengumumanData();
  }, []);

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
           <p className="text-xl text-gray-700">Memuat pengumuman...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
       <div className="flex flex-col min-h-screen">
        <Navbar />
         <main className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="text-center p-4">
                <p className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</p>
                <p className="text-gray-700 mb-6">{error}</p>
                <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Kembali ke Beranda
                </Link>
            </div>
         </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 py-10 px-4">
        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Pengumuman IKPMJ
          </h1>

          {pengumuman.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pengumuman.map((item) => {
                // Logika untuk menentukan URL gambar yang akan ditampilkan
                const imageUrl = isImageUrl(item.lampiran_url)
                  ? item.lampiran_url
                  : `https://placehold.co/400x200/e2e8f0/4a5568?text=Info`;
                
                return (
                  <div
                    key={item._id} // Menggunakan _id dari MongoDB
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                  >
                    <img
                      src={imageUrl}
                      alt={item.judul}
                      className="w-full h-48 object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x200/e2e8f0/4a5568?text=Error`; }}
                    />
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        Dipublikasikan: {formatDate(item.tanggal_publikasi)}
                        {item.tanggal_berakhir && 
                        ` | Berakhir pada: ${formatDate(item.tanggal_berakhir)}`}
                      </p>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3 h-10 line-clamp-2">
                        {item.judul}
                      </h2>
                      <p className="text-gray-600 mb-4 h-10 line-clamp-3">
                        {item.isi}
                      </p>
                      <Link
                        href={`/pengumuman/${item._id}`} // Menggunakan _id dari MongoDB
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                      >
                        Baca Selengkapnya
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600 text-xl">
              Belum ada pengumuman aktif saat ini.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

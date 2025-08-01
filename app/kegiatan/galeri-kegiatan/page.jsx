// app/kegiatan/galeri-kegiatan/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import Navbar from "@/app/component/user/navbar";
import Footer from "@/app/component/user/footer";

export default function GaleriKegiatanPage() {
  const [selesaiKegiatan, setSelesaiKegiatan] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchKegiatanData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        const response = await fetch("/api/kegiatan", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Gagal mengambil data kegiatan.");
        }
        const allKegiatan = await response.json();

        // Filter hanya kegiatan yang sudah selesai
        const completedActivities = allKegiatan.filter(
          (item) => item.status === "Selesai"
        );
        setSelesaiKegiatan(completedActivities);

        setStatusMessage("Data galeri berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching kegiatan:", error);

        setStatusMessage("Gagal memuat galeri kegiatan.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKegiatanData();
  }, []);

  // Fungsi untuk format tanggal (DD MMMM YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Memuat galeri kegiatan...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600">
          {statusMessage || "Terjadi kesalahan saat memuat galeri."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/kegiatan"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 mt-14 transition-colors"
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
            Kembali ke Daftar Kegiatan
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Galeri Kegiatan IKPMJ
          </h1>

          {selesaiKegiatan.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selesaiKegiatan.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                >
                  {item.gambar_poster && (
                    <img
                      src={item.gambar_poster}
                      alt={item.judul}
                      className="w-full aspect-[16/9] object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/400x250/e0e0e0/000000?text=Gambar+Tidak+Tersedia";
                      }}
                    />
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(item.tanggal_mulai)}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {item.judul}
                    </h2>
                    <Link
                      href={`/kegiatan/${item._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Lihat Detail
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600 text-xl">
              Belum ada kegiatan yang telah selesai.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

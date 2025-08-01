// app/kegiatan/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../component/user/navbar";
import Footer from "../component/user/footer";

export default function PublicKegiatanPage() {
  const [kegiatanAktif, setKegiatanAktif] = useState([]);
  const [kegiatanSelesaiUntukGaleri, setKegiatanSelesaiUntukGaleri] = useState(
    []
  );
  const [hasMoreSelesaiKegiatan, setHasMoreSelesaiKegiatan] = useState(false);
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

        // Filter kegiatan untuk "Daftar Kegiatan" (Aktif/Terencana)
        const activeAndPlanned = allKegiatan.filter(
          (item) => item.status === "Aktif" || item.status === "Terencana"
        );
        setKegiatanAktif(activeAndPlanned);

        // Filter semua kegiatan yang sudah selesai
        const allCompletedActivities = allKegiatan.filter(
          (item) => item.status === "Selesai"
        );

        // Batasi hanya 6 item (2 baris) untuk tampilan galeri di halaman ini
        setKegiatanSelesaiUntukGaleri(allCompletedActivities.slice(0, 6));
        // Cek apakah ada lebih dari 6 kegiatan selesai
        setHasMoreSelesaiKegiatan(allCompletedActivities.length > 6);

        setStatusMessage("Data kegiatan berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching kegiatan:", error);
        setStatusMessage("Gagal memuat kegiatan.");
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
        <p className="text-xl text-gray-700">Memuat kegiatan...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600">
          {statusMessage || "Terjadi kesalahan saat memuat kegiatan."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Navbar dari folder user */}
      {/* Daftar Kegiatan */}
      <div className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 mt-20">
            Daftar Kegiatan
          </h1>
          {kegiatanAktif.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kegiatanAktif.map((item) => (
                <div
                  key={item._id} // Menggunakan _id dari MongoDB
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                >
                  {item.gambar_poster && (
                    <img
                      src={item.gambar_poster} // Menggunakan gambar_poster dari MongoDB
                      alt={item.judul}
                      className="w-full h-48 object-cover"
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
                      {item.tanggal_mulai !== item.tanggal_selesai &&
                        ` - ${formatDate(item.tanggal_selesai)}`}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                      {item.judul}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.deskripsi}
                    </p>
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
              Belum ada kegiatan aktif atau terencana saat ini.
            </div>
          )}
        </div>
      </div>
      {/* Jadwal Kegiatan */}
      <div className="bg-gray-800 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white text-center mb-10">
            Jadwal Kegiatan
          </h1>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <img
              src="https://cms.disway.id/uploads/b408d5f5aa0a279b4eaff61b6d089614.png"
              alt="Kalender Kegiatan"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      {/* Galeri Kegiatan */}
      <div className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Galeri Kegiatan
          </h1>

          {kegiatanSelesaiUntukGaleri.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {kegiatanSelesaiUntukGaleri.map((item) => (
                <div
                  key={item._id} // Menggunakan _id dari MongoDB
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                >
                  {item.gambar_poster && (
                    <img
                      src={item.gambar_poster} // Menggunakan gambar_poster dari MongoDB
                      alt={item.judul}
                      className="w-full h-48 object-cover"
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
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                      {item.judul}
                    </h2>
                    <Link
                      href={`/kegiatan/${item._id}`} /* Link ke detail kegiatan */
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

          {/* Tombol "Lihat Semua Galeri" */}
          {hasMoreSelesaiKegiatan && (
            <div className="text-center mt-12">
              <Link
                href={"/kegiatan/galeri-kegiatan"}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              >
                Lihat Galeri Kegiatan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer /> {/* Footer dari folder user */}
    </div>
  );
}

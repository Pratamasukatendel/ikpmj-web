// app/galeri-kegiatan/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../component/user/navbar"; // Menggunakan Navbar dari folder user
import Footer from "../../component/user/footer"; // Menggunakan Footer dari folder user

// Data dummy untuk simulasi fetch SEMUA kegiatan yang sudah selesai
const dummyAllCompletedKegiatanData = [
  {
    id: 4,
    judul: "Turnamen Futsal Antar Angkatan",
    deskripsi:
      "Turnamen futsal untuk mempererat silaturahmi dan menjaga kebugaran antar anggota IKPMJ.",
    tanggalMulai: "2025-06-05",
    tanggalSelesai: "2025-06-07",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Turnamen+Futsal",
  },
  {
    id: 5,
    judul: "Webinar Kesiapan Karir",
    deskripsi:
      "Webinar online dengan pembicara ahli tentang tips dan trik menghadapi dunia kerja setelah lulus kuliah.",
    tanggalMulai: "2025-05-20",
    tanggalSelesai: "2025-05-20",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Webinar+Karir",
  },
  {
    id: 6,
    judul: "Malam Keakraban IKPMJ",
    deskripsi:
      "Acara tahunan untuk menyambut anggota baru dan mempererat kebersamaan seluruh anggota.",
    tanggalMulai: "2025-04-10",
    tanggalSelesai: "2025-04-10",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Malam+Keakraban",
  },
  {
    id: 7,
    judul: "Outbound Kepemimpinan",
    deskripsi:
      "Kegiatan outbound untuk melatih jiwa kepemimpinan dan kerjasama tim.",
    tanggalMulai: "2025-03-01",
    tanggalSelesai: "2025-03-02",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Outbound",
  },
  {
    id: 8,
    judul: "Donor Darah Rutin",
    deskripsi:
      "Kegiatan donor darah bekerja sama dengan PMI untuk membantu sesama.",
    tanggalMulai: "2025-02-15",
    tanggalSelesai: "2025-02-15",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Donor+Darah",
  },
  {
    id: 9, // Contoh data tambahan
    judul: "Pelatihan Fotografi Dasar",
    deskripsi:
      "Mengembangkan skill fotografi anggota untuk dokumentasi kegiatan.",
    tanggalMulai: "2025-01-20",
    tanggalSelesai: "2025-01-20",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Fotografi",
  },
  {
    id: 10, // Contoh data tambahan
    judul: "Diskusi Film & Bedah Buku",
    deskripsi: "Diskusi santai tentang film inspiratif dan bedah buku terbaru.",
    tanggalMulai: "2025-01-05",
    tanggalSelesai: "2025-01-05",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Diskusi+Film",
  },
];

export default function FullGalleryPage() {
  const [allKegiatanSelesai, setAllKegiatanSelesai] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchAllCompletedKegiatan = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // --- Ganti dengan fetch nyata SEMUA data kegiatan yang sudah selesai dari API Anda ---
        // Contoh: const response = await fetch('/api/public/kegiatan?status=Selesai');
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data galeri kegiatan.');
        // }
        // const data = await response.json();
        // setAllKegiatanSelesai(data);

        // Simulasi delay fetch data
        await new Promise((resolve) => setTimeout(resolve, 500));
        setAllKegiatanSelesai(dummyAllCompletedKegiatanData); // Set semua data selesai
        setStatusMessage("Galeri kegiatan berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching full gallery:", error);
        setStatusMessage("Gagal memuat galeri kegiatan.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCompletedKegiatan();
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
          {statusMessage || "Terjadi kesalahan saat memuat galeri kegiatan."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Navbar dari folder user */}
      <div className="flex-1 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/kegiatan"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors mt-20"
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
            Kembali ke Halaman Kegiatan
          </Link>

          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Semua Galeri Kegiatan
          </h1>

          {allKegiatanSelesai.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allKegiatanSelesai.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-200"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
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
                      {formatDate(item.tanggalMulai)}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                      {item.judul}
                    </h2>
                    <Link
                      href={`/kegiatan/${item.id}`} // Link ke detail kegiatan
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
              Tidak ada kegiatan yang telah selesai untuk ditampilkan di galeri.
            </div>
          )}
        </div>
      </div>
      <Footer /> {/* Footer dari folder user */}
    </div>
  );
}

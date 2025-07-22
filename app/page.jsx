// app/page.jsx
"use client"; // Diperlukan karena menggunakan hooks seperti useState dan useEffect

import React, { useState, useEffect } from "react";
import Navbar from "./component/user/navbar";
import FAQ from "./component/user/faq";
import Footer from "./component/user/footer";
import Image from "next/image";
import Link from "next/link";

// Data dummy untuk simulasi fetch kegiatan (ambil dari data kegiatan sebelumnya)
const dummyKegiatanData = [
  {
    id: 1,
    judul: "Rapat Perdana Internal IKPMJ",
    deskripsi:
      "Rapat perdana untuk membahas struktur organisasi dan rencana kerja awal tahun.",
    tanggalMulai: "2025-07-25",
    tanggalSelesai: "2025-07-25",
    status: "Aktif", // Sedang berlangsung/Aktif
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Rapat+Internal",
  },
  {
    id: 2,
    judul: "Workshop Desain Grafis Dasar",
    deskripsi:
      "Workshop gratis untuk anggota IKPMJ yang ingin belajar dasar-dasar desain grafis menggunakan Figma.",
    tanggalMulai: "2025-08-10",
    tanggalSelesai: "2025-08-11",
    status: "Aktif", // Sedang berlangsung/Aktif
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Workshop+Desain",
  },
  {
    id: 3,
    judul: "Bakti Sosial Panti Asuhan",
    deskripsi:
      "Kegiatan rutin bakti sosial ke panti asuhan, mengumpulkan donasi dan berinteraksi dengan anak-anak.",
    tanggalMulai: "2025-09-01",
    tanggalSelesai: "2025-09-01",
    status: "Terencana", // Akan datang
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Bakti+Sosial",
  },
  {
    id: 4, // Ini akan disaring karena statusnya 'Selesai'
    judul: "Turnamen Futsal Antar Angkatan",
    deskripsi:
      "Turnamen futsal untuk mempererat silaturahmi dan menjaga kebugaran antar anggota IKPMJ.",
    tanggalMulai: "2025-06-05",
    tanggalSelesai: "2025-06-07",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Turnamen+Futsal",
  },
];

export default function Home() {
  const [latestKegiatan, setLatestKegiatan] = useState([]);
  const [isLoadingKegiatan, setIsLoadingKegiatan] = useState(true);
  const [isErrorKegiatan, setIsErrorKegiatan] = useState(false);

  useEffect(() => {
    const fetchLatestKegiatan = async () => {
      setIsLoadingKegiatan(true);
      setIsErrorKegiatan(false);
      try {
        // --- Ganti dengan fetch nyata data kegiatan dari API Anda ---
        // Contoh: const response = await fetch('/api/public/kegiatan?status=aktif&limit=3');
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data kegiatan.');
        // }
        // const data = await response.json();
        // setLatestKegiatan(data);

        // Simulasi delay fetch data
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Filter hanya kegiatan 'Aktif' atau 'Terencana' dan ambil 3 terbaru
        const activeAndPlanned = dummyKegiatanData
          .filter(
            (item) => item.status === "Aktif" || item.status === "Terencana"
          )
          .slice(0, 3); // Ambil 3 kegiatan terbaru/mendatang
        setLatestKegiatan(activeAndPlanned);
      } catch (error) {
        console.error("Error fetching latest kegiatan:", error);
        setIsErrorKegiatan(true);
      } finally {
        setIsLoadingKegiatan(false);
      }
    };

    fetchLatestKegiatan();
  }, []);

  // Fungsi untuk format tanggal (DD MMMM YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {/* Section Header (Hero) */}
      <div className="relative flex flex-col md:flex-row items-center justify-center py-20 px-4 md:px-20 bg-gradient-to-r from-teal-500 to-blue-600 text-white min-h-[60vh] md:min-h-[80vh]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Selamat Datang di Ikatan Pelajar dan Mahasiswa Jember (IKPMJ)
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90">
              Wadah silaturahmi dan pengembangan diri bagi mahasiswa Jember di
              Yogyakarta.
            </p>
          </div>
          <div className="flex-shrink-0 mt-8 md:mt-0">
            <Image
              src="/images/ikpmj.png"
              alt="IKPMJ Logo"
              width={180} // Ukuran lebih besar untuk hero section
              height={180}
              className="rounded-full shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>
      {/* Section About Us */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Tentang IKPMJ
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Ikatan Keluarga Pelajar dan Mahasiswa Jember (IKPMJ) adalah
            organisasi mahasiswa daerah yang berdedikasi untuk memfasilitasi dan
            mendukung mahasiswa-mahasiswa asal Jember yang sedang menempuh
            pendidikan di Yogyakarta. Kami berkomitmen untuk mempererat tali
            silaturahmi, memberikan dukungan akademik, serta menyelenggarakan
            berbagai kegiatan sosial dan pengembangan diri. Bergabunglah bersama
            kami untuk membangun komunitas yang solid dan berdaya!
          </p>
          <Link
            href={"/tentang-kami"}
            className="inline-flex items-center px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
      {/* Section Kegiatan Terbaru */}
      <div className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
            Kegiatan Terbaru
          </h2>

          {isLoadingKegiatan ? (
            <div className="text-center py-10 text-gray-600 text-xl">
              Memuat kegiatan terbaru...
            </div>
          ) : isErrorKegiatan ? (
            <div className="text-center py-10 text-red-600 text-xl">
              Gagal memuat kegiatan terbaru.
            </div>
          ) : latestKegiatan.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestKegiatan.map((item) => (
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
                      {item.tanggalMulai !== item.tanggalSelesai &&
                        ` - ${formatDate(item.tanggalSelesai)}`}
                    </p>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {item.judul}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.deskripsi}
                    </p>
                    <Link
                      href={`/kegiatan/${item.id}`}
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
              Belum ada kegiatan terbaru saat ini.
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href={"/kegiatan"}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Lihat Semua Kegiatan
            </Link>
          </div>
        </div>
      </div>
      <FAQ /> {/* Komponen FAQ */}
      <Footer />
    </div>
  );
}

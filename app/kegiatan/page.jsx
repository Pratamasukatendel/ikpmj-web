// app/kegiatan/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../component/user/navbar"; // Menggunakan Navbar dari folder user
import Footer from "../component/user/footer"; // Menggunakan Footer dari folder user

// Data dummy untuk simulasi fetch dari API
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
    id: 4,
    judul: "Turnamen Futsal Antar Angkatan",
    deskripsi:
      "Turnamen futsal untuk mempererat silaturahmi dan menjaga kebugaran antar anggota IKPMJ.",
    tanggalMulai: "2025-06-05",
    tanggalSelesai: "2025-06-07",
    status: "Selesai", // Sudah selesai
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Turnamen+Futsal",
  },
  {
    id: 5,
    judul: "Webinar Kesiapan Karir",
    deskripsi:
      "Webinar online dengan pembicara ahli tentang tips dan trik menghadapi dunia kerja setelah lulus kuliah.",
    tanggalMulai: "2025-05-20",
    tanggalSelesai: "2025-05-20",
    status: "Selesai", // Sudah selesai
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Webinar+Karir",
  },
  {
    id: 6,
    judul: "Malam Keakraban IKPMJ",
    deskripsi:
      "Acara tahunan untuk menyambut anggota baru dan mempererat kebersamaan seluruh anggota.",
    tanggalMulai: "2025-04-10",
    tanggalSelesai: "2025-04-10",
    status: "Selesai", // Sudah selesai
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Malam+Keakraban",
  },
  {
    id: 7, // Tambahan data untuk menguji batasan 2 baris
    judul: "Outbound Kepemimpinan",
    deskripsi:
      "Kegiatan outbound untuk melatih jiwa kepemimpinan dan kerjasama tim.",
    tanggalMulai: "2025-03-01",
    tanggalSelesai: "2025-03-02",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Outbound",
  },
  {
    id: 8, // Tambahan data untuk menguji batasan 2 baris
    judul: "Donor Darah Rutin",
    deskripsi:
      "Kegiatan donor darah bekerja sama dengan PMI untuk membantu sesama.",
    tanggalMulai: "2025-02-15",
    tanggalSelesai: "2025-02-15",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Donor+Darah",
  },
  {
    id: 9, // Tambahan data untuk menguji batasan 2 baris
    judul: "Donor Darah Rutin",
    deskripsi:
      "Kegiatan donor darah bekerja sama dengan PMI untuk membantu sesama.",
    tanggalMulai: "2025-02-15",
    tanggalSelesai: "2025-02-15",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Donor+Darah",
  },
  {
    id: 10, // Tambahan data untuk menguji batasan 2 baris
    judul: "Donor Darah Rutin",
    deskripsi:
      "Kegiatan donor darah bekerja sama dengan PMI untuk membantu sesama.",
    tanggalMulai: "2025-02-15",
    tanggalSelesai: "2025-02-15",
    status: "Selesai",
    imageUrl: "https://placehold.co/400x250/e0e0e0/000000?text=Donor+Darah",
  },
];

export default function PublicKegiatanPage() {
  const [kegiatanAktif, setKegiatanAktif] = useState([]);
  const [kegiatanSelesaiUntukGaleri, setKegiatanSelesaiUntukGaleri] = useState(
    []
  ); // Data terbatas untuk galeri
  const [hasMoreSelesaiKegiatan, setHasMoreSelesaiKegiatan] = useState(false); // Untuk tombol "Lihat Semua"
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchKegiatanData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter kegiatan untuk "Daftar Kegiatan" (Aktif/Terencana)
        const activeAndPlanned = dummyKegiatanData.filter(
          (item) => item.status === "Aktif" || item.status === "Terencana"
        );
        setKegiatanAktif(activeAndPlanned);

        // Filter semua kegiatan yang sudah selesai
        const allCompletedActivities = dummyKegiatanData.filter(
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
          {" "}
          {/* Lebar lebih besar untuk 3 kolom */}
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10 mt-20">
            Daftar Kegiatan IKPMJ
          </h1>
          {kegiatanAktif.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {" "}
              {/* 3 kolom */}
              {kegiatanAktif.map((item) => (
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
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                      {item.judul}
                    </h2>
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
            {/* Placeholder untuk Gambar Kalender Kustom */}
            <img
              src="https://placehold.co/800x500/cccccc/333333?text=Kalender+Kegiatan+IKPMJ"
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
                      href={`/kegiatan/${item.id}`} /* Link ke detail kegiatan */
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
                href={
                  "/kegiatan/galeri-kegiatan"
                } /* Update link ke struktur baru */
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

// app/pengumuman/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../component/user/navbar"; // Menggunakan Navbar dari folder user
import Footer from "../component/user/footer"; // Menggunakan Footer dari folder user

// Data dummy untuk simulasi fetch dari API (hanya pengumuman 'Aktif' yang akan ditampilkan)
const dummyPublicPengumumanData = [
  {
    id: 1,
    judul: "Pengumuman Libur Idul Adha 2025",
    isi: "Diberitahukan kepada seluruh anggota IKPMJ bahwa libur Idul Adha akan dilaksanakan pada tanggal 17-18 Juni 2025. Kegiatan rutin ditiadakan.",
    tanggalPublikasi: "2025-06-01",
    tanggalBerakhir: "2025-06-30",
    status: "Aktif",
    penulis: "Admin IKPMJ",
    lampiranUrl: "https://www.africau.edu/images/default/sample.pdf",
    imageUrl: "https://placehold.co/400x200/e0e0e0/000000?text=Pengumuman+1",
  },
  {
    id: 2,
    judul: "Lowongan Relawan Bakti Sosial",
    isi: "IKPMJ membuka pendaftaran relawan untuk kegiatan bakti sosial di Panti Asuhan Kasih Ibu pada tanggal 20 Juli 2025. Segera daftarkan diri Anda!",
    tanggalPublikasi: "2025-06-15",
    tanggalBerakhir: "2025-07-10",
    status: "Aktif",
    penulis: "Divisi Sosial",
    lampiranUrl: null,
    imageUrl: "https://placehold.co/400x200/e0e0e0/000000?text=Pengumuman+2",
  },
  {
    id: 5,
    judul: "Pendaftaran Anggota Baru Gelombang 2",
    isi: "Bagi mahasiswa Jember di Yogyakarta yang belum bergabung, pendaftaran anggota baru gelombang 2 dibuka hingga 30 Agustus 2025.",
    tanggalPublikasi: "2025-07-01",
    tanggalBerakhir: "2025-08-30",
    status: "Aktif",
    penulis: "Divisi Keanggotaan",
    lampiranUrl: null,
    imageUrl: "https://placehold.co/400x200/e0e0e0/000000?text=Pengumuman+3",
  },
  // Pengumuman dengan status 'Draft' atau 'Tidak Aktif' tidak akan muncul di sini
];

export default function PublicPengumumanPage() {
  const [pengumuman, setPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchPengumumanData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // --- Ganti dengan fetch nyata data pengumuman dari API Anda ---
        // Contoh: const response = await fetch('/api/public/pengumuman');
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data pengumuman.');
        // }
        // const data = await response.json();
        // setPengumuman(data.filter(item => item.status === 'Aktif')); // Filter di sini atau di backend

        // Simulasi delay fetch data
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Filter hanya pengumuman dengan status 'Aktif' untuk tampilan publik
        const activePengumuman = dummyPublicPengumumanData.filter(
          (item) => item.status === "Aktif"
        );
        setPengumuman(activePengumuman);
        setStatusMessage("Pengumuman berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching pengumuman:", error);
        setStatusMessage("Gagal memuat pengumuman.");
        setIsError(true);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Memuat pengumuman...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-600">
          {statusMessage || "Terjadi kesalahan saat memuat pengumuman."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {/* Navbar dari folder user */}
      <div className="flex-1 py-10 px-4">
        {" "}
        {/* Menggunakan flex-1 agar konten mengisi ruang */}
        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
            Pengumuman IKPMJ
          </h1>

          {pengumuman.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pengumuman.map((item) => (
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
                          "https://placehold.co/400x200/e0e0e0/000000?text=Gambar+Tidak+Tersedia";
                      }}
                    />
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">
                      Dipublikasikan: {formatDate(item.tanggalPublikasi)}
                      {item.tanggalBerakhir &&
                        ` | Berakhir: ${formatDate(item.tanggalBerakhir)}`}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {item.judul}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.isi}
                    </p>
                    <Link
                      href={`/pengumuman/${item.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Baca Selengkapnya
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
              Belum ada pengumuman aktif saat ini.
            </div>
          )}
        </div>
      </div>
      <Footer /> {/* Footer dari folder user */}
    </div>
  );
}

// app/pengumuman/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Data dummy untuk simulasi fetch dari API (harus mencakup semua data dari dummyPublicPengumumanData)
const dummyAllPengumumanData = [
  {
    id: 1,
    judul: "Pengumuman Libur Idul Adha 2025",
    isi: "Diberitahukan kepada seluruh anggota IKPMJ bahwa libur Idul Adha akan dilaksanakan pada tanggal 17-18 Juni 2025. Selama periode ini, semua kegiatan rutin organisasi ditiadakan. Anggota diharapkan dapat memanfaatkan waktu libur ini untuk berkumpul bersama keluarga dan kerabat. Kegiatan organisasi akan kembali normal setelah tanggal 18 Juni 2025. Mohon perhatiannya.",
    tanggalPublikasi: "2025-06-01",
    tanggalBerakhir: "2025-06-30",
    status: "Aktif",
    penulis: "Admin IKPMJ",
    lampiranUrl: "https://www.africau.edu/images/default/sample.pdf",
    imageUrl:
      "https://placehold.co/800x400/e0e0e0/000000?text=Pengumuman+1+Detail",
  },
  {
    id: 2,
    judul: "Lowongan Relawan Bakti Sosial",
    isi: "IKPMJ membuka pendaftaran relawan untuk kegiatan bakti sosial di Panti Asuhan Kasih Ibu pada tanggal 20 Juli 2025. Kegiatan ini bertujuan untuk membantu sesama dan mempererat tali silaturahmi antar anggota. Syarat pendaftaran: mahasiswa aktif, memiliki semangat sosial, dan bersedia mengikuti seluruh rangkaian acara. Pendaftaran ditutup pada 10 Juli 2025. Segera daftarkan diri Anda melalui link yang tertera di website utama.",
    tanggalPublikasi: "2025-06-15",
    tanggalBerakhir: "2025-07-10",
    status: "Aktif",
    penulis: "Divisi Sosial",
    lampiranUrl: null,
    imageUrl:
      "https://placehold.co/800x400/e0e0e0/000000?text=Pengumuman+2+Detail",
  },
  {
    id: 3,
    judul: "Rapat Anggota Tahunan (Draft)",
    isi: "Ini adalah pengumuman draft dan tidak seharusnya terlihat di publik. Hanya untuk keperluan internal admin.",
    tanggalPublikasi: "2025-07-01",
    tanggalBerakhir: "2025-07-31",
    status: "Draft",
    penulis: "Sekretaris",
    lampiranUrl: null,
    imageUrl: null,
  },
  {
    id: 4,
    judul: "Perubahan Jadwal Diskusi Rutin",
    isi: "Ini adalah pengumuman tidak aktif dan tidak seharusnya terlihat di publik. Hanya untuk keperluan internal admin.",
    tanggalPublikasi: "2025-05-20",
    tanggalBerakhir: "2025-05-27",
    status: "Tidak Aktif",
    penulis: "Divisi Akademik",
    lampiranUrl: null,
    imageUrl: null,
  },
  {
    id: 5,
    judul: "Pendaftaran Anggota Baru Gelombang 2",
    isi: "Bagi mahasiswa Jember di Yogyakarta yang belum bergabung dengan IKPMJ, pendaftaran anggota baru gelombang 2 telah dibuka. Kesempatan ini terbuka untuk semua angkatan dan jurusan. Mari bergabung dan rasakan manfaat berorganisasi bersama kami! Pendaftaran ditutup pada 30 Agustus 2025. Informasi lebih lanjut dapat dilihat di brosur terlampir atau hubungi narahubung.",
    tanggalPublikasi: "2025-07-01",
    tanggalBerakhir: "2025-08-30",
    status: "Aktif",
    penulis: "Divisi Keanggotaan",
    lampiranUrl: null,
    imageUrl:
      "https://placehold.co/800x400/e0e0e0/000000?text=Pengumuman+3+Detail",
  },
];

export default function PublicPengumumanDetailPage() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [pengumumanData, setPengumumanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata data pengumuman berdasarkan ID dari API Anda ---
        // Contoh: const response = await fetch(`/api/public/pengumuman/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data pengumuman.');
        // }
        // const data = await response.json();
        // if (data.status !== 'Aktif') { // Pastikan hanya pengumuman aktif yang bisa diakses di detail publik
        //   throw new Error('Pengumuman tidak aktif atau tidak ditemukan.');
        // }
        // setPengumumanData(data);

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundData = dummyAllPengumumanData.find(
          (item) => item.id.toString() === id
        );

        if (!foundData || foundData.status !== "Aktif") {
          throw new Error("Pengumuman tidak aktif atau tidak ditemukan.");
        }
        setPengumumanData(foundData);
        setStatusMessage("Detail pengumuman berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching pengumuman detail:", error);
        setStatusMessage(`Gagal memuat detail pengumuman: ${error.message}`);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
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
        <p className="text-xl text-gray-700">Memuat detail pengumuman...</p>
      </div>
    );
  }

  if (isError || !pengumumanData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <p className="text-xl text-red-600 mb-4">
          {statusMessage ||
            "Pengumuman tidak ditemukan atau terjadi kesalahan."}
        </p>
        <Link
          href="/pengumuman"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
        >
          Kembali ke Daftar Pengumuman
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
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
          {pengumumanData.imageUrl && (
            <img
              src={pengumumanData.imageUrl}
              alt={pengumumanData.judul}
              className="w-full h-64 object-cover rounded-md mb-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/800x400/e0e0e0/000000?text=Gambar+Tidak+Tersedia";
              }}
            />
          )}

          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            {pengumumanData.judul}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Dipublikasikan oleh {pengumumanData.penulis} pada{" "}
            {formatDate(pengumumanData.tanggalPublikasi)}
            {pengumumanData.tanggalBerakhir &&
              ` | Berakhir pada: ${formatDate(pengumumanData.tanggalBerakhir)}`}
          </p>

          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            <p className="whitespace-pre-wrap">{pengumumanData.isi}</p>
          </div>

          {pengumumanData.lampiranUrl && (
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Lampiran:
              </p>
              <a
                href={pengumumanData.lampiranUrl}
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
    </div>
  );
}

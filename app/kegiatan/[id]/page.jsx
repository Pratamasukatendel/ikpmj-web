// app/kegiatan/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/component/user/navbar"; // Menggunakan Navbar dari folder user
import Footer from "@/app/component/user/footer"; // Menggunakan Footer dari folder user

// Data dummy untuk simulasi fetch dari API (mencakup semua status untuk simulasi detail)
const dummyAllKegiatanData = [
  {
    id: 1,
    judul: "Rapat Perdana Internal IKPMJ",
    deskripsi:
      "Rapat perdana untuk membahas struktur organisasi dan rencana kerja awal tahun. Pertemuan ini sangat penting untuk menyelaraskan visi dan misi seluruh divisi serta menetapkan target-target yang realistis untuk periode mendatang. Diharapkan kehadiran seluruh pengurus dan koordinator divisi.",
    tanggalMulai: "2025-07-25",
    tanggalSelesai: "2025-07-25",
    lokasi: "Ruang Rapat Kampus A",
    status: "Aktif",
    imageUrl:
      "https://placehold.co/800x450/e0e0e0/000000?text=Rapat+Internal+Detail",
    lampiranUrl: "https://www.africau.edu/images/default/sample.pdf", // Contoh lampiran
  },
  {
    id: 2,
    judul: "Workshop Desain Grafis Dasar",
    deskripsi:
      "Workshop gratis untuk anggota IKPMJ yang ingin belajar dasar-dasar desain grafis menggunakan Figma. Materi akan mencakup pengenalan Figma, tools dasar, layouting, dan tips membuat desain yang menarik. Peserta diharapkan membawa laptop masing-masing. Kuota terbatas!",
    tanggalMulai: "2025-08-10",
    tanggalSelesai: "2025-08-11",
    lokasi: "Lab Komputer Fakultas X",
    status: "Aktif",
    imageUrl:
      "https://placehold.co/800x450/e0e0e0/000000?text=Workshop+Desain+Detail",
    lampiranUrl: null,
  },
  {
    id: 3,
    judul: "Bakti Sosial Panti Asuhan",
    deskripsi:
      "Kegiatan rutin bakti sosial ke panti asuhan 'Cahaya Harapan'. Kami akan mengumpulkan donasi berupa pakaian layak pakai, buku, dan sembako. Selain itu, akan ada interaksi langsung dengan anak-anak panti melalui berbagai permainan edukatif dan sesi motivasi. Mari berbagi kebahagiaan!",
    tanggalMulai: "2025-09-01",
    tanggalSelesai: "2025-09-01",
    lokasi: "Panti Asuhan Cahaya Harapan",
    status: "Terencana",
    imageUrl:
      "https://placehold.co/800x450/e0e0e0/000000?text=Bakti+Sosial+Detail",
    lampiranUrl: null,
  },
  {
    id: 4,
    judul: "Turnamen Futsal Antar Angkatan (Selesai)",
    deskripsi:
      "Turnamen futsal tahunan untuk mempererat silaturahmi dan menjaga kebugaran antar anggota IKPMJ. Acara berlangsung meriah dengan partisipasi dari berbagai angkatan. Selamat kepada tim pemenang!",
    tanggalMulai: "2025-06-05",
    tanggalSelesai: "2025-06-07",
    lokasi: "Lapangan Futsal XYZ",
    status: "Selesai",
    imageUrl:
      "https://placehold.co/800x450/e0e0e0/000000?text=Turnamen+Futsal+Detail",
    lampiranUrl: null,
  },
  {
    id: 5,
    judul: "Webinar Kesiapan Karir (Selesai)",
    deskripsi:
      "Webinar online dengan pembicara ahli dari HRD perusahaan terkemuka tentang tips dan trik menghadapi dunia kerja setelah lulus kuliah. Materi meliputi pembuatan CV, teknik wawancara, dan pengembangan soft skill. Terima kasih atas antusiasme peserta!",
    tanggalMulai: "2025-05-20",
    tanggalSelesai: "2025-05-20",
    lokasi: "Online (Zoom Meeting)",
    status: "Selesai",
    imageUrl:
      "https://placehold.co/800x450/e0e0e0/000000?text=Webinar+Karir+Detail",
    lampiranUrl: null,
  },
];

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

      try {
        // --- Ganti dengan fetch nyata data kegiatan berdasarkan ID dari API Anda ---
        // Contoh: const response = await fetch(`/api/public/kegiatan/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data kegiatan.');
        // }
        // const data = await response.json();
        // // Pastikan hanya kegiatan 'Aktif' atau 'Terencana' yang bisa diakses di detail publik
        // if (data.status !== 'Aktif' && data.status !== 'Terencana' && data.status !== 'Selesai') {
        //   throw new Error('Kegiatan tidak tersedia untuk publik atau tidak ditemukan.');
        // }
        // setKegiatanData(data);

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const foundData = dummyAllKegiatanData.find(
          (item) => item.id.toString() === id
        );

        // Filter untuk memastikan hanya kegiatan yang relevan untuk publik yang ditampilkan
        // Yaitu status 'Aktif', 'Terencana', atau 'Selesai' (untuk galeri)
        if (
          !foundData ||
          (foundData.status !== "Aktif" &&
            foundData.status !== "Terencana" &&
            foundData.status !== "Selesai")
        ) {
          throw new Error(
            "Kegiatan tidak tersedia untuk publik atau tidak ditemukan."
          );
        }
        setKegiatanData(foundData);
        setStatusMessage("Detail kegiatan berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching kegiatan detail:", error);
        setStatusMessage(`Gagal memuat detail kegiatan: ${error.message}`);
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
            Kembali ke Semua Kegiatan
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            {kegiatanData.imageUrl && (
              <img
                src={kegiatanData.imageUrl}
                alt={kegiatanData.judul}
                className="w-full h-64 object-cover rounded-md mb-6"
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
              Tanggal: {formatDate(kegiatanData.tanggalMulai)}
              {kegiatanData.tanggalMulai !== kegiatanData.tanggalSelesai &&
                ` - ${formatDate(kegiatanData.tanggalSelesai)}`}
              {kegiatanData.lokasi && ` | Lokasi: ${kegiatanData.lokasi}`}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
              <p className="whitespace-pre-wrap">{kegiatanData.deskripsi}</p>
            </div>

            {kegiatanData.lampiranUrl && (
              <div className="mb-6">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Lampiran Kegiatan:
                </p>
                <a
                  href={kegiatanData.lampiranUrl}
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
      <Footer /> {/* Footer dari folder user */}
    </div>
  );
}

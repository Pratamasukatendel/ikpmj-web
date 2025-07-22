// app/component/admin/tabelLaporanKegiatan.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Data dummy untuk simulasi fetch kegiatan yang sudah selesai
const dummyCompletedKegiatanData = [
  {
    id: 4,
    judul: "Turnamen Futsal Antar Angkatan",
    tanggalMulai: "2025-06-05",
    tanggalSelesai: "2025-06-07",
    lokasi: "Lapangan Futsal XYZ",
    jenisKegiatan: "Olahraga",
    dokumentasiLink: "https://www.africau.edu/images/default/sample.pdf",
    jumlahPeserta: "50", // Field laporan baru
    anggaranTerpakai: "Rp 500.000", // Field laporan baru
    feedbackUmum: "Berjalan lancar, antusiasme tinggi.", // Field laporan baru
  },
  {
    id: 5,
    judul: "Webinar Kesiapan Karir",
    tanggalMulai: "2025-05-20",
    tanggalSelesai: "2025-05-20",
    lokasi: "Online (Zoom Meeting)",
    jenisKegiatan: "Edukasi",
    dokumentasiLink: "https://www.africau.edu/images/default/sample.pdf",
    jumlahPeserta: "150",
    anggaranTerpakai: "Rp 1.200.000",
    feedbackUmum: "Sangat informatif, banyak pertanyaan dari peserta.",
  },
  {
    id: 6,
    judul: "Malam Keakraban IKPMJ",
    tanggalMulai: "2025-04-10",
    tanggalSelesai: "2025-04-10",
    lokasi: "Aula Kampus B",
    jenisKegiatan: "Sosial",
    dokumentasiLink: "https://www.africau.edu/images/default/sample.pdf",
    jumlahPeserta: "80",
    anggaranTerpakai: "Rp 750.000",
    feedbackUmum: "Suasana akrab, anggota baru merasa nyaman.",
  },
  {
    id: 7,
    judul: "Pelatihan Public Speaking",
    tanggalMulai: "2025-03-15",
    tanggalSelesai: "2025-03-15",
    lokasi: "Ruang Kelas C",
    jenisKegiatan: "Pengembangan Diri",
    dokumentasiLink: null,
    jumlahPeserta: "30",
    anggaranTerpakai: "Rp 300.000",
    feedbackUmum: "Meningkatkan kepercayaan diri peserta.",
  },
];

// Komponen TabelLaporanKegiatan menerima props untuk filtering
export default function TabelLaporanKegiatan({ searchTerm }) {
  const [laporanKegiatan, setLaporanKegiatan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk simulasi fetch data laporan kegiatan
  useEffect(() => {
    const fetchLaporanData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data dari API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLaporanKegiatan(dummyCompletedKegiatanData); // Set data yang di-fetch
        setStatusMessage("Data laporan kegiatan berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching laporan kegiatan:", error);
        setStatusMessage("Gagal memuat data laporan kegiatan.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaporanData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi handleDelete (tetap ada sebagai placeholder, tapi tidak dipanggil dari UI)
  const handleDelete = (id) => {
    setStatusMessage(`Simulasi: Menghapus laporan kegiatan ID ${id}...`);
    setIsError(false);

    setTimeout(() => {
      setLaporanKegiatan((prevLaporan) =>
        prevLaporan.filter((item) => item.id !== id)
      );
      setStatusMessage(
        `Laporan kegiatan ID ${id} berhasil dihapus (simulasi)!`
      );
      setIsError(false);
    }, 500);
  };

  // Fungsi untuk memfilter data berdasarkan searchTerm
  const filteredLaporan = laporanKegiatan.filter((item) => {
    const currentSearchTerm = searchTerm || "";
    const itemJudul = item.judul || "";
    const itemLokasi = item.lokasi || "";
    const itemJenis = item.jenisKegiatan || "";
    const itemHasil = item.hasilOutput || ""; // Tambahkan ke pencarian
    const itemKendala = item.kendala || ""; // Tambahkan ke pencarian
    const itemRekomendasi = item.rekomendasi || ""; // Tambahkan ke pencarian
    const itemJumlahPeserta = item.jumlahPeserta
      ? item.jumlahPeserta.toString()
      : ""; // Konversi ke string
    const itemAnggaranTerpakai = item.anggaranTerpakai || "";
    const itemFeedbackUmum = item.feedbackUmum || "";

    // Filter berdasarkan searchTerm pada semua kolom yang relevan
    const matchesSearch =
      itemJudul.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      itemLokasi.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      itemJenis.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      itemHasil.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      itemKendala.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      itemRekomendasi.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      itemJumlahPeserta
        .toLowerCase()
        .includes(currentSearchTerm.toLowerCase()) ||
      itemAnggaranTerpakai
        .toLowerCase()
        .includes(currentSearchTerm.toLowerCase()) ||
      itemFeedbackUmum.toLowerCase().includes(currentSearchTerm.toLowerCase());

    return matchesSearch; // Hanya filter berdasarkan pencarian
  });

  // Fungsi untuk format tanggal (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data laporan kegiatan...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-600">
        {statusMessage || "Terjadi kesalahan saat memuat data."}
      </div>
    );
  }

  // Menentukan jumlah kolom yang akan ditampilkan
  const numberOfColumns = 9; // No, Judul, Tanggal, Lokasi, Jenis, Dokumentasi, Jumlah Peserta, Anggaran, Feedback

  return (
    <div className="my-8 rounded-lg border border-gray-200 shadow-lg overflow-hidden">
      {/* Pesan Status */}
      {statusMessage && (
        <div
          className={`p-3 text-sm ${
            isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {statusMessage}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-16 p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                No
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Judul Kegiatan
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tanggal Pelaksanaan
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Lokasi
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Jenis Kegiatan
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Jumlah Peserta
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Anggaran Terpakai
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Feedback Umum
              </th>
              <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Dokumentasi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {filteredLaporan.length > 0 ? (
              filteredLaporan.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {item.judul}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    {formatDate(item.tanggalMulai)} -{" "}
                    {formatDate(item.tanggalSelesai)}
                  </td>
                  <td className="p-4 text-sm">{item.lokasi}</td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    {item.jenisKegiatan}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    {item.jumlahPeserta || "-"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    {item.anggaranTerpakai || "-"}
                  </td>
                  <td className="p-4 text-sm line-clamp-2">
                    {item.feedbackUmum || "-"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    {item.dokumentasiLink ? (
                      <a
                        href={item.dokumentasiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800"
                        title="Lihat Dokumentasi"
                      >
                        Lihat
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={numberOfColumns}
                  className="text-center p-4 text-gray-500"
                >
                  Tidak ada laporan kegiatan yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

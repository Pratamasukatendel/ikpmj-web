// app/component/admin/tabelPengumuman.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Data dummy untuk simulasi fetch dari API
const dummyPengumumanData = [
  {
    id: 1,
    judul: "Pengumuman Libur Idul Adha 2025",
    isi: "Diberitahukan kepada seluruh anggota IKPMJ bahwa libur Idul Adha akan dilaksanakan pada tanggal 17-18 Juni 2025. Kegiatan rutin ditiadakan.",
    tanggalPublikasi: "2025-06-01",
    tanggalBerakhir: "2025-06-30",
    status: "Aktif",
    penulis: "Admin IKPMJ",
    lampiranUrl: "https://www.africau.edu/images/default/sample.pdf", // Contoh lampiran
    imageUrl: "https://placehold.co/100x60/e0e0e0/000000?text=Gambar1", // Contoh gambar
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
    imageUrl: "https://placehold.co/100x60/e0e0e0/000000?text=Gambar2",
  },
  {
    id: 3,
    judul: "Rapat Anggota Tahunan (Draft)",
    isi: "Draft agenda rapat anggota tahunan 2025. Mohon masukan dari seluruh anggota.",
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
    isi: "Jadwal diskusi rutin bulanan diubah dari hari Sabtu menjadi hari Minggu, dimulai minggu depan.",
    tanggalPublikasi: "2025-05-20",
    tanggalBerakhir: "2025-05-27",
    status: "Tidak Aktif", // Contoh status tidak aktif
    penulis: "Divisi Akademik",
    lampiranUrl: null,
    imageUrl: null,
  },
];

// Komponen TabelPengumuman menerima searchTerm dan filterStatus sebagai props
export default function TabelPengumuman({ searchTerm, filterStatus }) {
  const [pengumuman, setPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk simulasi fetch data dari API
  useEffect(() => {
    const fetchPengumumanData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data dari API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPengumuman(dummyPengumumanData); // Set data yang di-fetch
        setStatusMessage("Data pengumuman berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching pengumuman:", error);
        setStatusMessage("Gagal memuat data pengumuman.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengumumanData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi handleDelete
  const handleDelete = (id) => {
    setStatusMessage(`Simulasi: Menghapus pengumuman ID ${id}...`);
    setIsError(false);

    setTimeout(() => {
      setPengumuman((prevPengumuman) =>
        prevPengumuman.filter((item) => item.id !== id)
      );
      setStatusMessage(`Pengumuman ID ${id} berhasil dihapus (simulasi)!`);
      setIsError(false);
    }, 500);
  };

  // Fungsi untuk memfilter data berdasarkan searchTerm dan filterStatus
  const filteredPengumuman = pengumuman.filter((item) => {
    const currentSearchTerm = searchTerm || "";
    const matchesSearch =
      item.judul.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      item.isi.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      item.penulis.toLowerCase().includes(currentSearchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Fungsi untuk mendapatkan kelas badge berdasarkan status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800";
      case "Tidak Aktif":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fungsi untuk format tanggal (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data pengumuman...
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

  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-md">
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
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="w-16 p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              No
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Judul
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tanggal Publikasi
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Penulis
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {filteredPengumuman.length > 0 ? (
            filteredPengumuman.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">{index + 1}</td>
                <td className="p-4 text-sm font-medium text-gray-900">
                  {item.judul}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {formatDate(item.tanggalPublikasi)}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {item.penulis}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/pengumuman/detail/${item.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                  >
                    Lihat
                  </Link>
                  <Link
                    href={`/admin/pengumuman/edit/${item.id}`}
                    className="font-medium text-purple-600 hover:text-purple-800 mr-4 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                Tidak ada pengumuman yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

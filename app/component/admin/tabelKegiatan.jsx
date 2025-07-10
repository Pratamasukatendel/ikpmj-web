// app/component/admin/tabelKegiatan.jsx
"use client"; // Tetap diperlukan untuk interaktivitas di Next.js

import React, { useState, useEffect } from "react"; // Import useEffect
import Link from "next/link";

// Data dummy untuk simulasi fetch dari API
const dummyApiData = [
  {
    id: 1,
    tanggal: "2025-06-01", // Ubah ke format YYYY-MM-DD untuk konsistensi
    namaKegiatan: "Kegiatan Mahasiswa Baru",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "2025-06-01",
    namaKegiatan: "Kegiatan Sosialisasi Lingkungan",
    status: "Selesai",
  },
  {
    id: 3,
    tanggal: "2025-06-10",
    namaKegiatan: "Workshop Penulisan Ilmiah",
    status: "Aktif", // Contoh status baru
  },
  {
    id: 4,
    tanggal: "2025-06-02",
    namaKegiatan: "Rapat Anggaran Tahunan",
    status: "Tertunda",
  },
  {
    id: 5,
    tanggal: "2025-07-05",
    namaKegiatan: "Bakti Sosial Desa Makmur",
    status: "Terencana", // Contoh status baru
  },
];

// Komponen TabelKegiatan menerima searchTerm dan filterStatus sebagai props
export default function TabelKegiatan({ searchTerm, filterStatus }) {
  const [kegiatan, setKegiatan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk simulasi fetch data dari API
  useEffect(() => {
    const fetchKegiatanData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data dari API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setKegiatan(dummyApiData); // Set data yang di-fetch
        setStatusMessage("Data kegiatan berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching kegiatan:", error);
        setStatusMessage("Gagal memuat data kegiatan.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKegiatanData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi untuk memfilter data berdasarkan searchTerm dan filterStatus
  const filteredKegiatan = kegiatan.filter((item) => {
    // Filter berdasarkan searchTerm (namaKegiatan)
    const matchesSearch = item.namaKegiatan
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter berdasarkan status
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "inactive" && item.status === "Tidak Aktif"); // Sesuaikan dengan status 'Tidak Aktif' yang sebenarnya

    return matchesSearch && matchesStatus;
  });

  // Fungsi handleHapus
  const handleHapus = (id) => {
    // Ganti window.confirm dengan modal kustom di produksi
    // Untuk demo, kita gunakan pesan status
    setStatusMessage(`Simulasi: Menghapus kegiatan dengan ID ${id}...`);
    setIsError(false);

    // Simulasi penghapusan data dari API
    setTimeout(() => {
      const dataBaru = kegiatan.filter((item) => item.id !== id);
      setKegiatan(dataBaru);
      setStatusMessage(`Kegiatan dengan ID ${id} berhasil dihapus (simulasi)!`);
      setIsError(false);
    }, 500);
  };

  // Fungsi untuk mendapatkan kelas badge berdasarkan status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Tertunda":
        return "bg-yellow-100 text-yellow-800";
      case "Aktif":
        return "bg-blue-100 text-blue-800";
      case "Terencana":
        return "bg-purple-100 text-purple-800";
      case "Dibatalkan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data kegiatan...
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
              Tanggal
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nama Kegiatan
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {filteredKegiatan.length > 0 ? (
            filteredKegiatan.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">{index + 1}</td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {item.tanggal}
                </td>
                <td className="p-4 text-sm">{item.namaKegiatan}</td>
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
                  {/* Tombol aksi dengan styling Tailwind */}
                  <Link
                    href={`/admin/kegiatan/edit/${item.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="font-medium text-red-600 hover:text-red-800 transition-colors"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                Tidak ada kegiatan yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function TabelSuratKeluar({ searchTerm }) {
  const [suratKeluar, setSuratKeluar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Tambahkan state untuk mengontrol modal
  const [selectedSuratId, setSelectedSuratId] = useState(null); // Tambahkan state untuk ID surat yang akan dihapus

  // Fungsi untuk mengambil data surat keluar dari API
  const fetchSuratKeluarData = async () => {
    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);
    try {
      const response = await fetch("/api/surat-keluar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Tambahkan header otorisasi jika sudah ada (misal: "Authorization": `Bearer ${token}`)
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal mengambil data surat keluar."
        );
      }

      const data = await response.json();
      // Sesuaikan dengan struktur respons API Anda, yang mengembalikan 'suratKeluar'
      setSuratKeluar(data.suratKeluar);
      setStatusMessage("Data surat keluar berhasil dimuat.");
    } catch (error) {
      console.error("Error fetching surat keluar:", error);
      setStatusMessage(`Gagal memuat data surat keluar: ${error.message}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect untuk memanggil fetch data saat komponen mount
  useEffect(() => {
    fetchSuratKeluarData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi yang dipanggil saat tombol "Hapus" di tabel diklik
  const handleDeleteClick = (id) => {
    setSelectedSuratId(id);
    setShowConfirmModal(true);
  };

  // Fungsi untuk melakukan penghapusan setelah konfirmasi modal
  const confirmDelete = async () => {
    setShowConfirmModal(false); // Tutup modal setelah konfirmasi
    if (!selectedSuratId) return; // Pastikan ada ID yang dipilih

    setStatusMessage("Sedang menghapus surat keluar...");
    setIsError(false);

    try {
      const response = await fetch(`/api/surat-keluar/${selectedSuratId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Tambahkan header otorisasi jika sudah ada
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus surat keluar.");
      }

      // Setelah penghapusan berhasil di backend, re-fetch data untuk memperbarui tabel
      await fetchSuratKeluarData();
      setStatusMessage(`Surat keluar berhasil dihapus!`);
      setIsError(false);
    } catch (error) {
      console.error("Error deleting surat keluar:", error);
      setStatusMessage(`Gagal menghapus surat keluar: ${error.message}`);
      setIsError(true);
    } finally {
      setSelectedSuratId(null); // Reset selected ID
    }
  };

  // Fungsi untuk memfilter data berdasarkan searchTerm
  const filteredSuratKeluar = suratKeluar.filter((surat) => {
    const currentSearchTerm = searchTerm || "";
    return (
      surat.penerima.toLowerCase().includes(currentSearchTerm.toLowerCase()) || // Menggunakan 'penerima' sesuai model
      surat.perihal.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      surat.nomorSurat.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );
  });

  // Fungsi untuk format tanggal (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Handle invalid date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data surat keluar...
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
              Nomor Surat
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tanggal Surat
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tujuan
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Perihal
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Jenis Surat
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {filteredSuratKeluar.length > 0 ? (
            filteredSuratKeluar.map((surat, index) => (
              <tr
                key={surat._id} // Gunakan _id dari MongoDB sebagai key
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">{index + 1}</td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {surat.nomorSurat}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {formatDate(surat.tanggalSurat)}
                </td>
                <td className="p-4 text-sm">{surat.penerima}</td>
                {/* Menggunakan surat.penerima */}
                <td className="p-4 text-sm">{surat.perihal}</td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {surat.jenisSurat}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/surat/keluar/detail/${surat._id}`} // Gunakan _id
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                  >
                    Lihat
                  </Link>
                  <a
                    href={
                      surat.fileSurat && surat.fileSurat.length > 0
                        ? surat.fileSurat[0]
                        : "#"
                    } // Gunakan fileSurat dari API
                    target="_blank"
                    rel="noopener noreferrer"
                    download={surat.originalFileName || "surat_keluar.pdf"} // Tambahkan atribut download
                    className="font-medium text-green-600 hover:text-green-800 mr-4 transition-colors"
                  >
                    Unduh
                  </a>
                  <Link
                    href={`/admin/surat/keluar/edit/${surat._id}`} // Gunakan _id
                    className="font-medium text-purple-600 hover:text-purple-800 mr-4 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(surat._id)} // Panggil handler baru
                    className="font-medium text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                Tidak ada surat keluar yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Modal Konfirmasi Hapus - Modern Simple Design */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop dengan blur effect */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"></div>

          {/* Modal container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300 w-full max-w-sm mx-auto">
              {/* Modal Content */}
              <div className="px-8 pt-8 pb-6 text-center">
                {/* Warning Icon */}
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Konfirmasi Hapus
                </h3>

                {/* Description */}
                <div className="text-gray-500 text-sm leading-relaxed mb-8">
                  <p>Apakah Anda yakin ingin menghapus surat ini?</p>
                  <p>Tindakan ini tidak dapat dibatalkan.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete} // Panggil fungsi confirmDelete
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

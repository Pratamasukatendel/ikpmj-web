// app/component/admin/tabelPengumuman.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Komponen TabelPengumuman menerima searchTerm dan filterStatus sebagai props
export default function TabelPengumuman({ searchTerm, filterStatus }) {
  const [pengumuman, setPengumuman] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Atur jumlah item per halaman

  // State untuk mengontrol modal konfirmasi hapus
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fungsi untuk mengambil data dari API
  const fetchPengumumanData = async () => {
    setIsLoading(true);
    // Jangan reset status message di sini agar pesan sukses/gagal sebelumnya tetap terlihat
    try {
      const res = await fetch("/api/pengumuman", {
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || `Server merespons dengan status ${res.status}`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      setPengumuman(data.pengumumans);
      // Hanya set pesan sukses jika tidak ada pesan error
      if (!isError) {
        setStatusMessage("Data pengumuman berhasil dimuat.");
      }
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
      setStatusMessage(`Gagal memuat data: ${error.message}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect untuk fetch data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchPengumumanData();
  }, []);
  
  // useEffect untuk me-reset halaman saat filter atau pencarian berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);


  // Fungsi untuk membuka modal dan menyimpan ID item yang akan dihapus
  const handleOpenDeleteModal = (id) => {
    setItemToDelete(id);
    setShowConfirmModal(true);
  };
  
  // Fungsi untuk menutup modal
  const handleCloseDeleteModal = () => {
    setItemToDelete(null);
    setShowConfirmModal(false);
  };

  // Fungsi untuk menangani penghapusan data setelah konfirmasi
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setStatusMessage("Menghapus pengumuman...");
    setIsError(false);
    setShowConfirmModal(false);

    try {
      const res = await fetch(`/api/pengumuman/${itemToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setStatusMessage("Pengumuman berhasil dihapus!");
        setIsError(false);
        setItemToDelete(null);
        // Refresh data setelah berhasil menghapus
        fetchPengumumanData();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus pengumuman.");
      }
    } catch (error) {
      console.error(error.message);
      setStatusMessage(`Gagal menghapus pengumuman: ${error.message}`);
      setIsError(true);
    }
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

  // Kalkulasi untuk paginasi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPengumuman.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPengumuman.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };
  
  // Fungsi untuk membuat tombol paginasi dengan batasan 5
  const getPaginationButtons = () => {
    const pageButtons = [];
    const maxButtons = 5;
    let startPage;
    let endPage;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxButtons / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxButtons / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(i);
    }
    return pageButtons;
  };

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

  // Fungsi untuk format tanggal (DD MMMM YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data pengumuman...
      </div>
    );
  }

  if (isError && !currentItems.length) {
    return (
      <div className="text-center py-8 text-red-600">
        {statusMessage || "Terjadi kesalahan saat memuat data."}
      </div>
    );
  }

  return (
    <>
      {/* Container untuk tabel dan paginasi */}
      <div className="my-8 overflow-hidden rounded-lg border border-gray-200 shadow-md">
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
                <th className="w-16 p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal Publikasi</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Penulis</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="p-4 whitespace-nowrap text-sm">{indexOfFirstItem + index + 1}</td>
                    <td className="p-4 text-sm font-medium text-gray-900">{item.judul}</td>
                    <td className="p-4 whitespace-nowrap text-sm">{formatDate(item.tanggal_publikasi)}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm">{item.penulis}</td>
                    <td className="p-4 whitespace-nowrap text-sm">
                      <Link href={`/admin/pengumuman/detail/${item._id}`} className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors">Lihat</Link>
                      <Link href={`/admin/pengumuman/edit/${item._id}`} className="font-medium text-purple-600 hover:text-purple-800 mr-4 transition-colors">Edit</Link>
                      <button onClick={() => handleOpenDeleteModal(item._id)} className="font-medium text-red-600 hover:text-red-800 transition-colors">Hapus</button>
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
        {/* Kontrol Paginasi */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {getPaginationButtons().map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    currentPage === pageNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" onClick={handleCloseDeleteModal}></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 w-full max-w-sm mx-auto">
              <div className="px-8 pt-8 pb-6 text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Hapus Pengumuman
                </h3>
                <div className="text-gray-500 text-sm leading-relaxed mb-8">
                  <p>Apakah Anda yakin ingin menghapus pengumuman ini?</p>
                  <p>Tindakan ini tidak dapat dibatalkan.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCloseDeleteModal}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

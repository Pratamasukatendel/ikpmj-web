// app/component/admin/tabelKegiatan.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

// Komponen TabelKegiatan menerima searchTerm dan filterStatus sebagai props
export default function TabelKegiatan({
  kegiatan = [],
  searchTerm,
  filterStatus,
  isLoading,
  isError,
  statusMessage,
  executeHapus,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [kegiatanToDelete, setKegiatanToDelete] = useState(null);

  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fungsi untuk memfilter data berdasarkan searchTerm dan filterStatus
  const filteredKegiatan = kegiatan.filter((item) => {
    const matchesSearch = item.judul
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      item.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Logika untuk paginasi
  const totalPages = Math.ceil(filteredKegiatan.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKegiatan.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handler untuk menampilkan modal konfirmasi hapus
  const confirmHapus = (id) => {
    setKegiatanToDelete(id);
    setShowDeleteModal(true);
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
              Tanggal Mulai
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
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {new Date(item.tanggal_mulai).toLocaleDateString("id-ID")}
                </td>
                <td className="p-4 text-sm">{item.judul}</td>
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
                  <Link
                    href={`/admin/kegiatan/edit/${item._id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => confirmHapus(item._id)}
                    className="font-medium text-red-600 hover:text-red-800 transition-colors cursor-pointer"
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

      {/* Paginasi */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-md ${
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
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya
          </button>
        </div>
      )}

      {/* Modal Konfirmasi Hapus - Modern Simple Design */}
      {showDeleteModal && (
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
                  Hapus Kegiatan
                </h3>

                {/* Description */}
                <div className="text-gray-500 text-sm leading-relaxed mb-8">
                  <p>Apakah Anda yakin ingin menghapus kegiatan ini?</p>
                  <p>Aksi ini tidak dapat dibatalkan.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => executeHapus(kegiatanToDelete)}
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

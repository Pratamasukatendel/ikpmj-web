// app/component/admin/tabelAnggota.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function TabelAnggota({ searchTerm, filterStatus }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fungsi untuk mengambil data anggota dari API
  const fetchUsersData = useCallback(async () => {
    setIsLoading(true);
    setStatusMessage("");
    setIsError(false);
    try {
      // Bangun URL dengan query parameters untuk pencarian, filter, dan paginasi
      const queryParams = new URLSearchParams();
      if (searchTerm) {
        queryParams.append("searchTerm", searchTerm);
      }
      if (filterStatus && filterStatus !== "all") {
        queryParams.append("filterStatus", filterStatus);
      }
      queryParams.append("page", currentPage.toString());
      queryParams.append("limit", itemsPerPage.toString());

      const response = await fetch(`/api/anggota?${queryParams.toString()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal memuat data anggota dari API."
        );
      }
      const result = await response.json(); // Respons API sekarang berisi data paginasi

      setUsers(result.data);
      setTotalItems(result.total);
      setTotalPages(result.totalPages);
      setStatusMessage("Data anggota berhasil dimuat.");
    } catch (error) {
      console.error("Error fetching users:", error);
      setStatusMessage(`Gagal memuat data anggota: ${error.message}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, currentPage, itemsPerPage]); // Dependensi untuk useCallback

  // useEffect untuk memanggil fetchUsersData saat komponen mount atau parameter paginasi/filter/search berubah
  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // Handler untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Fungsi untuk menampilkan modal konfirmasi penghapusan
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowConfirmModal(true);
  };

  // Fungsi handleDelete (setelah konfirmasi)
  const handleDelete = async () => {
    if (!userToDelete) return;

    setStatusMessage(`Menghapus anggota...`);
    setIsError(false);
    setShowConfirmModal(false);

    try {
      const response = await fetch(`/api/anggota?id=${userToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus anggota.");
      }

      setStatusMessage(`Anggota berhasil dihapus!`);
      setUserToDelete(null);
      // Setelah menghapus, ambil ulang data untuk memperbarui tabel dan paginasi
      fetchUsersData();
    } catch (error) {
      console.error("Error deleting user:", error);
      setStatusMessage(`Gagal menghapus anggota: ${error.message}`);
      setIsError(true);
    }
  };

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fungsi untuk format jam
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data anggota...
      </div>
    );
  }

  if (isError && !users.length) {
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
              Akun
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email & Kontak
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Data Ditambah
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
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                {/* Kolom Akun */}
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={user.profile_image_url}
                        alt={`${user.nama} profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/40x40/e0e0e0/000000?text=${user.nama
                            .charAt(0)
                            .toUpperCase()}`;
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.nama}</p>
                      <p className="text-gray-500 text-xs">
                        Angkatan {user.angkatan}
                      </p>
                    </div>
                  </div>
                </td>
                {/* Kolom Email & Kontak */}
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-800">{user.email}</p>
                    <p className="text-gray-500 text-xs">{user.nomor_kontak}</p>
                  </div>
                </td>
                {/* Kolom Data Ditambah */}
                <td className="p-4 whitespace-nowrap text-sm">
                  <div>
                    <p className="font-medium text-gray-800">
                      {formatDate(user.tanggal_daftar)}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatTime(user.tanggal_daftar)}
                    </p>
                  </div>
                </td>
                {/* Kolom Status Aktif (Teks Berwarna) */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.is_active ? "Aktif" : "Tidak Aktif"}
                  </span>
                </td>
                {/* Kolom Aksi */}
                <td className="p-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/anggota/edit/${user.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => confirmDelete(user.id)}
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
                Tidak ada anggota yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Kontrol Paginasi */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
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
            Next
          </button>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
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
                  Hapus Anggota
                </h3>

                {/* Description */}
                <div className="text-gray-500 text-sm leading-relaxed mb-8">
                  <p>Apakah Anda yakin ingin menghapus anggota ini?</p>
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
                    onClick={handleDelete}
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

// app/component/admin/tabelAnggota.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch"; // Pastikan path import benar

// Data dummy untuk simulasi fetch dari API
const dummyApiAnggotaData = [
  {
    id: 1,
    nama: "Sugiyo",
    angkatan: "2022", // Menambahkan field angkatan
    email: "sugiyo@example.com",
    nomorKontak: "081234567890",
    tanggalDaftar: "2023-08-09",
    jamDaftar: "07:00",
    isActive: true,
    profileImageUrl: "https://placehold.co/40x40/e0e0e0/000000?text=S",
  },
  {
    id: 2,
    nama: "Ahmad",
    angkatan: "2023", // Menambahkan field angkatan
    email: "ahmad@example.com",
    nomorKontak: "081298765432",
    isActive: false,
    tanggalDaftar: "2023-08-10",
    jamDaftar: "08:30",
    profileImageUrl: "https://placehold.co/40x40/e0e0e0/000000?text=A",
  },
  {
    id: 3,
    nama: "Siti",
    angkatan: "2022", // Menambahkan field angkatan
    email: "siti@example.com",
    nomorKontak: "081311223344",
    tanggalDaftar: "2023-08-11",
    jamDaftar: "09:00",
    isActive: true,
    profileImageUrl: "https://placehold.co/40x40/e0e0e0/000000?text=S",
  },
  {
    id: 4,
    nama: "Budi",
    angkatan: "2024", // Menambahkan field angkatan
    email: "budi@example.com",
    nomorKontak: "081355667788",
    tanggalDaftar: "2023-08-12",
    jamDaftar: "10:15",
    isActive: true,
    profileImageUrl: "https://placehold.co/40x40/e0e0e0/000000?text=B",
  },
];

// Komponen TabelAnggota menerima searchTerm dan filterStatus sebagai props
export default function TabelAnggota({ searchTerm, filterStatus }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk simulasi fetch data dari API
  useEffect(() => {
    const fetchUsersData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data dari API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsers(dummyApiAnggotaData); // Set data yang di-fetch
        setStatusMessage("Data anggota berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching users:", error);
        setStatusMessage("Gagal memuat data anggota.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi untuk mengubah status aktif/nonaktif pengguna
  const handleToggle = (id) => {
    // Ganti dengan panggilan API nyata untuk update status
    setStatusMessage(`Simulasi: Mengubah status user ID ${id}...`);
    setIsError(false);

    setTimeout(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isActive: !user.isActive } : user
        )
      );
      setStatusMessage(`Status user ID ${id} berhasil diubah (simulasi)!`);
      setIsError(false);
    }, 300);
  };

  // Fungsi handleDelete
  const handleDelete = (id) => {
    // Ganti window.confirm dengan modal konfirmasi kustom di produksi
    setStatusMessage(`Simulasi: Menghapus user ID ${id}...`);
    setIsError(false);

    setTimeout(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setStatusMessage(`User ID ${id} berhasil dihapus (simulasi)!`);
      setIsError(false);
    }, 500);
  };

  // Fungsi untuk memfilter data berdasarkan searchTerm dan filterStatus
  const filteredUsers = users.filter((user) => {
    // Pastikan properti user tidak undefined sebelum memanggil toLowerCase()
    const userNama = user.nama || "";
    const userAngkatan = user.angkatan ? user.angkatan.toString() : ""; // Angkatan bisa jadi angka, konversi ke string
    const userEmail = user.email || "";
    const userNomorKontak = user.nomorKontak || "";

    // Pastikan searchTerm juga bukan undefined sebelum memanggil toLowerCase()
    const currentSearchTerm = searchTerm || "";

    const matchesSearch =
      userNama.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      userAngkatan.toLowerCase().includes(currentSearchTerm.toLowerCase()) || // Tambahkan pencarian angkatan
      userEmail.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      userNomorKontak.toLowerCase().includes(currentSearchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.isActive) ||
      (filterStatus === "inactive" && !user.isActive);

    return matchesSearch && matchesStatus;
  });

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle undefined or null dateString
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Memuat data anggota...
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
              Akun
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email & Kontak
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Data Ditambah
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status Aktif
            </th>
            <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">{index + 1}</td>
                {/* Kolom Akun */}
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={user.profileImageUrl}
                        alt={`${user.nama} profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/40x40/e0e0e0/000000?text=?";
                        }} // Fallback image
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.nama}</p>
                      <p className="text-gray-500 text-xs">
                        Angkatan {user.angkatan}
                      </p>{" "}
                      {/* Mengganti userId dengan angkatan */}
                    </div>
                  </div>
                </td>
                {/* Kolom Email & Kontak */}
                <td className="p-4">
                  <div>
                    <p className="font-medium text-gray-800">{user.email}</p>
                    <p className="text-gray-500 text-xs">{user.nomorKontak}</p>
                  </div>
                </td>
                {/* Kolom Data Ditambah */}
                <td className="p-4 whitespace-nowrap text-sm">
                  <div>
                    <p className="font-medium text-gray-800">
                      {formatDate(user.tanggalDaftar)}
                    </p>
                    <p className="text-gray-500 text-xs">{user.jamDaftar}</p>
                  </div>
                </td>
                {/* Kolom Status Aktif dengan Toggle */}
                <td className="p-4">
                  <ToggleSwitch
                    isEnabled={user.isActive}
                    onToggle={() => handleToggle(user.id)}
                  />
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
                    onClick={() => handleDelete(user.id)}
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
                Tidak ada anggota yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

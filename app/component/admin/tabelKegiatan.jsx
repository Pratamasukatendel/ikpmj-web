"use client"; // Tetap diperlukan untuk interaktivitas di Next.js

import React, { useState } from "react";

// Data awal sebagai contoh
const initialData = [
  {
    id: 1,
    tanggal: "01/06/2025",
    namaKegiatan: "Kegiatan Mahasiswa Baru",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "01/06/2025",
    namaKegiatan: "Kegiatan Sosialisasi",
    status: "Selesai",
  },
  { id: 3, tanggal: "01/06/2025", namaKegiatan: "Kegiatan", status: "Selesai" },
  {
    id: 4,
    tanggal: "02/06/2025",
    namaKegiatan: "Rapat Anggaran",
    status: "Tertunda",
  },
];

const TabelKegiatan = () => {
  const [kegiatan, setKegiatan] = useState(initialData);

  // Fungsi handleHapus dan handleEdit tetap sama, tidak ada perubahan
  const handleHapus = (id) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus kegiatan dengan ID ${id}?`
      )
    ) {
      const dataBaru = kegiatan.filter((item) => item.id !== id);
      setKegiatan(dataBaru);
    }
  };

  const handleEdit = (id) => {
    alert(`Anda mengklik edit untuk kegiatan dengan ID ${id}.`);
  };

  return (
    // Container utama untuk tabel
    <div className="my-8 overflow-x-auto">
      {" "}
      {/* <-- Margin atas-bawah dan overflow untuk layar kecil */}
      <div className="shadow-md overflow-hidden">
        {" "}
        {/* <-- Shadow, sudut melengkung, dan menyembunyikan overflow */}
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            {/* <-- Header dengan warna latar abu-abu */}
            <tr>
              <th className="w-16 p-4 text-left text-sm font-semibold text-gray-700">
                No
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Tanggal
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Nama Kegiatan
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-500">
            {" "}
            {/* <-- Garis pemisah antar baris */}
            {kegiatan.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {" "}
                {/* <-- Efek hover pada baris */}
                <td className="p-4 whitespace-nowrap">{index + 1}</td>
                <td className="p-4 whitespace-nowrap">{item.tanggal}</td>
                <td className="p-4">{item.namaKegiatan}</td>
                <td className="p-4 whitespace-nowrap">{item.status}</td>
                <td className="p-4 whitespace-nowrap">
                  {/* Tombol aksi dengan styling Tailwind */}
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 cursor-pointer" // <-- Warna biru dan margin kanan
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="font-medium text-red-600 hover:text-red-800 cursor-pointer" // <-- Warna merah
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelKegiatan;

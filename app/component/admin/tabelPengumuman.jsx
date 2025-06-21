"use client"; // Diperlukan untuk interaktivitas di Next.js

import React, { useState } from "react";

// Data awal sebagai contoh pengumuman
const initialData = [
  { id: 1, judul: "Rapat Awal Tahun Ajaran Baru", tanggal: "20/07/2025" },
  {
    id: 2,
    judul: "Informasi Libur Nasional - Hari Kemerdekaan",
    tanggal: "17/08/2025",
  },
  {
    id: 3,
    judul: "Jadwal Ujian Tengah Semester Ganjil",
    tanggal: "15/09/2025",
  },
  {
    id: 4,
    judul: "Pembaruan Sistem Informasi Akademik",
    tanggal: "01/10/2025",
  },
];

const TabelPengumuman = () => {
  // Mengubah nama state dari 'donations' menjadi 'pengumuman'
  const [pengumuman, setPengumuman] = useState(initialData);

  // Fungsi untuk menangani aksi Edit
  const handleEdit = (id) => {
    alert(`Anda akan mengedit pengumuman dengan ID: ${id}`);
    console.log(`Edit pengumuman ID: ${id}`);
  };

  // Fungsi untuk menangani aksi Hapus
  const handleDelete = (id) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus pengumuman dengan ID ${id}?`
      )
    ) {
      // Logika tetap sama, hanya nama variabel yang diubah
      const updatedPengumuman = pengumuman.filter((item) => item.id !== id);
      setPengumuman(updatedPengumuman);
      console.log(`Pengumuman dengan ID ${id} telah dihapus.`);
    }
  };

  return (
    <div className="overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-700 bg-white">
        {/* Header Tabel */}
        <thead className="text-xs text-gray-700 capitalize bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 w-16 font-semibold text-sm">
              No
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-sm">
              Judul
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold">
              Tanggal
            </th>
            <th scope="col" className="px-6 py-3 text-sm font-semibold">
              Aksi
            </th>
          </tr>
        </thead>
        {/* Body Tabel */}
        <tbody>
          {/* Melakukan map pada state 'pengumuman' */}
          {pengumuman.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4">{item.judul}</td>
              <td className="px-6 py-4">{item.tanggal}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="font-medium text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelPengumuman;

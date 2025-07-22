// app/component/admin/tabelSuratKeluar.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Data dummy untuk simulasi fetch dari API
const dummySuratKeluarData = [
  {
    id: 101,
    nomorSurat: "SK/IKPMJ/VII/2025/001",
    tanggalSurat: "2025-07-01",
    tujuan: "Dinas Pendidikan DIY",
    perihal: "Pemberitahuan Kegiatan Bakti Sosial",
    jenisSurat: "Pemberitahuan",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf", // Contoh URL file PDF
  },
  {
    id: 102,
    nomorSurat: "SK/IKPMJ/VII/2025/002",
    tanggalSurat: "2025-07-05",
    tujuan: "Rektorat UGM",
    perihal: "Permohonan Penggunaan Aula",
    jenisSurat: "Permohonan",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 103,
    nomorSurat: "SK/IKPMJ/VII/2025/003",
    tanggalSurat: "2025-07-10",
    tujuan: "Seluruh Anggota IKPMJ",
    perihal: "Undangan Buka Bersama",
    jenisSurat: "Undangan",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
  },
];

// Komponen TabelSuratKeluar menerima searchTerm sebagai props
export default function TabelSuratKeluar({ searchTerm }) {
  const [suratKeluar, setSuratKeluar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk simulasi fetch data dari API
  useEffect(() => {
    const fetchSuratKeluarData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data dari API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSuratKeluar(dummySuratKeluarData); // Set data yang di-fetch
        setStatusMessage("Data surat keluar berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching surat keluar:", error);
        setStatusMessage("Gagal memuat data surat keluar.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuratKeluarData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi handleDelete
  const handleDelete = (id) => {
    setStatusMessage(`Simulasi: Menghapus surat keluar ID ${id}...`);
    setIsError(false);

    setTimeout(() => {
      setSuratKeluar((prevSurat) =>
        prevSurat.filter((surat) => surat.id !== id)
      );
      setStatusMessage(`Surat keluar ID ${id} berhasil dihapus (simulasi)!`);
      setIsError(false);
    }, 500);
  };

  // Fungsi untuk memfilter data berdasarkan searchTerm
  const filteredSuratKeluar = suratKeluar.filter((surat) => {
    const currentSearchTerm = searchTerm || "";
    return (
      surat.tujuan.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      surat.perihal.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      surat.nomorSurat.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );
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
                key={surat.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="p-4 whitespace-nowrap text-sm">{index + 1}</td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {surat.nomorSurat}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {formatDate(surat.tanggalSurat)}
                </td>
                <td className="p-4 text-sm">{surat.tujuan}</td>
                <td className="p-4 text-sm">{surat.perihal}</td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {surat.jenisSurat}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/surat/keluar/detail/${surat.id}`}
                    className="font-medium text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                  >
                    Lihat
                  </Link>
                  <a
                    href={surat.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-green-600 hover:text-green-800 mr-4 transition-colors"
                  >
                    Unduh PDF
                  </a>
                  <Link
                    href={`/admin/surat/keluar/edit/${surat.id}`}
                    className="font-medium text-purple-600 hover:text-purple-800 mr-4 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(surat.id)}
                    className="font-medium text-red-600 hover:text-red-800 transition-colors"
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
    </div>
  );
}

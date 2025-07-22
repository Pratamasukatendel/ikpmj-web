// app/component/admin/tabelSuratMasuk.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Data dummy untuk simulasi fetch dari API
const dummySuratMasukData = [
  {
    id: 1,
    nomorSurat: "001/IKPMJ/VI/2025",
    tanggalSurat: "2025-06-01",
    tanggalDiterima: "2025-06-03",
    pengirim: "Kampus Amikom",
    perihal: "Undangan Rapat Koordinasi",
    jenisSurat: "Undangan",
    catatan: "Penting, terkait program kerja",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf", // Contoh URL file PDF
  },
  {
    id: 2,
    nomorSurat: "002/Dinsos/V/2025",
    tanggalSurat: "2025-05-28",
    tanggalDiterima: "2025-06-05",
    pengirim: "Dinas Sosial DIY",
    perihal: "Permohonan Data Mahasiswa",
    jenisSurat: "Permohonan",
    catatan: "Untuk program bantuan sosial",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 3,
    nomorSurat: "003/IKPMJ/VI/2025",
    tanggalSurat: "2025-06-10",
    tanggalDiterima: "2025-06-12",
    pengirim: "Kampus Amikom",
    perihal: "Pemberitahuan Libur Semester",
    jenisSurat: "Pemberitahuan",
    catatan: "Info libur akademik",
    fileUrl: "https://www.africau.edu/images/default/sample.pdf",
  },
];

// Komponen TabelSuratMasuk menerima searchTerm sebagai props
export default function TabelSuratMasuk({ searchTerm }) {
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk simulasi fetch data dari API
  useEffect(() => {
    const fetchSuratMasukData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        // Simulasi delay fetch data dari API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setSuratMasuk(dummySuratMasukData); // Set data yang di-fetch
        setStatusMessage("Data surat masuk berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
        setStatusMessage("Gagal memuat data surat masuk.");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuratMasukData();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  // Fungsi handleDelete
  const handleDelete = (id) => {
    setStatusMessage(`Simulasi: Menghapus surat masuk ID ${id}...`);
    setIsError(false);

    setTimeout(() => {
      setSuratMasuk((prevSurat) =>
        prevSurat.filter((surat) => surat.id !== id)
      );
      setStatusMessage(`Surat masuk ID ${id} berhasil dihapus (simulasi)!`);
      setIsError(false);
    }, 500);
  };

  // Fungsi untuk memfilter data berdasarkan searchTerm
  const filteredSuratMasuk = suratMasuk.filter((surat) => {
    const currentSearchTerm = searchTerm || "";
    return (
      surat.pengirim.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
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
        Memuat data surat masuk...
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
              Pengirim
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
          {filteredSuratMasuk.length > 0 ? (
            filteredSuratMasuk.map((surat, index) => (
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
                <td className="p-4 text-sm">{surat.pengirim}</td>
                <td className="p-4 text-sm">{surat.perihal}</td>
                <td className="p-4 whitespace-nowrap text-sm">
                  {surat.jenisSurat}
                </td>
                <td className="p-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/surat/masuk/detail/${surat.id}`}
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
                    Unduh
                  </a>
                  <Link
                    href={`/admin/surat/masuk/edit/${surat.id}`}
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
                Tidak ada surat masuk yang ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

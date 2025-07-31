"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function DetailSuratKeluar() {
  const { id } = useParams(); // Mengambil ID surat dari URL
  const router = useRouter();

  const [suratData, setSuratData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Fungsi untuk format tanggal (DD/MM/YYYY) dari ISO string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // Handle invalid date
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);

      try {
        const response = await fetch(`/api/surat-keluar/${id}`); // Panggil API GET detail surat keluar
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Gagal mengambil data surat keluar."
          );
        }
        const data = await response.json();
        const surat = data.suratKeluar; // Sesuaikan dengan struktur respons API (data.suratKeluar)

        // Memastikan field sesuai dengan model Mongoose
        setSuratData({
          _id: surat._id, // ID dari MongoDB
          nomorSurat: surat.nomorSurat,
          tanggalSurat: surat.tanggalSurat,
          tanggalDikirim: surat.tanggalDikirim, // Menggunakan tanggalDikirim dari model
          penerima: surat.penerima, // Menggunakan 'penerima' dari model
          perihal: surat.perihal,
          isiSurat: surat.isiSurat, // Menggunakan isiSurat dari model
          jenisSurat: surat.jenisSurat,
          catatan: surat.catatan,
          fileSurat: surat.fileSurat, // Menggunakan nama field 'fileSurat'
          originalFileName: surat.originalFileName, // Mengambil originalFileName dari API
          status: surat.status, // Jika ingin menampilkan status
          createdAt: surat.createdAt,
          updatedAt: surat.updatedAt,
        });
        setStatusMessage("Data surat berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatusMessage(`Gagal memuat data surat: ${error.message}`);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Navbar />
          <div className="text-xl text-gray-700">
            Memuat detail surat keluar...
          </div>
        </div>
      </div>
    );
  }

  if (isError || !suratData) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Navbar />
          <div className="text-xl text-red-600">
            {statusMessage ||
              "Data surat tidak ditemukan atau terjadi kesalahan."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Detail Surat Keluar{" "}
              <span className="text-teal-600">ID: {suratData.perihal}</span>
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
              {/* Pesan Status */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-md text-sm mb-4 ${
                    isError
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-700">
                <div className="col-span-full border-b pb-3 mb-3">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Informasi Umum
                  </h2>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Nomor Surat:
                  </p>
                  <p className="text-base font-semibold">
                    {suratData.nomorSurat}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tanggal Surat:
                  </p>
                  <p className="text-base">
                    {formatDate(suratData.tanggalSurat)}
                  </p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Tujuan Surat:
                  </p>
                  <p className="text-lg font-bold">
                    {suratData.penerima} {/* Menggunakan penerima */}
                  </p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Perihal / Judul:
                  </p>
                  <p className="text-lg font-bold">{suratData.perihal}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Isi Surat:
                  </p>
                  <p className="text-base bg-gray-50 p-3 rounded-md border border-gray-200 whitespace-pre-wrap">
                    {suratData.isiSurat || "Tidak ada isi surat."}{" "}
                    {/* Menggunakan isiSurat */}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Jenis Surat:
                  </p>
                  <p className="text-base">{suratData.jenisSurat}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Catatan Tambahan:
                  </p>
                  <p className="text-base bg-gray-50 p-3 rounded-md border border-gray-200">
                    {suratData.catatan || "Tidak ada catatan."}
                  </p>
                </div>

                <div className="col-span-full border-b pb-3 mb-3 pt-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    File Surat
                  </h2>
                </div>
                <div className="col-span-full">
                  {suratData.fileSurat && suratData.fileSurat.length > 0 ? (
                    <a
                      href={suratData.fileSurat[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      // PERBAIKAN: Menambahkan atribut 'download' dengan nama file asli
                      download={
                        suratData.originalFileName || "surat_keluar.pdf"
                      }
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      Unduh File Surat
                    </a>
                  ) : (
                    <p className="text-gray-500">
                      Tidak ada file surat yang diunggah.
                    </p>
                  )}
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-4 pt-8">
                <Link
                  href={`/admin/surat/keluar/edit/${id}`}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-md"
                >
                  Edit Surat
                </Link>
                <Link
                  href={"/admin/surat?tab=keluar"} // Mengarahkan ke daftar surat keluar
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold shadow-md"
                >
                  Kembali ke Daftar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// app/admin/surat/masuk/detail/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function DetailSuratMasuk() {
  const { id } = useParams(); // Mengambil ID surat dari URL
  const router = useRouter();

  const [suratData, setSuratData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata data surat masuk berdasarkan ID dari API/database Anda ---
        // Contoh:
        // const response = await fetch(`/api/surat-masuk/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data surat masuk.');
        // }
        // const data = await response.json();
        // setSuratData(data);

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const fakeData = {
          id: id,
          nomor_surat: `00${id}/IKPMJ/VI/2025`,
          tanggal_surat: "2025-06-01",
          tanggal_diterima: "2025-06-03",
          pengirim: `Pengirim Contoh ${id}`,
          perihal: `Perihal Detail Surat Masuk ${id}: Undangan Penting`,
          jenis_surat: id % 2 === 0 ? "Permohonan" : "Undangan",
          catatan: `Ini adalah catatan tambahan untuk surat masuk dengan ID ${id}. Detail lebih lanjut mengenai isi surat dan tindakan yang perlu diambil.`,
          file_url: `https://www.africau.edu/images/default/sample.pdf?id=${id}`, // Contoh URL file PDF
        };
        setSuratData(fakeData);
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

  // Fungsi untuk format tanggal (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Navbar />
          <div className="text-xl text-gray-700">
            Memuat detail surat masuk...
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
              Detail Surat Masuk <span className="text-teal-600">ID: {id}</span>
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
                    {suratData.nomor_surat}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pengirim:</p>
                  <p className="text-base font-semibold">
                    {suratData.pengirim}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tanggal Surat:
                  </p>
                  <p className="text-base">
                    {formatDate(suratData.tanggal_surat)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tanggal Diterima:
                  </p>
                  <p className="text-base">
                    {formatDate(suratData.tanggal_diterima)}
                  </p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Perihal / Judul:
                  </p>
                  <p className="text-lg font-bold">{suratData.perihal}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Jenis Surat:
                  </p>
                  <p className="text-base">{suratData.jenis_surat}</p>
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
                  {suratData.file_url ? (
                    <a
                      href={suratData.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  href={`/admin/surat/masuk/edit/${id}`}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-md"
                >
                  Edit Surat
                </Link>
                <Link
                  href={"/admin/surat/"}
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

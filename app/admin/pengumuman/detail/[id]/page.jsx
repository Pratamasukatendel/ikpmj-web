// app/admin/pengumuman/detail/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function DetailPengumuman() {
  const { id } = useParams(); // Mengambil ID pengumuman dari URL
  const router = useRouter();

  const [pengumumanData, setPengumumanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata data pengumuman berdasarkan ID dari API/database Anda ---
        // Contoh:
        // const response = await fetch(`/api/pengumuman/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data pengumuman.');
        // }
        // const data = await response.json();
        // setPengumumanData(data);

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        const fakeData = {
          id: id,
          judul: `Pengumuman Detail ID ${id}: Rapat Anggota`,
          isi: `Ini adalah isi lengkap dari pengumuman dengan ID ${id}. Diberitahukan kepada seluruh anggota IKPMJ bahwa rapat anggota bulanan akan diadakan pada hari Minggu, 25 Juli 2025, pukul 10.00 WIB di Aula Serbaguna. Agenda rapat meliputi evaluasi program kerja dan perencanaan kegiatan mendatang. Diharapkan kehadiran seluruh anggota.`,
          tanggal_publikasi: "2025-07-10",
          tanggal_berakhir: "2025-07-24",
          status: "Aktif",
          penulis: "Sekretaris IKPMJ",
          lampiran_url: `https://www.africau.edu/images/default/sample.pdf?id=${id}`, // Contoh URL lampiran
        };
        setPengumumanData(fakeData);
        setStatusMessage("Data pengumuman berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatusMessage(`Gagal memuat data pengumuman: ${error.message}`);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
            Memuat detail pengumuman...
          </div>
        </div>
      </div>
    );
  }

  if (isError || !pengumumanData) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Navbar />
          <div className="text-xl text-red-600">
            {statusMessage ||
              "Data pengumuman tidak ditemukan atau terjadi kesalahan."}
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
              Detail Pengumuman <span className="text-teal-600">ID: {id}</span>
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
                    Informasi Pengumuman
                  </h2>
                </div>

                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Judul Pengumuman:
                  </p>
                  <p className="text-lg font-bold">{pengumumanData.judul}</p>
                </div>
                <div className="col-span-full">
                  <p className="text-sm font-medium text-gray-500">
                    Isi Pengumuman:
                  </p>
                  <p className="text-base bg-gray-50 p-3 rounded-md border border-gray-200 whitespace-pre-wrap">
                    {pengumumanData.isi || "Tidak ada isi pengumuman."}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tanggal Publikasi:
                  </p>
                  <p className="text-base">
                    {formatDate(pengumumanData.tanggal_publikasi)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Tanggal Berakhir:
                  </p>
                  <p className="text-base">
                    {pengumumanData.tanggal_berakhir
                      ? formatDate(pengumumanData.tanggal_berakhir)
                      : "Tidak ada"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status:</p>
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      pengumumanData.status
                    )}`}
                  >
                    {pengumumanData.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Penulis:</p>
                  <p className="text-base">{pengumumanData.penulis}</p>
                </div>

                <div className="col-span-full border-b pb-3 mb-3 pt-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Lampiran
                  </h2>
                </div>
                <div className="col-span-full">
                  {pengumumanData.lampiran_url ? (
                    <a
                      href={pengumumanData.lampiran_url}
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
                      Unduh Lampiran
                    </a>
                  ) : (
                    <p className="text-gray-500">Tidak ada lampiran.</p>
                  )}
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-4 pt-8">
                <Link
                  href={`/admin/pengumuman/edit/${id}`}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold shadow-md"
                >
                  Edit Pengumuman
                </Link>
                <Link
                  href={"/admin/pengumuman/"}
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

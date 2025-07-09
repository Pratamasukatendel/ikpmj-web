"use client";

import React, { useState } from "react"; // Import useState
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function TambahKegiatan() {
  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    namaKegiatan: "",
    tanggalKegiatan: "",
    keterangan: "",
  });

  // State untuk pesan status (sukses/error)
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Handler untuk perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setStatusMessage("Sedang menyimpan...");
    setIsError(false);

    try {
      // Simulasi pengiriman data ke API
      // Di aplikasi nyata, Anda akan mengirimkan data ke endpoint API Anda,
      // misalnya: /api/kegiatan (jika Anda membuat API route di Next.js)
      console.log("Mengirim data kegiatan:", formData);

      // Contoh fetch API (Anda perlu menyesuaikan URL dan metode)
      const response = await fetch("/api/kegiatan", {
        // Ganti dengan URL API Anda
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Jika respons tidak OK (misal status 4xx atau 5xx)
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan kegiatan.");
      }

      // Jika sukses
      setStatusMessage("Kegiatan berhasil ditambahkan!");
      setIsError(false);
      // Reset form setelah sukses
      setFormData({
        namaKegiatan: "",
        tanggalKegiatan: "",
        keterangan: "",
      });
      // Opsional: Redirect ke halaman daftar kegiatan setelah sukses
      // router.push('/admin/kegiatan');
    } catch (error) {
      console.error("Error saat menambahkan kegiatan:", error);
      setStatusMessage(`Gagal menambahkan kegiatan: ${error.message}`);
      setIsError(true);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {" "}
      {/* Menambahkan min-h-screen dan bg-gray-100 di sini */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {" "}
        {/* Menggunakan flex-1 untuk mengisi sisa lebar */}
        <Navbar />
        <div className="p-7 flex-1 flex flex-col items-center justify-center">
          {" "}
          {/* flex-1 agar konten mengisi ruang vertikal */}
          <div className="w-full max-w-2xl">
            {" "}
            {/* Menambahkan max-w-2xl untuk lebar form yang terkontrol */}
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {" "}
              {/* Mengubah ukuran dan warna teks */}
              Tambah Kegiatan Baru
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
              {" "}
              {/* Mengubah shadow dan menambahkan border */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pesan Status */}
                {statusMessage && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      isError
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {statusMessage}
                  </div>
                )}

                {/* Nama Kegiatan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="namaKegiatan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Nama Kegiatan
                  </label>
                  <input
                    type="text"
                    id="namaKegiatan"
                    name="namaKegiatan" // Pastikan name sesuai dengan key di formData
                    value={formData.namaKegiatan} // Mengikat nilai input ke state
                    onChange={handleChange} // Menangani perubahan input
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Tanggal Kegiatan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="tanggalKegiatan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="date"
                    id="tanggalKegiatan"
                    name="tanggalKegiatan" // Pastikan name sesuai dengan key di formData
                    value={formData.tanggalKegiatan} // Mengikat nilai input ke state
                    onChange={handleChange} // Menangani perubahan input
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Keterangan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="keterangan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Keterangan
                  </label>
                  <textarea
                    id="keterangan"
                    name="keterangan" // Pastikan name sesuai dengan key di formData
                    value={formData.keterangan} // Mengikat nilai input ke state
                    onChange={handleChange} // Menangani perubahan input
                    rows="5" // Menambah tinggi default textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  ></textarea>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                  {" "}
                  {/* Menambahkan padding-top */}
                  <Link
                    href={"/admin/kegiatan/"}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md" // Mengubah styling tombol
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md" // Mengubah styling tombol
                  >
                    Simpan Kegiatan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

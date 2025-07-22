// app/admin/pengumuman/tambah/page.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function TambahPengumuman() {
  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    judul: "",
    isi: "", // textarea sebagai pengganti WYSIWYG
    tanggalPublikasi: "", // YYYY-MM-DD
    tanggalBerakhir: "", // YYYY-MM-DD
    status: "Draft", // Default status
    penulis: "Admin IKPMJ", // Bisa diambil dari sesi login
    lampiran: null, // Untuk menyimpan objek File yang diupload
  });

  // State untuk pesan status (sukses/error)
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State untuk loading saat submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler untuk perubahan input teks dan select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler khusus untuk input file
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      lampiran: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan...");
    setIsError(false);

    try {
      let uploadedLampiranUrl = "";
      if (formData.lampiran) {
        // --- SIMULASI UPLOAD FILE LAMPIRAN ---
        // Di sini Anda akan mengimplementasikan logika upload file ke server/cloud storage.
        // Contoh:
        // const uploadFormData = new FormData();
        // uploadFormData.append('file', formData.lampiran);
        // const uploadResponse = await fetch('/api/upload-lampiran', {
        //   method: 'POST',
        //   body: uploadFormData,
        // });
        // if (!uploadResponse.ok) {
        //   throw new Error('Gagal mengupload lampiran.');
        // }
        // const uploadResult = await uploadResponse.json();
        // uploadedLampiranUrl = uploadResult.url; // URL file yang diupload

        // Simulasi delay upload
        await new Promise((resolve) => setTimeout(resolve, 1500));
        uploadedLampiranUrl = `https://www.africau.edu/images/default/sample.pdf?id=${Date.now()}`; // Placeholder URL PDF
        console.log("Simulasi lampiran diupload ke:", uploadedLampiranUrl);
      }

      // Susun data payload
      const payload = {
        judul: formData.judul,
        isi: formData.isi,
        tanggal_publikasi: formData.tanggalPublikasi,
        tanggal_berakhir: formData.tanggalBerakhir,
        status: formData.status,
        penulis: formData.penulis,
        lampiran_url: uploadedLampiranUrl, // Menggunakan URL lampiran yang diupload (simulasi)
      };

      console.log("Mengirim data pengumuman ke API:", payload);

      // --- SIMULASI PENGIRIMAN DATA KE API ---
      const response = await fetch("/api/pengumuman", {
        // Ganti dengan URL API Anda
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan pengumuman.");
      }

      setStatusMessage("Pengumuman berhasil ditambahkan!");
      setIsError(false);

      // Reset form
      setFormData({
        judul: "",
        isi: "",
        tanggalPublikasi: "",
        tanggalBerakhir: "",
        status: "Draft",
        penulis: "Admin IKPMJ",
        lampiran: null,
      });

      // Opsional: Redirect setelah beberapa saat
      // setTimeout(() => {
      //   router.push("/admin/pengumuman");
      // }, 1500);
    } catch (error) {
      console.error("Error saat menambahkan pengumuman:", error);
      setStatusMessage(`Gagal menambahkan pengumuman: ${error.message}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Tambah Pengumuman Baru
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
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

                {/* Judul Pengumuman */}
                <div className="flex flex-col">
                  <label
                    htmlFor="judul"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Judul Pengumuman
                  </label>
                  <input
                    type="text"
                    id="judul"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Isi Pengumuman */}
                <div className="flex flex-col">
                  <label
                    htmlFor="isi"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Isi Pengumuman
                  </label>
                  <textarea
                    id="isi"
                    name="isi"
                    value={formData.isi}
                    onChange={handleChange}
                    rows="8" // Lebih tinggi untuk isi pengumuman
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    placeholder="Masukkan isi pengumuman di sini."
                  ></textarea>
                </div>

                {/* Tanggal Publikasi & Tanggal Berakhir */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="tanggalPublikasi"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Tanggal Publikasi
                    </label>
                    <input
                      type="date"
                      id="tanggalPublikasi"
                      name="tanggalPublikasi"
                      value={formData.tanggalPublikasi}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="tanggalBerakhir"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Tanggal Berakhir (Opsional)
                    </label>
                    <input
                      type="date"
                      id="tanggalBerakhir"
                      name="tanggalBerakhir"
                      value={formData.tanggalBerakhir}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Status Pengumuman */}
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Status Pengumuman
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>

                {/* Penulis (bisa hidden jika otomatis dari sesi) */}
                <div className="flex flex-col">
                  <label
                    htmlFor="penulis"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Penulis
                  </label>
                  <input
                    type="text"
                    id="penulis"
                    name="penulis"
                    value={formData.penulis}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Upload Lampiran */}
                <div className="flex flex-col">
                  <label
                    htmlFor="lampiran"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Upload Lampiran (PDF, Gambar, dll.)
                  </label>
                  <input
                    type="file"
                    id="lampiran"
                    name="lampiran"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Filter jenis file
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {formData.lampiran && (
                    <p className="mt-2 text-sm text-gray-500">
                      File terpilih: {formData.lampiran.name}
                    </p>
                  )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                  <Link
                    href={"/admin/pengumuman/"}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold shadow-md"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-colors ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Pengumuman"}
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

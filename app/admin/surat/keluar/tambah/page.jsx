// app/admin/surat/keluar/tambah/page.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function TambahSuratKeluar() {
  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nomorSurat: "",
    tanggalSurat: "", // YYYY-MM-DD
    tujuan: "",
    perihal: "",
    isiSurat: "", // Placeholder untuk WYSIWYG
    jenisSurat: "Pemberitahuan", // Default value
    catatan: "", // Catatan tambahan
    fileSurat: null, // Untuk menyimpan objek File yang diupload (file final PDF)
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
      fileSurat: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan...");
    setIsError(false);

    try {
      let uploadedFileUrl = "";
      if (formData.fileSurat) {
        // --- SIMULASI UPLOAD FILE SURAT KELUAR ---
        // Di sini Anda akan mengimplementasikan logika upload file ke server/cloud storage.
        // Contoh: Menggunakan FormData untuk mengirim file ke API Route Next.js
        // const uploadFormData = new FormData();
        // uploadFormData.append('file', formData.fileSurat);
        // const uploadResponse = await fetch('/api/upload-surat-keluar-file', {
        //   method: 'POST',
        //   body: uploadFormData,
        // });
        // if (!uploadResponse.ok) {
        //   throw new Error('Gagal mengupload file surat keluar.');
        // }
        // const uploadResult = await uploadResponse.json();
        // uploadedFileUrl = uploadResult.url; // URL file yang diupload

        // Simulasi delay upload
        await new Promise((resolve) => setTimeout(resolve, 1500));
        uploadedFileUrl = `https://www.africau.edu/images/default/sample.pdf?id=${Date.now()}`; // Placeholder URL PDF
        console.log("Simulasi file diupload ke:", uploadedFileUrl);
      }

      // Susun data payload sesuai struktur tabel surat keluar
      const payload = {
        nomor_surat: formData.nomorSurat,
        tanggal_surat: formData.tanggalSurat,
        tujuan: formData.tujuan,
        perihal: formData.perihal,
        isi_surat: formData.isiSurat,
        jenis_surat: formData.jenisSurat,
        catatan: formData.catatan,
        file_url: uploadedFileUrl, // Menggunakan URL file yang diupload (simulasi)
      };

      console.log("Mengirim data surat keluar ke API:", payload);

      // --- SIMULASI PENGIRIMAN DATA KE API ---
      const response = await fetch("/api/surat-keluar", {
        // Ganti dengan URL API Anda
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan surat keluar.");
      }

      setStatusMessage("Surat keluar berhasil ditambahkan!");
      setIsError(false);

      // Reset form
      setFormData({
        nomorSurat: "",
        tanggalSurat: "",
        tujuan: "",
        perihal: "",
        isiSurat: "",
        jenisSurat: "Pemberitahuan",
        catatan: "",
        fileSurat: null,
      });

      // Opsional: Redirect setelah beberapa saat
      // setTimeout(() => {
      //   router.push("/admin/surat"); // Atau ke halaman daftar surat keluar
      // }, 1500);
    } catch (error) {
      console.error("Error saat menambahkan surat keluar:", error);
      setStatusMessage(`Gagal menambahkan surat keluar: ${error.message}`);
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
              Tambah Surat Keluar Baru
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

                {/* Nomor Surat */}
                <div className="flex flex-col">
                  <label
                    htmlFor="nomorSurat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Nomor Surat
                  </label>
                  <input
                    type="text"
                    id="nomorSurat"
                    name="nomorSurat"
                    value={formData.nomorSurat}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    (Bisa diisi manual atau di-generate otomatis oleh sistem di
                    backend)
                  </p>
                </div>

                {/* Tanggal Surat */}
                <div className="flex flex-col">
                  <label
                    htmlFor="tanggalSurat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Tanggal Surat
                  </label>
                  <input
                    type="date"
                    id="tanggalSurat"
                    name="tanggalSurat"
                    value={formData.tanggalSurat}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Tujuan Surat */}
                <div className="flex flex-col">
                  <label
                    htmlFor="tujuan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Tujuan Surat
                  </label>
                  <input
                    type="text"
                    id="tujuan"
                    name="tujuan"
                    value={formData.tujuan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Perihal */}
                <div className="flex flex-col">
                  <label
                    htmlFor="perihal"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Perihal / Judul
                  </label>
                  <input
                    type="text"
                    id="perihal"
                    name="perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Isi Surat (WYSIWYG Placeholder) */}
                <div className="flex flex-col">
                  <label
                    htmlFor="isiSurat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Isi Surat
                  </label>
                  <textarea
                    id="isiSurat"
                    name="isiSurat"
                    value={formData.isiSurat}
                    onChange={handleChange}
                    rows="8" // Lebih tinggi untuk isi surat
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    placeholder="Masukkan isi surat di sini. (Di implementasi nyata bisa menggunakan WYSIWYG editor)"
                  ></textarea>
                </div>

                {/* Jenis Surat */}
                <div className="flex flex-col">
                  <label
                    htmlFor="jenisSurat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Jenis Surat
                  </label>
                  <select
                    id="jenisSurat"
                    name="jenisSurat"
                    value={formData.jenisSurat}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  >
                    <option value="Pemberitahuan">Pemberitahuan</option>
                    <option value="Undangan">Undangan</option>
                    <option value="Permohonan">Permohonan</option>
                    <option value="Internal">Internal</option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>
                </div>

                {/* Catatan Tambahan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="catatan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    id="catatan"
                    name="catatan"
                    value={formData.catatan}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  ></textarea>
                </div>

                {/* Upload File Surat Final (PDF/Word) */}
                <div className="flex flex-col">
                  <label
                    htmlFor="fileSurat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Upload File Surat Final (PDF, Word)
                  </label>
                  <input
                    type="file"
                    id="fileSurat"
                    name="fileSurat"
                    accept=".pdf,.doc,.docx" // Hanya menerima PDF dan Word
                    onChange={handleFileChange}
                    required // File final harus diupload
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {formData.fileSurat && (
                    <p className="mt-2 text-sm text-gray-500">
                      File terpilih: {formData.fileSurat.name}
                    </p>
                  )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                  <Link
                    href={"/admin/surat/"}
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
                    {isSubmitting ? "Menyimpan..." : "Simpan Surat Keluar"}
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

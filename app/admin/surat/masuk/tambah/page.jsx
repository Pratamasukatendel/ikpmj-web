"use client";

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter untuk redirect

export default function TambahSuratMasuk() {
  const router = useRouter(); // Inisialisasi useRouter

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nomorSurat: "",
    tanggalSurat: "", // YYYY-MM-DD
    tanggalDiterima: "", // YYYY-MM-DD
    pengirim: "",
    perihal: "",
    jenisSurat: "Undangan", // Default value
    catatan: "",
    fileSurat: null, // Untuk menyimpan objek File yang diupload
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
      // Buat objek FormData
      const dataToSend = new FormData();
      dataToSend.append("nomorSurat", formData.nomorSurat);
      dataToSend.append("tanggalSurat", formData.tanggalSurat);
      dataToSend.append("tanggalDiterima", formData.tanggalDiterima);
      dataToSend.append("pengirim", formData.pengirim);
      dataToSend.append("perihal", formData.perihal);
      dataToSend.append("jenisSurat", formData.jenisSurat);
      dataToSend.append("catatan", formData.catatan);

      // Tambahkan file jika ada
      if (formData.fileSurat) {
        dataToSend.append("fileSurat", formData.fileSurat);
      }

      console.log(
        "Mengirim data surat masuk ke API:",
        Object.fromEntries(dataToSend.entries())
      );

      // Kirim data ke API Route Next.js
      const response = await fetch("/api/surat-masuk", {
        method: "POST",
        // Penting: Jangan set Content-Type untuk FormData, browser akan mengaturnya secara otomatis
        // headers: {
        //   "Content-Type": "multipart/form-data", // Ini tidak perlu diset manual
        // },
        body: dataToSend, // Kirim objek FormData langsung
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan surat masuk.");
      }

      setStatusMessage("Surat masuk berhasil ditambahkan!");
      setIsError(false);

      // Reset form
      setFormData({
        nomorSurat: "",
        tanggalSurat: "",
        tanggalDiterima: "",
        pengirim: "",
        perihal: "",
        jenisSurat: "Undangan",
        catatan: "",
        fileSurat: null,
      });

      // Opsional: Redirect setelah beberapa saat
      setTimeout(() => {
        router.push("/admin/surat"); // Redirect ke halaman daftar surat masuk
      }, 1500);
    } catch (error) {
      console.error("Error saat menambahkan surat masuk:", error);
      setStatusMessage(`Gagal menambahkan surat masuk: ${error.message}`);
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
              Tambah Surat Masuk Baru
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
                </div>

                {/* Tanggal Surat & Tanggal Diterima */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="flex flex-col">
                    <label
                      htmlFor="tanggalDiterima"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Tanggal Diterima
                    </label>
                    <input
                      type="date"
                      id="tanggalDiterima"
                      name="tanggalDiterima"
                      value={formData.tanggalDiterima}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Pengirim */}
                <div className="flex flex-col">
                  <label
                    htmlFor="pengirim"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Pengirim
                  </label>
                  <input
                    type="text"
                    id="pengirim"
                    name="pengirim"
                    value={formData.pengirim}
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
                    <option value="Undangan">Undangan</option>
                    <option value="Permohonan">Permohonan</option>
                    <option value="Pemberitahuan">Pemberitahuan</option>
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

                {/* Upload File Surat */}
                <div className="flex flex-col">
                  <label
                    htmlFor="fileSurat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Upload File Surat (PDF, Word)
                  </label>
                  <input
                    type="file"
                    id="fileSurat"
                    name="fileSurat"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Filter jenis file
                    onChange={handleFileChange}
                    required // File harus diupload
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
                    href={"/admin/surat"} // Mengarahkan ke daftar surat masuk
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold shadow-md"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-colors ${
                      isSubmitting
                        ? "bg-orange-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Surat Masuk"}
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

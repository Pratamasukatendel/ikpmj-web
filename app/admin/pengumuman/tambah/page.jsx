// app/admin/pengumuman/tambah/page.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TambahPengumuman() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    tanggalPublikasi: "",
    tanggalBerakhir: "",
    status: "Draft",
    penulis: "Admin IKPMJ",
    lampiran: null,
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      lampiran: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan...");
    setIsError(false);

    try {
      let uploadedLampiranUrl = "";

      // --- PROSES UPLOAD FILE KE CLOUDINARY ---
      if (formData.lampiran) {
        setStatusMessage("Mengunggah lampiran...");
        const uploadData = new FormData();
        // Menggunakan 'profileImage' agar cocok dengan API upload Anda
        uploadData.append("profileImage", formData.lampiran);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadResponse.ok) {
          const errorResult = await uploadResponse.json();
          throw new Error(errorResult.message || 'Gagal mengunggah lampiran.');
        }

        const result = await uploadResponse.json();
        uploadedLampiranUrl = result.url; // URL dari Cloudinary
        setStatusMessage("Lampiran berhasil diunggah. Menyimpan pengumuman...");
      }

      const payload = {
        judul: formData.judul,
        isi: formData.isi,
        tanggal_publikasi: formData.tanggalPublikasi,
        tanggal_berakhir: formData.tanggalBerakhir || null,
        status: formData.status,
        penulis: formData.penulis,
        lampiran_url: uploadedLampiranUrl,
      };

      const response = await fetch("/api/pengumuman", {
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

      setTimeout(() => {
        router.push("/admin/pengumuman");
      }, 1500);

    } catch (error) {
      console.error("Error saat menambahkan pengumuman:", error);
      setStatusMessage(`Gagal: ${error.message}`);
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

                <div className="flex flex-col">
                  <label htmlFor="judul" className="mb-2 text-gray-700 font-medium">
                    Judul Pengumuman
                  </label>
                  <input
                    type="text"
                    id="judul"
                    name="judul"
                    value={formData.judul}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="isi" className="mb-2 text-gray-700 font-medium">
                    Isi Pengumuman
                  </label>
                  <textarea
                    id="isi"
                    name="isi"
                    value={formData.isi}
                    onChange={handleChange}
                    rows="8"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Masukkan isi pengumuman di sini."
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="tanggalPublikasi" className="mb-2 text-gray-700 font-medium">
                      Tanggal Publikasi
                    </label>
                    <input
                      type="date"
                      id="tanggalPublikasi"
                      name="tanggalPublikasi"
                      value={formData.tanggalPublikasi}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="tanggalBerakhir" className="mb-2 text-gray-700 font-medium">
                      Tanggal Berakhir (Opsional)
                    </label>
                    <input
                      type="date"
                      id="tanggalBerakhir"
                      name="tanggalBerakhir"
                      value={formData.tanggalBerakhir}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="status" className="mb-2 text-gray-700 font-medium">
                    Status Pengumuman
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="penulis" className="mb-2 text-gray-700 font-medium">
                    Penulis
                  </label>
                  <input
                    type="text"
                    id="penulis"
                    name="penulis"
                    value={formData.penulis}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lampiran" className="mb-2 text-gray-700 font-medium">
                    Upload Gambar (Ratio 16:9) 
                  </label>
                  <input
                    type="file"
                    id="lampiran"
                    name="lampiran"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.lampiran && (
                    <p className="mt-2 text-sm text-gray-500">
                      File terpilih: {formData.lampiran.name}
                    </p>
                  )}
                </div>

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
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md text-white transition-colors ${
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

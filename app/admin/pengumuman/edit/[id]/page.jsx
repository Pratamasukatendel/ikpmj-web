// app/admin/pengumuman/edit/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function EditPengumuman() {
  const { id } = useParams(); // Mengambil ID pengumuman dari URL
  const router = useRouter();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    tanggalPublikasi: "",
    tanggalBerakhir: "",
    status: "Draft",
    penulis: "",
    lampiran: null, // Untuk menyimpan objek File yang baru diupload
    currentLampiranUrl: "", // Untuk menampilkan URL lampiran yang sudah ada
  });

  // State untuk loading status saat fetch data atau submit
  const [isLoading, setIsLoading] = useState(true);
  // State untuk pesan status (sukses/error) setelah operasi
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State untuk loading saat submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect untuk fetch data pengumuman saat komponen dimuat atau ID berubah
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage(""); // Reset pesan status
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata data pengumuman berdasarkan ID dari API/database Anda ---
        // Contoh:
        // const response = await fetch(`/api/pengumuman/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data pengumuman.');
        // }
        // const data = await response.json();
        // setFormData({
        //   judul: data.judul,
        //   isi: data.isi,
        //   tanggalPublikasi: data.tanggal_publikasi,
        //   tanggalBerakhir: data.tanggal_berakhir || '', // Handle null/undefined
        //   status: data.status,
        //   penulis: data.penulis,
        //   lampiran: null, // File input selalu dimulai dari null
        //   currentLampiranUrl: data.lampiran_url || '', // URL lampiran yang sudah ada
        // });

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi loading
        const fakeData = {
          id: id,
          judul: `Pengumuman ID ${id} (Edit)`,
          isi: `Ini adalah isi pengumuman dengan ID ${id} yang sedang diedit. Konten ini bisa sangat panjang dan penting.`,
          tanggal_publikasi: "2025-06-15",
          tanggal_berakhir: "2025-07-31",
          status: id % 2 === 0 ? "Aktif" : "Draft",
          penulis: "Admin IKPMJ",
          lampiran_url: `https://www.africau.edu/images/default/sample.pdf?id=${id}`,
        };

        setFormData({
          judul: fakeData.judul,
          isi: fakeData.isi,
          tanggalPublikasi: fakeData.tanggal_publikasi,
          tanggalBerakhir: fakeData.tanggal_berakhir,
          status: fakeData.status,
          penulis: fakeData.penulis,
          lampiran: null, // Selalu null untuk input file
          currentLampiranUrl: fakeData.lampiran_url, // Simpan URL yang ada
        });

        setStatusMessage("Data pengumuman berhasil dimuat.");
        setIsError(false);
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
  }, [id]); // Dependensi [id] agar fetch ulang jika ID di URL berubah

  // Handler untuk perubahan input teks dan select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler khusus untuk input file
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      lampiran: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      let finalLampiranUrl = formData.currentLampiranUrl; // Default ke URL yang sudah ada

      if (formData.lampiran) {
        // --- SIMULASI UPLOAD FILE BARU ---
        // Di sini Anda akan mengimplementasikan logika upload file ke server/cloud storage.
        // Contoh:
        // const uploadFormData = new FormData();
        // uploadFormData.append('file', formData.lampiran);
        // const uploadResponse = await fetch('/api/upload-lampiran', {
        //   method: 'POST',
        //   body: uploadFormData,
        // });
        // if (!uploadResponse.ok) {
        //   throw new Error('Gagal mengupload lampiran baru.');
        // }
        // const uploadResult = await uploadResponse.json();
        // finalLampiranUrl = uploadResult.url; // URL file yang diupload

        // Simulasi delay upload
        await new Promise((resolve) => setTimeout(resolve, 1500));
        finalLampiranUrl = `https://www.africau.edu/images/default/sample.pdf?id=${id}&new=${Date.now()}`;
        console.log("Simulasi lampiran baru diupload ke:", finalLampiranUrl);
      }

      // Susun data payload
      const payload = {
        judul: formData.judul,
        isi: formData.isi,
        tanggal_publikasi: formData.tanggalPublikasi,
        tanggal_berakhir: formData.tanggalBerakhir,
        status: formData.status,
        penulis: formData.penulis,
        lampiran_url: finalLampiranUrl, // Menggunakan URL lampiran final
      };

      console.log("Mengirim data edit ke API:", payload);

      // --- SIMULASI PENGIRIMAN DATA UPDATE KE API ---
      const response = await fetch(`/api/pengumuman/${id}`, {
        // Ganti dengan URL API Anda
        method: "PUT", // Atau PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal menyimpan perubahan pengumuman."
        );
      }

      setStatusMessage("Perubahan pengumuman berhasil disimpan!");
      setIsError(false);
      // Opsional: Redirect setelah beberapa saat
      setTimeout(() => {
        router.push("/admin/pengumuman"); // Redirect ke halaman daftar pengumuman
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage(`Gagal menyimpan perubahan: ${error.message}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tampilkan loading state saat data sedang diambil
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Navbar />
          <div className="text-xl text-gray-700">Memuat data pengumuman...</div>
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
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Edit Pengumuman <span className="text-teal-600">ID: {id}</span>
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
                    rows="8"
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

                {/* Penulis */}
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
                    Upload Lampiran (Biarkan kosong jika tidak berubah)
                  </label>
                  <input
                    type="file"
                    id="lampiran"
                    name="lampiran"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // Filter jenis file
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {/* Tampilkan preview file yang sudah ada atau yang baru dipilih */}
                  {formData.lampiran ? (
                    <p className="mt-2 text-sm text-gray-500">
                      File baru terpilih: {formData.lampiran.name}
                    </p>
                  ) : (
                    formData.currentLampiranUrl && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Lampiran Saat Ini:
                        </p>
                        {formData.currentLampiranUrl.endsWith(".pdf") ||
                        formData.currentLampiranUrl.endsWith(".doc") ||
                        formData.currentLampiranUrl.endsWith(".docx") ? (
                          <a
                            href={formData.currentLampiranUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Lihat/Unduh Lampiran
                          </a>
                        ) : (
                          <img
                            src={formData.currentLampiranUrl}
                            alt="Preview Lampiran"
                            className="max-w-xs h-auto rounded-md shadow-sm border border-gray-200"
                          />
                        )}
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {formData.currentLampiranUrl}
                        </p>
                      </div>
                    )
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
                        ? "bg-teal-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                    }`}
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
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

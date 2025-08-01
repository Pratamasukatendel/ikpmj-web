// app/admin/kegiatan/edit/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function EditKegiatan() {
  const { id } = useParams(); // Mengambil ID dari URL
  const router = useRouter();

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    judul: "", // Nama kegiatan
    deskripsi: "", // Keterangan kegiatan
    tanggalMulai: "", // Format: YYYY-mm-dd
    jamMulai: "", // Format: hh:mm
    tanggalSelesai: "", // Format: YYYY-mm-dd
    jamSelesai: "", // Format: hh:mm
    lokasi: "",
    gambarPoster: null, // Untuk menyimpan objek File yang baru diupload
    currentGambarPosterUrl: "", // Untuk menampilkan URL gambar yang sudah ada
    status: "Terencana", // Status kegiatan
  });

  // State untuk loading status saat fetch data atau submit
  const [isLoading, setIsLoading] = useState(true);
  // State untuk pesan status (sukses/error) setelah operasi
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State untuk loading saat submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect untuk fetch data kegiatan saat komponen dimuat atau ID berubah
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage(""); // Reset pesan status
      setIsError(false);

      try {
        const response = await fetch(`/api/kegiatan/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Gagal mengambil data kegiatan.");
        }
        const data = await response.json();

        // Memecah format tanggal dari ISO string menjadi YYYY-MM-DD dan HH:mm
        const tanggalMulai = data.tanggal_mulai.substring(0, 10);
        const jamMulai = data.tanggal_mulai.substring(11, 16);
        const tanggalSelesai = data.tanggal_selesai.substring(0, 10);
        const jamSelesai = data.tanggal_selesai.substring(11, 16);

        setFormData({
          judul: data.judul,
          deskripsi: data.deskripsi,
          tanggalMulai,
          jamMulai,
          tanggalSelesai,
          jamSelesai,
          lokasi: data.lokasi,
          gambarPoster: null, // File input selalu dimulai dari null
          currentGambarPosterUrl: data.gambar_poster || "", // Simpan URL gambar yang sudah ada
          status: data.status,
        });

        setStatusMessage("Data kegiatan berhasil dimuat.");
        setIsError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatusMessage(`Gagal memuat data kegiatan: ${error.message}`);
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
      gambarPoster: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      let finalGambarPosterUrl = formData.currentGambarPosterUrl; // Default ke URL yang sudah ada

      if (formData.gambarPoster) {
        // Menggunakan FormData untuk mengirim file ke API Route Next.js
        const uploadFormData = new FormData();
        // Menggunakan nama field 'file' yang konsisten dengan API terpadu
        uploadFormData.append("file", formData.gambarPoster);

        // Panggil API upload terpadu dengan parameter folder
        const uploadResponse = await fetch(
          "/api/upload?folder=kegiatan_ikpmj",
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "Gagal mengunggah gambar baru.");
        }

        const uploadResult = await uploadResponse.json();
        finalGambarPosterUrl = uploadResult.url; // URL gambar dari Cloudinary
      }

      // Gabungkan tanggal dan jam menjadi format ISO 8601 (YYYY-MM-DDTHH:mm:ss)
      const tanggal_mulai = `${formData.tanggalMulai}T${formData.jamMulai}:00`;
      const tanggal_selesai = `${formData.tanggalSelesai}T${formData.jamSelesai}:00`;

      // Susun data payload sesuai struktur tabel
      const payload = {
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        lokasi: formData.lokasi,
        gambar_poster: finalGambarPosterUrl, // Menggunakan URL gambar final
        status: formData.status,
        user_id: "admin_ikpmj", // Contoh user_id, bisa diambil dari session/auth
      };

      console.log("Mengirim data edit ke API:", payload);

      const response = await fetch(`/api/kegiatan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal menyimpan perubahan kegiatan."
        );
      }

      setStatusMessage("Perubahan kegiatan berhasil disimpan!");
      setIsError(false);
      setTimeout(() => {
        router.push("/admin/kegiatan"); // Redirect ke halaman daftar kegiatan
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
          <div className="text-xl text-gray-700">Memuat data kegiatan...</div>
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
              Edit Kegiatan{" "}
              <span className="text-teal-600">: {formData.judul}</span>
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

                {/* Nama Kegiatan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="judul"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Nama Kegiatan
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

                {/* Deskripsi */}
                <div className="flex flex-col">
                  <label
                    htmlFor="deskripsi"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  ></textarea>
                </div>

                {/* Tanggal Mulai */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="tanggalMulai"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      id="tanggalMulai"
                      name="tanggalMulai"
                      value={formData.tanggalMulai}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="jamMulai"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Jam Mulai
                    </label>
                    <input
                      type="time"
                      id="jamMulai"
                      name="jamMulai"
                      value={formData.jamMulai}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Tanggal Selesai */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="tanggalSelesai"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      id="tanggalSelesai"
                      name="tanggalSelesai"
                      value={formData.tanggalSelesai}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="jamSelesai"
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Jam Selesai
                    </label>
                    <input
                      type="time"
                      id="jamSelesai"
                      name="jamSelesai"
                      value={formData.jamSelesai}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Lokasi */}
                <div className="flex flex-col">
                  <label
                    htmlFor="lokasi"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Lokasi
                  </label>
                  <input
                    type="text"
                    id="lokasi"
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Upload Gambar Poster */}
                <div className="flex flex-col">
                  <label
                    htmlFor="gambarPoster"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Upload Gambar Poster (Biarkan kosong jika tidak berubah)
                  </label>
                  <input
                    type="file"
                    id="gambarPoster"
                    name="gambarPoster"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {/* Tampilkan preview gambar yang sudah ada atau yang baru dipilih */}
                  {formData.gambarPoster ? (
                    <p className="mt-2 text-sm text-gray-500">
                      File baru terpilih: {formData.gambarPoster.name}
                    </p>
                  ) : (
                    formData.currentGambarPosterUrl && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Gambar Poster Saat Ini:
                        </p>
                        <img
                          src={formData.currentGambarPosterUrl}
                          alt="Poster Kegiatan"
                          className="max-w-xs h-auto rounded-md shadow-sm border border-gray-200"
                        />
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {formData.currentGambarPosterUrl}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* Status Kegiatan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Status Kegiatan
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  >
                    <option value="Terencana">Terencana</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tertunda">Tertunda</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Dibatalkan">Dibatalkan</option>
                  </select>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                  <Link
                    href={"/admin/kegiatan/"}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold shadow-md"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting} // Disable tombol saat submit
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-colors text-white ${
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

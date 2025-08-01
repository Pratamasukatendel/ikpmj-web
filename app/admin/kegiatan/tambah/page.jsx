// app/admin/anggota/tambah/page.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function TambahKegiatan() {
  const router = useRouter(); // Inisialisasi router
  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    judul: "", // Nama kegiatan
    deskripsi: "", // Keterangan kegiatan
    tanggalMulai: "", // Format: YYYY-mm-dd
    jamMulai: "", // Format: hh:mm
    tanggalSelesai: "", // Format: YYYY-mm-dd
    jamSelesai: "", // Format: hh:mm
    lokasi: "",
    gambarPoster: null, // Mengubah ini untuk menyimpan objek File
    status: "Terencana", // Status default
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

  // Handler khusus untuk input file (gambar profil)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan...");
    setIsError(false);

    try {
      let uploadedImageUrl = "";
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
          throw new Error(errorData.message || "Gagal mengunggah gambar.");
        }

        const uploadResult = await uploadResponse.json();
        uploadedImageUrl = uploadResult.url; // URL gambar dari Cloudinary
      }

      // Susun data payload sesuai struktur yang diharapkan oleh API MongoDB Anda
      const payload = {
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        tanggal_mulai,
        tanggal_selesai,
        lokasi: formData.lokasi,
        gambar_poster: uploadedImageUrl, // Menggunakan URL gambar dari Cloudinary
        status: formData.status,
        user_id: "admin_ikpmj", // Contoh user_id, bisa diambil dari session/auth
      };

      console.log("Mengirim data anggota ke API:", payload);

      // --- PENGIRIMAN DATA KE API ---
      const response = await fetch("/api/kegiatan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tetap mengirim JSON untuk data anggota
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan anggota.");
      }

      const result = await response.json();
      console.log("Anggota berhasil ditambahkan:", result);

      setStatusMessage("Anggota berhasil ditambahkan!");
      setIsError(false);

      // Redirect setelah beberapa saat
      setTimeout(() => {
        router.push("/admin/kegiatan");
      }, 1500); // Redirect setelah 1.5 detik
    } catch (error) {
      console.error("Error saat menambahkan anggota:", error);
      setStatusMessage(`Gagal menambahkan anggota: ${error.message}`);
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
              Tambah Anggota Baru
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

                {/* Nama Lengkap */}
                <div className="flex flex-col">
                  <label
                    htmlFor="nama"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Angkatan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="angkatan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Angkatan
                  </label>
                  <input
                    type="text" // Bisa juga "number" jika hanya angka
                    id="angkatan"
                    name="angkatan"
                    value={formData.angkatan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Jurusan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="jurusan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Jurusan
                  </label>
                  <input
                    type="text"
                    id="jurusan"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Instansi/Universitas */}
                <div className="flex flex-col">
                  <label
                    htmlFor="instansi"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Instansi/Universitas
                  </label>
                  <input
                    type="text"
                    id="instansi"
                    name="instansi"
                    value={formData.instansi}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Nomor Telepon */}
                <div className="flex flex-col">
                  <label
                    htmlFor="nomorKontak"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="tel" // Tipe tel untuk nomor telepon
                    id="nomorKontak"
                    name="nomorKontak"
                    value={formData.nomorKontak}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Alamat */}
                <div className="flex flex-col">
                  <label
                    htmlFor="alamat"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Alamat
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    rows="3"
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
                    Upload Gambar Poster
                  </label>
                  <input
                    type="file"
                    id="gambarPoster"
                    name="gambarPoster"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {formData.gambarPoster && (
                    <p className="mt-2 text-sm text-gray-500">
                      File terpilih: {formData.gambarPoster.name}
                    </p>
                  )}
                </div>

                {/* Status Kegiatan */}

                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Status Anggota
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>

                {/* Upload Gambar Profil */}
                <div className="flex flex-col">
                  <label
                    htmlFor="profileImage"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Upload Gambar Profil
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*" // Hanya menerima file gambar
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {formData.profileImage && (
                    <p className="mt-2 text-sm text-gray-500">
                      File terpilih: {formData.profileImage.name}
                    </p>
                  )}
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                  <Link
                    href={"/admin/anggota/"}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold shadow-md"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting} // Disable tombol saat submit
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-colors text-white ${
                      isSubmitting
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan Anggota"}
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

// app/admin/anggota/edit/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function EditAnggota() {
  const { id } = useParams(); // Mengambil ID anggota dari URL
  const router = useRouter();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "", // Nama Lengkap
    angkatan: "", // Angkatan
    jurusan: "", // Jurusan
    instansi: "", // Instansi/Universitas
    nomorKontak: "", // No Telepon
    email: "", // Email
    alamat: "", // Alamat
    status: "Aktif", // Status anggota
    // userId: "", // Dihapus: User ID (NIM/Nomor Induk)
    profileImage: null, // Untuk menyimpan objek File yang baru diupload
    currentProfileImageUrl: "", // Untuk menampilkan URL gambar yang sudah ada
  });

  // State untuk loading status saat fetch data atau submit
  const [isLoading, setIsLoading] = useState(true);
  // State untuk pesan status (sukses/error) setelah operasi
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State untuk loading saat submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect untuk fetch data anggota saat komponen dimuat atau ID berubah
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage(""); // Reset pesan status
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata data anggota berdasarkan ID dari API/database Anda ---
        // Contoh:
        // const response = await fetch(`/api/anggota/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data anggota.');
        // }
        // const data = await response.json();
        // setFormData({
        //   nama: data.nama,
        //   angkatan: data.angkatan,
        //   jurusan: data.jurusan,
        //   instansi: data.instansi,
        //   nomorKontak: data.nomor_kontak,
        //   email: data.email,
        //   alamat: data.alamat,
        //   status: data.status,
        //   // userId: data.user_id, // Pastikan ini juga dihapus dari data API jika tidak digunakan
        //   profileImage: null, // File input selalu dimulai dari null
        //   currentProfileImageUrl: data.profile_image_url || '', // URL gambar yang sudah ada
        // });

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi loading
        const fakeData = {
          id: id,
          nama: `Anggota ID ${id} (Edit)`,
          angkatan: "2022",
          jurusan: "Teknik Informatika",
          instansi: "Universitas Gadjah Mada",
          nomor_kontak: "081234567890",
          email: `anggota${id}@example.com`,
          alamat: `Jl. Contoh No. ${id}, Yogyakarta`,
          status: "Aktif",
          // user_id: `NIM${id}`, // Dihapus dari fakeData
          profile_image_url: `https://placehold.co/40x40/abcdef/ffffff?text=U${id}`,
        };

        setFormData({
          nama: fakeData.nama,
          angkatan: fakeData.angkatan,
          jurusan: fakeData.jurusan,
          instansi: fakeData.instansi,
          nomorKontak: fakeData.nomor_kontak,
          email: fakeData.email,
          alamat: fakeData.alamat,
          status: fakeData.status,
          // userId: fakeData.user_id, // Dihapus dari setFormData
          profileImage: null, // Selalu null untuk input file
          currentProfileImageUrl: fakeData.profile_image_url, // Simpan URL yang ada
        });

        setStatusMessage("Data anggota berhasil dimuat.");
        setIsError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatusMessage(`Gagal memuat data anggota: ${error.message}`);
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

  // Handler khusus untuk input file (gambar profil)
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      let finalProfileImageUrl = formData.currentProfileImageUrl; // Default ke URL yang sudah ada

      if (formData.profileImage) {
        // --- SIMULASI UPLOAD FILE BARU ---
        // Di sini Anda akan mengimplementasikan logika upload file ke server/cloud storage.
        // Contoh: Menggunakan FormData untuk mengirim file ke API Route Next.js
        // const uploadFormData = new FormData();
        // uploadFormData.append('file', formData.profileImage);
        // const uploadResponse = await fetch('/api/upload-profile-image', {
        //   method: 'POST',
        //   body: uploadFormData,
        // });
        // if (!uploadResponse.ok) {
        //   throw new Error('Gagal mengupload gambar profil baru.');
        // }
        // const uploadResult = await uploadResponse.json();
        // finalProfileImageUrl = uploadResult.url; // URL gambar yang diupload

        // Simulasi delay upload
        await new Promise((resolve) => setTimeout(resolve, 1500));
        finalProfileImageUrl = `https://placehold.co/40x40/abcdef/ffffff?text=U${id}_New`;
        console.log(
          "Simulasi gambar profil baru diupload ke:",
          finalProfileImageUrl
        );
      }

      // Susun data payload sesuai struktur tabel anggota
      const payload = {
        nama: formData.nama,
        angkatan: formData.angkatan,
        jurusan: formData.jurusan,
        instansi: formData.instansi,
        nomor_kontak: formData.nomorKontak,
        email: formData.email,
        alamat: formData.alamat,
        status: formData.status,
        // user_id: formData.userId, // Dihapus dari payload
        profile_image_url: finalProfileImageUrl, // Menggunakan URL gambar final
        is_active: formData.status === "Aktif" ? true : false, // Sesuaikan dengan status yang dipilih
      };

      console.log("Mengirim data edit ke API:", payload);

      // --- SIMULASI PENGIRIMAN DATA UPDATE KE API ---
      const response = await fetch(`/api/anggota/${id}`, {
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
          errorData.message || "Gagal menyimpan perubahan anggota."
        );
      }

      setStatusMessage("Perubahan anggota berhasil disimpan!");
      setIsError(false);
      // Opsional: Redirect setelah beberapa saat
      setTimeout(() => {
        router.push("/admin/anggota"); // Redirect ke halaman daftar anggota
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
          <div className="text-xl text-gray-700">Memuat data anggota...</div>
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
              Edit Anggota <span className="text-teal-600">ID: {id}</span>
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
                    type="text"
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
                    type="tel"
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

                {/* Status Anggota */}
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
                    {/* Opsi "Pending" dihapus */}
                  </select>
                </div>

                {/* Upload Gambar Profil */}
                <div className="flex flex-col">
                  <label
                    htmlFor="profileImage"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Upload Gambar Profil (Biarkan kosong jika tidak berubah)
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*" // Hanya menerima file gambar
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {/* Tampilkan preview gambar yang sudah ada atau yang baru dipilih */}
                  {formData.profileImage ? (
                    <p className="mt-2 text-sm text-gray-500">
                      File baru terpilih: {formData.profileImage.name}
                    </p>
                  ) : (
                    formData.currentProfileImageUrl && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Gambar Profil Saat Ini:
                        </p>
                        <img
                          src={formData.currentProfileImageUrl}
                          alt="Profil Anggota"
                          className="w-24 h-24 object-cover rounded-full shadow-sm border border-gray-200"
                        />
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {formData.currentProfileImageUrl}
                        </p>
                      </div>
                    )
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

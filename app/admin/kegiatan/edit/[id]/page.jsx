// app/admin/anggota/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // Import useParams and useRouter

export default function EditAnggota() {
  const params = useParams(); // Mengambil parameter dari URL (misal: { id: 'anggotaId' })
  const router = useRouter();
  const { id } = params; // Mendapatkan ID anggota dari URL

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nama: "",
    angkatan: "",
    jurusan: "",
    instansi: "",
    nomorKontak: "",
    email: "",
    alamat: "",
    status: "Aktif",
    profileImage: null, // Untuk menyimpan objek File yang diupload
    profile_image_url: "", // URL gambar profil yang sudah ada
  });

  // State untuk pesan status (sukses/error)
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State untuk loading saat submit dan saat memuat data
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect untuk memuat data anggota saat komponen pertama kali dirender
  useEffect(() => {
    if (id) {
      const fetchAnggota = async () => {
        setIsLoading(true);
        setStatusMessage("");
        setIsError(false);
        try {
          // Mengubah panggilan API agar sesuai dengan rute dinamis /api/anggota/[id]
          const response = await fetch(`/api/anggota/${id}`); // Panggil API GET by ID
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Gagal memuat data anggota.");
          }
          const data = await response.json();
          // Set formData dengan data yang diambil dari API
          setFormData({
            nama: data.nama || "",
            angkatan: data.angkatan || "",
            jurusan: data.jurusan || "",
            instansi: data.instansi || "",
            nomorKontak: data.nomor_kontak || "", // Sesuaikan dengan nama field di DB
            email: data.email || "",
            alamat: data.alamat || "",
            status: data.status || "Aktif",
            profileImage: null, // Tidak ada file yang dimuat dari backend
            profile_image_url: data.profile_image_url || "", // URL gambar yang sudah ada
          });
          setStatusMessage("Data anggota berhasil dimuat.");
        } catch (error) {
          console.error("Error fetching anggota for edit:", error);
          setStatusMessage(`Gagal memuat data anggota: ${error.message}`);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAnggota();
    }
  }, [id]); // Dependensi ID agar data dimuat ulang jika ID berubah

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
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      let finalProfileImageUrl = formData.profile_image_url;

      // Jika ada file gambar baru yang dipilih, upload ke API /api/upload
      if (formData.profileImage) {
        const uploadFormData = new FormData();
        uploadFormData.append("profileImage", formData.profileImage); // Nama field harus sesuai dengan yang diharapkan API

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData, // Mengirim FormData
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(
            errorData.message || "Gagal mengupload gambar profil."
          );
        }
        const uploadResult = await uploadResponse.json();
        finalProfileImageUrl = uploadResult.url; // Ambil URL dari respons API upload
        console.log(
          "Gambar profil berhasil diupload ke:",
          finalProfileImageUrl
        );
      }

      // Susun data payload sesuai struktur yang diharapkan oleh API MongoDB Anda
      const payload = {
        id: id, // Kirim ID anggota yang akan diupdate
        nama: formData.nama,
        angkatan: formData.angkatan,
        jurusan: formData.jurusan,
        instansi: formData.instansi,
        nomor_kontak: formData.nomorKontak,
        email: formData.email,
        alamat: formData.alamat,
        status: formData.status,
        profile_image_url: finalProfileImageUrl, // Gunakan URL gambar yang baru atau yang sudah ada
      };

      console.log("Mengirim data update anggota ke API:", payload);

      // Panggil API Route Next.js Anda dengan metode PUT
      const response = await fetch("/api/anggota", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Tetap mengirim JSON untuk data anggota
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengupdate anggota.");
      }

      const result = await response.json();
      console.log("Anggota berhasil diupdate:", result);

      setStatusMessage("Anggota berhasil diupdate!");
      setIsError(false);

      // Opsional: Redirect kembali ke halaman daftar setelah update
      setTimeout(() => {
        router.push("/admin/anggota");
      }, 1500);
    } catch (error) {
      console.error("Error saat mengupdate anggota:", error);
      setStatusMessage(`Gagal mengupdate anggota: ${error.message}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <p className="text-gray-600 text-lg">Memuat data anggota...</p>
      </div>
    );
  }

  if (isError && !formData.nama) {
    // Tampilkan pesan error jika ada error dan data belum dimuat
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <p className="text-red-600 text-lg">
          {statusMessage || "Terjadi kesalahan saat memuat data."}
        </p>
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
              Edit Anggota
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
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {formData.profileImage ? (
                    <p className="mt-2 text-sm text-gray-500">
                      File baru terpilih: {formData.profileImage.name}
                    </p>
                  ) : (
                    formData.profile_image_url && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-2">
                          Gambar profil saat ini:
                        </p>
                        <img
                          src={formData.profile_image_url}
                          alt="Current Profile"
                          className="w-20 h-20 rounded-full object-cover border border-gray-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/80x80/e0e0e0/000000?text=${formData.nama
                              .charAt(0)
                              .toUpperCase()}`;
                          }}
                        />
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
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-colors ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
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

// app/admin/anggota/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; // Import useParams and useRouter

export default function EditAnggota() {
  const params = useParams(); // Get parameters from the URL (e.g., { id: 'anggotaId' })
  const router = useRouter();
  const { id } = params; // Get the member ID from the URL

  // State to store form input values
  const [formData, setFormData] = useState({
    nama: "",
    angkatan: "",
    jurusan: "",
    instansi: "",
    nomorKontak: "",
    email: "",
    alamat: "",
    status: "Aktif",
    profileImage: null, // To store the uploaded File object
    profile_image_url: "", // Existing profile image URL
  });

  // State for status messages (success/error)
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State for loading during submission and data fetching
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect to load member data when the component is first rendered
  useEffect(() => {
    if (id) {
      const fetchAnggota = async () => {
        setIsLoading(true);
        setStatusMessage("");
        setIsError(false);
        try {
          // *** PERUBAHAN DI SINI: Mengubah panggilan API agar sesuai dengan rute dinamis ***
          const response = await fetch(`/api/anggota/${id}`); // Panggil API GET by ID
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Gagal memuat data anggota.");
          }
          const data = await response.json();
          // Set formData with data fetched from the API
          setFormData({
            nama: data.nama || "",
            angkatan: data.angkatan || "",
            jurusan: data.jurusan || "",
            instansi: data.instansi || "",
            nomorKontak: data.nomor_kontak || "", // Adjust to DB field name
            email: data.email || "",
            alamat: data.alamat || "",
            status: data.status || "Aktif",
            profileImage: null, // No file loaded from backend
            profile_image_url: data.profile_image_url || "", // Existing image URL
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
  }, [id]); // Dependency on ID so data reloads if ID changes

  // Handler for text and select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for file input (profile image)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0], // Get the first selected file
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      let currentProfileImageUrl = formData.profile_image_url;

      // If a new profile image is selected, upload it first
      if (formData.profileImage) {
        // Create FormData to send the file
        const uploadFormData = new FormData();
        uploadFormData.append("profileImage", formData.profileImage);

        // --- Panggil API Upload Gambar (akan dibuat di langkah berikutnya) ---
        // This is a placeholder for the actual image upload API call.
        // You will create a separate API route (e.g., /api/upload)
        // that handles file uploads to a cloud storage service (e.g., Cloudinary, S3).
        // For now, we'll simulate the upload and get a placeholder URL.
        const uploadResponse = await fetch("/api/upload", {
          // This API route needs to be created
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(
            errorData.message || "Gagal mengupload gambar profil."
          );
        }
        const uploadResult = await uploadResponse.json();
        // Assuming the upload API returns the URL of the uploaded image
        currentProfileImageUrl = uploadResult.url; // *** PERBAIKAN DI SINI ***
        console.log(
          "Gambar profil berhasil diupload ke:",
          currentProfileImageUrl
        );
      }

      // Construct the payload according to your MongoDB API's expected structure
      const payload = {
        id: id, // Send the member ID to be updated
        nama: formData.nama,
        angkatan: formData.angkatan,
        jurusan: formData.jurusan,
        instansi: formData.instansi,
        nomorKontak: formData.nomorKontak,
        email: formData.email,
        alamat: formData.alamat,
        status: formData.status,
        profile_image_url: currentProfileImageUrl, // *** PERBAIKAN DI SINI ***
      };

      console.log("Mengirim data update anggota ke API:", payload);

      // Call your Next.js API Route with the PUT method
      const response = await fetch("/api/anggota", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Still sending JSON for member data
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

      // Optional: Redirect back to the member list page after update
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
    // Display error message if there's an error and data hasn't been loaded
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
                {/* Status Message */}
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

                {/* Action Buttons */}
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
                    className={`px-6 py-2 rounded-lg font-semibold shadow-md transition-colors text-white ${
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

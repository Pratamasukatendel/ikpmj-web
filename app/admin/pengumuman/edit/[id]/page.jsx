// File: app/admin/pengumuman/edit/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function EditPengumuman() {
  const { id } = useParams(); // Mengambil ID dari URL
  const router = useRouter(); // Untuk redirect setelah update

  // State untuk menyimpan nilai input form, digabung dari logika Anda
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    tanggal_publikasi: "",
    tanggal_berakhir: "",
    status: "Draft",
    penulis: "",
    lampiran: null, // Untuk file baru yang akan diupload
    currentLampiranUrl: "", // Untuk URL lampiran yang sudah ada
  });

  // State untuk loading dan pesan status
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk mengambil data pengumuman dari API kita
  useEffect(() => {
    if (!id) return;

    const fetchPengumumanById = async () => {
      setIsLoading(true);
      setStatusMessage("");
      setIsError(false);
      try {
        const res = await fetch(`/api/pengumuman/${id}`);
        if (!res.ok) {
          throw new Error("Gagal mengambil data pengumuman dari server.");
        }
        const data = await res.json();
        const pengumuman = data.pengumuman;

        // Fungsi untuk memformat tanggal ke YYYY-MM-DD untuk input
        const formatDateForInput = (date) => {
          if (!date) return "";
          return new Date(date).toISOString().split("T")[0];
        };

        // Mengisi state form dengan data dari API
        setFormData({
          judul: pengumuman.judul,
          isi: pengumuman.isi,
          tanggal_publikasi: formatDateForInput(pengumuman.tanggal_publikasi),
          tanggal_berakhir: formatDateForInput(pengumuman.tanggal_berakhir),
          status: pengumuman.status,
          penulis: pengumuman.penulis,
          lampiran: null, // Input file selalu kosong di awal
          currentLampiranUrl: pengumuman.lampiran_url || "", // Simpan URL yang ada
        });
      } catch (error) {
        console.error(error);
        setStatusMessage(error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPengumumanById();
  }, [id]);

  // Handler untuk perubahan input teks dan select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk input file
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, lampiran: e.target.files[0] }));
  };

  // Handler untuk submit form (update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Menyimpan perubahan...");
    setIsError(false);

    try {
      let finalLampiranUrl = formData.currentLampiranUrl;

      // ======================================================================
      // === MULAI LOGIKA UPLOAD DARI KODE 1 ===
      // Jika ada file baru yang diupload, proses upload terlebih dahulu
      if (formData.lampiran) {
        setStatusMessage("Mengunggah lampiran baru...");
        const uploadData = new FormData();
        // API Anda dari Kode 1 mengharapkan nama field 'profileImage'
        uploadData.append("profileImage", formData.lampiran);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const result = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(result.message || "Gagal mengunggah lampiran baru.");
        }

        finalLampiranUrl = result.url; // Dapatkan URL baru
        setStatusMessage("Lampiran berhasil diperbarui.");
      }
      // === SELESAI LOGIKA UPLOAD DARI KODE 1 ===
      // ======================================================================

      // Siapkan payload untuk dikirim ke API
      const payload = {
        judul: formData.judul,
        isi: formData.isi,
        tanggal_publikasi: formData.tanggal_publikasi,
        tanggal_berakhir: formData.tanggal_berakhir || null,
        status: formData.status,
        penulis: formData.penulis,
        lampiran_url: finalLampiranUrl, // Gunakan URL yang baru atau yang lama
      };

      // Kirim data update ke API route kita
      const res = await fetch(`/api/pengumuman/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Gagal memperbarui pengumuman.");
      }

      setStatusMessage("Perubahan berhasil disimpan!");
      setIsError(false);

      setTimeout(() => {
        router.push("/admin/pengumuman");
      }, 1500);
    } catch (error) {
      console.error("Error saat update:", error);
      setStatusMessage(`Gagal menyimpan: ${error.message}`);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Memuat data pengumuman...</p>
      </div>
    );
  }
  
  // Fungsi untuk memeriksa apakah URL adalah gambar (diambil dari Kode 1)
  const isImageUrl = (url) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Edit Pengumuman
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {statusMessage && (
                  <div className={`p-3 rounded-md text-sm ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {statusMessage}
                  </div>
                )}

                <div className="flex flex-col">
                  <label htmlFor="judul" className="mb-2 text-gray-700 font-medium">Judul Pengumuman</label>
                  <input type="text" id="judul" name="judul" value={formData.judul} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="isi" className="mb-2 text-gray-700 font-medium">Isi Pengumuman</label>
                  <textarea id="isi" name="isi" value={formData.isi} onChange={handleChange} rows="8" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="tanggal_publikasi" className="mb-2 text-gray-700 font-medium">Tanggal Publikasi</label>
                    <input type="date" id="tanggal_publikasi" name="tanggal_publikasi" value={formData.tanggal_publikasi} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="tanggal_berakhir" className="mb-2 text-gray-700 font-medium">Tanggal Berakhir (Opsional)</label>
                    <input type="date" id="tanggal_berakhir" name="tanggal_berakhir" value={formData.tanggal_berakhir} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="status" className="mb-2 text-gray-700 font-medium">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="Draft">Draft</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="penulis" className="mb-2 text-gray-700 font-medium">Penulis</label>
                  <input type="text" id="penulis" name="penulis" value={formData.penulis} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                </div>
                
                <div className="flex flex-col">
                  <label htmlFor="lampiran" className="mb-2 text-gray-700 font-medium">Upload Gambar Baru (Ratio 16:9)</label>
                  <input type="file" id="lampiran" name="lampiran" onChange={handleFileChange} className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                  {formData.lampiran ? (
                    <p className="mt-2 text-sm text-green-600">File baru akan diupload: {formData.lampiran.name}</p>
                  ) : (
                    formData.currentLampiranUrl && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Lampiran saat ini:</p>
                        {isImageUrl(formData.currentLampiranUrl) ? (
                          <img src={formData.currentLampiranUrl} alt="Lampiran saat ini" className="w-32 h-32 object-cover rounded-md border"/>
                        ) : (
                          <a href={formData.currentLampiranUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Lihat Lampiran (Non-gambar)
                          </a>
                        )}
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Link href="/admin/pengumuman" className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-semibold shadow-md">Batal</Link>
                  <button type="submit" disabled={isSubmitting} className={`px-6 py-2 rounded-lg font-semibold shadow-md text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
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
// app/admin/surat/keluar/edit/[id]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import Link from "next/link";

export default function EditSuratKeluar() {
  const { id } = useParams(); // Mengambil ID surat dari URL
  const router = useRouter();

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    nomorSurat: "",
    tanggalSurat: "",
    tujuan: "",
    perihal: "",
    isiSurat: "",
    jenisSurat: "Pemberitahuan",
    catatan: "",
    fileSurat: null, // Untuk menyimpan objek File yang baru diupload
    currentFileUrl: "", // Untuk menampilkan URL file yang sudah ada
  });

  // State untuk loading status saat fetch data atau submit
  const [isLoading, setIsLoading] = useState(true);
  // State untuk pesan status (sukses/error) setelah operasi
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // State untuk loading saat submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect untuk fetch data surat keluar saat komponen dimuat atau ID berubah
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage(""); // Reset pesan status
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata data surat keluar berdasarkan ID dari API/database Anda ---
        // Contoh:
        // const response = await fetch(`/api/surat-keluar/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data surat keluar.');
        // }
        // const data = await response.json();
        // setFormData({
        //   nomorSurat: data.nomor_surat,
        //   tanggalSurat: data.tanggal_surat,
        //   tujuan: data.tujuan,
        //   perihal: data.perihal,
        //   isiSurat: data.isi_surat,
        //   jenisSurat: data.jenis_surat,
        //   catatan: data.catatan,
        //   fileSurat: null, // File input selalu dimulai dari null
        //   currentFileUrl: data.file_url || '', // URL file yang sudah ada
        // });

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi loading
        const fakeData = {
          id: id,
          nomor_surat: `SK/IKPMJ/VII/2025/00${id}`,
          tanggal_surat: "2025-07-01",
          tujuan: `Tujuan Surat ${id}`,
          perihal: `Perihal Edit Surat Keluar ${id}`,
          isi_surat: `Ini adalah isi surat keluar dengan ID ${id} yang sedang diedit. Konten ini bisa sangat panjang.`,
          jenis_surat: id % 2 === 0 ? "Undangan" : "Pemberitahuan",
          catatan: `Catatan tambahan untuk surat keluar ID ${id}.`,
          file_url: `https://www.africau.edu/images/default/sample.pdf?id=${id}`,
        };

        setFormData({
          nomorSurat: fakeData.nomor_surat,
          tanggalSurat: fakeData.tanggal_surat,
          tujuan: fakeData.tujuan,
          perihal: fakeData.perihal,
          isiSurat: fakeData.isi_surat,
          jenisSurat: fakeData.jenis_surat,
          catatan: fakeData.catatan,
          fileSurat: null, // Selalu null untuk input file
          currentFileUrl: fakeData.file_url, // Simpan URL yang ada
        });

        setStatusMessage("Data surat keluar berhasil dimuat.");
        setIsError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatusMessage(`Gagal memuat data surat keluar: ${error.message}`);
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
      fileSurat: e.target.files[0], // Ambil file pertama yang dipilih
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      let finalFileUrl = formData.currentFileUrl; // Default ke URL yang sudah ada

      if (formData.fileSurat) {
        // --- SIMULASI UPLOAD FILE BARU ---
        // Di sini Anda akan mengimplementasikan logika upload file ke server/cloud storage.
        // Contoh: Menggunakan FormData untuk mengirim file ke API Route Next.js
        // const uploadFormData = new FormData();
        // uploadFormData.append('file', formData.fileSurat);
        // const uploadResponse = await fetch('/api/upload-surat-keluar-file', {
        //   method: 'POST',
        //   body: uploadFormData,
        // });
        // if (!uploadResponse.ok) {
        //   throw new Error('Gagal mengupload file surat baru.');
        // }
        // const uploadResult = await uploadResponse.json();
        // finalFileUrl = uploadResult.url; // URL file yang diupload

        // Simulasi delay upload
        await new Promise((resolve) => setTimeout(resolve, 1500));
        finalFileUrl = `https://www.africau.edu/images/default/sample.pdf?id=${id}&new=${Date.now()}`;
        console.log("Simulasi file baru diupload ke:", finalFileUrl);
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
        file_url: finalFileUrl, // Menggunakan URL file final
      };

      console.log("Mengirim data edit ke API:", payload);

      // --- SIMULASI PENGIRIMAN DATA UPDATE KE API ---
      const response = await fetch(`/api/surat-keluar/${id}`, {
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
          errorData.message || "Gagal menyimpan perubahan surat keluar."
        );
      }

      setStatusMessage("Perubahan surat keluar berhasil disimpan!");
      setIsError(false);
      // Opsional: Redirect setelah beberapa saat
      setTimeout(() => {
        router.push("/admin/surat"); // Redirect ke halaman daftar surat
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
          <div className="text-xl text-gray-700">
            Memuat data surat keluar...
          </div>
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
              Edit Surat Keluar <span className="text-teal-600">ID: {id}</span>
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
                    rows="8"
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
                    Upload File Surat Final (Biarkan kosong jika tidak berubah)
                  </label>
                  <input
                    type="file"
                    id="fileSurat"
                    name="fileSurat"
                    accept=".pdf,.doc,.docx" // Filter jenis file
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                  {/* Tampilkan preview file yang sudah ada atau yang baru dipilih */}
                  {formData.fileSurat ? (
                    <p className="mt-2 text-sm text-gray-500">
                      File baru terpilih: {formData.fileSurat.name}
                    </p>
                  ) : (
                    formData.currentFileUrl && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          File Surat Saat Ini:
                        </p>
                        <a
                          href={formData.currentFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Lihat/Unduh File PDF
                        </a>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {formData.currentFileUrl}
                        </p>
                      </div>
                    )
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

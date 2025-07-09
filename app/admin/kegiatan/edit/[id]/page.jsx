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
    nama: "",
    tanggal: "",
    keterangan: "",
  });

  // State untuk loading status saat fetch data atau submit
  const [isLoading, setIsLoading] = useState(true);
  // State untuk pesan status (sukses/error) setelah operasi
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // useEffect untuk fetch data kegiatan saat komponen dimuat atau ID berubah
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatusMessage(""); // Reset pesan status
      setIsError(false);

      try {
        // --- Ganti dengan fetch nyata dari API/database Anda ---
        // Contoh: const response = await fetch(`/api/kegiatan/${id}`);
        // if (!response.ok) {
        //   throw new Error('Gagal mengambil data kegiatan.');
        // }
        // const data = await response.json();
        // setFormData(data);

        // Simulasi fetch data dengan delay
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulasi loading
        const fakeData = {
          id: id, // Pastikan ID sesuai
          nama: `Kegiatan ID ${id} (Contoh)`,
          tanggal: "2025-07-15", // Contoh tanggal
          keterangan: `Ini adalah deskripsi rinci untuk kegiatan dengan ID ${id}.`,
        };
        setFormData({
          nama: fakeData.nama,
          tanggal: fakeData.tanggal,
          keterangan: fakeData.keterangan,
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
      // Pastikan ID tersedia sebelum fetch
      fetchData();
    }
  }, [id]); // Dependensi [id] agar fetch ulang jika ID di URL berubah

  // Handler untuk perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("Sedang menyimpan perubahan...");
    setIsError(false);

    try {
      // --- Ganti dengan logika update data nyata ke API Anda ---
      console.log("Mengirim data edit:", formData);

      // Contoh fetch API (Anda perlu menyesuaikan URL dan metode)
      const response = await fetch(`/api/kegiatan/${id}`, {
        // Ganti dengan URL API Anda
        method: "PUT", // Atau PATCH, tergantung API Anda
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal menyimpan perubahan kegiatan."
        );
      }

      // Jika sukses
      setStatusMessage("Perubahan kegiatan berhasil disimpan!");
      setIsError(false);
      // Opsional: Redirect setelah beberapa saat atau tampilkan modal sukses
      setTimeout(() => {
        router.push("/admin/kegiatan"); // Redirect ke halaman daftar kegiatan
      }, 1500); // Redirect setelah 1.5 detik
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage(`Gagal menyimpan perubahan: ${error.message}`);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Tampilkan loading state saat data sedang diambil
  if (isLoading && !formData.nama) {
    // Tampilkan loading hanya jika belum ada data
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
              Edit Kegiatan <span className="text-blue-600">ID: {id}</span>
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
                    htmlFor="nama"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Nama Kegiatan
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

                {/* Tanggal Kegiatan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="tanggal"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="date"
                    id="tanggal"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  />
                </div>

                {/* Keterangan */}
                <div className="flex flex-col">
                  <label
                    htmlFor="keterangan"
                    className="mb-2 text-gray-700 font-medium"
                  >
                    Keterangan
                  </label>
                  <textarea
                    id="keterangan"
                    name="keterangan"
                    rows="5"
                    value={formData.keterangan}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                  ></textarea>
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end gap-4 pt-4">
                  <Link
                    href={"/admin/kegiatan/"}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading} // Disable tombol saat loading
                    className={`px-6 py-2 text-white rounded-lg font-semibold shadow-md transition-colors ${
                      isLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
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

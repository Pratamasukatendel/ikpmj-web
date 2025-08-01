// models/Kegiatan.js

import mongoose, { Schema } from "mongoose";

// Definisi skema (blueprint) untuk koleksi 'kegiatan' di MongoDB
const kegiatanSchema = new Schema(
  {
    // Judul kegiatan
    judul: {
      type: String,
      required: true,
    },
    // Deskripsi atau keterangan kegiatan
    deskripsi: {
      type: String,
      required: true,
    },
    // Tanggal dan waktu mulai kegiatan
    tanggal_mulai: {
      type: Date,
      required: true,
    },
    // Tanggal dan waktu selesai kegiatan
    tanggal_selesai: {
      type: Date,
      required: true,
    },
    // Lokasi pelaksanaan kegiatan
    lokasi: {
      type: String,
      required: true,
    },
    // URL gambar poster untuk kegiatan
    gambar_poster: {
      type: String,
      required: true,
    },
    // Status kegiatan. Menggunakan 'enum' untuk membatasi nilai yang valid.
    status: {
      type: String,
      enum: ["Terencana", "Aktif", "Tertunda", "Selesai", "Dibatalkan"],
      default: "Terencana", // Status default saat pertama kali dibuat
    },
    // ID pengguna yang membuat atau mengelola kegiatan ini
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    // Opsi untuk menambahkan timestamp otomatis (createdAt dan updatedAt)
    timestamps: true,
  }
);

// Mongoose akan membuat model ini atau mengambilnya jika sudah ada
const Kegiatan =
  mongoose.models.Kegiatan || mongoose.model("Kegiatan", kegiatanSchema);

export default Kegiatan;

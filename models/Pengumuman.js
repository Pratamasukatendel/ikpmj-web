// File: models/Pengumuman.js
// Deskripsi: File ini mendefinisikan skema data untuk koleksi 'pengumumans' di MongoDB.

import mongoose, { Schema } from 'mongoose';

const pengumumanSchema = new Schema(
  {
    judul: {
      type: String,
      required: [true, "Judul tidak boleh kosong."],
      trim: true,
    },
    isi: {
      type: String,
      required: [true, "Isi pengumuman tidak boleh kosong."],
    },
    tanggal_publikasi: {
      type: Date,
      required: [true, "Tanggal publikasi tidak boleh kosong."],
    },
    tanggal_berakhir: {
      type: Date,
      default: null, // Opsional
    },
    status: {
      type: String,
      enum: ["Draft", "Aktif", "Tidak Aktif"], // Hanya nilai ini yang diizinkan
      required: [true, "Status tidak boleh kosong."],
      default: "Draft",
    },
    penulis: {
      type: String,
      required: [true, "Penulis tidak boleh kosong."],
      default: "Admin IKPMJ",
    },
    lampiran_url: {
      type: String,
      default: "", // URL ke file lampiran
    },
  },
  {
    // Opsi timestamps akan secara otomatis menambahkan field createdAt dan updatedAt
    timestamps: true,
  }
);

// Cek apakah model 'Pengumuman' sudah ada, jika belum, buat model baru.
// Ini untuk mencegah error saat hot-reloading di Next.js.
const Pengumuman = mongoose.models.Pengumuman || mongoose.model("Pengumuman", pengumumanSchema);

export default Pengumuman;

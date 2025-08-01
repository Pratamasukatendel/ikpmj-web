// app/models/Anggota.js

import mongoose, { Schema } from "mongoose";

// Skema Mongoose untuk model Anggota
const AnggotaSchema = new Schema(
  {
    nama: { type: String, required: true },
    angkatan: { type: String, required: true },
    jurusan: { type: String },
    instansi: { type: String },
    nomor_kontak: { type: String },
    email: { type: String, required: true, unique: true },
    alamat: { type: String },
    status: { type: String, enum: ["Aktif", "Tidak Aktif"], default: "Aktif" },
    profile_image_url: { type: String },
    tanggal_daftar: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Pastikan model tidak dibuat ulang jika sudah ada
const Anggota =
  mongoose.models.Anggota || mongoose.model("Anggota", AnggotaSchema);

export default Anggota;

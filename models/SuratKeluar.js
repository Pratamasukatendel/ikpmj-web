import mongoose from "mongoose";

const SuratKeluarSchema = new mongoose.Schema(
  {
    nomorSurat: {
      type: String,
      required: true,
      unique: true,
    },
    tanggalSurat: {
      type: Date,
      required: true,
    },
    tanggalDikirim: {
      type: Date,
      default: Date.now, // Tanggal otomatis saat dikirim
    },
    penerima: {
      // Menggunakan 'penerima' agar lebih umum, akan memetakan dari 'tujuan' di frontend
      type: String,
      required: true,
    },
    perihal: {
      type: String,
      required: true,
    },
    isiSurat: {
      // Menggunakan 'isiSurat' agar konsisten dengan frontend, dan wajib
      type: String,
      required: true,
    },
    jenisSurat: {
      // Ditambahkan sesuai dengan input jenisSurat di frontend
      type: String,
      enum: [
        "Pemberitahuan",
        "Undangan",
        "Permohonan",
        "Internal",
        "Lain-lain",
      ],
      default: "Pemberitahuan",
      required: true,
    },
    catatan: {
      // Menggunakan 'catatan' agar konsisten dengan frontend
      type: String,
      required: false,
    },
    fileSurat: {
      // Untuk menyimpan URL file yang diupload
      type: [String],
      default: [],
    },
    originalFileName: {
      // BARU: Field untuk menyimpan nama file asli
      type: String,
      required: false,
    },
    status: {
      // Status internal untuk alur kerja surat keluar
      type: String,
      enum: ["draft", "dikirim", "ditinjau"],
      default: "draft",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SuratKeluar ||
  mongoose.model("SuratKeluar", SuratKeluarSchema);

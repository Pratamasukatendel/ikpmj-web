import mongoose from "mongoose";

const SuratMasukSchema = new mongoose.Schema(
  {
    nomorSurat: {
      type: String,
      required: true,
      unique: true, // Pastikan nomor surat unik
    },
    tanggalSurat: {
      type: Date,
      required: true,
    },
    tanggalDiterima: {
      type: Date,
      required: true,
    },
    pengirim: {
      type: String,
      required: true,
    },
    perihal: {
      type: String,
      required: true,
    },
    jenisSurat: {
      type: String,
      enum: [
        "Undangan",
        "Permohonan",
        "Pemberitahuan",
        "Internal",
        "Lain-lain",
      ],
      default: "Undangan",
      required: true,
    },
    catatan: {
      type: String,
      required: false,
    },
    fileSurat: {
      type: [String], // Array of strings untuk URL file
      default: [],
    },
    originalFileName: {
      // New field to store the original file name
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "diproses", "selesai", "ditolak"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SuratMasuk ||
  mongoose.model("SuratMasuk", SuratMasukSchema);

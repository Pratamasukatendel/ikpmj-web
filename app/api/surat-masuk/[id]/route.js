import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb"; // Menggunakan koneksi Anda
import SuratMasuk from "@/models/SuratMasuk"; // Import model SuratMasuk
import mongoose from "mongoose"; // Import mongoose untuk validasi ObjectId
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary

// Konfigurasi Cloudinary
// Pastikan variabel lingkungan ini sudah ada di .env.local
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Fungsi untuk mengkonversi Web Streams API ReadableStream ke Buffer
async function streamToBuffer(readableStream) {
  const reader = readableStream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

// Fungsi GET untuk mendapatkan detail surat masuk berdasarkan ID
export async function GET(request, { params }) {
  try {
    // Autentikasi/Otorisasi:
    // Di sini Anda akan menambahkan logika untuk memeriksa apakah admin sudah login.
    // const authHeader = request.headers.get('Authorization');
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
    // const token = authHeader.split(' ')[1];
    // const userId = verifyToken(token); // Fungsi verifikasi token Anda
    // if (!userId) {
    //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    // }

    await connectMongoDB(); // Hubungkan ke database

    const { id } = await params; // PERBAIKAN: await params di sini

    // Validasi ID apakah formatnya ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID surat tidak valid." },
        { status: 400 }
      );
    }

    // Cari surat masuk berdasarkan ID
    const suratMasuk = await SuratMasuk.findById(id);

    if (!suratMasuk) {
      return NextResponse.json(
        { message: "Surat masuk tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Detail surat masuk berhasil diambil.",
        suratMasuk: suratMasuk,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching surat masuk detail:", error);
    return NextResponse.json(
      {
        message: "Gagal mengambil detail surat masuk.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Fungsi PUT untuk memperbarui surat masuk berdasarkan ID
export async function PUT(request, { params }) {
  try {
    // Autentikasi/Otorisasi:
    // Di sini Anda akan menambahkan logika untuk memeriksa apakah admin sudah login.
    // const authHeader = request.headers.get('Authorization');
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
    // const token = authHeader.split(' ')[1];
    // const userId = verifyToken(token); // Fungsi verifikasi token Anda
    // if (!userId) {
    //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    // }

    await connectMongoDB(); // Hubungkan ke database

    const { id } = await params; // PERBAIKAN: await params di sini

    // Validasi ID apakah formatnya ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID surat tidak valid." },
        { status: 400 }
      );
    }

    // Mengambil data dari request body sebagai FormData.
    const formData = await request.formData();

    // Mengambil field-field teks dari FormData
    const nomorSurat = formData.get("nomorSurat");
    const tanggalSurat = formData.get("tanggalSurat");
    const tanggalDiterima = formData.get("tanggalDiterima");
    const pengirim = formData.get("pengirim");
    const perihal = formData.get("perihal");
    const jenisSurat = formData.get("jenisSurat");
    const catatan = formData.get("catatan");
    const file = formData.get("fileSurat"); // Objek File baru yang diupload
    const existingFileUrl = formData.get("existingFileUrl"); // URL file lama jika tidak ada upload baru

    let uploadedFileUrl = existingFileUrl || ""; // Default ke URL lama
    let originalFileName = ""; // Variable to store original file name

    if (file && file.size > 0) {
      originalFileName = file.name; // Get the original file name
      // Jika ada file baru diupload, proses upload ke Cloudinary
      const buffer = await streamToBuffer(file.stream());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw", // Menggunakan 'raw' untuk dokumen
              folder: "surat-masuk",
              public_id: `${Date.now()}-${
                file.name.replace(/\s/g, "_").split(".")[0]
              }`, // Optional: generate a more meaningful public_id
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(
                  new Error("Gagal mengupload file baru ke Cloudinary.")
                );
              }
              resolve(result);
            }
          )
          .end(buffer);
      });
      uploadedFileUrl = uploadResult.secure_url;

      // Opsional: Hapus file lama dari Cloudinary jika ada dan berbeda
      // Anda perlu mendapatkan public_id dari URL lama untuk menghapusnya
      // if (existingFileUrl && existingFileUrl !== uploadedFileUrl) {
      //   const publicId = existingFileUrl.split('/').pop().split('.')[0];
      //   await cloudinary.uploader.destroy(`surat-masuk/${publicId}`);
      // }
    } else if (file === "null" || file === "") {
      // Jika file dihapus dari form atau tidak ada file baru
      uploadedFileUrl = "";
      originalFileName = ""; // Reset original file name if file is removed
    } else {
      // Jika tidak ada file baru diupload, pertahankan nama file asli yang sudah ada
      const existingSurat = await SuratMasuk.findById(id);
      if (existingSurat) {
        originalFileName = existingSurat.originalFileName || "";
      }
    }

    // Buat objek update, hanya sertakan field yang ada nilainya
    const updateData = {
      nomorSurat,
      tanggalSurat: new Date(tanggalSurat),
      tanggalDiterima: new Date(tanggalDiterima),
      pengirim,
      perihal,
      jenisSurat,
      catatan,
      fileSurat: uploadedFileUrl ? [uploadedFileUrl] : [], // Update fileSurat
      originalFileName: originalFileName, // Update originalFileName
      // createdBy: userId, // Jika ingin update createdBy
    };

    // Temukan dan perbarui dokumen surat masuk
    const updatedSuratMasuk = await SuratMasuk.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // new: true mengembalikan dokumen yang diperbarui; runValidators: true menjalankan validasi skema
    );

    if (!updatedSuratMasuk) {
      return NextResponse.json(
        { message: "Surat masuk tidak ditemukan untuk diperbarui." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Surat masuk berhasil diperbarui.",
        surat: updatedSuratMasuk,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating surat masuk:", error);
    // Tangani error duplicate key (E11000) secara spesifik
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.nomorSurat
    ) {
      return NextResponse.json(
        {
          message: `Nomor surat "${error.keyValue.nomorSurat}" sudah ada. Harap gunakan nomor surat lain.`,
          error: "Duplicate key error",
        },
        { status: 409 }
      ); // Konflik
    }
    return NextResponse.json(
      {
        message: "Gagal memperbarui surat masuk.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Fungsi DELETE untuk menghapus surat masuk berdasarkan ID
export async function DELETE(request, { params }) {
  try {
    // Autentikasi/Otorisasi:
    // Di sini Anda akan menambahkan logika untuk memeriksa apakah admin sudah login.
    // const authHeader = request.headers.get('Authorization');
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }
    // const token = authHeader.split(' ')[1];
    // const userId = verifyToken(token); // Fungsi verifikasi token Anda
    // if (!userId) {
    //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    // }

    await connectMongoDB(); // Hubungkan ke database

    const { id } = await params; // PERBAIKAN: await params di sini

    // Validasi ID apakah formatnya ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID surat tidak valid." },
        { status: 400 }
      );
    }

    // Cari dan hapus dokumen surat masuk
    const deletedSuratMasuk = await SuratMasuk.findByIdAndDelete(id);

    if (!deletedSuratMasuk) {
      return NextResponse.json(
        { message: "Surat masuk tidak ditemukan untuk dihapus." },
        { status: 404 }
      );
    }

    // Opsional: Hapus file terkait dari Cloudinary
    // if (deletedSuratMasuk.fileSurat && deletedSuratMasuk.fileSurat.length > 0) {
    //   for (const fileUrl of deletedSuratMasuk.fileSurat) {
    //     try {
    //       const parts = fileUrl.split('/');
    //       const publicIdWithExtension = parts[parts.length - 1];
    //       const publicId = `surat-masuk/${publicIdWithExtension.split('.')[0]}`;

    //       await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
    //       console.log(`File Cloudinary dihapus: ${publicId}`);
    //     } catch (cloudinaryError) {
    //       console.error(`Gagal menghapus file Cloudinary ${fileUrl}:`, cloudinaryError);
    //     }
    //   }
    // }

    return NextResponse.json(
      {
        message: "Surat masuk berhasil dihapus.",
        surat: deletedSuratMasuk,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting surat masuk:", error);
    return NextResponse.json(
      {
        message: "Gagal menghapus surat masuk.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb"; // Menggunakan koneksi Anda
import SuratKeluar from "@/models/SuratKeluar"; // Import model SuratKeluar
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

// Fungsi POST untuk menambahkan surat keluar baru
export async function POST(request) {
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

    // Mengambil data dari request body sebagai FormData.
    const formData = await request.formData();

    // Mengambil field-field teks dari FormData
    const nomorSurat = formData.get("nomorSurat");
    const tanggalSurat = formData.get("tanggalSurat");
    const tujuan = formData.get("tujuan");
    const perihal = formData.get("perihal");
    const isiSurat = formData.get("isiSurat");
    const jenisSurat = formData.get("jenisSurat");
    const catatan = formData.get("catatan");
    const file = formData.get("fileSurat"); // Objek File dari input type="file"

    // Validasi dasar
    if (
      !nomorSurat ||
      !tanggalSurat ||
      !tujuan ||
      !perihal ||
      !isiSurat ||
      !jenisSurat
    ) {
      return NextResponse.json(
        { message: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    let uploadedFileUrl = "";
    let originalFileName = ""; // Menambahkan variabel untuk menyimpan nama file asli

    if (file && file.size > 0) {
      originalFileName = file.name; // Mendapatkan nama file asli
      const buffer = await streamToBuffer(file.stream());

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "raw", // PERBAIKAN: Menggunakan 'raw' untuk dokumen
              folder: "surat-keluar",
              public_id: `${Date.now()}-${
                file.name.replace(/\s/g, "_").split(".")[0]
              }`, // Opsional: generate public_id yang lebih bermakna
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(
                  new Error("Gagal mengupload file ke Cloudinary.")
                );
              }
              resolve(result);
            }
          )
          .end(buffer);
      });
      uploadedFileUrl = uploadResult.secure_url;
      console.log(
        `File '${file.name}' berhasil diupload ke Cloudinary. URL: ${uploadedFileUrl}`
      );
    }

    // Buat dokumen surat keluar baru
    const newSuratKeluar = await SuratKeluar.create({
      nomorSurat,
      tanggalSurat: new Date(tanggalSurat),
      tanggalDikirim: new Date(),
      penerima: tujuan, // Memetakan 'tujuan' dari frontend ke 'penerima' di model
      perihal,
      isiSurat,
      jenisSurat,
      catatan,
      fileSurat: uploadedFileUrl ? [uploadedFileUrl] : [], // Menggunakan fileSurat
      originalFileName: originalFileName, // Menyimpan nama file asli
      status: "draft",
      // createdBy: userId,
    });

    return NextResponse.json(
      {
        message: "Surat keluar berhasil ditambahkan.",
        surat: newSuratKeluar,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding surat keluar:", error);
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
        message: "Gagal menambahkan surat keluar.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Fungsi GET untuk mendapatkan daftar semua surat keluar
export async function GET() {
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

    const suratKeluarList = await SuratKeluar.find({});

    return NextResponse.json(
      {
        message: "Daftar surat keluar berhasil diambil.",
        suratKeluar: suratKeluarList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching surat keluar list:", error);
    return NextResponse.json(
      {
        message: "Gagal mengambil daftar surat keluar.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

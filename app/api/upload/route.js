// app/api/upload/route.js

// Next.js API Route untuk menangani upload file gambar ke Cloudinary.

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary SDK

// Konfigurasi Cloudinary dengan environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @method POST
 * @description Mengunggah file gambar ke Cloudinary.
 * @param {Request} request - Objek permintaan dari client, berisi file gambar dan folder tujuan.
 * @returns {NextResponse} Sebuah objek JSON berisi URL gambar yang diunggah atau pesan error.
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const folder = request.nextUrl.searchParams.get("folder");

    // Menggunakan nama field generik 'file' untuk upload gambar
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { message: "File gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    if (!folder) {
      return NextResponse.json(
        {
          message:
            "Nama folder Cloudinary harus disertakan sebagai parameter query.",
        },
        { status: 400 }
      );
    }

    // Mengubah file menjadi Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Mengunggah gambar ke Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder }, // Menggunakan parameter 'folder' dari URL
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(
                new Error("Gagal mengunggah gambar ke Cloudinary.")
              );
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error("Cloudinary tidak mengembalikan URL yang valid.");
    }

    const uploadedImageUrl = uploadResult.secure_url;

    console.log(`Image uploaded to Cloudinary. URL: ${uploadedImageUrl}`);

    return NextResponse.json({ url: uploadedImageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error processing image upload:", error);
    return NextResponse.json(
      { message: "Gagal mengunggah gambar.", error: error.message },
      { status: 500 }
    );
  }
}

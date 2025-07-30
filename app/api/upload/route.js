// app/api/upload/route.js
// Next.js API Route untuk menangani upload file gambar ke Cloudinary.

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary SDK

// --- Konfigurasi Cloudinary ---
// Pastikan Anda telah mengatur variabel lingkungan ini di file .env.local Anda.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handler untuk metode POST (menerima file gambar yang diupload)
export async function POST(request) {
  try {
    const formData = await request.formData();
    const profileImage = formData.get("profileImage"); // 'profileImage' is the field name from the frontend input

    if (!profileImage) {
      return NextResponse.json(
        { message: "No image file uploaded." },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const arrayBuffer = await profileImage.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the image to Cloudinary
    // We use a Promise to handle the stream upload
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "ikpmj_anggota_profiles" }, // Optional: specify a folder in Cloudinary
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(new Error("Failed to upload image to Cloudinary."));
            }
            resolve(result);
          }
        )
        .end(buffer); // End the stream with the image buffer
    });

    // Check if upload was successful and URL is available
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error("Cloudinary did not return a valid URL.");
    }

    const uploadedImageUrl = uploadResult.secure_url;

    console.log(`Image uploaded to Cloudinary. URL: ${uploadedImageUrl}`);

    return NextResponse.json({ url: uploadedImageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error processing image upload:", error);
    return NextResponse.json(
      { message: "Failed to upload image.", error: error.message },
      { status: 500 }
    );
  }
}

// app/tentang-kami/page.jsx
"use client"; // Diperlukan jika menggunakan hooks React (meskipun di sini tidak ada, untuk konsistensi)

import React from "react";
import Navbar from "../component/user/navbar";
import Footer from "../component/user/footer";
import Image from "next/image";
import Link from "next/link"; // Link tidak digunakan di sini, tapi diimpor dari kode asli

export default function TentangKami() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {/* Section Header: Sejarah Organisasi */}
      <div className="py-28 px-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Placeholder Gambar */}
          <div className="flex justify-center md:justify-start">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-lg">
              <Image
                src="/images/ikpmj.png" // Menggunakan logo IKPMJ sebagai placeholder
                alt="IKPMJ Sejarah"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>

          {/* Konten Sejarah */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Sejarah Organisasi
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              Sekitar 47 tahun silam tepatnya 15 Juni 1968 di Jogja ini lahirlah
              sebuah organisasi kekeluargaan yang didasarkan pada kesamaan
              daerah asal yakni Ikatan Keluarga Pelajar dan Mahasiswa Jember di
              Yogyakarta atau disingkat IKPMJ. Jika ditilik dari namanya
              organisasi ini terdiri atas keluarga, pelajar sekaligus mahasiswa
              yang semuanya berasal dari Jember dan berada di Yogyakarta. Jadi
              kata keluarga bukan merupakan kata sifat yang merujuk pada
              kekeluargaan, melainkan menjadi obyek tersendiri.
            </p>
          </div>
        </div>
      </div>

      {/* Section Visi & Misi */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          {/* Visi Kami */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Visi Kami</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Terbinanya IKPMJ yang senantiasa berinovasi dalam beraksi guna
              terwujudnya sebuah kolaborasi.
            </p>
          </div>

          {/* Misi Kami */}
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Misi Kami</h1>
            <ul className="text-lg text-gray-600 leading-relaxed list-inside list-disc md:list-none md:text-right">
              <li className="mb-2">
                Mewujudkan IKPMJ yang terdepan guna teroptimalisasi motivasi di
                lingkungan Masyarakat yang bersahaja.
              </li>
              <li className="mb-2">
                Menciptakan IKPMJ sebagai katalisator aksi dan menjadi jembatan
                solutif bagi seluruh permasalahan OIKPMJ.
              </li>
              <li className="mb-2">
                Menjadikan IKPMJ sebagai ruang ekspresi terbaik dalam mewujudkan
                kesejahteraan mahasiswa.
              </li>
              <li>
                Menjadikan IKPMJ sebagai media dan sarana terbaik serta wahana
                kolaboratif guna meningkatkan peran dan fungsi eksekutif.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Struktur Organisasi */}
      <div className="py-20 px-4 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
            Struktur Organisasi
          </h1>
          <div className="w-full flex justify-center">
            <Image
              src="/images/struktur-organisasi.png"
              alt="Struktur Organisasi IKPMJ"
              width={1000} // Pertahankan ukuran besar jika gambar detail
              height={600} // Sesuaikan tinggi sesuai proporsi gambar Anda
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

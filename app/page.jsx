// app/page.jsx
"use client"; // Diperlukan karena menggunakan hooks seperti useState dan useEffect

import React, { useState, useEffect } from "react";
import Navbar from "./component/user/navbar";
import FAQ from "./component/user/faq";
import Footer from "./component/user/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      {/* Section Header (Hero) */}
      <div className="relative flex flex-col md:flex-row items-center justify-center py-20 px-4 md:px-20 bg-gradient-to-r from-teal-500 to-blue-600 text-white min-h-[60vh] md:min-h-[80vh]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Selamat Datang di Ikatan Pelajar dan Mahasiswa Jember (IKPMJ)
            </h1>
            <p className="text-lg md:text-xl font-light opacity-90">
              Wadah silaturahmi dan pengembangan diri bagi mahasiswa Jember di
              Yogyakarta.
            </p>
          </div>
          <div className="flex-shrink-0 mt-8 md:mt-0">
            <Image
              src="/images/ikpmj.png"
              alt="IKPMJ Logo"
              width={180} // Ukuran lebih besar untuk hero section
              height={180}
              className="rounded-full shadow-lg border-4 border-white"
            />
          </div>
        </div>
      </div>
      {/* Section About Us */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Tentang IKPMJ
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Ikatan Keluarga Pelajar dan Mahasiswa Jember (IKPMJ) adalah
            organisasi mahasiswa daerah yang berdedikasi untuk memfasilitasi dan
            mendukung mahasiswa-mahasiswa asal Jember yang sedang menempuh
            pendidikan di Yogyakarta. Kami berkomitmen untuk mempererat tali
            silaturahmi, memberikan dukungan akademik, serta menyelenggarakan
            berbagai kegiatan sosial dan pengembangan diri. Bergabunglah bersama
            kami untuk membangun komunitas yang solid dan berdaya!
          </p>
          <Link
            href={"/tentang-kami"}
            className="inline-flex items-center px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
      <FAQ /> {/* Komponen FAQ */}
      <Footer />
    </div>
  );
}

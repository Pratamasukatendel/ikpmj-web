// app/component/user/navbar.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react"; // Import useState untuk toggle menu mobile

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk toggle menu mobile

  // Kelas dasar untuk semua link navigasi
  const baseLinkClasses =
    "block py-2 px-3 rounded-md text-base font-medium transition-colors duration-200";

  // Kelas untuk link non-aktif
  const inactiveLinkClasses = `${baseLinkClasses} text-gray-600 hover:bg-gray-100 hover:text-gray-900`;

  // Kelas untuk link aktif
  const activeLinkClasses = `${baseLinkClasses} bg-blue-100 text-blue-700 font-semibold`; // Contoh warna aktif yang lebih halus

  // Fungsi untuk menentukan kelas link
  const getLinkClasses = (href) => {
    if (href === "/") {
      return pathname === href ? activeLinkClasses : inactiveLinkClasses;
    }
    return pathname.startsWith(href) ? activeLinkClasses : inactiveLinkClasses;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"/"} className="flex items-center">
              <Image
                src="/images/ikpmj.png"
                alt="IKPMJ Logo"
                width={40} // Ukuran logo disesuaikan
                height={40}
                className="rounded-full" // Menambahkan rounded-full
              />
              <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">
                IKPMJ
              </span>{" "}
              {/* Nama organisasi */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow justify-center">
            {" "}
            {/* Menggunakan flex-grow dan justify-center */}
            <div className="flex space-x-6 lg:space-x-8">
              {" "}
              {/* Menyesuaikan jarak antar link */}
              <Link href={"/"} className={getLinkClasses("/")}>
                Beranda
              </Link>
              <Link
                href={"/tentang-kami"}
                className={getLinkClasses("/tentang-kami")}
              >
                Tentang Kami
              </Link>
              <Link href={"/kegiatan"} className={getLinkClasses("/kegiatan")}>
                Kegiatan
              </Link>
              <Link
                href={"/pengumuman"}
                className={getLinkClasses("/pengumuman")}
              >
                Pengumuman
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                /* Icon when menu is open. */
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Conditional Rendering) */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={"/"}
              className={getLinkClasses("/")}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href={"/tentang-kami"}
              className={getLinkClasses("/tentang-kami")}
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              href={"/kegiatan"}
              className={getLinkClasses("/kegiatan")}
              onClick={() => setIsMenuOpen(false)}
            >
              Kegiatan
            </Link>
            <Link
              href={"/pengumuman"}
              className={getLinkClasses("/pengumuman")}
              onClick={() => setIsMenuOpen(false)}
            >
              Pengumuman
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

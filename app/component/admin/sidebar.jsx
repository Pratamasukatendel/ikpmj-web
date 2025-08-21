"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Sidebar() {
  const inactiveLink = "flex gap-2 py-2 px-7";
  const activeLink = inactiveLink + " bg-amber-500 rounded-md font-medium";
  const pathname = usePathname();
  const router = useRouter();

  // Fungsi untuk menangani proses logout secara lengkap
  const handleLogout = async () => {
    // 1. Hapus Session atau Token (ditangani oleh next-auth)
    // 2. Hapus Data Lokal yang di-cache
    localStorage.clear();

    // Lakukan proses signOut dan arahkan ke halaman login
    await signOut({ redirect: false });

    // 3. Lindungi dari Back Button dengan mengarahkan secara manual
    // Menggunakan router.replace() untuk mencegah pengguna kembali ke halaman admin
    router.replace("/admin/auth/login");
  };

  // Efek samping untuk mencegah caching halaman setelah logout
  useEffect(() => {
    // Dengan mengosongkan riwayat, tombol back tidak akan berfungsi
    // Namun, cara ini tidak sepenuhnya efektif di semua browser.
    // Metode router.replace() di atas lebih disarankan.
    if (pathname === "/admin/auth/login") {
      window.history.replaceState(null, "", "/admin/auth/login");
    }
  }, [pathname]);

  return (
    <aside className="w-65 items-center flex flex-col bg-white">
      <Link href={"/admin"} className="flex gap-2 mb-12 py-2 items-center">
        <Image
          src="/images/ikpmj.png"
          alt="IKPMJ Logo"
          width={50}
          height={50}
        />
        <span className="text-gray-600 font-bold text-center ">IKPMJ</span>
      </Link>
      <nav className="flex flex-col gap-7 text-gray-700">
        <Link
          href={"/admin"}
          className={pathname === "/admin" ? activeLink : inactiveLink}
        >
          <Image
            src="/icons/dashboard.svg"
            alt="home"
            width={22}
            height={22}
          ></Image>
          Dashboard
        </Link>
        <Link
          href={"/admin/kegiatan"}
          className={pathname.includes("/kegiatan") ? activeLink : inactiveLink}
        >
          <Image
            src="/icons/calendar.svg"
            alt="kegiatan"
            width={22}
            height={22}
          ></Image>
          Kegiatan
        </Link>
        <Link
          href={"/admin/anggota"}
          className={pathname.includes("/anggota") ? activeLink : inactiveLink}
        >
          <Image
            src="/icons/users.svg"
            alt="anggota"
            width={22}
            height={22}
          ></Image>
          Anggota
        </Link>
        <Link
          href={"/admin/surat"}
          className={pathname.includes("/surat") ? activeLink : inactiveLink}
        >
          <Image
            src="/icons/mail.svg"
            alt="surat"
            width={22}
            height={22}
          ></Image>
          Surat
        </Link>
        <Link
          href={"/admin/pengumuman"}
          className={
            pathname.includes("/pengumuman") ? activeLink : inactiveLink
          }
        >
          <Image
            src="/icons/megaphone.svg"
            alt="pengumuman"
            width={22}
            height={22}
          ></Image>
          Pengumuman
        </Link>
        <button
          onClick={handleLogout}
          className={`${
            pathname.includes("/login") ? activeLink : inactiveLink
          } mt-130 text-red-600 font-semibold cursor-pointer hover:text-red-700  py-1.5 px-5 fixed hover:bg-red-50 rounded-md transition-all duration-200 group border border-red-100 hover:border-red-200`}
        >
          <Image
            src="/icons/log-out.svg"
            alt="logout"
            width={22}
            height={22}
          ></Image>
          Logout
        </button>
      </nav>
    </aside>
  );
}

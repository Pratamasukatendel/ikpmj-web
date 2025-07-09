"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";


export default function Sidebar() {
  const inactiveLink = "flex gap-2 py-2 px-7";
  const activeLink = inactiveLink + " bg-amber-500 rounded-md font-medium";
  const pathname = usePathname();

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
        <Link
          href={"/admin/laporan"}
          className={pathname.includes("/laporan") ? activeLink : inactiveLink}
        >
          <Image
            src="/icons/clipboard.svg"
            alt="laporan"
            width={22}
            height={22}
          ></Image>
          Laporan
        </Link>
        <button
          onClick={() => signOut()}
          className={`${
            pathname.includes("/login") ? activeLink : inactiveLink
          } mt-52 text-red-500 font-semibold cursor-pointer hover:text-red-700`}
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

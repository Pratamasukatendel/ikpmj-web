"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const inactiveLink = "flex";
  const activeLink = inactiveLink + " text-amber-500 font-semibold";
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-zinc-50 shadow-2xs mt-2 rounded-xl w-auto fixed py-2 px-16 top-0 z-50 flex justify-around gap-24">
        <Link href={"/"}>
          <Image
            className=""
            src="/images/ikpmj.png"
            alt="IKPMJ Logo"
            width={50}
            height={50}
          />
        </Link>
        <nav className="flex gap-10 items-center text-gray-500 font-medium">
          <Link
            href={"/"}
            className={pathname === "/" ? activeLink : inactiveLink}
          >
            Beranda
          </Link>
          <Link
            href={"/tentang-kami"}
            className={
              pathname.includes("/tentang-kami") ? activeLink : inactiveLink
            }
          >
            Tentang Kami
          </Link>
          <Link
            href={"/kegiatan"}
            className={
              pathname.includes("/kegiatan") ? activeLink : inactiveLink
            }
          >
            Kegiatan
          </Link>
          <Link
            href={"/pengumuman"}
            className={
              pathname.includes("/pengumuman") ? activeLink : inactiveLink
            }
          >
            Pengumuman
          </Link>
        </nav>
      </div>
    </div>
  );
}

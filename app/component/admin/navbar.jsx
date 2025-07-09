"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {

  const { data: session } = useSession();

  return (
    // Mengubah tinggi dan padding, serta menambahkan shadow dan border-bottom
    <div className="bg-white h-auto p-4 border-b border-gray-200">
      <div className="flex items-center justify-end gap-3 mr-6">
        {" "}
        {/* Menyesuaikan gap dan margin kanan */}
        {/* Profil Picture */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {" "}
          {/* Menambahkan overflow-hidden untuk memastikan gambar bulat */}
          <Image
            src="/images/ikpmj.png"
            alt="Profil Admin"
            width={50} // Sesuaikan width/height agar gambar pas di container 40x40
            height={50}
            className="object-cover w-full h-full" // Memastikan gambar mengisi container
          />
        </div>
        <div className="">
          <p className="font-semibold -mb-1">{session?.user?.name}</p>
          <span className="text-sm">{session?.user?.email}</span>
        </div>
      </div>
    </div>
  );
}

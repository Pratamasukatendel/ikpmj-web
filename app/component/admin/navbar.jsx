"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Navbar() {

  const { data: session } = useSession();

  return (
    <div className="bg-white text-amber-400 h-19 ">
      <div className="flex items-center justify-end gap-2 mr-10 p-1 h-19">
        <div className="w-10 h-10 rounded-full">
          <Image
            src="/images/ikpmj.png"
            alt="IKPMJ Logo"
            width={50}
            height={50}
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

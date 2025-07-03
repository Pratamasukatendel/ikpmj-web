import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="pt-10 flex flex-col gap-5 bg-gray-500 text-white">
      <div className="flex justify-evenly">
        <Link href={"/"} className="flex flex-col justify-center h-auto">
          <Image
            className=""
            src="/images/ikpmj.png"
            alt="IKPMJ Logo"
            width={70}
            height={70}
          />
        </Link>
        <div>
          <p className="font-semibold mb-2">Roadmap</p>
          <div className="flex flex-col">
            <Link href={"/"}>beranda</Link>
            <Link href={"/tentang-kami"}>Tentang Kami</Link>
            <Link href={"/kegiatan"}>Kegiatan</Link>
            <Link href={"/pengumuman"}>Pengumuman</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Hubungi Kami</p>
          <div>
            <p>Email: Ikpmj.jogja@gmail.com</p>
            <p>Telp: +628128657879</p>
            <p>
              Alamat: Jl. Wulung No.131, Pringwulung CC, Kecamatan Depok,Sleman,
              Yogyakarta
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Sosial Media Kami:</p>
          <div className="flex gap-3">
            <img
              src="/icons/instagram.svg"
              alt="Instagram"
              width="24"
              height="24"
            />
            <img src="/icons/tiktok.svg" alt="Tiktok" width="24" height="24" />
            <img src="/icons/x.svg" alt="Globe Icon" width="24" height="24" />
            <img
              src="/icons/youtube.svg"
              alt="YouTube"
              width="24"
              height="24"
            />
            <img
              src="/icons/facebook.svg"
              alt="Facebook"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-8 pb-5">
        2025 copyright IKPMJ Yogyakarta
      </div>
    </div>
  );
}

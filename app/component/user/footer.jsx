// app/component/user/footer.jsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        {/* Kolom Logo & Deskripsi Singkat */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href={"/"} className="mb-4">
            <Image
              src="/images/ikpmj.png"
              alt="IKPMJ Logo"
              width={70}
              height={70}
              className="rounded-full shadow-md"
            />
          </Link>
          <p className="text-sm text-gray-400">
            Wadah silaturahmi dan pengembangan diri bagi mahasiswa Jember di
            Yogyakarta.
          </p>
        </div>

        {/* Kolom Roadmap */}
        <div>
          <p className="font-semibold text-white mb-4 text-lg">Roadmap</p>
          <nav className="flex flex-col space-y-2">
            <Link href={"/"} className="hover:text-white transition-colors">
              Beranda
            </Link>
            <Link
              href={"/tentang-kami"}
              className="hover:text-white transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href={"/kegiatan"}
              className="hover:text-white transition-colors"
            >
              Kegiatan
            </Link>
            <Link
              href={"/pengumuman"}
              className="hover:text-white transition-colors"
            >
              Pengumuman
            </Link>
          </nav>
        </div>

        {/* Kolom Hubungi Kami */}
        <div>
          <p className="font-semibold text-white mb-4 text-lg">Hubungi Kami</p>
          <div className="space-y-2">
            <p className="text-sm">Email: ikpmj.jogja@gmail.com</p>
            <p className="text-sm">Telp: +62 812-8657-879</p>
            <p className="text-sm">
              Alamat: Jl. Wulung No.131, Pringwulung CC, Kecamatan Depok,
              Sleman, Yogyakarta
            </p>
          </div>
        </div>

        {/* Kolom Sosial Media Kami */}
        <div>
          <p className="font-semibold text-white mb-4 text-lg">
            Sosial Media Kami:
          </p>
          <div className="flex gap-4">
            {/* Instagram Icon (Generic SVG) */}
            <a
              href="https://instagram.com/ikpmj_jogja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#e6e6e6"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                ></path>
                <path
                  d="M17.5 6.51L17.51 6.49889"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
            {/* TikTok Icon (Generic SVG) - Using a simple play button as placeholder */}
            <a
              href="https://tiktok.com/@ikpmj_jogja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#e6e6e6"
              >
                <path
                  d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
            {/* YouTube Icon (Generic SVG) */}
            <a
              href="https://youtube.com/@ikpmj_jogja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#e6e6e6"
              >
                <path
                  d="M14 12L10.5 14V10L14 12Z"
                  fill="#e6e6e6"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </a>
            {/* Facebook Icon (Generic SVG) */}
            <a
              href="https://facebook.com/ikpmj.jogja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#e6e6e6"
              >
                <path
                  d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M11 21C11 18 11 15 11 12C11 9.8125 11.5 8 15 8"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9 13H11H15"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8 pb-5">
        &copy; {new Date().getFullYear()} IKPMJ Yogyakarta. All rights reserved.
      </div>
    </footer>
  );
}

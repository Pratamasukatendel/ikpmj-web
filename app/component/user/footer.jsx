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
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.1 4.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm-1.5 3.5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
                  clipRule="evenodd"
                />
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
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </a>
            {/* X (Twitter) Icon (Generic SVG) */}
            <a
              href="https://twitter.com/ikpmj_jogja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.9 3.3c-.7.3-1.4.5-2.2.6.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.9-2.6 1.1-.7-.7-1.7-1.2-2.8-1.2-2.1 0-3.8 1.7-3.8 3.8 0 .3.03.6.1.9-3.2-.2-6-1.7-7.9-4.1-.3.5-.5 1.1-.5 1.8 0 1.3.7 2.4 1.7 3.1-.6 0-1.2-.2-1.7-.5v.05c0 1.8 1.3 3.3 3 3.6-.3.08-.6.12-.9.12-.2 0-.4-.02-.6-.06.5 1.5 1.9 2.6 3.5 2.6-1.3 1-3 1.6-4.8 1.6-.3 0-.6 0-.9-.05 1.7 1.1 3.7 1.7 5.9 1.7 7.1 0 11-5.9 11-11.8 0-.2 0-.3-.02-.5.8-.6 1.5-1.4 2-2.3z" />
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
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19.615 3.184c-1.076-.246-2.899-.794-4.664-.997C13.91 1.93 12 2 12 2s-1.91.07-2.951.187c-1.765.203-3.588.751-4.664.997C3.07 3.43 2 4.417 2 6v12c0 1.583 1.07 2.57 2.385 2.816 1.076.246 2.899.794 4.664.997C10.09 22.07 12 22 12 22s1.91-.07 2.951-.187c1.765-.203 3.588-.751 4.664-.997C20.93 20.57 22 19.583 22 18V6c0-1.583-1.07-2.57-2.385-2.816zM9.75 16.5v-9L16.5 12l-6.75 4.5z" />
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
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.24.195 2.24.195v2.46h-1.262c-1.247 0-1.637.775-1.637 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" />
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

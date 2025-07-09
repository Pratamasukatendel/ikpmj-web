// app/component/admin/navbar.jsx
import Image from "next/image";

export default function Navbar() {
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
        {/* Nama dan Email Admin */}
        <div className="text-right">
          {" "}
          {/* Mengatur teks ke kanan */}
          <p className="font-semibold text-gray-800 text-base">Admin</p>{" "}
          {/* Mengubah warna dan ukuran teks */}
          <span className="text-sm text-gray-600">admin@gmail.com</span>{" "}
          {/* Mengubah warna teks */}
        </div>
      </div>
    </div>
  );
}

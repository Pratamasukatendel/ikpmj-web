import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/admin/navbar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen">
        <Navbar />
        <div className="h-screen bg-gray-100 p-7">
          <div>
            <div className="flex justify-between">
              <div className="w-50 h-50 bg-white shadow-md text-black p-5 font-medium rounded-md">
                <p className="text-xl font-semibold text-gray-500">
                  Total Anggota Aktif
                </p>
                <p className="text-3xl font-bold my-2 text-green-500">120</p>
                <p className="text-sm text-gray-500">per 20 Juni 2025</p>
              </div>
              <div className="w-50 h-50 bg-white shadow-md text-black p-5 font-medium rounded-md">
                <p className="text-xl font-semibold text-gray-500">
                  Anggota Baru Bulan ini
                </p>
                <p className="text-3xl font-bold my-2 text-blue-500">8</p>
                <p className="text-sm text-gray-500 ">pertumbuhan bulan ini</p>
              </div>
              <div className="w-50 h-50 bg-white shadow-md text-black p-5 font-medium rounded-md">
                <p className="text-xl font-semibold text-gray-500">
                  Kegiatan Mendatang
                </p>
                <p className="text-3xl font-bold my-2 text-yellow-500">5</p>
                <p className="text-sm text-gray-500">dalam 30 hari ke depan</p>
              </div>
              <div className="w-50 h-50 bg-white shadow-md text-black p-5 font-medium rounded-md">
                <p className="text-xl font-semibold text-gray-500">
                  Pengumuman Aktif
                </p>
                <p className="text-3xl font-bold my-2 text-purple-500">3</p>
                <p className="text-sm text-gray-500">saat ini</p>
              </div>
            </div>
            <div className="shadow-md mt-10 p-5 bg-white rounded-md">
              <h3 className="text-xl font-semibold text-black mb-3">
                Aksi Cepat
              </h3>
              <button
                type="button"
                className="bg-green-500 rounded-md px-3 py-3 text-sm font-semibold text-white shadow-xs mr-5"
              >
                Tambah Anggota Baru
              </button>
              <button
                type="button"
                className="bg-blue-500 rounded-md px-3 py-3 text-sm font-semibold text-white shadow-xs mr-5"
              >
                Tambah Kegiatan Baru
              </button>
              <button
                type="button"
                className="bg-yellow-500 rounded-md px-3 py-3 text-sm font-semibold text-white shadow-xs"
              >
                Tambah Pengumuman Baru
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

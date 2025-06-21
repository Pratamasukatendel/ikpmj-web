import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import TabelKegiatan from "@/app/component/admin/tabelKegiatan";

export default function Kegiatan() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen">
        <Navbar />
        <div className="h-screen bg-gray-100 p-7">
          <div className=" h-auto w-auto">
            <h1 className="text-2xl font-bold mb-8 text-gray-600">Kegiatan</h1>
            <ul className="flex gap-10 mb-16">
              <li className="text-gray-600">Semua Kegiatan</li>
              <li className="text-gray-400">Tidak Aktif (1)</li>
            </ul>
            <div className="flex justify-between">
              <form action="">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Search"
                  className="block rounded-md  bg-white px-3 w-100 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </form>
              <button
                type="button"
                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-blue-600 flex justify-around items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Tambah Kegiatan
              </button>
            </div>
            {/* tabel */}
            <TabelKegiatan />
          </div>
        </div>
      </div>
    </div>
  );
}

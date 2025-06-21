import Sidebar from "@/app/component/admin/sidebar";
import Navbar from "@/app/component/admin/navbar";
import TabelPengumuman from "@/app/component/admin/tabelPengumuman";

export default function Pengumuman() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen">
        <Navbar />
        <div className="h-screen bg-gray-100 p-7">
          <div className=" h-auto w-auto">
            <h1 className="text-2xl font-bold mb-10 text-gray-500">
              Pengumuman
            </h1>

            <div className="flex justify-between mb-8">
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
                className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-yellow-600 flex justify-around items-center gap-2"
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
                Tambah Pengumuman
              </button>
            </div>
            <TabelPengumuman />
          </div>
        </div>
      </div>
    </div>
  );
}

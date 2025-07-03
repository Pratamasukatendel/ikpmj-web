import Navbar from "../component/user/navbar";
import Image from "next/image";
import Footer from "../component/user/footer";

export default function Kegiatan() {
  return (
    <div>
      <Navbar></Navbar>
      {/* Daftar Kegiatan */}
      <div className="h-screen flex flex-col items-start pt-32 pb-10 px-20 gap-5">
        <h1 className="text-3xl font-bold text-gray-500 w-full text-center">
          Daftar Kegiatan
        </h1>
        <div className="bg-gray-500 w-full h-150 text-7xl text-white flex justify-center items-center">
          List Kegiatan
        </div>
      </div>
      <div className="h-screen bg-gray-500 flex flex-col items-start py-10 px-20">
        <h1 className="text-3xl font-bold text-white mb-10 w-full text-center">
          Jadwal Kegiatan
        </h1>
        <div className="bg-white w-full h-150 text-7xl text-gray-500 flex justify-center items-center">
          Kalender
        </div>
      </div>
      {/* Galeri Kegiatan */}
      <div className="h-screen flex flex-col items-start p-10">
        <h1 className="text-3xl font-bold text-gray-500 mb-10 text-center w-full">
          Galeri Kegiatan
        </h1>
        {/* Galeri kegiatan baris-1 */}
        <div className="flex justify-center w-full gap-14">
          <div className="w-80 text-gray-500 shadow-lg p-0.5 rounded-xs">
            <div className="h-50 bg-gray-500 rounded-md"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-sm">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>

          <div className="w-80 text-gray-500">
            <div className="h-50 bg-gray-500 rounded-lg"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-md">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>
          <div className="w-80 text-gray-500">
            <div className="h-50 bg-gray-500 shadow-xl/30"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-full">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>
        </div>
        {/* Galeri kegiatan baris-2 */}
        <div className="flex justify-center w-full gap-14 mt-10">
          <div className="w-80 text-gray-500 shadow-2xs">
            <div className="h-50 bg-gray-500 rounded-md"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-sm">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>

          <div className="w-80 text-gray-500">
            <div className="h-50 bg-gray-500 rounded-md"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-md">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>
          <div className="w-80 text-gray-500">
            <div className="h-50 bg-gray-500 rounded-md"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-full">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

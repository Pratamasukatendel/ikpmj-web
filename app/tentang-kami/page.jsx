import Navbar from "../component/user/navbar";
import Footer from "../component/user/footer";
import Image from "next/image";

export default function TentangKami() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="h-screen bg-gray-500 flex gap-20 py-40 justify-around items-center p-10">
        <div className="w-100 h-100 bg-amber-500 rounded-md">
          {/* <Image
            className="w-lg border-2 border-purple-500"
            src="/images/ikpmj.png"
            alt="IKPMJ Logo"
            width={100}
            height={100}
          /> */}
        </div>
        <div className="border-2 border-purple-500 w-2xl">
          <h1 className="text-3xl mb-10 text-center font-bold text-amber-500">
            Sejarah Organisasi
          </h1>
          <p className="text-justify text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar.
          </p>
        </div>
      </div>
      <div className="h-screen px-10 flex items-center gap-10 justify-evenly">
        <div className="w-fit -mt-100">
          <h1 className="text-3xl font-semibold mb-5">Visi Kami</h1>
          <p className="text-lg/relaxed text-justify">
            Terbinanya IKPMJ yang senantiasa berinovasi dalam beraksi guna
            terwujudnya sebuah kolaborasi.
          </p>
        </div>
        <div className="w-fit -mb-20">
          <h1 className="text-3xl text-right font-semibold mb-5">Misi Kami</h1>
          <ul className="text-lg/relaxed text-justify">
            <li>
              1. Mewujudkan IKPMJ yang terdepan guna teroptimalisasi motivasi di
              lingkungan Masyarakat yang bersahaja.
            </li>
            <li>
              2. Menciptakan IKPMJ sebagai katalisator aksi dan menjadi jembatan
              solutif bagi seluruh permasalahan OIKPMJ.
            </li>
            <li>
              3. Menjadikan IKPMJ sebagai ruang ekspresi terbaik dalam
              mewujudkan kesejahteraan mahasiswa.
            </li>
            <li>
              4. Menjadikan IKPMJ sebagai media dan sarana terbaik serta wahana
              kolaboratif guna meningkatkan peran dan fungsi eksekutif.
            </li>
          </ul>
        </div>
      </div>
      <div className="h-screen bg-gray-500 p-10">
        <h1 className="text-3xl text-white text-center font-bold my-10">
          Struktur Organisasi
        </h1>
        <div className="w-full flex justify-center">
          <Image
            className="flex"
            src="/images/organisasi.png"
            alt="IKPMJ Logo"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <div className="p-10 h-100">
        <h1 className="text-3xl text-gray-500 text-center font-bold mt-10">
          Kontak Pengurus
        </h1>
      </div>
      <Footer></Footer>
    </div>
  );
}

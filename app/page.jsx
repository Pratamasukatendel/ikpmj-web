import Navbar from "./component/user/navbar";
import FAQ from "./component/user/faq";
import Footer from "./component/user/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      {/* section header */}
      <div className="h-screen bg-gray-500 flex gap-20 py-40 justify-center items-center">
        <h1 className="text-5xl leading-relaxed text-left font-bold text-amber-500">
          Selamat Datang di Ikatan Pelajar <br />
          dan Mahasiswa Jember <br />
          (IKPMJ)
        </h1>
        <Image
          className="w-xs"
          src="/images/ikpmj.png"
          alt="IKPMJ Logo"
          width={90}
          height={90}
        />
      </div>

      {/* section about us */}
      <div className="h-fit py-20 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Tentang IKPMJ</h2>
        <p className="w-2xl text-lg text-center py-10">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
          placeat, numquam obcaecati esse at sit fugiat amet fugit voluptates
          deserunt molestias reiciendis vero tempora nisi sunt eum cupiditate ea
          quisquam ducimus harum? Voluptate veniam aspernatur dicta architecto
          cumque, sequi, minus quod nobis, enim perferendis eaque atque dolore
          delectus error eligendi!
        </p>
        <Link
          href={"/tentang-kami"}
          className="py-2 px-4 bg-amber-500 text-white rounded-md"
        >
          Selengkapnya
        </Link>
      </div>

      {/* section event */}
      <div className="h-fit py-20 flex flex-col justify-around items-center bg-gray-500">
        <h2 className="text-3xl text-white font-bold mb-10 text-left">
          Kegiatan Terbaru
        </h2>
        <div className="flex gap-14">
          <div className="w-80 text-white shadow-2xs">
            <div className="h-50 bg-white rounded-md"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-sm">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>

          <div className="w-80 text-white">
            <div className="h-50 bg-white rounded-md"></div>
            <div className="flex justify-between  mt-2 text-xs">
              <p className="border-1 px-3 rounded-md">Kerja Bakti</p>
              <p>Juni 25,2025</p>
            </div>
            <p className="pt-3">
              Lorem ipsum dolor sit amet ame, consectetur adipisicing.
            </p>
          </div>
          <div className="w-80 text-white">
            <div className="h-50 bg-white rounded-md"></div>
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
      <FAQ />
      <Footer></Footer>
    </div>
  );
}

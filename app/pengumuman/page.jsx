import Navbar from "../component/user/navbar";
import Image from "next/image";
import Footer from "../component/user/footer";

export default function Pengumuman() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="h-screen pt-32 pb-10 px-20">
        <h1 className="text-3xl font-bold text-gray-500">
          Rapat Perdana Internal IKPMJ
        </h1>
      </div>
      <Footer></Footer>
    </div>
  );
}

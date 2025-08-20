"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Semua tabel harus di isi!");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Pengguna sudah tersedia!");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/admin/auth/login");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-250 h-125 flex shadow-md rounded-md">
        <div className="w-125 flex items-center justify-center bg-yellow-50 rounded-l-md">
          <div className="w-90 h-100">
            <h1 className="text-center font-extrabold text-3xl mb-2 text-gray-700">
              REGISTER
            </h1>
            <p className="text-md text-center mb-7 text-gray-500">
              Enter your email to register.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="text-gray-500 w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Username"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="text-gray-500 w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="text-gray-500 w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Password"
              />
              <button className="bg-amber-500 w-full px-2 py-2 rounded-md mt-3 text-white text-medium hover:bg-amber-400 cursor-pointer">
                Register
              </button>

              {error && <div className="text-red-500 mt-2"> {error} </div>}
            </form>
            <p className="text-right text-gray-500 text-sm mt-5">
              Already have an account?{" "}
              <Link
                href={"/admin/auth/login"}
                className="text-blue-500 underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="w-125 flex items-center justify-center ">
          <Image
            className=""
            src="/images/ikpmj.png"
            alt="IKPMJ Logo"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

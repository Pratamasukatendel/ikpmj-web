"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password, 
        redirect:false
      });

      if (res.error) {
        setError("Data yang anda masukkan salah!");
        return;
      }

      router.replace("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-250 h-120 flex shadow-md rounded-md">
        <div className="w-125 flex items-center justify-center ">
          <Image
            className=""
            src="/images/ikpmj.png"
            alt="IKPMJ Logo"
            width={350}
            height={350}
          />
        </div>
        <div className="w-125 flex items-center justify-center bg-yellow-50 rounded-r-md">
          <div className="w-90 h-90  ">
            <h1 className="text-center font-extrabold text-3xl mb-2 text-gray-700">
              SIGN IN
            </h1>
            <p className="text-md text-center mb-10 text-gray-500">
              Enter your email to sign in.
            </p>
            <form onSubmit={handleSubmit} action="">
              <input
              onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="text-gray-500 w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Email"
              ></input>
              <input
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="text-gray-500 w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Password"
              ></input>
              <button
                className="bg-amber-500 w-full px-2 py-2 rounded-md mt-3 text-white text-medium hover:bg-amber-400 cursor-pointer"
                type="submit"
              >
                Sign In
              </button>
              {error && (
                <div className="text-red-500 mt-2">{error}</div>
              )}
              
            </form>
            <p className="text-right text-gray-500 mt-5 text-sm">
              Don't have an account?
              <Link
                href={"/admin/auth/register"}
                className="text-blue-500 underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

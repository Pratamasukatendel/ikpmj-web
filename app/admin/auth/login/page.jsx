import Image from "next/image";
import Link from "next/link";

export default function Login() {
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
            <form action="">
              <input
                type="text"
                className="text-gray-500 w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Email"
              ></input>
              <input
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
              <div className="text-red-500 mt-2">Error message</div>
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

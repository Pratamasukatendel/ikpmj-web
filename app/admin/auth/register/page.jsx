import Image from "next/image";

export default function Register() {
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white w-250 h-125 flex shadow-md rounded-md">
        <div className="w-125 flex items-center justify-center bg-yellow-50 rounded-l-md">
          <div className="w-90 h-100">
            <h1 className="text-center font-extrabold text-3xl mb-2">
              SIGN UP
            </h1>
            <p className="text-md text-center mb-7 text-gray-500">
              Enter your email to sign up.
            </p>
            <form action="">
              <input
                type="text"
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Username"
              ></input>
              <input
                type="email"
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Email"
              ></input>
              <input
                type="password"
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Password"
              ></input>
              <input
                type="password"
                className="w-full mb-9 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Repeat Password"
              ></input>
            </form>
            <button
              className="bg-amber-500 w-full px-2 py-2 rounded-md mb-2 text-white text-medium hover:bg-amber-600"
              type="submit"
            >
              Sign Up
            </button>
            <p className="text-center text-gray-500 text-md">
              have an account ? sign in
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

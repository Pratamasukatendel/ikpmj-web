import Image from "next/image";

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
        <div className="w-125 flex items-center justify-center bg-yellow-50">
          <div className="w-90 h-90  ">
            <h1 className="text-center font-extrabold text-3xl mb-2">
              SIGN IN
            </h1>
            <p className="text-md text-center mb-10 text-gray-500">
              Enter your email to sign in.
            </p>
            <form action="">
              <input
                type="text"
                className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Email"
              ></input>
              <input
                type="password"
                className="w-full mb-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white"
                placeholder="Password"
              ></input>
            </form>
            <p className="underline underline-offset-4 text-center text-gray-500">
              Forget your password?
            </p>
            <button
              className="bg-amber-500 w-full px-2 py-2 rounded-md mt-2 text-white text-medium"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

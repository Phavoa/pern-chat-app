import React, { ReactNode } from "react";
import Globe from "../assets/images/globe.png";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full flex m-0 p-0">
      {/* Left Section */}
      <aside className="hidden md:block flex-1 bg-[#000F19] relative">
        {/* Logo Section */}
        <header className="flex items-center p-4">
          <div
            className="relative w-10 h-10 border-2 border-x-transparent border-blue-600 rounded-full flex justify-center items-center animate-spin"
            aria-label="Loading animation"
          >
            <div
              className="relative w-10 h-10 border-2 border-y-transparent border-pink-700 rounded-full flex justify-center items-center animate-spin"
              aria-label="Loading animation"
            ></div>
          </div>
          <div className="absolute w-10 h-4 border-2 border-gray-500 rounded-full animate-spin-reverse"></div>
          <div className="absolute w-10 h-8 border-2 border-gray-500 rounded-full animate-spin"></div>
          <div className="absolute w-10 h-4 border-2 border-gray-500 rounded-full animate-spin"></div>
          <h1 className="z-10 text-white ml-2 text-sm">Megaexe</h1>
        </header>

        {/* Content Section */}
        <main className="h-full flex flex-col justify-center items-center gap-5">
          <p className="text-center text-[#8EBEFF] text-lg px-3">
            Connect with a community with any language through Megaexe
          </p>
          <img
            src={Globe}
            alt="A globe representing global connectivity"
            width="100"
          />
        </main>
      </aside>

      {/* Right Section */}
      <section className="flex-1 flex bg-[#0B182C]">{children}</section>
    </div>
  );
};

export default AuthLayout;

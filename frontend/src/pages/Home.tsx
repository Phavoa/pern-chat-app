import { useState } from "react";
import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";
import SideNav from "@/components/sideNav";
import useTranslate from "@/hooks/useTranslate";

const Home = () => {
  const [isClose, setIsClose] = useState(true);
  useTranslate();

  return (
    <div className="h-screen bg-[#000F19]  w-full rounded-lg overflow-hidden ">
      <SideNav isClose={isClose} setIsClose={setIsClose} />
      <div className="h-16 w-full flex items-center pl-5">
        <header className="flex items-center">
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
      </div>

      <div
        className={`flex bg-[#0B182C] rounded-lg`}
        style={{
          height: `calc(100vh - 64px)`,
          marginLeft: "40px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default Home;

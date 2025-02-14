import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex align-center flex-row justify-between items-center mb-6 w-full md:w-7/12 border border-[#197686] rounded-[24px] p-4">
      <img
        src={logo}
        alt="logo"
        width={100}
        height={100}
        className="mb-4 md:mb-0"
      />
      <nav className="flex flex-col hidden md:block space-y-4 md:space-y-0 md:space-x-6 text-gray-300 text-center md:text-left">
        <a href="#" className="hover:text-white transition-colors">
          Events
        </a>
        <a href="#" className="hover:text-white transition-colors">
          My Tickets
        </a>
        <a href="#" className="hover:text-white transition-colors">
          About Project
        </a>
      </nav>
      <button className="mt-4 md:mt-0 bg-white text-teal-950 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        MY TICKETS →
      </button>
    </div>
  );
};

export default Navbar;

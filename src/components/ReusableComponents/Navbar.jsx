import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
const Navbar = () => {
    return (
    <div className="flex justify-between items-center mb-6 w-7/12 border border-[#197686] rounded-[24px] p-4">
        <img src={logo} alt="logo" width={100} height={100} />
        <nav className="flex space-x-6 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Events</a>
            <a href="#" className="hover:text-white transition-colors">My Tickets</a>
            <a href="#" className="hover:text-white transition-colors">About Project</a>
        </nav>
        <button className="bg-white text-teal-950 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            MY TICKETS →
        </button>
    </div>
    );
};

export default Navbar;      
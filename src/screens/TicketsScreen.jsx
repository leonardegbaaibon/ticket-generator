import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Navbar from '../components/ReusableComponents/Navbar';

const TicketSelection = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);

    const ticketTypes = [
        { type: 'REGULAR ACCESS', price: 'Free', availability: '20/52' },
        { type: 'VIP ACCESS', price: '$150', availability: '20/52' },
        { type: 'VVIP ACCESS', price: '$150', availability: '20/52' },
    ];

    return (
        <div className="min-h-screen bg-[#02191D] flex flex-col items-center p-6 relative overflow-hidden">
            {/* Main page radial gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0)_70%)]" />
            
            <Navbar />
            <div className='flex items-center justify-center relative z-10'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl bg-[#041E23] border border-[#0E464F] rounded-3xl p-8 backdrop-blur-sm"
                >
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl text-white font-light">Ticket Selection</h1>
                            <span className="text-gray-400">Step 1/3</span>
                        </div>
                        <div className='p-6 border border-[#0E464F] rounded-[24px] bg-[#08252B]'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-[#07373F] rounded-xl p-6 mb-8 relative overflow-hidden"
                            >
                                {/* Techember Fest container linear gradient */}
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-[#041E23]" />
                                
                                <div className="relative z-10">
                                    <h2 className="text-4xl text-white text-center font-bold mb-2">Techember Fest '25</h2>
                                    <p className="text-gray-300 text-center mb-2">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
                                    <p className="text-gray-400 text-center">📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
                                </div>
                            </motion.div>

                            <label className="text-white mb-4 block">Select Ticket Type:</label>
                            <div className="mb-6 border border-[#0E464F] rounded-[24px] bg-[#052228] p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {ticketTypes.map((ticket, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedTicket(index)}
                                            className={`p-4 rounded-xl border-2 transition-colors ${selectedTicket === index
                                                ? 'border-[#197686] bg-[transparent]'
                                                : 'border-[#197686] hover:bg-[#12464E]'
                                                }`}
                                        >
                                            <div className="text-2xl text-left text-white mb-2">{ticket.price}</div>
                                            <div className="text-sm text-left text-gray-400">{ticket.type}</div>
                                            <div className="text-xs text-left text-gray-500 mt-1">{ticket.availability}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-8">
                                <label className="text-white mb-2 block">Number of Tickets</label>
                                <div className="relative">
                                    <select
                                        value={ticketCount}
                                        onChange={(e) => setTicketCount(Number(e.target.value))}
                                        className="w-full bg-[transparent] border-2 border-[#07373F] rounded-xl p-4 text-white appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 p-4 rounded-xl border-2 border-[#24A0B5] text-[#24A0B5] transition-colors"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
                                >
                                    Next
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TicketSelection;
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Trash2, Calendar, Clock, MapPin, Download, Share2 } from "lucide-react";
import Navbar from "../components/ReusableComponents/Navbar";
import ticketBg from "../assets/TICKET.png";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('ticketHistory') || '[]');
    setTickets(savedTickets);
  }, []);

  const deleteTicket = (ticketId) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId);
    setTickets(updatedTickets);
    localStorage.setItem('ticketHistory', JSON.stringify(updatedTickets));
  };

  const filteredTickets = selectedFilter === "all" 
    ? tickets 
    : tickets.filter(ticket => ticket.ticketType.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleDownload = (ticketId) => {
    // Implement ticket download functionality
    console.log('Downloading ticket:', ticketId);
  };

  const handleShare = async (ticketId) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Event Ticket',
          text: 'Check out my ticket for this amazing event!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#02191D] flex flex-col items-center p-4 md:p-6 relative overflow-hidden">
      {/* Main page radial gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0)_70%)]" />

      <Navbar />
      
      <div className="w-full md:w-[900px] bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm relative z-10">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl text-white font-light">My Tickets</h1>
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-[#041E23] border-2 border-[#07373F] rounded-xl p-2 text-white appearance-none pr-10"
              >
                <option value="all">All Tickets</option>
                <option value="regular">Regular Access</option>
                <option value="vip">VIP Access</option>
                <option value="vvip">VVIP Access</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            </div>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tickets found</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/'}
                className="mt-4 px-6 py-3 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
              >
                Book a Ticket
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTickets.map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative bg-[#08252B] border border-[#0E464F] rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-[#041E23]" />
                  
                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl text-white font-bold">{ticket.eventName}</h2>
                        <p className="text-gray-400 text-sm">
                          Booked on {new Date(ticket.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTicket(ticket.id)}
                        className="text-[#24A0B5] hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      {ticket.imagePreview && (
                        <img
                          src={ticket.imagePreview}
                          alt="Profile"
                          className="w-16 h-16 rounded-xl object-cover border-2 border-[#24A0B5]"
                        />
                      )}
                      <div>
                        <p className="text-white">{ticket.formData.name}</p>
                        <p className="text-gray-400 text-sm">{ticket.formData.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Ticket Type</p>
                        <p className="text-white">{ticket.ticketType}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Quantity</p>
                        <p className="text-white">{ticket.ticketCount}</p>
                      </div>
                    </div>

                    {ticket.formData.specialRequest && (
                      <div className="mt-4">
                        <p className="text-gray-400 text-sm">Special Request</p>
                        <p className="text-white text-sm">{ticket.formData.specialRequest}</p>
                      </div>
                    )}

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(ticket.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{ticket.time}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {ticket.venue.name}, {ticket.venue.city}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center mb-6">
                      <img
                        src={ticket.qrCode}
                        alt="Ticket QR Code"
                        className="w-32 h-32"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(ticket.id)}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl bg-[#24A0B5] text-white text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(ticket.id)}
                        className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-xl border border-[#24A0B5] text-[#24A0B5] text-sm font-medium"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTickets; 
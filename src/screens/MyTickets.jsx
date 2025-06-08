import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Download, Share2, User, Mail, Phone, Tag, DollarSign, Calendar as CalendarIcon, Clock as ClockIcon, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../contexts/TicketContext';
import html2canvas from 'html2canvas';

const MyTickets = () => {
  const navigate = useNavigate();
  const { bookedTickets, cancelTicket } = useTickets();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTickets = bookedTickets.filter(ticket => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return ticket.status === 'active';
    if (selectedFilter === 'cancelled') return ticket.status === 'cancelled';
    return true;
  });

  const handleDownload = async (ticket) => {
    try {
      const ticketElement = document.getElementById(`ticket-${ticket.id}`);
      if (ticketElement) {
        const canvas = await html2canvas(ticketElement);
        const link = document.createElement('a');
        link.download = `ticket-${ticket.ticketNumber}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (error) {
      console.error('Error downloading ticket:', error);
    }
  };

  const handleShare = async (ticket) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${ticket.eventName}`,
          text: `Check out my ticket for ${ticket.eventName}!`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#02191D] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
              My Tickets
            </h1>
            <p className="text-gray-400">
              Manage your upcoming event tickets
            </p>
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-[#041E23] border border-[#0E464F] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#24A0B5]"
          >
            <option value="all">All Tickets</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTickets.map((ticket) => (
              <motion.div
                key={ticket.id}
                id={`ticket-${ticket.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-[#041E23] border ${
                  ticket.status === 'cancelled' ? 'border-red-500' : 'border-[#0E464F]'
                } rounded-xl overflow-hidden`}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041E23] to-transparent" />
                  {ticket.status === 'cancelled' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <span className="text-red-500 text-lg font-bold">CANCELLED</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-lg text-white font-bold mb-1">
                        {ticket.eventName}
                      </h2>
                      <p className="text-[#24A0B5] text-sm font-medium">
                        {ticket.ticketType} × {ticket.quantity}
                      </p>
                      <p className="text-gray-400 text-xs">
                        #{ticket.ticketNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">${ticket.totalAmount}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(ticket.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-300">
                        <User className="w-3 h-3 mr-1" />
                        <span className="text-xs truncate">{ticket.attendee.name}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span className="text-xs">
                          {new Date(ticket.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="text-xs truncate">
                          {ticket.venue.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <img
                        src={ticket.qrCode}
                        alt="Ticket QR Code"
                        className="w-20 h-20"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {ticket.status === 'active' ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDownload(ticket)}
                          className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-[#24A0B5] text-white text-xs font-medium"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare(ticket)}
                          className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg border border-[#0E464F] text-[#24A0B5] text-xs font-medium"
                        >
                          <Share2 className="w-3 h-3" />
                          <span>Share</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => cancelTicket(ticket.id)}
                          className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg border border-[#0E464F] text-red-500 text-xs font-medium"
                        >
                          <Ban className="w-3 h-3" />
                          <span>Cancel</span>
                        </motion.button>
                      </>
                    ) : (
                      <p className="text-center text-red-500 text-xs">This ticket has been cancelled</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl text-white font-medium mb-2">No Tickets Found</h3>
            <p className="text-gray-400">You haven't booked any tickets yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets; 
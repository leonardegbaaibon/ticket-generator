import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Upload, X, Download, Share2, User, Mail, Phone, Tag, DollarSign, Calendar, Clock, MapPin } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import ticketBg from "../assets/TICKET.png";
import { events } from "../data/events";
import { useTickets } from '../contexts/TicketContext';

const TicketBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { bookTicket } = useTickets();
  const event = events.find(e => e.id === parseInt(eventId)) || events[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequest: "",
  });

  // Reset everything when component mounts or eventId changes
  useEffect(() => {
    setCurrentStep(1);
    setSelectedTicket(null);
    setTicketCount(1);
    setImagePreview(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialRequest: "",
    });
    // Clear any stored booking data
    sessionStorage.removeItem('currentStep');
    sessionStorage.removeItem('selectedTicket');
    sessionStorage.removeItem('ticketCount');
    sessionStorage.removeItem('imagePreview');
  }, [eventId]);

  useEffect(() => {
    localStorage.setItem('userFormData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImagePreview(null);

  const saveTicketToHistory = () => {
    const ticketDetails = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      ticketType: selectedTicket !== null ? event.tickets[selectedTicket].type : "N/A",
      quantity: ticketCount,
      price: event.tickets[selectedTicket]?.price || "Free",
      totalAmount: calculateTotal(),
    };

    const bookedTicket = bookTicket(event.id, ticketDetails);
    if (bookedTicket) {
      setCurrentStep(3);
    }
  };

  const calculateTotal = () => {
    if (selectedTicket === null) return 0;
    const price = parseFloat(event.tickets[selectedTicket].price.replace('$', '') || 0);
    return price * ticketCount;
  };

  const handleCompleteBooking = () => {
    saveTicketToHistory();
  };

  const resetBookingForm = () => {
    // Reset all state
    setCurrentStep(1);
    setSelectedTicket(null);
    setTicketCount(1);
    setImagePreview(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialRequest: "",
    });
    
    // Clear all storage
    sessionStorage.removeItem('currentStep');
    sessionStorage.removeItem('selectedTicket');
    sessionStorage.removeItem('ticketCount');
    sessionStorage.removeItem('imagePreview');
    localStorage.removeItem('userFormData');
    
    // Navigate to events page
    navigate('/');
  };

  const downloadTicket = async () => {
    const ticketElement = document.getElementById('ticket-card');
    if (ticketElement) {
      try {
        const canvas = await html2canvas(ticketElement);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${event.name}-ticket.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error downloading ticket:', error);
      }
    }
  };

  const shareTicket = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${event.name}`,
          text: `Check out my ticket for ${event.name}!`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
      <AnimatePresence mode="wait">
        {currentStep === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full md:w-[700px] mx-auto bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl md:text-2xl text-white font-light">
                  Ticket Selection
                </h1>
                <span className="text-gray-400">Step 1/3</span>
              </div>
              <div className="p-4 md:p-6 border border-[#0E464F] rounded-[24px] bg-[#08252B]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#07373F] rounded-xl p-4 md:p-6 mb-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-[#041E23]" />

                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-4xl text-white text-center font-bold mb-2">
                      {event.name}
                    </h2>
                    <p className="text-gray-300 text-center mb-2">
                      {event.description}
                    </p>
                    <p className="text-gray-400 text-center">
                      📍 {event.location} || {event.date} | {event.time}
                    </p>
                  </div>
                </motion.div>

                <label className="text-white mb-4 block">
                  Select Ticket Type:
                </label>
                <div className="mb-6 border border-[#0E464F] rounded-[24px] bg-[#052228] p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {event.tickets.map((ticket, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTicket(index)}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          selectedTicket === index
                            ? "border-[#197686] bg-[transparent]"
                            : "border-[#197686] hover:bg-[#12464E]"
                        }`}
                      >
                        <div className="text-xl md:text-2xl text-left text-white mb-2">
                          {ticket.price}
                        </div>
                        <div className="text-sm text-left text-gray-400">
                          {ticket.type}
                        </div>
                        <div className="text-xs text-left text-gray-500 mt-1">
                          {ticket.availability}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-white mb-2 block">
                    Number of Tickets
                  </label>
                  <div className="relative">
                    <select
                      value={ticketCount}
                      onChange={(e) => setTicketCount(Number(e.target.value))}
                      className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white appearance-none"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
                  </div>
                </div>

                <div className="flex space-x-4 flex-col gap-4 md:flex-row mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/')}
                    className="flex-1 p-4 rounded-xl border-2 border-[#24A0B5] text-[#24A0B5] transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={selectedTicket === null}
                    className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            {currentStep === 3 ? (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="w-full md:w-[700px] mx-auto bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl md:text-3xl text-white font-light mb-4">
                    Your Ticket is Booked!
                  </h1>
                  <p className="text-gray-400 mb-8">
                    Download your ticket or share it with friends
                  </p>

                  <div
                    id="ticket-card"
                    className="w-full max-w-[480px] relative bg-no-repeat bg-cover bg-center mb-8"
                    style={{
                      backgroundImage: `url(${ticketBg})`,
                      borderRadius: "24px",
                      overflow: "hidden",
                    }}
                  >
                    <div className="absolute inset-0 bg-[#052228] bg-opacity-90 backdrop-blur-sm"></div>

                    <div className="relative z-10 border-2 border-[#0E464F] rounded-[24px] p-4 md:p-6">
                      <div className="mb-6">
                        <h2 className="text-xl md:text-2xl text-white font-bold">
                          {event.name}
                        </h2>
                        <div className="flex items-center justify-center space-x-2 text-gray-400 mt-2">
                          <span>📍 {event.location}</span>
                        </div>
                        <div className="text-gray-400 mt-1">
                          {event.date} | {event.time}
                        </div>
                      </div>

                      {imagePreview && (
                        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-xl overflow-hidden border-2 border-[#24A0B5]">
                          <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-4 text-left">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-gray-400 text-sm">
                              Name
                            </label>
                            <div className="text-white">{formData.name}</div>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Email
                            </label>
                            <div className="text-white">{formData.email}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-gray-400 text-sm">
                              Ticket Type
                            </label>
                            <div className="text-white">
                              {selectedTicket !== null
                                ? event.tickets[selectedTicket].type
                                : "N/A"}
                            </div>
                          </div>
                          <div>
                            <label className="text-gray-400 text-sm">
                              Quantity
                            </label>
                            <div className="text-white">{ticketCount}</div>
                          </div>
                        </div>
                        {formData.specialRequest && (
                          <div>
                            <label className="text-gray-400 text-sm">
                              Special request
                            </label>
                            <div className="text-white">
                              {formData.specialRequest}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 flex-col gap-4 md:flex-row mt-8 space-x-4 w-full max-w-[480px]">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetBookingForm}
                      className="flex-1 p-4 rounded-xl border-2 border-[#24A0B5] text-[#24A0B5] transition-colors"
                    >
                      Book Another Ticket
                    </motion.button>
                    <div className="flex-1 flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={downloadTicket}
                        className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={shareTicket}
                        className="p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full md:w-[700px] mx-auto bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl md:text-2xl text-white font-light">
                      Attendee Details
                    </h1>
                    <span className="text-gray-400">Step 2/3</span>
                  </div>
                  <div className="p-4 md:p-6 border border-[#0E464F] rounded-[24px] bg-[#08252B]">
                    <div className="mb-8">
                      <p className="text-white mb-4">Upload Profile Photo</p>
                      <div
                        onDrop={handleDrop}
                        onDragOver={(event) => event.preventDefault()}
                        className="border-2 h-[200px] relative border-[#0E464F] rounded-xl p-8 flex flex-col items-center justify-center bg-[#041E23] cursor-pointer relative"
                      >
                        {imagePreview ? (
                          <div className="h-[240px] w-[240px] border-[#24A0B5] border-3 bg-[#0E464F] rounded-4xl absolute flex justify-center group overflow-hidden">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-4xl transition-all duration-300 group-hover:opacity-50"
                            />

                            <div className="absolute mt-[50px] justify-center bg-[rgb(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex justify-center">
                                <Upload className="w-8 h-8 text-[#24A0B5] mb-2" />
                              </div>
                              <p className="text-gray-400 text-center w-[200px]">
                                Drag & drop or click to upload
                              </p>
                              <input
                                type="file"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="h-[240px] w-[240px] border-[#24A0B5] border-3 bg-[#0E464F] py-14 px-6 rounded-4xl absolute">
                            <div className="flex justify-center">
                              <Upload className="w-8 h-8 text-[#24A0B5] mb-2" />
                            </div>
                            <p className="text-gray-400 text-center">
                              Drag & drop or click to upload
                            </p>
                            <input
                              type="file"
                              onChange={handleImageUpload}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white mb-2 block">
                          Enter your name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                          className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="text-white mb-2 block">
                          Enter your email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          required
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                          placeholder="hello@example.com"
                        />
                      </div>

                      <div>
                        <label className="text-white mb-2 block">
                          Enter your phone number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                          placeholder="Your phone number"
                        />
                      </div>

                      <div>
                        <label className="text-white mb-2 block">
                          Special request?
                        </label>
                        <textarea
                          value={formData.specialRequest}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specialRequest: e.target.value,
                            })
                          }
                          className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white h-32 resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 flex-col gap-4 md:flex-row mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBack}
                        className="flex-1 p-4 rounded-xl border-2 border-[#24A0B5] text-[#24A0B5] transition-colors"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCompleteBooking}
                        disabled={!formData.email || !formData.name}
                        className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {event.tickets[selectedTicket || 0].price === "Free"
                          ? "Get My Free Ticket"
                          : "Complete Purchase"}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketBooking;

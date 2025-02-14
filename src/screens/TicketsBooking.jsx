import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Upload, X } from "lucide-react";
import Navbar from "../components/ReusableComponents/Navbar";
import ticketBg from "../assets/TICKET.png";

const TicketBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialRequest: "",
  });

  const ticketTypes = [
    { type: "REGULAR ACCESS", price: "Free", availability: "20/52" },
    { type: "VIP ACCESS", price: "$150", availability: "20/52" },
    { type: "VVIP ACCESS", price: "$150", availability: "20/52" },
  ];

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
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

  return (
    <div className="min-h-screen bg-[#02191D] flex flex-col items-center p-4 md:p-6 relative overflow-hidden">
      {/* Main page radial gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0)_70%)]" />

      <Navbar />
      <div className="flex items-center justify-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full md:w-[700px] bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
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
                        Techember Fest '25
                      </h2>
                      <p className="text-gray-300 text-center mb-2">
                        Join us for an unforgettable experience at [Event Name]!
                        Secure your spot now.
                      </p>
                      <p className="text-gray-400 text-center">
                        📍 [Event Location] || March 15, 2025 | 7:00 PM
                      </p>
                    </div>
                  </motion.div>

                  <label className="text-white mb-4 block">
                    Select Ticket Type:
                  </label>
                  <div className="mb-6 border border-[#0E464F] rounded-[24px] bg-[#052228] p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ticketTypes.map((ticket, index) => (
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

                  <div className="flex space-x-4 flex-col gap-4 md:flex-row mt-8 space-x-4">
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
                      onClick={handleNext}
                      className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
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
                  className="w-full md:w-[700px] bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl md:text-3xl text-white font-light mb-4">
                      Your Ticket is Booked!
                    </h1>
                    <p className="text-gray-400 mb-8">
                      Check your email for a copy or you can{" "}
                      <span className="text-white">download</span>
                    </p>

                    <div
                      className="w-full max-w-[480px] relative bg-no-repeat bg-cover bg-center mb-8"
                      style={{
                        backgroundImage: `url(${ticketBg})`,
                        borderRadius: "24px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Semi-transparent overlay to ensure text readability */}
                      <div className="absolute inset-0 bg-[#052228] bg-opacity-90 backdrop-blur-sm"></div>

                      {/* Ticket content with relative positioning to appear above the overlay */}
                      <div className="relative z-10 border-2 border-[#0E464F] rounded-[24px] p-4 md:p-6">
                        <div className="mb-6">
                          <h2 className="text-xl md:text-2xl text-white font-bold">
                            Techember Fest '25
                          </h2>
                          <div className="flex items-center justify-center space-x-2 text-gray-400 mt-2">
                            <span>📍 04 Rumens road, Ikoyi, Lagos</span>
                          </div>
                          <div className="text-gray-400 mt-1">
                            March 15, 2025 | 7:00 PM
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
                                Enter your name
                              </label>
                              <div className="text-white">{formData.name}</div>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                Enter your email
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
                                  ? ticketTypes[selectedTicket].type
                                  : "N/A"}
                              </div>
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                Ticket for
                              </label>
                              <div className="text-white">{ticketCount}</div>
                            </div>
                          </div>
                          {formData.specialRequest && (
                            <div>
                              <label className="text-gray-400 text-sm">
                                Special request?
                              </label>
                              <div className="text-white">
                                {formData.specialRequest}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full max-w-[480px] flex justify-center">
                      {/* <img
                          src="/api/placeholder/400/100"
                          alt="Barcode"
                          className="mb-8"
                        /> */}
                    </div>

                    <div className="flex space-x-4 flex-col gap-4 md:flex-row mt-8 space-x-4 w-full max-w-[480px] ">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 p-4 rounded-xl border-2 border-[#24A0B5] text-[#24A0B5] transition-colors"
                      >
                        Book Another Ticket
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
                      >
                        Download Ticket
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full md:w-[700px] bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
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

                              <div className="absolute mt-[50px]  justify-center bg-[rgb(0,0,0,0.1)]  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            <div className="h-[240px] w-[240px] border-[#24A0B5] border-3 bg-[#0E464F] py-14 px-6 rounded-4xl absolute ">
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
                            placeholder="hello@avioflagos.io"
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
                          onClick={() => setCurrentStep(3)}
                          className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
                        >
                          Get My Free Ticket
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
    </div>
  );
};

export default TicketBooking;

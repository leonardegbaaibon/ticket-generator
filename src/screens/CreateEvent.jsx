import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [tickets, setTickets] = useState([
    { type: '', price: '', availability: '' }
  ]);

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: 'conference',
  });

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

  const addTicketType = () => {
    setTickets([...tickets, { type: '', price: '', availability: '' }]);
  };

  const removeTicketType = (index) => {
    if (tickets.length > 1) {
      const newTickets = tickets.filter((_, i) => i !== index);
      setTickets(newTickets);
    }
  };

  const handleTicketChange = (index, field, value) => {
    const newTickets = tickets.map((ticket, i) => {
      if (i === index) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    });
    setTickets(newTickets);
  };

  const clearForm = () => {
    setEventData({
      name: '',
      description: '',
      location: '',
      date: '',
      time: '',
      category: 'conference',
    });
    setImagePreview(null);
    setTickets([{ type: '', price: '', availability: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the event object
    const newEvent = {
      ...eventData,
      image: imagePreview,
      tickets: tickets,
      id: Date.now(),
      organizer: {
        name: 'Event Organizer',
        id: 1
      },
      venue: {
        name: eventData.location,
        city: eventData.location
      }
    };

    // Get existing events from localStorage
    const existingEvents = JSON.parse(localStorage.getItem('events') || '[]');
    
    // Add new event
    const updatedEvents = [...existingEvents, newEvent];
    
    // Save to localStorage
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    // Clear the form
    clearForm();

    // Navigate back to events page
    navigate('/');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#041E23] border border-[#0E464F] rounded-3xl p-4 md:p-8 backdrop-blur-sm"
      >
        <h1 className="text-2xl md:text-3xl text-white font-light mb-8">Create New Event</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Image Upload */}
          <div className="mb-8">
            <p className="text-white mb-4">Event Banner Image</p>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 h-[200px] relative border-[#0E464F] rounded-xl p-8 flex flex-col items-center justify-center bg-[#041E23] cursor-pointer"
            >
              {imagePreview ? (
                <div className="h-full w-full absolute inset-0 flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white">Click to change image</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-[#24A0B5] mb-2 mx-auto" />
                  <p className="text-gray-400">Drag & drop or click to upload</p>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-white mb-2 block">Event Name *</label>
              <input
                type="text"
                required
                value={eventData.name}
                onChange={(e) => setEventData({...eventData, name: e.target.value})}
                className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                placeholder="Enter event name"
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Category *</label>
              <select
                required
                value={eventData.category}
                onChange={(e) => setEventData({...eventData, category: e.target.value})}
                className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
              >
                <option value="conference">Conference</option>
                <option value="concert">Concert</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-white mb-2 block">Description *</label>
              <textarea
                required
                value={eventData.description}
                onChange={(e) => setEventData({...eventData, description: e.target.value})}
                className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white h-32"
                placeholder="Enter event description"
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Location *</label>
              <input
                type="text"
                required
                value={eventData.location}
                onChange={(e) => setEventData({...eventData, location: e.target.value})}
                className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                placeholder="Enter event location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white mb-2 block">Date *</label>
                <input
                  type="date"
                  required
                  value={eventData.date}
                  onChange={(e) => setEventData({...eventData, date: e.target.value})}
                  className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                />
              </div>
              <div>
                <label className="text-white mb-2 block">Time *</label>
                <input
                  type="time"
                  required
                  value={eventData.time}
                  onChange={(e) => setEventData({...eventData, time: e.target.value})}
                  className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                />
              </div>
            </div>
          </div>

          {/* Ticket Types */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-white text-lg">Ticket Types *</label>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addTicketType}
                className="flex items-center text-[#24A0B5] hover:text-teal-400"
              >
                <Plus className="w-5 h-5 mr-1" />
                Add Ticket Type
              </motion.button>
            </div>

            {tickets.map((ticket, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border border-[#0E464F] rounded-xl p-4">
                <div>
                  <label className="text-white mb-2 block">Type *</label>
                  <input
                    type="text"
                    required
                    value={ticket.type}
                    onChange={(e) => handleTicketChange(index, 'type', e.target.value)}
                    className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                    placeholder="e.g. VIP, Regular"
                  />
                </div>
                <div>
                  <label className="text-white mb-2 block">Price *</label>
                  <input
                    type="text"
                    required
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                    className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                    placeholder="e.g. $99, Free"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-white mb-2 block">Available Tickets *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={ticket.availability}
                      onChange={(e) => handleTicketChange(index, 'availability', e.target.value)}
                      className="w-full bg-[#041E23] border-2 border-[#07373F] rounded-xl p-4 text-white"
                      placeholder="e.g. 100"
                    />
                  </div>
                  {tickets.length > 1 && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeTicketType(index)}
                      className="text-red-500 hover:text-red-400 p-4"
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                clearForm();
                navigate('/');
              }}
              className="flex-1 p-4 rounded-xl border-2 border-[#24A0B5] text-[#24A0B5] transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 p-4 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
            >
              Create Event
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvent; 
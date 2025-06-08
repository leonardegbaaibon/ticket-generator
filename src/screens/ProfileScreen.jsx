import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Camera, Save, 
  Ticket, Calendar, Clock, Edit, ChevronRight,
  Settings, Bell, Shield, CreditCard, LogOut,
  Download, Share2, Ban
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../contexts/TicketContext';
import html2canvas from 'html2canvas';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { bookedTickets, cancelTicket } = useTickets();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'tickets', 'settings'
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: '',
      email: '',
      phone: '',
      location: '',
      avatar: null,
      bio: '',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      preferences: {
        language: 'English',
        currency: 'USD',
        theme: 'dark'
      }
    };
  });

  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    showNotification('Profile updated successfully!');
  };

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const TabButton = ({ tab, label, icon: Icon }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(tab)}
      className={`flex items-center w-full p-4 rounded-xl transition-colors ${
        activeTab === tab
          ? 'bg-[#24A0B5] text-white'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </motion.button>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#24A0B5]">
            {tempProfile.avatar ? (
              <img
                src={tempProfile.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#0E464F] flex items-center justify-center">
                <User className="w-16 h-16 text-[#24A0B5]" />
              </div>
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 p-2 bg-[#24A0B5] rounded-full cursor-pointer hover:bg-teal-400 transition-colors">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Full Name</label>
          <div className="flex items-center bg-[#02191D] rounded-xl p-4 border border-[#0E464F]">
            <User className="w-5 h-5 text-[#24A0B5] mr-3" />
            <input
              type="text"
              value={tempProfile.name}
              onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              className="bg-transparent text-white w-full focus:outline-none disabled:opacity-50"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Email</label>
          <div className="flex items-center bg-[#02191D] rounded-xl p-4 border border-[#0E464F]">
            <Mail className="w-5 h-5 text-[#24A0B5] mr-3" />
            <input
              type="email"
              value={tempProfile.email}
              onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="bg-transparent text-white w-full focus:outline-none disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Phone</label>
          <div className="flex items-center bg-[#02191D] rounded-xl p-4 border border-[#0E464F]">
            <Phone className="w-5 h-5 text-[#24A0B5] mr-3" />
            <input
              type="tel"
              value={tempProfile.phone}
              onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              className="bg-transparent text-white w-full focus:outline-none disabled:opacity-50"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Location</label>
          <div className="flex items-center bg-[#02191D] rounded-xl p-4 border border-[#0E464F]">
            <MapPin className="w-5 h-5 text-[#24A0B5] mr-3" />
            <input
              type="text"
              value={tempProfile.location}
              onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
              disabled={!isEditing}
              className="bg-transparent text-white w-full focus:outline-none disabled:opacity-50"
              placeholder="Enter your location"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Bio</label>
          <textarea
            value={tempProfile.bio}
            onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
            disabled={!isEditing}
            className="w-full bg-[#02191D] rounded-xl p-4 border border-[#0E464F] text-white focus:outline-none disabled:opacity-50 min-h-[100px]"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTempProfile(profile);
                  setIsEditing(false);
                }}
                className="px-6 py-3 rounded-xl border border-[#24A0B5] text-[#24A0B5] hover:bg-[#24A0B5] hover:text-white transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-6 py-3 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors flex items-center"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Profile
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );

  const renderTickets = () => {
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
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white font-bold">My Tickets</h2>
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
    );
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl text-white font-semibold mb-6">Settings</h2>
      
      {/* Notifications */}
      <div className="bg-[#02191D] rounded-xl p-6 border border-[#0E464F]">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 text-[#24A0B5] mr-3" />
          <h3 className="text-white font-medium">Notifications</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(tempProfile.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-400 capitalize">{key} Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setTempProfile(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      [key]: e.target.checked
                    }
                  }))}
                  className="sr-only peer"
                  disabled={!isEditing}
                />
                <div className={`w-11 h-6 bg-[#041E23] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#24A0B5]`}></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#02191D] rounded-xl p-6 border border-[#0E464F]">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-[#24A0B5] mr-3" />
          <h3 className="text-white font-medium">Security</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-xl border border-[#0E464F] text-gray-400 hover:text-white transition-colors text-left"
        >
          Change Password
        </motion.button>
      </div>

      {/* Payment Methods */}
      <div className="bg-[#02191D] rounded-xl p-6 border border-[#0E464F]">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 text-[#24A0B5] mr-3" />
          <h3 className="text-white font-medium">Payment Methods</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 rounded-xl border border-[#0E464F] text-gray-400 hover:text-white transition-colors text-left"
        >
          Manage Payment Methods
        </motion.button>
      </div>

      {/* Logout */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-4 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </motion.button>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 space-y-2">
          <TabButton tab="profile" label="Profile" icon={User} />
          <TabButton tab="tickets" label="My Tickets" icon={Ticket} />
          <TabButton tab="settings" label="Settings" icon={Settings} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-[#041E23] border border-[#0E464F] rounded-3xl p-6 md:p-8">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'tickets' && renderTickets()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-4 right-4 bg-[#24A0B5] text-white px-6 py-3 rounded-xl shadow-lg"
        >
          {notification.message}
        </motion.div>
      )}
    </div>
  );
};

export default ProfileScreen; 
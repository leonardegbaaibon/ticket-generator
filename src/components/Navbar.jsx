import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Bell, Search, User, LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationPanel from './ReusableComponents/NotificationPanel';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { getUnreadCount } = useNotifications();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-[#041E23] border-b border-[#0E464F] fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/events" className="flex items-center">
            <span className="text-2xl font-bold text-[#24A0B5]">Ticz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
              Events
            </Link>
            <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
              Categories
            </Link>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleNotifications}
                className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#0E464F] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {getUnreadCount() > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </motion.button>
              <div className="absolute right-0 pt-2">
                <NotificationPanel 
                  isOpen={isNotificationsOpen} 
                  onClose={() => setIsNotificationsOpen(false)} 
                />
              </div>
            </div>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfile}
                className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-[#0E464F] transition-colors"
              >
                <User className="w-5 h-5" />
              </motion.button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-[#041E23] border border-[#0E464F] shadow-xl overflow-hidden"
                  >
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#0E464F] hover:text-white transition-colors"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/tickets"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#0E464F] hover:text-white transition-colors"
                      >
                        My Tickets
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#0E464F] hover:text-red-300 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#0E464F]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/events"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#0E464F] transition-colors"
              >
                Events
              </Link>
              <Link
                to="/categories"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#0E464F] transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#0E464F] transition-colors"
              >
                Profile
              </Link>
              <Link
                to="/tickets"
                className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#0E464F] transition-colors"
              >
                My Tickets
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-[#0E464F] transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 
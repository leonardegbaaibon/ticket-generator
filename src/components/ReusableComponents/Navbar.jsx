import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Heart, User, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Events' },
    { path: '/my-tickets', icon: Ticket, label: 'My Tickets' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 bg-[#041E23] border-b border-[#0E464F] z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold text-[#24A0B5]"
            >
              TicketGen
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#24A0B5]'
                      : 'text-gray-400 hover:text-[#24A0B5]'
                  }`
                }
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.div>
              </NavLink>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-[#24A0B5] text-white text-sm font-medium"
            >
              Create Event
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

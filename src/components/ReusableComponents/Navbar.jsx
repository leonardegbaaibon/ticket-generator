import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ticket, User, Heart, Plus, LogOut, 
  Settings, ChevronDown, Bell, Home,
  Menu, X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import Logo from './Logo';
import NotificationPanel from './NotificationPanel';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { getUnreadCount } = useNotifications();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const navItems = [
    { path: '/events', icon: Home, label: 'Home' },
    { path: '/my-tickets', icon: Ticket, label: 'My Tickets' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative w-full max-w-7xl mx-auto px-4 py-4 mb-8">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div onClick={() => navigate('/events')} className="cursor-pointer">
            <Logo size="default" />
          </div>
          {navItems.map(({ path, icon: Icon, label }) => (
            <motion.button
              key={path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
                isActive(path)
                  ? 'bg-[#24A0B5] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-event')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#24A0B5] text-white hover:bg-teal-400 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleNotifications}
              className={`relative p-2 rounded-xl transition-colors ${
                isNotificationsOpen
                  ? 'bg-[#24A0B5] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bell className="w-5 h-5" />
              {getUnreadCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getUnreadCount()}
                </span>
              )}
            </motion.button>
            <NotificationPanel 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </div>

          <ProfileButton 
            user={user} 
            showProfileMenu={showProfileMenu}
            setShowProfileMenu={setShowProfileMenu}
            handleSignOut={handleSignOut}
            navigate={navigate}
            isActive={isActive}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-between items-center">
        <div onClick={() => navigate('/events')} className="cursor-pointer">
          <Logo size="small" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleNotifications}
              className={`relative p-2 rounded-xl transition-colors ${
                isNotificationsOpen
                  ? 'bg-[#24A0B5] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Bell className="w-5 h-5" />
              {getUnreadCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getUnreadCount()}
                </span>
              )}
            </motion.button>
            {/* Mobile Notification Panel */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed left-0 right-0 top-[4.5rem] mx-4 z-50"
                >
                  <NotificationPanel 
                    isOpen={isNotificationsOpen} 
                    onClose={() => setIsNotificationsOpen(false)} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full mt-2 mx-4 p-4 rounded-xl bg-[#041E23] border border-[#0E464F] shadow-xl z-50"
          >
            <div className="space-y-2">
              {navItems.map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-colors ${
                    isActive(path)
                      ? 'bg-[#24A0B5] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}

              <button
                onClick={() => handleNavigation('/create-event')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl bg-[#24A0B5] text-white"
              >
                <Plus className="w-5 h-5" />
                <span>Create Event</span>
              </button>

              <div className="border-t border-[#0E464F] my-2" />

              <button
                onClick={() => handleNavigation('/profile')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => handleNavigation('/profile?tab=settings')}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Extracted Profile Button Component
const ProfileButton = ({ user, showProfileMenu, setShowProfileMenu, handleSignOut, navigate, isActive }) => (
  <div className="relative">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowProfileMenu(!showProfileMenu)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
        isActive('/profile')
          ? 'bg-[#24A0B5] text-white'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#24A0B5] to-[#0E464F] flex items-center justify-center">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <span>{user?.name}</span>
      <ChevronDown className="w-4 h-4" />
    </motion.button>

    <AnimatePresence>
      {showProfileMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-48 rounded-xl bg-[#041E23] border border-[#0E464F] shadow-xl overflow-hidden z-50"
        >
          <div className="py-1">
            <button
              onClick={() => {
                navigate('/profile');
                setShowProfileMenu(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#0E464F] transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                navigate('/profile?tab=settings');
                setShowProfileMenu(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#0E464F] transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <div className="border-t border-[#0E464F] my-1" />
            <button
              onClick={() => {
                handleSignOut();
                setShowProfileMenu(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#0E464F] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default Navbar;

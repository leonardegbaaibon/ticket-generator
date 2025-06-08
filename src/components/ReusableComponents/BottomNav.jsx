import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Ticket, Heart, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#041E23] border-t border-[#0E464F] md:hidden z-50">
      <div className="flex justify-around items-center py-3 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/') ? 'text-[#24A0B5]' : 'text-gray-400'
          }`}
        >
          <Home size={20} />
          <span className="text-xs">Events</span>
        </Link>
        <Link
          to="/my-tickets"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/my-tickets') ? 'text-[#24A0B5]' : 'text-gray-400'
          }`}
        >
          <Ticket size={20} />
          <span className="text-xs">My Tickets</span>
        </Link>
        <Link
          to="/favorites"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/favorites') ? 'text-[#24A0B5]' : 'text-gray-400'
          }`}
        >
          <Heart size={20} />
          <span className="text-xs">Favorites</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center space-y-1 ${
            isActive('/profile') ? 'text-[#24A0B5]' : 'text-gray-400'
          }`}
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav; 
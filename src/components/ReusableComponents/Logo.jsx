import React from 'react';
import { Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <Link to="/" className="flex items-center space-x-2 text-white no-underline">
      <div className="relative">
        <Ticket className={`w-8 h-8 text-[#24A0B5] transform -rotate-12`} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#24A0B5] rounded-full" />
      </div>
      <span className={`font-bold ${sizeClasses[size]} bg-gradient-to-r from-[#24A0B5] to-teal-400 text-transparent bg-clip-text`}>
        Ticz
      </span>
    </Link>
  );
};

export default Logo; 
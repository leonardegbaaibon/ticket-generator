import React from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, Music, Utensils, Gamepad, Globe, 
  Sparkles, Zap, Headphones, Coffee, Joystick 
} from 'lucide-react';

const categories = [
  { 
    id: 'all', 
    name: 'All Events', 
    icon: Globe,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Explore all events'
  },
  { 
    id: 'tech', 
    name: 'Tech', 
    icon: Laptop,
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Tech conferences & workshops'
  },
  { 
    id: 'music', 
    name: 'Music', 
    icon: Headphones,
    gradient: 'from-green-400 to-teal-500',
    description: 'Live concerts & festivals'
  },
  { 
    id: 'food', 
    name: 'Food', 
    icon: Coffee,
    gradient: 'from-orange-400 to-pink-500',
    description: 'Food festivals & tastings'
  },
  { 
    id: 'gaming', 
    name: 'Gaming', 
    icon: Joystick,
    gradient: 'from-purple-500 to-indigo-500',
    description: 'Gaming events & tournaments'
  },
];

const CategoryGrid = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
      {categories.map(({ id, name, icon: Icon, gradient, description }) => (
        <motion.button
          key={id}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(id)}
          className={`relative group flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 overflow-hidden ${
            selectedCategory === id
              ? `bg-gradient-to-br ${gradient} border-transparent`
              : 'bg-[#041E23] border-[#0E464F] hover:border-transparent hover:bg-gradient-to-br hover:from-[#041E23] hover:to-[#0E464F]'
          }`}
        >
          {/* Animated background gradient */}
          <motion.div
            className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${gradient}`}
            initial={false}
            animate={selectedCategory === id ? { opacity: 0.2 } : { opacity: 0 }}
          />

          {/* Glowing effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${selectedCategory === id ? 'rgba(36, 160, 181, 0.15)' : 'rgba(36, 160, 181, 0.1)'}, transparent 70%)`
            }}
          />

          {/* Icon with sparkle effect */}
          <div className="relative mb-2 md:mb-3">
            <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${
              selectedCategory === id ? 'text-white' : 'text-[#24A0B5] group-hover:text-white'
            }`} />
            {selectedCategory === id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white" />
              </motion.div>
            )}
          </div>

          {/* Text content */}
          <span className={`text-xs sm:text-sm font-medium mb-0.5 sm:mb-1 ${
            selectedCategory === id ? 'text-white' : 'text-gray-300 group-hover:text-white'
          }`}>
            {name}
          </span>
          <span className={`text-[10px] sm:text-xs text-center hidden sm:block ${
            selectedCategory === id ? 'text-white/80' : 'text-gray-500 group-hover:text-white/80'
          }`}>
            {description}
          </span>

          {/* Active indicator */}
          {selectedCategory === id && (
            <motion.div
              layoutId="activeIndicator"
              className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white"
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryGrid; 
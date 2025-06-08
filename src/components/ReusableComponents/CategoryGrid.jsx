import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, Music, Utensils, Gamepad } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Events', icon: null },
  { id: 'tech', name: 'Tech', icon: Laptop },
  { id: 'music', name: 'Music', icon: Music },
  { id: 'food', name: 'Food', icon: Utensils },
  { id: 'gaming', name: 'Gaming', icon: Gamepad },
];

const CategoryGrid = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {categories.map(({ id, name, icon: Icon }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(id)}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border ${
            selectedCategory === id
              ? 'bg-[#24A0B5] border-[#24A0B5] text-white'
              : 'bg-[#041E23] border-[#0E464F] text-gray-400 hover:border-[#24A0B5]'
          }`}
        >
          {Icon && <Icon className="w-6 h-6 mb-2" />}
          <span className="text-sm font-medium">{name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryGrid; 
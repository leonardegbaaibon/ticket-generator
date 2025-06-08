import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, MapPin, DollarSign, 
  SlidersHorizontal, X, ChevronDown 
} from 'lucide-react';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    date: '',
    location: ''
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.date) count++;
    if (filters.location) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  };

  return (
    <div className="relative z-20">
      <div className="flex gap-2">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#041E23] border border-[#0E464F] rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 
                     focus:outline-none focus:border-[#24A0B5] transition-colors"
          />
        </div>

        {/* Filter Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            showFilters
              ? 'bg-[#24A0B5] border-[#24A0B5] text-white'
              : 'bg-[#041E23] border-[#0E464F] text-gray-300 hover:border-[#24A0B5]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {getActiveFiltersCount() > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#24A0B5] rounded-full text-xs flex items-center justify-center text-white">
              {getActiveFiltersCount()}
            </span>
          )}
        </motion.button>
      </div>

      {/* Filters Dropdown */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 p-4 bg-[#041E23] border border-[#0E464F] rounded-xl shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Date Filter */}
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 
                                   group-hover:text-[#24A0B5] transition-colors" />
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full bg-[#02191D] border border-[#0E464F] rounded-lg py-2 pl-9 pr-4 text-sm text-white 
                           focus:outline-none focus:border-[#24A0B5] transition-colors
                           group-hover:border-[#24A0B5]"
                />
                {filters.date && (
                  <button
                    onClick={() => handleFilterChange('date', '')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Location Filter */}
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 
                                 group-hover:text-[#24A0B5] transition-colors" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full bg-[#02191D] border border-[#0E464F] rounded-lg py-2 pl-9 pr-4 text-sm text-white 
                           placeholder-gray-400 focus:outline-none focus:border-[#24A0B5] transition-colors
                           group-hover:border-[#24A0B5]"
                />
                {filters.location && (
                  <button
                    onClick={() => handleFilterChange('location', '')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="relative group">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 
                                     group-hover:text-[#24A0B5] transition-colors" />
                <select
                  value={filters.priceRange.join('-')}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    handleFilterChange('priceRange', [min, max]);
                  }}
                  className="w-full appearance-none bg-[#02191D] border border-[#0E464F] rounded-lg py-2 pl-9 pr-8 text-sm text-white 
                           focus:outline-none focus:border-[#24A0B5] transition-colors
                           group-hover:border-[#24A0B5]"
                >
                  <option value="0-1000">All Prices</option>
                  <option value="0-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-500">$200 - $500</option>
                  <option value="500-1000">$500+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 
                                      group-hover:text-[#24A0B5] transition-colors pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters */}
            {getActiveFiltersCount() > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setFilters({
                    priceRange: [0, 1000],
                    date: '',
                    location: ''
                  });
                  onFilter({
                    priceRange: [0, 1000],
                    date: '',
                    location: ''
                  });
                }}
                className="mt-4 text-sm text-gray-400 hover:text-[#24A0B5] transition-colors"
              >
                Reset all filters
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAndFilter; 
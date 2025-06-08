import React, { useState } from 'react';
import { Search, Calendar, MapPin, DollarSign } from 'lucide-react';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
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

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-[#041E23] border border-[#0E464F] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#24A0B5]"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Filter */}
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full bg-[#041E23] border border-[#0E464F] rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#24A0B5]"
          />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full bg-[#041E23] border border-[#0E464F] rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#24A0B5]"
          />
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.priceRange.join('-')}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              handleFilterChange('priceRange', [min, max]);
            }}
            className="w-full bg-[#041E23] border border-[#0E464F] rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#24A0B5] appearance-none"
          >
            <option value="0-1000">All Prices</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500-1000">$500+</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter; 
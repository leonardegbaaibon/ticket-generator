import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, Users } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { events } from '../data/events';
import SearchAndFilter from '../components/ReusableComponents/SearchAndFilter';
import CategoryGrid from '../components/ReusableComponents/CategoryGrid';
import CountdownTimer from '../components/ReusableComponents/CountdownTimer';

const EventsScreen = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    date: '',
    location: '',
  });

  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    const filtered = events.filter(event => {
      // Search term filter
      const matchesSearch = 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

      // Price filter
      const lowestPrice = parseFloat(event.tickets[0].price.replace('$', ''));
      const matchesPrice = lowestPrice >= filters.priceRange[0] && lowestPrice <= filters.priceRange[1];

      // Date filter
      const matchesDate = !filters.date || new Date(event.date).toLocaleDateString() === new Date(filters.date).toLocaleDateString();

      // Location filter
      const matchesLocation = !filters.location || 
        event.venue.name.toLowerCase().includes(filters.location.toLowerCase()) ||
        event.venue.city.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesLocation;
    });

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, filters]);

  const getAvailabilityColor = (availability) => {
    const [available, total] = availability.split('/').map(Number);
    const percentage = (available / total) * 100;
    if (percentage <= 20) return 'text-red-500';
    if (percentage <= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Header and Search Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl text-white font-bold">
            Discover Events
          </h1>
          <p className="text-gray-400 mt-1">
            Find and book tickets for the best events in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="w-full md:w-[600px]">
          <SearchAndFilter
            onSearch={setSearchTerm}
            onFilter={setFilters}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl text-white font-bold mb-4">Categories</h2>
        <CategoryGrid
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            onClick={() => navigate(`/book/${event.id}`)}
            className="group bg-[#041E23] border-2 border-[#0E464F] hover:border-[#24A0B5] rounded-3xl overflow-hidden cursor-pointer relative"
          >
            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
              >
                <span className="text-xs font-medium text-white">
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </motion.div>
            </div>

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041E23] via-transparent to-transparent opacity-80" />
              
              {/* Favorite Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(event);
                }}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                  isFavorite(event.id)
                    ? 'bg-[#24A0B5]/80 text-white'
                    : 'bg-black/50 text-[#24A0B5] hover:bg-[#24A0B5]/20'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isFavorite(event.id) 
                      ? "fill-current scale-110" 
                      : "stroke-current group-hover:scale-110"
                  }`}
                />
              </motion.button>
            </div>

            <div className="p-6">
              {/* Title and Description */}
              <div className="mb-4">
                <h2 className="text-xl text-white font-bold mb-2 group-hover:text-[#24A0B5] transition-colors">
                  {event.name}
                </h2>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {event.description}
                </p>
              </div>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 group-hover:text-[#24A0B5]/80 transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center text-gray-300 group-hover:text-[#24A0B5]/80 transition-colors">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-300 group-hover:text-[#24A0B5]/80 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm truncate">
                    {event.venue.name}, {event.venue.city}
                  </span>
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mb-4">
                <CountdownTimer eventDate={event.date} />
              </div>

              {/* Ticket Types */}
              <div className="space-y-2 mb-4">
                {event.tickets.map((ticket, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-[#0E464F]/30 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-400">{ticket.type}</span>
                      <span className={`ml-2 text-xs ${getAvailabilityColor(ticket.availability)}`}>
                        ({ticket.availability} available)
                      </span>
                    </div>
                    <span className="text-white font-medium">{ticket.price}</span>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#0E464F]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 group-hover:text-[#24A0B5]/80 transition-colors">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm truncate max-w-[150px]">{event.organizer.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/book/${event.id}`);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-[#24A0B5] text-white text-sm font-medium
                             hover:bg-[#2DBAD3] transition-colors duration-300
                             shadow-lg shadow-[#24A0B5]/20"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0E464F]/30 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#24A0B5]" />
          </div>
          <h3 className="text-xl text-white font-medium mb-2">No Events Found</h3>
          <p className="text-gray-400">Try adjusting your filters to find more events</p>
        </motion.div>
      )}
    </div>
  );
};

export default EventsScreen; 
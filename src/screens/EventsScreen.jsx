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
  const { favorites, toggleFavorite } = useFavorites();
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
    <div className="min-h-screen bg-[#02191D] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
            Discover Events
          </h1>
          <p className="text-gray-400">
            Find and book tickets for the best events in your area
          </p>
        </div>

        {/* Search and Filters */}
        <SearchAndFilter
          onSearch={setSearchTerm}
          onFilter={setFilters}
        />

        {/* Categories */}
        <div className="py-4">
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
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/book/${event.id}`)}
              className="bg-[#041E23] border border-[#0E464F] rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041E23] to-transparent" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(event.id);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#041E23] bg-opacity-50 text-[#24A0B5]"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      favorites.includes(event.id) ? "fill-current" : "stroke-current"
                    }`}
                  />
                </motion.button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl text-white font-bold mb-2">{event.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {event.venue.name}, {event.venue.city}
                    </span>
                  </div>
                </div>

                <CountdownTimer eventDate={event.date} />

                <div className="mt-6 space-y-2">
                  {event.tickets.map((ticket, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex items-center">
                        <span className="text-gray-400">{ticket.type}</span>
                        <span className={`ml-2 text-xs ${getAvailabilityColor(ticket.availability)}`}>
                          ({ticket.availability} available)
                        </span>
                      </div>
                      <span className="text-white">{ticket.price}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#0E464F]">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.organizer.name}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/book/${event.id}`);
                      }}
                      className="px-4 py-1 rounded-lg bg-[#24A0B5] text-white text-sm"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsScreen; 
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, Users } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
          My Favorites
        </h1>
        <p className="text-gray-400">
          Your collection of favorite events
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((event) => (
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
                    toggleFavorite(event);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#041E23] bg-opacity-50 text-[#24A0B5]"
                >
                  <Heart className="w-6 h-6 fill-current" />
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
                      {event.venue?.name}, {event.venue?.city}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {event.tickets?.map((ticket, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-400">{ticket.type}</span>
                      <span className="text-white">{ticket.price}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/book/${event.id}`);
                  }}
                  className="w-full mt-6 px-4 py-2 rounded-xl bg-[#24A0B5] text-white text-sm hover:bg-teal-400 transition-colors"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#041E23] rounded-3xl border border-[#0E464F]">
          <Heart className="w-16 h-16 text-[#24A0B5] mx-auto mb-4" />
          <h2 className="text-xl text-white mb-2">No Favorites Yet</h2>
          <p className="text-gray-400 mb-6">
            Start adding events to your favorites to see them here
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#24A0B5] text-white rounded-xl hover:bg-teal-400 transition-colors"
          >
            Discover Events
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen; 
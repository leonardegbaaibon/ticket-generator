import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { events } from '../data/events';

const FavoritesScreen = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const favoriteEvents = events.filter(event => favorites.includes(event.id));

  return (
    <div className="min-h-screen bg-[#02191D] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
            Favorite Events
          </h1>
          <p className="text-gray-400">
            Your saved events collection
          </p>
        </div>

        {favoriteEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEvents.map((event) => (
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
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.button>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl text-white font-bold mb-2">{event.name}</h2>
                  <p className="text-gray-400 text-sm mb-4">{event.description}</p>

                  <div className="space-y-2">
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

                  <div className="mt-6 space-y-2">
                    {event.tickets.map((ticket, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-gray-400">{ticket.type}</span>
                        <span className="text-white">{ticket.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              You haven't saved any events yet
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl bg-[#24A0B5] text-white text-sm font-medium"
            >
              Browse Events
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesScreen; 
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const EventRecommendations = ({ currentEvent, events }) => {
  const navigate = useNavigate();

  // Filter similar events based on category and exclude current event
  const similarEvents = events
    .filter(
      (event) =>
        event.id !== currentEvent.id && event.category === currentEvent.category
    )
    .slice(0, 3); // Show only 3 recommendations

  return (
    <div className="space-y-4">
      <h3 className="text-xl text-white font-bold mb-6">Similar Events</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/book/${event.id}`)}
            className="bg-[#041E23] border border-[#0E464F] rounded-xl overflow-hidden cursor-pointer"
          >
            <div className="relative h-32">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041E23] to-transparent" />
            </div>

            <div className="p-4">
              <h4 className="text-white font-medium mb-2 line-clamp-1">
                {event.name}
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="line-clamp-1">{event.venue.name}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[#24A0B5] font-medium">
                  From {event.tickets[0].price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/book/${event.id}`);
                  }}
                  className="px-3 py-1 bg-[#24A0B5] text-white text-sm rounded-lg"
                >
                  View
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {similarEvents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No similar events found</p>
        </div>
      )}
    </div>
  );
};

export default EventRecommendations; 
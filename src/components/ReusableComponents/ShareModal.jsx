import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Facebook, Twitter, WhatsApp, Mail, Link2, QrCode } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, event, onGenerateQR }) => {
  const shareUrl = window.location.href;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank'),
      color: 'bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${event.name} at ${event.venue.name}!`)}`, '_blank'),
      color: 'bg-sky-500',
    },
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${event.name} at ${event.venue.name}! ${shareUrl}`)}`, '_blank'),
      color: 'bg-green-500',
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(`Check out ${event.name}`)}&body=${encodeURIComponent(`I thought you might be interested in ${event.name} at ${event.venue.name}!\n\n${shareUrl}`)}`, '_blank'),
      color: 'bg-red-500',
    },
    {
      name: 'Copy Link',
      icon: Link2,
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        // You would typically show a notification here
      },
      color: 'bg-gray-600',
    },
    {
      name: 'QR Code',
      icon: QrCode,
      action: onGenerateQR,
      color: 'bg-purple-600',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#041E23] border border-[#0E464F] rounded-3xl p-6 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Share2 className="w-5 h-5 text-[#24A0B5] mr-2" />
                <h2 className="text-xl text-white font-bold">Share Event</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-3 gap-4">
              {shareOptions.map((option) => (
                <motion.button
                  key={option.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={option.action}
                  className="flex flex-col items-center"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center mb-2`}>
                    <option.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm text-gray-400">{option.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Event Preview */}
            <div className="mt-6 p-4 bg-[#02191D] rounded-xl">
              <h3 className="text-white font-medium mb-2">{event.name}</h3>
              <p className="text-gray-400 text-sm">{event.venue.name}</p>
              <p className="text-gray-400 text-sm">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal; 
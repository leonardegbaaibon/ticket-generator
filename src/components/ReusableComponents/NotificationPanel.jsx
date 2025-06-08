import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Check, Ticket, CreditCard, 
  Tag, CheckCheck, Trash2 
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'event':
      return Ticket;
    case 'booking':
      return CreditCard;
    case 'price':
      return Tag;
    default:
      return Bell;
  }
};

const getTimeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
};

const NotificationPanel = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute right-0 mt-2 w-80 max-h-[32rem] rounded-xl bg-[#041E23] border border-[#0E464F] shadow-xl overflow-hidden z-50"
        >
          {/* Header */}
          <div className="p-4 border-b border-[#0E464F] flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#0E464F] transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllNotifications}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-[#0E464F] transition-colors"
                title="Clear all notifications"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#0E464F] transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[calc(32rem-4rem)]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-gray-400">
                <Bell className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-center">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#0E464F]">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  return (
                    <motion.div
                      key={notification.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`relative p-4 hover:bg-[#0E464F]/30 transition-colors ${
                        !notification.read ? 'bg-[#0E464F]/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-[#0E464F]/50 ${
                          !notification.read ? 'text-[#24A0B5]' : 'text-gray-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-400 mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {getTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 rounded-lg text-[#24A0B5] hover:bg-[#0E464F] transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeNotification(notification.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-[#0E464F] transition-colors"
                            title="Remove notification"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel; 
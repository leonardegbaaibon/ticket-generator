import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';

const EventReviews = ({ eventId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  // Mock reviews data - in a real app, this would come from an API
  const [reviews] = useState([
    {
      id: 1,
      user: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      rating: 5,
      comment: 'Amazing event! The atmosphere was electric and everything was well organized.',
      likes: 12,
      date: '2024-02-15',
    },
    {
      id: 2,
      user: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40',
      rating: 4,
      comment: 'Great experience overall. Would definitely recommend!',
      likes: 8,
      date: '2024-02-14',
    },
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Here you would typically send the review to your backend
    console.log({ eventId, rating, review });
    setRating(0);
    setReview('');
  };

  return (
    <div className="space-y-6">
      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="bg-[#041E23] border border-[#0E464F] rounded-xl p-4 space-y-4">
        <h3 className="text-white font-bold mb-4">Write a Review</h3>
        
        {/* Star Rating */}
        <div className="flex items-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoveredStar || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-400'
                }`}
              />
            </motion.button>
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience..."
          className="w-full bg-[#02191D] border border-[#0E464F] rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#24A0B5] min-h-[100px]"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!rating || !review.trim()}
          className="w-full py-3 bg-[#24A0B5] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Review
        </motion.button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#041E23] border border-[#0E464F] rounded-xl p-4"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.avatar}
                alt={review.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">{review.user}</h4>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mt-2">{review.comment}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center text-gray-400 hover:text-[#24A0B5]"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">{review.likes}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center text-gray-400 hover:text-[#24A0B5]"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Reply</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventReviews; 
export const eventCategories = [
  { id: 'tech', name: 'Technology', icon: '💻' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'food', name: 'Food & Drinks', icon: '🍷' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'arts', name: 'Arts & Culture', icon: '🎨' }
];

export const events = [
  {
    id: 1,
    name: "Tech Conference 2024",
    description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.",
    category: "tech",
    date: "2024-06-15",
    time: "09:00 AM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3",
    venue: {
      name: "Innovation Center",
      city: "San Francisco",
      address: "123 Tech Boulevard"
    },
    organizer: {
      name: "TechEvents Inc",
      contact: "organizer@techevents.com"
    },
    tickets: [
      {
        type: "Early Bird",
        price: "$299",
        availability: "50/200"
      },
      {
        type: "Regular",
        price: "$399",
        availability: "150/300"
      },
      {
        type: "VIP",
        price: "$699",
        availability: "25/50"
      }
    ]
  },
  {
    id: 2,
    name: "Summer Music Festival",
    description: "A three-day music extravaganza featuring top artists from around the world.",
    category: "music",
    date: "2024-07-20",
    time: "04:00 PM",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3",
    venue: {
      name: "Central Park Arena",
      city: "New York",
      address: "456 Festival Way"
    },
    organizer: {
      name: "Music Fest Productions",
      contact: "info@musicfest.com"
    },
    tickets: [
      {
        type: "Single Day",
        price: "$129",
        availability: "1000/5000"
      },
      {
        type: "Weekend Pass",
        price: "$299",
        availability: "500/2000"
      },
      {
        type: "VIP Weekend",
        price: "$599",
        availability: "100/300"
      }
    ]
  },
  {
    id: 3,
    name: "Food & Wine Expo",
    description: "Experience culinary excellence with tastings from top chefs and renowned wineries.",
    category: "food",
    date: "2024-08-10",
    time: "11:00 AM",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3",
    venue: {
      name: "Gourmet Hall",
      city: "Chicago",
      address: "789 Culinary Lane"
    },
    organizer: {
      name: "Taste Events",
      contact: "events@taste.com"
    },
    tickets: [
      {
        type: "General Admission",
        price: "$79",
        availability: "200/500"
      },
      {
        type: "Premium Tasting",
        price: "$149",
        availability: "100/200"
      },
      {
        type: "Chef's Table",
        price: "$299",
        availability: "20/40"
      }
    ]
  },
  {
    id: 4,
    name: "Gaming Championship",
    description: "The ultimate gaming tournament featuring competitive matches across multiple platforms.",
    category: "gaming",
    date: "2024-09-05",
    time: "10:00 AM",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3",
    venue: {
      name: "eSports Arena",
      city: "Los Angeles",
      address: "321 Gaming Street"
    },
    organizer: {
      name: "Pro Gaming League",
      contact: "tournaments@pgl.com"
    },
    tickets: [
      {
        type: "Spectator",
        price: "$49",
        availability: "300/1000"
      },
      {
        type: "Player Pass",
        price: "$99",
        availability: "150/300"
      },
      {
        type: "Premium Package",
        price: "$199",
        availability: "50/100"
      }
    ]
  }
]; 
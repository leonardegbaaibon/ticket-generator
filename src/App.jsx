import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import EventsScreen from './screens/EventsScreen';
import TicketBooking from './screens/TicketsBooking';
import MyTickets from './screens/MyTickets';
import FavoritesScreen from './screens/FavoritesScreen';
import BottomNav from './components/ReusableComponents/BottomNav';
import Navbar from './components/ReusableComponents/Navbar';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-[#02191D]">
          <Navbar />
          <div className="pt-16 pb-16 md:pb-0"> {/* Add padding for navbar */}
            <Routes>
              <Route path="/" element={<EventsScreen />} />
              <Route path="/book/:eventId" element={<TicketBooking />} />
              <Route path="/my-tickets" element={<MyTickets />} />
              <Route path="/favorites" element={<FavoritesScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import EventsScreen from './screens/EventsScreen';
import TicketsBooking from './screens/TicketsBooking';
import MyTickets from './screens/MyTickets';
import CreateEvent from './screens/CreateEvent';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { Navbar } from './components/ReusableComponents/Navbar';
import { TicketProvider } from './contexts/TicketContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to={location.state?.from?.pathname || '/events'} replace />;
  }

  return children;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <FavoritesProvider>
      <TicketProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-[#02191D] flex flex-col">
            {user && <Navbar />}
            <main className={`flex-1 ${!user ? 'p-0' : ''}`}>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <OnboardingScreen />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/onboarding"
                  element={
                    <PublicRoute>
                      <OnboardingScreen />
                    </PublicRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute>
                      <EventsScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/book/:eventId"
                  element={
                    <ProtectedRoute>
                      <TicketsBooking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-tickets"
                  element={
                    <ProtectedRoute>
                      <MyTickets />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-event"
                  element={
                    <ProtectedRoute>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <FavoritesScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileScreen />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </NotificationProvider>
      </TicketProvider>
    </FavoritesProvider>
  );
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

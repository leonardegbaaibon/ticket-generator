import React, { createContext, useContext, useState, useEffect } from 'react';
import { events } from '../data/events';

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};

export const TicketProvider = ({ children }) => {
  const [bookedTickets, setBookedTickets] = useState(() => {
    const savedTickets = localStorage.getItem('bookedTickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookedTickets', JSON.stringify(bookedTickets));
  }, [bookedTickets]);

  const bookTicket = (eventId, ticketDetails) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return null;

    const newTicket = {
      id: Date.now(),
      eventId,
      eventName: event.name,
      eventDescription: event.description,
      eventImage: event.image,
      category: event.category,
      ticketType: ticketDetails.ticketType,
      quantity: ticketDetails.quantity,
      price: ticketDetails.price,
      totalAmount: ticketDetails.totalAmount,
      purchaseDate: new Date().toISOString(),
      date: event.date,
      time: event.time,
      venue: event.venue,
      organizer: event.organizer,
      ticketNumber: `${event.category.toUpperCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventId}-${Date.now()}`,
      status: 'active',
      attendee: {
        name: ticketDetails.name,
        email: ticketDetails.email,
        phone: ticketDetails.phone
      }
    };

    setBookedTickets(prev => [...prev, newTicket]);
    return newTicket;
  };

  const cancelTicket = (ticketId) => {
    setBookedTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'cancelled' }
          : ticket
      )
    );
  };

  const getTicketById = (ticketId) => {
    return bookedTickets.find(ticket => ticket.id === ticketId);
  };

  return (
    <TicketContext.Provider value={{
      bookedTickets,
      bookTicket,
      cancelTicket,
      getTicketById
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContext; 
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(eventDate) - new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex justify-center space-x-4">
      {timeBlocks.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="bg-[#041E23] border border-[#0E464F] rounded-lg p-2 min-w-[60px] text-center">
            <span className="text-2xl font-bold text-[#24A0B5]">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-gray-400 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer; 
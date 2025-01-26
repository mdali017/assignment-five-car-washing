import React, { useState, useEffect } from "react";

type Booking = {
  id: string;
  guestName: string;
  roomNumber: string;
  checkInDate: string; // ISO format: "YYYY-MM-DDTHH:mm:ss"
};

type CountdownProps = {
  targetDate: Date;
};

const CountdownTimer: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft("Check-in time reached");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [targetDate]);

  return <span className="text-sm text-gray-600">{timeLeft}</span>;
};

const ServicesSlotCoundown: React.FC = () => {
  const bookings: Booking[] = [
    {
      id: "1",
      guestName: "John Doe",
      roomNumber: "101",
      checkInDate: "2025-02-01T14:00:00",
    },
    {
      id: "2",
      guestName: "Jane Smith",
      roomNumber: "202",
      checkInDate: "2025-02-02T10:00:00",
    },
    {
      id: "3",
      guestName: "Michael Brown",
      roomNumber: "303",
      checkInDate: "2025-02-03T16:00:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Service Slot Coundown
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {booking.guestName}
              </h3>
              <p className="text-gray-500">Room Number: {booking.roomNumber}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 text-sm">Check-in:</p>
              <CountdownTimer targetDate={new Date(booking.checkInDate)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSlotCoundown;

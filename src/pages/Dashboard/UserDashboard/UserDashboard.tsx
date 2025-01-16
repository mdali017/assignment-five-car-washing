import { useState, useEffect } from "react";

interface Booking {
  id: string;
  serviceName: string;
  date: string;
  startTime: string;
  endTime: string;
  isUpcoming: boolean;
}

const UserDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    // Mock Data: Replace with API fetch
    {
      id: "1",
      serviceName: "Spa Therapy",
      date: "2024-11-20",
      startTime: "10:00",
      endTime: "11:00",
      isUpcoming: true,
    },
    {
      id: "2",
      serviceName: "Haircut",
      date: "2024-11-15",
      startTime: "14:00",
      endTime: "14:30",
      isUpcoming: false,
    },
  ]);

  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    // Calculate countdown for the next upcoming booking
    const nextBooking = bookings.find((b) => b.isUpcoming);
    if (nextBooking) {
      const interval = setInterval(() => {
        const now = new Date();
        const bookingTime = new Date(
          `${nextBooking.date}T${nextBooking.startTime}`
        );
        const diff = bookingTime.getTime() - now.getTime();

        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft(null);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [bookings]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      {/* Profile Section */}
      {/* <div className="border p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Profile
        </button>
      </div> */}

      {/* Countdown Timer */}
      {/* {timeLeft && (
        <div className="bg-blue-100 border border-blue-300 p-4 rounded-md mb-6">
          <h2 className="text-lg font-semibold">
            Time Until Next Booking:{" "}
            <span className="text-blue-600 font-bold">{timeLeft}</span>
          </h2>
        </div>
      )} */}

      {/* Past Bookings */}
      {/* <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Past Bookings</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Service</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .filter((b) => !b.isUpcoming)
              .map((booking) => (
                <tr key={booking.id}>
                  <td className="border p-2">{booking.serviceName}</td>
                  <td className="border p-2">{booking.date}</td>
                  <td className="border p-2">
                    {booking.startTime} - {booking.endTime}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> */}

      {/* Upcoming Bookings */}
      {/* <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings
            .filter((b) => b.isUpcoming)
            .map((booking) => (
              <div
                key={booking.id}
                className="border p-4 rounded-md shadow-md bg-white"
              >
                <h3 className="text-lg font-bold">{booking.serviceName}</h3>
                <p className="text-gray-600">
                  {booking.date} | {booking.startTime} - {booking.endTime}
                </p>
                <p className="text-blue-500 font-semibold">
                  Countdown:{" "}
                  {timeLeft && booking.id === bookings[0].id ? timeLeft : "N/A"}
                </p>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default UserDashboard;

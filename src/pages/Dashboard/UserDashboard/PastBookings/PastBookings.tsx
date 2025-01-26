import React from "react";

interface Booking {
  id: number;
  name: string;
  roomType: string;
  roomNumber: number;
  checkInDate: string;
  checkOutDate: string;
  amountPaid: number;
}

const bookings: Booking[] = [
  {
    id: 1,
    name: "John Doe",
    roomType: "Deluxe",
    roomNumber: 101,
    checkInDate: "2025-01-20",
    checkOutDate: "2025-01-22",
    amountPaid: 200,
  },
  {
    id: 2,
    name: "Jane Smith",
    roomType: "Standard",
    roomNumber: 102,
    checkInDate: "2025-01-18",
    checkOutDate: "2025-01-19",
    amountPaid: 100,
  },
  {
    id: 3,
    name: "Alice Johnson",
    roomType: "Suite",
    roomNumber: 103,
    checkInDate: "2025-01-15",
    checkOutDate: "2025-01-17",
    amountPaid: 300,
  },
];

const PastBookings: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Past Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 shadow-lg">
          <thead className="text-xs uppercase bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Room Number</th>
              <th className="px-6 py-3">Check-In Date</th>
              <th className="px-6 py-3">Check-Out Date</th>
              <th className="px-6 py-3">Amount Paid</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-center font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 text-gray-800">{booking.name}</td>
                <td className="px-6 py-4 text-center text-gray-800">{booking.roomType}</td>
                <td className="px-6 py-4 text-center text-gray-800">{booking.roomNumber}</td>
                <td className="px-6 py-4 text-center text-gray-800">{booking.checkInDate}</td>
                <td className="px-6 py-4 text-center text-gray-800">{booking.checkOutDate}</td>
                <td className="px-6 py-4 text-right text-gray-800 font-semibold">${booking.amountPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastBookings;
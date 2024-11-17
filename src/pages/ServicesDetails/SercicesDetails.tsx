import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useGetSlotAvailabilityQuery } from "../../redux/api/api";

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

interface TimeSlot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const ServiceDetailsPage = () => {
  const { id } = useParams<{ id?: string }>(); // Allow `id` to be optional
  const serviceId = id || null; // Convert `undefined` to `null`
  
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const { data: dataavailableSlots = [], isLoading } = useGetSlotAvailabilityQuery({
    date: selectedDate,
    serviceId, // Pass the processed `serviceId` here
  });

  const serviceDetails: Service | null = dataavailableSlots?.data?.[0]?.service || null;
  const timeSlots: TimeSlot[] = dataavailableSlots?.data || [];

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (!slot.isBooked) {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = () => {
    if (selectedSlot) {
      alert(
        `Booking confirmed for ${selectedSlot.startTime} - ${selectedSlot.endTime} on ${selectedDate}`
      );
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {serviceDetails ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{serviceDetails.name}</h1>
          <p className="text-gray-700 mb-2">{serviceDetails.description}</p>
          <p className="text-gray-700 mb-2">
            Price: <span className="font-bold">${serviceDetails.price}</span>
          </p>
          <p className="text-gray-700 mb-6">
            Duration: {serviceDetails.duration} minutes
          </p>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="date"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={slot.isBooked}
                    className={`p-3 border rounded-md ${
                      slot.isBooked
                        ? "bg-gray-300 cursor-not-allowed"
                        : selectedSlot?._id === slot._id
                        ? "bg-blue-500 text-white"
                        : "bg-white hover:bg-blue-100"
                    }`}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-red-500 font-medium">No Time Slot Available</p>
            )}
          </div>

          {selectedSlot && (
            <div className="mt-6">
              <button
                onClick={handleBooking}
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
              >
                Book This Service
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading service details...</p>
      )}
    </div>
  );
};

export default ServiceDetailsPage;

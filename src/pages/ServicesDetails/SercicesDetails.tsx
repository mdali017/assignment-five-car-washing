import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const { id } = useParams<{ id?: string }>();
  const serviceId = id || null;
  const location = useLocation();
  const service = location.state as Service;
  // console.log(service)

  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showModal, setShowModal] = useState(false); // for confirmation modal

  const { data: dataavailableSlots = [], isLoading } =
    useGetSlotAvailabilityQuery({
      date: selectedDate,
      serviceId, // Pass the processed `serviceId` here
    });

  console.log(dataavailableSlots);
  const availableTimeSlots = dataavailableSlots?.data;

  const serviceDetails: Service | null = service || null;

  // console.log(serviceDetails)

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
    setShowModal(true); // Show the confirmation modal
  };

  const confirmBooking = () => {
    setShowModal(false);
    alert(
      `Booking confirmed for ${selectedSlot?.startTime} - ${selectedSlot?.endTime} on ${selectedDate}`
    );
  };

  const cancelBooking = () => {
    setShowModal(false); // Close modal without confirming
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 border border-pink-600">
      {serviceDetails ? (
        <>
          {/* Service Details Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              {serviceDetails.name}
            </h1>
            <p className="text-gray-800 text-lg mb-4 leading-relaxed">
              <span className="font-medium text-blue-500">Description:</span>{" "}
              {serviceDetails.description}
            </p>
            <div className="flex items-center justify-between text-gray-700 text-lg mb-4">
              <p>
                <span className="font-medium text-blue-500">Price:</span>{" "}
                <span className="text-xl font-bold text-green-600">
                  ${serviceDetails.price}
                </span>
              </p>
              <p>
                <span className="font-medium text-blue-500">Duration:</span>{" "}
                {serviceDetails.duration} minutes
              </p>
            </div>
          </div>

          {/* Date Picker */}
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Slots Section */}
          <div className="bg-gray-50 shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Available Time Slots
            </h2>
            {availableTimeSlots?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {availableTimeSlots?.map((slot: any) => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotSelect(slot)}
                    disabled={slot.isBooked}
                    className={`p-4 text-center border rounded-lg transition-all duration-300 
                      ${
                        slot.isBooked
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : selectedSlot?._id === slot._id
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-white text-gray-700 hover:bg-blue-100 hover:shadow-md"
                      }
                    `}
                  >
                    <p className="text-lg font-semibold">{slot.startTime}</p>
                    <p className="text-sm">{slot.endTime}</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-red-500 font-medium text-lg mt-4">
                No Time Slots Available
              </p>
            )}
          </div>

          {/* Booking Button */}
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

          {/* Confirmation Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg w-96">
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  Confirm Your Booking
                </h3>
                <p className="mb-6">
                  Are you sure you want to book {selectedSlot?.startTime} -{" "}
                  {selectedSlot?.endTime} on {selectedDate}?
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={cancelBooking}
                    className="w-1/2 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBooking}
                    className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
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

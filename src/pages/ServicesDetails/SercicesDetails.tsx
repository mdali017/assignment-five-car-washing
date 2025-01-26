import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useCreateBookingMutation,
  useGetServiceSlotAvailabilityQuery,
} from "../../redux/api/api";
import {
  Card,
  Form,
  Input,
  Button,
  Alert,
  Spin,
  Typography,
  Empty,
  message,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";

const { Title, Text, Paragraph } = Typography;

// Interfaces
interface Service {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  price: string;
}

interface TimeSlot {
  _id: string;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "blocked";
}

interface FormData {
  name: string;
  phone: string;
  email: string;
}

const ServicesDetailsPage: React.FC = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const service = location?.state?.service as Service;
  const [form] = Form.useForm();

  // States
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [createBooking] = useCreateBookingMutation();

  // Fetch service slots availability
  const {
    data: serviceSlotsResponse,
    isLoading: slotsLoading,
    isError: slotsError,
  } = useGetServiceSlotAvailabilityQuery({
    serviceId: service?._id,
    date: new Date().toISOString().split("T")[0],
  });

  const serviceSlots = serviceSlotsResponse?.data || [];

  // Handle payment
  const handlePayment = async (formData: FormData) => {
    if (!selectedSlot) {
      message.error("Please select a time slot");
      return;
    }

    const data = {
      ...formData,
      slot: selectedSlot._id,
      serviceI: service.price, // Pass actual price
    };

 const finalBooking =   {
      customer: data.name,
      serviceId: service._id,
      slotId: selectedSlot._id,
      vehicleType: "car",
      vehicleBrand: "Toyota",
      vehicleModel: "Camry",
      manufacturingYear: 2020,
      registrationPlate: "ABC123"
    }

    console.log(finalBooking);

    try {
      const response = await createBooking({
        finalBooking,
      }).unwrap();

      console.log(response);

      if (response.statusCode === 200) {
        Swal.fire("Success", "Booking successful!", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Booking failed", "error");
    }

    // try {
    //   setLoading(true);
    //   const response = await fetch("http://localhost:4000/create-payment-intent", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();

    //   if (result.url) {
    //     window.location.replace(result.url);
    //   } else {
    //     message.error("Failed to initialize payment");
    //   }
    // } catch (error) {
    //   console.error("Payment initialization error:", error);
    //   message.error("Payment failed");
    // } finally {
    //   setLoading(false);
    // }
  };

  // Save booking details
  // const saveBookingDetails = async (bookingData: any) => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/bookings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to save booking details");
  //     }
  //   } catch (err) {
  //     console.error("Error saving booking:", err);
  //     throw err;
  //   }
  // };

  // Handle loading and error states
  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Empty description="No service details available" />
      </div>
    );
  }

  if (slotsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  if (slotsError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert
          message="Error"
          description="Failed to load slot availability. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ background: "#f0f2f5", padding: "24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {/* Left Side: Service Details and Time Slots */}
          <Card>
            <Title level={2}>{service.name}</Title>
            <Paragraph>
              {service.description || "No description available."}
            </Paragraph>

            {/* Service Image */}
            <div style={{ marginBottom: 24 }}>
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.name}
                  style={{
                    width: "100%",
                    height: 300,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No image available"
                />
              )}
            </div>

            {/* Time Slots */}
            <Title level={4}>Select a Time Slot</Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {serviceSlots.map((slot: TimeSlot) => (
                <Button
                  key={slot._id}
                  type={selectedSlot?._id === slot._id ? "primary" : "default"}
                  disabled={slot.status !== "available"}
                  onClick={() => setSelectedSlot(slot)}
                  style={{ height: "auto", padding: "8px" }}
                >
                  <div>{slot.startTime}</div>
                  <small>to {slot.endTime}</small>
                </Button>
              ))}
            </div>

            {/* Price Information */}
            <Card style={{ marginTop: 24 }} bordered={false}>
              <Title level={5}>Service Price</Title>
              <Text style={{ fontSize: 24, color: "#1890ff" }}>
                {parseFloat(service.price).toLocaleString("en-BD", {
                  style: "currency",
                  currency: "BDT",
                })}
              </Text>
            </Card>
          </Card>

          {/* Right Side: Booking Form */}
          <Card>
            <Title level={2}>Complete Your Booking</Title>

            <Form form={form} layout="vertical" onFinish={handlePayment}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Enter your email address" />
              </Form.Item>

              <Form.Item label="Selected Time Slot">
                <Input
                  value={
                    selectedSlot
                      ? `${selectedSlot.startTime} - ${selectedSlot.endTime}`
                      : "No slot selected"
                  }
                  readOnly
                  style={{ background: "#f5f5f5" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!selectedSlot}
                  block
                  size="large"
                >
                  {`Pay ${parseFloat(service.price).toLocaleString("en-BD", {
                    style: "currency",
                    currency: "BDT",
                  })}`}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicesDetailsPage;

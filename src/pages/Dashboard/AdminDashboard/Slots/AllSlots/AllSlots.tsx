import React, { useState } from "react";
import { Typography, Table, Button } from "antd";
import { useGetAllSlotsQuery } from "../../../../../redux/api/api";
import SlotModal from "../../../../../components/common/SlotModal";

const { Title, Text } = Typography;

const AllSlots: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null); // To store the selected slot details

  const showModal = (slot: any) => {
    setSelectedSlot(slot);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    setSelectedSlot(null); // Clear the selected slot
  };

  const {
    data: allSlotsData,
    isLoading,
    isError,
  } = useGetAllSlotsQuery(undefined);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text type="danger">Failed to load slots</Text>;

  // Safely mapping data for the table
  const slotsData = allSlotsData?.data.reduce((result: any, slot: any) => {
    if (slot.service) {
      const existingService = result.find(
        (item: any) => item.serviceId === slot.service._id
      );
      if (existingService) {
        existingService.slots.push(slot); // Push the entire slot object
      } else {
        result.push({
          serviceId: slot.service._id,
          name: slot.service.name,
          slots: [slot], // Initialize slots with the entire object
        });
      }
    }
    return result;
  }, []);

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slots",
      dataIndex: "slots",
      key: "slots",
      render: (slots: any) => (
        <div className="grid grid-cols-6 gap-4">
          {slots.map((slot: any, index: number) => (
            <div key={index}>
              <Button
                onClick={() => showModal(slot)} // Pass the slot data to the modal
                type="primary"
              >
                {slot.startTime} - {slot.endTime}
              </Button>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={3} style={{ textAlign: "center", marginBottom: "8px" }}>
        All Slots
      </Title>
      <Text
        type="secondary"
        style={{ display: "block", textAlign: "center", marginBottom: "8px" }}
      >
        Manage your slots
      </Text>
      <Table
        columns={columns}
        dataSource={slotsData}
        rowKey="serviceId"
        pagination={{ pageSize: 5 }}
      />
      {/* Slot Modal */}
      {selectedSlot && (
        <SlotModal
          open={open}
          hideModal={hideModal}
          slot={selectedSlot}
          onUpdateStatus={function (
            _newStatus: "AVAILABLE" | "CANCELLED"
          ): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
};

export default AllSlots;

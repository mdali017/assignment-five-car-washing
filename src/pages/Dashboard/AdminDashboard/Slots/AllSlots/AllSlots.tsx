import React, { useState } from "react";
import { Typography, Table, Button } from "antd";
import { useGetAllSlotsQuery } from "../../../../../redux/api/api";
import SlotModal from "../../../../../components/common/SlotModal";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const AllSlots: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const showModal = (slot: any) => {
    setSelectedSlot(slot);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    setSelectedSlot(null);
  };

  const {
    data: allSlotsData,
    isLoading,
    isError,
    refetch: refetchSlots,
  } = useGetAllSlotsQuery(undefined);

  // console.log(allSlotsData);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text type="danger">Failed to load slots</Text>;

  const slotsData = allSlotsData?.data.reduce((result: any, slot: any) => {
    if (slot.service) {
      const existingService = result.find(
        (item: any) => item.serviceId === slot.service._id
      );
      if (existingService) {
        existingService.slots.push(slot);
      } else {
        result.push({
          serviceId: slot.service._id,
          name: slot.service.name,
          date: slot.date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          slots: [slot],
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Slots",
      dataIndex: "slots",
      key: "slots",
      render: (slots: any) => (
        <div className="grid grid-cols-4 gap-2">
          {slots.map((slot: any, index: number) => (
            <div key={index}>
              <Button
                onClick={() => showModal(slot)}
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

  // refetchSlots();


  return (
    <div>
      <div>
        <Title level={3} style={{ textAlign: "center", marginBottom: "8px" }}>
          All Slots
        </Title>
        <Text
          type="secondary"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Manage your slots
        </Text>
      </div>
      <div className="flex justify-end">
        <Link to={"/dashboard/create-slots"}>
          <button className="bg-violet-500 text-white px-4 py-2 rounded">
            Add Slots
          </button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={slotsData}
        rowKey="serviceId"
        pagination={{ pageSize: 5 }}
        className="border"
        style={{ width: "100%" }} // Ensure full-width table
      />
      {selectedSlot && (
        <SlotModal
          open={open}
          hideModal={hideModal}
          slot={selectedSlot}
          rrefetchSlots={refetchSlots}
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

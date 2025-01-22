import React, { useState, useEffect } from "react";
import { Modal, Tooltip, Select, message } from "antd";
// import { MdOutlineDeleteOutline } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
import { useUpdateSlotStatusMutation } from "../../redux/api/api";

const { Option } = Select;

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  status: "available" | "cencelled";
}

interface SlotModalProps {
  open: boolean;
  hideModal: () => void;
  slot: Slot;
  // refetchSlots: () => void;
  // onUpdateStatus: (newStatus: "available" | "cencelled") => void;
}

const SlotModal: React.FC<SlotModalProps> = ({
  open,
  hideModal,
  slot,
  // refetchSlots,
  // onUpdateStatus,
}) => {
  const [updateSlotStatus, { isLoading }] = useUpdateSlotStatusMutation();
  const [currentStatus, setCurrentStatus] = useState<"available" | "cencelled">(
    slot.status
  );

  // Update local state when slot prop changes
  useEffect(() => {
    setCurrentStatus(slot.status);
  }, [slot.status]);

  const handleStatusChange = async (value: "available" | "cencelled") => {
    if (slot.isBooked) {
      message.warning("You cannot update the status of a booked slot.");
      return;
    }

   await updateSlotStatus({
      id: slot._id,
      data: { status: value },
    }).unwrap();
    // console.log(response);
    setCurrentStatus(value);
    message.success(`Slot status updated to ${value}`);
  };

  return (
    <Modal
      title={`Slot Details: ${slot.startTime} - ${slot.endTime}`}
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      okText="Close"
      cancelText="Cancel"
    >
      <div className="flex flex-col space-y-4">
        <div>
          <p>
            <strong>Date:</strong> {slot.date}
          </p>
          <p>
            <strong>Start Time:</strong> {slot.startTime}
          </p>
          <p>
            <strong>End Time:</strong> {slot.endTime}
          </p>
          <p>
            <strong>Status:</strong> {currentStatus}
          </p>
          <p>
            <strong>Is Booked:</strong> {slot.isBooked ? "Yes" : "No"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <p>
              <strong className="whitespace-nowrap text-[14px]">
                Change Status:
              </strong>
            </p>
            <Tooltip
              title={
                slot.isBooked
                  ? "Cannot change status of a booked slot."
                  : "Select status from the dropdown."
              }
            >
              <Select
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={slot.isBooked || isLoading}
                className="w-full"
              >
                <Option value="available">available</Option>
                <Option value="cencelled">cencelled</Option>
              </Select>
            </Tooltip>
          </div>

          {/* <div className="flex items-center space-x-2">
            <Tooltip title="Delete Slot">
              <button
                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition duration-200"
                title="Delete"
                disabled={slot.isBooked}
              >
                <MdOutlineDeleteOutline size={20} />
              </button>
            </Tooltip>
            <Tooltip
              title={slot.isBooked ? "Cannot edit a booked slot." : "Edit Slot"}
            >
              <button
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                title="Edit"
                disabled={slot.isBooked}
              >
                <FaEdit size={20} />
              </button>
            </Tooltip>
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default SlotModal;

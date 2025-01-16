import React from "react";
import { Modal, Tooltip, Switch, message } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Slot {
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  status: "AVAILABLE" | "CANCELLED";
}

interface SlotModalProps {
  open: boolean;
  hideModal: () => void;
  slot: Slot;
  onUpdateStatus: (newStatus: "AVAILABLE" | "CANCELLED") => void;
}

const SlotModal: React.FC<SlotModalProps> = ({
  open,
  hideModal,
  slot,
  onUpdateStatus,
}) => {
  const handleStatusToggle = () => {
    if (slot.isBooked) {
      message.warning("You cannot update the status of a booked slot.");
      return;
    }
    const newStatus = slot.status === "AVAILABLE" ? "CANCELLED" : "AVAILABLE";
    onUpdateStatus(newStatus);
    message.success(`Slot status updated to ${newStatus}`);
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
        {/* Slot Information */}
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
            <strong>Status:</strong> {slot.status}
          </p>
          <p>
            <strong>Is Booked:</strong> {slot.isBooked ? "Yes" : "No"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {/* Status Toggle */}
          <div>
            <p>
              <strong>Toggle Status:</strong>
            </p>
            <Tooltip
              title={
                slot.isBooked
                  ? "Cannot change status of a booked slot."
                  : "Toggle between AVAILABLE and CANCELLED."
              }
            >
              <Switch
                checked={slot.status === "AVAILABLE"}
                onChange={handleStatusToggle}
                disabled={slot.isBooked}
              />
            </Tooltip>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="flex items-center space-x-2">
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SlotModal;

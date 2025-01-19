import React, { useState } from "react";
import { Modal, Input, Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateServicesMutation } from "../../redux/api/api";
import Swal from "sweetalert2";

interface AddServicesModalProps {
  open: boolean;
  hideModal: () => void;
  refetchServices: () => void;
}

const AddServicesModal: React.FC<AddServicesModalProps> = ({
  open,
  hideModal,
  refetchServices
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [createServices, { isLoading }] = useCreateServicesMutation();

  // Handle file change
  const handleFileChange = (info: any) => {
    const uploadedFile = info.file || null;
    setFile(uploadedFile);
    if (uploadedFile) {
      const preview = URL.createObjectURL(uploadedFile);
      setPreviewUrl(preview); // Generate preview URL for the image
    } else {
      setPreviewUrl(null);
    }
  };

  // Form submit handler
  const handleFormSubmit = async (values: {
    name: string;
    description: string;
    price: number;
    duration: string;
  }) => {
    if (!file) {
      message.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(values)); // Append the form data as stringified JSON
    formData.append("file", file); // Append the file

    try {
      const response = await createServices({
        data: formData,
        token: "your_auth_token",
      }).unwrap();
    //   console.log("Service created successfully:", response);
      if (response.statusCode === 200) {
        Swal.fire("Success", "Service created successfully!", "success");
        refetchServices()
      }
      //   message.success("Service created successfully!");
      hideModal();
    } catch (error) {
      message.error("Error creating service.");
    }
  };

  return (
    <Modal
      title="Create Service"
      open={open}
      onCancel={hideModal}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        className="grid grid-cols-1 gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {/* Service Name */}
          <Form.Item
            label="Service Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>

          {/* Duration */}
          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[
              { required: true, message: "Please enter the duration" },
              {
                type: "number",
                min: 0,
                message: "Duration must be a positive number",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input type="number" placeholder="Enter duration in minutes" />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the service description" },
          ]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter the price" },
              {
                type: "number",
                min: 0,
                message: "Price must be a positive number",
                transform: (value) => Number(value),
              },
            ]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          {/* File Upload */}
          <Form.Item label="Upload Image">
            <Upload
              beforeUpload={() => false}
              onChange={handleFileChange}
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-40 object-cover border rounded"
                />
              </div>
            )}
          </Form.Item>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {/* <Button onClick={hideModal}>Cancel</Button> */}
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddServicesModal;

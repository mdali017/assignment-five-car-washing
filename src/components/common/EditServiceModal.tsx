import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Button,  message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { useUpdateServiceMutation } from "../../redux/api/api";

interface EditServicesModalProps {
  open: boolean;
  hideModal: () => void;
  refetchServices: () => void;
  defaultValues: any;
}

const EditServiceModal: React.FC<EditServicesModalProps> = ({
  open,
  hideModal,
  refetchServices,
  defaultValues,
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue({
        name: defaultValues.name,
        description: defaultValues.description || "",
        price: defaultValues.price,
        duration: defaultValues.duration,
      });
      // Set the preview URL to the existing image
      // setPreviewUrl(defaultValues.image || null);
      // Reset file state when modal opens with new values
      setFile(null);
    }
  }, [defaultValues, form]);

  // const handleFileChange = (info: any) => {
  //   if (info.file) {
  //     setFile(info.file.originFileObj);
  //     // Create preview URL for the new file
  //     const preview = URL.createObjectURL(info.file.originFileObj);
  //     setPreviewUrl(preview);
  //   }
  // };

  const handleFormSubmit = async (values: {
    name: string;
    description: string;
    price: number;
    duration: string;
  }) => {
    try {
      const formData = new FormData();
      
      // Create data object with all form values
      const dataToSend = {
        name: values.name,
        description: values.description || "",
        price: values.price,
        duration: values.duration,
        // Include the existing image if no new file is uploaded
        image: defaultValues.image || ""
      };

      // Add stringified data to FormData
      formData.append("data", JSON.stringify(dataToSend));

      // Add file if a new one is selected
      if (file) {
        formData.append("file", file);
      }

      // Call the update service
      const response = await updateService({
        id: defaultValues.key,
        data: formData
      }).unwrap();

      if (response) {
        message.success("Service updated successfully!");
        refetchServices();
        hideModal();
        // Reset states
        setFile(null);
        // setPreviewUrl(null);
        form.resetFields();
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update service. Please try again.");
    }
  };

  return (
    <Modal 
      title="Edit Service" 
      open={open} 
      onCancel={hideModal} 
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        className="grid grid-cols-1 gap-4"
      >
        <Form.Item
          name="name"
          label="Service Name"
          rules={[{ required: true, message: "Please enter the service name" }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea rows={4} placeholder="Enter service description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the service price" },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter service price"
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[
            { required: true, message: "Please enter the service duration" },
          ]}
        >
          <Input placeholder="Enter service duration (e.g., 30 minutes)" />
        </Form.Item>

        {/* <Form.Item label="Service Image">
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Service"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                  <UploadOutlined className="text-white text-2xl" />
                </div>
              </div>
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item> */}

        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isLoading} 
            block
          >
            Update Service
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditServiceModal;
import React from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { useCreateServicesMutation } from "../../../../../redux/api/api";

const { Title, Text } = Typography;

const ProfileForm: React.FC = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  const [createServices, { isLoading }] = useCreateServicesMutation();

  const handleSubmit = (values: any) => {
    console.log("Form Submitted: ", values);
    // Mapping the form values to match the req.body format
    const formattedValues = {
      name: values.name,
      description: values.description,
      price: values.price,
      duration: values.duration,
      isDeleted: false, // Set isDeleted to false as per your request body
    };
    // Passing the token in the second argument to the mutation
    createServices({ data: formattedValues, token: `Bearer ${token}` });
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Profile
      </Title>
      <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
        Adipisci fuga autem eum!
      </Text>
      <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: "24px" }}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Service Name"
              name="name"
              rules={[
                { required: true, message: "Service Name is required" },
                { min: 3, message: "Service Name must be at least 3 characters" },
              ]}
            >
              <Input placeholder="Enter Service Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Duration (minutes)"
              name="duration"
              rules={[
                // { required: true, message: "Duration is required" },
                // { type: "number", message: "Duration must be a number" },
              ]}
            >
              <Input placeholder="Enter Service Duration" type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                // { required: true, message: "Price is required" },
                // { type: "number", message: "Price must be a number" },
              ]}
            >
              <Input placeholder="Enter Service Price" type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Description is required" },
                { max: 200, message: "Description cannot exceed 200 characters" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Service Description" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={isLoading} // Show loading state while the request is in progress
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileForm;

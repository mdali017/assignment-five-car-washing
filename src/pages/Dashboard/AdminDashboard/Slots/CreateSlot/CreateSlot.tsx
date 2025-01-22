import React from "react";
import {
  Form,
  Button,
  Typography,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {
  useCreateServiceSlotMutation,
  useGetAllServicesQuery,
} from "../../../../../redux/api/api";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const CreateSlot: React.FC = () => {
  const { data: AllServicesData = [] } = useGetAllServicesQuery(undefined);
  const token = localStorage.getItem("token");
  const [createServiceSlot, { isLoading }] = useCreateServiceSlotMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      serviceId: values.serviceId,
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    };

    try {
      const response = await createServiceSlot({
        data: formattedValues,
        token: `Bearer ${token}`,
      }).unwrap();
      if (response.statusCode === 200) {
        Swal.fire("Success", "Slot created successfully!", "success");
      }
      navigate("/dashboard/all-slots");
    } catch (err) {
      Swal.fire("Error", "Failed to create slot", "error");
    }
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
        Create Slot
      </Title>
      <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
        Provide the details to create a new slot.
      </Text>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: "24px" }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Service"
              name="serviceId"
              rules={[{ required: true, message: "Service is required" }]}
            >
              <Select
                showSearch
                placeholder="Select a service"
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={AllServicesData?.data?.map((service: any) => ({
                  value: service._id,
                  label: service.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Date is required" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select Date"
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[{ required: true, message: "Start Time is required" }]}
            >
              <TimePicker
                style={{ width: "100%" }}
                placeholder="Select Start Time"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                { required: true, message: "End Time is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      value.isAfter(getFieldValue("startTime"), "minute")
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("End Time must be after Start Time")
                    );
                  },
                }),
              ]}
            >
              <TimePicker
                style={{ width: "100%" }}
                placeholder="Select End Time"
                format="HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateSlot;

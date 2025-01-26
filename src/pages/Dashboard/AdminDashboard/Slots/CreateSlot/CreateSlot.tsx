import React from "react";
import {
  Form,
  Button,
  Typography,
  DatePicker,
  TimePicker,
  Select,
  InputNumber,
  Card,
} from "antd";
import { ClockCircleOutlined, AppstoreOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import {
  useCreateServiceSlotMutation,
  useGetAllServicesQuery,
} from "../../../../../redux/api/api";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const CreateSlot: React.FC = () => {
  const { data: AllServicesData = [] } = useGetAllServicesQuery(undefined);
  const token = localStorage.getItem("token");
  const [createServiceSlot, { isLoading }] = useCreateServiceSlotMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      serviceId: values.serviceId,
      startDate: values.dateRange[0].format("YYYY-MM-DD"),
      endDate: values.dateRange[1].format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
      serviceDuration: values.serviceDuration
    };

    try {
      const response = await createServiceSlot({
        data: formattedValues,
        token: `Bearer ${token}`,
      }).unwrap();
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Slots have been created successfully',
          confirmButtonColor: '#1890ff'
        });
        navigate("/dashboard/all-slots");
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to create slots',
        confirmButtonColor: '#1890ff'
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title 
        level={2} 
        style={{ 
          textAlign: 'center',
          marginBottom: '40px',
          background: 'linear-gradient(120deg, #1890ff, #52c41a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Create Service Slots
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ serviceDuration: 60 }}
      >
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Left Card */}
          <Card
            className="shadow-lg"
            style={{
              borderRadius: '16px',
              border: 'none',
              height: '100%'
            }}
          >
            <div className="flex items-center mb-6">
              <AppstoreOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }}/>
              <Title level={4} style={{ margin: 0 }}>Service Details</Title>
            </div>

            <Form.Item
              label="Select Service"
              name="serviceId"
              rules={[{ required: true, message: "Please select a service" }]}
            >
              <Select
                showSearch
                size="large"
                placeholder="Choose a service"
                filterOption={(input, option: any) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={AllServicesData?.data?.map((service: any) => ({
                  value: service._id,
                  label: service.name,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Select Date Range"
              name="dateRange"
              rules={[{ required: true, message: "Please select date range" }]}
            >
              <RangePicker
                size="large"
                style={{ width: "100%" }}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
              />
            </Form.Item>

            <Form.Item
              label="Duration (minutes)"
              name="serviceDuration"
              rules={[{ required: true, message: "Duration is required" }]}
            >
              <InputNumber
                size="large"
                style={{ width: "100%" }}
                min={15}
                max={480}
                step={15}
              />
            </Form.Item>
          </Card>

          {/* Right Card */}
          <Card
            className="shadow-lg"
            style={{
              borderRadius: '16px',
              border: 'none',
              height: '100%'
            }}
          >
            <div className="flex items-center mb-6">
              <ClockCircleOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }}/>
              <Title level={4} style={{ margin: 0 }}>Time Settings</Title>
            </div>

            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[{ required: true, message: "Start time is required" }]}
            >
              <TimePicker size="large" style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>

            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                { required: true, message: "End time is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value.isAfter(getFieldValue("startTime"), "minute")) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("End time must be after start time"));
                  },
                }),
              ]}
            >
              <TimePicker size="large" style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>

            <Form.Item style={{ marginTop: '40px' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  background: "linear-gradient(120deg, #1890ff, #52c41a)",
                  border: "none",
                }}
              >
                Create Slots
              </Button>
            </Form.Item>
          </Card>
        </div>
      </Form>
    </div>
  );
};

export default CreateSlot;
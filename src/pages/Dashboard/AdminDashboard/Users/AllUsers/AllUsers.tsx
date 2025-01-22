import React, { useState, useEffect } from "react";
import { useGetAllUserQuery } from "../../../../../redux/api/api";
import { Table, Select, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const AllUsers: React.FC = () => {
  const { data: allUsersData = {}, isLoading } = useGetAllUserQuery(undefined);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Ensure we update the users state correctly when data is fetched
    if (allUsersData?.data) {
      setUsers(allUsersData.data);
    }
  }, [allUsersData]);

  // Handle role change
  const handleRoleChange = (userId: string, newRole: string) => {
    // Update the user role locally (you can send a request to update it in the backend)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );

    // Optionally, send an update request to your backend here
    // updateUserRole(userId, newRole);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_text: any, record: any) => `${record.name.firstName} ${record.name.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_text: any, record: any) => (
        <Select
          value={record.role}
          onChange={(value) => handleRoleChange(record._id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: any) => (
        <Space size="middle">
          <Button icon={<UserOutlined />} onClick={() => console.log(`Editing user ${record._id}`)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
        pagination={false}
      />
    </div>
  );
};

export default AllUsers;

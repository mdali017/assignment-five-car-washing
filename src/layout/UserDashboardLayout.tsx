import React from "react";
import {
  DashboardOutlined,
  LaptopOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// Sidebar items array with children
const sidebaritems = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard/user",
    icon: <DashboardOutlined />,
  },
  {
    id: 2,
    name: "Past Bookings",
    path: "/dashboard/user/past-bookings",
    icon: <LaptopOutlined />,
  },
  {
    id: 3,
    name: "Upcoming Bookings",
    path: "/dashboard/user/upcoming-booking",
    icon: <NotificationOutlined />,
  },

  {
    id: 4,
    name: "Service Slot Coundown",
    path: "/dashboard/user/service-slot-coundown",
    icon: <NotificationOutlined />,
  },
];

// Generate menu items from sidebaritems with children
const sidebarMenuItems: MenuProps["items"] = sidebaritems.map((item: any) => ({
  key: item.path, // Use path as key
  icon: item.icon,
  label: <Link to={item.path}>{item.name}</Link>, // Use Link for navigation
  children: item.children?.map((child: any) => ({
    key: child.path,
    label: <Link to={child.path}>{child.name}</Link>, // Use Link for child items
  })),
}));

const UserDashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Dropdown menu for avatar
  const userMenu: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["/dashboard"]}
          items={[
            { key: "/dashboard", label: "Home" },
            { key: "/about", label: "About" },
            { key: "/contact", label: "Contact" },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div className="flex items-center gap-4">
          <Dropdown menu={{ items: userMenu }} trigger={["click"]}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#1890ff" }}
            />
          </Dropdown>
          <div className="text-white flex flex-col">
            <p className="font-semibold text-sm border-b border-gray-500 pb-1">
              Md. Ali Hasan
            </p>
            <p className="text-xs text-gray-300">User</p>
          </div>
        </div>
      </Header>
      <Content className="min-h-[80vh]" style={{ padding: "0 " }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["/dashboard"]}
              defaultOpenKeys={["/settings"]}
              style={{ height: "100%" }}
              items={sidebarMenuItems}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Magnetic Codes ©{new Date().getFullYear()} Created by Mohabbat
      </Footer>
    </Layout>
  );
};

export default UserDashboardLayout;

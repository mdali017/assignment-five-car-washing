import React from "react";
import {
  DashboardOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

// Sidebar items array with children
const sidebaritems = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlined />,
  },
  {
    id: 2,
    name: "Services",
    path: "/dashboard/all-services",
    icon: <LaptopOutlined />,
    children: [
      {
        id: 21,
        name: "Create Service",
        path: "/dashboard/create-services",
      },
      {
        id: 22,
        name: "All Services",
        path: "/dashboard/all-services",
      },
    ],
  },
  {
    id: 3,
    name: "Slot ",
    path: "/dashboard/all-slots",
    icon: <NotificationOutlined />,
    children: [
      {
        id: 31,
        name: "Create Slot",
        path: "/dashboard/create-slots",
      },
      {
        id: 32,
        name: "All Slots",
        path: "/dashboard/all-slots",
      },
    ],
  },
  {
    id: 4,
    name: "Bookings",
    path: "/notifications",
    icon: <NotificationOutlined />,
    children: [
      {
        id: 31,
        name: "Messages",
        path: "/notifications/messages",
      },
      {
        id: 32,
        name: "Alerts",
        path: "/notifications/alerts",
      },
    ],
  },
  {
    id: 4,
    name: "Users",
    path: "/users",
    icon: <NotificationOutlined />,
    children: [
      {
        id: 31,
        name: "Create User",
        path: "/users/create-user",
      },
      {
        id: 32,
        name: "All Users",
        path: "/users/all-users",
      },
    ],
  },
];

// Generate menu items from sidebaritems with children
const sidebarMenuItems: MenuProps["items"] = sidebaritems.map((item) => ({
  key: item.path, // Use path as key
  icon: item.icon,
  label: <Link to={item.path}>{item.name}</Link>, // Use Link for navigation
  children: item.children?.map((child) => ({
    key: child.path,
    label: <Link to={child.path}>{child.name}</Link>, // Use Link for child items
  })),
}));

const DashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      </Header>
      <Content className="min-h-[80vh]" style={{ padding: "0 48px" }}>
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
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default DashboardLayout;

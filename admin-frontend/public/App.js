import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserOutlined, ShoppingCartOutlined, ProfileOutlined } from "@ant-design/icons";
import Registrations from "./Registrations";
import Orders from "./Orders";
import AdminProfile from "./AdminProfile"; // New Profile Component

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/registrations">Registrations</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
              <Link to="/orders">Orders</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ProfileOutlined />}>
              <Link to="/admin-profile">Profile</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

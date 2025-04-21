import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Tag, Typography } from "antd";

const { Title } = Typography;

const AdminProfile = () => {
  const [previousRegistrations, setPreviousRegistrations] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    fetchPreviousData();
  }, []);

  const fetchPreviousData = async () => {
    try {
      const registrationsResponse = await axios.get("http://localhost:5000/farmer-registrations");
      const ordersResponse = await axios.get("http://localhost:5000/farmers-records");

      // Filter only approved/rejected data
      setPreviousRegistrations(registrationsResponse.data.filter(item => item.status !== "pending"));
      setPreviousOrders(ordersResponse.data.filter(item => item.status !== "pending"));
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  return (
    <div>
      <Title level={2}>Admin Profile</Title>

      <Card title="Previous Registrations" style={{ marginBottom: 20 }}>
        <List
          dataSource={previousRegistrations}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.farmerName}
                description={`Email: ${item.email} | Phone: ${item.phone}`}
              />
              <Tag color={item.status === "approved" ? "green" : "red"}>{item.status.toUpperCase()}</Tag>
            </List.Item>
          )}
        />
      </Card>

      <Card title="Previous Orders">
        <List
          dataSource={previousOrders}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.farmerName} - ${item.product}`}
                description={`Quantity: ${item.quantity} | Price: $${item.price}`}
              />
              <Tag color={item.status === "approved" ? "green" : "red"}>{item.status.toUpperCase()}</Tag>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default AdminProfile;

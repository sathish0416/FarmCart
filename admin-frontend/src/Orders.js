import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Progress, Spin } from "antd";
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined, 
  ShoppingCartOutlined 
} from "@ant-design/icons";
import useAdminActions from "./hooks/useAdminApi";

const Orders = () => {
  const { fetchOrders, updateOrderStatus,loading } = useAdminActions();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false); // Loader for fetching orders
  const [loadingId, setLoadingId] = useState(null); // Track the button loading state

  const getOrders = async () => {
    setLoadingId(false);
    setLoadingOrders(true);
    try {
      const fetchedOrders = await fetchOrders();
      
      setOrders(
        fetchedOrders.map((order) => ({
          ...order,
          status: order.status || "Processing",
        }))
        
      );
      console.log("OK completed");
      setLoadingOrders(false);

    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setLoadingId(orderId); // Set loading state for the specific order
    try {
      console.log(orderId);

      await updateOrderStatus(orderId, newStatus);
      await getOrders(); // Refresh order list after update
      console.log("fetch completed");
      setLoadingId(null); // Reset loading state

    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setLoadingId(null); // Reset loading state
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case "Confirmed": return 33;
      case "Shipped": return 66;
      case "Delivered": return 100;
      case "Cancelled": return 0;
      case "Processing": return 20;
      default: return 0;
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "id" },
    { 
      title: "Customer", 
      key: "farmer", 
      render: (_, record) => record.customer ? record.customer.name : "N/A" 
    },
    { title: "Product", dataIndex: "product", key: "product" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Confirmed" ? "green" : status === "Cancelled" ? "red" : "gold";
        return (
          <div>
            <Tag color={color}>{status}</Tag>
            <Progress 
              percent={getProgressPercentage(status)} 
              status={status === "Delivered" ? "success" : "active"} 
            />
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            disabled={["Confirmed", "Shipped", "Delivered","Cancelled"].includes(record.status)}
            onClick={() => handleUpdateStatus(record.id, "Confirmed")}
            loading={loadingId === record.id} // Show loader while updating
          >
            Accept
          </Button>
          <Button
            type={record.status === "Confirmed" ? "primary" : "default"}
            icon={<ShoppingCartOutlined />}
            disabled={["Shipped","Delivered","Cancelled"].includes(record.status)}
            onClick={() => handleUpdateStatus(record.id, "Shipped")}
            loading={loadingId === record.id}
          >
            Ship
          </Button>
          <Button
            type={record.status === "Shipped" ? "primary" : "default"}
            icon={<ClockCircleOutlined />}
            disabled={["Delivered", "Cancelled"].includes(record.status)}
            onClick={() => handleUpdateStatus(record.id, "Delivered")}
            loading={loadingId === record.id}
          >
            Deliver
          </Button>
          <Button
            type={!["Delivered","Cancelled"].includes(record.status)?"danger":"default"}
            icon={<CloseCircleOutlined />}
            disabled={["Delivered","Cancelled"].includes(record.status)}
            onClick={() => handleUpdateStatus(record.id, "Cancelled")}
            loading={loadingId === record.id}
          >
            Cancel
          </Button><Button
  type="primary" // Ensures the button has a proper style
  danger={!["Delivered", "Cancelled"].includes(record.status)} // Makes it red
  icon={<CloseCircleOutlined />}
  disabled={["Delivered", "Cancelled"].includes(record.status)}
  onClick={() => handleUpdateStatus(record.id, "Cancelled")}
  loading={loadingId === record.id}
>
  Cancel
</Button>

        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Admin Orders</h2>
      {loadingOrders ? (
        <Spin size="large" style={{ display: "block", textAlign: "center", margin: "20px 0" }} />
      ) : (
        <Table dataSource={orders} columns={columns} rowKey="id" />
      )}
    </div>
  );
};

export default Orders;

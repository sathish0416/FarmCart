import React, { useEffect, useState } from "react";
import { Table, Button, Tag, message, Spin } from "antd";
import useAdminActions from "./hooks/useAdminApi";

const Registrations = () => {
  const { loading, error, fetchFarmers, updateFarmerStatus } = useAdminActions();
  const [farmers, setFarmers] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which row is being updated

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFarmers();
        console.log("Fetched Farmers:", response);
        setFarmers(response || []); // Ensure it's always an array
      } catch (e) {
        console.error("Error fetching farmers:", e);
      }
    };
    fetchData();
  }, []);

  const handleAction = async (id, status) => {
    setLoadingId(id); // Show loading spinner on the specific row
    try {
      await updateFarmerStatus(id, status);
      message.success(`Registration ${status.toLowerCase()}!`);
      const updatedFarmers = await fetchFarmers(); // Fetch updated data
      setFarmers(updatedFarmers || []);
    } catch (error) {
      message.error(`Error ${status.toLowerCase()} registration`);
    } finally {
      setLoadingId(null); // Reset loading state
    }
  };

  const columns = [
    { title: "Farmer Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Status",
      dataIndex: "verificationStatus",
      key: "verificationStatus",
      render: (status) => {
        const statusText = status ? status.toUpperCase() : "UNKNOWN"; // Prevents undefined error
        const color =
          status === "Pending"
            ? "orange"
            : status === "Approved"
            ? "green"
            : status === "Rejected"
            ? "red"
            : "gray";

        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleAction(record._id, "Approved")}
            disabled={record.verificationStatus === "Approved"}
            style={{ marginRight: 8 }}
          >
            {loadingId === record._id ? <Spin size="small" /> : "Approve"}
          </Button>
          <Button
            type="danger"
            onClick={() => handleAction(record._id, "Rejected")}
            disabled={record.verificationStatus === "Rejected"}
          >
            {loadingId === record._id ? <Spin size="small" /> : "Reject"}
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Table columns={columns} dataSource={farmers} rowKey="_id" />;
};

export default Registrations;

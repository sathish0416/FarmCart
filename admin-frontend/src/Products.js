import React, { useEffect, useState } from "react";
import { Table, Button, Tag, message, Spin } from "antd";
import useAdminActions from "./hooks/useAdminApi";

const Products = () => {
  const { loading, error, fetchProducts, updateProductStatus } = useAdminActions();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        console.log("Fetched Products:", response);
        setProducts(response || []); // Ensure it's always an array
      } catch (e) {
        console.error("Error fetching products:", e);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await updateProductStatus(id, "Approved");
      message.success("Product approved!");
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, status: "Approved" } : product
        )
      );
    } catch (error) {
      message.error("Error approving product");
    }
  };

  const handleReject = async (id) => {
    try {
      await updateProductStatus(id, "Rejected");
      message.success("Product rejected!");
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, status: "rejected" } : product
        )
      );
    } catch (error) {
      message.error("Error rejecting product");
    }
  };

  const columns = [
    { title: "Farmer Name", dataIndex: "", key: "farmerName" ,  render: (_,record) => (record.farmer? record.farmer.name : "N/A") },
    { title: "Product", dataIndex: "name", key: "product" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price", render: (price) => `$${price}` },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Pending" ? "orange" : status === "Approved" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            disabled={record.status === "Approved" || record.status === "Rejected"}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            type="danger"
            onClick={() => handleReject(record._id)}
            disabled={record.status === "Rejected" || record.status === "Approved"}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Table columns={columns} dataSource={products} rowKey="id" />;
};

export default Products;

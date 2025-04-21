import React, { useState, useEffect } from "react";
import Navbar from "./FarmerNavbar";
import "./FarmerOrders.css";
import useFarmer from "../../hooks/useFarmer";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale, 
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend);
const FarmerOrders = () => {
  // State to store orders and chart data
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState(null);
  
  // Custom hook for farmer-specific API calls (e.g., fetching orders)
  const { handleViewOrders, loading, error } = useFarmer();

  useEffect(() => {
    // Function to fetch orders and process data for charting
    const fetchOrders = async () => {
      try {
        // Fetch orders from the API
        const fetchedOrders = await handleViewOrders();
        setOrders(fetchedOrders.orders);
        console.log("Fetched orders:", fetchedOrders.orders);

        // Aggregate data for charting:
        // Process each order's products to calculate total quantity sold and total revenue per product.
        const aggregated = {};
        fetchedOrders.orders.forEach((order) => {
          order.products.forEach((item) => {
            // Use the product ID as key (assuming product._id exists)
            const productId = item.product._id;
            if (!aggregated[productId]) {
              aggregated[productId] = {
                name: item.product.name,
                totalSold: 0,
                totalRevenue: 0,
              };
            }
            // Increment total quantity sold for this product
            aggregated[productId].totalSold += item.quantity;
            // Calculate revenue for this product item (quantity x price)
            const price = item.product.price || 0;
            aggregated[productId].totalRevenue += item.quantity * price;
          });
        });

        // Prepare arrays for chart labels and datasets.
        const labels = Object.values(aggregated).map((item) => item.name);
        const totalSoldData = Object.values(aggregated).map(
          (item) => item.totalSold
        );
        const totalRevenueData = Object.values(aggregated).map(
          (item) => item.totalRevenue
        );

        // Create chart data object.
        setChartData({
          labels,
          datasets: [
            {
              label: "Total Sold",
              data: totalSoldData,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Total Revenue",
              data: totalRevenueData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        });

        console.log(fetchedOrders);

      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };


    // Call the function to load orders when component mounts
    fetchOrders();
  }, [handleViewOrders]);

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <h2 className="orders-title">📦 Your Orders</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}


        {/* Render the chart if chartData is available */}
        {chartData && (
          <div className="chart-wrapper">
<Bar
  data={chartData}
  options={{
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Product-wise Sales Analysis",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw; // Get the raw value of the bar
            return `${label}: ${value.toLocaleString()} units`; // Customize tooltip text
          },
        },
      },
    },
    scales: {
      y: {
        type: "logarithmic", // Ensures visibility for small values
        min: 1, 
        ticks: {
          callback: function (value) {
            return Number(value).toLocaleString();
          },
        },
      },
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
    barThickness: 30, // Ensures better visibility for small bars
  }}
/>
          </div>
        )}

        {orders.length > 0 ? (
          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order.orderId}</td>
                    <td>
                      {order.products.map((product, index) => (
                        <div key={index} className="product-item">
                  <img
                    src={
                      product.product.image?.data
                        ? `data:${product.product.image.contentType};base64,${btoa(
                            new Uint8Array(product.product.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`
                        : "../../assets/default.jpg"
                    }
                    alt={product.product.name}
                  />
                          <span>
                            {product.product.name} - {product.quantity}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td>
                      <span
                        className={`order-status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Display a message if there are no orders found
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
};

export default FarmerOrders;
import React, { useEffect, useState } from "react";
import "./CustomerOrders.css";

import CustomerNavbar from "../../components/CustomerNavbar";
import useCustomer from "../../hooks/useCustomer"; // Assuming the hook is in this path

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const { handleGetCustomerOrders, loading, error } = useCustomer();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await handleGetCustomerOrders();
        console.log(fetchedOrders);
        setOrders(fetchedOrders); // Set the fetched orders into the state
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [handleGetCustomerOrders]);

  return (
    <div className="Orders">
      <CustomerNavbar />
      <div className="orders-container">
        <h2 className="orders-title">My Orders</h2>
        {loading && <p>Loading...</p>} {/* Display loading state */}
        {error && <p className="error">{error}</p>} {/* Display error if any */}
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3 className="order-id">Order #{order.orderId}</h3>
                <p className={`order-status ${order.status.toLowerCase()}`}>
{/* =======
                <p className={`orderstatus ${order.status.toLowerCase()}`}>
>>>>>>> 3d7c7e02a9489632db5ec0dd22a7ebda687d6585 */}
                  Status: {order.status}
                </p>
              </div>
              <div className="order-products">
                {order.products.map((product) => (
                  <div key={product._id} className="order-product">
                   {/* <img src={
                      product.product.image?.data
                        ? `data:${product.product.image.contentType};base64,${btoa(
                            new Uint8Array(product.product.image.data.data).reduce(
                              (data, byte) => data + String.fromCharCode(byte),
                              ""
                            )
                          )}`
                        : "../../assets/default.jpg"
                    } alt={product.image} className="item-image" /> */}
                    <div className="product-details">
                      <h4 className="product-name">{product.product.name}</h4>
{/* =======
                    <img
                      src={
                        product.product.image?.data
                          ? `data:${product.product.image.contentType};base64,${btoa(
                              new Uint8Array(
                                product.product.image.data.data
                              ).reduce(
                                (data, byte) =>
                                  data + String.fromCharCode(byte),
                                ""
                              )
                            )}`
                          : "../../assets/default.jpg"
                      }
                      alt={product.product.name}
                      className="item-image"
                    />
                    <div className="product-details">
                      <h4 className="product-name">
                        {product.product.name}
                      </h4>
>>>>>>> 3d7c7e02a9489632db5ec0dd22a7ebda687d6585 */}
                      <p className="product-quantity">
                        Quantity: {product.quantity}
                      </p>
                      <p className="product-price">
                        Price: ₹{product.product.price * product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <h4>Total Price: ₹{order.totalPrice}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const OrderManagementWrapper = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f5f5f5;
  }
  tr:hover {
    background-color: #f9f9f9;
  }
`;

const UpdateButton = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from backend next
    axios
      .get("/api/orders/all")
      .then(() => {
        // Using fake data for now
        setOrders([
          {
            id: "1",
            customer: { name: "Alice" },
            totalPrice: 150,
            status: "Pending",
          },
          {
            id: "2",
            customer: { name: "Bob" },
            totalPrice: 200,
            status: "Shipped",
          },
          {
            id: "3",
            customer: { name: "Charlie" },
            totalPrice: 100,
            status: "Delivered",
          },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(`/api/orders/status/${orderId}`, { status: newStatus })
      .then(() => {
        // Update the status locally after successful update
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <OrderManagementWrapper>
      <h2>Manage Orders</h2>
      <OrderTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer.name}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                {order.status !== "Shipped" && (
                  <UpdateButton
                    onClick={() => handleStatusChange(order.id, "Shipped")}
                  >
                    Mark as Shipped
                  </UpdateButton>
                )}
                {order.status !== "Delivered" && (
                  <UpdateButton
                    onClick={() => handleStatusChange(order.id, "Delivered")}
                  >
                    Mark as Delivered
                  </UpdateButton>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </OrderManagementWrapper>
  );
};

export default OrderManagement;

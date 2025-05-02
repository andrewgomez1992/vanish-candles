import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaCaretDown } from "react-icons/fa";
import Tooltip from "../common/Tooltip";

const OrderManagementWrapper = styled.div`
  padding: 5px 20px 20px 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
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

  @media (max-width: 768px) {
    table-layout: auto;
    th,
    td {
      padding: 5px;
    }
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  padding: 8px 12px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const DropdownContent = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 5px;
  margin-top: 5px;
  border: 1px solid #ddd;

  & a {
    color: #333;
    padding: 10px;
    text-decoration: none;
    display: block;
    border-bottom: 1px solid #ddd;
  }

  & a:hover {
    background-color: #f5f5f5;
  }

  & a:last-child {
    border-bottom: none;
  }
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // To track which dropdown is open

  // Create a ref to track clicks outside the dropdown
  const dropdownRef = useRef();

  useEffect(() => {
    // Fetch orders from backend
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

    // Close the dropdown if clicked outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    // Simulate an API call to update the order status
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleCancelOrder = (orderId) => {
    // Simulate an API call to cancel the order
    alert(`Order ${orderId} has been cancelled.`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  const handleMarkAsProcessing = (orderId) => {
    // Simulate an API call to mark as processing
    alert(`Order ${orderId} is now marked as processing.`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Processing" } : order
      )
    );
  };

  const handleRefundOrder = (orderId) => {
    // Simulate an API call for refund
    alert(`Order ${orderId} has been refunded.`);
  };

  const handleViewOrderDetails = (orderId) => {
    // Simulate opening order details
    alert(`Viewing details for Order ${orderId}`);
  };

  const toggleDropdown = (orderId) => {
    setOpenDropdown(openDropdown === orderId ? null : orderId);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <OrderManagementWrapper>
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
                <DropdownWrapper ref={dropdownRef}>
                  <Tooltip tooltipText="Order Actions">
                    <DropdownButton onClick={() => toggleDropdown(order.id)}>
                      {order.status}
                      <FaCaretDown />
                    </DropdownButton>
                  </Tooltip>
                  <DropdownContent open={openDropdown === order.id}>
                    {order.status !== "Shipped" && (
                      <a
                        onClick={() => handleStatusChange(order.id, "Shipped")}
                      >
                        Mark as Shipped
                      </a>
                    )}

                    {order.status !== "Delivered" && (
                      <a
                        onClick={() =>
                          handleStatusChange(order.id, "Delivered")
                        }
                      >
                        Mark as Delivered
                      </a>
                    )}

                    {order.status !== "Cancelled" && (
                      <a onClick={() => handleCancelOrder(order.id)}>
                        Cancel Order
                      </a>
                    )}

                    {order.status !== "Processing" && (
                      <a onClick={() => handleMarkAsProcessing(order.id)}>
                        Mark as Processing
                      </a>
                    )}

                    <a onClick={() => handleViewOrderDetails(order.id)}>
                      View Details
                    </a>

                    <a onClick={() => handleRefundOrder(order.id)}>
                      Refund Order
                    </a>
                  </DropdownContent>
                </DropdownWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </OrderManagementWrapper>
  );
};

export default OrderManagement;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AccordionItem = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const AccordionHeader = styled.div`
  padding: 10px 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }
`;

/* Use a transient prop ($isOpen) so it won't appear as a DOM attribute */
const AccordionContent = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? "150px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #fff;
  padding: ${({ $isOpen }) => ($isOpen ? "10px 15px" : "0 15px")};
`;

const NoOrders = styled.p`
  font-style: italic;
  color: #666;
`;

const Orders = ({ userEmail }) => {
  const [orders, setOrders] = useState([]);
  const [openMap, setOpenMap] = useState({});

  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`${API_BASE_URL}/orders/email/${userEmail}`)
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setOrders([]);
      });
  }, [userEmail]);

  console.log("orders", orders);

  const toggle = (id) => setOpenMap((m) => ({ ...m, [id]: !m[id] }));

  if (!userEmail) {
    return <NoOrders>Please log in to view your orders.</NoOrders>;
  }

  if (orders.length === 0) {
    return <NoOrders>You haven’t placed any orders yet.</NoOrders>;
  }

  return (
    <>
      {orders.map((order) => (
        <AccordionItem key={order.id}>
          <AccordionHeader onClick={() => toggle(order.id)}>
            <h4>Order ID: {order.id}</h4>
            <span>{openMap[order.id] ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openMap[order.id]}>
            <p>Total: ${order.total_price}</p>
            <p>Status: {order.status || "Processing"}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
};

Orders.propTypes = {
  userEmail: PropTypes.string,
};

export default Orders;

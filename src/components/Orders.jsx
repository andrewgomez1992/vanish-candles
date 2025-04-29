import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import candleImage1 from "../assets/candlebackground2.webp";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AccordionItem = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AccordionHeader = styled.div`
  padding: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
  }
  span {
    font-size: 1.2rem;
    color: #666;
  }
`;

const AccordionContent = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? "300px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #fff;
  padding: ${({ $isOpen }) => ($isOpen ? "15px" : "0 15px")};
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
`;

const OrderImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
`;

const OrderDetails = styled.div`
  flex-grow: 1;
`;

const NoOrders = styled.p`
  font-style: italic;
  color: #666;
  text-align: center;
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

  const toggle = (id) => setOpenMap((m) => ({ ...m, [id]: !m[id] }));

  const getImageUrl = () =>
    // imageUrl
    {
      // return imageUrl ? imageUrl : candleImage1;
      return candleImage1;
    };

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
            <h4>Order Details</h4>
            <span>{openMap[order.id] ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionContent $isOpen={openMap[order.id]}>
            <p>
              <strong>Total: </strong>${order.amount / 100}
            </p>
            <p>
              <strong>Status: </strong>
              {order.paymentStatus || "Pending"}
            </p>
            <div>
              {order.items.map((item) => (
                <OrderItem key={item.product.id}>
                  <OrderImage
                    src={getImageUrl(item.product.image_url)}
                    alt={item.product.name}
                  />
                  <OrderDetails>
                    <p>
                      <strong>{item.product.name}</strong>
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </OrderDetails>
                </OrderItem>
              ))}
            </div>
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

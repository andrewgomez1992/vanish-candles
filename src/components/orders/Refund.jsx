import styled from "styled-components";

const Button = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

/**
 * Stub component to initiate refund flow.
 * Props:
 *  - orderId: ID of the order to refund
 */
const RefundButton = ({ orderId }) => {
  const handleClick = () => {
    // TODO: implement refund logic (e.g. open refund modal or call API)
    console.log(`Request refund for order ${orderId}`);
  };

  return <Button onClick={handleClick}>Request Refund</Button>;
};

export default RefundButton;

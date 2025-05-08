import styled from "styled-components";

const Button = styled.button`
  padding: 8px 12px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

/**
 * Stub component to initiate order tracking flow.
 * Props:
 *  - orderId: ID of the order to track
 */
const TrackOrderButton = ({ orderId }) => {
  const handleClick = () => {
    // TODO: implement tracking logic (e.g. navigate to tracking page or open modal)
    console.log(`Track order ${orderId}`);
  };

  return <Button onClick={handleClick}>Track Order</Button>;
};

export default TrackOrderButton;

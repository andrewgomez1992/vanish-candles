import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ConfirmationWrapper = styled.div`
  max-width: 500px;
  margin: 120px auto 50px;
  margin-top: 180px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: #222;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a745; /* ✅ Green success color */
  border-radius: 50%;
  padding: 10px;

  svg {
    width: 40px;
    height: 40px;
    stroke: white;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #000;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #333;
  }
`;

// Track my order button could be implemented after order confirmation
const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <ConfirmationWrapper>
      <SuccessIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </SuccessIcon>

      <Title>Thank You for Your Order!</Title>
      <Message>
        Your payment was successful. A confirmation email has been sent.
      </Message>
      <BackButton onClick={() => navigate("/")}>Back to Home</BackButton>
    </ConfirmationWrapper>
  );
};

export default OrderConfirmation;

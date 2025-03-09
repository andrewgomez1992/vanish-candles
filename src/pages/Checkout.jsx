import { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutWrapper = styled.div`
  max-width: 500px;
  margin: 170px auto 50px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const CheckoutTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
  color: #222;
`;

const PaymentContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-top: 20px;
`;

const StyledCardElement = styled(CardElement)`
  padding: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 15px 0px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #000;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 1rem;
  margin-top: 10px;
`;

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, totalPrice } = useCart();
  const { userEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe is not properly initialized.");
      setLoading(false);
      return;
    }

    try {
      const formattedItems = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      // ✅ Create payment intent
      const response = await fetch(
        `${API_BASE_URL}/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(totalPrice * 100), // ✅ Convert dollars → cents
            customerEmail: userEmail,
            items: formattedItems,
          }),
        }
      );

      const data = await response.json();

      if (!data.client_secret) {
        throw new Error("Failed to get client secret.");
      }

      // ✅ Confirm payment with Stripe
      const {
        error,
        // paymentIntent
      } = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      //   console.log("✅ Payment Successful! Payment Intent:", paymentIntent.id);

      setSuccess(true);
      setTimeout(() => navigate("/order-confirmation"), 3000);
    } catch (err) {
      setError(err.message || "Payment failed.");
    }

    setLoading(false);
  };

  return (
    <CheckoutWrapper>
      <CheckoutTitle>Secure Checkout</CheckoutTitle>
      <p>
        Total: <strong>${totalPrice}</strong>
      </p>
      <p>
        Billing Email: <strong>{userEmail || "Not logged in"}</strong>
      </p>

      <PaymentContainer>
        <form onSubmit={handleSubmit}>
          <StyledCardElement />
          <PayButton type="submit" disabled={!stripe || loading}>
            {loading ? "Processing..." : `Pay $${totalPrice}`}
          </PayButton>
        </form>
      </PaymentContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && (
        <SuccessMessage>Payment successful! Redirecting...</SuccessMessage>
      )}
    </CheckoutWrapper>
  );
};

export default Checkout;

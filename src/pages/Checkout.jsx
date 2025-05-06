import { useContext, useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import candlePlaceholder from "../assets/candlebackground.webp";
import ShippingPolicyModal from "../components/modals/ShippingPolicyModal";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutPageContainer = styled.div`
  margin-top: 180px;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  padding: 0 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const LeftColumn = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const RightColumn = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    align-self: flex-start;
    position: sticky;
    top: 150px;
  }
`;

const PageHeading = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const SectionContainer = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #333;
`;

const SectionContent = styled.div`
  margin-top: 15px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 0.95rem;
    margin-bottom: 5px;
    color: #444;
  }

  input,
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ccc;
    font-size: 0.95rem;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding-right: 1rem;
    background: url("data:image/svg+xml;base64,...") no-repeat 97% center;
    background-size: 14px;
    cursor: pointer;
  }
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 0.9rem;

  input[type="radio"] {
    appearance: auto;
    -webkit-appearance: radio;
    accent-color: black;
    margin: 0;
    cursor: pointer;
  }
`;

const StyledCardElementContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
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
  margin-top: 10px;
  transition: 0.3s ease-in-out;
  text-align: center;

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

const OrderSummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    font-size: 0.95rem;
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const CartItemDetails = styled.div`
  display: flex;
  flex-direction: column;

  .item-name {
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .item-quantity {
    font-size: 0.85rem;
    color: #666;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 15px 0;
`;

const InfoIcon = styled(FaQuestionCircle)`
  margin-left: 5px;
  cursor: pointer;
  font-size: 1rem;
  color: #999;

  &:hover {
    color: #333;
  }
`;

const ShippingLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, totalPrice } = useCart();
  const { userEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [addressInfo, setAddressInfo] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState({});

  console.log("addressInfo", addressInfo);

  const dummyShippingMethods = [
    {
      id: "ground",
      name: "UPS® Ground",
      cost: 14.95,
      estimate: "4 business days",
    },
    {
      id: "2day",
      name: "UPS 2nd Day Air®",
      cost: 24.95,
      estimate: "2 business days",
    },
    {
      id: "overnight",
      name: "UPS Next Day Air®",
      cost: 34.95,
      estimate: "1 business day",
    },
  ];

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/addresses`, {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data?.length > 0) {
          const defaultAddress = data.find((address) => address.isDefault);
          if (defaultAddress) {
            setAddressInfo(defaultAddress);
            setSelectedAddressId(defaultAddress.id);
          } else {
            setAddressInfo(data[0]);
            setSelectedAddressId(data[0].id);
          }
          setAddresses(data);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, []);

  const handleSelectSavedAddress = (e) => {
    const chosenId = parseInt(e.target.value, 10);
    setSelectedAddressId(chosenId);

    const chosenAddress = addresses.find((addr) => addr.id === chosenId);
    if (chosenAddress) {
      setAddressInfo(chosenAddress); // Update addressInfo state to fill the form
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingMethodChange = (method) => {
    setSelectedShippingMethod(method);
  };

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

      const response = await fetch(
        `${API_BASE_URL}/stripe/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(totalPrice * 100),
            customerEmail: userEmail,
            items: formattedItems,
          }),
        }
      );

      const data = await response.json();
      if (!data.client_secret) {
        throw new Error("Failed to get client secret.");
      }

      const { error: stripeError } = await stripe.confirmCardPayment(
        data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: cardHolderName,
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/order-confirmation"), 3000);
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    }

    setLoading(false);
  };

  const shippingCost = selectedShippingMethod?.cost || 0;
  const grandTotal = totalPrice + shippingCost;

  console.log("grandTotal", grandTotal);

  return (
    <CheckoutPageContainer>
      <LeftColumn>
        <PageHeading>Secure Checkout</PageHeading>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* Address Section */}
            <SectionContainer>
              <SectionHeader onClick={() => setAddressOpen(!addressOpen)}>
                <SectionTitle>Ship To</SectionTitle>
                {addressOpen ? <FaChevronUp /> : <FaChevronDown />}
              </SectionHeader>
              <SectionContent isOpen={addressOpen}>
                <FormGroup>
                  <label>Choose a saved address</label>
                  <select
                    value={selectedAddressId}
                    onChange={handleSelectSavedAddress}
                  >
                    {addresses.length > 0 ? (
                      addresses.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                          {addr.first_name} {addr.last_name} - {addr.street}
                        </option>
                      ))
                    ) : (
                      <option disabled>No saved addresses</option>
                    )}
                  </select>
                </FormGroup>
                <FormGroup>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    value={addressInfo.first_name || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={addressInfo.last_name || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Address Line 1</label>
                  <input
                    name="addressLine1"
                    value={addressInfo.street || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Address Line 2 (Optional)</label>
                  <input
                    name="addressLine2"
                    value={addressInfo.addressLine2 || ""}
                    onChange={handleAddressChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>City</label>
                  <input
                    name="city"
                    value={addressInfo.city || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>State</label>
                  <input
                    name="state"
                    value={addressInfo.state || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>ZIP / Postal Code</label>
                  <input
                    name="zip"
                    value={addressInfo.zip || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>Country</label>
                  <input
                    name="country"
                    value={addressInfo.country || ""}
                    onChange={handleAddressChange}
                    required
                  />
                </FormGroup>
              </SectionContent>
            </SectionContainer>

            {/* SHIPPING SECTION */}
            <SectionContainer>
              <SectionHeader onClick={() => setShippingOpen(!shippingOpen)}>
                <SectionTitle>Shipping Method</SectionTitle>
                {shippingOpen ? <FaChevronUp /> : <FaChevronDown />}
              </SectionHeader>

              <SectionContent isOpen={shippingOpen}>
                {dummyShippingMethods?.map((method) => (
                  <RadioOption key={method.id}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={selectedShippingMethod.id === method.id}
                      onChange={() => handleShippingMethodChange(method)}
                    />
                    {method.name} - ${method.cost} ({method.estimate})
                  </RadioOption>
                ))}
              </SectionContent>
            </SectionContainer>

            {/* PAYMENT SECTION */}
            <SectionContainer>
              <SectionTitle>Payment Details</SectionTitle>
              <FormGroup>
                <label>Name on Card</label>
                <input
                  type="text"
                  name="cardHolderName"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  placeholder="Exact name on your card"
                  required
                />
              </FormGroup>

              <StyledCardElementContainer>
                <CardElement />
              </StyledCardElementContainer>
            </SectionContainer>

            <PayButton type="submit" disabled={!stripe || loading}>
              {/* {loading ? "Processing..." : `Pay $${grandTotalFormatted}`} */}
            </PayButton>
          </form>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>Payment successful! Redirecting...</SuccessMessage>
          )}
        </FormContainer>
      </LeftColumn>

      <RightColumn>
        <SectionTitle>Order Summary</SectionTitle>
        {/* List Cart Items */}
        {cart?.map((item) => (
          <CartItemContainer key={item.id}>
            <CartItemImage src={candlePlaceholder} alt={item.name} />
            <CartItemDetails>
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">
                {item.quantity} x ${item.price}
              </span>
            </CartItemDetails>
          </CartItemContainer>
        ))}

        <Divider />
        <FormGroup>
          <label>Discount code or gift card</label>
          <input placeholder="Enter code" />
        </FormGroup>

        <Divider />

        <OrderSummaryItem>
          <span>Subtotal</span>
          {/* <span>${totalPrice.toFixed(2)}</span> */}
        </OrderSummaryItem>
        <OrderSummaryItem>
          <ShippingLabel>
            Shipping
            <InfoIcon onClick={() => setShowPolicy(true)} />
          </ShippingLabel>
          <span>${shippingCost.toFixed(2)}</span>
        </OrderSummaryItem>
        <ShippingPolicyModal
          isOpen={showPolicy}
          onClose={() => setShowPolicy(false)}
        />
        <Divider />
        <OrderSummaryItem>
          <strong>Total</strong>
          {/* <strong>${grandTotal.toFixed(2)}</strong> */}
        </OrderSummaryItem>
      </RightColumn>
    </CheckoutPageContainer>
  );
};

export default Checkout;

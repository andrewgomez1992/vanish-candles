import "react";
import styled from "styled-components";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { scrollToShopSection } from "../util/scrollToShopSection";
import candlePlacerholder from "../assets/candlebackground.webp";

const CartPageWrapper = styled.div`
  padding: 150px 20px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 20px 20px;
  }
`;

const CartWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CartItemImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const CartItemDetails = styled.div`
  flex: 1;
  padding: 10px; /* Reduced from 20px to 10px */
`;

const CartItemTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #333;
`;

const CartItemPrice = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0 0 15px;
`;

const QuantityControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;

  button {
    background-color: #f0f0f0;
    border: none;
    padding: 5px 12px;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 4px;

    &:hover {
      background-color: #ddd;
    }
  }

  input {
    width: 50px;
    text-align: center;
    border: 1px solid #ddd;
    font-size: 1rem;
    border-radius: 4px;
  }
`;

const RemoveLink = styled.span`
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  color: #ff4d4f;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #ff0000;
  }
`;

const CartSummary = styled.div`
  margin-top: 30px;
  text-align: right;
`;

const TaxShippingNote = styled.p`
  margin-bottom: 10px;
  color: #666;
  font-size: 0.95rem;
`;

const CartTotal = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  display: inline-block;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 30px;
  color: #777;
  font-size: 1.2rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ShopButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
  background-color: #000;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    transform: scale(1.05);
    background-color: #333;
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, removeFromCart, addToCart } = useCart();

  const updateQuantity = (id, newQuantity) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      addToCart({ ...item, quantity: newQuantity - item.quantity });
    }
  };

  const handleShopClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        scrollToShopSection();
      }, 100);
    } else {
      scrollToShopSection();
    }
  };

  return (
    <CartPageWrapper>
      <CartWrapper>
        <CartHeader>Shopping Cart</CartHeader>

        {cart.length > 0 ? (
          <>
            {/* CART ITEMS */}
            <CartItemsContainer>
              {cart.map((item) => {
                // Compute line total first
                const lineTotal = item.price * item.quantity;

                return (
                  <CartItem key={item.id}>
                    {/* If you have item.image, display it. Otherwise, placeholder is used. */}
                    <CartItemImageWrapper>
                      <img src={candlePlacerholder} alt={item.name} />
                    </CartItemImageWrapper>

                    <CartItemDetails>
                      <CartItemTitle>{item.name}</CartItemTitle>

                      {/* Display the computed line total instead of just item.price */}
                      <CartItemPrice>${lineTotal}</CartItemPrice>

                      <QuantityControl>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value)) {
                              updateQuantity(item.id, value);
                            }
                          }}
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </QuantityControl>

                      <RemoveLink onClick={() => removeFromCart(item.id)}>
                        Remove
                      </RemoveLink>
                    </CartItemDetails>
                  </CartItem>
                );
              })}
            </CartItemsContainer>

            {/* SUMMARY / FOOTER */}
            <CartSummary>
              <TaxShippingNote>
                Taxes and shipping calculated at checkout
              </TaxShippingNote>
              <CartTotal>Total: ${totalPrice}</CartTotal>

              <CheckoutButton onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </CheckoutButton>
            </CartSummary>
          </>
        ) : (
          <>
            <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
            <ShopButton onClick={handleShopClick}>Shop</ShopButton>
          </>
        )}
      </CartWrapper>
    </CartPageWrapper>
  );
};

export default Cart;

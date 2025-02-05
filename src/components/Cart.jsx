import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { scrollToShopSection } from "../util/scrollToShopSection";

const CartPageWrapper = styled.div`
  padding: 150px 20px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 20px 20px;
  }
`;

const CartWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CartHeader = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;

  .item-details {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .item-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

  .item-price {
    font-size: 1rem;
    color: #555;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;

    button {
      background-color: #f0f0f0;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background-color: #ddd;
      }
    }

    input {
      width: 50px;
      text-align: center;
      border: 1px solid #ddd;
      font-size: 1rem;
    }
  }

  .remove {
    color: #ff4d4f;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #ff0000;
    }
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #777;
  font-size: 1.2rem;
  background-color: #fff;
  border: 1px solid #ddd;
`;

const CartTotal = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const CheckoutButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: #000;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #333;
  }
`;

const ShopButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 15px 20px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: #000000;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  max-width: 200px;

  &:hover {
    transform: scale(1.05);
  }
`;

// First commit from new mac

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart } = useCart();

  const calculateTotal = () => {
    try {
      return cart
        .reduce((total, item) => {
          const price = parseFloat(item.price.replace("$", "").trim());
          if (isNaN(price)) throw new Error(`Invalid price: ${item.price}`);
          return total + price * item.quantity;
        }, 0)
        .toFixed(2);
    } catch (error) {
      console.error("Error calculating total:", error);
      return "0.00";
    }
  };

  const updateQuantity = (id, newQuantity) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      addToCart({ ...item, quantity: newQuantity - item.quantity });
    }
  };

  const handleShopClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false }); // Redirect to the landing page
      setTimeout(() => {
        scrollToShopSection();
      }, 100); // Wait for the page to load before scrolling
    } else {
      scrollToShopSection(); // Scroll if already on the landing page
    }
  };

  return (
    <CartPageWrapper>
      <CartWrapper>
        <CartHeader>Shopping Cart</CartHeader>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <div className="item-details">
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">{item.price}</span>
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
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
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span
                  className="remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </span>
              </CartItem>
            ))}
            <CartTotal>Total: ${calculateTotal()}</CartTotal>
            <CheckoutButton>Proceed to Checkout</CheckoutButton>
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

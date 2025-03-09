import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Update total quantity and price whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);

    const totalPrice = cart.reduce((sum, item) => {
      const price =
        typeof item.price === "number"
          ? item.price
          : parseFloat(item.price.replace("$", "").trim());
      return sum + price * item.quantity;
    }, 0);

    setTotalPrice(totalPrice.toFixed(2));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      const itemQuantity = item.quantity || 1;
      const updatedCart = existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: itemQuantity }];
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id);
      if (existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, totalQuantity, totalPrice, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Add PropTypes Validation
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;

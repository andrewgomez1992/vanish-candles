import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Parse the JSON string back to an array
    }
  }, []);

  // Update total quantity and price whenever cart changes
  useEffect(() => {
    if (cart && cart.length > 0) {
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

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setTotalQuantity(0);
      setTotalPrice(0);
      localStorage.removeItem("cart"); // Remove from localStorage when cart is empty
    }
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
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        // Save the updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }

      // Remove the item from the cart entirely
      const updatedCart = prevCart.filter((cartItem) => cartItem.id !== id);

      // Clear localStorage if the cart is empty
      if (updatedCart.length === 0) {
        localStorage.removeItem("cart");
      } else {
        // Save the updated cart to localStorage if it's not empty
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Showcase from "./pages/Showcase";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import CreateAccount from "./pages/CreateAccount";
import AccountPage from "./pages/AccountPage";
import Footer from "./components/Footer";
import "./App.css";
import Cart from "./components/Cart";
import Contact from "./pages/Contact";
import Addresses from "./pages/Addresses";

const App = () => {
  const [cart, setCart] = useState([]);
  const isAdmin = true;

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is not provided
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + itemQuantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: itemQuantity }];
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
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/product/:id"
          element={<Showcase addToCart={addToCart} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/addresses" element={<Addresses />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
        {isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

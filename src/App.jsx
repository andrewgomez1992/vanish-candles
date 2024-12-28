import React, { useEffect, useState } from "react";
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
// import Addresses from "./pages/Addresses";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./routes/ProtecedRoute";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/:id" element={<Showcase />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/account" element={<AccountPage />} />
          {/* <Route path="/account/addresses" element={<Addresses />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;

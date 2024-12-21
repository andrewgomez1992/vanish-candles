import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Showcase from "./pages/Showcase";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import "./App.css";
import Landing from "./pages/Landing";
import CreateAccount from "./pages/CreateAccount";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/:id" element={<Showcase />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
};

export default App;

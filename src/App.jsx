import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
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
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import { CartProvider } from "./context/CartProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import OrderConfirmation from "./pages/OrderConfirmation";
import ScrollToTop from "./util/scrollToTop";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
// const stripePromise = loadStripe("heyitsafakekey");

const App = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        {/* Wrap Routes with Elements to make Stripe available */}
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/product/:id" element={<Showcase />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />{" "}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;

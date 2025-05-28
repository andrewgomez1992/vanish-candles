import { useState } from "react";
import axiosInstance from "../util/axiosConfig";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // update

  const handleResend = async () => {
    if (!email) return;

    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await axiosInstance.post("/users/resend-verification", {
        email,
      });

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Resend Email Verification</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleResend} disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Resend Verification Email"}
      </button>
      {message && <p style={{ color: "blue" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResendVerification;

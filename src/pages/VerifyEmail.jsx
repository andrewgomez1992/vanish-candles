import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../util/axiosConfig";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect instantly if no token is found
      return;
    }

    const verifyEmail = async () => {
      try {
        await axiosInstance.get(`/users/verify-email?token=${token}`);
        navigate("/login", { replace: true }); // ⬅️ ✅ Redirect instantly
      } catch (error) {
        console.error("Verification failed:", error);
        navigate("/login"); // Ensure we don't stay on an empty page
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return null; // ⬅️ ✅ Don't render anything—redirect immediately
};

export default VerifyEmail;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../util/axiosConfig";

const VerifyEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #f5f5f5;

  @media (max-width: 768px) {
    min-height: 80vh;
  }
`;

const VerifyEmailContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 180px;
  padding-bottom: 80px;

  @media (max-width: 768px) {
    padding-bottom: 130px;
  }
`;

const MessageContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 20px;
  }
`;

const StatusMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 0;
`;

const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/users/verify-email?token=${token}`);
        setStatus("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      } catch (error) {
        setStatus(
          error.response?.data?.message ||
            "Failed to verify email. Please try again."
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("Invalid verification link.");
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />
      <VerifyEmailContainer>
        <VerifyEmailContent>
          <MessageContainer>
            <StatusMessage>{status}</StatusMessage>
          </MessageContainer>
        </VerifyEmailContent>
      </VerifyEmailContainer>
    </>
  );
};

export default VerifyEmail;

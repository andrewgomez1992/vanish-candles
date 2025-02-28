import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import axiosInstance from "../util/axiosConfig";

const LoginPageContainer = styled.div`
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

const LoginContent = styled.div`
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

const LoginFormContainer = styled.div`
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

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #000;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 0px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0px;
  background-color: black;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: gray;
    color: white;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 20px;
`;

const ResendLink = styled.p`
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  margin-top: -10px; /* Moves it up without affecting DOM flow */
  margin-bottom: 10px;
`;

const LinksContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    font-size: 14px;
    color: #555;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #000;
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowResend(false);
    setResendMessage("");

    try {
      await login(email, password);
      navigate("/account");
    } catch (err) {
      console.error("Login failed:", err);

      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.message?.includes("Your email is not verified")
        ) {
          setError("Your email is not verified.");
          setShowResend(true);
        } else if (err.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleResendVerification = async () => {
    setResendMessage("");
    try {
      const response = await axiosInstance.post("/users/resend-verification", {
        email,
      });

      if (response.status === 200) {
        setResendMessage(
          "A new verification email has been sent. Please check your inbox."
        );
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to resend verification email. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <LoginPageContainer>
        <LoginContent>
          <LoginFormContainer>
            <Title>Login</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {showResend && (
              <ResendLink onClick={handleResendVerification}>
                Click here to resend verification email
              </ResendLink>
            )}
            {resendMessage && <SuccessMessage>{resendMessage}</SuccessMessage>}
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit">Sign In</Button>
            </form>
            <LinksContainer>
              <a href="/forgot-password">Forgot your password?</a>
              <a href="/create-account">Create account</a>
            </LinksContainer>
          </LoginFormContainer>
        </LoginContent>
      </LoginPageContainer>
    </>
  );
};

export default LoginPage;

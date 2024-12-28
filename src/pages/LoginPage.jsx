import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #f5f5f5; /* Light gray background */

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
  padding-top: 180px; /* Add padding to the entire login content */
  padding-bottom: 80px;

  @media (max-width: 768px) {
    /* padding-top: 0px; */
    padding-bottom: 130px;
  }
`;

const LoginFormContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px; /* Increased width */
  padding: 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  text-align: center;

  @media (max-width: 768px) {
    /* Tablet and smaller */
    margin: 0 20px; /* Add padding around the form container */
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 20px;
  color: #000; /* Black color for title */
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 0px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  /* border-radius: 5px; */
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff; /* Blue focus color */
  }

  &::placeholder {
    color: #aaa; /* Placeholder color */
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
  /* border-radius: 5px; */
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
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
      color: #000; /* Darker on hover */
    }
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login method from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await login(email, password);
      navigate("/account"); // Redirect to account page after successful login
    } catch (err) {
      console.error("Login failed:", err);

      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.message ===
            "Please verify your email before logging in."
        ) {
          setError("Please verify your email before logging in.");
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

  return (
    <>
      <Navbar />
      <LoginPageContainer>
        <LoginContent>
          <LoginFormContainer>
            <Title>Login</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
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

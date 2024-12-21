import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #f5f5f5; /* Light gray background */
`;

const LoginContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 180px; /* Add padding to the entire login content */
  padding-bottom: 80px;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <>
      <Navbar />
      <LoginPageContainer>
        <LoginContent>
          <LoginFormContainer>
            <Title>Login</Title>
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Sign In</Button>
            </form>
            <LinksContainer>
              <a href="/forgot-password">Forgot your password?</a>
              <a href="/create-account">Create account</a>
            </LinksContainer>
          </LoginFormContainer>
        </LoginContent>
        <Footer />
      </LoginPageContainer>
    </>
  );
};

export default LoginPage;

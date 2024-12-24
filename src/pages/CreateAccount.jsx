import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const CreateAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #f5f5f5; /* Light gray background */
`;

const CreateAccountContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 180px; /* Match padding from LoginPage */
  padding-bottom: 80px;
`;

const FormContainer = styled.div`
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
  text-transform: uppercase; /* Matches design */
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 0px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
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
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <Navbar />
      <CreateAccountContainer>
        <CreateAccountContent>
          <FormContainer>
            <Title>Create Account</Title>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button type="submit">Create</Button>
            </form>
          </FormContainer>
        </CreateAccountContent>
      </CreateAccountContainer>
    </>
  );
};

export default CreateAccount;

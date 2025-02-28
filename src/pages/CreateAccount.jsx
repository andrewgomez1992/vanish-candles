import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import axiosInstance from "../util/axiosConfig";
import { useNavigate } from "react-router-dom";

const CreateAccountContainer = styled.div`
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

const CreateAccountContent = styled.div`
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

const FormContainer = styled.div`
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
  margin-top: 10px;
`;

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const { email, password, confirmPassword } = formData;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8 || password.length > 30) {
      setError("Password must be between 8 and 30 characters.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setShowResend(false);

    try {
      const response = await axiosInstance.put("/users/register", {
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage(
          "Account created! Please check your email to verify your account."
        );
      }
    } catch (error) {
      if (error.response?.status === 409) {
        if (error.response?.data?.message?.includes("verify")) {
          setError("Your email is already registered but not verified.");
          setShowResend(true);
        } else {
          setError("Email already in use. Please login or use another email.");
        }
      } else {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to create account. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <CreateAccountContainer>
        <CreateAccountContent>
          <FormContainer>
            <Title>Create Account</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {successMessage && (
              <SuccessMessage>{successMessage}</SuccessMessage>
            )}
            {showResend && (
              <ResendLink onClick={() => navigate("/resend-verification")}>
                Click here to resend verification email
              </ResendLink>
            )}
            {!successMessage && (
              <form onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Create Account"}
                </Button>
              </form>
            )}
          </FormContainer>
        </CreateAccountContent>
      </CreateAccountContainer>
    </>
  );
};

export default CreateAccount;

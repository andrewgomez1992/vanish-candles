import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import vanishlogo from "../assets/vanishlogo.png";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 1000;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  background-color: black;
  z-index: 899; /* Below the TopNav but above content */
  pointer-events: none; /* Ensures it doesn't interfere with clicks */
  transition: height 0.3s ease-in-out;
  height: ${({ isScrolled }) => (isScrolled ? "50px" : "80px")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  position: fixed;
  width: 100%;
  top: ${({ isScrolled }) => (isScrolled ? "-100px" : "0")};
  height: 60px;
  background-color: black;
  overflow: hidden; /* Prevent any logo overflow */
  transition: top 0.3s ease-in-out;
  z-index: 900;

  @media (max-width: 768px) {
    justify-content: space-between;
    height: 80px; /* Adjust for smaller screens */
  }
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Ensures vertical alignment of all elements */
  padding: 15px 20px;
  font-size: 0.7rem;
  text-transform: uppercase;
  position: fixed;
  top: ${({ isScrolled }) => (isScrolled ? "0" : "60px")};
  width: 100%;
  background-color: black;
  transition: top 0.3s ease-in-out;
  z-index: 1000;

  .left-links {
    display: flex;
    gap: 30px;
  }

  .right-content {
    margin-left: auto;
    display: flex;
    align-items: center; /* Ensures the cart icon aligns with text */
    gap: 15px;

    .cart-icon {
      font-size: 1.5rem;
      cursor: pointer;
      line-height: normal; /* Prevents added height from line height */
      padding: 0; /* Ensures no additional padding */
      margin: 0; /* Removes margin in case of default styles */
    }

    a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        color: gray;
      }
    }
  }

  @media (max-width: 768px) {
    display: none; /* Hide the bottom nav on mobile */
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  gap: 5px;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
    order: 1;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  position: relative;
  right: 20px;
  top: 4px;

  img {
    height: 160px; /* Adjusted to fit within TopNav */
    display: block;
    object-fit: contain; /* Ensures the logo scales properly */
  }

  @media (max-width: 768px) {
    height: 60px; /* Smaller logo for mobile */
    margin: 0 auto;
    order: 2;
    /* position: relative; */
    top: -50px !important;
    right: 0px;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  span {
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
  }

  @media (max-width: 768px) {
    order: 3;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  color: black;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  .close-button {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    cursor: pointer;
    align-self: flex-end;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 0px;
    margin-top: 10px;
  }

  a {
    color: black;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    transition: color 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: gray;
    }
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <NavbarContainer>
      {/* Background Overlay */}
      <BackgroundOverlay isScrolled={isScrolled} />

      <TopNav isScrolled={isScrolled}>
        {/* Hamburger Menu */}
        <Hamburger onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </Hamburger>

        {/* Logo */}
        <Logo>
          <Link to="/">
            <img src={vanishlogo} alt="Vanish Logo" />
          </Link>
        </Logo>

        {/* Shopping Cart Icon */}
        <NavIcons>
          <span role="img" aria-label="Shopping Cart">
            🛒
          </span>
        </NavIcons>
      </TopNav>

      <BottomNav isScrolled={isScrolled}>
        <div className="left-links">
          <a href="#collections">Shop</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="right-content">
          {isScrolled ? (
            <span className="cart-icon" role="img" aria-label="Shopping Cart">
              🛒
            </span>
          ) : (
            <Link to="/login">Account</Link>
          )}
        </div>
      </BottomNav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen}>
        <span className="close-button" onClick={toggleMenu}>
          ✕
        </span>
        <Link to="/shop" onClick={toggleMenu}>
          Shop
        </Link>
        <Link to="/contact" onClick={toggleMenu}>
          Contact
        </Link>
        <Link to="/login" onClick={toggleMenu}>
          Account
        </Link>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;

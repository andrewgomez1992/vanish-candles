import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
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

const TopNav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: ${({ isScrolled }) => (isScrolled ? "-100px" : "0")};
  height: 80px;
  background-color: black;
  transition: top 0.3s ease-in-out;
  z-index: 900;
`;

const Logo = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  img {
    height: 180px;
    display: block;
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
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 0.7rem;
  text-transform: uppercase;
  position: fixed;
  top: ${({ isScrolled }) => (isScrolled ? "0" : "80px")};
  width: 100%;
  background-color: black;
  transition: top 0.3s ease-in-out;
  z-index: 1000; /* Ensures it stays on top */

  .left-links {
    display: flex;
    gap: 30px;
  }

  .right-link {
    margin-left: auto;
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
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <NavbarContainer>
      <TopNav isScrolled={isScrolled}>
        <Logo>
          {/* Wrap the logo in a Link */}
          <Link to="/">
            <img src={vanishlogo} alt="Vanish Logo" />
          </Link>
        </Logo>
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
        <Link to="/login" className="right-link">
          Account
        </Link>
      </BottomNav>
    </NavbarContainer>
  );
};

export default Navbar;

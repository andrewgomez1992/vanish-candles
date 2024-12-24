import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import vanishlogo from "../assets/vanishlogo.png";
import { useCart } from "../context/CartContext";

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-family: "Arial", sans-serif;
  position: relative;
  z-index: 1000;
`;

const CartContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  .cart-icon {
    font-size: 1.5rem;
    color: white;
  }

  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    font-size: 0.8rem;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    order: 3;
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  background-color: black;
  z-index: 899;
  pointer-events: none;
  transition: height 0.3s ease-in-out;
  height: ${({ $isScrolled }) => ($isScrolled ? "50px" : "80px")};

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
  top: 0; /* Always stick to the top */
  height: 60px;
  background-color: black;
  z-index: 1000; /* Ensure it's above other elements */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Add subtle shadow for better visibility */

  @media (max-width: 768px) {
    justify-content: space-between;
    height: 80px; /* Slightly larger height for mobile */
  }
`;

const PageWrapper = styled.div`
  padding-top: 80px; /* Matches the navbar height to prevent overlap */
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  font-size: 0.7rem;
  text-transform: uppercase;
  position: fixed;
  top: ${({ $isScrolled }) => ($isScrolled ? "0" : "60px")};
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
    align-items: center;
    gap: 15px;

    a,
    .logout {
      color: white;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        color: gray;
      }
    }

    .admin-link {
      color: yellow;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) {
    display: none;
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
    height: 160px;
    display: block;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 60px;
    margin: 0 auto;
    order: 2;
    top: -50px !important;
    right: 0px;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: #000; /* Dark background for contrast */
  color: white;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Enable scrolling if content overflows */
  transition: left 0.3s ease-in-out;
  z-index: 1001; /* Ensure it's above all other elements */

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
    gap: 15px;
    margin-top: 20px;
  }

  a,
  .logout {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 10px 0;
    border-bottom: 1px solid #333;
    transition: color 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: #0378ff; /* Add hover effect for links */
    }
  }
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const navigate = useNavigate();
  const isAdmin = true; // Simulate admin login
  const isLoggedIn = true;

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

  const handleLogout = () => {
    navigate("/"); // Redirect to the home page
    if (isMenuOpen) {
      toggleMenu(); // Close the menu if it's open
    }
  };
  const handleShopClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false }); // Redirect to the landing page
      setTimeout(() => {
        scrollToShopSection();
      }, 100); // Wait for the page to load before scrolling
    } else {
      scrollToShopSection(); // Scroll if already on the landing page
    }

    if (isMenuOpen) {
      toggleMenu(); // Close the menu if it's open
    }
  };

  const scrollToShopSection = () => {
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      const yOffset = window.innerWidth > 768 ? -100 : -50; // Adjust offset for desktop and mobile
      const yPosition =
        shopSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  return (
    <NavbarContainer>
      <BackgroundOverlay $isScrolled={isScrolled} />
      <TopNav>
        <Hamburger onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </Hamburger>
        <Logo>
          <Link to="/">
            <img src={vanishlogo} alt="Vanish Logo" />
          </Link>
        </Logo>
        <CartContainer onClick={() => navigate("/cart")}>
          <span className="cart-icon" role="img" aria-label="Shopping Cart">
            🛒
          </span>
          {totalQuantity > 0 && (
            <motion.div
              className="cart-count"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              {totalQuantity}
            </motion.div>
          )}
        </CartContainer>
      </TopNav>
      <BottomNav $isScrolled={isScrolled}>
        <div className="left-links">
          <button onClick={handleShopClick}>Shop</button>
          <Link to="/contact">Contact</Link>
          {isAdmin && (
            <Link className="admin-link" to="/dashboard">
              Dashboard
            </Link>
          )}
        </div>
        <div className="right-content">
          <Link to={isLoggedIn ? "/account" : "/login"}>Account</Link>
          {isLoggedIn && (
            <span className="logout" onClick={handleLogout}>
              Log Out
            </span>
          )}
        </div>
      </BottomNav>
      <MobileMenu $isOpen={isMenuOpen}>
        <span className="close-button" onClick={toggleMenu}>
          ✕
        </span>
        <div className="menu-items">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              handleShopClick();
              toggleMenu();
            }}
          >
            Shop
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            Contact
          </Link>
          <Link to="/account" onClick={toggleMenu}>
            Account
          </Link>
          {isAdmin && (
            <Link className="admin-link" to="/dashboard" onClick={toggleMenu}>
              Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <span className="logout" onClick={() => handleLogout()}>
              Log Out
            </span>
          )}
        </div>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;

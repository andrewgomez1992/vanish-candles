import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import vanishlogo from "../assets/vanishlogo.png";
import { useCart } from "../context/useCart";
import { scrollToShopSection } from "../util/scrollToShopSection";
import { useAuth } from "../hooks/useAuth";

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
  position: absolute;
  width: 100%;
  top: ${({ $isScrolled }) => ($isScrolled ? "-100px" : "0")};
  height: 80px; /* Matches full TopNav height, including the logo */
  background-color: black;
  z-index: 1000; /* Ensure it's above other elements */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Add subtle shadow for better visibility */
  transition: top 0.3s ease-in-out; /* Smooth transition */

  @media (max-width: 768px) {
    position: fixed;
    justify-content: space-between;
    height: 80px; /* Matches mobile TopNav height */
    top: ${({ $isScrolled }) =>
      $isScrolled ? "-80px" : "0"}; /* Fully hides TopNav on mobile */
  }
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  font-size: 0.7rem;
  text-transform: uppercase;
  position: fixed;
  top: ${({ $isScrolled }) => ($isScrolled ? "0" : "80px")};
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
  background-color: #000;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: left 0.3s ease-in-out;
  z-index: 1001;

  button {
    border-bottom: 1px solid #333;
    margin-bottom: 10px;
    font-size: 1.2rem;

    &:hover {
      color: #3a3a3a;
    }
  }

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
    margin-top: 10px;
  }

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
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path, scrollToSection = false) => {
    if (scrollToSection) {
      if (window.location.pathname !== path) {
        navigate(path);
        setTimeout(() => scrollToShopSection(), 100);
      } else {
        scrollToShopSection();
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Directly navigate after logout
    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer>
      <BackgroundOverlay $isScrolled={isScrolled} />
      <TopNav>
        <Hamburger onClick={() => setIsMenuOpen((prev) => !prev)}>
          <div />
          <div />
          <div />
        </Hamburger>
        <Logo onClick={() => handleNavigation("/")}>
          <img src={vanishlogo} alt="Vanish Logo" />
        </Logo>
        <CartContainer onClick={() => handleNavigation("/cart")}>
          <span className="cart-icon" role="img" aria-label="Shopping Cart">
            🛒
          </span>
          <AnimatePresence>
            {totalQuantity > 0 && (
              <motion.div
                className="cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {totalQuantity}
              </motion.div>
            )}
          </AnimatePresence>
        </CartContainer>
      </TopNav>
      <BottomNav $isScrolled={isScrolled}>
        <div className="left-links">
          <button onClick={() => handleNavigation("/", true)}>Shop</button>
          <button onClick={() => handleNavigation("/contact")}>Contact</button>
          {isAdmin && (
            <button onClick={() => handleNavigation("/dashboard")}>
              Dashboard
            </button>
          )}
        </div>
        <div className="right-content">
          <button
            onClick={() => handleNavigation(isLoggedIn ? "/account" : "/login")}
          >
            Account
          </button>
          {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
        </div>
      </BottomNav>
      <Overlay $isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
      <MobileMenu $isOpen={isMenuOpen}>
        <span className="close-button" onClick={() => setIsMenuOpen(false)}>
          ✕
        </span>
        <div className="menu-items">
          <button onClick={() => handleNavigation("/", true)}>Shop</button>
          <button onClick={() => handleNavigation("/contact")}>Contact</button>
          <button
            onClick={() => handleNavigation(isLoggedIn ? "/account" : "/login")}
          >
            Account
          </button>
          {isAdmin && (
            <button onClick={() => handleNavigation("/dashboard")}>
              Dashboard
            </button>
          )}
          {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
        </div>
      </MobileMenu>
    </NavbarContainer>
  );
};

export default Navbar;

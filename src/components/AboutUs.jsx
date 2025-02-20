import "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const AboutUsWrapper = styled(motion.section)`
  position: relative;
  background-color: #f5f5f5;
  padding: 2rem;
  text-align: left;
  margin-top: -100px; /* Overlap with the hero section */
  z-index: 2;
  max-width: 1000px; /* Maximum width for wider screens */
  width: calc(100% - 40px); /* Ensure 20px margin on both sides */
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  min-height: 200px; /* Optional: Add a minimum height if needed */

  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem; /* Adjust spacing */
    color: #333;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.4; /* Reduce line-height for shorter content */
    margin-bottom: 1.5rem; /* Adjust spacing */
    color: #555;
  }

  button {
    padding: 8px 16px; /* Reduce button padding */
    font-size: 0.9rem; /* Slightly smaller button font size */
    background-color: black;
    color: white;
    border: none;
    border-radius: 0; /* No border radius */
    cursor: pointer;

    &:hover {
      background-color: gray;
    }
  }
`;

const AboutUs = () => {
  return (
    <AboutUsWrapper
      initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below
      animate={{ opacity: 1, y: 0 }} // Animate to visible and its position
      transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
    >
      <h2>What Makes Our Candles Special?</h2>
      <p>
        Welcome to Vanish Candles, where we create premium, chemical-free
        candles with a sleek, clean aesthetic. Our candles are designed to
        complement any space while promoting wellness with every flicker.
        Experience the warmth and calm of Vanish Candles—crafted to illuminate
        your moments.
      </p>
    </AboutUsWrapper>
  );
};

export default AboutUs;

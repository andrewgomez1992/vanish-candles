import "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const AboutUsWrapper = styled(motion.section)`
  position: relative;
  background-color: #fff;
  padding: 2rem;
  text-align: left;
  margin-top: -100px;
  z-index: 2;
  max-width: 1000px;
  width: calc(100% - 40px);
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  min-height: 200px;

  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 1.5rem;
    color: #555;
  }

  button {
    padding: 8px 16px;
    font-size: 0.9rem;
    background-color: black;
    color: white;
    border: none;
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

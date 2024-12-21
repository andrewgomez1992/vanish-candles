import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import candleBackground from "../assets/candlebackground.webp";
import candleBackground2 from "../assets/candlebackground2.webp";
import candleBackground3 from "../assets/candlebackground3.webp";

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Ensure smooth transitions without overflow */
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  button {
    background-color: white;
    color: black;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: gray;
      color: white;
    }
  }
`;

const Hero = () => {
  const backgrounds = [candleBackground, candleBackground2, candleBackground3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [backgrounds.length]);

  return (
    <HeroSection>
      <AnimatePresence>
        <ImageContainer
          key={currentIndex} // Use key to trigger animations on change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Smooth transition duration
          style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
        />
      </AnimatePresence>
      <Overlay />
      <HeroContent>
        {/* <h1>Shop All Our Candles</h1>
        <button>SHOP NOW</button> */}
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;

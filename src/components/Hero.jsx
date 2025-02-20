import  { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import candleBackground from "../assets/candlebackground.webp";
import candleBackground2 from "../assets/candlebackground2.webp";
import candleBackground3 from "../assets/candlebackground3.webp";

const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const ControlsWrapper = styled(motion.div)`
  position: absolute;
  bottom: 90px;
  left: 20px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 3;
`;

const ControlButton = styled.button`
  background: rgba(0, 0, 0, 0.8);
  border: none;
  color: white;
  font-size: 1rem;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 3px;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 1);
  }
`;

const Indicator = styled.span`
  color: white;
  font-size: 0.9rem;
`;

const Hero = () => {
  const backgrounds = [candleBackground, candleBackground2, candleBackground3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying, backgrounds.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + backgrounds.length) % backgrounds.length
    );
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <HeroSection>
      <AnimatePresence>
        <ImageContainer
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ backgroundImage: `url(${backgrounds[currentIndex]})` }}
        />
      </AnimatePresence>
      <Overlay />
      <ControlsWrapper
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Indicator>
          {currentIndex + 1}/{backgrounds.length}
        </Indicator>
        <ControlButton onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </ControlButton>
        <ControlButton onClick={handlePrevious}>←</ControlButton>
        <ControlButton onClick={handleNext}>→</ControlButton>
      </ControlsWrapper>
    </HeroSection>
  );
};

export default Hero;

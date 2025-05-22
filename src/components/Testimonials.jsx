import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../constants/testimonials";

const TestimonialSection = styled.section`
  background-color: #000;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  // font-family: "Pacifico", cursive !important;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-family: serif;
  color: #f5f5f5;
  text-transform: uppercase;
  letter-spacing: 4px;
`;

// A wrapper to position text & arrows
const CarouselWrapper = styled.div`
  position: relative;
  max-width: 700px;
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #f5f5f5;
  min-height: 120px; /* so it doesn’t jump if text is short */
  margin-bottom: 2rem;
  font-family: "Georgia", serif;
  padding: 0 1rem;

  .author {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #f5f5f5;
    text-align: center;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #f5f5f5;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #333;
  }

  &:focus {
    outline: none;
  }
`;

const ArrowLeft = styled(ArrowButton)`
  left: -30px;
`;

const ArrowRight = styled(ArrowButton)`
  right: -30px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Line = styled(motion.div)`
  width: 220px;
  height: 4px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
`;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Optional: auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <TestimonialSection>
      <HeaderWrapper>
        <Title>What They’re Saying</Title>
        <Line
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        />
      </HeaderWrapper>
      <CarouselWrapper>
        <AnimatePresence mode="wait">
          <TestimonialCard
            key={currentIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {testimonials[currentIndex].text}
            <div className="author">{testimonials[currentIndex].author}</div>
          </TestimonialCard>
        </AnimatePresence>

        {/* Arrows */}
        {testimonials.length > 1 && (
          <>
            <ArrowLeft onClick={handlePrev} aria-label="Previous Testimonial">
              &larr;
            </ArrowLeft>
            <ArrowRight onClick={handleNext} aria-label="Next Testimonial">
              &rarr;
            </ArrowRight>
          </>
        )}
      </CarouselWrapper>
    </TestimonialSection>
  );
};

export default Testimonials;

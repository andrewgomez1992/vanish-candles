import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHandshake, FaLeaf, FaHeart } from "react-icons/fa";

const PromiseSection = styled(motion.section)`
  background-color: #fff;
  color: #000;
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background-color: #f9f9f9;
  padding: 1.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #000;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const OurPromise = () => {
  const cards = [
    {
      icon: <FaHandshake />,
      title: "Personal Connection",
      text: "We cherish old-fashioned networking—meeting you in person, hearing your needs, and taking action. We believe real connections fuel our passion to craft candles that truly resonate with your lifestyle.",
    },
    {
      icon: <FaLeaf />,
      title: "Pure & Safe",
      text: "Our candles are created with only the purest, non-toxic ingredients. We believe that what you burn at home should be safe for your family, ensuring every flicker brings warmth without compromise.",
    },
    {
      icon: <FaHeart />,
      title: "Legacy of Care",
      text: "We’re committed to building lasting relationships and products that stand the test of time. Our promise is to provide you with something you love—crafted with care for both today and the generations to come.",
    },
  ];

  return (
    <PromiseSection
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SectionTitle>Our Promise</SectionTitle>
      <CardGrid>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <IconWrapper>{card.icon}</IconWrapper>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.text}</CardText>
          </Card>
        ))}
      </CardGrid>
    </PromiseSection>
  );
};

export default OurPromise;

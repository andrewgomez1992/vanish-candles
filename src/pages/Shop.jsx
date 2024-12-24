import React from "react";
import styled from "styled-components";
import AboutUs from "../components/AboutUs";
import Card from "../components/Card";
import { motion } from "framer-motion";

const ShopWrapper = styled.div`
  width: 100%;
  padding: 2rem 0; /* Add vertical padding to Shop */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; /* Consistent box-sizing */
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled(motion.h1)`
  font-family: "Pacifico", cursive !important; /* Cursive font */
  font-size: 2.5rem; /* Adjust size */
  color: #333; /* Header color */
  padding-top: 20px;
  text-align: center;
  width: 100%; /* Ensure it spans the width */
  letter-spacing: 4px;
`;

const Line = styled(motion.div)`
  width: 220px;
  height: 4px;
  background-color: #333;
  margin-bottom: 20px;
`;

const CardsContainer = styled.div`
  max-width: 1000px; /* Restrict width for the card grid */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
  gap: 20px; /* Consistent spacing between cards */
  padding: 2rem; /* Padding around the cards */

  @media (max-width: 900px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 cards per row on medium screens */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 card per row on small screens */
  }
`;

const cardData = [
  {
    id: "1",
    title: "Ironwood Collection",
    price: "$40.00",
    description: "A rich, earthy scent with wooden tones.",
  },
  {
    id: "2",
    title: "Forge Line Series",
    price: "$45.00",
    description: "Sophisticated fragrances with bold designs.",
  },
  {
    id: "3",
    title: "Heritage Craft Collection",
    price: "$50.00",
    description: "Timeless designs for a touch of tradition.",
  },
  {
    id: "4",
    title: "Stonefire Collection",
    price: "$55.00",
    description: "Earthy elegance with natural stone-inspired looks.",
  },
  {
    id: "5",
    title: "Obsidian Black Label",
    price: "$60.00",
    description: "Luxury candles with a bold black finish.",
  },
  {
    id: "6",
    title: "Titan Series",
    price: "$65.00",
    description: "Larger-than-life candles for bold fragrances.",
  },
];

const Shop = () => {
  return (
    <ShopWrapper>
      <AboutUs />
      <HeaderWrapper id="shop-section">
        <Header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our Collection
        </Header>
        <Line
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        />
      </HeaderWrapper>
      <CardsContainer>
        {cardData.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </CardsContainer>
    </ShopWrapper>
  );
};

export default Shop;

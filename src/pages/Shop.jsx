import React from "react";
import styled from "styled-components";
import AboutUs from "../components/AboutUs";
import Card from "../components/Card";

const ShopWrapper = styled.div`
  width: 100%;
  padding: 2rem 0; /* Add vertical padding to Shop */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; /* Consistent box-sizing */
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
      <CardsContainer>
        {cardData.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </CardsContainer>
    </ShopWrapper>
  );
};

export default Shop;

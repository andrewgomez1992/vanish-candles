import "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import candleBackground from "../assets/candlebackground.webp";

const CardWrapper = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 1.5rem; /* Restored padding */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 250px;
  border: 1px solid #ddd;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h3`
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const Price = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #666;
`;

const Card = ({ product }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/product/${product.id}`, { state: product }); // Pass the full product object as state
  };

  return (
    <CardWrapper onClick={handleViewClick}>
      <ImageWrapper>
        <img src={candleBackground} alt={product.title} />
      </ImageWrapper>
      <Title>{product.title}</Title>
      <Price>{product.price}</Price>
    </CardWrapper>
  );
};

export default Card;

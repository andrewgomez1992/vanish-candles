import { useState, useEffect } from "react";
import styled from "styled-components";
import AboutUs from "../components/AboutUs";
import Card from "../components/Card";
import { motion } from "framer-motion";
import candleBackground from "../assets/candlebackground.webp"; // ✅ backup image
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ShopWrapper = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled(motion.h1)`
  font-family: "Pacifico", cursive !important;
  font-size: 2.5rem;
  color: #333;
  padding-top: 20px;
  text-align: center;
  width: 100%;
  letter-spacing: 4px;
`;

const Line = styled(motion.div)`
  width: 220px;
  height: 4px;
  background-color: #333;
  margin-bottom: 20px;
`;

const CardsContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const backupImage = candleBackground; // ✅ Use imported image

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/products`);
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
        {products.map((product) => (
          <Card
            key={product.id}
            product={{
              id: product.id,
              title: product.name,
              price: `$${product.price.toFixed(2)}`,
              description: product.description,
              image: product.image_url || backupImage, // ✅ Always fallback correctly
            }}
          />
        ))}
      </CardsContainer>
    </ShopWrapper>
  );
};

export default Shop;

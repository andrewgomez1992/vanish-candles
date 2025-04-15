import { useState, useEffect } from "react";
import styled from "styled-components";
import AboutUs from "./AboutUs";
import Card from "./Card";
import { motion } from "framer-motion";
import candleBackground from "../assets/candlebackground.webp";
import { fakeProducts } from "../constants/fakeProducts";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ShopWrapper = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: #f5f5f5;
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
  gap: 10px;
  padding: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const backupImage = candleBackground;

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/products/all-products`
        );
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(fakeProducts);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts(fakeProducts);
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
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              product={{
                id: product.id,
                title: product.name,
                price: `$${product.price.toFixed(2)}`,
                description: product.description,
                image: product.image_url || backupImage,
              }}
            />
          </motion.div>
        ))}
      </CardsContainer>
    </ShopWrapper>
  );
};

export default Shop;

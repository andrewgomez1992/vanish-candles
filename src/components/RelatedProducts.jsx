import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import candleImage from "../assets/candlebackground3.webp";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const RelatedContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const RelatedTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const ProductCard = styled.div`
  position: relative;
  width: 200px;
  border: 1px solid #ddd;
  //   border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  /* Hover effects: subtle scale and shadow */
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  /* Position the "View Product" button and show on hover */
  &:hover .hover-overlay {
    opacity: 1;
    visibility: visible;
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #ddd;
  }

  .badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff4d4f; /* a red sale badge color */
    color: #fff;
    font-size: 0.8rem;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .product-info {
    padding: 10px;

    h3 {
      font-size: 1rem;
      color: #333;
      margin: 0 0 0.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .stars {
      color: #ffa500; /* gold star color */
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
    }

    p {
      font-size: 0.9rem;
      color: #555;
      margin: 0;
      margin-bottom: 0.3rem;
    }
  }

  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 180px; /* match the img height */
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .view-product-btn {
    background-color: #fff;
    color: #000;
    border: none;
    padding: 8px 16px;
    font-size: 0.9rem;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5px;

    &:hover {
      background-color: #eee;
    }
  }
`;

// eslint-disable-next-line react/prop-types
const RelatedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/products/all-products`
        );
        // Exclude current product
        const filtered = data.filter((p) => p.id !== currentProductId);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchAllProducts();
  }, [currentProductId]);

  if (!products.length) {
    return (
      <RelatedContainer>
        <RelatedTitle>You May Also Love</RelatedTitle>
        <p style={{ textAlign: "center" }}>No related products found.</p>
      </RelatedContainer>
    );
  }

  return (
    <RelatedContainer>
      <RelatedTitle>You May Also Love</RelatedTitle>
      <ProductList>
        {products.map((item) => {
          // Placeholder logic: if price < 30, show "Sale" badge
          const isSale = item.price < 30;
          // Placeholder star rating
          const starRating = "★★★★★".slice(
            0,
            Math.floor(Math.random() * 4) + 4
          );
          // e.g., random rating between 3 and 5 stars

          return (
            <ProductCard key={item.id}>
              {/* If "Sale" */}
              {isSale && <div className="badge">Sale</div>}

              <Link to={`/product/${item.id}`}>
                <img src={candleImage} alt={item.name} />
              </Link>

              {/* Hover overlay with "View Product" button */}
              <div className="hover-overlay">
                <Link to={`/product/${item.id}`}>
                  <button className="view-product-btn">View Product</button>
                </Link>
              </div>

              <div className="product-info">
                <h3 title={item.name}>{item.name}</h3>
                <div className="stars">{starRating}</div>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </ProductCard>
          );
        })}
      </ProductList>
    </RelatedContainer>
  );
};

export default RelatedProducts;

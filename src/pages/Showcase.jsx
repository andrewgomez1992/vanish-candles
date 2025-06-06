import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";
import Navbar from "../components/Navbar";

import candleBackground from "../assets/candlebackground.webp";
import candleBackground2 from "../assets/candlebackground2.webp";
import candleBackground3 from "../assets/candlebackground3.webp";

import { useCart } from "../context/useCart";
import RelatedProducts from "../components/RelatedProducts";
import { scrollToShopSection } from "../util/scrollToShopSection";
import { fakeProducts } from "../constants/fakeProducts";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

/* Page Wrapper: stacked (column) layout so RelatedProducts is below main product */
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

/* Main product section: row layout for image + details */
const ProductPageWrapper = styled.div`
  display: flex;
  padding-top: 100px;
  gap: 1rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 30px;
  }
`;

/* Image Section: place thumbnails on the left, main image on the right */
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;

  /* By default (desktop), thumbnails on the left, main image on the right */
  .thumbnails {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border: 1px solid #ddd;
      cursor: pointer;
      transition: border 0.2s;

      &:hover {
        border: 2px solid black;
      }
    }
  }

  .main-image {
    width: 100%;
    max-width: 500px;
    max-height: 400px;
    object-fit: cover;
    border: 1px solid #ddd;
  }

  /* --- MOBILE RESPONSIVE --- */
  @media (max-width: 998px) {
    /* Stack everything vertically */
    flex-direction: column;
    gap: 0rem;

    /* Ensure main image is on top */
    .main-image {
      order: 1;
      align-self: center; /* center it horizontally */
      max-height: 300px;
    }

    /* Thumbnails row below the main image */
    .thumbnails {
      order: 2;
      flex-direction: row;
      flex-wrap: nowrap; /* or wrap if you have many images */
      justify-content: left;
      gap: 0.5rem; /* smaller gap for mobile if you like */
      margin-top: 1rem; /* a little space below the main image */
    }
  }
`;

/* Details Section */
const DetailsSection = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  max-width: 600px;

  h1 {
    font-size: 1.5rem;
    color: #333;
  }

  .price {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.2rem;
    color: #000;
  }

  .shipping-info {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    color: #666;
  }

  .quantity-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 1.2rem;

    .quantity-label {
      margin-right: 0.7rem;
      font-size: 1rem;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      width: 140px;
      justify-content: space-between;

      button {
        background: none;
        border: none;
        padding: 0.2rem 1rem;
        cursor: pointer;
        font-size: 1.2rem;

        &:hover {
          background-color: #f0f0f0;
        }
      }

      input {
        width: 40px;
        text-align: center;
        border: none;
        font-size: 0.9rem;
      }
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 0.8rem;
      border: none;
      font-size: 0.9rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .add-to-cart {
      background-color: white;
      border: 1px solid black;
      color: black;

      &:hover {
        background-color: #f0f0f0;
      }
    }

    .buy-now {
      background-color: black;
      color: white;

      &:hover {
        background-color: #333;
      }
    }
  }

  .description {
    margin-top: 2rem;

    h2 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      color: #333;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.8;
      color: #555;
      margin-bottom: 1rem;
    }
  }
`;

const BackToShopLink = styled.span`
  display: block;
  text-align: center;
  margin: 2rem auto 0;
  font-size: 1.3rem;
  color: #333;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Showcase = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Thumbnails: static images
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = [candleBackground, candleBackground2, candleBackground3];

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component is mounted
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/products/search`, {
          params: { attribute: "id", value: id },
        });

        if (Array.isArray(data) && data.length > 0) {
          setProduct(data[0]);
        } else {
          // fallback to fake product
          const fallback = fakeProducts.find((item) => item.id === id);
          setProduct(fallback || null);
        }
      } catch (error) {
        console.error("❌ Error fetching product:", error);
        const fallback = fakeProducts.find((item) => item.id === id);
        setProduct(fallback || null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  if (!product) {
    return <PageWrapper>Product not found.</PageWrapper>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  const handleBackToShop = () => {
    // If user isn't on the homepage, navigate there first
    if (window.location.pathname !== "/") {
      navigate("/", { replace: false });
      // Small delay to ensure the homepage is rendered, then scroll
      setTimeout(() => {
        scrollToShopSection();
      }, 100);
    } else {
      // Already on home page
      scrollToShopSection();
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <ProductPageWrapper>
          {/* Image + Thumbnails on the left */}
          <ImageSection>
            <div className="thumbnails">
              {images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedIndex(idx)}
                  style={{
                    border:
                      selectedIndex === idx
                        ? "2px solid black"
                        : "1px solid #ddd",
                    cursor: "pointer",
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
            <img
              src={images[selectedIndex]}
              alt="Candle"
              className="main-image"
            />
          </ImageSection>

          {/* Product details on the right */}
          <DetailsSection>
            <h1>{product.name}</h1>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="shipping-info">Shipping calculated at checkout.</p>

            <div className="quantity-wrapper">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 1) {
                      setQuantity(value);
                    }
                  }}
                />
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <motion.button
                className="add-to-cart"
                onClick={() => handleAddToCart()}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy it Now
              </button>
            </div>

            <div className="description">
              <h2>Product Details</h2>
              <p>{product.description}</p>
            </div>
          </DetailsSection>
        </ProductPageWrapper>
        <RelatedProducts currentProductId={product.id} />
        <BackToShopLink onClick={handleBackToShop}>
          &larr; Back to Shop
        </BackToShopLink>
      </PageWrapper>
    </>
  );
};

export default Showcase;

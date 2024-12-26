import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import candleBackground from "../assets/candlebackground.webp";
import { useCart } from "../context/CartContext";

// Dummy product data
const dummyData = [
  {
    id: "1",
    title: "Ironwood Collection",
    price: "$40.00",
    description: "A rich, earthy scent with wooden tones.",
    extendedDescription: "Perfect for a cozy and rustic atmosphere.",
    thumbnails: [candleBackground, candleBackground, candleBackground],
  },
  {
    id: "2",
    title: "Forge Line Series",
    price: "$45.00",
    description: "Sophisticated fragrances with bold designs.",
    extendedDescription: "Ideal for those who enjoy a refined aesthetic.",
    thumbnails: [candleBackground, candleBackground, candleBackground],
  },
];

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

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

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .main-image {
    width: 100%;
    max-width: 500px;
    max-height: 400px;
    object-fit: cover;
    border: 1px solid #ddd;
    /* border-radius: 5px; */

    @media (max-width: 768px) {
      max-width: 360px; /* Reduced size for mobile */
      max-height: 320px; /* Reduced size for mobile */
    }
  }

  .thumbnails {
    display: flex;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        border: 2px solid black;
      }
    }
  }
`;

const DetailsSection = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  max-width: 600px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
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
    margin-bottom: 1.2rem;
    color: #666;
  }

  .quantity-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

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
      border-radius: 2px;
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

const Showcase = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [animateButton, setAnimateButton] = useState(false);

  // Use either location.state or fallback to dummyData
  const product = location.state || dummyData.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component is mounted
  }, []);

  // If no product is found, show an error message
  if (!product) {
    return <PageWrapper>Product not found.</PageWrapper>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAnimateButton(true);
    setTimeout(() => setAnimateButton(false), 300); // Reset animation state
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <ProductPageWrapper>
          <ImageSection>
            {product?.thumbnails && product?.thumbnails.length > 0 ? (
              <>
                <img
                  src={product.thumbnails[0]}
                  alt={product.title}
                  className="main-image"
                />
                <div className="thumbnails">
                  {product.thumbnails.map((thumbnail, index) => (
                    <img
                      key={index}
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <img
                src={candleBackground} // Fallback to a default image
                alt="Default product"
                className="main-image"
              />
            )}
          </ImageSection>

          <DetailsSection>
            <h1>{product?.title}</h1>
            <p className="price">{product?.price}</p>
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
                  onChange={handleQuantityChange}
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
                animate={animateButton ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Add to Cart
                {animateButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(0, 0, 0, 0.1)",
                      borderRadius: "inherit",
                      zIndex: -1,
                    }}
                  />
                )}
              </motion.button>
              <button className="buy-now">Buy it Now</button>
            </div>
            <div className="description">
              <h2>Product Details</h2>
              <p>{product?.description}</p>
              <p>{product?.extendedDescription}</p>
            </div>
          </DetailsSection>
        </ProductPageWrapper>
      </PageWrapper>
    </>
  );
};

export default Showcase;

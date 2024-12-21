import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import candleBackground from "../assets/candlebackground.webp";

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
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
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
    object-fit: contain;
    border: 1px solid #ddd;
    border-radius: 5px;
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
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .price {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #000;
  }

  .shipping-info {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #666;
  }

  .quantity-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    .quantity-label {
      margin-right: 1rem;
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
        padding: 0.5rem 1rem;
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
        font-size: 1rem;
      }
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 1rem;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 2px;
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
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      color: #333;
    }

    p {
      font-size: 1rem;
      line-height: 1.8;
      color: #555;
      margin-bottom: 1rem;
    }
  }
`;

const Showcase = () => {
  const { id } = useParams();
  const location = useLocation();

  // Use either location.state or fallback to dummyData
  const product = location.state || dummyData.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component is mounted
  }, []);

  // If no product is found, show an error message
  if (!product) {
    return <PageWrapper>Product not found.</PageWrapper>;
  }

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
                <button>-</button>
                <input type="number" min="1" defaultValue="1" />
                <button>+</button>
              </div>
            </div>
            <div className="action-buttons">
              <button className="add-to-cart">Add to Cart</button>
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

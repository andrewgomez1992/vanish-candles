import styled from "styled-components";
import candleBackground from "../../assets/candlebackground.webp";

const ProductCardStyled = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: calc(33.333% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #666;
  }

  span {
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 15px;
    font-size: 0.9rem;
    background-color: #b02a37;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #900c3f;
    }
  }
`;

const ProductCard = ({ product }) => {
  return (
    <ProductCardStyled>
      <img src={candleBackground} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <span>{product.price}</span>
      <button>Delete</button>
    </ProductCardStyled>
  );
};

export default ProductCard;

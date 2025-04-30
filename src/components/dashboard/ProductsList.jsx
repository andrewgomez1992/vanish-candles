import styled from "styled-components";
import ProductCard from "./ProductCard";

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  justify-content: center;
`;

const ProductsList = ({ products, onAddProduct }) => {
  return (
    <div>
      <div>
        <button onClick={onAddProduct}>Add Product</button>
      </div>
      <ProductList>
        {Array.isArray(products) &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ProductList>
    </div>
  );
};

export default ProductsList;

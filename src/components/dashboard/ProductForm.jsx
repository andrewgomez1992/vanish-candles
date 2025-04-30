import { useState } from "react";
import styled from "styled-components";

const ProductFormStyled = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input,
    textarea {
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    button {
      padding: 10px 15px;
      font-size: 1rem;
      background-color: #000000;
      color: white;
      border: none;
      cursor: pointer;

      &:hover {
        background-color: #333333;
      }
    }
  }
`;

const ProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending new product to API
    console.log(newProduct);
  };

  return (
    <ProductFormStyled>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <button type="submit">Add Product</button>
      </form>
    </ProductFormStyled>
  );
};

export default ProductForm;

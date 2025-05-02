import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ProductFormWrapper = styled.div`
  background-color: #fff;
  padding: 5px 20px 20px 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  border-radius: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const ProductForm = ({ setShowForm }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = { name, price, description, image_url };

    axios
      .post("/api/products/create", newProduct)
      .then(() => {
        alert("Product added successfully!");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      });
  };

  return (
    <ProductFormWrapper>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextArea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <SubmitButton type="submit">Add Product</SubmitButton>
      </form>
    </ProductFormWrapper>
  );
};

export default ProductForm;

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import ProductForm from "./ProductForm";

const ProductManagementWrapper = styled.div`
  padding: 5px 20px 20px 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const AddProductButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  useEffect(() => {
    // Fetch products from the API
    axios
      .get("/api/products/all") // Replace this with your correct API endpoint
      .then((response) => {
        // Ensure the response is an array
        setProducts(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
        setProducts([]); // Set to empty array if fetch fails
      });
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <ProductManagementWrapper>
      {/* Add Product Button */}
      <AddProductButton onClick={handleAddProduct}>
        Add New Product
      </AddProductButton>

      {/* Show the Product Form if `showForm` is true */}
      {showForm && <ProductForm setShowForm={setShowForm} />}

      <ProductTable>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.image_url} alt={product.name} width={50} />
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
    </ProductManagementWrapper>
  );
};

export default ProductManagement;

import { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import candleImage from "../../assets/candlebackground2.webp";
import Tooltip from "../common/Tooltip";
import ProductForm from "./ProductForm";

const ProductManagementWrapper = styled.div`
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto; // Added for mobile responsiveness
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;

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

  @media (max-width: 768px) {
    th,
    td {
      padding: 8px;
      font-size: 0.9rem;
    }
  }
`;

const ActionButtonWrapper = styled.div`
  display: inline-flex;
  gap: 10px;
  align-items: center;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 30px;
  height: 30px;
  min-width: auto;

  &:hover {
    background-color: #f0f0f0;
  }

  &.edit {
    border-color: #ff9800;
  }

  &.delete {
    border-color: #f44336;
  }

  svg {
    font-size: 18px;
  }
`;

const ProductManagement = ({ showForm, setShowForm }) => {
  // pull in real products
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Sandalwood Candle",
      price: 30,
      stock: 15,
      description: "A soothing sandalwood fragrance",
      image_url: candleImage,
    },
    {
      id: "2",
      name: "Lavender Candle",
      price: 25,
      stock: 5,
      description: "Relaxing lavender aroma",
      image_url: candleImage,
    },
    {
      id: "3",
      name: "Rose Candle",
      price: 20,
      stock: 8,
      description: "Sweet and floral rose fragrance",
      image_url: candleImage,
    },
    {
      id: "4",
      name: "Vanilla Candle",
      price: 35,
      stock: 3,
      description: "Warm vanilla scent",
      image_url: candleImage,
    },
    {
      id: "5",
      name: "Citrus Candle",
      price: 40,
      stock: 2,
      description: "Zesty citrus fragrance",
      image_url: candleImage,
    },
  ]);

  const handleEditProduct = (id) => {
    console.log("Edit product with id:", id);
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      setProducts((prevState) =>
        prevState.filter((product) => product.id !== id)
      );
      console.log("Product deleted:", id); // This will be delete logic
    }
  };

  return (
    <ProductManagementWrapper>
      {showForm && <ProductForm setShowForm={setShowForm} />}
      <ProductTable>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
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
              <td>
                <ActionButtonWrapper>
                  <Tooltip tooltipText="Edit Product">
                    <ActionButton
                      className="edit"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <FaEdit />
                    </ActionButton>
                  </Tooltip>

                  <Tooltip tooltipText="Delete Product">
                    <ActionButton
                      className="delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <FaTrashAlt />
                    </ActionButton>
                  </Tooltip>
                </ActionButtonWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
    </ProductManagementWrapper>
  );
};

export default ProductManagement;

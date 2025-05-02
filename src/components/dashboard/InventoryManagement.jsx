import { useState } from "react";
import styled from "styled-components";
import { FaSync, FaExclamationCircle, FaTrashAlt } from "react-icons/fa";
import Tooltip from "../common/Tooltip";

const InventoryManagementWrapper = styled.div`
  padding: 5px 20px 20px 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  border-radius: 8px;
  max-width: 100%;
  overflow-x: auto; /* Enables horizontal scrolling on small screens */
`;

const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 600px; /* Ensures that the table does not collapse too much */

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
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #f0f0f0;
  }

  &.restock {
    border-color: #4caf50;
  }

  &.low-stock {
    border-color: #ff9800;
  }

  &.deplete {
    border-color: #f44336;
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
  }
`;

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([
    { id: "1", name: "Sandalwood Candle", price: 30, stock: 15 },
    { id: "2", name: "Lavender Candle", price: 25, stock: 5 },
    { id: "3", name: "Rose Candle", price: 20, stock: 8 },
    { id: "4", name: "Vanilla Candle", price: 35, stock: 3 },
    { id: "5", name: "Citrus Candle", price: 40, stock: 2 },
  ]);

  const handleStockUpdate = (productId, newStock) => {
    setInventory((prevInventory) =>
      prevInventory.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
  };

  const handleLowStockAlert = (productId) => {
    const product = inventory.find((product) => product.id === productId);
    if (product.stock <= 5) {
      alert(`${product.name} is running low on stock!`);
    }
  };

  const handleDepletion = (productId) => {
    setInventory((prevInventory) =>
      prevInventory.map((product) =>
        product.id === productId ? { ...product, stock: 0 } : product
      )
    );
  };

  return (
    <InventoryManagementWrapper>
      <InventoryTable>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <ButtonWrapper>
                  <Tooltip tooltipText="Restock product by 5">
                    <ActionButton
                      className="restock"
                      onClick={() =>
                        handleStockUpdate(product.id, product.stock + 5)
                      }
                    >
                      <FaSync />
                    </ActionButton>
                  </Tooltip>

                  <Tooltip tooltipText="Check low stock">
                    <ActionButton
                      className="low-stock"
                      onClick={() => handleLowStockAlert(product.id)}
                    >
                      <FaExclamationCircle />
                    </ActionButton>
                  </Tooltip>

                  <Tooltip tooltipText="Deplete stock">
                    <ActionButton
                      className="deplete"
                      onClick={() => handleDepletion(product.id)}
                    >
                      <FaTrashAlt />
                    </ActionButton>
                  </Tooltip>
                </ButtonWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </InventoryTable>
    </InventoryManagementWrapper>
  );
};

export default InventoryManagement;

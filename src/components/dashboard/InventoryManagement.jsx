import { useState } from "react";
import styled from "styled-components";

const InventoryManagementWrapper = styled.div`
  padding: 5px 20px 20px 20px;
  background-color: white;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  border-radius: 8px;
`;

const InventoryTable = styled.table`
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

const UpdateButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }

  &.low-stock {
    background-color: #f0ad4e;
  }

  &.deplete {
    background-color: #d9534f;
  }
`;

const mockInventory = [
  { id: "1", name: "Sandalwood Candle", price: 30, stock: 15 },
  { id: "2", name: "Lavender Candle", price: 25, stock: 5 },
  { id: "3", name: "Rose Candle", price: 20, stock: 8 },
  { id: "4", name: "Vanilla Candle", price: 35, stock: 3 },
  { id: "5", name: "Citrus Candle", price: 40, stock: 2 },
];

const InventoryManagement = () => {
  const [inventory, setInventory] = useState(mockInventory);

  const handleStockUpdate = (productId, newStock) => {
    setInventory((prevInventory) =>
      prevInventory.map((product) =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
    // Simulate API call here
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
    // Simulate API call here
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
                <UpdateButton
                  onClick={() =>
                    handleStockUpdate(product.id, product.stock + 5)
                  }
                >
                  Restock by 5
                </UpdateButton>
                <UpdateButton
                  className="low-stock"
                  onClick={() => handleLowStockAlert(product.id)}
                >
                  Check Low Stock
                </UpdateButton>
                <UpdateButton
                  className="deplete"
                  onClick={() => handleDepletion(product.id)}
                >
                  Deplete Stock
                </UpdateButton>
              </td>
            </tr>
          ))}
        </tbody>
      </InventoryTable>
    </InventoryManagementWrapper>
  );
};

export default InventoryManagement;

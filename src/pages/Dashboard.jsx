import React, { useState } from "react";
import styled from "styled-components";
import candleBackground from "../assets/candlebackground.webp";

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const DashboardWrapper = styled.div`
  background-color: #f5f5f5;
  padding-top: 120px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding-top: 90px;
  }
`;

const Section = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 15px;
    color: #333;
  }
`;

const Summary = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .metric {
    flex: 1;
    padding: 20px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;

    h3 {
      margin-bottom: 10px;
      font-size: 1.2rem;
      color: #333;
    }

    p {
      font-size: 1rem;
      color: #000000;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack metrics vertically on mobile */
  }
`;

const TableContainer = styled.div`
  overflow-x: auto; /* Allow horizontal scrolling for the table */
  margin-top: 10px;

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      white-space: nowrap; /* Prevent text wrapping in table cells */
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f9f9f9;
    }

    .actions {
      display: flex;
      gap: 10px;

      button {
        padding: 5px 10px;
        border: none;
        cursor: pointer;

        &.delete {
          background-color: #b02a37;
          color: white;
        }
      }
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
  justify-content: center;
`;

const ProductCard = styled.div`
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: calc(33.333% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: 100%;
  }

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

const AddProductButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }
`;

const ProductForm = styled.div`
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
const AdminDashboard = () => {
  const products = [
    {
      id: "1",
      title: "Ironwood Collection",
      price: "$40.00",
      description: "A rich, earthy scent with wooden tones.",
    },
    {
      id: "2",
      title: "Forge Line Series",
      price: "$45.00",
      description: "Sophisticated fragrances with bold designs.",
    },
    {
      id: "3",
      title: "Heritage Craft Collection",
      price: "$50.00",
      description: "Timeless designs for a touch of tradition.",
    },
    {
      id: "4",
      title: "Stonefire Collection",
      price: "$55.00",
      description: "Earthy elegance with natural stone-inspired looks.",
    },
    {
      id: "5",
      title: "Obsidian Black Label",
      price: "$60.00",
      description: "Luxury candles with a bold black finish.",
    },
    {
      id: "6",
      title: "Titan Series",
      price: "$65.00",
      description: "Larger-than-life candles for bold fragrances.",
    },
  ];

  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Alice",
      total: "$50",
      date: "2024-12-20",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Bob",
      total: "$75",
      date: "2024-12-18",
      status: "Completed",
    },
  ]);

  const [productList, setProductList] = useState(products);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
  });

  const handleOrderAction = (id, action) => {
    if (action === "delete") {
      setOrders(orders.filter((order) => order.id !== id));
    }
  };

  const handleDeleteProduct = (id) => {
    setProductList((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newProduct.title && newProduct.price && newProduct.description) {
      setProductList([
        ...productList,
        { ...newProduct, id: Date.now().toString() },
      ]);
      setNewProduct({ id: "", title: "", price: "", description: "" });
      setShowForm(false);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <Summary>
          <div className="metric">
            <h3>Total Sales</h3>
            <p>$125</p>
          </div>
          <div className="metric">
            <h3>Total Orders</h3>
            <p>50</p>
          </div>
          <div className="metric">
            <h3>Active Products</h3>
            <p>{productList.length}</p>
          </div>
        </Summary>

        <Section>
          <h2>Orders</h2>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.total}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td className="actions">
                      <button
                        className="delete"
                        onClick={() => handleOrderAction(order.id, "delete")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Section>

        <Section>
          <TitleContainer>
            <h2>Products</h2>
            <AddProductButton onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add Product"}
            </AddProductButton>
          </TitleContainer>
          {showForm && (
            <ProductForm>
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
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
                <button type="submit">Add Product</button>
              </form>
            </ProductForm>
          )}
          <ProductList>
            {productList.map((product) => (
              <ProductCard key={product.id}>
                <img src={candleBackground} alt={product.title} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <span>{product.price}</span>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </ProductCard>
            ))}
          </ProductList>
        </Section>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default AdminDashboard;

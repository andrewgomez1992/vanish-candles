import { useEffect, useState } from "react";
import axios from "axios";
import Metrics from "../components/dashboard/Metrics";
import OrdersTable from "../components/dashboard/OrdersTable";
import ProductsList from "../components/dashboard/ProductsList";
import ProductForm from "../components/dashboard/ProductForm";
import styled from "styled-components";

const DashboardWrapper = styled.div`
  background-color: #f5f5f5;
  padding-top: 130px;
  min-height: 100vh;
`;

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);

  useEffect(() => {
    // Fetch orders from the API
    axios
      .get("/api/orders")
      .then((response) => {
        const fetchedOrders = Array.isArray(response.data) ? response.data : [];
        setOrders(fetchedOrders); // Store orders
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]); // Fallback to an empty array if there's an error
      });

    // Fetch products from the API
    axios
      .get("/api/products")
      .then((response) => {
        const fetchedProducts = Array.isArray(response.data)
          ? response.data
          : [];
        setProducts(fetchedProducts); // Store products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to an empty array if there's an error
      });
  }, []);

  console.log("orders", orders);
  console.log("products", products);

  return (
    <DashboardWrapper>
      <DashboardContainer>
        {/* Metrics Section */}
        <Metrics orders={orders} products={products} />

        {/* Orders Section */}
        <OrdersTable orders={orders} />

        {/* Products Section */}
        <ProductsList
          products={products}
          onAddProduct={() => setShowProductForm(!showProductForm)}
        />

        {/* Product Form */}
        {showProductForm && <ProductForm />}
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default AdminDashboard;

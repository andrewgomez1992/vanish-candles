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

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
`;

const LoadingMessage = styled.div`
  padding: 20px;
  background-color: #fff3cd;
  color: #856404;
  border-radius: 5px;
`;

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [productsError, setProductsError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Access the env variable for API base URL

  useEffect(() => {
    setLoading(true);

    // Fetch orders from the API using the correct endpoint and environment variable
    axios
      .get(`${API_BASE_URL}/orders/all`) // Using the /orders/all endpoint for admin
      .then((response) => {
        setOrders(Array.isArray(response.data) ? response.data : []);
        setOrdersError(null); // Reset error if successful
      })
      .catch((error) => {
        console.log("error in dashboard orders", error);
        setOrdersError("Failed to load orders. Please try again later.");
        setOrders([]);
      });

    // Fetch products from the API using the correct endpoint and environment variable
    axios
      .get(`${API_BASE_URL}/products/all`) // Using the /products/all endpoint for admin
      .then((response) => {
        setProducts(Array.isArray(response.data) ? response.data : []);
        setProductsError(null); // Reset error if successful
      })
      .catch((error) => {
        console.log("error in dashboard products", error);
        setProductsError("Failed to load products. Please try again later.");
        setProducts([]);
      })
      .finally(() => setLoading(false)); // Set loading to false after both fetches are done
  }, [API_BASE_URL]);

  return (
    <DashboardWrapper>
      <DashboardContainer>
        {loading && (
          <LoadingMessage>Loading data, please wait...</LoadingMessage>
        )}

        {/* Error handling for orders */}
        {ordersError && <ErrorMessage>{ordersError}</ErrorMessage>}

        {/* Error handling for products */}
        {productsError && <ErrorMessage>{productsError}</ErrorMessage>}

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

export default Dashboard;

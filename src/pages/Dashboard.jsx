import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

import ProductManagement from "../components/dashboard/ProductManagement";
import OrderManagement from "../components/dashboard/OrderManagement";
import UserManagement from "../components/dashboard/UserManagement";
import InventoryManagement from "../components/dashboard/InventoryManagement";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 120px 20px 20px;
  @media (max-width: 768px) {
    padding: 80px 20px 20px;
  }
`;

const DashboardHeading = styled.h1`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff;
  color: #333;
  max-width: 1200px;
  margin: 20px auto 0;
`;

const DashboardInner = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 20px auto 0;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SidebarItem = styled.li`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  &:hover {
    background-color: #f5f5f5;
  }
  &.active {
    font-weight: bold;
    background-color: #f5f5f5;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddProductButton = styled.button`
  padding: 8px 20px;
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #333;
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 15px;
  }
`;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showForm, setShowForm] = useState(false); // Managing the form visibility
  const { firstName } = useAuth(); // Get firstName from the useAuth hook

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <DashboardContainer>
      <DashboardHeading>Hey {firstName}!</DashboardHeading>
      <DashboardInner>
        <Sidebar>
          <SidebarList>
            {["users", "products", "orders", "inventory"].map((tab) => (
              <SidebarItem
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, " ")}
              </SidebarItem>
            ))}
          </SidebarList>
        </Sidebar>

        <ContentArea>
          {activeTab === "users" && (
            <>
              <h2>Users</h2>
              <UserManagement />
            </>
          )}

          {activeTab === "products" && (
            <>
              <HeaderWrapper>
                <h2>Products</h2>
                <AddProductButton onClick={() => setShowForm((prev) => !prev)}>
                  Add Product
                </AddProductButton>
              </HeaderWrapper>
              <ProductManagement
                showForm={showForm}
                setShowForm={setShowForm}
              />
            </>
          )}

          {activeTab === "orders" && (
            <>
              <h2>Orders</h2>
              <OrderManagement />
            </>
          )}

          {activeTab === "inventory" && (
            <>
              <h2>Inventory</h2>
              <InventoryManagement />
            </>
          )}
        </ContentArea>
      </DashboardInner>
    </DashboardContainer>
  );
};

export default Dashboard;

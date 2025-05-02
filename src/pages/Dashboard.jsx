import { useState, useEffect } from "react";
import styled from "styled-components";
import ProductManagement from "../components/dashboard/ProductManagement";
import OrderManagement from "../components/dashboard/OrderManagement";
import UserManagement from "../components/dashboard/UserManagement";
import InventoryManagement from "../components/dashboard/InventoryManagement";
// import NotificationPanel from "../components/dashboard/NotificationPanel";

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
  height: 500px;
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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("user-management");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <DashboardContainer>
      <DashboardHeading>Admin Dashboard</DashboardHeading>
      <DashboardInner>
        <Sidebar>
          <SidebarList>
            {[
              "user-management",
              "product-management",
              "order-management",
              "inventory-management",
            ].map((tab) => (
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
          {activeTab === "user-management" && (
            <>
              <h2>User Management</h2>
              <UserManagement />
            </>
          )}

          {activeTab === "product-management" && (
            <>
              <h2>Product Management</h2>
              <ProductManagement />
            </>
          )}

          {activeTab === "order-management" && (
            <>
              <h2>Order Management</h2>
              <OrderManagement />
            </>
          )}

          {activeTab === "inventory-management" && (
            <>
              <h2>Inventory Management</h2>
              <InventoryManagement />
            </>
          )}
        </ContentArea>
      </DashboardInner>
    </DashboardContainer>
  );
};

export default Dashboard;

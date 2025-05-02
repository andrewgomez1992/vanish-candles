import { useEffect, useState } from "react";
import styled from "styled-components";
import UserManagement from "../components/dashboard/UserManagement";
// Other components that are needed
import ProductManagement from "../components/dashboard/ProductManagement";
// import OrderManagement from "../components/dashboard/OrderManagement";
// import InventoryManagement from "../components/dashboard/InventoryManagement";
// import NotificationPanel from "../components/dashboard/NotificationPanel";

const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
  margin-top: 120px;
  @media (max-width: 768px) {
    margin-top: 80px;
  }
`;

const Header = styled.header`
  background-color: #000;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const Sidebar = styled.aside`
  background-color: #fff;
  color: #333;
  width: 290px;
  padding: 20px;
  z-index: 5;
  box-shadow: 2px 0px 15px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #ddd;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 15px;
  }

  a {
    color: #333;
    text-decoration: none;
    font-size: 1.1rem;
    display: block;
    padding: 10px 15px;
    font-weight: 500;
  }

  a:hover {
    background-color: rgb(237, 237, 237);
  }

  a.selected {
    color: #333;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    margin-top: 0;
  }
`;

// Main Content Area
const MainContent = styled.main`
  // margin-left: 270px;
  padding: 20px;
  flex-grow: 1;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 70px;
  }
`;

// Section Layout for each part of the Dashboard
const DashboardSection = styled.section`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

// Section Heading
const SectionHeading = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("user-management");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedComponent]);

  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <DashboardWrapper>
      <Header>Vanishing Candles Admin Dashboard</Header>

      {/* Smaller Sidebar */}
      <Sidebar>
        <ul>
          <li>
            <a
              href="#user-management"
              onClick={() => handleSelectComponent("user-management")}
              className={
                selectedComponent === "user-management" ? "selected" : ""
              }
            >
              User Management
            </a>
          </li>
          {/* Other sections commented out for now */}
          <li>
            <a
              href="#product-management"
              onClick={() => handleSelectComponent("product-management")}
              className={
                selectedComponent === "product-management" ? "selected" : ""
              }
            >
              Product Management
            </a>
          </li>
          {/* <li>
            <a
              href="#order-management"
              onClick={() => handleSelectComponent("order-management")}
              className={
                selectedComponent === "order-management" ? "selected" : ""
              }
            >
              Order Management
            </a>
          </li> */}
          {/* <li>
            <a
              href="#inventory-management"
              onClick={() => handleSelectComponent("inventory-management")}
              className={
                selectedComponent === "inventory-management" ? "selected" : ""
              }
            >
              Inventory Management
            </a>
          </li> */}
        </ul>
      </Sidebar>

      {/* Main Content */}
      <MainContent>
        {/* Notification Panel (Optional for now) */}
        {/* <NotificationPanel /> */}

        {/* User Management Section */}
        {selectedComponent === "user-management" && (
          <DashboardSection id="user-management">
            <SectionHeading>User Management</SectionHeading>
            <UserManagement />
          </DashboardSection>
        )}

        {/* Other Sections (Commented for now) */}
        {selectedComponent === "product-management" && (
          <DashboardSection id="product-management">
            <SectionHeading>Product Management</SectionHeading>
            <ProductManagement />
          </DashboardSection>
        )}

        {/* {selectedComponent === "order-management" && (
          <DashboardSection id="order-management">
            <SectionHeading>Order Management</SectionHeading>
            <OrderManagement />
          </DashboardSection>
        )} */}
        {/* 
        {selectedComponent === "inventory-management" && (
          <DashboardSection id="inventory-management">
            <SectionHeading>Inventory Management</SectionHeading>
            <InventoryManagement />
          </DashboardSection>
        )} */}
      </MainContent>
    </DashboardWrapper>
  );
};

export default Dashboard;

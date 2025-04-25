import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useAddresses } from "../hooks/useAddresses";
import AddressList from "../components/addresses/AddressList";

const AccountContainer = styled.div`
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 120px 20px 20px;
  @media (max-width: 768px) {
    padding: 80px 20px 20px;
  }
`;

const AccountHeading = styled.h1`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff;
  color: #333;
  max-width: 1200px;
  margin: 20px auto 0;
`;

const AccountInner = styled.div`
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

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { userEmail } = useAuth();
  const { addresses, error, addAddress, updateAddress, deleteAddress } =
    useAddresses();

  return (
    <AccountContainer>
      <AccountHeading>My Account</AccountHeading>
      <AccountInner>
        <Sidebar>
          <SidebarList>
            {["overview", "orders", "addresses", "account"].map((tab) => (
              <SidebarItem
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </SidebarItem>
            ))}
          </SidebarList>
        </Sidebar>
        <ContentArea>
          {activeTab === "overview" && (
            <>
              <h2>Welcome, {userEmail || "Guest"}!</h2>
              <p>Use the sidebar to manage your profile and addresses.</p>
            </>
          )}

          {activeTab === "orders" && <h2>Order History</h2>}

          {activeTab === "addresses" && (
            <>
              <h2>Your Addresses</h2>
              {error && <p style={{ color: "red" }}>{error.toString()}</p>}
              <AddressList
                addresses={addresses}
                onAdd={addAddress}
                onUpdate={updateAddress}
                onDelete={deleteAddress}
              />
            </>
          )}

          {activeTab === "account" && (
            <>
              <h2>Account Info</h2>
              <p>
                <strong>Email:</strong> {userEmail}
              </p>
            </>
          )}
        </ContentArea>
      </AccountInner>
    </AccountContainer>
  );
};

export default AccountPage;

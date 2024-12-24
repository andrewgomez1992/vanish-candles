import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AccountWrapper = styled.div`
  padding: 150px 20px 20px; /* Top padding for visibility */
  background-color: #f9f9f9;
  min-height: 100vh; /* Ensure full-page height */
`;

const AccountSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;

  .card {
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  .header {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .link {
    color: blue;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AccountPage = () => {
  return (
    <AccountWrapper>
      <AccountSection>
        <div className="card">
          <div className="header">Order History</div>
          <p>You haven't placed any orders yet.</p>
        </div>
        <div className="card">
          <div className="header">Account Details</div>
          <p>John Doe</p>
          <p>123 Main Street</p>
          <p>City, State, ZIP</p>
          <p>United States</p>
          <Link className="link" to="/account/addresses">
            View Addresses (0)
          </Link>
        </div>
      </AccountSection>
    </AccountWrapper>
  );
};

export default AccountPage;

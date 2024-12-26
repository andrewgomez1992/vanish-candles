import React, { useState } from "react";
import styled from "styled-components";

const AccountWrapper = styled.div`
  padding: 150px 20px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 20px 20px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;

    .card {
      max-width: 100%;
    }
  }
`;

const AddressList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AddressCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .address-details {
    flex: 1;
    margin-right: 10px;

    .default {
      font-weight: bold;
      margin-bottom: 5px;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 5px;

    button {
      border: none;
      background-color: transparent;
      color: blue;
      cursor: pointer;
      text-align: left;

      &:hover {
        text-decoration: underline;
      }

      &.delete {
        color: red;
      }

      &.set-default {
        color: green;
        font-weight: bold;
      }
    }
  }
`;

const AddAddressSection = styled.div`
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;

      button {
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        cursor: pointer;
      }

      .save {
        background-color: #000;
        color: white;

        &:hover {
          background-color: #333;
        }
      }

      .cancel {
        background-color: #ddd;
        color: black;

        &:hover {
          background-color: #bbb;
        }
      }
    }
  }
`;

const WarningMessage = styled.div`
  position: relative;
  color: red;
  background-color: #ffe6e6;
  padding: 10px;
  border: 1px solid red;
  text-align: center;
  margin-bottom: 15px;
  font-size: 1rem;

  .close-button {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    color: red;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: darkred;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 15px 40px 15px 15px;
    text-align: left;
  }
`;

const AccountPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "2050 Esther Drive",
      city: "Modesto",
      state: "CA",
      zip: "95350",
      country: "United States",
      isDefault: true,
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    id: null,
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });
  const [warningMessage, setWarningMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    const exists = addresses.find(
      (addr) =>
        addr.name === currentAddress.name &&
        addr.street === currentAddress.street &&
        addr.city === currentAddress.city &&
        addr.state === currentAddress.state &&
        addr.zip === currentAddress.zip &&
        addr.country === currentAddress.country
    );

    if (exists && currentAddress.id === null) {
      setWarningMessage("This address already exists.");
      return;
    }

    if (currentAddress.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    if (currentAddress.id !== null) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === currentAddress.id ? { ...currentAddress } : addr
        )
      );
    } else {
      setAddresses((prev) => [...prev, { ...currentAddress, id: Date.now() }]);
    }

    setIsAdding(false);
    setCurrentAddress({
      id: null,
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setIsAdding(true);
    setCurrentAddress({ ...address });
  };

  const handleDelete = (id) => {
    if (addresses.length === 1) {
      setWarningMessage("You must have at least one address.");
      return;
    }

    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  return (
    <AccountWrapper>
      <AccountSection>
        <div className="card">
          <div className="header">Order History</div>
          <p>You haven't placed any orders yet.</p>
        </div>
        <div className="card">
          <div className="header">Addresses</div>
          {warningMessage && (
            <WarningMessage>
              <button
                className="close-button"
                onClick={() => setWarningMessage("")}
                aria-label="Close"
              >
                &times;
              </button>
              {warningMessage}
            </WarningMessage>
          )}
          <AddressList>
            {addresses.map((address) => (
              <AddressCard key={address.id}>
                <div className="address-details">
                  <p className="default">
                    {address.isDefault ? "Default Address: " : ""}
                    {address.name}
                  </p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(address)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className={address.isDefault ? "set-default" : ""}
                  >
                    {address.isDefault ? "Default" : "Set Default"}
                  </button>
                </div>
              </AddressCard>
            ))}
          </AddressList>
          <button
            onClick={() => setIsAdding(true)}
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Add New Address
          </button>
        </div>
      </AccountSection>

      {isAdding && (
        <AddAddressSection>
          <form onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Full Name"
              value={currentAddress.name}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={currentAddress.street}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, street: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="City"
              value={currentAddress.city}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, city: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="State"
              value={currentAddress.state}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, state: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={currentAddress.zip}
              onChange={(e) =>
                setCurrentAddress({ ...currentAddress, zip: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={currentAddress.country}
              onChange={(e) =>
                setCurrentAddress({
                  ...currentAddress,
                  country: e.target.value,
                })
              }
              required
            />
            <div className="button-group">
              <button type="submit" className="save">
                Save
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </AddAddressSection>
      )}
    </AccountWrapper>
  );
};

export default AccountPage;

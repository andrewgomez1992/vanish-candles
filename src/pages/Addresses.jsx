import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 150px 20px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 100px 20px 20px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const AddressCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;

  .default {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    a {
      color: blue;
      cursor: pointer;
      text-decoration: underline;
    }

    .delete {
      color: red;
      cursor: pointer;
    }
  }
`;

const AddButton = styled.button`
  display: block;
  margin: 20px auto 0;
  padding: 15px 20px;
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  color: white;
  background-color: #000;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #333;
  }
`;

const FormContainer = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #fff;

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
      gap: 15px; /* Space between buttons */
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
  border-radius: 5px;
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
    font-size: 0.9rem; /* Slightly smaller text for mobile */
    padding: 15px 40px 15px 15px; /* Add padding to leave space for the X */
    text-align: left; /* Align text to the left */
  }
`;

const Addresses = () => {
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

  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");

  const addNewAddress = () => {
    setIsEditing(true);
    setCurrentAddress({
      id: Date.now(),
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      isDefault: false,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (currentAddress.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => {
      const exists = prev.find((addr) => addr.id === currentAddress.id);
      if (exists) {
        return prev.map((addr) =>
          addr.id === currentAddress.id ? currentAddress : addr
        );
      }
      return [...prev, currentAddress];
    });

    setIsEditing(false);
    setCurrentAddress(null);
  };

  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddress({ ...address });
  };

  const handleDelete = (id) => {
    if (addresses.length === 1) {
      setWarningMessage(
        "You must have at least one address. Please add a new address before deleting this one."
      );
      return;
    }

    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== id)
    );
  };
  return (
    <Wrapper>
      <Container>
        <Header>Your Addresses</Header>
        {isEditing ? (
          <FormContainer>
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
                  setCurrentAddress({
                    ...currentAddress,
                    street: e.target.value,
                  })
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
                  setCurrentAddress({
                    ...currentAddress,
                    state: e.target.value,
                  })
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
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </FormContainer>
        ) : (
          <>
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
            {addresses.map((address) => (
              <AddressCard key={address.id}>
                <p className="default">
                  {address.isDefault ? "Default " : ""} {address.name}
                </p>
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
                <p>{address.country}</p>
                <div className="actions">
                  <a onClick={() => handleEdit(address)}>Edit</a>
                  <a
                    className="delete"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </a>
                </div>
              </AddressCard>
            ))}
            <AddButton onClick={addNewAddress}>Add a New Address</AddButton>
          </>
        )}
        <a href="/account" style={{ display: "block", marginTop: "20px" }}>
          ← Return
        </a>
      </Container>
    </Wrapper>
  );
};

export default Addresses;

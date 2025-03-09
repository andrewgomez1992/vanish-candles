import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// List of US States
const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

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

    input,
    select {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
    }

    .error-message {
      color: red;
      font-size: 0.9rem;
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

const OrderList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  .order-id {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .total {
    color: #222;
    font-size: 1rem;
  }
  .status {
    font-size: 0.9rem;
    font-weight: bold;
    color: green;
  }
`;

// Validation Schema
const addressSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(
      /^[A-Za-z\s'-]+$/,
      "First name must contain only letters, spaces, apostrophes, or hyphens"
    )
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  last_name: Yup.string()
    .matches(
      /^[A-Za-z\s'-]+$/,
      "Last name must contain only letters, spaces, apostrophes, or hyphens"
    )
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  street: Yup.string()
    .min(5, "Street address is too short")
    .required("Street address is required"),
  city: Yup.string()
    .min(2, "City name is too short")
    .required("City is required"),
  state: Yup.string()
    .oneOf(usStates, "Select a valid state")
    .required("State is required"),
  zip: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "ZIP code must be a valid US ZIP code")
    .required("ZIP code is required"),
  isDefault: Yup.boolean(),
});

const AccountPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [orders, setOrders] = useState([]);
  const { userEmail } = useAuth();

  // ✅ Fetch Orders for Logged-in User
  useEffect(() => {
    if (!userEmail) return;
    axios
      .get(`${API_BASE_URL}/orders/email/${userEmail}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [userEmail]);

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    },
  });

  const onSubmit = (data) => {
    // Check for duplicate addresses
    const exists = addresses.find(
      (addr) =>
        addr.first_name.toLowerCase() === data.first_name.toLowerCase() &&
        addr.last_name.toLowerCase() === data.last_name.toLowerCase() &&
        addr.street.toLowerCase() === data.street.toLowerCase() &&
        addr.city.toLowerCase() === data.city.toLowerCase() &&
        addr.state.toLowerCase() === data.state.toLowerCase() &&
        addr.zip === data.zip
    );

    if (exists && editingAddressId === null) {
      setWarningMessage("This address already exists.");
      return;
    }

    // If setting as default, unset other default addresses
    if (data.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    if (editingAddressId !== null) {
      // Editing an existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddressId ? { ...data, id: addr.id } : addr
        )
      );
      setEditingAddressId(null);
    } else {
      // Adding a new address
      setAddresses((prev) => [
        ...prev,
        { ...data, id: Date.now() }, // Using Date.now() for unique ID
      ]);
    }

    setIsAdding(false);
    reset();
  };

  const handleEdit = (address) => {
    setIsAdding(true);
    setEditingAddressId(address.id);
    reset(address);
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
        {/* ✅ Order History Section */}
        <div className="card">
          <div className="header">Order History</div>
          {orders.length > 0 ? (
            <OrderList>
              {orders.map((order) => (
                <OrderCard key={order.id}>
                  <p className="order-id">Order ID: {order.id}</p>
                  <p className="total">Total: ${order.total_price}</p>
                  <p className="status">
                    Status: {order.status || "Processing"}
                  </p>
                </OrderCard>
              ))}
            </OrderList>
          ) : (
            <p>No orders found.</p>
          )}
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
                  {address.isDefault && (
                    <p className="default">Default Address:</p>
                  )}
                  <p>
                    {address.first_name} {address.last_name}
                  </p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>United States</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(address)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="set-default"
                    >
                      Set Default
                    </button>
                  )}
                  {address.isDefault && (
                    <button className="set-default" disabled>
                      Default
                    </button>
                  )}
                </div>
              </AddressCard>
            ))}
          </AddressList>
          <button
            onClick={() => {
              setIsAdding(true);
              setEditingAddressId(null);
              reset();
            }}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name")}
            />
            {errors.first_name && (
              <span className="error-message">{errors.first_name.message}</span>
            )}

            <input
              type="text"
              placeholder="Last Name"
              {...register("last_name")}
            />
            {errors.last_name && (
              <span className="error-message">{errors.last_name.message}</span>
            )}

            <input
              type="text"
              placeholder="Street Address"
              {...register("street")}
            />
            {errors.street && (
              <span className="error-message">{errors.street.message}</span>
            )}

            <input type="text" placeholder="City" {...register("city")} />
            {errors.city && (
              <span className="error-message">{errors.city.message}</span>
            )}

            <select {...register("state")}>
              <option value="">Select State</option>
              {usStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="error-message">{errors.state.message}</span>
            )}

            <input type="text" placeholder="ZIP Code" {...register("zip")} />
            {errors.zip && (
              <span className="error-message">{errors.zip.message}</span>
            )}

            <label>
              <input type="checkbox" {...register("isDefault")} /> Set as
              default address
            </label>

            <div className="button-group">
              <button type="submit" className="save">
                Save
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  setIsAdding(false);
                  setEditingAddressId(null);
                  reset();
                }}
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

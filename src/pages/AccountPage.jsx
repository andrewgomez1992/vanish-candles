import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usStates } from "../constants/usStates";
import { useAuth } from "../hooks/useAuth";

// export all logic into components etc - take Landing.jsx for example

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
  margin: 0 auto;
  margin-top: 20px;
`;

const AccountInner = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
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

/* Accordion styles for Orders */
const AccordionItem = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const AccordionHeader = styled.div`
  padding: 10px 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: #333;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.isOpen ? "150px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #fff;
  padding: ${(props) => (props.isOpen ? "10px 15px" : "0 15px")};
`;

/* Address Card */
const AddressCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .address-details {
    flex: 1;
    margin-right: 10px;

    p {
      margin: 2px 0;
    }
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
      cursor: pointer;
      font-size: 0.9rem;

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
`;

/* Add/Edit Address Form Section */
const AddAddressSection = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    select {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
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
        color: #fff;

        &:hover {
          background-color: #333;
        }
      }

      .cancel {
        background-color: #ddd;
        color: #000;

        &:hover {
          background-color: #bbb;
        }
      }
    }
  }
`;

/* ------------------ Validation Schema ------------------ */
// ISOLATE SCHEMA
const addressSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, or hyphens")
    .min(2, "Minimum 2 characters")
    .required("First name required"),
  last_name: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, or hyphens")
    .min(2, "Minimum 2 characters")
    .required("Last name required"),
  street: Yup.string()
    .min(5, "Street address is too short")
    .required("Street required"),
  city: Yup.string().min(2, "City name is too short").required("City required"),
  state: Yup.string()
    .oneOf(usStates, "Select a valid state")
    .required("State required"),
  zip: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code")
    .required("ZIP code required"),
  isDefault: Yup.boolean(),
});

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [ordersOpen, setOrdersOpen] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const { userEmail } = useAuth();

  // Fetch orders on mount
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
    if (data.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }
    if (editingAddressId !== null) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddressId ? { ...data, id: addr.id } : addr
        )
      );
      setEditingAddressId(null);
    } else {
      setAddresses((prev) => [...prev, { ...data, id: Date.now() }]);
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
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const toggleOrderAccordion = (orderId) => {
    setOrdersOpen((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <AccountContainer>
      <AccountHeading>My Account</AccountHeading>
      <AccountInner>
        <Sidebar>
          <SidebarList>
            <SidebarItem
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </SidebarItem>
            <SidebarItem
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </SidebarItem>
            <SidebarItem
              className={activeTab === "addresses" ? "active" : ""}
              onClick={() => setActiveTab("addresses")}
            >
              Addresses
            </SidebarItem>
            <SidebarItem
              className={activeTab === "account" ? "active" : ""}
              onClick={() => setActiveTab("account")}
            >
              Account Info
            </SidebarItem>
          </SidebarList>
        </Sidebar>
        <ContentArea>
          {activeTab === "overview" && (
            <div>
              <SectionTitle>Welcome, {userEmail || "Guest"}!</SectionTitle>
              <p>
                Hey you! We&apos;ve missed you, welcome back! Use the sidebar to
                navigate through your orders, manage your addresses, and view
                your account details.
              </p>
            </div>
          )}
          {activeTab === "orders" && (
            <div>
              <SectionTitle>Order History</SectionTitle>
              {orders.length === 0 ? (
                <p>You haven&apos;t placed any orders yet.</p>
              ) : (
                orders.map((order) => (
                  <AccordionItem key={order.id}>
                    <AccordionHeader
                      onClick={() => toggleOrderAccordion(order.id)}
                    >
                      <h4>Order ID: {order.id}</h4>
                      <span>{ordersOpen[order.id] ? "▲" : "▼"}</span>
                    </AccordionHeader>
                    <AccordionContent isOpen={ordersOpen[order.id]}>
                      <p>Total: ${order.total_price}</p>
                      <p>Status: {order.status || "Processing"}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </div>
          )}
          {activeTab === "addresses" && (
            <div>
              <SectionTitle>Your Addresses</SectionTitle>
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
              {addresses.length === 0 ? (
                <p>No addresses saved.</p>
              ) : (
                addresses.map((address) => (
                  <AddressCard key={address.id}>
                    <div className="address-details">
                      {address.isDefault && (
                        <p className="default">Default Address</p>
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
                ))
              )}
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

              {isAdding && (
                <AddAddressSection>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      placeholder="First Name"
                      {...register("first_name")}
                    />
                    {errors.first_name && (
                      <span className="error-message">
                        {errors.first_name.message}
                      </span>
                    )}

                    <input
                      type="text"
                      placeholder="Last Name"
                      {...register("last_name")}
                    />
                    {errors.last_name && (
                      <span className="error-message">
                        {errors.last_name.message}
                      </span>
                    )}

                    <input
                      type="text"
                      placeholder="Street Address"
                      {...register("street")}
                    />
                    {errors.street && (
                      <span className="error-message">
                        {errors.street.message}
                      </span>
                    )}

                    <input
                      type="text"
                      placeholder="City"
                      {...register("city")}
                    />
                    {errors.city && (
                      <span className="error-message">
                        {errors.city.message}
                      </span>
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
                      <span className="error-message">
                        {errors.state.message}
                      </span>
                    )}

                    <input
                      type="text"
                      placeholder="ZIP Code"
                      {...register("zip")}
                    />
                    {errors.zip && (
                      <span className="error-message">
                        {errors.zip.message}
                      </span>
                    )}

                    <label>
                      <input type="checkbox" {...register("isDefault")} /> Set
                      as default address
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
              {/* -- END of the form block -- */}
            </div>
          )}
          {activeTab === "account" && (
            <div>
              <SectionTitle>Account Info</SectionTitle>
              <p>
                <strong>Email:</strong> {userEmail || "Not logged in"}
              </p>
            </div>
          )}
        </ContentArea>
      </AccountInner>
    </AccountContainer>
  );
};

export default AccountPage;

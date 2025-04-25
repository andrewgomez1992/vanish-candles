import { useState, useEffect } from "react";
import axiosInstance from "../util/axiosConfig";
import { useAuth } from "./useAuth";

export function useAddresses() {
  const { token } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState();

  // Fetch on login
  useEffect(() => {
    if (!token) return;
    axiosInstance
      .get("/users/addresses")
      .then(({ data }) => setAddresses(data))
      .catch((err) => {
        console.error("Fetch addresses error:", err.response?.data || err);
        setError(err.response?.data || err.message);
      });
  }, [token]);

  const addAddress = async (addr) => {
    try {
      const { data } = await axiosInstance.post("/users/addresses", addr);

      setAddresses((prev) =>
        addr.isDefault
          ? prev.map((x) => ({ ...x, isDefault: false })).concat(data)
          : [...prev, data]
      );

      return data;
    } catch (err) {
      console.error("Add address error:", err.response?.data || err);
      throw err.response?.data || err;
    }
  };

  const updateAddress = async (id, addr) => {
    try {
      // Build a clean DTO payload
      const payload = { ...addr };
      delete payload.id;
      delete payload.user;

      const { data } = await axiosInstance.patch(
        `/users/addresses/${id}`,
        payload
      );

      // Update local state
      setAddresses((prev) =>
        prev.map((x) => {
          if (x.id === id) return data;
          if (payload.isDefault) return { ...x, isDefault: false };
          return x;
        })
      );

      return data;
    } catch (err) {
      console.error("Update address error:", err.response?.data || err);
      throw err.response?.data || err;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axiosInstance.delete(`/users/addresses/${id}`);
      setAddresses((a) => a.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Delete address error:", err.response?.data || err);
      throw err.response?.data || err;
    }
  };

  return {
    addresses,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
  };
}

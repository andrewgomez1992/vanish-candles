import { useContext } from "react";
import { CartContext } from "./cartContext";

export const useCart = () => {
  return useContext(CartContext);
};

// src/context/ProductContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { products as initialProducts } from "../data/products";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const { user } = useContext(AuthContext);

  // Load state from localStorage on init
  useEffect(() => {
    const storedProducts = localStorage.getItem("sousscon_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // First time, save initial static products to localStorage
      localStorage.setItem("sousscon_products", JSON.stringify(initialProducts));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("sousscon_products", JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    if (!user || (user.role !== "admin" && user.role !== "vendor")) return { success: false, message: "Unauthorized" };
    
    const productToAdd = { ...newProduct, id: Date.now() };
    setProducts([productToAdd, ...products]);
    return { success: true };
  };

  const updateProduct = (id, updatedData) => {
    if (!user || (user.role !== "admin" && user.role !== "vendor")) return { success: false, message: "Unauthorized" };

    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedData } : p)));
    return { success: true };
  };

  const deleteProduct = (id) => {
    if (!user || user.role !== "admin") return { success: false, message: "Unauthorized" };

    setProducts(products.filter(p => p.id !== id));
    return { success: true };
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

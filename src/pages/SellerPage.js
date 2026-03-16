// src/pages/SellerPage.js
import React, { useContext } from "react";
import SellerDashboard from "../components/SellerDashboard";
import { products } from "../data/products";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const dummyOrders = [
  { id: 1, product: products[0], status: "Pending" },
  { id: 2, product: products[4], status: "Shipped" },
  { id: 3, product: products[7], status: "Delivered" },
];

const SellerPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "vendor") {
    return <Navigate to="/login" />;
  }

  return <SellerDashboard orders={dummyOrders} products={products} />;
};

export default SellerPage;
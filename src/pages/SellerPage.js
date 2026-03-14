// src/pages/SellerPage.js
import React from "react";
import SellerDashboard from "../components/SellerDashboard";
import { products } from "../data/products";

const dummyOrders = [
  { id: 1, product: products[0], status: "Pending" },
  { id: 2, product: products[4], status: "Shipped" },
  { id: 3, product: products[7], status: "Delivered" },
];

const SellerPage = () => {
  return <SellerDashboard orders={dummyOrders} products={products} />;
};

export default SellerPage;
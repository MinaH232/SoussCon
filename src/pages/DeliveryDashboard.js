// src/pages/DeliveryDashboard.js
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DeliveryDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "delivery") {
    return <Navigate to="/login" />;
  }

  const dummyDeliveries = [
    { id: "DEL-101", address: "123 Hassan II St, Agadir", status: "Pending" },
    { id: "DEL-102", address: "45 Massira, Tiznit", status: "In Transit" },
    { id: "DEL-103", address: "89 Oufella, Taroudant", status: "Delivered" },
  ];

  return (
    <div className="seller-dashboard">
      <h2>Delivery Worker Dashboard</h2>
      <h3>Assigned Deliveries</h3>
      <ul>
        {dummyDeliveries.map((d) => (
          <li key={d.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #eee", paddingBottom: "1rem" }}>
            <strong>Order #{d.id}</strong> — {d.address}
            <br />
            <span style={{ 
              color: d.status === 'Delivered' ? '#28a745' : (d.status === 'In Transit' ? '#ffb300' : '#dc3545'),
              fontWeight: 'bold',
              marginTop: '0.5rem',
              display: 'inline-block'
            }}>
              Status: {d.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryDashboard;

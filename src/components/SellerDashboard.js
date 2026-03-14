// src/components/SellerDashboard.js
import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const SellerDashboard = ({ orders, products }) => {
  const { t, tProduct } = useLanguage();

  return (
    <div className="seller-dashboard">
      <h2>{t("sellerDashboard")}</h2>
      <h3>{t("products")}</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {tProduct(p.id, "name") || p.name} — {p.price} {t("currency")}
          </li>
        ))}
      </ul>
      <h3>{t("orders")}</h3>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            #{o.id} — {tProduct(o.product.id, "name") || o.product.name} — {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerDashboard;
// src/pages/Checkout.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const Checkout = ({ cart, clearCart }) => {
  const { t, tProduct } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>{t("orderSuccess")}</h2>
        <p>
          {t("orderThankYou")
            .replace("{name}", form.name)}
        </p>
        <p>
          {t("deliverTo")
            .replace("{address}", form.address)
            .replace("{city}", form.city)}
        </p>
        <p>
          {t("contactAt").replace("{phone}", form.phone)}
        </p>
        <Link to="/" className="btn btn-primary">
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>{t("noItemsCheckout")}</h2>
        <p>{t("noItemsCheckoutMsg")}</p>
        <Link to="/" className="btn btn-primary">
          {t("browseProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h2>{t("checkout")}</h2>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>{t("shippingInfo")}</h3>
          <div className="form-group">
            <label htmlFor="name">{t("fullName")}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder={t("fullNamePlaceholder")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">{t("phone")}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder={t("phonePlaceholder")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">{t("address")}</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder={t("addressPlaceholder")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">{t("city")}</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              placeholder={t("cityPlaceholder")}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            {t("placeOrder")} — {total} {t("currency")}
          </button>
        </form>
        <div className="checkout-summary">
          <h3>{t("orderSummary")}</h3>
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={tProduct(item.id, "name") || item.name} />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">
                    {tProduct(item.id, "name") || item.name}
                  </p>
                  <p className="checkout-item-qty">
                    {t("qty")}: {item.quantity}
                  </p>
                </div>
                <p className="checkout-item-price">
                  {item.price * item.quantity} {t("currency")}
                </p>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>{t("total")}</span>
            <span>
              {total} {t("currency")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
// src/components/Cart.js
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const Cart = ({ cart, onRemove, onUpdateQuantity }) => {
  const { t, tProduct } = useLanguage();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>{t("emptyCartTitle")}</h2>
        <p>{t("emptyCartMsg")}</p>
        <Link to="/" className="btn btn-primary">
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>{t("shoppingCart")}</h2>
      <div className="cart-items">
        {cart.map((item) => {
          const name = tProduct(item.id, "name") || item.name;
          return (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={name}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{name}</h3>
                <p className="cart-item-price">
                  {item.price} {t("currency")}
                </p>
              </div>
              <div className="cart-item-quantity">
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <p className="cart-item-subtotal">
                {item.price * item.quantity} {t("currency")}
              </p>
              <button
                className="cart-item-remove"
                onClick={() => onRemove(item.id)}
                title="Remove item"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <span>{t("total")}:</span>
          <span className="cart-total-price">
            {total} {t("currency")}
          </span>
        </div>
        <Link to="/checkout" className="btn btn-primary btn-lg">
          {t("proceedToCheckout")}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
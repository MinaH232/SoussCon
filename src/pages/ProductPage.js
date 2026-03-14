// src/pages/ProductPage.js
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useLanguage } from "../i18n/LanguageContext";

const ProductPage = ({ addToCart }) => {
  const { t, tProduct } = useLanguage();
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="not-found">
        <h2>{t("productNotFound")}</h2>
        <Link to="/" className="btn btn-primary">
          {t("backToShop")}
        </Link>
      </div>
    );
  }

  const name = tProduct(product.id, "name") || product.name;
  const description = tProduct(product.id, "description") || product.description;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-page">
      <Link to="/" className="back-link">
        {t("backToProducts")}
      </Link>
      <div className="product-page-content">
        <div className="product-page-image">
          <img src={product.image} alt={name} />
        </div>
        <div className="product-page-details">
          <span className="product-page-category">
            {t(product.category) || product.category}
          </span>
          <h2>{name}</h2>
          <p className="product-page-price">
            {product.price} {t("currency")}
          </p>
          <p className="product-page-description">{description}</p>
          <div className="product-page-actions">
            <div className="quantity-selector">
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              className={`btn btn-primary btn-lg ${added ? "btn-success" : ""}`}
              onClick={handleAdd}
            >
              {added ? t("addedToCart") : t("addToCartBtn")}
            </button>
          </div>
          {added && (
            <div className="added-feedback">
              <Link to="/cart" className="btn btn-outline">
                {t("viewCart")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
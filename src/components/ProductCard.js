// src/components/ProductCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const ProductCard = ({ product, onAddToCart }) => {
  const { t, tProduct } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const name = tProduct(product.id, "name") || product.name;

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={name} />
        <span className="product-card-category">
          {t(product.category) || product.category}
        </span>
      </div>
      <div className="product-card-body">
        <h3>{name}</h3>
        <p className="product-card-price">
          {product.price} {t("currency")}
        </p>
        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="btn btn-outline">
            {t("viewDetails")}
          </Link>
          <button
            className={`btn btn-primary ${added ? "btn-success" : ""}`}
            onClick={handleAdd}
          >
            {added ? t("added") : t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
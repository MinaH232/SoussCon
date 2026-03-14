// src/components/CategoryFilter.js
import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const CategoryFilter = ({ categories, selected, onSelect }) => {
  const { t } = useLanguage();

  return (
    <div className="category-filter">
      <h3>{t("filterTitle")}</h3>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selected === cat ? "active" : ""}`}
            onClick={() => onSelect(cat)}
          >
            {cat === "All" ? t("all") : t(cat) || cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
// src/pages/Home.js
import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import { products as allProducts } from "../data/products";
import { useLanguage } from "../i18n/LanguageContext";

const Home = ({ addToCart }) => {
  const { t } = useLanguage();
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="home">
      <div className="home-hero">
        <h2>{t("heroTitle")}</h2>
        <p>{t("heroSubtitle")}</p>
      </div>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <ProductList products={filteredProducts} onAddToCart={addToCart} />
    </div>
  );
};

export default Home;
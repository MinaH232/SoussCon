// src/pages/Home.js
import React, { useState, useContext } from "react";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import { ProductContext } from "../context/ProductContext";
import { useLanguage } from "../i18n/LanguageContext";

const Home = ({ addToCart }) => {
  const { t, tProduct } = useLanguage();
  const { products: allProducts } = useContext(ProductContext);
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter((p) => {
    // Check category match
    const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;

    // Check search query match (combining translated name/desc, fallback to original)
    const name = (tProduct(p.id, "name") || p.name).toLowerCase();
    const description = (tProduct(p.id, "description") || p.description).toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const searchMatch = !searchQuery || name.includes(query) || description.includes(query);

    return categoryMatch && searchMatch;
  });

  return (
    <div className="home">
      <div className="home-hero">
        <h2>{t("heroTitle")}</h2>
        <p>{t("heroSubtitle")}</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          style={{ 
            width: '100%', 
            padding: '1rem', 
            fontSize: '1.1rem', 
            borderRadius: '25px', 
            border: '2px solid #0056b3',
            outline: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
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
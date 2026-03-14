// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

const langLabels = { en: "EN", ar: "ع", fr: "FR" };

const Navbar = ({ cartCount }) => {
  const { t, language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/images/logo.png" alt="SoussCon" className="navbar-logo" />
        <h1>SoussCon</h1>
      </Link>
      <ul>
        <li>
          <Link to="/">{t("home")}</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-link">
            🛒 {t("cart")}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </li>
        <li>
          <Link to="/seller">{t("seller")}</Link>
        </li>
        <li>
          <Link to="/login">{t("login")}</Link>
        </li>
        <li className="lang-switcher">
          <button
            className="lang-btn"
            onClick={() => setLangOpen(!langOpen)}
          >
            🌐 {langLabels[language]}
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {Object.entries(langLabels).map(([code, label]) => (
                <button
                  key={code}
                  className={`lang-option ${language === code ? "active" : ""}`}
                  onClick={() => {
                    setLanguage(code);
                    setLangOpen(false);
                  }}
                >
                  {code === "en" ? "English" : code === "ar" ? "العربية" : "Français"}
                </button>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
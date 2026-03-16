// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { AuthContext } from "../context/AuthContext";

const langLabels = { en: "EN", ar: "ع", fr: "FR" };

const Navbar = ({ cartCount }) => {
  const { t, language, setLanguage } = useLanguage();
  const { user, logout } = useContext(AuthContext);
  const [langOpen, setLangOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        
        {/* Conditional Role Links */}
        {user?.role === "admin" && (
          <li><Link to="/admin">Admin</Link></li>
        )}
        {user?.role === "vendor" && (
          <li><Link to="/seller">{t("seller")}</Link></li>
        )}
        {user?.role === "delivery" && (
          <li><Link to="/delivery">Delivery</Link></li>
        )}

        {/* Dynamic Auth Link */}
        <li>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">{t("login")}</Link>
          )}
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
// src/pages/Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { t } = useLanguage();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.success) {
      if (result.role === "admin") navigate("/admin");
      else if (result.role === "vendor") navigate("/seller");
      else if (result.role === "delivery") navigate("/delivery");
      else navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img
            src="/images/logo.png"
            alt="SoussCon"
            className="login-logo"
          />
          <h2>{t("loginTitle")}</h2>
          <p>{t("loginSubtitle")}</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder={t("emailPlaceholder")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder={t("passwordPlaceholder")}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            {t("signIn")}
          </button>
        </form>
        <p className="login-footer" style={{ marginTop: '1.5rem' }}>
          {t("noAccount")} <Link to="/register">{t("signUp")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


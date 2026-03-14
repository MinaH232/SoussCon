// src/i18n/LanguageContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import translations, { productTranslations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = useCallback(
    (key) => {
      return translations[language]?.[key] || translations.en[key] || key;
    },
    [language]
  );

  const tProduct = useCallback(
    (productId, field) => {
      return (
        productTranslations[language]?.[productId]?.[field] ||
        productTranslations.en[productId]?.[field] ||
        ""
      );
    },
    [language]
  );

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tProduct, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

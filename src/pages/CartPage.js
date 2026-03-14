// src/pages/CartPage.js
import React from "react";
import Cart from "../components/Cart";

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart-page">
      <Cart
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default CartPage;

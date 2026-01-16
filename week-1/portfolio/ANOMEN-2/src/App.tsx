/**
 * ANOMEN Storefront - Main Application
 * A brutalist design studio storefront with Shopify integration
 */

import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Layout Components
import { Navigation } from "./components/Navigation";
import { CartDrawer } from "./components/CartDrawer";

// Page Components
import { HomePage } from "./components/HomePage";
import { StorePageShopify } from "./components/StorePageShopify";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { ContactPage } from "./components/ContactPage";

// Context Providers
import { CartProvider } from "./contexts/CartContext";

/**
 * Root application component
 * Handles routing, global state, and custom cursor interactions
 */
export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Custom cursor effect for brutalist aesthetic
  useEffect(() => {
    const handleMouseDown = () => document.body.classList.add("cursor-active");
    const handleMouseUp = () => document.body.classList.remove("cursor-active");

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navigation onCartClick={() => setIsCartOpen(true)} />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePageShopify />} />
            <Route path="/product/:productHandle" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </Router>
    </CartProvider>
  );
}

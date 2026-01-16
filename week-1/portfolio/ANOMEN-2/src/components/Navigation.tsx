/**
 * Navigation Component
 * Fixed header with site navigation and cart access
 */

import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface NavigationProps {
  onCartClick: () => void;
}

export function Navigation({ onCartClick }: NavigationProps) {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black">
      <div className="px-4 md:px-12 lg:px-20 py-4 md:py-6 lg:py-8 flex items-center justify-between">
        <Link to="/" className="font-heading uppercase tracking-wider text-xs md:text-sm hover:text-red-600 transition-colors">
          ANOMEN
        </Link>

        <div className="flex items-center gap-4 md:gap-8 lg:gap-12 text-xs md:text-sm">
          <Link
            to="/store"
            className="uppercase tracking-wider hover:text-red-600 transition-colors"
          >
            STORE
          </Link>

          <Link
            to="/contact"
            className="uppercase tracking-wider hover:text-red-600 transition-colors"
          >
            CONTACT
          </Link>

          <button
            onClick={onCartClick}
            className="uppercase tracking-wider hover:text-red-600 transition-colors flex items-center gap-2 md:gap-3 relative"
          >
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden sm:inline">CART</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

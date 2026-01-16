/**
 * Cart Context
 * Global state management for shopping cart with Shopify checkout integration
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createCheckout, updateCheckout, SHOPIFY_CONFIGURED, SHOPIFY_DOMAIN } from '../lib/shopify';

// Types
interface CartItem {
  variantId: string;
  productId: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  checkoutUrl: string | null;
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('anomen-cart');
    const savedCheckoutId = localStorage.getItem('anomen-checkout-id');
    const savedCheckoutUrl = localStorage.getItem('anomen-checkout-url');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedCheckoutId) {
      setCheckoutId(savedCheckoutId);
    }
    if (savedCheckoutUrl) {
      setCheckoutUrl(savedCheckoutUrl);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('anomen-cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('anomen-cart');
    }
  }, [cart]);

  const buildCheckoutFallbackUrl = (items: CartItem[]) => {
    const permalinkParts = items
      .map((item) => {
        const parts = item.variantId.split('/');
        const variantToken = parts[parts.length - 1];
        if (!variantToken || variantToken.includes('mock-')) {
          return null;
        }

        const quantity = Number.isFinite(item.quantity) ? Math.max(1, Math.floor(item.quantity)) : 1;
        return `${variantToken}:${quantity}`;
      })
      .filter((value): value is string => Boolean(value));

    if (permalinkParts.length === 0) {
      return null;
    }

    return `https://${SHOPIFY_DOMAIN}/cart/${permalinkParts.join(',')}`;
  };

  const applyFallbackCheckout = (items: CartItem[]) => {
    const fallbackUrl = buildCheckoutFallbackUrl(items);

    setCheckoutId(null);
    localStorage.removeItem('anomen-checkout-id');

    if (fallbackUrl) {
      setCheckoutUrl(fallbackUrl);
      localStorage.setItem('anomen-checkout-url', fallbackUrl);
    } else {
      setCheckoutUrl(null);
      localStorage.removeItem('anomen-checkout-url');
    }
  };

  // Sync with Shopify checkout
  const syncWithShopify = async (items: CartItem[]) => {
    // Skip Shopify sync if environment variables are not set
    if (!SHOPIFY_CONFIGURED) {
      console.log('Shopify credentials not configured. Falling back to direct cart permalink checkout.');
      applyFallbackCheckout(items);
      return;
    }

    // Skip sync for mock products (variant IDs starting with "gid://shopify/ProductVariant/mock-")
    const hasMockProducts = items.some(item => item.variantId.includes('mock-'));
    if (hasMockProducts) {
      console.log('Cart contains mock products. Skipping Shopify sync.');
      applyFallbackCheckout(items);
      return;
    }

    setIsLoading(true);
    try {
      const lineItems = items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }));

      let checkout;
      if (checkoutId) {
        checkout = await updateCheckout(checkoutId, lineItems);
      } else {
        checkout = await createCheckout(lineItems);
      }

      if (checkout?.id) {
        setCheckoutId(checkout.id);
        localStorage.setItem('anomen-checkout-id', checkout.id);
      }

      if (checkout?.webUrl) {
        setCheckoutUrl(checkout.webUrl);
        localStorage.setItem('anomen-checkout-url', checkout.webUrl);
      }
    } catch (error) {
      console.error('Error syncing with Shopify:', error);
      applyFallbackCheckout(items);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cart.find(i => i.variantId === item.variantId);
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(i =>
        i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }
    
    setCart(newCart);
    await syncWithShopify(newCart);
  };

  const removeFromCart = async (variantId: string) => {
    const newCart = cart.filter(item => item.variantId !== variantId);
    setCart(newCart);
    
    if (newCart.length === 0) {
      setCheckoutId(null);
      setCheckoutUrl(null);
      localStorage.removeItem('anomen-checkout-id');
      localStorage.removeItem('anomen-checkout-url');
    } else {
      await syncWithShopify(newCart);
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(variantId);
      return;
    }

    const newCart = cart.map(item =>
      item.variantId === variantId ? { ...item, quantity } : item
    );
    
    setCart(newCart);
    await syncWithShopify(newCart);
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutId(null);
    setCheckoutUrl(null);
    localStorage.removeItem('anomen-cart');
    localStorage.removeItem('anomen-checkout-id');
    localStorage.removeItem('anomen-checkout-url');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        checkoutUrl,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

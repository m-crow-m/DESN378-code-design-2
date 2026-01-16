/**
 * Store Page Component
 * Product catalog with Shopify Storefront API integration
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Components
import { ProductCard } from "./ProductCard";

// API
import { getAllProducts } from "../lib/shopify";

// Types
interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    description: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
  };
}

export function StorePageShopify() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error instanceof Error ? error.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center">
            <div className="font-heading uppercase tracking-wider">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="text-center max-w-2xl px-4">
            <div className="font-heading uppercase tracking-wider mb-4">Shopify Not Configured</div>
            <p className="text-sm mb-6 leading-relaxed">
              To load products from Shopify, please add your credentials to the .env file.
              <br />
              See QUICK_START.md for instructions.
            </p>
            <a 
              href="/#/store" 
              className="inline-block border-2 border-black px-6 py-3 font-heading uppercase tracking-wider text-xs hover:bg-black hover:text-white transition-colors"
            >
              Use Demo Store Instead
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Grid layout configuration - adjust based on number of products
  const getProductLayout = (index: number) => {
    const layouts = [
      { col: "col-span-12 md:col-span-4 md:col-start-2", mt: "", code: "(A+0)" },
      { col: "col-span-12 md:col-span-4", mt: "mt-12 md:mt-24 lg:mt-40", code: "(B+0)" },
      { col: "col-span-12 md:col-span-3 md:col-start-4", mt: "mt-8 md:mt-16", code: "(C+0)" },
      { col: "col-span-12 md:col-span-5", mt: "", code: "(D+0)" },
      { col: "col-span-12 md:col-span-4 md:col-start-3", mt: "", code: "(E+0)" },
      { col: "col-span-12 md:col-span-3", mt: "mt-12 md:mt-24 lg:mt-56", code: "(F+0)" },
      { col: "col-span-12 md:col-span-5 md:col-start-2", mt: "mt-8 md:mt-16", code: "(G+0)" },
      { col: "col-span-12 md:col-span-4", mt: "mt-12 md:mt-32 lg:mt-48", code: "(H+0)" },
      { col: "col-span-12 md:col-span-4 md:col-start-5", mt: "", code: "(I+0)" },
    ];
    
    return layouts[index % layouts.length];
  };

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      {/* Header - Editorial Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-16 md:py-32 lg:py-48 relative border-b border-black">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            className="absolute top-8 left-4 md:top-20 md:left-12 lg:left-20 text-xs md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            P. 02
          </motion.div>

          <h1 className="font-heading uppercase tracking-tight text-[12vw] md:text-[8vw] leading-[0.85] mb-8 md:mb-16 lg:mb-24">
            STORE
          </h1>

          <div className="grid grid-cols-12 gap-4 md:gap-8">
            <div className="col-span-12 md:col-span-6 md:col-start-7 text-xs md:text-sm leading-relaxed">
              A CURATED SELECTION OF LIMITED EDITION GARMENTS AND OBJECTS. EACH PIECE EMBODIES OUR PHILOSOPHY OF REDUCTION, STRUCTURE, AND TRANSFORMATION.
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid - Editorial Asymmetric Layout */}
      <section className="px-4 md:px-12 lg:px-20 py-12 md:py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {products.map((product, index) => {
              const layout = getProductLayout(index);
              const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
              const imageUrl = product.node.images.edges[0]?.node.url || "";

              return (
                <div
                  key={product.node.id}
                  className={`${layout.col} ${layout.mt} ${
                    index > 0 && index % 2 === 0 ? "mb-16 md:mb-32 lg:mb-48" : ""
                  }`}
                >
                  <div className="text-xs md:text-sm mb-4 md:mb-6">{layout.code}</div>
                  <ProductCard
                    productHandle={product.node.handle}
                    name={product.node.title}
                    price={`$${price.toFixed(0)}`}
                    imageUrl={imageUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

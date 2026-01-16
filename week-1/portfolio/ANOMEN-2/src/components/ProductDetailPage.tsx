/**
 * Product Detail Page Component
 * Individual product view with variant selection and add-to-cart functionality
 */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Components
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AddToCartToast } from "./AddToCartToast";
import { ErrorToast } from "./ErrorToast";

// Hooks & API
import { useCart } from "../contexts/CartContext";
import { getProduct } from "../lib/shopify";

export function ProductDetailPage() {
  const { productHandle } = useParams<{ productHandle: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!productHandle) {
        setError("No product handle provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productData = await getProduct(productHandle);
        
        if (!productData) {
          setError("Product not found");
        } else {
          setProduct(productData);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productHandle]);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="font-heading uppercase tracking-wider">Loading...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen pt-24 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="font-heading uppercase tracking-wider">Product not found</p>
          <button
            onClick={() => navigate("/store")}
            className="mt-8 font-heading uppercase tracking-wider hover:opacity-50 transition-opacity"
          >
            ← Back to Store
          </button>
        </div>
      </main>
    );
  }

  const showErrorToast = (message: string) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  // Find variant based on selected options
  const findVariant = () => {
    return product.variants.edges.find((v: any) => {
      return v.node.selectedOptions.every((option: any) => 
        selectedOptions[option.name] === option.value
      );
    });
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
  };

  const handleAddToCart = async () => {
    // Check if all options are selected
    const requiredOptions = product.options || [];
    const missingOptions = requiredOptions.filter((opt: any) => !selectedOptions[opt.name]);
    
    if (missingOptions.length > 0) {
      showErrorToast(`Please select ${missingOptions.map((o: any) => o.name.toLowerCase()).join(', ')}`);
      return;
    }

    const variant = findVariant();

    if (!variant) {
      showErrorToast("Selected combination not available");
      return;
    }

    const price = parseFloat(variant.node.priceV2.amount);
    const imageUrl = product.images.edges[0]?.node.url || "";
    
    // Create display text for selected options
    const optionsText = Object.entries(selectedOptions)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    
    await addToCart({
      variantId: variant.node.id,
      productId: product.id,
      name: product.title,
      price: `$${price.toFixed(0)}`,
      image: imageUrl,
      size: optionsText
    });

    // Show toast notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main className="min-h-screen pt-16 md:pt-24 pb-16 md:pb-32">
      {/* Back Button */}
      <div className="px-4 md:px-8 py-4 md:py-6 border-b border-black">
        <button
          onClick={() => navigate("/store")}
          className="font-heading uppercase tracking-wider text-xs md:text-sm hover:opacity-50 transition-opacity flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          BACK TO STORE
        </button>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Images */}
        <div className="border-r-0 lg:border-r border-black">
          <div className="aspect-square relative">
            <ImageWithFallback
              src={product.images.edges[currentImageIndex]?.node.url || ""}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Navigation */}
          {product.images.edges.length > 1 && (
            <div className="grid grid-cols-2 gap-0 border-t border-black">
              {product.images.edges.map((image: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square border-r last:border-r-0 border-black transition-opacity ${
                    currentImageIndex === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <ImageWithFallback
                    src={image.node.url}
                    alt={`${product.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-8 lg:p-16 space-y-6 md:space-y-8">
          <div>
            <h1 className="font-heading uppercase tracking-wider text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
              {product.title}
            </h1>
            <p className="text-lg md:text-2xl italic">
              ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}
            </p>
          </div>

          {/* Product Description */}
          {(product.description || product.descriptionHtml) && (
            <div className="border-t-2 border-black pt-6 md:pt-8">
              {product.descriptionHtml ? (
                <div 
                  className="text-sm md:text-base lg:text-lg leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
          )}

          {/* Product Options (Color, Size, etc.) */}
          {product.options && product.options.map((option: any) => {
            const isColorOption = option.name.toLowerCase().includes('color');
            
            return (
              <div key={option.name} className="border-t-2 border-black pt-6 md:pt-8 space-y-3 md:space-y-4">
                <label className="font-heading uppercase tracking-wider block text-xs md:text-sm">
                  Select {option.name}
                </label>
                
                {isColorOption ? (
                  // Color selector with larger buttons
                  <div className="flex flex-wrap gap-3">
                    {option.values.map((value: string) => {
                      const isSelected = selectedOptions[option.name] === value;
                      const isBlackOrWhite = value.toLowerCase() === 'black' || value.toLowerCase() === 'white';
                      
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`px-6 py-3 border-2 border-black font-heading uppercase tracking-wider text-xs md:text-sm transition-colors ${
                            isSelected
                              ? "bg-black text-white"
                              : "bg-white text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  // Size selector with grid
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {option.values.map((value: string) => {
                      const isSelected = selectedOptions[option.name] === value;
                      
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`border-2 border-black py-2 md:py-3 font-heading uppercase tracking-wider text-xs md:text-sm transition-colors ${
                            isSelected
                              ? "bg-black text-white"
                              : "bg-white text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full border-2 border-black py-3 md:py-4 font-heading uppercase tracking-wider text-xs md:text-sm bg-black text-white hover:bg-white hover:text-black transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <AddToCartToast
        isVisible={showToast}
        productName={product.title}
        size={Object.entries(selectedOptions).map(([k, v]) => v).join(' / ')}
        onClose={() => setShowToast(false)}
      />
      <ErrorToast
        isVisible={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />
    </main>
  );
}

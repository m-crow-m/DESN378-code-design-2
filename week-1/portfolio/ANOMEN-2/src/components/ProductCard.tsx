/**
 * Product Card Component
 * Displays product thumbnail with hover effects for store grid
 */

import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
  productId?: number;
  productHandle?: string;
}

export function ProductCard({ name, price, imageUrl, productId, productHandle }: ProductCardProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (productHandle) {
      navigate(`/product/${productHandle}`);
    } else if (productId) {
      navigate(`/product/${productId}`);
    }
  };
  
  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="aspect-square overflow-visible border border-black mb-4 md:mb-6 relative bg-white transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(0,0,0,1)] md:group-hover:shadow-[0_0_0_8px_rgba(0,0,0,1)]">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-2 md:space-y-3">
        <h3 className="font-heading uppercase tracking-wider text-xs md:text-sm">
          {name}
        </h3>
        <p className="text-xs md:text-sm">
          {price}
        </p>
      </div>
    </div>
  );
}

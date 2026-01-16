/**
 * Portfolio Card Component
 * Displays portfolio project thumbnail for homepage showcase
 */

import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

export function PortfolioCard({ title, description, imageUrl, onClick }: PortfolioCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/3] overflow-visible border border-black mb-4 md:mb-8 relative bg-white transition-shadow duration-300 group-hover:shadow-[0_0_0_4px_rgba(0,0,0,1)] md:group-hover:shadow-[0_0_0_8px_rgba(0,0,0,1)]">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2 md:space-y-4">
        <h3 className="font-heading uppercase tracking-wider text-sm md:text-base">
          {title}
        </h3>
        <p className="leading-relaxed text-xs md:text-sm max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}

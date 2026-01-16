/**
 * Project Detail Dialog Component
 * Fullscreen modal for portfolio project gallery view
 */

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProjectDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    images: string[];
    details: string;
  } | null;
}

export function ProjectDetailDialog({ isOpen, onClose, project }: ProjectDetailDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-16">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-white hover:opacity-50 transition-opacity"
          aria-label="Close"
        >
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="w-full h-full flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-16 max-w-[1800px]">
          {/* Image Gallery - Takes majority of space */}
          <div className="flex-1 relative flex items-center justify-center min-h-0">
            <ImageWithFallback
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-white text-black p-2 md:p-3 hover:bg-black hover:text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border-2 border-white text-black p-2 md:p-3 hover:bg-black hover:text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-0 left-0 bg-white border-2 border-white px-2 py-1 md:px-4 md:py-2">
              <span className="font-heading text-black text-xs md:text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </span>
            </div>
          </div>

          {/* Project Info Sidebar - Smaller text, white on dark */}
          <div className="lg:w-80 xl:w-96 overflow-y-auto space-y-4 md:space-y-6 text-white max-h-[40vh] lg:max-h-none">
            <div>
              <h2 className="font-heading uppercase tracking-wider text-base md:text-lg lg:text-xl">
                {project.title}
              </h2>
            </div>

            <div className="border-t border-white/20 pt-4 md:pt-6">
              <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line opacity-90">
                {project.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

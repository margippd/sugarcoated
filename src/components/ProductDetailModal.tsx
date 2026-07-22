import React from "react";
import { Product } from "../types";
import { X, Instagram } from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  if (!product) return null;

  // Fallback if product has no explicit images array (ensure we always have 3 images to check)
  const productImages = product.images && product.images.length >= 3 
    ? product.images 
    : [product.image, product.image, product.image];

  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  // Reset active image on product switch
  React.useEffect(() => {
    setActiveImageIndex(0);
  }, [product]);

  const instagramLink = `https://www.instagram.com/sugar_coated.gr`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-all duration-300"
      id="product-detail-modal-bg"
    >
      {/* Container Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-none overflow-hidden shadow-xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-scale-up border border-neutral-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-900 hover:text-neutral-500 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Close Product Details"
        >
          <X size={18} />
        </button>

        {/* Left: 3 Images Section (Primary Image + 3 Thumbnails) */}
        <div className="w-full md:w-[50%] p-4 flex flex-col justify-between bg-neutral-50 border-r border-neutral-100">
          <div className="relative aspect-[3/4] w-full rounded-none overflow-hidden bg-neutral-100">
            <img
              src={productImages[activeImageIndex]}
              alt={`${product.name} view ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {product.isSoldOut && (
              <div className="absolute top-3 left-3 bg-neutral-900/90 text-white font-display text-[9px] uppercase tracking-widest px-2.5 py-1">
                Sold Out
              </div>
            )}
          </div>

          {/* Thumbnail Selection Rows */}
          <div className="flex gap-2 mt-3">
            {productImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`flex-1 aspect-[3/4] rounded-none overflow-hidden border transition-all duration-300 ${
                  activeImageIndex === idx
                    ? "border-neutral-900 scale-[1.02]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Simplified Details Section */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            <div className="space-y-1">
              {/* Product Title */}
              <h2 className="font-display uppercase tracking-[0.18em] text-[15px] md:text-[17px] text-neutral-900 font-medium">
                {product.name}
              </h2>

              {/* Price */}
              <div className="text-[14px] md:text-[15px] font-display text-neutral-500 tracking-[0.05em]">
                €{product.price}
              </div>
            </div>

            {/* Brief Description */}
            <div className="space-y-2">
              <span className="text-[9px] font-display uppercase tracking-widest text-neutral-400 font-medium block">
                Description
              </span>
              <p className="text-[12.5px] text-neutral-600 leading-relaxed font-serif italic">
                "{product.description}"
              </p>
            </div>

            {/* Available Sizes */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-display uppercase tracking-widest text-neutral-400 font-medium block">
                Available Sizes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <div
                    key={size}
                    className="px-3 py-1.5 border border-neutral-200 text-neutral-900 text-[10px] font-mono tracking-wider bg-white"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Simple Instagram Order Call-to-Action */}
          <div className="pt-6 border-t border-neutral-100">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 font-display uppercase tracking-widest text-[10px] font-medium transition-colors duration-300 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white"
            >
              <Instagram size={13} /> {product.isSoldOut ? "Inquire on Instagram" : "Order on Instagram"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
}: ProductCardProps) {
  // Use the secondary image (pose image) for hover if available
  const hoverImage = product.images && product.images.length > 1 ? product.images[1] : product.image;

  return (
    <div
      className="group relative cursor-pointer flex flex-col bg-transparent"
      onClick={() => onSelect(product)}
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#f9f9f9] rounded-none">
        {/* Elegant Sold Out Badge */}
        {product.isSoldOut && (
          <div className="absolute top-3 left-3 z-10 bg-neutral-900/90 text-white font-display text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none">
            Sold Out
          </div>
        )}

        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 ${
            product.isSoldOut ? "opacity-60 filter grayscale-[10%]" : "opacity-100"
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Hover Image */}
        {!product.isSoldOut && hoverImage !== product.image && (
          <img
            src={hoverImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
        )}
      </div>

      {/* Product Information - ARE YOU AM I style: minimalist text beneath */}
      <div className="pt-4 pb-2 text-left flex flex-col gap-1 bg-transparent">
        <h3 className="font-display text-[11px] sm:text-[12px] text-neutral-900 uppercase tracking-[0.15em] font-medium leading-tight group-hover:text-neutral-500 transition-colors duration-300">
          {product.name}
        </h3>
        <span className="font-display text-[10.5px] sm:text-[11.5px] text-neutral-500 tracking-[0.05em]">
          €{product.price}
        </span>
      </div>
    </div>
  );
}

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram" | "text";
  color?: "burgundy" | "gold" | "white";
  size?: number;
}

export default function Logo({
  className = "",
  variant = "full",
  color = "burgundy",
  size = 120,
}: LogoProps) {
  const fillColors = {
    burgundy: "#5c1825", // Authentic deep wine burgundy from Instagram theme
    gold: "#c5a059",     // Elegant gold
    white: "#ffffff",
  };

  const activeColor = fillColors[color];

  // Stamp-style monogram rendered from the public logo asset
  const monogramSvg = (
    <div className="relative flex items-center justify-center">
      {/* Custom logo image loaded from the public folder */}
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="SugarCoated Logo"
        style={{
          width: `${variant === "monogram" ? size : size * 1.2}px`,
          height: `${variant === "monogram" ? size : size * 1.2}px`
        }}
        className="object-contain transition-all duration-500 ease-out hover:scale-105"
      />
    </div>
  );

  if (variant === "monogram") {
    return (
      <div className={`flex items-center justify-center md:justify-start ${className}`} id="sugar-logo-monogram">
        {monogramSvg}
      </div>
    );
  }

  if (variant === "text") {
    // Elegant scaled font-size according to size prop to keep it perfectly fluid
    const fontSize = size ? Math.max(11, Math.round(size * 0.18)) : 15;
    return (
      <div
        className={`flex flex-col items-center justify-center text-center select-none ${className}`}
        id="sugar-logo-text"
      >
        <h1
          className="font-display uppercase tracking-[0.3em] font-semibold transition-all duration-300"
          style={{ 
            color: activeColor,
            fontSize: `${fontSize}px`
          }}
        >
          SUGARCOATED
        </h1>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center text-center select-none ${className}`}
      id="sugar-logo-full"
    >
      {/* Monogram */}
      {monogramSvg}

      {/* Brand Name "SUGARCOATED" with elegant spaced-out letters */}
      <h1
        className="font-display uppercase tracking-[0.32em] text-[18px] sm:text-[23px] font-bold -mt-6 transition-colors duration-300"
        style={{ color: activeColor }}
      >
        SUGARCOATED
      </h1>

      {/* Underline Sparkle Divider */}
      <div className="flex items-center w-full max-w-[260px] mt-2 opacity-80 gap-4">
        <div
          className="h-[1px] flex-1"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${color === "burgundy" ? "#c5a059" : activeColor})`,
          }}
        />
        {/* 4-point Sparkle Icon (Refined Instagram screen graphic) */}
        <svg
          viewBox="0 0 24 24"
          width="15"
          height="15"
          fill="none"
          stroke={color === "burgundy" ? "#c5a059" : activeColor}
          strokeWidth="2.5"
        >
          <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={color === "burgundy" ? "#c5a059" : activeColor} />
        </svg>
        <div
          className="h-[1px] flex-1"
          style={{
            backgroundImage: `linear-gradient(to left, transparent, ${color === "burgundy" ? "#c5a059" : activeColor})`,
          }}
        />
      </div>
    </div>
  );
}

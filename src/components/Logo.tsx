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

      {/* Refined thin rule */}
      <div className="flex items-center gap-2.5 mt-3 opacity-40">
        <div className="h-px w-10 bg-neutral-500" />
        <div className="w-1 h-1 rounded-full bg-neutral-500" />
        <div className="h-px w-10 bg-neutral-500" />
      </div>
    </div>
  );
}

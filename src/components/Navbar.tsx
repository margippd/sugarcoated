import React from "react";
import Logo from "./Logo";
import { Instagram, Menu, X } from "lucide-react";

interface NavbarProps {
  onScrollToProducts: () => void;
}

export default function Navbar({
  onScrollToProducts,
}: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-100 py-2.5"
          : "bg-transparent py-5 sm:py-7"
      }`}
      id="sugar-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile menu trigger */}
        <button
          className="sm:hidden text-neutral-900 p-2 hover:text-neutral-500 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Elegant navigation links (Left) */}
        <nav className="hidden sm:flex items-center gap-6 md:gap-8 font-display text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-medium text-burgundy-900/80">
          <button
            onClick={() => {
              onScrollToProducts();
              setMobileMenuOpen(false);
            }}
            className="hover:text-gold-500 transition-all cursor-pointer relative py-1 group text-burgundy-950 font-bold"
          >
            Collections
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-300 transition-all duration-300 group-hover:w-full" />
          </button>
          <span className="text-burgundy-950/60 select-none py-1">
            Athens
          </span>
        </nav>

        {/* Centered Brand Logo */}
        <div
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Logo variant="text" color="burgundy" size={scrolled ? 70 : 85} />
        </div>

        {/* Action links (Right) */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="https://www.instagram.com/sugar_coated.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-gold-200 bg-[#fcfaf3] hover:bg-gold-50 transition-all duration-300 text-[11px] font-display uppercase tracking-widest text-gold-700 font-bold cursor-pointer"
          >
            <Instagram size={13} className="text-gold-600" />
            @sugar_coated.gr
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-[#fcfaf7] border-b border-burgundy-100 shadow-lg px-6 py-8 flex flex-col gap-6 animate-fade-in bg-noise z-40">
          <button
            onClick={() => {
              onScrollToProducts();
              setMobileMenuOpen(false);
            }}
            className="text-left font-display uppercase tracking-widest text-burgundy-900 font-semibold text-xs border-b border-burgundy-100 pb-3"
          >
            Browse Collections
          </button>
          <a
            href="https://www.instagram.com/sugar_coated.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-left font-display uppercase tracking-widest text-gold-600 font-bold text-xs flex items-center gap-2"
          >
            <Instagram size={14} />
            Contact us on Instagram
          </a>
        </div>
      )}
    </header>
  );
}

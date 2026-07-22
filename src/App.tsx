import React from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import Logo from "./components/Logo";
import { Product } from "./types";
import { Sparkles, HelpCircle, Instagram, Heart, ArrowRight, Star } from "lucide-react";

const PRODUCTS: Product[] = [
  {
    id: "sc-001",
    name: "Cloud Nine Shorts",
    price: 145,
    category: "Sets",
    image: `${import.meta.env.BASE_URL}images/white_halter_shorts.jfif`,
    images: [
      `${import.meta.env.BASE_URL}images/white_halter_shorts_detail.jfif`,
      `${import.meta.env.BASE_URL}images/white_halter_shorts_pose.jfif`,
      `${import.meta.env.BASE_URL}images/white_halter_shorts.jfif`
    ],
    description: "An effortless matching set featuring a premium white cotton-ribbed halter tank top and crisp, high-waisted linen shorts with an elegant tie sash. Designed for sunny Athenian escapes.",
    material: "100% Organic Cotton Top, 100% Premium Linen Shorts",
    colors: ["White"],
    sizes: ["XS", "S", "M", "L"],
    features: ["Ribbed halter top", "Linen tie-sash shorts", "Functional side pockets"],
    styleTip: "Wear with elegant leather sandals and gold-rimmed sunglasses for a chic, sophisticated coastal look.",
    isSoldOut: false
  },
  {
    id: "sc-002",
    name: "Azure Blue Mini Skirt",
    price: 165,
    category: "Sets",
    image: `${import.meta.env.BASE_URL}images/blue_floral_skirt.jfif`,
    images: [
      `${import.meta.env.BASE_URL}images/blue_floral_skirt.jfif`,
      `${import.meta.env.BASE_URL}images/blue_floral_skirt_pose.jfif`,
      `${import.meta.env.BASE_URL}images/blue_floral_skirt_detail.jfif`
    ],
    description: "A fresh and feminine pairing consisting of a delicate white cropped camisole with slender straps and a breathtaking blue-and-green floral printed mini skirt featuring flattering ruched detailing.",
    material: "Silk-Rayon Blend Skirt, Cotton-Modal Top",
    colors: ["White/Blue Floral"],
    sizes: ["S", "M", "L"],
    features: ["Ruched smocked skirt", "Cropped camisole top", "Adjustable straps"],
    styleTip: "Pair with a straw bag and delicate gold jewelry for a beautiful brunch or seaside stroll.",
    isSoldOut: false
  },
  {
    id: "sc-003",
    name: "Rose Blossom Corset",
    price: 185,
    category: "Sets & Separates",
    image: `${import.meta.env.BASE_URL}images/floral_corset_cargo.jfif`,
    images: [
      `${import.meta.env.BASE_URL}images/floral_corset_cargo.jfif`,
      `${import.meta.env.BASE_URL}images/floral_corset_cargo_pose.jfif`,
      `${import.meta.env.BASE_URL}images/floral_corset_cargo_detail.jfif`
    ],
    description: "A perfect blend of romance and modern edge. Features a beautifully structured strapless sweetheart corset in a vintage pink floral print, paired with rich olive green utility cargo trousers.",
    material: "Sateen-Brocade Corset, Durable Cotton-Twill Cargo Trousers",
    colors: ["Black/Pink Floral Top with Olive Cargo Trousers"],
    sizes: ["XS", "S", "M", "L"],
    features: ["Structured corset top", "Multi-pocket cargo trousers", "Comfortable relaxed fit pants"],
    styleTip: "Style with clean white retro sneakers and small gold hoop earrings for the ultimate chic streetwear statement.",
    isSoldOut: false
  }
];

export default function App() {
  const [products] = React.useState<Product[]>(PRODUCTS);
  const [loading] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const productsSectionRef = React.useRef<HTMLDivElement | null>(null);

  // Scroll to catalog helper
  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col justify-between selection:bg-neutral-100 selection:text-neutral-900">
      {/* 1. Brand Navigation */}
      <Navbar onScrollToProducts={scrollToProducts} />

      {/* 2. Hero Editorial Banner */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden" id="boutique-hero">
        {/* Editorial Background Image matching the attached sugar-coated theme */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/sugar_coated_background.jpg`}
            alt="SugarCoated Background"
            className="w-full h-full object-cover filter brightness-[1.02] contrast-[0.98]"
            referrerPolicy="no-referrer"
          />
          {/* Exquisite soft warm overlay for perfect luxury-boutique contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white" />
        </div>

        {/* Hero content box */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-12 flex flex-col items-center animate-fade-in">
          {/* Refined logo without container */}
          <Logo variant="full" color="burgundy" size={190} className="mb-2" />

          {/* Elegant gold "Athens" subtitle displayed BELOW the logo */}
          <span className="font-display uppercase tracking-[0.4em] text-[10.5px] sm:text-[11.5px] font-bold text-burgundy-900 mb-6 sm:mb-8 mt-1 flex items-center gap-2">
            Boutique
          </span>

          <p className="font-serif italic text-[17px] sm:text-[21px] text-neutral-800 max-w-2xl leading-relaxed mb-8 sm:mb-10 px-4">
            "Feminine styles for every occasion."
          </p>

          <div className="flex justify-center">
            <button
              onClick={scrollToProducts}
              className="group px-8 py-3.5 border-2 border-burgundy-900 text-burgundy-900 font-display text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-burgundy-900 hover:text-white transition-all duration-500 cursor-pointer inline-flex items-center gap-2.5"
            >
              Shop the Collection
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Product Catalog section */}
      <section
        ref={productsSectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 flex-grow w-full"
        id="catalog-section"
      >
        <div className="text-center mb-16">
          <h2 className="font-display uppercase tracking-[0.25em] text-[15px] sm:text-[18px] text-neutral-900 font-medium">
            Shop All
          </h2>
          <div className="w-8 h-[1px] bg-neutral-200 mx-auto mt-4" />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <Logo variant="monogram" color="burgundy" size={45} className="animate-pulse" />
            <span className="font-display text-[10px] uppercase tracking-widest text-neutral-400 mt-4">Loading Collection...</span>
          </div>
        ) : products.length === 0 ? (
          /* Empty Catalog State */
          <div className="text-center py-20 border border-neutral-100 p-8 max-w-md mx-auto">
            <HelpCircle size={28} className="text-neutral-400 mx-auto mb-3" />
            <h3 className="font-display uppercase tracking-widest text-[11px] font-medium text-neutral-900 mb-1">Coming Soon</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Darling, we are currently designing new exclusive styles. Check back soon or follow us on Instagram!
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-x-10 sm:gap-y-16" id="products-grid">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Luxury Brand Footer */}
      <footer className="bg-white border-t border-neutral-100 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <Logo variant="monogram" color="burgundy" size={35} className="md:justify-start" />
            <h4 className="font-display uppercase tracking-widest text-[11px] font-medium text-neutral-900 mt-2">SUGARCOATED</h4>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-serif italic">Athens boutique fashion house. Elegance and luxury tailoring with love.</p>
          </div>

          <div className="text-center md:text-left space-y-3">
            <h5 className="font-display uppercase tracking-[0.25em] text-[10px] font-medium text-neutral-900">Discover More</h5>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-serif">Follow us on Instagram to view daily stylings, behind the scenes, and message us directly to secure custom designs.</p>
            <div className="pt-2 flex justify-center md:justify-start">
              <a
                href="https://www.instagram.com/sugar_coated.gr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-neutral-900 text-white font-display text-[9px] uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors"
              >
                <Instagram size={11} /> @sugar_coated.gr
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-neutral-100 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[9.5px] text-neutral-400 font-mono tracking-wider">
              © {new Date().getFullYear()} SugarCoated Boutique. Athens, Greece. All designs reserved.
            </span>
            <div className="flex items-center gap-1 text-[9.5px] text-neutral-400 font-display uppercase tracking-widest">
              <span>Athens, Greece</span>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="pt-4 border-t border-neutral-100 text-center">
            <p className="text-[9.5px] text-neutral-400 font-display uppercase tracking-widest">
              Website Development by{" "}
              <a
                href="mailto:margi98@windowlsive.com"
                className="font-serif italic text-neutral-600 hover:text-burgundy-600 transition-colors duration-300 cursor-pointer"
              >
                DIGITAl SOLUTIONS
              </a>
            </p>
            <p className="text-center text-[8.5px] text-neutral-400 mt-1.5 font-serif italic">
              Professional Web & Digital Solutions
            </p>
          </div>
        </div>
      </footer>

      {/* 6. Interactive Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

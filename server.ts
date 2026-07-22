import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Luxury Clothing Product Catalog - Simplified and curated
const products = [
  {
    id: "sc-001",
    name: "Cloud Nine Shorts",
    price: 145,
    category: "Sets",
    image: "/images/white_halter_shorts.jfif",
    images: [
      "/images/white_halter_shorts_detail.jfif",
      "/images/white_halter_shorts_pose.jfif",
      "/images/white_halter_shorts.jfif"
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
    image: "/images/blue_floral_skirt.jfif",
    images: [
      "/images/blue_floral_skirt.jfif",
      "/images/blue_floral_skirt_pose.jfif",
      "/images/blue_floral_skirt_detail.jfif"
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
    image: "/images/floral_corset_cargo.jfif",
    images: [
      "/images/floral_corset_cargo.jfif",
      "/images/floral_corset_cargo_pose.jfif",
      "/images/floral_corset_cargo_detail.jfif"
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

// 1. Get Products API - Showcase only
app.get("/api/products", (req, res) => {
  res.json({ success: true, products });
});

// Serve Vite Client or Static Files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SugarCoated server listening on http://localhost:${PORT}`);
  });
}

startServer();

/**
 * sync-products.mjs
 *
 * Reads your Desktop/clothes/ folder and syncs all products into the website.
 *
 * Folder structure expected:
 *   Desktop/
 *     clothes/
 *       Cloud Nine Shorts/
 *         1.jfif   ← main image shown on product card
 *         2.jfif   ← shown in detail modal
 *         3.jfif   ← shown in detail modal
 *         info.json
 *       Another Piece/
 *         1.jpg
 *         2.jpg
 *         info.json
 *
 * Images are ordered alphabetically/numerically — name them 1, 2, 3 etc.
 * Run with: npm run sync-products
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DESKTOP = path.join(process.env.USERPROFILE || process.env.HOME || '', 'Desktop');
const CLOTHES_FOLDER = path.join(DESKTOP, 'clothes');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images');
const APP_TSX = path.join(ROOT, 'src', 'App.tsx');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.jfif', '.png', '.webp', '.gif']);

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

function esc(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function generateEntry(p, idx) {
  const id = `sc-${String(idx + 1).padStart(3, '0')}`;
  const imagesBlock = p.allImages
    .map(img => `      \`\${import.meta.env.BASE_URL}images/${img}\``)
    .join(',\n');
  return `  {
    id: "${id}",
    name: "${esc(p.name)}",
    price: 0,
    category: "${esc(p.category)}",
    image: \`\${import.meta.env.BASE_URL}images/${p.allImages[0]}\`,
    images: [
${imagesBlock}
    ],
    description: "${esc(p.description)}",
    material: "${esc(p.material)}",
    colors: ${JSON.stringify(p.colors)},
    sizes: ${JSON.stringify(p.sizes)},
    features: ${JSON.stringify(p.features)},
    styleTip: "${esc(p.styleTip)}",
    isSoldOut: ${Boolean(p.isSoldOut)}
  }`;
}

// ── Validate clothes folder ──────────────────────────────────────────────────
if (!fs.existsSync(CLOTHES_FOLDER)) {
  console.error(`\n❌  Clothes folder not found at:\n    ${CLOTHES_FOLDER}\n`);
  console.error('Create it and add subfolders for each clothing piece.\n');
  process.exit(1);
}

const productFolders = fs.readdirSync(CLOTHES_FOLDER, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name)
  .sort();

if (productFolders.length === 0) {
  console.error('❌  No product folders found inside clothes/\n');
  process.exit(1);
}

// ── Process each folder ──────────────────────────────────────────────────────
const products = [];

for (const folderName of productFolders) {
  const folderPath = path.join(CLOTHES_FOLDER, folderName);
  const infoPath = path.join(folderPath, 'info.json');

  if (!fs.existsSync(infoPath)) {
    console.warn(`⚠️   Skipping "${folderName}" — missing info.json`);
    continue;
  }

  let info;
  try {
    info = JSON.parse(fs.readFileSync(infoPath, 'utf-8'));
  } catch {
    console.warn(`⚠️   Skipping "${folderName}" — info.json is not valid JSON`);
    continue;
  }

  // Sort images numerically (1.jpg before 2.jpg before 10.jpg)
  const imageFiles = fs.readdirSync(folderPath)
    .filter(f => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (imageFiles.length === 0) {
    console.warn(`⚠️   Skipping "${folderName}" — no images found`);
    continue;
  }

  const slug = slugify(folderName);
  const allImages = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const ext = path.extname(imageFiles[i]);
    const baseName = slugify(path.basename(imageFiles[i], ext));
    const destName = `${slug}_${baseName}${ext}`;
    fs.copyFileSync(
      path.join(folderPath, imageFiles[i]),
      path.join(PUBLIC_IMAGES, destName)
    );
    allImages.push(destName);
  }

  products.push({
    name: info.name || folderName,
    category: info.category || 'Collection',
    description: info.description || '',
    material: info.material || '',
    colors: info.colors || [],
    sizes: info.sizes || ['XS', 'S', 'M', 'L'],
    features: info.features || [],
    styleTip: info.styleTip || '',
    isSoldOut: info.isSoldOut || false,
    allImages,
  });

  console.log(`✓  "${folderName}"  (${allImages.length} image${allImages.length > 1 ? 's' : ''})`);
}

if (products.length === 0) {
  console.error('\n❌  No valid products to sync. Check each folder has info.json and at least one image.\n');
  process.exit(1);
}

// ── Update App.tsx ───────────────────────────────────────────────────────────
const newBlock = `const PRODUCTS: Product[] = [\n${products.map(generateEntry).join(',\n')}\n];`;

let app = fs.readFileSync(APP_TSX, 'utf-8');
const startIdx = app.indexOf('const PRODUCTS: Product[]');
// Find the closing ];\n that ends the array (works with or without blank line after it)
const endMarker = app.indexOf('\nexport default', startIdx);

if (startIdx === -1 || endMarker === -1) {
  console.error('\n❌  Could not locate the PRODUCTS array in src/App.tsx\n');
  process.exit(1);
}

// Walk back from endMarker to include the ];\n
const endIdx = app.lastIndexOf('];', endMarker) + 2; // +2 to include ']' and ';'

fs.writeFileSync(APP_TSX, app.slice(0, startIdx) + newBlock + '\n' + app.slice(endIdx + 1), 'utf-8');

console.log(`\n✅  Synced ${products.length} product(s) → src/App.tsx`);
console.log('\n👉  Next steps:');
console.log('    npx vite build');
console.log('    git add -A && git commit -m "update products" && git push\n');

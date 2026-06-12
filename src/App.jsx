import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";

/* ─────────────────────────────────────────────
   CONSTANTS & DATA
   ───────────────────────────────────────────── */

const WHATSAPP_NUMBER = "94XXXXXXXXX";

const PRODUCTS = [
  {
    id: "TS001", name: "Essential Oversized Tee", category: "T-Shirts", price: 4500, color: "Sheer White",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "TS002", name: "Prime Classic Tee", category: "T-Shirts", price: 4850, color: "Jet Black",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "TS003", name: "Vintage Wash Crew", category: "T-Shirts", price: 3950, color: "Stone Grey",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "CP001", name: "Nylon AirWave Cargo Pant", category: "Pants", price: 6050, color: "Jet Black",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "CP002", name: "Stormtrack Toggle Jogger", category: "Pants", price: 6500, color: "Charcoal",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "HJ001", name: "Stealth Zip Hoodie", category: "Hoodies", price: 7500, color: "Midnight",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1578768079470-f822d45b5950?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "HJ002", name: "Heritage Bomber Jacket", category: "Hoodies", price: 8900, color: "Olive",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "SH001", name: "Trackline Mesh Shorts", category: "Shorts", price: 3850, color: "Navy",
    sizes: ["S","M","L","XL"],
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "AC001", name: "Essence Tote Bag", category: "Accessories", price: 9500, color: "Jet Black",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "AC002", name: "Retro Bucket Hat", category: "Accessories", price: 2950, color: "Cream",
    sizes: ["One Size"],
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "SN001", name: "Storm Runner Sneakers", category: "Footwear", price: 17500, color: "White/Grey",
    sizes: ["40","41","42","43","44"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=520&fit=crop&auto=format",
  },
  {
    id: "SN002", name: "Urban Drift Slides", category: "Footwear", price: 4200, color: "Black",
    sizes: ["40","41","42","43","44"],
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=520&fit=crop&auto=format",
    image2x: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=1040&fit=crop&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=400&h=520&fit=crop&auto=format",
  },
];

const CATEGORIES = ["All", "T-Shirts", "Pants", "Hoodies", "Shorts", "Accessories", "Footwear"];

const REVIEWS = [
  { name: "Kavinda P.", rating: 5, text: "Best quality activewear in Sri Lanka. The oversized tees fit perfectly and the fabric is unmatched.", avatar: "K" },
  { name: "Shanaya D.", rating: 5, text: "Obsessed with the seamless collection! Super comfortable for both workouts and everyday wear.", avatar: "S" },
  { name: "Ravindu M.", rating: 5, text: "The cargo pants are incredible — durable, stylish, and great value for money. Already ordered my second pair.", avatar: "R" },
  { name: "Nimasha F.", rating: 4, text: "Love the aesthetic and the quality. Delivery was fast too. Will definitely shop again!", avatar: "N" },
];

const HERO_IMG = {
  desktop: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop&auto=format&q=80",
  mobile: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1200&fit=crop&auto=format&q=80",
};

const BANNER_IMG = {
  desktop: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=500&fit=crop&auto=format&q=80",
  mobile: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop&auto=format&q=80",
};

const ABOUT_IMG = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&h=900&fit=crop&auto=format&q=80";

/* ─────────────────────────────────────────────
   CONTEXT
   ───────────────────────────────────────────── */

const CartContext = createContext();

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product, size) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) return prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, size, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id, size, delta) => {
    setItems(prev => prev.map(i => {
      if (i.id === id && i.size === size) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : i;
      }
      return i;
    }).filter(i => !(i.id === id && i.size === size && i.qty + delta <= 0)));
  }, []);

  const removeItem = useCallback((id, size) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);

/* ─────────────────────────────────────────────
   THEME CONTEXT
   ───────────────────────────────────────────── */

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  return <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</ThemeContext.Provider>;
}

const useTheme = () => useContext(ThemeContext);

/* ─────────────────────────────────────────────
   CSS — fully responsive for iPhone SE → 16" MacBook Pro
   ───────────────────────────────────────────── */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --max-w: 1440px;
  --gutter: 40px;
  --safe-top: env(safe-area-inset-top);
  --safe-bottom: env(safe-area-inset-bottom);
  --safe-left: env(safe-area-inset-left);
  --safe-right: env(safe-area-inset-right);
}

html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body { font-family: var(--font-body); overflow-x: hidden; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -webkit-tap-highlight-color: transparent; }
html, body { -webkit-text-size-adjust: none; }
input, textarea, select { -webkit-appearance: none; appearance: none; border-radius: 0; }
img { display: block; max-width: 100%; height: auto; }

/* ── THEME ── */
[data-theme="dark"] {
  --bg: #0a0a0a; --bg2: #131313; --bg3: #1a1a1a; --bg4: #222;
  --fg: #f5f0eb; --fg2: #a8a29e; --fg3: #6b6560;
  --accent: #e8d5b7; --accent2: #c4a77d;
  --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.14);
  --glass: rgba(10,10,10,0.82);
}
[data-theme="light"] {
  --bg: #faf8f5; --bg2: #f0ece7; --bg3: #e8e3dc; --bg4: #d9d3cb;
  --fg: #1a1816; --fg2: #6b6560; --fg3: #a8a29e;
  --accent: #8b6f47; --accent2: #6d5535;
  --border: rgba(0,0,0,0.06); --border2: rgba(0,0,0,0.12);
  --glass: rgba(250,248,245,0.82);
}

.page { background: var(--bg); color: var(--fg); min-height: 100vh; transition: background 0.5s var(--ease-out), color 0.5s var(--ease-out); }

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--fg3); border-radius: 3px; }

/* ── ANNOUNCE BAR ── */
.announce { background: var(--accent); color: var(--bg); text-align: center; padding: 10px var(--gutter); font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; }

/* ── NAV ── */
.nav { position: sticky; top: 0; z-index: 100; backdrop-filter: blur(24px) saturate(1.2); -webkit-backdrop-filter: blur(24px) saturate(1.2); background: var(--glass); border-bottom: 1px solid var(--border); }
.nav-inner { max-width: var(--max-w); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 18px var(--gutter); gap: 24px; }
.nav-logo { font-family: var(--font-display); font-size: 26px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--fg); text-decoration: none; white-space: nowrap; }
.nav-links { display: flex; gap: 36px; align-items: center; }
.nav-link { color: var(--fg2); text-decoration: none; font-size: 12px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; transition: color 0.3s; position: relative; white-space: nowrap; }
.nav-link::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.4s var(--ease-out); }
.nav-link:hover { color: var(--fg); }
.nav-link:hover::after { width: 100%; }
.nav-actions { display: flex; gap: 12px; align-items: center; }
.nav-btn { background: none; border: none; color: var(--fg); cursor: pointer; padding: 8px; position: relative; transition: transform 0.3s var(--ease-spring); display: flex; align-items: center; justify-content: center; }
.nav-btn:hover { transform: scale(1.1); }
.cart-badge { position: absolute; top: 1px; right: 0; background: var(--accent); color: var(--bg); min-width: 17px; height: 17px; border-radius: 50%; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; line-height: 1; }
.mobile-toggle { display: none; background: none; border: none; color: var(--fg); cursor: pointer; padding: 8px; }

/* ── HERO ── */
.hero { position: relative; width: 100%; height: 100svh; min-height: 600px; max-height: 1200px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%); }
.hero-content { position: relative; z-index: 2; text-align: center; padding: 0 var(--gutter); max-width: 720px; }
.hero-tag { font-size: 11px; font-weight: 600; letter-spacing: 6px; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; opacity: 0; animation: fadeUp 0.8s var(--ease-out) 0.3s forwards; }
.hero-title { font-family: var(--font-display); font-size: clamp(36px, 7.5vw, 88px); font-weight: 700; color: #fff; line-height: 1.06; margin-bottom: 18px; opacity: 0; animation: fadeUp 0.8s var(--ease-out) 0.5s forwards; }
.hero-title em { font-style: italic; font-weight: 400; }
.hero-sub { font-size: clamp(13px, 1.5vw, 16px); color: rgba(255,255,255,0.72); max-width: 440px; margin: 0 auto 36px; line-height: 1.65; opacity: 0; animation: fadeUp 0.8s var(--ease-out) 0.7s forwards; }
.hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.8s var(--ease-out) 0.9s forwards; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 34px; font-size: 11px; font-weight: 600; letter-spacing: 2.2px; text-transform: uppercase; text-decoration: none; border: none; cursor: pointer; transition: all 0.4s var(--ease-out); font-family: var(--font-body); }
.btn-primary { background: #fff; color: #0a0a0a; }
.btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
.btn-outline { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.35); }
.btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }
.hero-scroll { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 2; }
.scroll-indicator { width: 22px; height: 36px; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 11px; display: flex; justify-content: center; padding-top: 7px; }
.scroll-dot { width: 2.5px; height: 7px; background: #fff; border-radius: 2px; animation: scrollBounce 2s infinite; }

/* ── SECTION ── */
.section { padding: 100px var(--gutter); max-width: var(--max-w); margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 56px; }
.section-tag { font-size: 11px; font-weight: 600; letter-spacing: 4.5px; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
.section-title { font-family: var(--font-display); font-size: clamp(26px, 3.6vw, 44px); font-weight: 600; color: var(--fg); line-height: 1.2; }
.section-sub { font-size: 14px; color: var(--fg2); max-width: 480px; margin: 14px auto 0; line-height: 1.65; }

/* ── FILTER BAR ── */
.filter-bar { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 44px; flex-wrap: wrap; }
.search-box { position: relative; flex: 0 0 260px; }
.search-box input { width: 100%; padding: 11px 14px 11px 42px; border: 1px solid var(--border2); border-radius: 0; background: var(--bg2); color: var(--fg); font-size: 13px; font-family: var(--font-body); transition: border-color 0.3s; }
.search-box input:focus { outline: none; border-color: var(--accent); }
.search-box svg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--fg3); pointer-events: none; }
.category-pills { display: flex; gap: 6px; flex-wrap: wrap; }
.pill { padding: 7px 18px; border: 1px solid var(--border2); background: transparent; color: var(--fg2); font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; cursor: pointer; transition: all 0.3s var(--ease-out); font-family: var(--font-body); white-space: nowrap; }
.pill.active, .pill:hover { background: var(--fg); color: var(--bg); border-color: var(--fg); }

/* ── PRODUCT GRID ── */
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.product-card { position: relative; overflow: hidden; cursor: pointer; }
.product-img-wrap { position: relative; aspect-ratio: 3/3.9; overflow: hidden; background: var(--bg3); }
.product-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.6s var(--ease-out), transform 0.8s var(--ease-out); }
.product-img-wrap .hover-img { position: absolute; inset: 0; opacity: 0; }
.product-card:hover .hover-img { opacity: 1; }
.product-card:hover .main-img { transform: scale(1.06); }
.product-quick { position: absolute; bottom: 0; left: 0; right: 0; padding: 14px; transform: translateY(100%); transition: transform 0.4s var(--ease-out); display: flex; flex-direction: column; gap: 8px; background: linear-gradient(0deg, rgba(0,0,0,0.82) 0%, transparent 100%); }
.product-card:hover .product-quick { transform: translateY(0); }
.size-row { display: flex; gap: 5px; }
.size-btn { width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.35); background: transparent; color: #fff; font-size: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: var(--font-body); }
.size-btn:hover, .size-btn.sel { background: #fff; color: #000; }
.add-cart-btn { width: 100%; padding: 11px; border: none; background: #fff; color: #000; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: background 0.3s; font-family: var(--font-body); }
.add-cart-btn:hover { background: var(--accent); }
.product-info { padding: 14px 2px 0; }
.product-name { font-size: 13px; font-weight: 500; color: var(--fg); margin-bottom: 3px; line-height: 1.35; }
.product-meta { display: flex; justify-content: space-between; align-items: center; }
.product-color { font-size: 11px; color: var(--fg3); }
.product-price { font-size: 13px; font-weight: 600; color: var(--accent); }

/* ── BANNER ── */
.banner { position: relative; width: 100%; overflow: hidden; }
.banner-picture { display: block; width: 100%; }
.banner-picture img { width: 100%; height: auto; display: block; min-height: 300px; object-fit: cover; }
.banner-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.32); text-align: center; padding: 24px var(--gutter); }
.banner-title { font-family: var(--font-display); font-size: clamp(24px, 4.5vw, 52px); color: #fff; font-weight: 600; margin-bottom: 10px; }
.banner-sub { color: rgba(255,255,255,0.78); font-size: clamp(13px, 1.4vw, 15px); margin-bottom: 26px; }
.btn-banner { background: #fff; color: #0a0a0a; }
.btn-banner:hover { background: var(--accent); }

/* ── ABOUT ── */
.about { display: grid; grid-template-columns: 1fr 1fr; }
.about-img { overflow: hidden; position: relative; }
.about-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s var(--ease-out); }
.about-img:hover img { transform: scale(1.04); }
.about-text { display: flex; flex-direction: column; justify-content: center; padding: 72px 56px; background: var(--bg2); }
.about-text .section-tag { text-align: left; }
.about-text .section-title { text-align: left; margin-bottom: 20px; }
.about-text p { color: var(--fg2); line-height: 1.75; margin-bottom: 14px; font-size: 14px; }
.about-stats { display: flex; gap: 36px; margin-top: 28px; }
.stat-num { font-family: var(--font-display); font-size: 34px; font-weight: 700; color: var(--accent); }
.stat-label { font-size: 11px; color: var(--fg3); text-transform: uppercase; letter-spacing: 1.2px; margin-top: 3px; }

/* ── REVIEWS ── */
.reviews-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.review-card { background: var(--bg2); border: 1px solid var(--border); padding: 28px; transition: transform 0.4s var(--ease-out), border-color 0.3s; }
.review-card:hover { transform: translateY(-4px); border-color: var(--accent); }
.review-stars { color: var(--accent); font-size: 13px; margin-bottom: 14px; letter-spacing: 2px; display: flex; gap: 2px; }
.review-text { font-size: 13px; color: var(--fg2); line-height: 1.7; margin-bottom: 18px; font-style: italic; }
.review-author { display: flex; align-items: center; gap: 10px; }
.review-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); color: var(--bg); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
.review-name { font-size: 12px; font-weight: 600; color: var(--fg); }
.review-verified { font-size: 10px; color: var(--fg3); }

/* ── NEWSLETTER ── */
.newsletter { background: var(--bg2); border: 1px solid var(--border); padding: 72px 56px; text-align: center; margin: 100px auto; max-width: 760px; }
.nl-form { display: flex; gap: 0; justify-content: center; margin-top: 28px; }
.newsletter input { padding: 13px 18px; border: 1px solid var(--border2); background: var(--bg); color: var(--fg); font-size: 13px; width: 280px; font-family: var(--font-body); }
.newsletter input:focus { outline: none; border-color: var(--accent); }
.newsletter button { padding: 13px 28px; border: none; background: var(--fg); color: var(--bg); font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: var(--font-body); transition: background 0.3s; white-space: nowrap; }
.newsletter button:hover { background: var(--accent); }

/* ── FOOTER ── */
.footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 72px var(--gutter) 36px; }
.footer-inner { max-width: var(--max-w); margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
.footer-logo { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--fg); margin-bottom: 14px; }
.footer-desc { font-size: 12px; color: var(--fg3); line-height: 1.7; max-width: 280px; }
.footer-social { display: flex; gap: 10px; margin-top: 20px; }
.footer-social a { width: 36px; height: 36px; border: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; color: var(--fg2); transition: all 0.3s; text-decoration: none; font-size: 12px; font-weight: 600; }
.footer-social a:hover { background: var(--fg); color: var(--bg); }
.footer-col h4 { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--fg); margin-bottom: 18px; }
.footer-col a { display: block; font-size: 12px; color: var(--fg3); text-decoration: none; margin-bottom: 10px; transition: color 0.3s; }
.footer-col a:hover { color: var(--accent); }
.footer-bottom { max-width: var(--max-w); margin: 36px auto 0; padding-top: 20px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--fg3); }

/* ── CART DRAWER ── */
.cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 200; opacity: 0; pointer-events: none; transition: opacity 0.35s; }
.cart-overlay.open { opacity: 1; pointer-events: all; }
.cart-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 420px; max-width: 100vw; background: var(--bg); z-index: 201; transform: translateX(100%); transition: transform 0.5s var(--ease-out); display: flex; flex-direction: column; border-left: 1px solid var(--border); }
.cart-drawer.open { transform: translateX(0); }
.cart-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
.cart-header h2 { font-family: var(--font-display); font-size: 20px; font-weight: 600; }
.cart-close { background: none; border: none; color: var(--fg); cursor: pointer; padding: 4px; }
.cart-items { flex: 1; overflow-y: auto; padding: 20px 24px; -webkit-overflow-scrolling: touch; }
.cart-empty { text-align: center; padding: 56px 20px; color: var(--fg3); }
.cart-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.cart-item-img { width: 72px; height: 92px; object-fit: cover; flex-shrink: 0; background: var(--bg3); }
.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name { font-size: 13px; font-weight: 500; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-item-detail { font-size: 11px; color: var(--fg3); margin-bottom: 6px; }
.cart-item-price { font-size: 13px; font-weight: 600; color: var(--accent); }
.qty-controls { display: flex; align-items: center; margin-top: 8px; }
.qty-btn { width: 30px; height: 30px; border: 1px solid var(--border2); background: transparent; color: var(--fg); cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.qty-btn:hover { background: var(--bg3); }
.qty-val { width: 36px; height: 30px; border-top: 1px solid var(--border2); border-bottom: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
.cart-item-remove { background: none; border: none; color: var(--fg3); font-size: 10px; cursor: pointer; margin-top: 6px; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; font-family: var(--font-body); }
.cart-item-remove:hover { color: #e55; }
.cart-footer { padding: 20px 24px; border-top: 1px solid var(--border); flex-shrink: 0; }
.cart-total-row { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 15px; }
.cart-total-row strong { font-weight: 700; }

/* ── CHECKOUT FORM ── */
.checkout-form { padding: 0 24px 20px; max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease-out); }
.checkout-form.show { max-height: 520px; overflow-y: auto; }
.checkout-form h3 { font-family: var(--font-display); font-size: 17px; margin-bottom: 14px; }
.form-field { margin-bottom: 10px; }
.form-field label { display: block; font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--fg2); margin-bottom: 5px; }
.form-field input, .form-field textarea { width: 100%; padding: 10px 12px; border: 1px solid var(--border2); background: var(--bg2); color: var(--fg); font-size: 13px; font-family: var(--font-body); transition: border-color 0.3s; }
.form-field input:focus, .form-field textarea:focus { outline: none; border-color: var(--accent); }
.form-field textarea { resize: vertical; min-height: 52px; }
.whatsapp-btn { width: 100%; padding: 14px; border: none; background: #25D366; color: #fff; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-family: var(--font-body); transition: background 0.3s; margin-top: 6px; }
.whatsapp-btn:hover { background: #1fb855; }
.checkout-toggle { width: 100%; padding: 14px; border: none; background: var(--fg); color: var(--bg); font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: var(--font-body); transition: all 0.3s; }
.checkout-toggle:hover { background: var(--accent); }

/* ── TOAST ── */
.toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(80px); background: var(--fg); color: var(--bg); padding: 12px 26px; font-size: 12px; font-weight: 600; z-index: 300; transition: transform 0.4s var(--ease-spring); pointer-events: none; letter-spacing: 0.5px; }
.toast.show { transform: translateX(-50%) translateY(0); }

/* ── MOBILE MENU ── */
.mobile-menu { position: fixed; inset: 0; background: var(--bg); z-index: 150; transform: translateX(-100%); transition: transform 0.5s var(--ease-out); display: flex; flex-direction: column; padding: 80px 32px 40px; overflow-y: auto; }
.mobile-menu.open { transform: translateX(0); }
.mobile-menu a { font-size: 26px; font-family: var(--font-display); color: var(--fg); text-decoration: none; padding: 14px 0; border-bottom: 1px solid var(--border); transition: color 0.3s; }
.mobile-menu a:hover { color: var(--accent); }
.mobile-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: var(--fg); cursor: pointer; }

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scrollBounce { 0%,100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(7px); opacity: 0.3; } }
.fade-section { opacity: 0; transform: translateY(36px); transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out); }
.fade-section.visible { opacity: 1; transform: translateY(0); }

/* ── TOUCH DEVICES: always show add-to-cart ── */
@media (hover: none) {
  .product-quick { transform: translateY(0) !important; opacity: 1; }
  .nav-btn, .size-btn, .add-cart-btn, .pill, .btn { -webkit-user-select: none; user-select: none; }
  * { -webkit-touch-callout: none; }
}

/* ── SAFE AREA HANDLING (iPhone notch/status bar) ── */
@supports (padding: max(0px)) {
  .nav-inner { padding-top: max(18px, var(--safe-top)); padding-left: max(var(--gutter), var(--safe-left)); padding-right: max(var(--gutter), var(--safe-right)); }
  .footer { padding-left: max(var(--gutter), var(--safe-left)); padding-right: max(var(--gutter), var(--safe-right)); }
  .section { padding-left: max(var(--gutter), var(--safe-left)); padding-right: max(var(--gutter), var(--safe-right)); }
  .cart-footer { padding-bottom: max(20px, var(--safe-bottom)); }
}

/* ════════════════════════════════════════════════
   BREAKPOINTS
   ════════════════════════════════════════════════ */

/* TABLET LANDSCAPE / SMALL LAPTOP (≤1100px) */
@media (max-width: 1100px) {
  :root { --gutter: 28px; }
  .product-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .reviews-grid { grid-template-columns: repeat(2, 1fr); }
  .footer-inner { grid-template-columns: 1fr 1fr; gap: 36px; }
  .about { grid-template-columns: 1fr; }
  .about-img { height: 420px; }
  .about-text { padding: 56px 36px; }
  .nav-links { display: none; }
  .mobile-toggle { display: flex; }
}

/* TABLET PORTRAIT (≤768px) */
@media (max-width: 768px) {
  :root { --gutter: 20px; }
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .reviews-grid { grid-template-columns: 1fr; gap: 14px; }
  .footer-inner { grid-template-columns: 1fr 1fr; gap: 28px; }
  .nav-inner { padding: 14px var(--gutter); }
  .nav-logo { font-size: 20px; letter-spacing: 3px; }
  .section { padding: 64px var(--gutter); }
  .section-header { margin-bottom: 36px; }
  .filter-bar { flex-direction: column; align-items: stretch; gap: 12px; }
  .search-box { flex: none; width: 100%; }
  .search-box input { padding: 14px 14px 14px 44px; font-size: 16px; }
  .category-pills { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 6px; -webkit-overflow-scrolling: touch; gap: 6px; }
  .pill { flex-shrink: 0; padding: 10px 18px; min-height: 44px; }
  .newsletter { margin: 64px var(--gutter); padding: 44px 24px; }
  .nl-form { flex-direction: column; gap: 0; }
  .newsletter input { width: 100%; padding: 14px 14px; font-size: 16px; }
  .newsletter button { min-height: 44px; }
  .about-img { height: 340px; }
  .about-text { padding: 44px var(--gutter); }
  .about-stats { gap: 20px; }
  .stat-num { font-size: 28px; }
  .hero { min-height: 520px; }
  .hero-btns { gap: 10px; }
  .btn { padding: 14px 26px; font-size: 10px; min-height: 44px; }
  .cart-drawer { width: 100vw; }
  .footer { padding: 48px var(--gutter) 28px; }
}

/* MOBILE (≤600px) - Enhanced for smaller phones */
@media (max-width: 600px) {
  :root { --gutter: 16px; }
  
  /* Prevent zoom on input focus - critical for iOS */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea,
  select {
    font-size: 16px !important;
  }
  
  .announce { font-size: 9px; padding: 8px 12px; letter-spacing: 1.5px; }
  .nav { position: sticky; }
  .nav-inner { padding: 12px var(--gutter); gap: 12px; min-height: 56px; }
  .nav-logo { font-size: 18px; letter-spacing: 2px; }
  .nav-btn { padding: 12px; min-width: 48px; min-height: 48px; }
  .cart-badge { min-width: 20px; height: 20px; font-size: 10px; }
  
  .hero { min-height: 420px; max-height: 100vh; }
  .hero-title { font-size: clamp(28px, 6vw, 44px); line-height: 1.1; }
  .hero-tag { font-size: 9px; letter-spacing: 4px; margin-bottom: 12px; }
  .hero-sub { font-size: 13px; margin-bottom: 20px; }
  .hero-btns { gap: 8px; }
  .hero-scroll { bottom: 20px; }
  
  .section { padding: 48px 16px; }
  .section-tag { font-size: 9px; letter-spacing: 3px; }
  .section-title { font-size: 28px; }
  .section-header { margin-bottom: 28px; }
  
  .filter-bar { gap: 10px; margin-bottom: 32px; }
  .search-box input { padding: 12px 12px 12px 40px; font-size: 16px; }
  .category-pills { gap: 6px; }
  .pill { padding: 9px 16px; font-size: 10px; min-height: 40px; }
  
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .product-img-wrap { aspect-ratio: 3/3.8; }
  .product-info { padding: 10px 0 0; }
  .product-name { font-size: 12px; }
  .product-color { font-size: 10px; }
  .product-price { font-size: 12px; }
  .product-quick { padding: 12px; }
  .size-row { gap: 6px; }
  .size-btn { width: 34px; height: 34px; font-size: 10px; min-width: 34px; min-height: 34px; }
  .add-cart-btn { padding: 10px; font-size: 10px; min-height: 40px; }
  
  .review-card { padding: 16px; }
  .review-text { font-size: 12px; }
  .review-avatar { width: 32px; height: 32px; font-size: 12px; }
  
  .footer { padding: 40px 16px 28px; }
  .footer-inner { grid-template-columns: 1fr 1fr; gap: 20px; }
  .footer-logo { font-size: 18px; }
  .footer-col h4 { font-size: 10px; margin-bottom: 12px; }
  .footer-col a { font-size: 11px; margin-bottom: 8px; }
  .footer-bottom { flex-direction: column; gap: 8px; text-align: center; font-size: 10px; padding-top: 16px; }
  
  .newsletter { padding: 32px 16px; margin: 48px 0; }
  .nl-form { gap: 0; }
  .newsletter input { width: 100%; font-size: 16px; padding: 12px 12px; }
  .newsletter button { min-height: 44px; }
  
  .about-stats { flex-wrap: wrap; gap: 16px; }
  .stat-num { font-size: 24px; }
  
  .mobile-menu { padding: 64px 20px 32px; }
  .mobile-menu a { font-size: 20px; padding: 14px 0; min-height: 48px; }
  
  .cart-drawer { width: 100vw; }
  .cart-header { padding: 16px 20px; min-height: 56px; }
  .cart-header h2 { font-size: 18px; }
  .cart-items { padding: 16px 20px; }
  .cart-item { gap: 12px; padding: 12px 0; }
  .cart-item-img { width: 64px; height: 82px; }
  .qty-btn { width: 36px; height: 36px; min-width: 36px; min-height: 36px; }
  .qty-val { height: 36px; }
  .form-field input { font-size: 16px; padding: 12px 12px; }
  .form-field textarea { font-size: 16px; }
  .whatsapp-btn { min-height: 44px; font-size: 11px; }
  .checkout-toggle { min-height: 44px; }
}

/* MOBILE (≤480px) - Small phones */
@media (max-width: 480px) {
  :root { --gutter: 16px; }
  
  .announce { font-size: 9px; padding: 8px 12px; letter-spacing: 1.5px; }
  .nav-logo { font-size: 16px; letter-spacing: 2px; }
  .nav-inner { padding: 10px var(--gutter); gap: 10px; }
  .nav-btn { padding: 10px; min-width: 44px; min-height: 44px; }
  
  .hero { min-height: 380px; }
  .hero-title { font-size: 28px; }
  .hero-tag { font-size: 8px; letter-spacing: 3px; margin-bottom: 10px; }
  .hero-sub { font-size: 12px; margin-bottom: 18px; }
  .btn { padding: 12px 20px; font-size: 9px; min-height: 44px; }
  
  .section { padding: 40px 16px; }
  .section-tag { font-size: 8px; letter-spacing: 2.5px; }
  .section-title { font-size: 24px; }
  .section-header { margin-bottom: 24px; }
  
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .product-name { font-size: 11px; }
  .product-color { font-size: 9px; }
  .product-price { font-size: 11px; }
  .size-btn { width: 30px; height: 30px; font-size: 8px; min-width: 30px; min-height: 30px; }
  .add-cart-btn { padding: 8px; font-size: 8px; min-height: 36px; }
  
  .review-card { padding: 14px; }
  .review-text { font-size: 11px; }
  
  .footer-inner { grid-template-columns: 1fr; gap: 20px; }
  .footer-bottom { flex-direction: column; gap: 8px; text-align: center; }
  
  .newsletter { padding: 28px 12px; margin: 40px 0; }
  .about-stats { flex-wrap: wrap; gap: 12px; }
  .mobile-menu { padding: 60px 16px 28px; }
  .mobile-menu a { font-size: 18px; padding: 12px 0; }
}

/* IPHONE SE / VERY SMALL (≤375px) */
@media (max-width: 375px) {
  :root { --gutter: 12px; }
  
  .hero-title { font-size: 26px; }
  .hero-tag { font-size: 7px; }
  .hero-sub { font-size: 11px; }
  .btn { padding: 10px 16px; font-size: 8px; min-height: 40px; letter-spacing: 1px; }
  
  .section { padding: 36px 12px; }
  .section-title { font-size: 22px; }
  
  .product-grid { gap: 6px; }
  .product-name { font-size: 10px; }
  .product-price { font-size: 10px; }
  
  .nav-logo { font-size: 14px; letter-spacing: 1.5px; }
  .nav-inner { padding: 8px 12px; }
  
  .review-card { padding: 12px; }
  .footer-logo { font-size: 16px; }
  
  .newsletter { padding: 24px 10px; }
  .search-box input { font-size: 14px; }
}

/* ── LANDSCAPE MODE ── */
@media (max-height: 600px) and (orientation: landscape) {
  .hero { min-height: 100vh; max-height: 100vh; }
  .section { padding: 40px var(--gutter); }
  .hero-scroll { display: none; }
}

/* ── MEDIUM DEVICES (iPad Mini, 600px-800px) ── */
@media (min-width: 601px) and (max-width: 800px) {
  :root { --gutter: 18px; }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .pill { min-height: 42px; }
  .btn { min-height: 44px; }
}
`;

/* ─────────────────────────────────────────────
   SVG ICONS
   ───────────────────────────────────────────── */

const Icons = {
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Cart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Sun: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Moon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h16M4 16h16"/></svg>,
  WhatsApp: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  Star: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
   ───────────────────────────────────────────── */

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────── */

function Navbar() {
  const { dark, toggle } = useTheme();
  const { count, setIsOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <div className="announce">Free Shipping on Orders Over LKR 10,000</div>
      <nav className="nav">
        <div className="nav-inner">
          <button className="mobile-toggle" onClick={() => setMenuOpen(true)} aria-label="Menu"><Icons.Menu /></button>
          <a href="#" className="nav-logo">THINDZ</a>
          <div className="nav-links">
            <a href="#products" className="nav-link">Shop</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-actions">
            <button className="nav-btn" onClick={toggle} aria-label="Toggle theme">
              {dark ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button className="nav-btn" onClick={() => setIsOpen(true)} aria-label="Open cart">
              <Icons.Cart />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close"><Icons.X /></button>
        {["Shop", "About", "Reviews", "Contact"].map(s => (
          <a key={s} href={`#${s.toLowerCase() === "shop" ? "products" : s.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{s}</a>
        ))}
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={HERO_IMG.mobile} />
          <img src={HERO_IMG.desktop} alt="Fashion lifestyle hero" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </picture>
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-tag">New Season 2026</p>
        <h1 className="hero-title">Be <em>Better</em><br />Everyday</h1>
        <p className="hero-sub">Premium active and lifestyle wear designed for those who push boundaries. Comfort meets performance.</p>
        <div className="hero-btns">
          <a href="#products" className="btn btn-primary">Shop Collection</a>
          <a href="#about" className="btn btn-outline">Our Story</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator"><div className="scroll-dot" /></div>
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [toast, setToast] = useState(false);

  const handleAdd = () => {
    const sz = selectedSize || product.sizes[0];
    addItem(product, sz);
    setToast(true);
    setTimeout(() => setToast(false), 1400);
  };

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          className="main-img"
          src={product.image}
          srcSet={`${product.image} 1x, ${product.image2x} 2x`}
          alt={product.name}
          loading="lazy"
          width="400"
          height="520"
        />
        <img className="hover-img" src={product.hoverImage} alt={product.name} loading="lazy" width="400" height="520" />
        <div className="product-quick">
          <div className="size-row">
            {product.sizes.map(s => (
              <button key={s} className={`size-btn ${selectedSize === s ? "sel" : ""}`} onClick={() => setSelectedSize(s)}>{s}</button>
            ))}
          </div>
          <button className="add-cart-btn" onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-meta">
          <span className="product-color">{product.color}</span>
          <span className="product-price">LKR {product.price.toLocaleString()}</span>
        </div>
      </div>
      {toast && <div className="toast show">Added to cart</div>}
    </div>
  );
}

function ProductsSection() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const ref = useFadeIn();

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="section fade-section" id="products" ref={ref}>
      <div className="section-header">
        <p className="section-tag">Shop the latest</p>
        <h2 className="section-title">New Arrivals</h2>
        <p className="section-sub">Curated styles for every occasion — from gym to street.</p>
      </div>
      <div className="filter-bar">
        <div className="search-box">
          <Icons.Search />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="category-pills">
          {CATEGORIES.map(c => (
            <button key={c} className={`pill ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      {filtered.length === 0 && <p style={{ textAlign: "center", color: "var(--fg3)", padding: "48px 0", fontSize: 14 }}>No products found.</p>}
    </section>
  );
}

function Banner() {
  return (
    <div className="banner">
      <picture className="banner-picture">
        <source media="(max-width: 768px)" srcSet={BANNER_IMG.mobile} />
        <img src={BANNER_IMG.desktop} alt="Essentials collection" loading="lazy" />
      </picture>
      <div className="banner-content">
        <h2 className="banner-title">Essentials Collection</h2>
        <p className="banner-sub">Built for comfort, styled for every day.</p>
        <a href="#products" className="btn btn-banner">Shop Now</a>
      </div>
    </div>
  );
}

function About() {
  const ref = useFadeIn();
  return (
    <section className="about fade-section" id="about" ref={ref}>
      <div className="about-img">
        <img src={ABOUT_IMG} alt="Fashion model" loading="lazy" width="700" height="900" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div className="about-text">
        <p className="section-tag">Our Story</p>
        <h2 className="section-title">Crafted for the<br />Modern Athlete</h2>
        <p>We started with a simple belief — everyone deserves clothing that performs as hard as they do. From the gym floor to the city streets, our pieces are designed to move with you.</p>
        <p>Every stitch, every fabric choice, and every design detail is intentional. We source premium materials and use cutting-edge manufacturing to deliver quality you can feel the moment you wear it.</p>
        <div className="about-stats">
          <div><div className="stat-num">50K+</div><div className="stat-label">Happy Customers</div></div>
          <div><div className="stat-num">200+</div><div className="stat-label">Products</div></div>
          <div><div className="stat-num">#1</div><div className="stat-label">In Sri Lanka</div></div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const ref = useFadeIn();
  return (
    <section className="section fade-section" id="reviews" ref={ref}>
      <div className="section-header">
        <p className="section-tag">What people say</p>
        <h2 className="section-title">Customer Reviews</h2>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <div className="review-card" key={i}>
            <div className="review-stars">{Array.from({ length: r.rating }, (_, j) => <Icons.Star key={j} />)}</div>
            <p className="review-text">"{r.text}"</p>
            <div className="review-author">
              <div className="review-avatar">{r.avatar}</div>
              <div>
                <div className="review-name">{r.name}</div>
                <div className="review-verified">Verified Buyer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const ref = useFadeIn();
  return (
    <div className="section fade-section" ref={ref}>
      <div className="newsletter">
        <p className="section-tag">Stay in the loop</p>
        <h2 className="section-title" style={{ marginTop: 10 }}>Sign Up for Drops</h2>
        <p className="section-sub" style={{ margin: "10px auto 0" }}>Notifications you won't want to ignore.</p>
        <div className="nl-form">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div>
          <div className="footer-logo">THINDZ</div>
          <p className="footer-desc">Sri Lanka's #1 active and lifestyle clothing brand. Premium quality, unmatched comfort.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="LinkedIn">IN</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <a href="#products">Men</a><a href="#products">Women</a><a href="#products">Accessories</a><a href="#products">New Arrivals</a><a href="#products">Best Sellers</a>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <a href="#">FAQ</a><a href="#">Shipping</a><a href="#">Returns</a><a href="#">Size Guide</a><a href="#">Contact Us</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#about">About Us</a><a href="#">Careers</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Thindz. All rights reserved.</span>
        <span>Be better everyday</span>
      </div>
    </footer>
  );
}

function CartDrawer() {
  const { items, updateQty, removeItem, total, count, isOpen, setIsOpen } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => { setIsOpen(false); setShowCheckout(false); };

  const handleCheckout = () => {
    if (!form.name || !form.phone || !form.address) return;
    const orderDetails = items.map((item, i) =>
      `${i + 1}. ${item.name}\n   Product ID: ${item.id}\n   Size: ${item.size}\n   Quantity: ${item.qty}`
    ).join("\n\n");
    const message = `Hello, I would like to place an order.\n\nCustomer Details:\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}${form.note ? `\nNote: ${form.note}` : ""}\n\nOrder Details:\n${orderDetails}\n\nTotal Items: ${count}\nTotal: LKR ${total.toLocaleString()}\n\nPlease confirm the order.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={close} />
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Cart ({count})</h2>
          <button className="cart-close" onClick={close} aria-label="Close cart"><Icons.X /></button>
        </div>
        <div className="cart-items">
          {items.length === 0 && (
            <div className="cart-empty">
              <Icons.Cart />
              <p style={{ marginTop: 14, fontSize: 14 }}>Your cart is empty</p>
              <p style={{ fontSize: 12, color: "var(--fg3)", marginTop: 6 }}>Add items to get started</p>
            </div>
          )}
          {items.map(item => (
            <div className="cart-item" key={item.id + item.size}>
              <img className="cart-item-img" src={item.image} alt={item.name} width="72" height="92" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-detail">{item.color} / {item.size} / {item.id}</div>
                <div className="cart-item-price">LKR {(item.price * item.qty).toLocaleString()}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.size, -1)}>−</button>
                  <div className="qty-val">{item.qty}</div>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.size, 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => removeItem(item.id, item.size)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <>
            <div className={`checkout-form ${showCheckout ? "show" : ""}`}>
              <h3>Checkout Details</h3>
              <div className="form-field"><label>Full Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" /></div>
              <div className="form-field"><label>Phone Number *</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+94XXXXXXXXX" /></div>
              <div className="form-field"><label>Address *</label><input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Colombo, Sri Lanka" /></div>
              <div className="form-field"><label>Note (Optional)</label><textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Any special instructions..." /></div>
              <button className="whatsapp-btn" onClick={handleCheckout}><Icons.WhatsApp /> Order via WhatsApp</button>
            </div>
            <div className="cart-footer">
              <div className="cart-total-row"><span>Total</span><strong>LKR {total.toLocaleString()}</strong></div>
              <button className="checkout-toggle" onClick={() => setShowCheckout(s => !s)}>
                {showCheckout ? "Hide Checkout" : "Proceed to Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   APP
   ───────────────────────────────────────────── */

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </ThemeProvider>
  );
}

function AppInner() {
  const { dark } = useTheme();
  return (
    <div className="page" data-theme={dark ? "dark" : "light"}>
      <style>{css}</style>
      <Navbar />
      <Hero />
      <ProductsSection />
      <Banner />
      <About />
      <Reviews />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </div>
  );
}

import { useState, useEffect, useCallback, useMemo, createContext, useContext } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
`;

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const CATEGORIES = ["Fashion","Sneakers","Streetwear","Accessories","Beauty","Food & Drink","Tech","Home Decor","Art","Music"];

const BRANDS_SEED = [
  { id:"b1", name:"Skhokho Studios", logo:"https://api.dicebear.com/7.x/shapes/svg?seed=skhokho&backgroundColor=ff6b35", banner:"https://picsum.photos/seed/skhokho/800/200", description:"Bold African streetwear crafted in Joburg. Every piece tells a story of the city.", whatsapp:"27821234567", website:"https://skhokho.co.za", instagram:"skhokho_studios", twitter:"skhokho_zw", category:"Streetwear", status:"featured", created_at:"2024-01-15", owner:"seller1" },
  { id:"b2", name:"Ubuntu Kicks", logo:"https://api.dicebear.com/7.x/shapes/svg?seed=ubuntu&backgroundColor=00d4aa", banner:"https://picsum.photos/seed/ubuntukicks/800/200", description:"Premium sneaker culture from Cape Town. Limited drops. Authentic vibes.", whatsapp:"27834567890", website:"https://ubuntukicks.co.za", instagram:"ubuntu_kicks", twitter:"", category:"Sneakers", status:"verified", created_at:"2024-02-01", owner:"seller2" },
  { id:"b3", name:"Mzansi Makoti", logo:"https://api.dicebear.com/7.x/shapes/svg?seed=makoti&backgroundColor=ff3366", banner:"https://picsum.photos/seed/makoti/800/200", description:"Handcrafted accessories blending Zulu tradition with modern flair.", whatsapp:"27845678901", website:"", instagram:"mzansi_makoti", twitter:"", category:"Accessories", status:"verified", created_at:"2024-02-10", owner:"seller3" },
  { id:"b4", name:"Kasi Flavours", logo:"https://api.dicebear.com/7.x/shapes/svg?seed=kasi&backgroundColor=ffd700", banner:"https://picsum.photos/seed/kasiflavours/800/200", description:"Township-inspired food products. Real flavours. Real culture.", whatsapp:"27856789012", website:"https://kasiflavours.co.za", instagram:"kasi_flavours", twitter:"kasi_flavours", category:"Food & Drink", status:"unverified", created_at:"2024-03-01", owner:"seller4" },
  { id:"b5", name:"Thabo Tech", logo:"https://api.dicebear.com/7.x/shapes/svg?seed=thabo&backgroundColor=7c3aed", banner:"https://picsum.photos/seed/thabotech/800/200", description:"Local tech accessories built for African conditions. No load-shedding excuses.", whatsapp:"27867890123", website:"https://thabotech.co.za", instagram:"thabotech", twitter:"thabotech_sa", category:"Tech", status:"verified", created_at:"2024-03-15", owner:"seller5" },
];

const PRODUCTS_SEED = [
  { id:"p1", name:"Joburg Streets Hoodie", price:890, images:["https://picsum.photos/seed/hood1/400/400","https://picsum.photos/seed/hood1b/400/400"], description:"Premium heavyweight hoodie with embroidered skyline. 380gsm cotton blend. Available in Black, Olive and Sand.", category:"Streetwear", stock:"in_stock", brand:"b1", views:342, created_at:"2024-03-01" },
  { id:"p2", name:"Kasi Drip Tee", price:420, images:["https://picsum.photos/seed/tee1/400/400","https://picsum.photos/seed/tee1b/400/400"], description:"100% organic cotton. Screen-printed with original township art.", category:"Streetwear", stock:"in_stock", brand:"b1", views:218, created_at:"2024-03-05" },
  { id:"p3", name:"Umkhokha Low-Top", price:1450, images:["https://picsum.photos/seed/shoe1/400/400","https://picsum.photos/seed/shoe1b/400/400"], description:"Hand-finished leather upper. Rubber sole. Made in Cape Town. Limited to 200 pairs per colourway.", category:"Sneakers", stock:"in_stock", brand:"b2", views:891, created_at:"2024-02-20" },
  { id:"p4", name:"Siyabonga Air Force", price:1200, images:["https://picsum.photos/seed/shoe2/400/400"], description:"Clean. Classic. Cape Town crafted. Premium canvas upper with cushioned insole.", category:"Sneakers", stock:"out_of_stock", brand:"b2", views:567, created_at:"2024-03-01" },
  { id:"p5", name:"Beaded Choker Set", price:280, images:["https://picsum.photos/seed/choker/400/400","https://picsum.photos/seed/chokerb/400/400","https://picsum.photos/seed/chokerc/400/400"], description:"Handmade Zulu beaded choker. Each piece unique. Set of 3.", category:"Accessories", stock:"in_stock", brand:"b3", views:445, created_at:"2024-02-28" },
  { id:"p6", name:"Ingxowa Tote Bag", price:350, images:["https://picsum.photos/seed/tote/400/400"], description:"Woven grass and leather tote. Handcrafted in KZN.", category:"Accessories", stock:"in_stock", brand:"b3", views:234, created_at:"2024-03-10" },
  { id:"p7", name:"Pap & Sous Spice Kit", price:195, images:["https://picsum.photos/seed/spice/400/400","https://picsum.photos/seed/spiceb/400/400"], description:"3-pack of township kitchen staples. Peri-peri, chakalaka, braai rub.", category:"Food & Drink", stock:"in_stock", brand:"b4", views:678, created_at:"2024-03-12" },
  { id:"p8", name:"Mzansi Power Bank 20k", price:650, images:["https://picsum.photos/seed/powerbank/400/400"], description:"20,000mAh with load-shedding surge protection. Dual USB-C. Solar top-up panel.", category:"Tech", stock:"in_stock", brand:"b5", views:1203, created_at:"2024-03-08" },
  { id:"p9", name:"Solar Desk Lamp", price:480, images:["https://picsum.photos/seed/lamp/400/400","https://picsum.photos/seed/lampb/400/400"], description:"6h runtime. USB-C rechargeable. Built for loadshedding life.", category:"Tech", stock:"in_stock", brand:"b5", views:934, created_at:"2024-03-14" },
  { id:"p10", name:"Ndlela Cargo Pants", price:1100, images:["https://picsum.photos/seed/cargo/400/400"], description:"6-pocket utility cargo in wax cotton. Water resistant. Tailored in Durban.", category:"Fashion", stock:"in_stock", brand:"b1", views:412, created_at:"2024-03-15" },
  { id:"p11", name:"Sunset Ankara Blazer", price:1890, images:["https://picsum.photos/seed/blazer/400/400","https://picsum.photos/seed/blazerb/400/400"], description:"Hand-cut Ankara print blazer. Unlined for summer. One of a kind colourways.", category:"Fashion", stock:"in_stock", brand:"b3", views:310, created_at:"2024-03-16" },
  { id:"p12", name:"Braai Tech Thermometer", price:390, images:["https://picsum.photos/seed/thermo/400/400"], description:"Bluetooth meat thermometer. App controlled. Braai-proof stainless probe.", category:"Tech", stock:"out_of_stock", brand:"b5", views:287, created_at:"2024-03-02" },
];

const USERS_SEED = [
  { id:"admin1", email:"admin@mzansistreet.mobi", password:"admin123", role:"admin", name:"Site Admin" },
  { id:"seller1", email:"seller@skhokho.co.za", password:"pass123", role:"seller", name:"Siya Ndlovu", brandId:"b1" },
  { id:"seller2", email:"seller@ubuntukicks.co.za", password:"pass123", role:"seller", name:"Thandi Mokoena", brandId:"b2" },
];

// ─── APP CONTEXT ──────────────────────────────────────────────────────────────
const AppContext = createContext(null);

const useApp = () => useContext(AppContext);

function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [page, setPage] = useState("home");
  const [pageParams, setPageParams] = useState({});
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(PRODUCTS_SEED);
  const [brands, setBrands] = useState(BRANDS_SEED);
  const [users] = useState(USERS_SEED);
  const [toast, setToast] = useState(null);

  const navigate = useCallback((p, params = {}) => {
    setPage(p);
    setPageParams(params);
    window.scrollTo(0, 0);
  }, []);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const login = useCallback((email, password) => {
    const u = users.find(u => u.email === email && u.password === password);
    if (u) { setUser(u); return true; }
    return false;
  }, [users]);

  const logout = useCallback(() => { setUser(null); navigate("home"); }, [navigate]);

  const addProduct = useCallback((prod) => {
    const np = { ...prod, id: "p" + Date.now(), created_at: new Date().toISOString().split("T")[0], views: 0 };
    setProducts(prev => [np, ...prev]);
    return np;
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateBrand = useCallback((id, data) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
  }, []);

  return (
    <AppContext.Provider value={{ theme, setTheme, page, pageParams, navigate, user, login, logout, products, brands, addProduct, updateProduct, deleteProduct, updateBrand, showToast, toast }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const GlobalStyles = ({ theme }) => {
  const dark = theme === "dark";
  return (
    <style>{`
      ${FONTS}
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --bg: ${dark ? "#0a0a0a" : "#f5f2ed"};
        --bg2: ${dark ? "#111111" : "#ebe7e0"};
        --bg3: ${dark ? "#1a1a1a" : "#e0dbd3"};
        --card: ${dark ? "#141414" : "#ffffff"};
        --border: ${dark ? "#222222" : "#d8d3ca"};
        --border2: ${dark ? "#2a2a2a" : "#ccc7be"};
        --text: ${dark ? "#f0ece4" : "#1a1714"};
        --text2: ${dark ? "#888880" : "#6b6560"};
        --text3: ${dark ? "#555550" : "#999590"};
        --accent: #ff6b35;
        --accent2: #00d4aa;
        --gold: #f5b800;
        --red: #ff3366;
        --green: #22c55e;
        --purple: #a855f7;
        --radius: 12px;
        --radius-sm: 8px;
        --shadow: ${dark ? "0 4px 24px rgba(0,0,0,0.6)" : "0 4px 24px rgba(0,0,0,0.12)"};
        --shadow-sm: ${dark ? "0 2px 8px rgba(0,0,0,0.4)" : "0 2px 8px rgba(0,0,0,0.08)"};
      }
      html { font-size: 16px; scroll-behavior: smooth; }
      body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; line-height: 1.5; min-height: 100vh; overflow-x: hidden; }
      h1,h2,h3 { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; line-height: 1.1; }
      h4,h5,h6 { font-family: 'Outfit', sans-serif; font-weight: 600; }
      a { color: inherit; text-decoration: none; }
      img { max-width: 100%; display: block; }
      button { cursor: pointer; border: none; outline: none; font-family: 'Outfit', sans-serif; }
      input, textarea, select { font-family: 'Outfit', sans-serif; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
      .mono { font-family: 'JetBrains Mono', monospace; }
      @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      @keyframes slideDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
      @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
      @keyframes spin { to { transform: rotate(360deg); } }
      @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      .fade-in { animation: fadeIn 0.4s ease forwards; }
      .skeleton {
        background: linear-gradient(90deg, var(--bg3) 25%, var(--border) 50%, var(--bg3) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: var(--radius-sm);
      }
      @media (max-width: 640px) {
        h1 { font-size: 2.4rem; }
        h2 { font-size: 1.8rem; }
      }
    `}</style>
  );
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

const Badge = ({ status }) => {
  const map = {
    featured: { label: "★ Featured", bg: "#f5b800", color: "#000" },
    verified: { label: "✓ Verified", bg: "#00d4aa", color: "#000" },
    unverified: { label: "Unverified", bg: "var(--bg3)", color: "var(--text2)" },
    in_stock: { label: "In Stock", bg: "#22c55e22", color: "#22c55e" },
    out_of_stock: { label: "Out of Stock", bg: "#ff336622", color: "#ff3366" },
  };
  const s = map[status] || map.unverified;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"2px 8px", borderRadius:99, background:s.bg, color:s.color, fontSize:"0.7rem", fontWeight:600, whiteSpace:"nowrap", fontFamily:"'Outfit', sans-serif" }}>
      {s.label}
    </span>
  );
};

const Btn = ({ children, onClick, variant="primary", size="md", style:sx={}, disabled, full, type="button" }) => {
  const base = {
    display: "inline-flex", alignItems:"center", justifyContent:"center", gap:6,
    fontFamily:"'Outfit', sans-serif", fontWeight:600, cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1, transition:"all 0.2s", border:"none", whiteSpace:"nowrap",
    width: full ? "100%" : "auto",
  };
  const sizes = { sm: { padding:"6px 14px", fontSize:"0.8rem", borderRadius:8 }, md: { padding:"10px 20px", fontSize:"0.9rem", borderRadius:10 }, lg: { padding:"14px 28px", fontSize:"1rem", borderRadius:12 } };
  const variants = {
    primary: { background:"var(--accent)", color:"#fff" },
    secondary: { background:"var(--bg3)", color:"var(--text)", border:"1px solid var(--border2)" },
    ghost: { background:"transparent", color:"var(--text2)", border:"1px solid var(--border)" },
    danger: { background:"#ff336622", color:"#ff3366", border:"1px solid #ff336633" },
    whatsapp: { background:"#25D366", color:"#fff" },
    gold: { background:"var(--gold)", color:"#000" },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...sx }}>
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, type="text", placeholder, required, style:sx={} }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}{required && " *"}</label>}
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} required={required}
      style={{ background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:10, padding:"10px 14px", color:"var(--text)", fontSize:"0.95rem", outline:"none", transition:"border-color 0.2s", width:"100%", ...sx }}
      onFocus={e => e.target.style.borderColor = "var(--accent)"}
      onBlur={e => e.target.style.borderColor = "var(--border2)"}
    />
  </div>
);

const Textarea = ({ label, value, onChange, placeholder, rows=4 }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</label>}
    <textarea
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{ background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:10, padding:"10px 14px", color:"var(--text)", fontSize:"0.95rem", outline:"none", resize:"vertical", width:"100%" }}
      onFocus={e => e.target.style.borderColor = "var(--accent)"}
      onBlur={e => e.target.style.borderColor = "var(--border2)"}
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
    {label && <label style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</label>}
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{ background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:10, padding:"10px 14px", color:"var(--text)", fontSize:"0.95rem", outline:"none", width:"100%", cursor:"pointer" }}
    >
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  </div>
);

const Card = ({ children, style:sx={}, onClick }) => (
  <div onClick={onClick}
    style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius)", overflow:"hidden", transition:"transform 0.2s, box-shadow 0.2s", cursor: onClick ? "pointer" : "default", ...sx }}
    onMouseEnter={e => { if(onClick) { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="var(--shadow)"; }}}
    onMouseLeave={e => { if(onClick) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}}
  >
    {children}
  </div>
);

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", zIndex:9999, animation:"slideDown 0.3s ease", background: toast.type === "error" ? "#ff3366" : "#22c55e", color:"#fff", padding:"12px 24px", borderRadius:12, fontWeight:600, fontSize:"0.9rem", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", whiteSpace:"nowrap" }}>
      {toast.msg}
    </div>
  );
};

const Spinner = () => (
  <div style={{ width:32, height:32, border:"3px solid var(--border)", borderTopColor:"var(--accent)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
);

const EmptyState = ({ icon, title, sub, action }) => (
  <div style={{ textAlign:"center", padding:"60px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
    <div style={{ fontSize:"3rem" }}>{icon}</div>
    <h3 style={{ color:"var(--text)", fontSize:"1.2rem" }}>{title}</h3>
    <p style={{ color:"var(--text2)", fontSize:"0.9rem", maxWidth:300 }}>{sub}</p>
    {action}
  </div>
);

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
const ProductCard = ({ product }) => {
  const { navigate, brands } = useApp();
  const brand = brands.find(b => b.id === product.brand);
  const [imgErr, setImgErr] = useState(false);

  return (
    <Card onClick={() => navigate("product", { id: product.id })} style={{ display:"flex", flexDirection:"column" }}>
      <div style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"var(--bg2)" }}>
        <img
          src={imgErr ? `https://api.dicebear.com/7.x/shapes/svg?seed=${product.id}` : product.images[0]}
          alt={product.name}
          onError={() => setImgErr(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s" }}
          onMouseEnter={e => e.target.style.transform="scale(1.05)"}
          onMouseLeave={e => e.target.style.transform="scale(1)"}
        />
        <div style={{ position:"absolute", top:8, right:8 }}>
          <Badge status={product.stock} />
        </div>
        {brand?.status === "featured" && (
          <div style={{ position:"absolute", top:8, left:8, background:"var(--gold)", color:"#000", fontSize:"0.65rem", fontWeight:700, padding:"2px 7px", borderRadius:6 }}>FEATURED</div>
        )}
      </div>
      <div style={{ padding:"12px 14px 14px", flex:1, display:"flex", flexDirection:"column", gap:6 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {brand && (
            <img src={brand.logo} alt={brand.name} style={{ width:18, height:18, borderRadius:"50%", flexShrink:0 }} />
          )}
          <span style={{ fontSize:"0.72rem", color:"var(--text2)", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{brand?.name}</span>
          {brand && <Badge status={brand.status} />}
        </div>
        <div style={{ fontWeight:600, fontSize:"0.95rem", lineHeight:1.3, color:"var(--text)", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{product.name}</div>
        <div style={{ marginTop:"auto", paddingTop:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.3rem", color:"var(--accent)", letterSpacing:"0.05em" }}>R {product.price.toLocaleString()}</span>
          <span style={{ fontSize:"0.72rem", color:"var(--text3)" }}>👁 {product.views}</span>
        </div>
      </div>
    </Card>
  );
};

// ─── BRAND CARD ───────────────────────────────────────────────────────────────
const BrandCard = ({ brand }) => {
  const { navigate, products } = useApp();
  const count = products.filter(p => p.brand === brand.id).length;
  return (
    <Card onClick={() => navigate("brand", { id: brand.id })} style={{ overflow:"hidden" }}>
      <div style={{ height:80, overflow:"hidden", position:"relative" }}>
        <img src={brand.banner} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))" }} />
      </div>
      <div style={{ padding:"0 16px 16px", position:"relative" }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:12, marginTop:-24, marginBottom:10 }}>
          <img src={brand.logo} alt={brand.name} style={{ width:48, height:48, borderRadius:12, border:"2px solid var(--card)", flexShrink:0 }} />
          <div style={{ paddingBottom:2 }}>
            <div style={{ fontWeight:700, fontSize:"0.95rem" }}>{brand.name}</div>
            <Badge status={brand.status} />
          </div>
        </div>
        <p style={{ fontSize:"0.8rem", color:"var(--text2)", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", lineHeight:1.5 }}>{brand.description}</p>
        <div style={{ marginTop:10, fontSize:"0.75rem", color:"var(--text3)", fontWeight:500 }}>{count} product{count !== 1 ? "s" : ""} • {brand.category}</div>
      </div>
    </Card>
  );
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { navigate, page, user, logout, theme, setTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchVal.trim()) {
      navigate("search", { q: searchVal.trim() });
      setSearchVal("");
      setMenuOpen(false);
    }
  };

  const navLinks = [
    { label:"Home", page:"home" },
    { label:"Brands", page:"brands" },
    { label:"Categories", page:"categories" },
  ];

  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(var(--bg-raw, 10,10,10), 0.95)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--border)", WebkitBackdropFilter:"blur(20px)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", gap:12, height:60 }}>
        {/* Logo */}
        <div onClick={() => navigate("home")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ background:"var(--accent)", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue'", fontSize:"1.1rem", color:"#fff" }}>M</div>
          <span style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.2rem", letterSpacing:"0.06em", display:"none" }} className="show-md">MzansiStreet</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display:"flex", gap:4, marginLeft:8 }}>
          {navLinks.map(l => (
            <button key={l.page} onClick={() => navigate(l.page)}
              style={{ background:"none", border:"none", color: page === l.page ? "var(--accent)" : "var(--text2)", fontWeight:600, fontSize:"0.85rem", padding:"6px 12px", borderRadius:8, cursor:"pointer", transition:"color 0.2s" }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div style={{ flex:1, maxWidth:320, position:"relative" }}>
          <input
            value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={handleSearch}
            placeholder="Search products, brands..."
            style={{ width:"100%", background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:99, padding:"7px 16px 7px 36px", color:"var(--text)", fontSize:"0.85rem", outline:"none" }}
          />
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)", fontSize:"0.9rem" }}>🔍</span>
        </div>

        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          {/* Theme toggle */}
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:8, padding:"6px 10px", fontSize:"1rem", cursor:"pointer", color:"var(--text)" }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {user ? (
            <div style={{ position:"relative" }}>
              <button onClick={() => setMenuOpen(m => !m)} style={{ background:"var(--accent)", border:"none", borderRadius:8, padding:"6px 14px", color:"#fff", fontWeight:600, fontSize:"0.85rem", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                <span>👤</span><span style={{ display:"none" }} className="show-sm">{user.name.split(" ")[0]}</span>
              </button>
              {menuOpen && (
                <div style={{ position:"absolute", right:0, top:"calc(100% + 8px)", background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, padding:8, minWidth:160, boxShadow:"var(--shadow)", zIndex:200 }}>
                  {user.role === "seller" && <MenuItem label="Dashboard" icon="📊" onClick={() => { navigate("dashboard"); setMenuOpen(false); }} />}
                  {user.role === "admin" && <MenuItem label="Admin Panel" icon="⚙️" onClick={() => { navigate("admin"); setMenuOpen(false); }} />}
                  <div style={{ borderTop:"1px solid var(--border)", margin:"4px 0" }} />
                  <MenuItem label="Log Out" icon="🚪" onClick={() => { logout(); setMenuOpen(false); }} />
                </div>
              )}
            </div>
          ) : (
            <Btn size="sm" onClick={() => navigate("login")}>Sign In</Btn>
          )}
        </div>
      </div>
    </nav>
  );
};

const MenuItem = ({ label, icon, onClick }) => (
  <button onClick={onClick} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 12px", borderRadius:8, background:"none", border:"none", color:"var(--text)", fontSize:"0.85rem", fontWeight:500, cursor:"pointer", textAlign:"left" }}
    onMouseEnter={e => e.currentTarget.style.background="var(--bg3)"}
    onMouseLeave={e => e.currentTarget.style.background="none"}
  >
    {icon} {label}
  </button>
);

// ─── PAGES ────────────────────────────────────────────────────────────────────

// HOME PAGE
const HomePage = () => {
  const { products, brands, navigate } = useApp();
  const featured = brands.filter(b => b.status === "featured");
  const latest = [...products].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,8);
  const popular = [...products].sort((a,b) => b.views - a.views).slice(0,4);

  return (
    <div className="fade-in">
      {/* Hero */}
      <section style={{ background:"linear-gradient(135deg, var(--bg) 0%, var(--bg2) 100%)", padding:"60px 16px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", background:"var(--accent)", opacity:0.06, filter:"blur(80px)" }} />
        <div style={{ position:"absolute", bottom:-80, left:-40, width:250, height:250, borderRadius:"50%", background:"var(--accent2)", opacity:0.06, filter:"blur(80px)" }} />
        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
          <div style={{ fontSize:"0.8rem", color:"var(--accent)", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>🇿🇦 South Africa's Local Brand Marketplace</div>
          <h1 style={{ fontSize:"clamp(2.8rem, 8vw, 5.5rem)", color:"var(--text)", marginBottom:16, lineHeight:1 }}>
            DISCOVER<br /><span style={{ color:"var(--accent)" }}>MZANSI</span> BRANDS
          </h1>
          <p style={{ color:"var(--text2)", maxWidth:500, fontSize:"1rem", marginBottom:32, lineHeight:1.7 }}>
            Shop local. Support South African makers, designers, and entrepreneurs. Connect directly via WhatsApp.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Btn size="lg" onClick={() => navigate("search", { q:"" })}>Browse Products</Btn>
            <Btn size="lg" variant="secondary" onClick={() => navigate("brands")}>View All Brands</Btn>
          </div>
          <div style={{ display:"flex", gap:24, marginTop:40, flexWrap:"wrap" }}>
            {[["500+","Products"], ["80+","Brands"], ["🇿🇦","South African"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Bebas Neue'", fontSize:"1.8rem", color:"var(--accent)" }}>{n}</div>
                <div style={{ fontSize:"0.8rem", color:"var(--text2)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section style={{ borderBottom:"1px solid var(--border)", overflowX:"auto", background:"var(--bg2)" }}>
        <div style={{ display:"flex", gap:0, maxWidth:1200, margin:"0 auto" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => navigate("search", { category: cat })}
              style={{ padding:"12px 20px", background:"none", border:"none", borderRight:"1px solid var(--border)", color:"var(--text2)", fontSize:"0.8rem", fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s", flexShrink:0 }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--bg3)"; e.currentTarget.style.color="var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="none"; e.currentTarget.style.color="var(--text2)"; }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 16px" }}>
        {/* Featured Brands */}
        {featured.length > 0 && (
          <section style={{ marginBottom:48 }}>
            <SectionHeader title="Featured Brands" sub="Premium verified sellers" action={{ label:"All Brands →", onClick: () => navigate("brands") }} />
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
              {featured.map(b => <BrandCard key={b.id} brand={b} />)}
            </div>
          </section>
        )}

        {/* Popular now */}
        <section style={{ marginBottom:48 }}>
          <SectionHeader title="🔥 Trending Now" sub="Most viewed this week" action={{ label:"View All →", onClick: () => navigate("search", { sort:"popular" }) }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16 }}>
            {popular.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Latest */}
        <section style={{ marginBottom:48 }}>
          <SectionHeader title="Latest Drops" sub="Freshest products" action={{ label:"View All →", onClick: () => navigate("search", { sort:"newest" }) }} />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16 }}>
            {latest.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, sub, action }) => (
  <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:20, gap:12, flexWrap:"wrap" }}>
    <div>
      <h2 style={{ fontSize:"1.8rem", color:"var(--text)" }}>{title}</h2>
      {sub && <p style={{ color:"var(--text2)", fontSize:"0.85rem", marginTop:2 }}>{sub}</p>}
    </div>
    {action && (
      <button onClick={action.onClick} style={{ background:"none", border:"none", color:"var(--accent)", fontWeight:600, fontSize:"0.85rem", cursor:"pointer", padding:"4px 0" }}>{action.label}</button>
    )}
  </div>
);

// SEARCH PAGE
const SearchPage = () => {
  const { products, brands, pageParams, navigate } = useApp();
  const [query, setQuery] = useState(pageParams.q || "");
  const [category, setCategory] = useState(pageParams.category || "");
  const [sort, setSort] = useState(pageParams.sort || "newest");
  const [tab, setTab] = useState("products");
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 12;

  const filteredProducts = useMemo(() => {
    let res = [...products];
    if (query) res = res.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    if (category) res = res.filter(p => p.category === category);
    if (sort === "newest") res.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    if (sort === "price_asc") res.sort((a,b) => a.price - b.price);
    if (sort === "price_desc") res.sort((a,b) => b.price - a.price);
    if (sort === "popular") res.sort((a,b) => b.views - a.views);
    return res;
  }, [products, query, category, sort]);

  const filteredBrands = useMemo(() => {
    if (!query) return brands;
    return brands.filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.category.toLowerCase().includes(query.toLowerCase()));
  }, [brands, query]);

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  const paginated = filteredProducts.slice((currentPage-1)*PER_PAGE, currentPage*PER_PAGE);

  return (
    <div className="fade-in" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 16px" }}>
      {/* Search bar */}
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontSize:"2rem", marginBottom:16 }}>Search</h2>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
          <div style={{ flex:"1 1 260px", position:"relative" }}>
            <input value={query} onChange={e => { setQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search products or brands..."
              style={{ width:"100%", background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:12, padding:"12px 16px 12px 42px", color:"var(--text)", fontSize:"0.95rem", outline:"none" }}
            />
            <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"var(--text3)" }}>🔍</span>
          </div>
          <Select value={category} onChange={v => { setCategory(v); setCurrentPage(1); }} options={[{value:"",label:"All Categories"}, ...CATEGORIES.map(c => ({value:c,label:c}))]} />
          <Select value={sort} onChange={setSort} options={[{value:"newest",label:"Newest"},{value:"popular",label:"Most Popular"},{value:"price_asc",label:"Price: Low → High"},{value:"price_desc",label:"Price: High → Low"}]} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:"1px solid var(--border)", marginBottom:24 }}>
        {[["products",`Products (${filteredProducts.length})`],["brands",`Brands (${filteredBrands.length})`]].map(([t,l]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"10px 20px", background:"none", border:"none", borderBottom:`2px solid ${tab===t?"var(--accent)":"transparent"}`, color: tab===t ? "var(--accent)" : "var(--text2)", fontWeight:600, fontSize:"0.9rem", cursor:"pointer", transition:"all 0.2s" }}>{l}</button>
        ))}
      </div>

      {tab === "products" && (
        <>
          {paginated.length === 0 ? (
            <EmptyState icon="🔍" title="No products found" sub="Try adjusting your search or filters" />
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16, marginBottom:32 }}>
              {paginated.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
          {totalPages > 1 && (
            <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
              <Btn size="sm" variant="secondary" disabled={currentPage===1} onClick={() => setCurrentPage(p => p-1)}>← Prev</Btn>
              {Array.from({length:totalPages},(_,i) => (
                <button key={i} onClick={() => setCurrentPage(i+1)} style={{ width:36, height:36, borderRadius:8, border:"1px solid var(--border)", background: currentPage===i+1 ? "var(--accent)" : "var(--bg3)", color: currentPage===i+1 ? "#fff" : "var(--text)", cursor:"pointer", fontWeight:600, fontSize:"0.85rem" }}>{i+1}</button>
              ))}
              <Btn size="sm" variant="secondary" disabled={currentPage===totalPages} onClick={() => setCurrentPage(p => p+1)}>Next →</Btn>
            </div>
          )}
        </>
      )}

      {tab === "brands" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
          {filteredBrands.length === 0 ? <EmptyState icon="🏪" title="No brands found" sub="Try a different search term" /> :
            filteredBrands.map(b => <BrandCard key={b.id} brand={b} />)}
        </div>
      )}
    </div>
  );
};

// PRODUCT PAGE
const ProductPage = () => {
  const { pageParams, products, brands, navigate } = useApp();
  const product = products.find(p => p.id === pageParams.id);
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) return <EmptyState icon="😕" title="Product not found" sub="" action={<Btn onClick={() => navigate("home")}>Go Home</Btn>} />;

  const brand = brands.find(b => b.id === product.brand);
  const wa = `https://wa.me/${brand?.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in "${product.name}" (R${product.price}) from your MzansiStreet listing. Is it available?`)}`;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);

  return (
    <div className="fade-in" style={{ maxWidth:1200, margin:"0 auto", padding:"24px 16px" }}>
      {/* Breadcrumb */}
      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:24, fontSize:"0.8rem", color:"var(--text2)" }}>
        <span onClick={() => navigate("home")} style={{ cursor:"pointer", color:"var(--accent)" }}>Home</span>
        <span>›</span>
        <span onClick={() => navigate("search", { category: product.category })} style={{ cursor:"pointer", color:"var(--accent)" }}>{product.category}</span>
        <span>›</span>
        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{product.name}</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, marginBottom:48 }}>
        {/* Image Gallery */}
        <div>
          <div style={{ borderRadius:"var(--radius)", overflow:"hidden", aspectRatio:"1/1", background:"var(--bg2)", marginBottom:12 }}>
            <img src={product.images[imgIdx]} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          </div>
          {product.images.length > 1 && (
            <div style={{ display:"flex", gap:8 }}>
              {product.images.map((img,i) => (
                <div key={i} onClick={() => setImgIdx(i)} style={{ width:64, height:64, borderRadius:8, overflow:"hidden", cursor:"pointer", border:`2px solid ${imgIdx===i?"var(--accent)":"var(--border)"}` }}>
                  <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          <div>
            {brand && (
              <div onClick={() => navigate("brand", { id: brand.id })} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, cursor:"pointer" }}>
                <img src={brand.logo} alt={brand.name} style={{ width:32, height:32, borderRadius:8 }} />
                <span style={{ fontWeight:600, fontSize:"0.9rem" }}>{brand.name}</span>
                <Badge status={brand.status} />
              </div>
            )}
            <h1 style={{ fontSize:"clamp(1.8rem, 4vw, 2.5rem)", color:"var(--text)", marginBottom:8 }}>{product.name}</h1>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontFamily:"'Bebas Neue'", fontSize:"2.2rem", color:"var(--accent)" }}>R {product.price.toLocaleString()}</span>
              <Badge status={product.stock} />
            </div>
          </div>

          <div style={{ background:"var(--bg2)", borderRadius:"var(--radius)", padding:16 }}>
            <div style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text2)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Description</div>
            <p style={{ color:"var(--text)", lineHeight:1.7, fontSize:"0.95rem" }}>{product.description}</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, fontSize:"0.85rem" }}>
            {[["Category",product.category],["Listed",product.created_at],["Views",product.views.toLocaleString()]].map(([k,v]) => (
              <div key={k} style={{ background:"var(--bg3)", padding:"10px 14px", borderRadius:8 }}>
                <div style={{ color:"var(--text2)", fontSize:"0.75rem", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{k}</div>
                <div style={{ color:"var(--text)", fontWeight:500, marginTop:2 }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {brand?.whatsapp && (
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <Btn variant="whatsapp" size="lg" full>
                  <span>💬</span> Chat on WhatsApp
                </Btn>
              </a>
            )}
            {brand?.website && (
              <a href={brand.website} target="_blank" rel="noopener noreferrer">
                <Btn variant="secondary" size="lg" full>
                  <span>🌐</span> Visit Website
                </Btn>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <SectionHeader title="More in This Category" sub="" />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16 }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

// BRAND PAGE
const BrandPage = () => {
  const { pageParams, brands, products, navigate } = useApp();
  const brand = brands.find(b => b.id === pageParams.id);
  const [sort, setSort] = useState("newest");

  if (!brand) return <EmptyState icon="😕" title="Brand not found" sub="" action={<Btn onClick={() => navigate("brands")}>View All Brands</Btn>} />;

  const brandProducts = useMemo(() => {
    let res = products.filter(p => p.brand === brand.id);
    if (sort === "newest") res.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    if (sort === "price_asc") res.sort((a,b) => a.price - b.price);
    if (sort === "popular") res.sort((a,b) => b.views - a.views);
    return res;
  }, [products, brand.id, sort]);

  const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hi ${brand.name}! I found you on MzansiStreet and would like to know more about your products.`)}`;

  return (
    <div className="fade-in">
      {/* Banner */}
      <div style={{ position:"relative", height:200, overflow:"hidden" }}>
        <img src={brand.banner} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8))" }} />
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px" }}>
        {/* Brand header */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:16, marginTop:-40, marginBottom:24, flexWrap:"wrap" }}>
          <img src={brand.logo} alt={brand.name} style={{ width:80, height:80, borderRadius:16, border:"3px solid var(--card)", flexShrink:0, background:"var(--bg2)" }} />
          <div style={{ flex:1, paddingBottom:4 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:4 }}>
              <h1 style={{ fontSize:"2rem", color:"var(--text)" }}>{brand.name}</h1>
              <Badge status={brand.status} />
            </div>
            <p style={{ color:"var(--text2)", fontSize:"0.9rem" }}>{brand.category}</p>
          </div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", paddingBottom:4 }}>
            {brand.whatsapp && (
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <Btn variant="whatsapp"><span>💬</span> WhatsApp</Btn>
              </a>
            )}
            {brand.website && (
              <a href={brand.website} target="_blank" rel="noopener noreferrer">
                <Btn variant="secondary"><span>🌐</span> Website</Btn>
              </a>
            )}
          </div>
        </div>

        {/* Bio */}
        <div style={{ background:"var(--bg2)", borderRadius:"var(--radius)", padding:20, marginBottom:32, display:"flex", gap:24, flexWrap:"wrap" }}>
          <p style={{ flex:"1 1 300px", color:"var(--text2)", lineHeight:1.7 }}>{brand.description}</p>
          <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexShrink:0 }}>
            {brand.instagram && (
              <a href={`https://instagram.com/${brand.instagram}`} target="_blank" rel="noopener noreferrer" style={{ color:"var(--text2)", fontSize:"0.85rem" }}>📸 @{brand.instagram}</a>
            )}
            {brand.twitter && (
              <a href={`https://twitter.com/${brand.twitter}`} target="_blank" rel="noopener noreferrer" style={{ color:"var(--text2)", fontSize:"0.85rem" }}>🐦 @{brand.twitter}</a>
            )}
          </div>
        </div>

        {/* Products */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
          <h2 style={{ fontSize:"1.6rem" }}>Products ({brandProducts.length})</h2>
          <Select value={sort} onChange={setSort} options={[{value:"newest",label:"Newest"},{value:"popular",label:"Most Popular"},{value:"price_asc",label:"Price: Low → High"}]} />
        </div>
        {brandProducts.length === 0 ? (
          <EmptyState icon="📦" title="No products yet" sub="This brand hasn't listed any products" />
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:16, marginBottom:48 }}>
            {brandProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

// BRANDS PAGE
const BrandsPage = () => {
  const { brands } = useApp();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let res = [...brands];
    if (filter === "featured") res = res.filter(b => b.status === "featured");
    if (filter === "verified") res = res.filter(b => b.status === "verified" || b.status === "featured");
    if (query) res = res.filter(b => b.name.toLowerCase().includes(query.toLowerCase()));
    return res;
  }, [brands, filter, query]);

  return (
    <div className="fade-in" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 16px" }}>
      <h1 style={{ fontSize:"2.5rem", marginBottom:8 }}>All Brands</h1>
      <p style={{ color:"var(--text2)", marginBottom:24 }}>Discover South African local brands</p>
      <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:"1 1 220px" }}>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search brands..."
            style={{ width:"100%", background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:10, padding:"10px 16px 10px 40px", color:"var(--text)", fontSize:"0.9rem", outline:"none" }} />
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)" }}>🔍</span>
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {[["all","All"],["featured","Featured"],["verified","Verified"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ padding:"8px 16px", borderRadius:10, border:`1px solid ${filter===v?"var(--accent)":"var(--border)"}`, background: filter===v ? "var(--accent)" : "var(--bg3)", color: filter===v ? "#fff" : "var(--text2)", fontWeight:600, fontSize:"0.85rem", cursor:"pointer" }}>{l}</button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? <EmptyState icon="🏪" title="No brands found" sub="Try different filters" /> : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:16 }}>
          {filtered.map(b => <BrandCard key={b.id} brand={b} />)}
        </div>
      )}
    </div>
  );
};

// CATEGORIES PAGE
const CategoriesPage = () => {
  const { products, navigate } = useApp();
  const cats = CATEGORIES.map(c => ({ name:c, count: products.filter(p => p.category === c).length }));
  const emojis = { Fashion:"👗", Sneakers:"👟", Streetwear:"🧢", Accessories:"💍", Beauty:"💄", "Food & Drink":"🍲", Tech:"📱", "Home Decor":"🏠", Art:"🎨", Music:"🎵" };

  return (
    <div className="fade-in" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 16px" }}>
      <h1 style={{ fontSize:"2.5rem", marginBottom:8 }}>Categories</h1>
      <p style={{ color:"var(--text2)", marginBottom:32 }}>Browse by product category</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:16 }}>
        {cats.map(c => (
          <Card key={c.name} onClick={() => navigate("search", { category: c.name })} style={{ padding:24, textAlign:"center" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:12 }}>{emojis[c.name] || "📦"}</div>
            <div style={{ fontWeight:700, marginBottom:4 }}>{c.name}</div>
            <div style={{ fontSize:"0.8rem", color:"var(--text2)" }}>{c.count} products</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// LOGIN PAGE
const LoginPage = () => {
  const { login, navigate, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const ok = login(email, password);
    setLoading(false);
    if (ok) { showToast("Logged in!"); navigate("home"); }
    else showToast("Invalid credentials", "error");
  };

  return (
    <div className="fade-in" style={{ minHeight:"calc(100vh - 120px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ width:"100%", maxWidth:400 }}>
        <Card style={{ padding:32 }}>
          <h2 style={{ fontSize:"2rem", marginBottom:4 }}>Sign In</h2>
          <p style={{ color:"var(--text2)", fontSize:"0.9rem", marginBottom:28 }}>Access your seller dashboard</p>
          <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:24 }}>
            <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="you@brand.co.za" />
            <Input label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
          </div>
          <Btn variant="primary" size="lg" full onClick={handleSubmit} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Btn>
          <div style={{ marginTop:20, padding:16, background:"var(--bg2)", borderRadius:10, fontSize:"0.8rem", color:"var(--text2)" }}>
            <div style={{ fontWeight:700, marginBottom:8, color:"var(--text3)" }}>Demo Accounts</div>
            <div>👤 Admin: admin@mzansistreet.mobi / admin123</div>
            <div>🏪 Seller: seller@skhokho.co.za / pass123</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// SELLER DASHBOARD
const DashboardPage = () => {
  const { user, products, brands, addProduct, updateProduct, deleteProduct, updateBrand, navigate, showToast } = useApp();
  const [tab, setTab] = useState("products");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editingBrand, setEditingBrand] = useState(false);

  if (!user || user.role !== "seller") return <EmptyState icon="🔒" title="Access denied" sub="Please log in as a seller" action={<Btn onClick={() => navigate("login")}>Log In</Btn>} />;

  const brand = brands.find(b => b.id === user.brandId);
  const myProducts = products.filter(p => p.brand === user.brandId);

  return (
    <div className="fade-in" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 16px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:12 }}>
        <div>
          <h1 style={{ fontSize:"2.2rem" }}>Seller Dashboard</h1>
          <p style={{ color:"var(--text2)" }}>{brand?.name} • {myProducts.length} listings</p>
        </div>
        <Btn onClick={() => { setEditProduct(null); setShowAddProduct(true); }}>+ Add Product</Btn>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:16, marginBottom:32 }}>
        {[
          ["Total Products", myProducts.length, "📦"],
          ["In Stock", myProducts.filter(p=>p.stock==="in_stock").length, "✅"],
          ["Out of Stock", myProducts.filter(p=>p.stock==="out_of_stock").length, "❌"],
          ["Total Views", myProducts.reduce((a,p)=>a+p.views,0).toLocaleString(), "👁"],
        ].map(([label,val,icon]) => (
          <Card key={label} style={{ padding:20, textAlign:"center" }}>
            <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{icon}</div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:"2rem", color:"var(--accent)" }}>{val}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--text2)", fontWeight:600 }}>{label}</div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid var(--border)", marginBottom:24 }}>
        {[["products","My Products"],["brand","Brand Profile"]].map(([t,l]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"10px 20px", background:"none", border:"none", borderBottom:`2px solid ${tab===t?"var(--accent)":"transparent"}`, color: tab===t?"var(--accent)":"var(--text2)", fontWeight:600, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {tab === "products" && (
        <>
          {myProducts.length === 0 ? (
            <EmptyState icon="📦" title="No products yet" sub="Add your first product listing" action={<Btn onClick={() => setShowAddProduct(true)}>+ Add Product</Btn>} />
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
              {myProducts.map(p => (
                <Card key={p.id} style={{ display:"flex", flexDirection:"column" }}>
                  <div style={{ aspectRatio:"16/9", overflow:"hidden", background:"var(--bg2)" }}>
                    <img src={p.images[0]} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div style={{ padding:14, flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                    <div style={{ fontWeight:600 }}>{p.name}</div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontFamily:"'Bebas Neue'", color:"var(--accent)", fontSize:"1.2rem" }}>R{p.price.toLocaleString()}</span>
                      <Badge status={p.stock} />
                    </div>
                    <div style={{ fontSize:"0.8rem", color:"var(--text2)" }}>👁 {p.views} views</div>
                    <div style={{ display:"flex", gap:8, marginTop:"auto", paddingTop:8 }}>
                      <Btn size="sm" variant="secondary" full onClick={() => { setEditProduct(p); setShowAddProduct(true); }}>Edit</Btn>
                      <Btn size="sm" variant="danger" onClick={() => { if(confirm("Delete this product?")) { deleteProduct(p.id); showToast("Product deleted"); } }}>🗑</Btn>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {tab === "brand" && brand && (
        <BrandEditForm brand={brand} onSave={data => { updateBrand(brand.id, data); showToast("Brand updated!"); setEditingBrand(false); }} />
      )}

      {showAddProduct && (
        <ProductModal
          product={editProduct}
          brandId={user.brandId}
          onClose={() => { setShowAddProduct(false); setEditProduct(null); }}
          onSave={(data) => {
            if (editProduct) { updateProduct(editProduct.id, data); showToast("Product updated!"); }
            else { addProduct({ ...data, brand: user.brandId }); showToast("Product added!"); }
            setShowAddProduct(false); setEditProduct(null);
          }}
        />
      )}
    </div>
  );
};

const BrandEditForm = ({ brand, onSave }) => {
  const [form, setForm] = useState({ name: brand.name, description: brand.description, whatsapp: brand.whatsapp, website: brand.website, instagram: brand.instagram, twitter: brand.twitter });
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <Card style={{ padding:24 }}>
      <h3 style={{ fontSize:"1.4rem", marginBottom:20 }}>Edit Brand Profile</h3>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <Input label="Brand Name" value={form.name} onChange={set("name")} required />
        <Input label="WhatsApp Number" value={form.whatsapp} onChange={set("whatsapp")} placeholder="27821234567" />
        <Input label="Website URL" value={form.website} onChange={set("website")} placeholder="https://..." />
        <Input label="Instagram Handle" value={form.instagram} onChange={set("instagram")} placeholder="yourbrand" />
        <Input label="Twitter Handle" value={form.twitter} onChange={set("twitter")} placeholder="yourbrand" />
      </div>
      <Textarea label="Description" value={form.description} onChange={set("description")} rows={4} />
      <div style={{ marginTop:16 }}>
        <Btn onClick={() => onSave(form)}>Save Changes</Btn>
      </div>
    </Card>
  );
};

const ProductModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    category: product?.category || CATEGORIES[0],
    stock: product?.stock || "in_stock",
    images: product?.images || ["https://picsum.photos/seed/new/400/400"],
  });
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:500, display:"flex", alignItems:"flex-start", justifyContent:"center", overflowY:"auto", padding:"24px 16px" }}>
      <div style={{ background:"var(--card)", borderRadius:"var(--radius)", padding:28, maxWidth:580, width:"100%", border:"1px solid var(--border)", marginTop:20 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <h3 style={{ fontSize:"1.4rem" }}>{product ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose} style={{ background:"var(--bg3)", border:"none", borderRadius:8, padding:"4px 10px", cursor:"pointer", color:"var(--text)", fontSize:"1.1rem" }}>✕</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <Input label="Product Name" value={form.name} onChange={set("name")} required />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Input label="Price (ZAR)" value={form.price} onChange={set("price")} type="number" placeholder="0" />
            <Select label="Stock Status" value={form.stock} onChange={set("stock")} options={[{value:"in_stock",label:"In Stock"},{value:"out_of_stock",label:"Out of Stock"}]} />
          </div>
          <Select label="Category" value={form.category} onChange={set("category")} options={CATEGORIES.map(c => ({value:c,label:c}))} />
          <Textarea label="Description" value={form.description} onChange={set("description")} rows={4} />
          <Input label="Image URL (main)" value={form.images[0]} onChange={v => set("images")([v, ...form.images.slice(1)])} placeholder="https://..." />
        </div>
        <div style={{ display:"flex", gap:12, marginTop:24, justifyContent:"flex-end" }}>
          <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
          <Btn onClick={() => onSave({ ...form, price: Number(form.price) })}>
            {product ? "Save Changes" : "Add Product"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

// ADMIN PANEL
const AdminPage = () => {
  const { user, brands, products, updateBrand, deleteProduct, navigate, showToast } = useApp();
  const [tab, setTab] = useState("brands");

  if (!user || user.role !== "admin") return <EmptyState icon="🔒" title="Admin access only" sub="" action={<Btn onClick={() => navigate("login")}>Log In</Btn>} />;

  return (
    <div className="fade-in" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 16px" }}>
      <h1 style={{ fontSize:"2.2rem", marginBottom:8 }}>Admin Panel</h1>
      <p style={{ color:"var(--text2)", marginBottom:28 }}>Manage the MzansiStreet marketplace</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:16, marginBottom:32 }}>
        {[
          ["Brands", brands.length, "🏪"],
          ["Products", products.length, "📦"],
          ["Featured", brands.filter(b=>b.status==="featured").length, "⭐"],
          ["Verified", brands.filter(b=>b.status==="verified").length, "✅"],
        ].map(([label,val,icon]) => (
          <Card key={label} style={{ padding:20, textAlign:"center" }}>
            <div style={{ fontSize:"1.8rem", marginBottom:8 }}>{icon}</div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:"2rem", color:"var(--accent)" }}>{val}</div>
            <div style={{ fontSize:"0.75rem", color:"var(--text2)", fontWeight:600 }}>{label}</div>
          </Card>
        ))}
      </div>

      <div style={{ display:"flex", borderBottom:"1px solid var(--border)", marginBottom:24 }}>
        {[["brands","Brands"],["products","Products"]].map(([t,l]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding:"10px 20px", background:"none", border:"none", borderBottom:`2px solid ${tab===t?"var(--accent)":"transparent"}`, color: tab===t?"var(--accent)":"var(--text2)", fontWeight:600, cursor:"pointer" }}>{l}</button>
        ))}
      </div>

      {tab === "brands" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {brands.map(b => (
            <Card key={b.id} style={{ padding:16, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              <img src={b.logo} alt={b.name} style={{ width:48, height:48, borderRadius:10, flexShrink:0 }} />
              <div style={{ flex:1, minWidth:160 }}>
                <div style={{ fontWeight:700, marginBottom:2 }}>{b.name}</div>
                <div style={{ fontSize:"0.8rem", color:"var(--text2)" }}>{b.category} • {products.filter(p=>p.brand===b.id).length} products</div>
              </div>
              <Badge status={b.status} />
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {b.status !== "featured" && <Btn size="sm" variant="gold" onClick={() => { updateBrand(b.id,{status:"featured"}); showToast(`${b.name} is now Featured!`); }}>★ Feature</Btn>}
                {b.status !== "verified" && b.status !== "featured" && <Btn size="sm" onClick={() => { updateBrand(b.id,{status:"verified"}); showToast(`${b.name} verified!`); }}>✓ Verify</Btn>}
                {(b.status === "verified" || b.status === "featured") && <Btn size="sm" variant="danger" onClick={() => { updateBrand(b.id,{status:"unverified"}); showToast("Status removed"); }}>Remove Badge</Btn>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "products" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {products.map(p => {
            const brand = brands.find(b => b.id === p.brand);
            return (
              <Card key={p.id} style={{ padding:16, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                <img src={p.images[0]} alt={p.name} style={{ width:56, height:56, borderRadius:8, objectFit:"cover", flexShrink:0, background:"var(--bg2)" }} />
                <div style={{ flex:1, minWidth:160 }}>
                  <div style={{ fontWeight:600, marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontSize:"0.8rem", color:"var(--text2)" }}>{brand?.name} • R{p.price.toLocaleString()} • 👁 {p.views}</div>
                </div>
                <Badge status={p.stock} />
                <Btn size="sm" variant="danger" onClick={() => { if(confirm(`Remove "${p.name}"?`)) { deleteProduct(p.id); showToast("Product removed"); } }}>🗑 Remove</Btn>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const { navigate } = useApp();
  return (
    <footer style={{ background:"var(--bg2)", borderTop:"1px solid var(--border)", padding:"40px 16px 24px", marginTop:48 }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:32, marginBottom:32 }}>
          <div>
            <div style={{ fontFamily:"'Bebas Neue'", fontSize:"1.8rem", letterSpacing:"0.06em", color:"var(--accent)", marginBottom:8 }}>MzansiStreet</div>
            <p style={{ color:"var(--text2)", fontSize:"0.85rem", lineHeight:1.7 }}>South Africa's local brand discovery platform. Shop local, support Mzansi.</p>
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:"0.85rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--text2)", marginBottom:12 }}>Discover</div>
            {[["Home","home"],["Brands","brands"],["Categories","categories"],["Search","search"]].map(([l,p]) => (
              <div key={p} onClick={() => navigate(p)} style={{ cursor:"pointer", color:"var(--text2)", fontSize:"0.85rem", marginBottom:8 }}
                onMouseEnter={e => e.target.style.color="var(--accent)"}
                onMouseLeave={e => e.target.style.color="var(--text2)"}
              >{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:"0.85rem", textTransform:"uppercase", letterSpacing:"0.1em", color:"var(--text2)", marginBottom:12 }}>Sellers</div>
            {[["Seller Login","login"],["Dashboard","dashboard"]].map(([l,p]) => (
              <div key={p} onClick={() => navigate(p)} style={{ cursor:"pointer", color:"var(--text2)", fontSize:"0.85rem", marginBottom:8 }}
                onMouseEnter={e => e.target.style.color="var(--accent)"}
                onMouseLeave={e => e.target.style.color="var(--text2)"}
              >{l}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid var(--border)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ color:"var(--text3)", fontSize:"0.8rem" }}>© 2025 MzansiStreet.mobi • Built with 🖤 for South Africa</span>
          <span style={{ color:"var(--text3)", fontSize:"0.75rem", fontFamily:"'JetBrains Mono'" }}>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

// ─── ROUTER ───────────────────────────────────────────────────────────────────
const Router = () => {
  const { page } = useApp();
  const pages = { home: HomePage, search: SearchPage, product: ProductPage, brand: BrandPage, brands: BrandsPage, categories: CategoriesPage, login: LoginPage, dashboard: DashboardPage, admin: AdminPage };
  const Page = pages[page] || HomePage;
  return <Page />;
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  );
}

function InnerApp() {
  const { theme, toast } = useApp();
  return (
    <>
      <GlobalStyles theme={theme} />
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <Navbar />
        <main style={{ flex:1 }}>
          <Router />
        </main>
        <Footer />
        <Toast toast={toast} />
      </div>
    </>
  );
}
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

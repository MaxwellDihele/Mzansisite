import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN TOKENS & GLOBAL STYLES
// ============================================================
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --ink: #0d0f0c;
    --ink-2: #3a3d38;
    --ink-3: #7a7d78;
    --paper: #f5f3ee;
    --paper-2: #ede9e0;
    --paper-3: #e0dbd0;
    --flame: #e8420a;
    --flame-dark: #c23507;
    --flame-light: #ff6b3d;
    --gold: #c9a84c;
    --gold-light: #f0d080;
    --green: #2d7a4f;
    --green-light: #e6f4ed;
    --surface: #ffffff;
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 22px;
    --radius-xl: 32px;
    --shadow-sm: 0 1px 4px rgba(13,15,12,0.08);
    --shadow-md: 0 4px 16px rgba(13,15,12,0.10);
    --shadow-lg: 0 12px 40px rgba(13,15,12,0.13);
    --shadow-flame: 0 4px 20px rgba(232,66,10,0.25);
  }

  body, html { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }
  
  h1,h2,h3,h4,h5,h6 { font-family: 'Syne', sans-serif; }

  .app-shell { display: flex; flex-direction: column; min-height: 100vh; max-width: 480px; margin: 0 auto; background: var(--paper); position: relative; }
  @media (min-width: 900px) {
    .app-shell { max-width: 100%; flex-direction: row; }
    .main-content { flex: 1; padding-bottom: 0 !important; margin-left: 240px; }
    .bottom-nav { display: none !important; }
    .top-nav { display: none; }
    .side-nav { display: flex !important; }
  }
  @media (max-width: 899px) {
    .side-nav { display: none; }
    .main-content { padding-bottom: 80px; }
  }

  .side-nav {
    display: none;
    position: fixed; left: 0; top: 0; bottom: 0; width: 240px;
    background: var(--ink); flex-direction: column;
    padding: 28px 20px; z-index: 100; gap: 8px;
  }
  .side-nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; color: var(--flame); margin-bottom: 32px; letter-spacing: -0.5px; }
  .side-nav-logo span { color: var(--paper); }
  .side-nav-item {
    display: flex; align-items: center; gap: 12px; padding: 12px 16px;
    border-radius: var(--radius-md); color: #aaa; font-family: 'DM Sans', sans-serif;
    font-weight: 500; font-size: 15px; cursor: pointer; transition: all 0.2s; text-decoration: none;
  }
  .side-nav-item:hover { background: rgba(255,255,255,0.07); color: var(--paper); }
  .side-nav-item.active { background: var(--flame); color: white; }
  .side-nav-item svg { flex-shrink: 0; }
  .side-nav-cta {
    margin-top: auto; background: var(--flame); color: white; border: none;
    padding: 14px; border-radius: var(--radius-md); font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s;
  }
  .side-nav-cta:hover { background: var(--flame-dark); }

  .bottom-nav {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 480px;
    background: var(--surface); border-top: 1.5px solid var(--paper-3);
    display: flex; z-index: 100; padding: 8px 0 env(safe-area-inset-bottom, 8px);
    box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
  }
  .bottom-nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    gap: 4px; padding: 6px 0; cursor: pointer; color: var(--ink-3);
    font-size: 11px; font-weight: 500; transition: color 0.15s; border: none; background: none;
  }
  .bottom-nav-item.active { color: var(--flame); }
  .bottom-nav-item svg { width: 22px; height: 22px; }

  .page { padding: 0 0 24px; animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

  .page-header {
    position: sticky; top: 0; z-index: 50; background: var(--paper);
    padding: 16px 20px 12px; border-bottom: 1px solid var(--paper-3);
    backdrop-filter: blur(10px);
  }
  .page-title { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
  .back-btn {
    display: flex; align-items: center; gap: 8px; background: none; border: none;
    color: var(--ink); font-family: 'DM Sans', sans-serif; font-size: 15px;
    cursor: pointer; padding: 0; font-weight: 500;
  }

  /* CARDS */
  .product-card {
    background: var(--surface); border-radius: var(--radius-md); overflow: hidden;
    box-shadow: var(--shadow-sm); transition: all 0.2s; cursor: pointer; flex-shrink: 0;
  }
  .product-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .product-card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; background: var(--paper-2); }
  .product-card-body { padding: 12px; }
  .product-card-name { font-weight: 600; font-size: 14px; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .product-card-store { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
  .product-card-price { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; color: var(--flame); margin-top: 6px; }

  .service-card {
    background: var(--surface); border-radius: var(--radius-md); padding: 16px;
    box-shadow: var(--shadow-sm); min-width: 200px; flex-shrink: 0;
    transition: all 0.2s; cursor: pointer;
  }
  .service-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
  .service-card-icon { width: 44px; height: 44px; background: var(--paper-2); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; font-size: 22px; }
  .service-card-title { font-weight: 700; font-size: 15px; font-family: 'Syne', sans-serif; }
  .service-card-provider { font-size: 12px; color: var(--ink-3); margin-top: 4px; }
  .service-card-location { font-size: 12px; color: var(--ink-3); display: flex; align-items: center; gap: 4px; margin-top: 2px; }
  .quote-btn {
    margin-top: 12px; width: 100%; padding: 9px; border-radius: var(--radius-sm);
    background: var(--paper-2); border: none; font-family: 'DM Sans', sans-serif;
    font-weight: 600; font-size: 13px; color: var(--flame); cursor: pointer; transition: all 0.15s;
  }
  .quote-btn:hover { background: var(--flame); color: white; }

  .store-card {
    background: var(--surface); border-radius: var(--radius-md); padding: 16px;
    box-shadow: var(--shadow-sm); display: flex; align-items: center; gap: 14px;
    cursor: pointer; transition: all 0.2s;
  }
  .store-card:hover { box-shadow: var(--shadow-md); }
  .store-logo { width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover; background: var(--paper-2); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .store-info { flex: 1; min-width: 0; }
  .store-name { font-weight: 700; font-size: 15px; font-family: 'Syne', sans-serif; }
  .store-location { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
  .badge { display: inline-block; padding: 3px 9px; border-radius: 100px; font-size: 11px; font-weight: 600; }
  .badge-starter { background: var(--paper-2); color: var(--ink-3); }
  .badge-verified { background: #e8f0fe; color: #1a56db; }
  .badge-featured { background: linear-gradient(135deg, var(--gold-light), var(--gold)); color: var(--ink); }

  .request-card {
    background: var(--surface); border-radius: var(--radius-md); padding: 16px;
    box-shadow: var(--shadow-sm); border-left: 3px solid var(--flame); transition: all 0.2s; cursor: pointer;
  }
  .request-card:hover { box-shadow: var(--shadow-md); }
  .request-title { font-weight: 700; font-size: 15px; font-family: 'Syne', sans-serif; }
  .request-meta { font-size: 12px; color: var(--ink-3); margin-top: 4px; }
  .request-budget { font-family: 'Syne', sans-serif; font-weight: 700; color: var(--green); font-size: 14px; margin-top: 6px; }
  .offer-btn {
    margin-top: 12px; padding: 9px 18px; border-radius: var(--radius-sm);
    background: var(--flame); border: none; font-family: 'DM Sans', sans-serif;
    font-weight: 600; font-size: 13px; color: white; cursor: pointer; transition: all 0.15s;
  }
  .offer-btn:hover { background: var(--flame-dark); }

  .offer-card {
    background: var(--surface); border-radius: var(--radius-md); padding: 18px;
    box-shadow: var(--shadow-sm); margin-bottom: 12px;
  }
  .offer-provider { font-weight: 700; font-family: 'Syne', sans-serif; font-size: 16px; }
  .offer-message { font-size: 14px; color: var(--ink-2); margin: 8px 0; line-height: 1.5; }
  .offer-price { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; color: var(--flame); }
  .accept-btn {
    width: 100%; margin-top: 14px; padding: 13px; border-radius: var(--radius-md);
    background: var(--green); border: none; font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 15px; color: white; cursor: pointer; transition: all 0.15s;
  }
  .accept-btn:hover { background: #235f3e; }

  /* BUTTONS */
  .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 24px; border-radius: var(--radius-md); background: var(--flame);
    color: white; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px;
    border: none; cursor: pointer; transition: all 0.2s; box-shadow: var(--shadow-flame);
  }
  .btn-primary:hover { background: var(--flame-dark); transform: translateY(-1px); }
  .btn-primary:active { transform: none; }
  .btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 22px; border-radius: var(--radius-md); background: transparent;
    color: var(--ink); font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 15px;
    border: 2px solid var(--paper-3); cursor: pointer; transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--ink); background: var(--paper-2); }
  .btn-wa {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 24px; border-radius: var(--radius-md); background: #25D366;
    color: white; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px;
    border: none; cursor: pointer; transition: all 0.2s;
  }
  .btn-wa:hover { background: #1ebe5d; }

  /* SEARCH */
  .search-bar {
    display: flex; align-items: center; gap: 10px; background: var(--surface);
    border-radius: var(--radius-lg); padding: 12px 16px; box-shadow: var(--shadow-md);
    border: 1.5px solid var(--paper-3); transition: all 0.2s;
  }
  .search-bar:focus-within { border-color: var(--flame); box-shadow: 0 4px 20px rgba(232,66,10,0.12); }
  .search-bar input { flex: 1; border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 15px; background: transparent; color: var(--ink); }
  .search-bar input::placeholder { color: var(--ink-3); }

  /* TABS */
  .tab-bar { display: flex; gap: 6px; padding: 16px 20px 0; overflow-x: auto; }
  .tab-bar::-webkit-scrollbar { display: none; }
  .tab-btn {
    padding: 8px 18px; border-radius: 100px; border: 1.5px solid var(--paper-3);
    background: transparent; font-family: 'DM Sans', sans-serif; font-weight: 600;
    font-size: 14px; color: var(--ink-3); cursor: pointer; white-space: nowrap; transition: all 0.15s; flex-shrink: 0;
  }
  .tab-btn.active { background: var(--ink); color: white; border-color: var(--ink); }

  /* SECTION */
  .section { padding: 24px 20px 0; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .section-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; }
  .section-link { font-size: 13px; font-weight: 600; color: var(--flame); background: none; border: none; cursor: pointer; }
  .scroll-row { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 4px; }
  .scroll-row::-webkit-scrollbar { display: none; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* FORMS */
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 8px; color: var(--ink-2); }
  .form-input {
    width: 100%; padding: 13px 16px; border-radius: var(--radius-md);
    border: 1.5px solid var(--paper-3); background: var(--surface);
    font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--ink);
    outline: none; transition: border-color 0.15s;
  }
  .form-input:focus { border-color: var(--flame); }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-select { appearance: none; cursor: pointer; }

  /* HERO */
  .hero {
    background: var(--ink); padding: 32px 20px 28px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 220px; height: 220px; background: var(--flame); border-radius: 50%; opacity: 0.12;
  }
  .hero::after {
    content: ''; position: absolute; bottom: -40px; left: 30%;
    width: 160px; height: 160px; background: var(--gold); border-radius: 50%; opacity: 0.08;
  }
  .hero-eyebrow { font-size: 12px; font-weight: 600; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
  .hero-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; color: white; line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 8px; }
  .hero-title span { color: var(--flame-light); }
  .hero-sub { font-size: 14px; color: #9a9d98; margin-bottom: 20px; }
  .hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  /* LOADING */
  .skeleton { background: linear-gradient(90deg, var(--paper-2) 25%, var(--paper-3) 50%, var(--paper-2) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: var(--radius-sm); }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  /* EMPTY STATE */
  .empty-state { text-align: center; padding: 60px 20px; }
  .empty-state-icon { font-size: 48px; margin-bottom: 16px; }
  .empty-state-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; margin-bottom: 8px; }
  .empty-state-sub { color: var(--ink-3); font-size: 14px; margin-bottom: 24px; }

  /* DETAIL PAGE */
  .detail-image { width: 100%; aspect-ratio: 4/3; object-fit: cover; background: var(--paper-2); display: block; }
  .detail-body { padding: 20px; }
  .detail-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; letter-spacing: -0.3px; margin-bottom: 6px; }
  .detail-price { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; color: var(--flame); margin-bottom: 14px; }
  .detail-desc { font-size: 14px; line-height: 1.65; color: var(--ink-2); margin-bottom: 20px; }
  .detail-actions { display: flex; flex-direction: column; gap: 10px; }
  .detail-actions .btn-primary, .detail-actions .btn-secondary, .detail-actions .btn-wa { width: 100%; }

  /* STORE PROFILE */
  .store-banner { height: 140px; background: linear-gradient(135deg, var(--ink) 0%, #2a2d28 100%); position: relative; }
  .store-logo-large { width: 72px; height: 72px; border-radius: var(--radius-md); background: var(--surface); position: absolute; bottom: -36px; left: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: var(--shadow-md); border: 3px solid var(--surface); }
  .store-profile-body { padding: 48px 20px 20px; }
  .store-profile-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; }
  .store-profile-meta { font-size: 13px; color: var(--ink-3); margin-top: 4px; }

  /* DASHBOARD */
  .stat-card { background: var(--surface); border-radius: var(--radius-md); padding: 18px; box-shadow: var(--shadow-sm); text-align: center; }
  .stat-value { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; color: var(--flame); }
  .stat-label { font-size: 13px; color: var(--ink-3); margin-top: 4px; }

  /* DEAL PAGE */
  .deal-status { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--green-light); border-radius: 100px; color: var(--green); font-weight: 600; font-size: 14px; }
  .deal-status::before { content: ''; width: 8px; height: 8px; background: var(--green); border-radius: 50%; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  /* CHIP */
  .chip { display: inline-block; padding: 5px 12px; border-radius: 100px; background: var(--paper-2); font-size: 12px; font-weight: 600; color: var(--ink-2); }

  /* REVIEW */
  .review-card { background: var(--surface); border-radius: var(--radius-md); padding: 16px; box-shadow: var(--shadow-sm); margin-bottom: 12px; }
  .review-stars { color: var(--gold); font-size: 14px; margin-bottom: 6px; }
  .review-text { font-size: 14px; color: var(--ink-2); line-height: 1.5; }
  .review-author { font-size: 12px; color: var(--ink-3); margin-top: 8px; }

  /* TOASTS */
  .toast {
    position: fixed; bottom: 96px; left: 50%; transform: translateX(-50%);
    background: var(--ink); color: white; padding: 12px 20px; border-radius: var(--radius-md);
    font-size: 14px; font-weight: 500; z-index: 200; animation: toastIn 0.3s ease;
    white-space: nowrap; box-shadow: var(--shadow-lg);
  }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  .provider-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--flame); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; flex-shrink: 0; }
  .divider { height: 1px; background: var(--paper-3); margin: 20px 0; }

  @media (min-width: 900px) {
    .hero { border-radius: 0 0 var(--radius-xl) var(--radius-xl); }
    .grid-2 { grid-template-columns: repeat(3, 1fr); }
  }
`;

// ============================================================
// MOCK DATA
// ============================================================
const PRODUCTS = [
  { id: 1, name: "Handwoven Ndebele Blanket", price: "R 850", store: "Zulu Craft Co.", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80", category: "Crafts", description: "Beautiful handwoven blanket with traditional Ndebele geometric patterns. Each piece is unique and made by local artisans in Johannesburg." },
  { id: 2, name: "Rooibos Gift Set (12 blends)", price: "R 320", store: "Cape Harvest", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", category: "Food", description: "Premium selection of 12 unique rooibos blends. Sourced directly from the Cederberg Mountains, Western Cape." },
  { id: 3, name: "Leather Shoulder Bag", price: "R 1,200", store: "Durban Leather Works", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", category: "Fashion", description: "Full grain leather bag handcrafted by master artisans in Durban. Fits a 13\" laptop and everyday essentials." },
  { id: 4, name: "Moringa Superfood Powder", price: "R 180", store: "Ubuntu Wellness", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80", category: "Health", description: "100% organic moringa powder. Packed with vitamins and minerals. Grown in Limpopo province." },
  { id: 5, name: "Beaded Clutch Bag", price: "R 450", store: "Soweto Artisans", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", category: "Fashion", description: "Hand-beaded clutch bag with intricate Zulu-inspired designs. Perfect for events and special occasions." },
  { id: 6, name: "Braai Wood Bundle (10kg)", price: "R 120", store: "Veld Fire", image: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=400&q=80", category: "Food", description: "Premium hardwood for the perfect braai. Dry, seasoned and ready to light. Delivered to your door in Gauteng." },
];

const SERVICES = [
  { id: 1, title: "Wedding Photography", provider: "Sipho Nkosi Studios", location: "Johannesburg", emoji: "📷", description: "Full-day wedding photography coverage with 500+ edited photos delivered within 3 weeks. Packages include engagement shoots and photo albums.", category: "Photography" },
  { id: 2, title: "House Cleaning", provider: "Spotless Homes SA", location: "Cape Town", emoji: "🧹", description: "Professional home cleaning service. Deep cleans, regular maintenance, and move-in/out cleaning available. All products supplied.", category: "Home" },
  { id: 3, title: "Catering for Events", provider: "Mama Africa Kitchen", location: "Durban", emoji: "🍽️", description: "Traditional South African cuisine for events of all sizes. Menu customization available. 10–500 guests.", category: "Food" },
  { id: 4, title: "Logo & Branding Design", provider: "Moja Creative", location: "Pretoria", emoji: "🎨", description: "Complete brand identity packages including logo, business cards, and brand guidelines. Delivered in 5–7 business days.", category: "Design" },
  { id: 5, title: "Plumbing Repairs", provider: "Quick Fix Plumbers", location: "Johannesburg", emoji: "🔧", description: "Emergency and scheduled plumbing services. Certified plumbers available 24/7. Free call-out for major repairs.", category: "Home" },
  { id: 6, title: "Personal Training", provider: "Thabo Fitness", location: "Cape Town", emoji: "💪", description: "Certified personal trainer with 8 years experience. In-home sessions, gym sessions, or online coaching available.", category: "Health" },
];

const STORES = [
  { id: 1, name: "Zulu Craft Co.", badge: "featured", location: "Johannesburg, GP", emoji: "🧶", description: "Authentic Zulu crafts and traditional textiles", products: [1, 5] },
  { id: 2, name: "Cape Harvest", badge: "verified", location: "Cape Town, WC", emoji: "🌿", description: "Premium Western Cape produce and gift sets", products: [2] },
  { id: 3, name: "Durban Leather Works", badge: "verified", location: "Durban, KZN", emoji: "👜", description: "Handcrafted leather goods since 1998", products: [3] },
  { id: 4, name: "Ubuntu Wellness", badge: "starter", location: "Pretoria, GP", emoji: "🌱", description: "Natural health products from across Africa", products: [4] },
  { id: 5, name: "Soweto Artisans", badge: "featured", location: "Soweto, GP", emoji: "✨", description: "Celebrating township creativity and artisanship", products: [5] },
  { id: 6, name: "Moja Creative", badge: "verified", location: "Pretoria, GP", emoji: "🎨", description: "Design and branding for African businesses", products: [] },
];

const REQUESTS = [
  { id: 1, title: "Looking for matric dance photographer", budget: "R 2,000–3,500", city: "Cape Town", category: "Photography", description: "Need a photographer for my daughter's matric dance in November. Looking for 4–6 hours coverage.", offers: 3, timeAgo: "2h ago" },
  { id: 2, title: "Need reliable house cleaner weekly", budget: "R 800/month", city: "Johannesburg", category: "Home", description: "Looking for a trustworthy cleaner to come every Friday. 3-bedroom townhouse in Sandton.", offers: 7, timeAgo: "5h ago" },
  { id: 3, title: "Catering for 50 guests – year-end function", budget: "R 8,000–12,000", city: "Durban", category: "Food", description: "Company year-end party for 50 people. Would love traditional South African food.", offers: 2, timeAgo: "1d ago" },
  { id: 4, title: "Website for my craft business", budget: "R 5,000", city: "Pretoria", category: "Design", description: "Need a simple e-commerce website to sell my beadwork online. Shopify or WooCommerce.", offers: 5, timeAgo: "3h ago" },
  { id: 5, title: "Logo for a new restaurant", budget: "R 1,500", city: "Cape Town", category: "Design", description: "Afro-fusion restaurant launching in February. Need something bold and memorable.", offers: 9, timeAgo: "6h ago" },
];

const OFFERS = {
  1: [
    { id: 1, provider: "Sipho Nkosi Studios", badge: "featured", message: "I'd love to capture your daughter's special night! I specialise in matric dance photography and include a free online gallery.", price: "R 2,800", avatar: "S" },
    { id: 2, provider: "Langa Photography", badge: "verified", message: "Available on your date. Package includes editing, 300+ photos, and a USB with all images. Can visit for a consult.", price: "R 2,500", avatar: "L" },
    { id: 3, provider: "MJ Captures", badge: "starter", message: "New photographer building my portfolio. Will give full effort and deliver high-quality results.", price: "R 1,800", avatar: "M" },
  ],
};

const REVIEWS = [
  { id: 1, author: "Thandeka M.", stars: 5, text: "Absolutely love the products from this store. Fast delivery and everything was packaged beautifully." },
  { id: 2, author: "James K.", stars: 4, text: "Really good quality. Took a few extra days to arrive but the product was worth the wait." },
  { id: 3, author: "Amahle D.", stars: 5, text: "Best purchase I've made this year. Will definitely be ordering again and recommending to friends." },
];

// ============================================================
// ICONS (inline SVG)
// ============================================================
const Icon = {
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Requests: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Deals: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  Profile: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ChevronLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  MapPin: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ============================================================
// LAYOUT COMPONENTS
// ============================================================
function SideNav({ page, setPage }) {
  const items = [
    { id: "home", label: "Home", Icon: Icon.Home },
    { id: "search", label: "Search", Icon: Icon.Search },
    { id: "requests", label: "Requests", Icon: Icon.Requests },
    { id: "deals", label: "Deals", Icon: Icon.Deals },
    { id: "profile", label: "Profile", Icon: Icon.Profile },
  ];
  return (
    <nav className="side-nav">
      <div className="side-nav-logo">Mzansi<span>Street</span></div>
      {items.map(({ id, label, Icon: I }) => (
        <div key={id} className={`side-nav-item ${page === id ? "active" : ""}`} onClick={() => setPage(id)}>
          <I />{label}
        </div>
      ))}
      <button className="side-nav-cta" onClick={() => setPage("create-request")}>+ Post a Request</button>
    </nav>
  );
}

function BottomNav({ page, setPage }) {
  const items = [
    { id: "home", label: "Home", Icon: Icon.Home },
    { id: "search", label: "Search", Icon: Icon.Search },
    { id: "requests", label: "Requests", Icon: Icon.Requests },
    { id: "deals", label: "Deals", Icon: Icon.Deals },
    { id: "profile", label: "Profile", Icon: Icon.Profile },
  ];
  return (
    <nav className="bottom-nav">
      {items.map(({ id, label, Icon: I }) => (
        <button key={id} className={`bottom-nav-item ${page === id ? "active" : ""}`} onClick={() => setPage(id)}>
          <I />{label}
        </button>
      ))}
    </nav>
  );
}

// ============================================================
// REUSABLE COMPONENTS
// ============================================================
function ProductCard({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product)} style={{ width: "160px" }}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-card-body">
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-store">{product.store}</div>
        <div className="product-card-price">{product.price}</div>
      </div>
    </div>
  );
}

function ProductCardGrid({ product, onClick }) {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-card-body">
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-store">{product.store}</div>
        <div className="product-card-price">{product.price}</div>
      </div>
    </div>
  );
}

function ServiceCard({ service, onClick }) {
  return (
    <div className="service-card" onClick={() => onClick(service)}>
      <div className="service-card-icon">{service.emoji}</div>
      <div className="service-card-title">{service.title}</div>
      <div className="service-card-provider">{service.provider}</div>
      <div className="service-card-location"><Icon.MapPin />{service.location}</div>
      <button className="quote-btn" onClick={e => { e.stopPropagation(); onClick(service); }}>Request Quote</button>
    </div>
  );
}

function StoreCard({ store, onClick }) {
  const badgeClass = `badge badge-${store.badge}`;
  const badgeLabel = store.badge === "starter" ? "Starter" : store.badge === "verified" ? "✓ Verified" : "⭐ Featured";
  return (
    <div className="store-card" onClick={() => onClick(store)}>
      <div className="store-logo">{store.emoji}</div>
      <div className="store-info">
        <div className="store-name">{store.name}</div>
        <div className="store-location"><Icon.MapPin />{store.location}</div>
        <div style={{ marginTop: "6px" }}><span className={badgeClass}>{badgeLabel}</span></div>
      </div>
    </div>
  );
}

function RequestCard({ request, onClick, onOffer }) {
  return (
    <div className="request-card" onClick={() => onClick(request)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div className="request-title">{request.title}</div>
        <span className="chip">{request.category}</span>
      </div>
      <div className="request-meta"><Icon.MapPin /> {request.city} · {request.timeAgo} · {request.offers} offers</div>
      <div className="request-budget">{request.budget}</div>
      <button className="offer-btn" onClick={e => { e.stopPropagation(); onOffer(request); }}>Send Offer</button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ width: "160px", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface)", flexShrink: 0 }}>
      <div className="skeleton" style={{ height: "160px" }} />
      <div style={{ padding: "12px" }}>
        <div className="skeleton" style={{ height: "14px", marginBottom: "8px", borderRadius: "4px" }} />
        <div className="skeleton" style={{ height: "12px", width: "70%", borderRadius: "4px" }} />
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="toast">✓ {message}</div>;
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ navigate, showToast }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 1000); }, []);

  return (
    <div className="page">
      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">🇿🇦 South Africa's Marketplace</div>
        <h1 className="hero-title">Buy, Sell &<br /><span>Get Offers Fast</span></h1>
        <p className="hero-sub">Find products, services or post a request and receive offers from verified providers near you.</p>
        <div style={{ marginBottom: "20px" }}>
          <div className="search-bar" onClick={() => navigate("search")} style={{ cursor: "pointer" }}>
            <Icon.Search />
            <span style={{ color: "var(--ink-3)", fontSize: "15px" }}>Find products, services or stores...</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("create-request")}>
            <Icon.Plus /> Post a Request
          </button>
          <button className="btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }} onClick={() => navigate("search")}>Browse All</button>
        </div>
      </div>

      {/* TRENDING PRODUCTS */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">🔥 Trending Listings</div>
          <button className="section-link" onClick={() => navigate("search")}>See all</button>
        </div>
        <div className="scroll-row">
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : PRODUCTS.map(p => <ProductCard key={p.id} product={p} onClick={() => navigate("product", p)} />)
          }
        </div>
      </div>

      {/* POPULAR SERVICES */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">⚡ Popular Services</div>
          <button className="section-link" onClick={() => navigate("search")}>See all</button>
        </div>
        <div className="scroll-row">
          {loading
            ? Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ minWidth: "200px", height: "180px", borderRadius: "var(--radius-md)" }} />)
            : SERVICES.map(s => <ServiceCard key={s.id} service={s} onClick={() => navigate("service", s)} />)
          }
        </div>
      </div>

      {/* FEATURED STORES */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">🏪 Featured Stores</div>
          <button className="section-link" onClick={() => navigate("search")}>See all</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading
            ? Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: "80px", borderRadius: "var(--radius-md)" }} />)
            : STORES.filter(s => s.badge !== "starter").map(s => (
              <StoreCard key={s.id} store={s} onClick={() => navigate("store", s)} />
            ))
          }
        </div>
      </div>

      {/* LIVE REQUESTS */}
      <div className="section" style={{ paddingBottom: "24px" }}>
        <div className="section-header">
          <div className="section-title">📣 Live Requests</div>
          <button className="section-link" onClick={() => navigate("requests")}>See all</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading
            ? Array(2).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: "120px", borderRadius: "var(--radius-md)" }} />)
            : REQUESTS.slice(0, 3).map(r => (
              <RequestCard key={r.id} request={r} onClick={() => navigate("request-detail", r)} onOffer={() => navigate("send-offer", r)} />
            ))
          }
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button className="btn-primary" style={{ width: "100%" }} onClick={() => navigate("create-request")}>
            <Icon.Plus /> Post Your Own Request
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SEARCH PAGE
// ============================================================
function SearchPage({ navigate }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("listings");
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const filteredProducts = PRODUCTS.filter(p =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.store.toLowerCase().includes(query.toLowerCase())
  );
  const filteredServices = SERVICES.filter(s =>
    !query || s.title.toLowerCase().includes(query.toLowerCase()) || s.provider.toLowerCase().includes(query.toLowerCase())
  );
  const filteredStores = STORES.filter(s =>
    !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.location.toLowerCase().includes(query.toLowerCase())
  );

  const isEmpty = (tab === "listings" && filteredProducts.length === 0) ||
    (tab === "services" && filteredServices.length === 0) ||
    (tab === "stores" && filteredStores.length === 0);

  return (
    <div className="page">
      <div className="page-header">
        <div className="search-bar">
          <Icon.Search />
          <input ref={inputRef} placeholder="Search products, services, stores..." value={query} onChange={e => setQuery(e.target.value)} />
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-3)", fontSize: "18px" }}>×</button>}
        </div>
      </div>
      <div className="tab-bar">
        {["listings", "services", "stores"].map(t => (
          <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 20px" }}>
        {isEmpty ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No results found</div>
            <div className="empty-state-sub">Try a different search term or post a request to get offers from providers.</div>
            <button className="btn-primary" onClick={() => navigate("create-request")}><Icon.Plus /> Post a Request Instead</button>
          </div>
        ) : (
          <>
            {tab === "listings" && (
              <div className="grid-2">{filteredProducts.map(p => <ProductCardGrid key={p.id} product={p} onClick={() => navigate("product", p)} />)}</div>
            )}
            {tab === "services" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {filteredServices.map(s => <ServiceCard key={s.id} service={s} onClick={() => navigate("service", s)} />)}
              </div>
            )}
            {tab === "stores" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {filteredStores.map(s => <StoreCard key={s.id} store={s} onClick={() => navigate("store", s)} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
function ProductDetailPage({ product, navigate, showToast }) {
  const store = STORES.find(s => s.name === product.store);
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("home")}><Icon.ChevronLeft /> Back</button>
      </div>
      <img className="detail-image" src={product.image} alt={product.name} />
      <div className="detail-body">
        <div style={{ marginBottom: "8px" }}><span className="chip">{product.category}</span></div>
        <div className="detail-title">{product.name}</div>
        <div className="detail-price">{product.price}</div>
        {store && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "var(--paper-2)", borderRadius: "var(--radius-md)", marginBottom: "16px", cursor: "pointer" }} onClick={() => navigate("store", store)}>
            <span style={{ fontSize: "24px" }}>{store.emoji}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{store.name}</div>
              <div style={{ fontSize: "12px", color: "var(--ink-3)" }}>{store.location}</div>
            </div>
            <span style={{ marginLeft: "auto", color: "var(--flame)", fontSize: "18px" }}>›</span>
          </div>
        )}
        <p className="detail-desc">{product.description}</p>
        <div className="detail-actions">
          <button className="btn-wa" onClick={() => showToast("Opening WhatsApp...")}>
            <span>📱</span> Contact via WhatsApp
          </button>
          <button className="btn-secondary" onClick={() => navigate("create-request")}>
            <Icon.Plus /> Request Similar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SERVICE DETAIL PAGE
// ============================================================
function ServiceDetailPage({ service, navigate, showToast }) {
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("home")}><Icon.ChevronLeft /> Back</button>
      </div>
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>{service.emoji}</div>
        <div style={{ marginBottom: "8px" }}><span className="chip">{service.category}</span></div>
        <div className="detail-title">{service.title}</div>
        <div style={{ display: "flex", gap: "16px", margin: "12px 0 16px", flexWrap: "wrap" }}>
          <div style={{ fontSize: "14px", color: "var(--ink-2)" }}>👤 {service.provider}</div>
          <div style={{ fontSize: "14px", color: "var(--ink-2)", display: "flex", alignItems: "center", gap: "4px" }}><Icon.MapPin /> {service.location}</div>
        </div>
        <div className="divider" />
        <p className="detail-desc">{service.description}</p>
        <div className="detail-actions">
          <button className="btn-primary" onClick={() => navigate("create-request")}><Icon.Plus /> Request Quote</button>
          <button className="btn-secondary" onClick={() => showToast("Opening provider profile...")}>View Provider Profile</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STORE PROFILE PAGE
// ============================================================
function StoreProfilePage({ store, navigate, showToast }) {
  const [tab, setTab] = useState("listings");
  const storeProducts = PRODUCTS.filter(p => store.products.includes(p.id));
  const storeServices = SERVICES.filter(s => s.provider.toLowerCase().includes(store.name.split(" ")[0].toLowerCase()));
  const badgeClass = `badge badge-${store.badge}`;
  const badgeLabel = store.badge === "starter" ? "Starter" : store.badge === "verified" ? "✓ Verified" : "⭐ Featured";

  return (
    <div className="page">
      <div style={{ position: "relative" }}>
        <button className="back-btn" style={{ position: "absolute", top: "16px", left: "20px", zIndex: 10, color: "white" }} onClick={() => navigate("home")}><Icon.ChevronLeft /> Back</button>
        <div className="store-banner" style={{ background: `linear-gradient(135deg, #1a1c18 0%, #2e3028 100%)` }} />
        <div className="store-logo-large">{store.emoji}</div>
      </div>
      <div className="store-profile-body">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="store-profile-name">{store.name}</div>
            <div className="store-profile-meta"><Icon.MapPin /> {store.location}</div>
          </div>
          <span className={badgeClass}>{badgeLabel}</span>
        </div>
        <p style={{ fontSize: "14px", color: "var(--ink-2)", marginTop: "10px" }}>{store.description}</p>
      </div>
      <div className="tab-bar">
        {["listings", "services", "reviews"].map(t => (
          <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 20px" }}>
        {tab === "listings" && (
          storeProducts.length > 0
            ? <div className="grid-2">{storeProducts.map(p => <ProductCardGrid key={p.id} product={p} onClick={() => navigate("product", p)} />)}</div>
            : <div className="empty-state"><div className="empty-state-icon">📦</div><div className="empty-state-title">No listings yet</div><div className="empty-state-sub">This store hasn't added any products yet.</div></div>
        )}
        {tab === "services" && (
          storeServices.length > 0
            ? <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>{storeServices.map(s => <ServiceCard key={s.id} service={s} onClick={() => navigate("service", s)} />)}</div>
            : <div className="empty-state"><div className="empty-state-icon">🛠️</div><div className="empty-state-title">No services yet</div><div className="empty-state-sub">This store hasn't added any services yet.</div></div>
        )}
        {tab === "reviews" && (
          <div>{REVIEWS.map(r => (
            <div key={r.id} className="review-card">
              <div className="review-stars">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
              <div className="review-text">{r.text}</div>
              <div className="review-author">— {r.author}</div>
            </div>
          ))}</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// REQUESTS PAGE
// ============================================================
function RequestsPage({ navigate }) {
  return (
    <div className="page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="page-title">📣 Requests</div>
        <button className="btn-primary" style={{ padding: "10px 16px", fontSize: "13px" }} onClick={() => navigate("create-request")}><Icon.Plus /> Post</button>
      </div>
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {REQUESTS.map(r => (
          <RequestCard key={r.id} request={r} onClick={() => navigate("request-detail", r)} onOffer={() => navigate("send-offer", r)} />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// REQUEST DETAIL PAGE
// ============================================================
function RequestDetailPage({ request, navigate, showToast }) {
  const offers = OFFERS[request.id] || [];
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("requests")}><Icon.ChevronLeft /> Back</button>
      </div>
      <div style={{ padding: "20px" }}>
        <div><span className="chip">{request.category}</span></div>
        <div className="detail-title" style={{ marginTop: "10px" }}>{request.title}</div>
        <div style={{ display: "flex", gap: "16px", margin: "10px 0", flexWrap: "wrap" }}>
          <span style={{ fontSize: "13px", color: "var(--ink-3)" }}><Icon.MapPin /> {request.city}</span>
          <span style={{ fontSize: "13px", color: "var(--ink-3)" }}>🕐 {request.timeAgo}</span>
          <span style={{ fontSize: "13px", color: "var(--ink-3)" }}>💬 {request.offers} offers</span>
        </div>
        <div style={{ background: "var(--green-light)", borderRadius: "var(--radius-md)", padding: "14px", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", color: "var(--green)", fontWeight: 600, marginBottom: "4px" }}>Budget</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "20px", color: "var(--green)" }}>{request.budget}</div>
        </div>
        <p style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.65, marginBottom: "20px" }}>{request.description}</p>
        <button className="btn-primary" style={{ width: "100%" }} onClick={() => navigate("send-offer", request)}>
          Send an Offer
        </button>
        <div className="divider" />
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "14px" }}>
          {offers.length > 0 ? `${offers.length} Offers Received` : "No offers yet"}
        </div>
        {offers.length === 0 ? (
          <div className="empty-state"><div className="empty-state-icon">📭</div><div className="empty-state-title">Be the first to offer!</div><div className="empty-state-sub">No one has responded yet. Send your offer now.</div></div>
        ) : (
          offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div className="provider-avatar">{offer.avatar}</div>
                <div>
                  <div className="offer-provider">{offer.provider}</div>
                  <span className={`badge badge-${offer.badge}`}>{offer.badge === "featured" ? "⭐ Featured" : offer.badge === "verified" ? "✓ Verified" : "Starter"}</span>
                </div>
                <div className="offer-price" style={{ marginLeft: "auto" }}>{offer.price}</div>
              </div>
              <div className="offer-message">{offer.message}</div>
              <button className="accept-btn" onClick={() => navigate("deal", { offer, request })}>✓ Accept Offer</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================
// CREATE REQUEST PAGE
// ============================================================
function CreateRequestPage({ navigate, showToast }) {
  const [form, setForm] = useState({ title: "", description: "", category: "", city: "", budget: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.city) { showToast("Please fill in required fields"); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); showToast("Request posted! Offers incoming 🚀"); navigate("requests"); }, 1500);
  };

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("home")}><Icon.ChevronLeft /> Back</button>
        <div className="page-title" style={{ marginTop: "8px" }}>Post a Request</div>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ background: "var(--paper-2)", borderRadius: "var(--radius-md)", padding: "14px", marginBottom: "20px" }}>
          <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>How it works</div>
          <div style={{ fontSize: "13px", color: "var(--ink-2)", lineHeight: 1.5 }}>Post your request → Providers send you offers → You choose the best deal ✓</div>
        </div>
        <div className="form-group">
          <label className="form-label">What do you need? *</label>
          <input className="form-input" placeholder="e.g. Wedding photographer for 150 guests" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Describe your request</label>
          <textarea className="form-input form-textarea" placeholder="Add more details — the more specific, the better offers you'll get." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select className="form-input form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="">Select a category</option>
            <option>Photography</option><option>Home Services</option><option>Catering & Food</option>
            <option>Design</option><option>Health & Wellness</option><option>Fashion</option>
            <option>Transport</option><option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">City *</label>
          <select className="form-input form-select" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
            <option value="">Select your city</option>
            <option>Johannesburg</option><option>Cape Town</option><option>Durban</option>
            <option>Pretoria</option><option>Port Elizabeth</option><option>East London</option>
            <option>Bloemfontein</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Budget (optional)</label>
          <input className="form-input" placeholder="e.g. R 2,000 – R 5,000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
        </div>
        <button className="btn-primary" style={{ width: "100%", marginTop: "8px", opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Posting..." : "🚀 Get Offers"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SEND OFFER PAGE
// ============================================================
function SendOfferPage({ request, navigate, showToast }) {
  const [form, setForm] = useState({ message: "", price: "" });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = () => {
    if (!form.message || !form.price) { showToast("Please fill in all fields"); return; }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); showToast("Offer sent! 🎉"); navigate("requests"); }, 1500);
  };
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("request-detail", request)}><Icon.ChevronLeft /> Back</button>
        <div className="page-title" style={{ marginTop: "8px" }}>Send an Offer</div>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ background: "var(--paper-2)", borderRadius: "var(--radius-md)", padding: "16px", marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", color: "var(--ink-3)", fontWeight: 600, marginBottom: "6px" }}>RESPONDING TO</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px" }}>{request.title}</div>
          <div style={{ fontSize: "13px", color: "var(--ink-3)", marginTop: "4px" }}>{request.city} · Budget: {request.budget}</div>
        </div>
        <div className="form-group">
          <label className="form-label">Your message *</label>
          <textarea className="form-input form-textarea" placeholder="Introduce yourself and explain why you're the right provider for this request..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Your price *</label>
          <input className="form-input" placeholder="e.g. R 2,500" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        </div>
        <button className="btn-primary" style={{ width: "100%", marginTop: "8px", opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Sending..." : "Send Offer →"}
        </button>
      </div>
    </div>
  );
}

// ============================================================
// DEAL PAGE
// ============================================================
function DealPage({ data, navigate, showToast }) {
  const { offer, request } = data || {};
  if (!offer || !request) return null;
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate("requests")}><Icon.ChevronLeft /> Back</button>
        <div className="page-title" style={{ marginTop: "8px" }}>Deal Accepted 🎉</div>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={{ fontSize: "64px", marginBottom: "12px" }}>🤝</div>
          <div className="deal-status">● Deal is Active</div>
          <div style={{ marginTop: "12px", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "20px" }}>You've accepted an offer!</div>
          <div style={{ color: "var(--ink-3)", fontSize: "14px", marginTop: "6px" }}>Connect with your provider below.</div>
        </div>
        <div style={{ background: "var(--surface)", borderRadius: "var(--radius-lg)", padding: "20px", boxShadow: "var(--shadow-md)", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-3)", marginBottom: "10px" }}>PROVIDER</div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
            <div className="provider-avatar">{offer.avatar}</div>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{offer.provider}</div>
              <span className={`badge badge-${offer.badge}`}>{offer.badge === "featured" ? "⭐ Featured" : "✓ Verified"}</span>
            </div>
            <div style={{ marginLeft: "auto", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "20px", color: "var(--flame)" }}>{offer.price}</div>
          </div>
          <div className="divider" style={{ margin: "12px 0" }} />
          <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-3)", marginBottom: "6px" }}>REQUEST</div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>{request.title}</div>
          <div style={{ fontSize: "13px", color: "var(--ink-3)", marginTop: "4px" }}>{request.city}</div>
        </div>
        <button className="btn-wa" style={{ width: "100%", marginBottom: "12px" }} onClick={() => showToast("Opening WhatsApp...")}>
          📱 Contact via WhatsApp
        </button>
        <button className="btn-secondary" style={{ width: "100%" }} onClick={() => navigate("requests")}>Back to Requests</button>
      </div>
    </div>
  );
}

// ============================================================
// DEALS PAGE (list)
// ============================================================
function DealsPage({ navigate }) {
  return (
    <div className="page">
      <div className="page-header"><div className="page-title">🤝 My Deals</div></div>
      <div className="empty-state" style={{ paddingTop: "80px" }}>
        <div className="empty-state-icon">🛍️</div>
        <div className="empty-state-title">No active deals yet</div>
        <div className="empty-state-sub">Accept an offer on a request to start a deal with a provider.</div>
        <button className="btn-primary" onClick={() => navigate("requests")}><Icon.Plus /> Browse Requests</button>
      </div>
    </div>
  );
}

// ============================================================
// PROVIDER DASHBOARD
// ============================================================
function ProviderDashboard({ navigate, showToast }) {
  const stats = [
    { label: "Profile Views", value: "1,284" },
    { label: "Offers Sent", value: "42" },
    { label: "Active Deals", value: "7" },
  ];
  return (
    <div className="page">
      <div className="page-header"><div className="page-title">📊 Provider Dashboard</div></div>
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          <button className="btn-primary" style={{ flex: 1, fontSize: "14px", padding: "12px" }} onClick={() => showToast("Opening add product form...")}><Icon.Plus /> Add Product</button>
          <button className="btn-secondary" style={{ flex: 1, fontSize: "14px", padding: "12px" }} onClick={() => showToast("Opening add service form...")}><Icon.Plus /> Add Service</button>
        </div>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "14px" }}>My Listings</div>
        <div className="grid-2" style={{ marginBottom: "24px" }}>
          {PRODUCTS.slice(0, 4).map(p => <ProductCardGrid key={p.id} product={p} onClick={() => navigate("product", p)} />)}
        </div>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", marginBottom: "14px" }}>My Services</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {SERVICES.slice(0, 3).map(s => <ServiceCard key={s.id} service={s} onClick={() => navigate("service", s)} />)}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROFILE PAGE
// ============================================================
function ProfilePage({ navigate }) {
  const menuItems = [
    { icon: "📦", label: "My Orders" },
    { icon: "📣", label: "My Requests", action: () => navigate("requests") },
    { icon: "🤝", label: "My Deals", action: () => navigate("deals") },
    { icon: "📊", label: "Provider Dashboard", action: () => navigate("dashboard") },
    { icon: "🏪", label: "My Store", action: () => navigate("store", STORES[0]) },
    { icon: "⚙️", label: "Settings" },
    { icon: "❓", label: "Help & Support" },
  ];
  return (
    <div className="page">
      <div className="page-header"><div className="page-title">👤 Profile</div></div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "var(--surface)", borderRadius: "var(--radius-lg)", padding: "20px", boxShadow: "var(--shadow-sm)", marginBottom: "20px" }}>
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--flame)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "24px" }}>N</div>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px" }}>Nomvula Dlamini</div>
            <div style={{ fontSize: "13px", color: "var(--ink-3)" }}>nomvula@gmail.com</div>
            <div style={{ marginTop: "6px" }}><span className="badge badge-verified">✓ Verified</span></div>
          </div>
        </div>
        <div style={{ background: "var(--surface)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
          {menuItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderBottom: i < menuItems.length - 1 ? "1px solid var(--paper-2)" : "none", cursor: "pointer" }} onClick={item.action || (() => {})}>
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <span style={{ fontWeight: 500, fontSize: "15px" }}>{item.label}</span>
              <span style={{ marginLeft: "auto", color: "var(--ink-3)", fontSize: "18px" }}>›</span>
            </div>
          ))}
        </div>
        <button style={{ width: "100%", marginTop: "16px", padding: "14px", borderRadius: "var(--radius-md)", background: "none", border: "1.5px solid #fee2e2", color: "#dc2626", fontFamily: "DM Sans, sans-serif", fontWeight: 600, cursor: "pointer" }}>Sign Out</button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState(null);
  const [toast, setToast] = useState(null);

  const navigate = (target, data = null) => {
    setPage(target);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const mainPage = (pageKey) => ["home", "search", "requests", "deals", "profile"].includes(pageKey) ? pageKey : "home";

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} showToast={showToast} />;
      case "search": return <SearchPage navigate={navigate} />;
      case "requests": return <RequestsPage navigate={navigate} />;
      case "deals": return <DealsPage navigate={navigate} />;
      case "profile": return <ProfilePage navigate={navigate} />;
      case "product": return <ProductDetailPage product={pageData} navigate={navigate} showToast={showToast} />;
      case "service": return <ServiceDetailPage service={pageData} navigate={navigate} showToast={showToast} />;
      case "store": return <StoreProfilePage store={pageData} navigate={navigate} showToast={showToast} />;
      case "request-detail": return <RequestDetailPage request={pageData} navigate={navigate} showToast={showToast} />;
      case "create-request": return <CreateRequestPage navigate={navigate} showToast={showToast} />;
      case "send-offer": return <SendOfferPage request={pageData} navigate={navigate} showToast={showToast} />;
      case "deal": return <DealPage data={pageData} navigate={navigate} showToast={showToast} />;
      case "dashboard": return <ProviderDashboard navigate={navigate} showToast={showToast} />;
      default: return <HomePage navigate={navigate} showToast={showToast} />;
    }
  };

  const activeNav = ["home", "search", "requests", "deals", "profile"].includes(page) ? page : "home";

  return (
    <>
      <style>{STYLES}</style>
      <div className="app-shell">
        <SideNav page={activeNav} setPage={(p) => navigate(p)} />
        <div className="main-content" style={{ flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </div>
        <BottomNav page={activeNav} setPage={(p) => navigate(p)} />
        <Toast message={toast} />
      </div>
    </>
  );
     }

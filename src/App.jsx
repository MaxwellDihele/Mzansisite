import { useState, useEffect } from "react";

const categories = [
  { icon: "🌿", name: "Beauty & Health", sub: "Salons, Spas, Makeup & more", color: "#e8f5e9" },
  { icon: "🚜", name: "Agriculture", sub: "Farming, Produce, Equipment & more", color: "#f1f8e9" },
  { icon: "🏠", name: "Home & Lifestyle", sub: "Cleaning, Repairs, Decor & more", color: "#e8f5e9" },
  { icon: "👕", name: "Fashion & Apparel", sub: "Clothing, Shoes, Accessories & more", color: "#f1f8e9" },
  { icon: "🎉", name: "Events & Planning", sub: "Catering, Decor, Entertainment & more", color: "#e8f5e9" },
  { icon: "📷", name: "Photography", sub: "Photoshoots, Events, Editing & more", color: "#f1f8e9" },
  { icon: "🔧", name: "Trades & Services", sub: "Plumbing, Electrical, Carpentry & more", color: "#e8f5e9" },
  { icon: "💻", name: "Tech & Digital", sub: "Web, IT Support, Design & more", color: "#f1f8e9" },
  { icon: "🎓", name: "Education", sub: "Tutoring, Coaching, Training & more", color: "#e8f5e9" },
];

const provinces = [
  "All Provinces", "Gauteng", "Western Cape", "KwaZulu-Natal",
  "Eastern Cape", "Limpopo", "Mpumalanga", "North West",
  "Free State", "Northern Cape",
];

const mockProfiles = [
  { id: 1, name: "Zanele Beauty Studio", category: "Beauty & Health", location: "Johannesburg, GP", rating: 4.9, reviews: 128, verified: true, price: "From R150", emoji: "💅" },
  { id: 2, name: "Sipho's Photography", category: "Photography", location: "Cape Town, WC", rating: 4.8, reviews: 94, verified: true, price: "From R800", emoji: "📸" },
  { id: 3, name: "Ubuntu Events", category: "Events & Planning", location: "Durban, KZN", rating: 4.7, reviews: 63, verified: true, price: "From R2500", emoji: "🎊" },
  { id: 4, name: "GreenField Farms", category: "Agriculture", location: "Pretoria, GP", rating: 4.9, reviews: 42, verified: true, price: "From R50", emoji: "🌽" },
  { id: 5, name: "Lebo's Home Care", category: "Home & Lifestyle", location: "Soweto, GP", rating: 4.6, reviews: 87, verified: false, price: "From R200", emoji: "🏡" },
  { id: 6, name: "Thabo Digital", category: "Tech & Digital", location: "Cape Town, WC", rating: 5.0, reviews: 31, verified: true, price: "From R500", emoji: "💻" },
];

export default function MzansiConnect() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProvince, setSelectedProvince] = useState("All Provinces");
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [showCategoryDrop, setShowCategoryDrop] = useState(false);
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [searchResults, setSearchResults] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", category: "", province: "" });
  const [toast, setToast] = useState(null);
  const [verifyStep, setVerifyStep] = useState(1);
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateHero(true), 100);
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const green = "#1a7a3c";
  const greenLight = "#e8f5e9";
  const greenMid = "#2d9e52";

  const styles = {
    app: { fontFamily: "'DM Sans', 'Nunito', sans-serif", background: "#f9fafb", minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", overflowX: "hidden" },
    nav: { background: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", position: "sticky", top: 0, zIndex: 100 },
    logo: { display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: 18, color: "#1a1a1a" },
    hamburger: { background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 },
    bar: { width: 24, height: 2.5, background: "#1a1a1a", borderRadius: 2, transition: "all 0.3s" },
    mobileMenu: { position: "fixed", top: 0, right: 0, height: "100vh", width: 270, background: "#fff", zIndex: 999, boxShadow: "-4px 0 20px rgba(0,0,0,0.15)", transform: menuOpen ? "translateX(0)" : "translateX(100%)", transition: "transform 0.35s cubic-bezier(.4,0,.2,1)", padding: "24px 0" },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transition: "opacity 0.3s" },
    menuItem: { display: "block", padding: "14px 28px", fontSize: 16, fontWeight: 600, color: "#1a1a1a", textDecoration: "none", cursor: "pointer", borderLeft: "3px solid transparent", transition: "all 0.2s" },
    hero: { background: `linear-gradient(135deg, #f0faf3 0%, #e8f5e9 100%)`, padding: "32px 20px 0", overflow: "hidden", transition: "opacity 0.6s, transform 0.6s", opacity: animateHero ? 1 : 0, transform: animateHero ? "translateY(0)" : "translateY(20px)" },
    heroTitle: { fontSize: 26, fontWeight: 900, lineHeight: 1.25, color: "#111", margin: "0 0 10px" },
    heroSub: { fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 0 },
    heroImg: { width: "100%", maxWidth: 160, borderRadius: "50% 50% 0 0", display: "block", marginLeft: "auto" },
    card: { background: "#fff", borderRadius: 16, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", margin: "0 16px", marginTop: -20, position: "relative", zIndex: 10 },
    input: { width: "100%", padding: "13px 16px 13px 42px", border: "1.5px solid #e0e0e0", borderRadius: 12, fontSize: 15, outline: "none", boxSizing: "border-box", background: "#f9f9f9", transition: "border-color 0.2s" },
    filters: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },
    filterBtn: { display: "flex", alignItems: "center", gap: 5, padding: "8px 12px", border: "1.5px solid #e0e0e0", borderRadius: 10, background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#333", position: "relative" },
    toggle: { width: 42, height: 24, borderRadius: 12, background: verifiedOnly ? green : "#ccc", display: "flex", alignItems: "center", padding: "0 3px", cursor: "pointer", transition: "background 0.3s", marginLeft: 4 },
    toggleDot: { width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transform: verifiedOnly ? "translateX(18px)" : "translateX(0)", transition: "transform 0.3s" },
    searchBtn: { width: "100%", padding: "14px", background: green, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s, transform 0.1s" },
    section: { padding: "24px 20px 8px" },
    sectionTitle: { fontSize: 18, fontWeight: 800, color: "#111", margin: 0 },
    viewAll: { color: green, fontSize: 14, fontWeight: 700, cursor: "pointer", background: "none", border: "none" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 },
    catCard: { borderRadius: 14, padding: "14px 10px", textAlign: "center", cursor: "pointer", border: "1.5px solid #ebebeb", transition: "transform 0.2s, box-shadow 0.2s", background: "#fff" },
    catIcon: { fontSize: 26, marginBottom: 6, display: "block" },
    catName: { fontSize: 11, fontWeight: 800, color: "#111", lineHeight: 1.3 },
    catSub: { fontSize: 9.5, color: "#777", marginTop: 3, lineHeight: 1.4 },
    howItWorks: { background: greenLight, margin: "20px 16px", borderRadius: 20, padding: "24px 20px" },
    steps: { display: "flex", alignItems: "flex-start", gap: 0, marginTop: 16 },
    step: { flex: 1, textAlign: "center" },
    stepNum: { width: 28, height: 28, borderRadius: "50%", background: green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, margin: "0 auto 8px" },
    stepIcon: { fontSize: 22, display: "block", marginBottom: 6 },
    stepTitle: { fontSize: 12, fontWeight: 800, color: "#111" },
    stepSub: { fontSize: 10.5, color: "#555", marginTop: 3, lineHeight: 1.4 },
    stepLine: { flex: "0 0 20px", height: 2, background: `repeating-linear-gradient(90deg, ${green} 0, ${green} 5px, transparent 5px, transparent 10px)`, marginTop: 14, alignSelf: "flex-start" },
    cta: { background: "#fff", margin: "16px 16px 24px", borderRadius: 20, padding: "20px", border: `1.5px solid ${greenLight}`, display: "flex", gap: 14, alignItems: "center" },
    ctaText: { flex: 1 },
    ctaTitle: { fontSize: 15, fontWeight: 800, color: "#111", marginBottom: 4 },
    ctaSub: { fontSize: 12, color: "#666" },
    ctaBtns: { display: "flex", flexDirection: "column", gap: 8, minWidth: 130 },
    ctaBtn1: { padding: "10px 14px", background: green, color: "#fff", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer" },
    ctaBtn2: { padding: "10px 14px", background: "#fff", color: green, border: `2px solid ${green}`, borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer" },
    profileCard: { background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12, cursor: "pointer", transition: "transform 0.15s" },
    profileEmoji: { width: 52, height: 52, borderRadius: 14, background: greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 },
    badge: { background: green, color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 6, display: "inline-block", marginTop: 4 },
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" },
    modalBox: { background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 430, padding: "28px 24px 40px", maxHeight: "85vh", overflowY: "auto" },
    modalTitle: { fontSize: 20, fontWeight: 800, margin: "0 0 20px" },
    formInput: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12 },
    formLabel: { fontSize: 12, fontWeight: 700, color: "#555", marginBottom: 4, display: "block" },
    primaryBtn: { width: "100%", padding: 14, background: green, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" },
    secondaryBtn: { width: "100%", padding: 14, background: "#fff", color: green, border: `2px solid ${green}`, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 10 },
    toast: { position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: toast?.type === "success" ? green : "#c0392b", color: "#fff", padding: "12px 24px", borderRadius: 40, fontSize: 14, fontWeight: 600, zIndex: 2000, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", whiteSpace: "nowrap" },
    bottomNav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#fff", borderTop: "1px solid #f0f0f0", display: "flex", zIndex: 90, paddingBottom: "env(safe-area-inset-bottom)" },
    navBtn: (active) => ({ flex: 1, padding: "10px 0 8px", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? green : "#999", transition: "color 0.2s" }),
    dropdown: { position: "absolute", top: "110%", left: 0, background: "#fff", border: "1.5px solid #e0e0e0", borderRadius: 12, minWidth: 200, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", maxHeight: 220, overflowY: "auto" },
    dropItem: { padding: "10px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", borderBottom: "1px solid #f5f5f5", transition: "background 0.15s" },
  };

  const menuItems = [
    { label: "✅ Get Verified", action: () => { setShowVerifyModal(true); setMenuOpen(false); } },
   ];


      {/* Browse Categories */}
      <div style={styles.section}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={styles.sectionTitle}>Browse Categories</h2>
          <button style={{ ...styles.viewAll, background: "none", border: "none" }} onClick={() => setActiveTab("categories")}>View all</button>
        </div>
        <div style={styles.grid}>
          {categories.slice(0, 6).map(cat => (
            <div key={cat.name} style={styles.catCard}
              onClick={() => { setSelectedCategory(cat.name); setSearchResults(mockProfiles.filter(p => p.category === cat.name)); setActiveTab("search"); }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <span style={styles.catIcon}>{cat.icon}</span>
              <div style={styles.catName}>{cat.name}</div>
              <div style={styles.catSub}>{cat.sub}</div>
            </div>
          ))}
        </div>
      </div>
            <div style={{ ...styles.stepLine, marginTop: 14 }} />
            <div style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <span style={styles.stepIcon}>🛡️</span>
              <div style={styles.stepTitle}>Get Verified</div>
              <div style={styles.stepSub}>Complete ID verification. (ZAR 175)</div>
            </div>
            <div style={{ ...styles.stepLine, marginTop: 14 }} />
            <div style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <span style={styles.stepIcon}>📈</span>
              <div style={styles.stepTitle}>Get Discovered</div>
              <div style={styles.stepSub}>Get found and grow your business.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={styles.cta}>
        <div style={{ fontSize: 48 }}>🚀</div>
        <div style={styles.ctaText}>
          <div style={styles.ctaTitle}>Ready to grow your business?</div>
          <div style={styles.ctaSub}>Join thousands of verified professionals today.</div>
        </div>
        <div style={styles.ctaBtns}>
          <button style={styles.ctaBtn1} onClick={() => setShowSignupModal(true)}>Create Your Profile</button>
          <button style={styles.ctaBtn2} onClick={() => setShowVerifyModal(true)}>Get Verified</button>
        </div>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );

  const renderSearch = () => (
    <div style={{ padding: "20px 16px" }}>
      {/* Search bar inline */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", marginBottom: 16 }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
          <input style={{ ...styles.input, marginBottom: 10 }} placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} />
        </div>
        <button style={{ ...styles.searchBtn, marginTop: 0, padding: 11 }} onClick={handleSearch}>Search</button>
      </div>

      <div style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        {searchResults ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} found` : "Browse all services"}
      </div>

      {(searchResults || mockProfiles).map(p => (
        <div key={p.id} style={styles.profileCard} onClick={() => setShowProfileModal(p)}>
          <div style={styles.profileEmoji}>{p.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{p.category}</div>
            <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>📍 {p.location}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
              <span style={{ fontSize: 12 }}>⭐ {p.rating} ({p.reviews})</span>
              <span style={{ fontSize: 13, color: green, fontWeight: 700 }}>{p.price}</span>
              {p.verified && <span style={styles.badge}>✓ Verified</span>}
            </div>
          </div>
        </div>
      ))}
      <div style={{ height: 80 }} />
    </div>
  );

  const renderCategories = () => (
    <div style={{ padding: "20px 16px" }}>
      <h2 style={{ ...styles.sectionTitle, marginBottom: 16 }}>All Categories</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {categories.map(cat => (
          <div key={cat.name} style={{ ...styles.catCard, padding: "18px 14px", textAlign: "left", display: "flex", gap: 10, alignItems: "center" }}
            onClick={() => { setSelectedCategory(cat.name); setSearchResults(mockProfiles.filter(p => p.category === cat.name)); setActiveTab("search"); }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.09)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <span style={{ fontSize: 30 }}>{cat.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>{cat.name}</div>
              <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>{cat.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 80 }} />
    </div>
  );

  const renderProfile = () => (
    <div style={{ padding: "20px 16px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>👤</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Your Profile</h2>
      <p style={{ color: "#777", fontSize: 14, marginBottom: 24 }}>Create your profile to start connecting with clients across South Africa.</p>
      <button style={styles.primaryBtn} onClick={() => setShowSignupModal(true)}>Create Your Profile</button>
      <button style={styles.secondaryBtn} onClick={() => setShowVerifyModal(true)}>Get Verified (ZAR 175)</button>
      <div style={{ height: 80 }} />
    </div>
  );

  return (
    <div style={styles.app}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={{ fontSize: 24 }}>🌱</span>
          Mzansi Connect
        </div>
        <button style={styles.hamburger} onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <div style={styles.bar} />
          <div style={styles.bar} />
          <div style={styles.bar} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div style={styles.overlay} onClick={() => setMenuOpen(false)} />

      {/* Mobile menu drawer */}
      <div style={styles.mobileMenu}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px 20px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={styles.logo}><span style={{ fontSize: 20 }}>🌱</span> Mzansi Connect</div>
          <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#666" }}>✕</button>
        </div>
        <div style={{ marginTop: 8 }}>
          {menuItems.map(item => (
            <div key={item.label} style={styles.menuItem} onClick={item.action}
              onMouseEnter={e => { e.currentTarget.style.borderLeftColor = green; e.currentTarget.style.background = greenLight; }}
              onMouseLeave={e => { e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.background = "transparent"; }}>
              {item.label}
            </div>
          ))}
        </div>
        <div style={{ padding: "20px 24px", marginTop: "auto", borderTop: "1px solid #f0f0f0", position: "absolute", bottom: 0, width: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: 11, color: "#aaa" }}>© 2025 Mzansi Connect</div>
        </div>
      </div>

      {/* Main content */}
      {activeTab === "home" && renderHome()}
      {activeTab === "search" && renderSearch()}
      {activeTab === "categories" && renderCategories()}
      {activeTab === "profile" && renderProfile()}

      {/* Bottom Nav */}
      <div style={styles.bottomNav}>
        {[
          { tab: "home", icon: "🏠", label: "Home" },
          { tab: "search", icon: "🔍", label: "Search" },
          { tab: "categories", icon: "⊞", label: "Browse" },
          { tab: "profile", icon: "👤", label: "Profile" },
        ].map(n => (
          <button key={n.tab} style={styles.navBtn(activeTab === n.tab)} onClick={() => setActiveTab(n.tab)}>
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>

      {/* Profile Detail Modal */}
      {showProfileModal && (
        <div style={styles.modal} onClick={() => setShowProfileModal(null)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{showProfileModal.emoji}</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{showProfileModal.name}</h2>
              {showProfileModal.verified && <span style={{ ...styles.badge, display: "inline-block", marginTop: 6 }}>✓ Verified Business</span>}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Category", val: showProfileModal.category },
                { label: "Location", val: showProfileModal.location },
                { label: "Rating", val: `⭐ ${showProfileModal.rating}` },
                { label: "Reviews", val: `${showProfileModal.reviews} reviews` },
                { label: "Starting Price", val: showProfileModal.price },
                { label: "Status", val: showProfileModal.verified ? "✅ Verified" : "⚪ Unverified" },
              ].map(item => (
                <div key={item.label} style={{ background: greenLight, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: "#777", fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>{item.val}</div>
                </div>
              ))}
            </div>
            <button style={styles.primaryBtn} onClick={() => { showToast("📩 Message sent to " + showProfileModal.name + "!"); setShowProfileModal(null); }}>
              💬 Contact Now
            </button>
            <button style={styles.secondaryBtn} onClick={() => setShowProfileModal(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div style={styles.modal} onClick={() => setShowSignupModal(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ ...styles.modalTitle, margin: 0 }}>
                {signupStep === 1 ? "👤 Create Profile" : signupStep === 2 ? "🏢 Business Info" : "✅ Almost Done!"}
              </h2>
              <button onClick={() => { setShowSignupModal(false); setSignupStep(1); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999" }}>✕</button>
            </div>
            {/* Step indicator */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {[1, 2, 3].map(s => (
                <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= signupStep ? green : "#e0e0e0", transition: "background 0.3s" }} />
              ))}
            </div>
            {signupStep === 1 && (
              <>
                <label style={styles.formLabel}>Full Name</label>
                <input style={styles.formInput} placeholder="e.g. Zanele Dlamini" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <label style={styles.formLabel}>Email Address</label>
                <input style={styles.formInput} placeholder="zanele@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <label style={styles.formLabel}>Phone Number</label>
                <input style={styles.formInput} placeholder="071 234 5678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </>
            )}
            {signupStep === 2 && (
              <>
                <label style={styles.formLabel}>Business / Service Name</label>
                <input style={styles.formInput} placeholder="e.g. Zanele Beauty Studio" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} />
                <label style={styles.formLabel}>Category</label>
                <select style={styles.formInput} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select a category...</option>
                  {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
                <label style={styles.formLabel}>Province</label>
                <select style={styles.formInput} value={form.province} onChange={e => setForm({ ...form, province: e.target.value })}>
                  <option value="">Select province...</option>
                  {provinces.slice(1).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </>
            )}
            {signupStep === 3 && (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                <p style={{ fontSize: 15, color: "#555", marginBottom: 8 }}>Your profile is ready to go live!</p>
                <p style={{ fontSize: 13, color: "#888" }}>Tip: Get verified to boost visibility and build trust with clients.</p>
                <div style={{ background: greenLight, borderRadius: 14, padding: 16, marginTop: 16, textAlign: "left" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: green }}>Profile Summary</div>
                  <div style={{ fontSize: 13, color: "#333" }}><b>Name:</b> {form.name || "—"}</div>
                  <div style={{ fontSize: 13, color: "#333" }}><b>Business:</b> {form.business || "—"}</div>
                  <div style={{ fontSize: 13, color: "#333" }}><b>Category:</b> {form.category || "—"}</div>
                  <div style={{ fontSize: 13, color: "#333" }}><b>Province:</b> {form.province || "—"}</div>
                </div>
              </div>
            )}
            <button style={styles.primaryBtn} onClick={handleSignup}>
              {signupStep < 3 ? "Continue →" : "Create My Profile 🚀"}
            </button>
            {signupStep > 1 && <button style={styles.secondaryBtn} onClick={() => setSignupStep(s => s - 1)}>← Back</button>}
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div style={styles.modal} onClick={() => setShowVerifyModal(false)}>
          <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ ...styles.modalTitle, margin: 0 }}>
                {verifyStep === 1 ? "🛡️ Get Verified" : verifyStep === 2 ? "📄 Upload ID" : "💳 Payment"}
              </h2>
              <button onClick={() => { setShowVerifyModal(false); setVerifyStep(1); }} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#999" }}>✕</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {[1, 2, 3].map(s => <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= verifyStep ? green : "#e0e0e0", transition: "background 0.3s" }} />)}
            </div>
            {verifyStep === 1 && (
              <>
                <div style={{ background: greenLight, borderRadius: 14, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>Benefits of Verification:</div>
                  {["✓ Verified badge on your profile", "✓ Higher search rankings", "✓ More client trust & bookings", "✓ Featured in verified listings"].map(b => (
                    <div key={b} style={{ fontSize: 13, color: "#333", marginBottom: 5 }}>{b}</div>
                  ))}
                </div>
                <div style={{ textAlign: "center", fontSize: 24, fontWeight: 900, color: green, marginBottom: 4 }}>ZAR 175</div>
                <div style={{ textAlign: "center", fontSize: 12, color: "#888", marginBottom: 16 }}>One-time fee · Valid for 12 months</div>
              </>
            )}
            {verifyStep === 2 && (
              <>
                <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>Please upload a valid South African ID document or passport.</p>
                <div style={{ border: "2px dashed #ddd", borderRadius: 14, padding: "32px 16px", textAlign: "center", cursor: "pointer", marginBottom: 12 }}
                  onClick={() => showToast("📎 File upload simulated!")}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📎</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#555" }}>Tap to upload ID document</div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>JPG, PNG or PDF · Max 5MB</div>
                </div>
              </>
            )}
            {verifyStep === 3 && (
              <>
                <p style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>Complete your verification payment:</p>
                <input style={styles.formInput} placeholder="Card number" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input style={styles.formInput} placeholder="MM/YY" />
                  <input style={styles.formInput} placeholder="CVV" />
                </div>
                <div style={{ background: greenLight, borderRadius: 10, padding: 12, display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Verification fee</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: green }}>ZAR 175</span>
                </div>
              </>
            )}
            <button style={styles.primaryBtn} onClick={handleVerify}>
              {verifyStep < 3 ? "Continue →" : "Pay & Submit 🛡️"}
            </button>
            {verifyStep > 1 && <button style={styles.secondaryBtn} onClick={() => setVerifyStep(s => s - 1)}>← Back</button>}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div style={styles.toast}>{toast.msg}</div>}
    </div>
  );
      }

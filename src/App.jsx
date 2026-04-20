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

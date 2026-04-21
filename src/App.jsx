import { useState } from "react";

/* ─────────────── DATA ─────────────── */
const portfolio = [
  { id: 1, src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80", span: "large", label: "Portrait" },
  { id: 2, src: "https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?w=300&q=80", span: "small", label: "Beauty" },
  { id: 3, src: "https://images.unsplash.com/photo-1529637977047-9c6f1d57e96f?w=300&q=80", span: "small", label: "Couples" },
  { id: 4, src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&q=80", span: "small", label: "Fashion" },
  { id: 5, src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80", span: "small", label: "Nature" },
  { id: 6, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", span: "wide", label: "Landscape" },
];

const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", handle: "@thandiwe_captures", url: "https://instagram.com", color: "#E1306C", gradient: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { id: "tiktok", label: "TikTok", handle: "@thandiwe.nkosi", url: "https://tiktok.com", color: "#69C9D0", gradient: "linear-gradient(135deg,#010101,#69C9D0)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> },
  { id: "whatsapp", label: "WhatsApp", handle: "+27 81 234 5678", url: "https://wa.me/27812345678", color: "#25D366", gradient: "linear-gradient(135deg,#128C7E,#25D366)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
];

const PEOPLE = [
  { id: 1, name: "Zinhle Dube", handle: "@zinhle_d", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", role: "Model", location: "Cape Town, ZA", bio: "Fashion & commercial model. Lover of art, culture and the African sun. Available for bookings.", followers: 8400, following: 210, projects: 22, rating: 4.7, reviews: 41, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80","https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80","https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80"] },
  { id: 2, name: "Kagiso Sithole", handle: "@kagiso_s", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", role: "Fashion Designer", location: "Durban, ZA", bio: "Designing bold African fashion for the modern world. Streetwear meets heritage.", followers: 3200, following: 180, projects: 15, rating: 4.5, reviews: 28, verified: false, isFollowing: false,
    portfolio: ["https://images.unsplash.com/photo-1558171813-f5a90fe22b8a?w=300&q=80","https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&q=80","https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=300&q=80"] },
  { id: 3, name: "Naledi Mokoena", handle: "@naledi.m", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", role: "Makeup Artist", location: "Pretoria, ZA", bio: "Bridal, editorial & SFX makeup. Over 200 happy clients. Let me make you shine ✨", followers: 12100, following: 304, projects: 67, rating: 4.9, reviews: 93, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&q=80","https://images.unsplash.com/photo-1596704017254-9b5e2a025acf?w=300&q=80","https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80","https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80"] },
  { id: 4, name: "Bongani Khumalo", handle: "@bongani_k", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", role: "Videographer", location: "Johannesburg, ZA", bio: "Cinematic storytelling for brands, events & music videos. Sony FX6 operator.", followers: 5700, following: 260, projects: 34, rating: 4.6, reviews: 52, verified: false, isFollowing: false,
    portfolio: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&q=80","https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80","https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80","https://images.unsplash.com/photo-1587145820098-5e8b5e59e2c3?w=300&q=80"] },
  { id: 5, name: "Lerato Ntuli", handle: "@lerato.ntuli", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", role: "Stylist", location: "Sandton, ZA", bio: "Celebrity stylist. Fashion week veteran. Making people look and feel extraordinary.", followers: 9300, following: 190, projects: 44, rating: 4.8, reviews: 76, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80","https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80","https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&q=80","https://images.unsplash.com/photo-1558171813-f5a90fe22b8a?w=300&q=80"] },
  { id: 6, name: "Sipho Nkosi", handle: "@sipho_n", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80", role: "Art Director", location: "Cape Town, ZA", bio: "Creative direction for lifestyle brands. Turning ideas into iconic visuals.", followers: 4100, following: 142, projects: 19, rating: 4.4, reviews: 33, verified: false, isFollowing: false,
    portfolio: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80","https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&q=80","https://images.unsplash.com/photo-1547153760-18fc86324498?w=300&q=80","https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=80"] },
  { id: 7, name: "Ayanda Mthembu", handle: "@ayanda.m", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", role: "Content Creator", location: "Durban, ZA", bio: "Travel & lifestyle content creator. Exploring Africa one post at a time 🌍", followers: 31000, following: 520, projects: 88, rating: 4.7, reviews: 110, verified: true, isFollowing: false,
    portfolio: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&q=80","https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=300&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80"] },
  { id: 8, name: "Thabo Dlamini", handle: "@thabo_d", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80", role: "Photographer", location: "Pretoria, ZA", bio: "Documentary & street photographer. Telling South Africa's untold stories.", followers: 7200, following: 388, projects: 29, rating: 4.8, reviews: 64, verified: false, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80","https://images.unsplash.com/photo-1529637977047-9c6f1d57e96f?w=300&q=80","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80","https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80"] },
  // following list people
  { id: 9, name: "Minnie Dlamini", handle: "@minniedlamini", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", role: "TV Presenter", location: "Johannesburg, ZA", bio: "TV presenter, actress & entrepreneur. Living my best life. ✨", followers: 2100000, following: 890, projects: 120, rating: 4.9, reviews: 202, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80","https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80","https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80","https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80"] },
  { id: 10, name: "Trevor Noah", handle: "@trevornoah", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", role: "Comedian", location: "New York / SA", bio: "Comedian, author, former host of The Daily Show. Proudly South African 🇿🇦", followers: 8900000, following: 420, projects: 55, rating: 4.9, reviews: 312, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80","https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80","https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80"] },
  { id: 11, name: "Nomzamo Mbatha", handle: "@nomzamo_m", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", role: "Actress", location: "Los Angeles / SA", bio: "Actress, humanitarian & UNHCR Goodwill Ambassador. South African heart. 🌍", followers: 3400000, following: 660, projects: 78, rating: 5.0, reviews: 188, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80","https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80","https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80"] },
  { id: 12, name: "DJ Zinhle", handle: "@djzinhle", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", role: "DJ & Entrepreneur", location: "Johannesburg, ZA", bio: "Award-winning DJ, entrepreneur & mother. Era by DJ Zinhle. 🎧", followers: 4200000, following: 730, projects: 96, rating: 4.8, reviews: 174, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80","https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80","https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&q=80","https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80"] },
  { id: 13, name: "Riky Rick Studio", handle: "@rikyrickworld", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80", role: "Creative Studio", location: "Johannesburg, ZA", bio: "A creative collective honouring Riky Rick's legacy. Art, fashion & culture.", followers: 980000, following: 310, projects: 44, rating: 4.7, reviews: 89, verified: false, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80","https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80","https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=80","https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&q=80"] },
  { id: 14, name: "Sho Madjozi", handle: "@shomadjozi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", role: "Musician", location: "Johannesburg, ZA", bio: "BET Award winner. Tsonga girl changing the world through music and colour 🎶", followers: 1700000, following: 480, projects: 62, rating: 4.9, reviews: 143, verified: true, isFollowing: true,
    portfolio: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80","https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80","https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&q=80","https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80"] },
];

const FOLLOWERS_IDS = [1,2,3,4,5,6,7,8];
const FOLLOWING_IDS = [9,10,11,12,13,14];

const INITIAL_REVIEWS = [
  { id: 1, name: "Jesse Ntuli", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80", rating: 4.9, text: "Great experience shooting with Thandi! She is super talented and made me feel incredibly comfortable.", date: "2 weeks ago", verified: true },
  { id: 2, name: "Amara Dlamini", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=80&q=80", rating: 5.0, text: "Absolutely stunning work. Thandiwe has an eye for light and detail that is unmatched. Will definitely book again.", date: "1 month ago", verified: true },
  { id: 3, name: "Sipho Mokoena", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80", rating: 4.7, text: "Professional, creative and punctual. Our brand shoot came out incredible. Highly recommend.", date: "2 months ago", verified: false },
];

/* ─────────────── HELPERS ─────────────── */
const Star = ({ filled, half, size = 14, interactive, onClick }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "inline", cursor: interactive ? "pointer" : "default" }} onClick={onClick}>
    {half && <defs><linearGradient id="hg"><stop offset="50%" stopColor="#F5A623"/><stop offset="50%" stopColor="#3a3f4b"/></linearGradient></defs>}
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={half ? "url(#hg)" : filled ? "#F5A623" : "#3a3f4b"} />
  </svg>
);
const StarRating = ({ rating, size = 13 }) => (
  <span>{[1,2,3,4,5].map(i => <Star key={i} size={size} filled={i <= Math.floor(rating)} half={i === Math.ceil(rating) && rating % 1 !== 0} />)}</span>
);
const InteractiveStars = ({ value, onChange }) => (
  <span style={{ display: "flex", gap: "4px" }}>
    {[1,2,3,4,5].map(i => <Star key={i} size={28} filled={i <= value} interactive onClick={() => onChange(i)} />)}
  </span>
);
const fmtN = (n) => n >= 1000000 ? (n/1000000).toFixed(1)+"M" : n >= 1000 ? (n/1000).toFixed(1)+"k" : n;

/* ─────────────── MINI PROFILE VIEW ─────────────── */
function MiniProfile({ person, onBack, showToast }) {
  const [isFollowing, setIsFollowing] = useState(person.isFollowing);
  const [followerCount, setFollowerCount] = useState(person.followers);
  const [activeTab, setActiveTab] = useState("portfolio");

  const toggleFollow = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    setFollowerCount(n => next ? n + 1 : n - 1);
    showToast(next ? `Now following ${person.name}` : `Unfollowed ${person.name}`);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 700, background: "#0d1018", overflowY: "auto", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#e8eaf0" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: "rgba(13,16,24,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#e8eaf0", flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "#fff", lineHeight: 1.1 }}>{person.name}</div>
          <div style={{ fontSize: "11px", color: "#7a8299" }}>{person.handle}</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2a8a5a" }} />
        </div>
      </div>

      <div style={{ padding: "20px 16px 50px", maxWidth: "480px", margin: "0 auto" }}>
        {/* Profile header */}
        <div style={{ background: "linear-gradient(145deg,#1c2130,#1a1f2e)", borderRadius: "22px", padding: "22px", marginBottom: "14px", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <img src={person.avatar} alt={person.name} style={{ width: "76px", height: "76px", borderRadius: "50%", objectFit: "cover", border: "3px solid #2a8a5a" }} />
              {person.verified && (
                <div style={{ position: "absolute", bottom: 2, right: 2, background: "#2a8a5a", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #1a1f2e" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>{person.name}</span>
                {person.verified && <svg width="16" height="16" viewBox="0 0 24 24" fill="#2a8a5a"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
              </div>
              <div style={{ fontSize: "12px", color: "#7a8299", marginBottom: "4px" }}>{person.handle}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#9ba3b8" }}><span>📍</span><span>{person.location}</span></div>
            </div>
          </div>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "14px" }}>
            <StarRating rating={person.rating} size={14} />
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#F5A623" }}>{person.rating}</span>
            <span style={{ fontSize: "12px", color: "#7a8299" }}>({person.reviews} reviews)</span>
          </div>

          {/* Role badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(42,138,90,0.12)", border: "1px solid rgba(42,138,90,0.25)", borderRadius: "20px", padding: "5px 12px", marginBottom: "14px" }}>
            <span style={{ fontSize: "12px", color: "#4ecb8a", fontWeight: "600" }}>⭐ {person.role}</span>
          </div>

          {/* Bio */}
          <p style={{ fontSize: "13px", color: "#c0c8de", lineHeight: 1.6, margin: "0 0 16px" }}>{person.bio}</p>

          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <button onClick={toggleFollow} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "none", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: isFollowing ? "linear-gradient(135deg,#1d6b44,#155235)" : "linear-gradient(135deg,#2a8a5a,#1e6b44)", color: "#fff", boxShadow: isFollowing ? "none" : "0 4px 14px rgba(42,138,90,0.35)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {isFollowing ? <polyline points="20 6 9 17 4 12"/> : <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></>}
              </svg>
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button onClick={() => showToast(`Message sent to ${person.name}`)} style={{ flex: 1, padding: "11px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "transparent", border: "1.5px solid rgba(255,255,255,0.18)", color: "#e8eaf0" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Message
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "0", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {[{ n: fmtN(followerCount), l: "Followers" }, { n: fmtN(person.following), l: "Following" }, { n: person.projects, l: "Projects" }].map((s, i) => (
              <div key={s.l} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontSize: "17px", fontWeight: "800", color: "#fff" }}>{s.n}</div>
                <div style={{ fontSize: "11px", color: "#7a8299" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-tabs */}
        <div style={{ display: "flex", background: "#12161f", borderRadius: "14px", padding: "4px", marginBottom: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
          {["portfolio","about"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "9px", borderRadius: "10px", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: activeTab === tab ? "linear-gradient(135deg,#2a8a5a,#1e6b44)" : "transparent", color: activeTab === tab ? "#fff" : "#7a8299" }}>
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        {activeTab === "portfolio" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {person.portfolio.map((src, i) => (
              <div key={i} style={{ borderRadius: "14px", overflow: "hidden", aspectRatio: "1", cursor: "pointer" }} onClick={() => showToast("Opening photo…")}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
        )}

        {/* About tab */}
        {activeTab === "about" && (
          <div style={{ background: "linear-gradient(145deg,#1c2130,#1a1f2e)", borderRadius: "20px", padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
            {[["Name", person.name],["Handle", person.handle],["Role", person.role],["Location", person.location],["Rating", `${person.rating} ⭐`],["Reviews", `${person.reviews} reviews`],["Projects", `${person.projects} completed`],["Verified", person.verified ? "✅ Yes" : "Not yet"]].map(([l,v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "13px" }}>
                <span style={{ color: "#7a8299" }}>{l}</span>
                <span style={{ color: "#e8eaf0", fontWeight: "500" }}>{v}</span>
              </div>
            ))}
            <button onClick={() => showToast(`Booking request sent to ${person.name}!`)} style={{ width: "100%", marginTop: "16px", padding: "13px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
              📩 Request Collaboration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── PEOPLE LIST MODAL ─────────────── */
function PeopleModal({ title, ids, onClose, showToast, onViewProfile }) {
  const list = ids.map(id => PEOPLE.find(p => p.id === id));
  const [search, setSearch] = useState("");
  const [followStates, setFollowStates] = useState(Object.fromEntries(list.map(p => [p.id, p.isFollowing])));
  const [activeSubTab, setActiveSubTab] = useState("all");

  const filtered = list.filter(p => {
    const q = search.toLowerCase();
    const match = p.name.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
    if (activeSubTab === "following") return match && followStates[p.id];
    if (activeSubTab === "not_following") return match && !followStates[p.id];
    return match;
  });

  const toggleFollow = (e, id, name) => {
    e.stopPropagation();
    const next = !followStates[id];
    setFollowStates(s => ({ ...s, [id]: next }));
    showToast(next ? `Now following ${name}` : `Unfollowed ${name}`);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 600, backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div style={{ width: "100%", maxWidth: "480px", background: "linear-gradient(180deg,#1a1f2e,#141824)", borderRadius: "22px 22px 0 0", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 -20px 60px rgba(0,0,0,0.6)", maxHeight: "88vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>

        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 12px" }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: "800", color: "#fff" }}>{title}</div>
            <div style={{ fontSize: "12px", color: "#7a8299" }}>{list.length} people · tap a name to view profile</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", color: "#9ba3b8", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* Search */}
        <div style={{ padding: "0 20px 10px" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a8299" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search people…" style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "10px 12px 10px 34px", fontSize: "13px", color: "#e8eaf0", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* Sub-tabs */}
        <div style={{ display: "flex", gap: "6px", padding: "0 20px 12px" }}>
          {[["all","All"],["following","Following"],["not_following","Not Following"]].map(([key, lbl]) => (
            <button key={key} onClick={() => setActiveSubTab(key)} style={{ padding: "5px 12px", borderRadius: "20px", border: "none", fontSize: "12px", fontWeight: "600", cursor: "pointer", background: activeSubTab === key ? "linear-gradient(135deg,#2a8a5a,#1e6b44)" : "rgba(255,255,255,0.06)", color: activeSubTab === key ? "#fff" : "#7a8299" }}>
              {lbl}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", flex: 1, padding: "0 14px 24px" }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#5a6278", fontSize: "14px" }}>No people found</div>
          )}
          {filtered.map(person => (
            <div
              key={person.id}
              onClick={() => onViewProfile(person)}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 12px", borderRadius: "14px", marginBottom: "6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            >
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img src={person.avatar} alt={person.name} style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(42,138,90,0.5)" }} />
                {person.verified && (
                  <div style={{ position: "absolute", bottom: 0, right: 0, background: "#2a8a5a", borderRadius: "50%", width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #1a1f2e" }}>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.name}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#7a8299" }}>{person.handle} · {fmtN(person.followers)} followers</div>
                <div style={{ fontSize: "11px", color: "#4ecb8a", background: "rgba(42,138,90,0.1)", display: "inline-block", padding: "1px 7px", borderRadius: "10px", marginTop: "3px" }}>{person.role}</div>
              </div>

              {/* Follow + chevron */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                <button
                  onClick={(e) => toggleFollow(e, person.id, person.name)}
                  style={{ padding: "6px 12px", borderRadius: "20px", border: followStates[person.id] ? "1.5px solid rgba(255,255,255,0.2)" : "none", fontSize: "11px", fontWeight: "700", cursor: "pointer", background: followStates[person.id] ? "transparent" : "linear-gradient(135deg,#2a8a5a,#1e6b44)", color: followStates[person.id] ? "#9ba3b8" : "#fff", boxShadow: followStates[person.id] ? "none" : "0 2px 8px rgba(42,138,90,0.3)" }}
                >
                  {followStates[person.id] ? "Following" : "Follow"}
                </button>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5a6278" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function ProfilePage() {
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState(12500);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [likedPhotos, setLikedPhotos] = useState({});
  const [savedPhotos, setSavedPhotos] = useState({});
  const [modal, setModal] = useState(null);
  const [photoModal, setPhotoModal] = useState(null);
  const [reportDone, setReportDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [rvText, setRvText] = useState(""); const [rvName, setRvName] = useState(""); const [rvRating, setRvRating] = useState(0); const [rvDone, setRvDone] = useState(false);
  const [loginEmail, setLoginEmail] = useState(""); const [loginPass, setLoginPass] = useState("");
  const [viewingProfile, setViewingProfile] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };
  const handleFollow = () => { setFollowed(f => !f); setFollowers(n => followed ? n - 1 : n + 1); showToast(followed ? "Unfollowed Thandiwe" : "Now following Thandiwe!"); };
  const handleLike = (id) => setLikedPhotos(p => ({ ...p, [id]: !p[id] }));
  const handleSave = (id) => { setSavedPhotos(p => ({ ...p, [id]: !p[id] })); showToast(savedPhotos[id] ? "Removed from saved" : "Saved!"); };
  const handleReport = () => { setReportDone(true); setTimeout(() => { setModal(null); setReportDone(false); }, 1800); };
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  const submitReview = () => {
    if (!rvName.trim() || !rvText.trim() || rvRating === 0) { showToast("Please fill name, rating & review"); return; }
    setReviews(r => [{ id: Date.now(), name: rvName.trim(), avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(rvName)}&background=2a8a5a&color=fff&size=80`, rating: rvRating, text: rvText.trim(), date: "Just now", verified: false }, ...r]);
    setRvText(""); setRvName(""); setRvRating(0); setRvDone(true);
    showToast("Review submitted! ⭐");
    setTimeout(() => setRvDone(false), 3000);
  };

  const ov = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 500, backdropFilter: "blur(6px)" };
  const mb = { background: "linear-gradient(145deg,#1c2130,#1a1f2e)", borderRadius: "22px", padding: "26px 22px", width: "calc(100% - 40px)", maxWidth: "360px", border: "1px solid rgba(255,255,255,0.09)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", maxHeight: "88vh", overflowY: "auto" };
  const inp = { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "11px 13px", fontSize: "14px", color: "#e8eaf0", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

  return (
    <div style={{ minHeight: "100vh", background: "#0d1018", fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#e8eaf0" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: "56px", background: "rgba(13,16,24,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          </div>
          <span style={{ fontSize: "19px", fontWeight: "800", letterSpacing: "-0.5px", background: "linear-gradient(135deg,#4ecb8a,#2a8a5a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UmLinked</span>
        </div>
        <button style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "7px 10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px" }} onClick={() => setModal("menu")}>
          {[22, 22, 15].map((w, i) => <div key={i} style={{ width: w, height: 2, background: "#e8eaf0", borderRadius: 2 }} />)}
        </button>
      </nav>

      {/* ── BODY ── */}
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 16px 40px" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* PROFILE CARD */}
          <div style={{ background: "linear-gradient(145deg,#1c2130,#1a1f2e)", borderRadius: "24px", padding: "22px", marginBottom: "14px", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" alt="Thandiwe" style={{ width: "76px", height: "76px", borderRadius: "50%", objectFit: "cover", border: "3px solid #2a8a5a" }} />
                <div style={{ position: "absolute", bottom: 2, right: 2, background: "#2a8a5a", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #1a1f2e" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>Thandiwe Nkosi</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#2a8a5a"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div style={{ fontSize: "12px", color: "#7a8299", marginBottom: "4px" }}>@thandiwe</div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#9ba3b8" }}><span>🇿🇦</span><span>Johannesburg, South Africa</span></div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "16px" }}>
              <StarRating rating={parseFloat(avgRating)} size={15} />
              <span style={{ fontSize: "15px", fontWeight: "700", color: "#F5A623" }}>{avgRating}</span>
              <span style={{ fontSize: "12px", color: "#7a8299" }}>({reviews.length} reviews)</span>
            </div>

            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <button onClick={handleFollow} style={{ flex: 1, padding: "11px", borderRadius: "12px", border: "none", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: followed ? "linear-gradient(135deg,#1d6b44,#155235)" : "linear-gradient(135deg,#2a8a5a,#1e6b44)", color: "#fff", boxShadow: followed ? "none" : "0 4px 14px rgba(42,138,90,0.35)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  {followed ? <polyline points="20 6 9 17 4 12"/> : <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></>}
                </svg>
                {followed ? "Following" : "Follow"}
              </button>
              <button onClick={() => setModal("connect")} style={{ flex: 1, padding: "11px", borderRadius: "12px", fontSize: "14px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "transparent", border: "1.5px solid rgba(255,255,255,0.18)", color: "#e8eaf0" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                Connect
              </button>
            </div>

            {/* STATS — clickable */}
            <div style={{ display: "flex", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                { n: fmtN(followers), l: "Followers", action: () => setModal("followers") },
                { n: "320", l: "Following", action: () => setModal("following") },
                { n: "48", l: "Projects", action: null },
              ].map((s, i) => (
                <button key={s.l} onClick={s.action || undefined} disabled={!s.action}
                  style={{ flex: 1, background: "none", border: "none", cursor: s.action ? "pointer" : "default", padding: "8px 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none", borderRadius: "10px", transition: "background .15s" }}
                  onMouseEnter={e => { if (s.action) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >
                  <div style={{ fontSize: "17px", fontWeight: "800", color: "#fff" }}>{s.n}</div>
                  <div style={{ fontSize: "11px", color: s.action ? "#4ecb8a" : "#7a8299", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px" }}>
                    {s.l}
                    {s.action && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4ecb8a" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>}
                  </div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
              {[["⭐","Freelance Photographer"],["📍","Beauty & Fashion"]].map(([ic, tx]) => (
                <div key={tx} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "#b0b8ce" }}><span>{ic}</span><span>{tx}</span></div>
              ))}
            </div>
            <div style={{ fontSize: "13px", color: "#c0c8de", lineHeight: 1.6 }}>📷 Capturing the beauty of South Africa. Available for shoots!</div>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", background: "#12161f", borderRadius: "14px", padding: "4px", marginBottom: "14px", border: "1px solid rgba(255,255,255,0.06)" }}>
            {["portfolio","reviews","about"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "9px", borderRadius: "10px", border: "none", fontSize: "13px", fontWeight: "600", cursor: "pointer", background: activeTab === tab ? "linear-gradient(135deg,#2a8a5a,#1e6b44)" : "transparent", color: activeTab === tab ? "#fff" : "#7a8299" }}>
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* PORTFOLIO TAB */}
          {activeTab === "portfolio" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>Portfolio</span>
                <button onClick={() => showToast("Opening full portfolio…")} style={{ background: "none", border: "none", color: "#2a8a5a", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>See all →</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "7px" }}>
                {portfolio.map(p => (
                  <div key={p.id} onClick={() => setPhotoModal(p)} style={{ gridColumn: p.span === "large" ? "span 2" : p.span === "wide" ? "span 3" : "span 1", position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: p.span === "wide" ? "3/1" : "1", cursor: "pointer" }}>
                    <img src={p.src} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.5),transparent 50%)", display: "flex", alignItems: "flex-end", padding: "7px" }}>
                      <span style={{ fontSize: "10px", color: "#fff", fontWeight: "600", background: "rgba(0,0,0,0.4)", padding: "2px 7px", borderRadius: "20px" }}>{p.label}</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); handleLike(p.id); }} style={{ position: "absolute", top: "7px", right: "7px", background: likedPhotos[p.id] ? "rgba(235,80,80,0.85)" : "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill={likedPhotos[p.id] ? "white" : "none"} stroke="white" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "7px", marginTop: "12px", flexWrap: "wrap" }}>
                {[["⭐",`${reviews.length} Reviews`,null],["🚩","Report",() => setModal("report")],["✅","ID Verified",null],["✅","Work Verified",null]].map(([ic, lb, fn]) => (
                  <button key={lb} onClick={fn || (() => showToast(`${lb} tapped`))} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "5px 11px", fontSize: "11px", color: "#9ba3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>{ic} {lb}</button>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>Reviews</span>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <StarRating rating={parseFloat(avgRating)} />
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#F5A623" }}>{avgRating}</span>
                </div>
              </div>
              <div style={{ background: "rgba(42,138,90,0.07)", border: "1px solid rgba(42,138,90,0.2)", borderRadius: "16px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#4ecb8a", marginBottom: "12px" }}>✍️ Leave a Review</div>
                {rvDone ? (
                  <div style={{ textAlign: "center", padding: "14px 0", color: "#4ecb8a", fontSize: "14px", fontWeight: "600" }}>✅ Thank you for your review!</div>
                ) : (
                  <>
                    <input value={rvName} onChange={e => setRvName(e.target.value)} placeholder="Your name" style={{ ...inp, marginBottom: "9px" }} />
                    <div style={{ marginBottom: "9px" }}>
                      <div style={{ fontSize: "11px", color: "#7a8299", marginBottom: "5px" }}>Your rating</div>
                      <InteractiveStars value={rvRating} onChange={setRvRating} />
                    </div>
                    <textarea value={rvText} onChange={e => setRvText(e.target.value)} placeholder="Share your experience…" rows={3} style={{ ...inp, resize: "none", marginBottom: "9px" }} />
                    <button onClick={submitReview} style={{ width: "100%", padding: "11px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", border: "none", borderRadius: "10px", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>Submit Review</button>
                  </>
                )}
              </div>
              {reviews.map(r => (
                <div key={r.id} style={{ background: "linear-gradient(145deg,#1c2130,#1a1f2e)", borderRadius: "14px", padding: "14px", marginBottom: "9px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <img src={r.avatar} alt={r.name} style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2a8a5a" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ fontSize: "13px", fontWeight: "700", color: "#fff" }}>{r.name}</span>
                        {r.verified && <svg width="12" height="12" viewBox="0 0 24 24" fill="#2a8a5a"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <StarRating rating={r.rating} size={12} />
                        <span style={{ fontSize: "11px", color: "#7a8299" }}>{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#b0b8ce", lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div style={{ background: "linear-gradient(145deg,#1c2130,#1a1f2e)", borderRadius: "20px", padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
              {[["Full Name","Thandiwe Nkosi"],["Username","@thandiwe"],["Location","Johannesburg, ZA"],["Specialty","Beauty & Fashion"],["Experience","7+ Years"],["Equipment","Sony A7 IV, Canon R5"],["Languages","Zulu, English, Afrikaans"],["Available For","Commercial, Editorial"]].map(([l,v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: "13px" }}>
                  <span style={{ color: "#7a8299" }}>{l}</span><span style={{ color: "#e8eaf0", fontWeight: "500" }}>{v}</span>
                </div>
              ))}
              <button onClick={() => showToast("Opening booking form…")} style={{ width: "100%", marginTop: "16px", padding: "13px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>📸 Book a Shoot</button>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "linear-gradient(145deg,#111520,#0f1219)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "28px 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          </div>
          <span style={{ fontSize: "17px", fontWeight: "800", background: "linear-gradient(135deg,#4ecb8a,#2a8a5a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UmLinked</span>
          <span style={{ fontSize: "11px", color: "#3a4258" }}>by Mzansi Connect</span>
        </div>
        <div style={{ fontSize: "12px", color: "#4a5268", marginBottom: "20px" }}>Connecting South Africa's creative talent 🇿🇦</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 16px", marginBottom: "20px" }}>
          {[["🔑","Login / Sign Up",() => setModal("login")],["👤","My Profile",() => showToast("Redirecting…")],["🔍","Browse Talent",() => showToast("Opening directory…")],["📸","Post a Project",() => showToast("Opening form…")],["💬","Messages",() => showToast("Opening messages…")],["⭐","Top Rated",() => showToast("Opening top rated…")],["🏙️","Joburg Creatives",() => showToast("Loading listings…")],["🛡️","Safety Centre",() => showToast("Opening safety…")],["📋","Terms of Use",() => showToast("Opening terms…")],["🔒","Privacy Policy",() => showToast("Opening privacy…")]].map(([ic, lb, fn]) => (
            <button key={lb} onClick={fn} style={{ background: "none", border: "none", textAlign: "left", fontSize: "12px", color: "#7a8299", cursor: "pointer", padding: "6px 0", display: "flex", alignItems: "center", gap: "6px" }}>{ic} {lb}</button>
          ))}
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "4px 0 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#3a4258" }}>© 2025 UmLinked · Mzansi Connect</span>
          <span style={{ fontSize: "11px", color: "#2a8a5a", background: "rgba(42,138,90,0.1)", padding: "3px 10px", borderRadius: "20px", border: "1px solid rgba(42,138,90,0.2)" }}>🇿🇦 Made in SA</span>
        </div>
      </footer>

      {/* ══════ FOLLOWERS / FOLLOWING MODALS ══════ */}
      {modal === "followers" && (
        <PeopleModal
          title={`Followers · ${fmtN(followers)}`}
          ids={FOLLOWERS_IDS}
          onClose={() => setModal(null)}
          showToast={showToast}
          onViewProfile={(person) => { setModal(null); setViewingProfile(person); }}
        />
      )}
      {modal === "following" && (
        <PeopleModal
          title="Following · 320"
          ids={FOLLOWING_IDS}
          onClose={() => setModal(null)}
          showToast={showToast}
          onViewProfile={(person) => { setModal(null); setViewingProfile(person); }}
        />
      )}

      {/* ══════ MINI PROFILE PAGE ══════ */}
      {viewingProfile && (
        <MiniProfile
          person={viewingProfile}
          onBack={() => setViewingProfile(null)}
          showToast={showToast}
        />
      )}

      {/* ══════ HAMBURGER DRAWER ══════ */}
      {modal === "menu" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 599, backdropFilter: "blur(4px)" }} onClick={() => setModal(null)}>
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "265px", background: "linear-gradient(180deg,#161b27,#111520)", borderLeft: "1px solid rgba(255,255,255,0.08)", zIndex: 600, padding: "22px 18px", display: "flex", flexDirection: "column", gap: "4px" }} onClick={e => e.stopPropagation()}>
            <button style={{ alignSelf: "flex-end", background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", color: "#9ba3b8", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }} onClick={() => setModal(null)}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "18px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
              </div>
              <span style={{ fontSize: "18px", fontWeight: "800", background: "linear-gradient(135deg,#4ecb8a,#2a8a5a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UmLinked</span>
            </div>
            <button onClick={() => setModal("login")} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "13px 14px", marginBottom: "8px", borderRadius: "12px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", border: "none", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", width: "100%" }}>
              <span style={{ fontSize: "17px" }}>🔑</span><span>Login / Sign Up</span>
            </button>
            {[["👤","My Profile"],["🔍","Browse Talent"],["📸","Post a Project"],["💬","Messages"],["⭐","Top Rated"],["🏙️","Joburg Creatives"]].map(([ic, lb]) => (
              <button key={lb} onClick={() => { setModal(null); showToast(`Opening ${lb}…`); }} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 14px", borderRadius: "11px", border: "none", background: "transparent", color: "#c0c8de", fontSize: "13px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span style={{ fontSize: "16px" }}>{ic}</span><span>{lb}</span>
              </button>
            ))}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />
            {[["🛡️","Safety Centre"],["📋","Terms of Use"],["🔒","Privacy Policy"]].map(([ic, lb]) => (
              <button key={lb} onClick={() => { setModal(null); showToast(`Opening ${lb}…`); }} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "9px 14px", borderRadius: "10px", border: "none", background: "transparent", color: "#5a6278", fontSize: "12px", cursor: "pointer", textAlign: "left", width: "100%" }}>
                <span>{ic}</span><span>{lb}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══════ CONNECT MODAL ══════ */}
      {modal === "connect" && (
        <div style={ov} onClick={() => setModal(null)}>
          <div style={mb} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: "#fff", marginBottom: "2px" }}>Connect with Thandiwe</div>
                <div style={{ fontSize: "12px", color: "#7a8299" }}>Choose a platform to reach out</div>
              </div>
              <button onClick={() => setModal(null)} style={{ background: "rgba(255,255,255,0.07)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "#7a8299", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "11px", background: "rgba(255,255,255,0.04)", borderRadius: "13px", padding: "12px 14px", marginBottom: "18px", border: "1px solid rgba(255,255,255,0.07)" }}>
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" alt="Thandiwe" style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2a8a5a" }} />
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff" }}>Thandiwe Nkosi</div>
                <div style={{ fontSize: "11px", color: "#7a8299" }}>Freelance Photographer · 🇿🇦 Joburg</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "16px" }}>
              {SOCIAL_LINKS.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "13px", padding: "13px 15px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
                    <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: link.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{link.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{link.label}</div>
                      <div style={{ fontSize: "12px", color: "#7a8299" }}>{link.handle}</div>
                    </div>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={link.color} strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </div>
                </a>
              ))}
            </div>
            <button onClick={() => setModal(null)} style={{ width: "100%", padding: "11px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "11px", color: "#9ba3b8", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}

      {/* ══════ PHOTO MODAL ══════ */}
      {photoModal && (
        <div style={ov} onClick={() => setPhotoModal(null)}>
          <div style={{ ...mb, padding: 0, overflow: "hidden" }} onClick={e => e.stopPropagation()}>
            <img src={photoModal.src} alt={photoModal.label} style={{ width: "100%", display: "block" }} />
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff", marginBottom: "11px" }}>{photoModal.label}</div>
              <div style={{ display: "flex", gap: "8px" }}>
                {[["❤️", likedPhotos[photoModal.id] ? "Liked" : "Like", () => handleLike(photoModal.id)], ["🔖", savedPhotos[photoModal.id] ? "Saved" : "Save", () => handleSave(photoModal.id)], ["🔗","Share", () => { showToast("Link copied!"); setPhotoModal(null); }]].map(([ic, lb, fn]) => (
                  <button key={lb} onClick={fn} style={{ flex: 1, padding: "9px 5px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9px", color: "#e8eaf0", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>{ic} {lb}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════ REPORT ══════ */}
      {modal === "report" && (
        <div style={ov} onClick={() => setModal(null)}>
          <div style={mb} onClick={e => e.stopPropagation()}>
            {!reportDone ? (
              <>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>Report Profile</div>
                <div style={{ fontSize: "12px", color: "#7a8299", marginBottom: "16px" }}>Why are you reporting this profile?</div>
                {["Fake or spam account","Inappropriate content","Misleading information","Harassment"].map(r => (
                  <button key={r} onClick={handleReport} style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 13px", marginBottom: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#c0c8de", fontSize: "13px", cursor: "pointer" }}>{r}</button>
                ))}
                <button onClick={() => setModal(null)} style={{ display: "block", width: "100%", padding: "10px", background: "none", border: "none", color: "#7a8299", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>✅</div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#fff" }}>Report Submitted</div>
                <div style={{ fontSize: "12px", color: "#7a8299", marginTop: "5px" }}>Thank you for keeping our community safe.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════ LOGIN ══════ */}
      {modal === "login" && (
        <div style={ov} onClick={() => setModal(null)}>
          <div style={mb} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", marginBottom: "4px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                </div>
                <span style={{ fontSize: "20px", fontWeight: "800", background: "linear-gradient(135deg,#4ecb8a,#2a8a5a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UmLinked</span>
              </div>
              <div style={{ fontSize: "12px", color: "#7a8299" }}>Sign in to your account</div>
            </div>
            <div style={{ marginBottom: "11px" }}>
              <div style={{ fontSize: "11px", color: "#7a8299", marginBottom: "5px" }}>Email address</div>
              <input value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="you@example.com" type="email" style={inp} />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "11px", color: "#7a8299", marginBottom: "5px" }}>Password</div>
              <input value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="••••••••" type="password" style={inp} />
            </div>
            <button onClick={() => { if (!loginEmail || !loginPass) { showToast("Please fill in all fields"); return; } setModal(null); showToast("Welcome back! 👋"); }} style={{ width: "100%", padding: "13px", background: "linear-gradient(135deg,#2a8a5a,#1e6b44)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", marginBottom: "11px" }}>Sign In</button>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              {[["Create Account",() => { setModal(null); showToast("Redirecting to signup…"); }],["Forgot Password",() => { setModal(null); showToast("Reset email sent!"); }]].map(([lb, fn]) => (
                <button key={lb} onClick={fn} style={{ flex: 1, padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#9ba3b8", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>{lb}</button>
              ))}
            </div>
            <button onClick={() => setModal(null)} style={{ display: "block", width: "100%", padding: "9px", background: "none", border: "none", color: "#5a6278", fontSize: "12px", cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "#2a8a5a", color: "#fff", padding: "10px 22px", borderRadius: "30px", fontSize: "13px", fontWeight: "600", zIndex: 999, boxShadow: "0 4px 20px rgba(42,138,90,0.4)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          {toast}
        </div>
      )}
    </div>
  );
    }

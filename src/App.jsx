import { useState, useEffect, useRef, useMemo } from "react";

/* ─── FONTS + MATERIAL ICONS ─── */
if (typeof document !== "undefined" && !document.getElementById("umlinked-fonts")) {
  const l = document.createElement("link"); l.id = "umlinked-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
}
if (typeof document !== "undefined" && !document.getElementById("material-icons")) {
  const l = document.createElement("link"); l.id = "material-icons"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
  document.head.appendChild(l);
}

/* ─── MI ─── */
const MI = ({ name, size = 20, color = "currentColor", style = {} }) => (
  <span className="material-icons-round" style={{ fontSize: size, color, lineHeight: 1, display: "inline-flex", alignItems: "center", userSelect: "none", flexShrink: 0, ...style }}>{name}</span>
);

/* ─── LAZY AVATAR ─── */
function LazyAvatar({ src, alt, size, border, borderRadius = "50%", style: extraStyle = {} }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { rootMargin: "120px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: size, height: size, borderRadius, border, background: "rgba(120,130,160,0.12)", flexShrink: 0, position: "relative", overflow: "hidden", ...extraStyle }}>
      {!loaded && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 16, height: 16, border: "2px solid rgba(42,138,90,0.2)", borderTopColor: "#2a8a5a", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /></div>}
      {visible && <img src={src} alt={alt || ""} onLoad={() => setLoaded(true)} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }} />}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ─── LAZY IMG ─── */
function LazyImg({ src, alt, style: s = {}, onError }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { rootMargin: "120px" });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ ...s, position: "relative", overflow: "hidden", background: "rgba(120,130,160,0.1)" }}>
      {!loaded && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 22, height: 22, border: "2px solid rgba(42,138,90,0.2)", borderTopColor: "#2a8a5a", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /></div>}
      {visible && <img src={src} alt={alt || ""} onLoad={() => setLoaded(true)} onError={onError} style={{ ...s, position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }} />}
    </div>
  );
}

/* ─── THEME ─── */
function makeTheme(dark) {
  return {
    dark,
    bodyBg:      dark ? "#0d1018"  : "#f4f6fb",
    cardBg:      dark ? "linear-gradient(145deg,#1c2130,#1a1f2e)" : "#ffffff",
    cardShadow:  dark ? "0 4px 32px rgba(0,0,0,0.45)" : "0 2px 20px rgba(30,40,80,0.08)",
    cardBorder:  dark ? "rgba(255,255,255,0.06)" : "rgba(200,210,235,0.6)",
    navBg:       dark ? "rgba(13,16,24,0.97)"   : "rgba(255,255,255,0.97)",
    navBorder:   dark ? "rgba(255,255,255,0.07)" : "rgba(200,210,235,0.7)",
    text:        dark ? "#e8eaf0"  : "#1a1d2e",
    subText:     dark ? "#9ba3b8"  : "#5c647e",
    mutedText:   dark ? "#5a6278"  : "#9ba3c0",
    inputBg:     dark ? "rgba(255,255,255,0.05)" : "#f0f3fc",
    inputBorder: dark ? "rgba(255,255,255,0.1)"  : "#d4daf0",
    divider:     dark ? "rgba(255,255,255,0.07)" : "rgba(200,210,235,0.6)",
    hoverBg:     dark ? "rgba(255,255,255,0.04)" : "rgba(42,138,90,0.04)",
    linkCard:    dark ? "linear-gradient(145deg,#1c2130,#1a1f2e)" : "#ffffff",
    linkCardHov: dark ? "linear-gradient(145deg,#1e2436,#1c2133)" : "#f7f9ff",
    linkBorder:  dark ? "rgba(255,255,255,0.07)" : "rgba(200,210,235,0.5)",
    drawerBg:    dark ? "linear-gradient(180deg,#161b27,#111520)" : "#ffffff",
    drawerBorder:dark ? "rgba(255,255,255,0.08)" : "rgba(200,210,235,0.8)",
    footerBg:    dark ? "linear-gradient(145deg,#111520,#0f1219)" : "#eef1fa",
    footerBorder:dark ? "rgba(255,255,255,0.06)" : "rgba(200,210,235,0.7)",
    modalBg:     dark ? "linear-gradient(160deg,#1e2538,#181d2b)" : "#ffffff",
    handleBar:   dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)",
    white:       dark ? "#ffffff"  : "#1a1d2e",
    green:       "#2a8a5a",
    tagBg:       dark ? "rgba(42,138,90,0.12)" : "rgba(42,138,90,0.08)",
    tagBorder:   "rgba(42,138,90,0.28)",
    kebabBg:     dark ? "linear-gradient(145deg,#1e2538,#191e2c)" : "#ffffff",
    sectionBg:   dark ? "rgba(255,255,255,0.03)" : "#f7f9ff",
    emptyBorder: dark ? "rgba(255,255,255,0.1)"  : "rgba(200,210,235,0.7)",
  };
}

/* ─── DATA ─── */
const INDUSTRY_CATEGORIES = [
  "Photography","Videography","Modeling","Fashion Design","Makeup & Beauty","Styling",
  "Art Direction","Content Creation","Music & Entertainment","Acting & Performance",
  "Graphic Design","Illustration","Brand Strategy","Event Management","Hair & Beauty",
  "Fitness & Wellness","Interior Design","Architecture","Journalism & Media",
  "Film & Production","Dance & Choreography","Voice & Narration","Digital Marketing","Other",
];

const PEOPLE = [
  { id:1,  name:"Zinhle Dube",      handle:"@zinhle_d",      avatar:"https://picsum.photos/seed/zinhle1/200/200",   role:"Model",             industry:"Modeling",          location:"Cape Town, ZA",    bio:"Fashion & commercial model. Lover of art, culture and the African sun.",         followers:8400,    following:210, projects:22,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/z1a/300/300","https://picsum.photos/seed/z1b/300/300","https://picsum.photos/seed/z1c/300/300","https://picsum.photos/seed/z1d/300/300"] },
  { id:2,  name:"Kagiso Sithole",   handle:"@kagiso_s",      avatar:"https://picsum.photos/seed/kagiso2/200/200",   role:"Fashion Designer",  industry:"Fashion Design",    location:"Durban, ZA",       bio:"Designing bold African fashion for the modern world. Streetwear meets heritage.",  followers:3200,    following:180, projects:15,  verified:false, isFollowing:false, portfolio:["https://picsum.photos/seed/k2a/300/300","https://picsum.photos/seed/k2b/300/300","https://picsum.photos/seed/k2c/300/300","https://picsum.photos/seed/k2d/300/300"] },
  { id:3,  name:"Naledi Mokoena",   handle:"@naledi.m",      avatar:"https://picsum.photos/seed/naledi3/200/200",   role:"Makeup Artist",     industry:"Makeup & Beauty",   location:"Pretoria, ZA",     bio:"Bridal, editorial & SFX makeup. Over 200 happy clients.",                         followers:12100,   following:304, projects:67,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/n3a/300/300","https://picsum.photos/seed/n3b/300/300","https://picsum.photos/seed/n3c/300/300","https://picsum.photos/seed/n3d/300/300"] },
  { id:4,  name:"Bongani Khumalo",  handle:"@bongani_k",     avatar:"https://picsum.photos/seed/bongani4/200/200",  role:"Videographer",      industry:"Videography",       location:"Johannesburg, ZA", bio:"Cinematic storytelling for brands, events & music videos.",                      followers:5700,    following:260, projects:34,  verified:false, isFollowing:false, portfolio:["https://picsum.photos/seed/b4a/300/300","https://picsum.photos/seed/b4b/300/300","https://picsum.photos/seed/b4c/300/300","https://picsum.photos/seed/b4d/300/300"] },
  { id:5,  name:"Lerato Ntuli",     handle:"@lerato.ntuli",  avatar:"https://picsum.photos/seed/lerato5/200/200",   role:"Stylist",           industry:"Styling",           location:"Sandton, ZA",      bio:"Celebrity stylist. Fashion week veteran.",                                        followers:9300,    following:190, projects:44,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/l5a/300/300","https://picsum.photos/seed/l5b/300/300","https://picsum.photos/seed/l5c/300/300","https://picsum.photos/seed/l5d/300/300"] },
  { id:6,  name:"Sipho Nkosi",      handle:"@sipho_n",       avatar:"https://picsum.photos/seed/sipho6/200/200",    role:"Art Director",      industry:"Art Direction",     location:"Cape Town, ZA",    bio:"Creative direction for lifestyle brands.",                                        followers:4100,    following:142, projects:19,  verified:false, isFollowing:false, portfolio:["https://picsum.photos/seed/s6a/300/300","https://picsum.photos/seed/s6b/300/300","https://picsum.photos/seed/s6c/300/300","https://picsum.photos/seed/s6d/300/300"] },
  { id:7,  name:"Ayanda Mthembu",   handle:"@ayanda.m",      avatar:"https://picsum.photos/seed/ayanda7/200/200",   role:"Content Creator",   industry:"Content Creation",  location:"Durban, ZA",       bio:"Travel & lifestyle content. Exploring Africa one post at a time 🌍",              followers:31000,   following:520, projects:88,  verified:true,  isFollowing:false, portfolio:["https://picsum.photos/seed/a7a/300/300","https://picsum.photos/seed/a7b/300/300","https://picsum.photos/seed/a7c/300/300","https://picsum.photos/seed/a7d/300/300"] },
  { id:8,  name:"Thabo Dlamini",    handle:"@thabo_d",       avatar:"https://picsum.photos/seed/thabo8/200/200",    role:"Photographer",      industry:"Photography",       location:"Pretoria, ZA",     bio:"Documentary & street photographer. Telling South Africa's untold stories.",       followers:7200,    following:388, projects:29,  verified:false, isFollowing:true,  portfolio:["https://picsum.photos/seed/t8a/300/300","https://picsum.photos/seed/t8b/300/300","https://picsum.photos/seed/t8c/300/300","https://picsum.photos/seed/t8d/300/300"] },
  { id:9,  name:"Minnie Dlamini",   handle:"@minniedlamini", avatar:"https://picsum.photos/seed/minnie9/200/200",   role:"TV Presenter",      industry:"Acting & Performance",location:"Johannesburg, ZA", bio:"TV presenter, actress & entrepreneur. Living my best life. ✨",                followers:2100000, following:890, projects:120, verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/m9a/300/300","https://picsum.photos/seed/m9b/300/300","https://picsum.photos/seed/m9c/300/300","https://picsum.photos/seed/m9d/300/300"] },
  { id:10, name:"Trevor Noah",      handle:"@trevornoah",    avatar:"https://picsum.photos/seed/trevor10/200/200",  role:"Comedian",          industry:"Acting & Performance",location:"New York / SA",    bio:"Comedian, author. Proudly South African 🇿🇦",                                   followers:8900000, following:420, projects:55,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/tr10a/300/300","https://picsum.photos/seed/tr10b/300/300","https://picsum.photos/seed/tr10c/300/300","https://picsum.photos/seed/tr10d/300/300"] },
  { id:11, name:"Nomzamo Mbatha",   handle:"@nomzamo_m",     avatar:"https://picsum.photos/seed/nomzamo11/200/200", role:"Actress",           industry:"Acting & Performance",location:"Los Angeles / SA", bio:"Actress, humanitarian & UNHCR Goodwill Ambassador. 🌍",                           followers:3400000, following:660, projects:78,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/no11a/300/300","https://picsum.photos/seed/no11b/300/300","https://picsum.photos/seed/no11c/300/300","https://picsum.photos/seed/no11d/300/300"] },
  { id:12, name:"DJ Zinhle",        handle:"@djzinhle",      avatar:"https://picsum.photos/seed/djzinhle12/200/200",role:"DJ & Entrepreneur", industry:"Music & Entertainment",location:"Johannesburg, ZA", bio:"Award-winning DJ, entrepreneur & mother. Era by DJ Zinhle. 🎧",                followers:4200000, following:730, projects:96,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/dj12a/300/300","https://picsum.photos/seed/dj12b/300/300","https://picsum.photos/seed/dj12c/300/300","https://picsum.photos/seed/dj12d/300/300"] },
  { id:13, name:"Riky Rick Studio", handle:"@rikyrickworld", avatar:"https://picsum.photos/seed/riky13/200/200",    role:"Creative Studio",   industry:"Brand Strategy",    location:"Johannesburg, ZA", bio:"A creative collective honouring Riky Rick's legacy.",                             followers:980000,  following:310, projects:44,  verified:false, isFollowing:true,  portfolio:["https://picsum.photos/seed/rk13a/300/300","https://picsum.photos/seed/rk13b/300/300","https://picsum.photos/seed/rk13c/300/300","https://picsum.photos/seed/rk13d/300/300"] },
  { id:14, name:"Sho Madjozi",      handle:"@shomadjozi",    avatar:"https://picsum.photos/seed/sho14/200/200",     role:"Musician",          industry:"Music & Entertainment",location:"Johannesburg, ZA", bio:"BET Award winner. Tsonga girl changing the world through music 🎶",              followers:1700000, following:480, projects:62,  verified:true,  isFollowing:true,  portfolio:["https://picsum.photos/seed/sh14a/300/300","https://picsum.photos/seed/sh14b/300/300","https://picsum.photos/seed/sh14c/300/300","https://picsum.photos/seed/sh14d/300/300"] },
];
const FOLLOWERS_IDS = [1,2,3,4,5,6,7,8];
const FOLLOWING_IDS = [9,10,11,12,13,14];

const PLATFORM_PRESETS = [
  { id:"instagram", label:"Instagram",   placeholder:"@yourhandle",           color:"#E1306C", gradient:"linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", baseUrl:"https://instagram.com/",   icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { id:"tiktok",    label:"TikTok",      placeholder:"@yourhandle",           color:"#69C9D0", gradient:"linear-gradient(135deg,#010101,#69C9D0)",                          baseUrl:"https://tiktok.com/@",     icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg> },
  { id:"whatsapp",  label:"WhatsApp",    placeholder:"+27 81 234 5678",       color:"#25D366", gradient:"linear-gradient(135deg,#128C7E,#25D366)",                          baseUrl:"https://wa.me/",           icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { id:"twitter",   label:"X / Twitter", placeholder:"@yourhandle",           color:"#1DA1F2", gradient:"linear-gradient(135deg,#000,#1DA1F2)",                             baseUrl:"https://x.com/",           icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { id:"facebook",  label:"Facebook",    placeholder:"facebook.com/yourpage", color:"#1877F2", gradient:"linear-gradient(135deg,#1877F2,#0a58ca)",                          baseUrl:"https://facebook.com/",    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { id:"linkedin",  label:"LinkedIn",    placeholder:"linkedin.com/in/you",   color:"#0A66C2", gradient:"linear-gradient(135deg,#0A66C2,#004182)",                          baseUrl:"https://linkedin.com/in/", icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { id:"youtube",   label:"YouTube",     placeholder:"@yourchannel",          color:"#FF0000", gradient:"linear-gradient(135deg,#c4302b,#FF0000)",                          baseUrl:"https://youtube.com/@",    icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { id:"website",   label:"Website",     placeholder:"https://yoursite.com",  color:"#6366f1", gradient:"linear-gradient(135deg,#6366f1,#4338ca)",                          baseUrl:"",                         icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
  { id:"custom",    label:"Custom Link", placeholder:"https://...",           color:"#8b5cf6", gradient:"linear-gradient(135deg,#7c3aed,#8b5cf6)",                          baseUrl:"",                         icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg> },
];

const INITIAL_LINKS = [
  { uid:"l1", platformId:"instagram", label:"Instagram", handle:"@thandiwe_captures", url:"https://instagram.com/thandiwe_captures" },
  { uid:"l2", platformId:"tiktok",    label:"TikTok",    handle:"@thandiwe.nkosi",    url:"https://tiktok.com/@thandiwe.nkosi" },
  { uid:"l3", platformId:"whatsapp",  label:"WhatsApp",  handle:"+27 81 234 5678",    url:"https://wa.me/27812345678" },
];

const fmtN = n => n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1000 ? (n/1000).toFixed(1)+"k" : String(n);
const getPlatform = id => PLATFORM_PRESETS.find(p => p.id === id) || PLATFORM_PRESETS[PLATFORM_PRESETS.length - 1];

/* ─── LOGO ─── */
const Logo = () => (
  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
    <div style={{ width:"28px", height:"28px", borderRadius:"8px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
    </div>
    <span style={{ fontSize:"19px", fontWeight:"800", letterSpacing:"-0.5px", background:"linear-gradient(135deg,#2a8a5a,#1a6640)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>UmLinked</span>
  </div>
);

/* ─── AUTH GATE MODAL ─── */
function AuthGateModal({ reason, onClose, onGoLogin, T }) {
  const msgs = {
    follow:    { icon:"person_add", title:"Sign in to follow", body:"Create an account or sign in to follow creators and build your network." },
    message:   { icon:"chat_bubble_outline", title:"Sign in to send messages", body:"You need an account to message creators directly." },
    followers: { icon:"group", title:"Sign in to view followers", body:"Sign in to see who follows this creator." },
    following: { icon:"group", title:"Sign in to view following", body:"Sign in to see who this creator follows." },
  };
  const m = msgs[reason] || msgs.follow;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:900, backdropFilter:"blur(6px)", padding:"20px" }} onClick={onClose}>
      <div style={{ background:T.modalBg, borderRadius:"22px", padding:"28px 24px", width:"100%", maxWidth:"340px", border:`1px solid ${T.cardBorder}`, boxShadow:"0 24px 60px rgba(0,0,0,0.3)", textAlign:"center" }} onClick={e=>e.stopPropagation()}>
        <div style={{ width:"56px", height:"56px", borderRadius:"16px", background:T.tagBg, border:`1px solid ${T.tagBorder}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <MI name={m.icon} size={28} color="#2a8a5a" />
        </div>
        <div style={{ fontSize:"17px", fontWeight:"800", color:T.white, marginBottom:"8px" }}>{m.title}</div>
        <div style={{ fontSize:"13px", color:T.subText, lineHeight:1.6, marginBottom:"22px" }}>{m.body}</div>
        <button onClick={onGoLogin} style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer", marginBottom:"10px", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", boxShadow:"0 4px 14px rgba(42,138,90,0.3)" }}>
          <MI name="login" size={17} color="#fff" /> Sign In / Create Account
        </button>
        <button onClick={onClose} style={{ width:"100%", padding:"10px", background:"none", border:`1px solid ${T.inputBorder}`, borderRadius:"12px", color:T.subText, fontSize:"13px", fontWeight:"600", cursor:"pointer" }}>Maybe later</button>
      </div>
    </div>
  );
}

/* ─── MINI PROFILE (viewer of other people's profiles) ─── */
function MiniProfile({ person, onBack, onAuthGate, isLoggedIn, T }) {
  const [isFollowing, setIsFollowing] = useState(person.isFollowing);
  const [followerCount, setFollowerCount] = useState(person.followers);
  const [activeTab, setActiveTab] = useState("links");
  const baseLikes = person.portfolio.map((_,i) => 200 + (person.id*37 + i*113) % 900);
  const [likedPhotos, setLikedPhotos] = useState({});
  const subLinks = [
    { uid:"s1", platformId:"instagram", label:"Instagram", handle:`@${person.handle.replace("@","")}`, url:`https://instagram.com/${person.handle.replace("@","")}` },
    { uid:"s2", platformId:"whatsapp",  label:"WhatsApp",  handle:"+27 80 000 0000", url:"https://wa.me/27800000000" },
  ];
  const toggleFollow = () => {
    if (!isLoggedIn) { onAuthGate("follow"); return; }
    const next = !isFollowing; setIsFollowing(next); setFollowerCount(n => next ? n+1 : n-1);
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:700, background:T.bodyBg, overflowY:"auto", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:T.text }}>
      <div style={{ position:"sticky", top:0, zIndex:10, display:"flex", alignItems:"center", gap:"12px", padding:"14px 18px", background:T.navBg, backdropFilter:"blur(16px)", borderBottom:`1px solid ${T.navBorder}` }}>
        <button onClick={onBack} style={{ background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"50%", width:"34px", height:"34px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:T.text }}>
          <MI name="arrow_back" size={18} />
        </button>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:"15px", fontWeight:"800", color:T.white, fontFamily:"'Playfair Display',Georgia,serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{person.name}</div>
          <div style={{ fontSize:"11px", color:T.subText }}>{person.handle}</div>
        </div>
        {person.verified && <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#2a8a5a", flexShrink:0 }} />}
      </div>

      <div style={{ padding:"20px 16px 60px", maxWidth:"480px", margin:"0 auto" }}>
        {/* Card */}
        <div style={{ background:T.cardBg, borderRadius:"22px", padding:"22px", marginBottom:"14px", border:`1px solid ${T.cardBorder}`, boxShadow:T.cardShadow }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:"16px", marginBottom:"14px" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <LazyAvatar src={person.avatar} alt={person.name} size={72} border="3px solid #2a8a5a" />
              {person.verified && <div style={{ position:"absolute", bottom:2, right:2, background:"#2a8a5a", borderRadius:"50%", width:"18px", height:"18px", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${T.dark?"#1a1f2e":"#fff"}` }}><MI name="check" size={11} color="white" /></div>}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"2px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"17px", fontWeight:"800", color:T.white, fontFamily:"'Playfair Display',Georgia,serif" }}>{person.name}</span>
                {person.verified && <MI name="verified" size={16} color="#2a8a5a" />}
              </div>
              <div style={{ fontSize:"12px", color:T.subText, marginBottom:"3px" }}>{person.handle}</div>
              <div style={{ fontSize:"11px", color:T.subText, display:"flex", alignItems:"center", gap:"3px" }}><MI name="location_on" size={13} color={T.subText} />{person.location}</div>
              <div style={{ marginTop:"6px", display:"inline-flex", alignItems:"center", gap:"5px", background:T.tagBg, border:`1px solid ${T.tagBorder}`, borderRadius:"20px", padding:"3px 10px" }}>
                <MI name="business_center" size={12} color="#2a8a5a" />
                <span style={{ fontSize:"11px", color:"#2a8a5a", fontWeight:"600" }}>{person.industry||person.role}</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize:"13px", color:T.subText, lineHeight:1.6, margin:"0 0 16px" }}>{person.bio}</p>

          {/* Action buttons */}
          <div style={{ display:"flex", gap:"10px", marginBottom:"16px" }}>
            <button onClick={toggleFollow} style={{ flex:1, padding:"11px", borderRadius:"12px", border: isFollowing ? `1.5px solid ${T.inputBorder}` : "none", fontSize:"13px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", background:isFollowing?"transparent":"linear-gradient(135deg,#2a8a5a,#1e6b44)", color:isFollowing?T.subText:"#fff", boxShadow:isFollowing?"none":"0 4px 14px rgba(42,138,90,0.3)" }}>
              <MI name={isFollowing?"how_to_reg":"person_add"} size={16} color={isFollowing?T.subText:"#fff"} />
              {isFollowing ? "Following" : "Follow"}
            </button>
            <a href={`mailto:${person.handle.replace("@","")}@example.com`}
              onClick={e=>{ if(!isLoggedIn){ e.preventDefault(); onAuthGate("message"); } }}
              style={{ flex:1, padding:"11px", borderRadius:"12px", fontSize:"13px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", background:"transparent", border:`1.5px solid ${T.inputBorder}`, color:T.text, textDecoration:"none" }}>
              <MI name="mail_outline" size={16} color={T.text} /> Message
            </a>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", paddingTop:"14px", borderTop:`1px solid ${T.divider}` }}>
            {[{n:fmtN(followerCount),l:"Followers",gate:"followers"},{n:fmtN(person.following),l:"Following",gate:"following"},{n:String(person.projects),l:"Projects",gate:null}].map((s,i)=>(
              <button key={s.l} onClick={()=>{ if(s.gate && !isLoggedIn){ onAuthGate(s.gate); } }} disabled={!s.gate}
                style={{ flex:1, background:"none", border:"none", cursor:s.gate?"pointer":"default", padding:"8px 0", borderRight:i<2?`1px solid ${T.divider}`:"none", borderRadius:"8px" }}>
                <div style={{ fontSize:"16px", fontWeight:"800", color:T.white }}>{s.n}</div>
                <div style={{ fontSize:"11px", color:s.gate?"#2a8a5a":T.subText, display:"flex", alignItems:"center", justifyContent:"center", gap:"2px" }}>
                  {s.l}{s.gate&&<MI name="arrow_forward" size={11} color="#2a8a5a" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", background:T.cardBg, borderRadius:"14px", padding:"4px", marginBottom:"14px", border:`1px solid ${T.cardBorder}` }}>
          {["links","portfolio","about"].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ flex:1, padding:"9px", borderRadius:"10px", border:"none", fontSize:"12px", fontWeight:"600", cursor:"pointer", background:activeTab===tab?"linear-gradient(135deg,#2a8a5a,#1e6b44)":"transparent", color:activeTab===tab?"#fff":T.subText }}>
              {tab[0].toUpperCase()+tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Links tab — all direct <a href>, no modal */}
        {activeTab==="links" && (
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {subLinks.map(link=>{
              const plat=getPlatform(link.platformId);
              return (
                <a key={link.uid} href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"block" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"14px", padding:"16px 18px", borderRadius:"16px", background:T.linkCard, border:`1px solid ${T.linkBorder}`, boxShadow:T.dark?"none":"0 1px 8px rgba(30,40,80,0.06)" }}>
                    <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:plat.gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0, boxShadow:`0 4px 16px ${plat.color}40` }}>{plat.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"15px", fontWeight:"700", color:T.white }}>{link.label}</div>
                      <div style={{ fontSize:"12px", color:T.subText, marginTop:"1px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{link.handle}</div>
                    </div>
                    <MI name="arrow_forward" size={18} color={plat.color} />
                  </div>
                </a>
              );
            })}
            {!isLoggedIn && (
              <div style={{ textAlign:"center", padding:"12px", background:T.sectionBg, borderRadius:"12px", border:`1px solid ${T.cardBorder}` }}>
                <div style={{ fontSize:"12px", color:T.subText }}>Sign in to see all social links and contact details</div>
              </div>
            )}
          </div>
        )}

        {/* Portfolio tab */}
        {activeTab==="portfolio" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
            {person.portfolio.map((src,i)=>{
              const liked=!!likedPhotos[i];
              const count=200+(person.id*37+i*113)%900+(liked?1:0);
              return (
                <div key={i} style={{ position:"relative", borderRadius:"14px", overflow:"hidden", height:"150px" }}>
                  <LazyImg src={src} alt="" style={{ width:"100%", height:"150px", borderRadius:"14px" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.65),transparent 55%)", display:"flex", alignItems:"flex-end", justifyContent:"flex-end", padding:"7px 8px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"3px", background:"rgba(0,0,0,0.45)", borderRadius:"20px", padding:"3px 8px", backdropFilter:"blur(4px)" }}>
                      <MI name="favorite" size={11} color={liked?"#ff5a7e":"rgba(255,255,255,0.85)"} />
                      <span style={{ fontSize:"10px", color:"#fff", fontWeight:"700" }}>{count>=1000?(count/1000).toFixed(1)+"k":count}</span>
                    </div>
                  </div>
                  <button onClick={()=>setLikedPhotos(p=>({...p,[i]:!p[i]}))} style={{ position:"absolute", top:"7px", right:"7px", background:liked?"rgba(225,50,70,0.88)":"rgba(0,0,0,0.45)", border:"none", borderRadius:"50%", width:"28px", height:"28px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", backdropFilter:"blur(4px)" }}>
                    <MI name={liked?"favorite":"favorite_border"} size={14} color="white" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* About tab */}
        {activeTab==="about" && (
          <div style={{ background:T.cardBg, borderRadius:"20px", padding:"20px", border:`1px solid ${T.cardBorder}` }}>
            {[["Name",person.name],["Handle",person.handle],["Role",person.role],["Industry",person.industry||"—"],["Location",person.location],["Projects",`${person.projects} completed`],["Verified",person.verified?"Verified":"Not yet"]].map(([l,v])=>(
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${T.divider}`, fontSize:"13px" }}>
                <span style={{ color:T.subText }}>{l}</span><span style={{ color:T.white, fontWeight:"500" }}>{v}</span>
              </div>
            ))}
            <button onClick={()=>{ if(!isLoggedIn){ onAuthGate("message"); return; } }} style={{ width:"100%", marginTop:"16px", padding:"13px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
              <MI name="handshake" size={18} color="#fff" /> Request Collaboration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── SEARCH PAGE ─── */
function SearchPage({ onViewProfile, onGoLogin, T }) {
  const [query, setQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const industries = useMemo(() => ["All", ...Array.from(new Set(PEOPLE.map(p => p.industry)))], []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PEOPLE.filter(p => {
      const matchesQ = !q ||
        p.name.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        (p.industry||"").toLowerCase().includes(q);
      const matchesI = industryFilter === "All" || p.industry === industryFilter;
      return matchesQ && matchesI;
    });
  }, [query, industryFilter]);

  return (
    <div style={{ padding:"20px 16px 60px", maxWidth:"480px", margin:"0 auto" }}>
      {/* Hero */}
      <div style={{ textAlign:"center", padding:"24px 0 20px" }}>
        <div style={{ fontSize:"24px", fontWeight:"900", color:T.white, fontFamily:"'Playfair Display',Georgia,serif", marginBottom:"6px" }}>Discover SA Talent</div>
        <div style={{ fontSize:"13px", color:T.subText }}>Search photographers, models, artists & more</div>
      </div>

      {/* Search bar */}
      <div style={{ position:"relative", marginBottom:"16px" }}>
        <MI name="search" size={20} color={T.subText} style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)" }} />
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, handle, role or industry…"
          style={{ width:"100%", background:T.cardBg, border:`1.5px solid ${query?T.green:T.inputBorder}`, borderRadius:"16px", padding:"14px 14px 14px 44px", fontSize:"14px", color:T.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit", boxShadow:T.cardShadow, transition:"border-color .15s" }} />
        {query && <button onClick={()=>setQuery("")} style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer" }}><MI name="close" size={18} color={T.subText} /></button>}
      </div>

      {/* Industry filter pills — scrollable */}
      <div style={{ display:"flex", gap:"8px", overflowX:"auto", paddingBottom:"4px", marginBottom:"18px", scrollbarWidth:"none" }}>
        {industries.map(ind => (
          <button key={ind} onClick={()=>setIndustryFilter(ind)}
            style={{ padding:"6px 14px", borderRadius:"20px", border:"none", fontSize:"12px", fontWeight:"600", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0,
              background: industryFilter===ind ? "linear-gradient(135deg,#2a8a5a,#1e6b44)" : T.inputBg,
              color: industryFilter===ind ? "#fff" : T.subText,
              boxShadow: industryFilter===ind ? "0 2px 10px rgba(42,138,90,0.3)" : "none",
            }}>
            {ind}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ fontSize:"12px", color:T.mutedText, marginBottom:"12px" }}>
        {results.length} creator{results.length!==1?"s":""}{query||industryFilter!=="All"?" found":""} · sign in to follow
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div style={{ textAlign:"center", padding:"40px 20px", background:T.cardBg, borderRadius:"20px", border:`1px solid ${T.cardBorder}` }}>
          <MI name="search_off" size={36} color={T.mutedText} style={{ marginBottom:"10px", display:"block" }} />
          <div style={{ fontSize:"15px", fontWeight:"700", color:T.subText, marginBottom:"4px" }}>No results found</div>
          <div style={{ fontSize:"12px", color:T.mutedText }}>Try a different name, handle, or industry</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {results.map(person => (
            <div key={person.id} onClick={()=>onViewProfile(person)}
              style={{ display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px", borderRadius:"18px", background:T.cardBg, border:`1px solid ${T.cardBorder}`, cursor:"pointer", boxShadow:T.cardShadow, transition:"transform .1s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="none"}>
              <div style={{ position:"relative", flexShrink:0 }}>
                <LazyAvatar src={person.avatar} alt={person.name} size={52} border="2.5px solid rgba(42,138,90,0.5)" />
                {person.verified && <div style={{ position:"absolute", bottom:0, right:0, background:"#2a8a5a", borderRadius:"50%", width:"17px", height:"17px", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${T.dark?"#1a1f2e":"#fff"}` }}><MI name="check" size={9} color="white" /></div>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"2px" }}>
                  <div style={{ fontSize:"14px", fontWeight:"800", color:T.white, fontFamily:"'Playfair Display',Georgia,serif", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{person.name}</div>
                  {person.verified && <MI name="verified" size={14} color="#2a8a5a" />}
                </div>
                <div style={{ fontSize:"12px", color:T.subText, marginBottom:"4px" }}>{person.handle} · {fmtN(person.followers)} followers</div>
                <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <span style={{ fontSize:"11px", color:"#2a8a5a", background:T.tagBg, padding:"2px 8px", borderRadius:"10px", border:`1px solid ${T.tagBorder}`, fontWeight:"600" }}>{person.industry||person.role}</span>
                  <span style={{ fontSize:"11px", color:T.mutedText }}>{person.location}</span>
                </div>
              </div>
              <MI name="chevron_right" size={20} color={T.mutedText} />
            </div>
          ))}
        </div>
      )}

      {/* Sign-in prompt for guests */}
      <div style={{ marginTop:"24px", padding:"18px 20px", background:T.tagBg, borderRadius:"18px", border:`1px solid ${T.tagBorder}`, display:"flex", alignItems:"center", gap:"14px" }}>
        <MI name="workspace_premium" size={24} color="#2a8a5a" />
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"13px", fontWeight:"700", color:T.white, marginBottom:"2px" }}>Join UmLinked</div>
          <div style={{ fontSize:"12px", color:T.subText }}>Follow creators, send messages & build your profile</div>
        </div>
        <button onClick={onGoLogin} style={{ padding:"8px 14px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"12px", fontWeight:"700", cursor:"pointer", flexShrink:0 }}>Sign In</button>
      </div>
    </div>
  );
}

/* ─── ADD LINK MODAL ─── */
function AddLinkModal({ onClose, onAdd, existingLinks, T }) {
  const [step, setStep] = useState("pick");
  const [selectedPlat, setSelectedPlat] = useState(null);
  const [handle, setHandle] = useState("");
  const usedPlatIds = new Set(existingLinks.filter(l=>l.platformId!=="custom").map(l=>l.platformId));
  const confirm = () => {
    if (!handle.trim()) return;
    const url = selectedPlat.baseUrl ? selectedPlat.baseUrl + handle.trim().replace(/^@/,"") : handle.trim();
    onAdd({ uid: Date.now().toString(), platformId: selectedPlat.id, label: selectedPlat.label, handle: handle.trim(), url });
    onClose();
  };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:800, backdropFilter:"blur(6px)" }} onClick={onClose}>
      <div style={{ width:"100%", maxWidth:"480px", background:T.modalBg, borderRadius:"22px 22px 0 0", border:`1px solid ${T.cardBorder}`, maxHeight:"88vh", display:"flex", flexDirection:"column" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 4px" }}><div style={{ width:"36px", height:"4px", borderRadius:"2px", background:T.handleBar }} /></div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 20px 16px" }}>
          <div style={{ fontSize:"17px", fontWeight:"800", color:T.white }}>{step==="pick"?"Choose Platform":`Add ${selectedPlat?.label}`}</div>
          <button onClick={onClose} style={{ background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"50%", width:"30px", height:"30px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><MI name="close" size={16} color={T.subText} /></button>
        </div>
        {step==="pick" && (
          <div style={{ overflowY:"auto", flex:1, padding:"0 16px 24px", display:"flex", flexDirection:"column", gap:"8px" }}>
            {PLATFORM_PRESETS.map(plat=>{
              const alreadyAdded = plat.id !== "custom" && usedPlatIds.has(plat.id);
              return (
                <button key={plat.id} onClick={()=>{ if(alreadyAdded) return; setSelectedPlat(plat); setHandle(""); setStep("fill"); }}
                  disabled={alreadyAdded}
                  style={{ display:"flex", alignItems:"center", gap:"14px", padding:"13px 16px", borderRadius:"14px", background:alreadyAdded?T.sectionBg:T.inputBg, border:`1px solid ${T.cardBorder}`, cursor:alreadyAdded?"not-allowed":"pointer", textAlign:"left", width:"100%", opacity:alreadyAdded?0.6:1 }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:plat.gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0, boxShadow:alreadyAdded?"none":`0 4px 14px ${plat.color}35` }}>{plat.icon}</div>
                  <span style={{ fontSize:"15px", fontWeight:"600", color:T.text, flex:1 }}>{plat.label}</span>
                  {alreadyAdded
                    ? <span style={{ fontSize:"10px", fontWeight:"700", color:T.mutedText, background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"10px", padding:"3px 8px" }}>Already added</span>
                    : <MI name="chevron_right" size={18} color={T.subText} />
                  }
                </button>
              );
            })}
          </div>
        )}
        {step==="fill" && selectedPlat && (
          <div style={{ padding:"0 20px 32px", display:"flex", flexDirection:"column", gap:"16px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px", borderRadius:"14px", background:T.inputBg, border:`1px solid ${T.cardBorder}` }}>
              <div style={{ width:"48px", height:"48px", borderRadius:"14px", background:selectedPlat.gradient, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0, boxShadow:`0 4px 16px ${selectedPlat.color}40` }}>{selectedPlat.icon}</div>
              <div><div style={{ fontSize:"15px", fontWeight:"700", color:T.white }}>{selectedPlat.label}</div><div style={{ fontSize:"12px", color:T.subText }}>Enter your handle or URL below</div></div>
            </div>
            <div>
              <div style={{ fontSize:"12px", color:T.subText, marginBottom:"7px" }}>Your handle or URL</div>
              <input value={handle} onChange={e=>setHandle(e.target.value)} placeholder={selectedPlat.placeholder} autoFocus
                style={{ width:"100%", background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"12px", padding:"13px 15px", fontSize:"15px", color:T.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
                onKeyDown={e=>{if(e.key==="Enter")confirm();}} />
            </div>
            {handle.trim() && (
              <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px", borderRadius:"12px", background:"rgba(42,138,90,0.07)", border:"1px solid rgba(42,138,90,0.2)" }}>
                <span style={{ fontSize:"12px", color:"#2a8a5a" }}>Preview →</span>
                <div style={{ flex:1 }}><div style={{ fontSize:"13px", fontWeight:"700", color:T.white }}>{selectedPlat.label}</div><div style={{ fontSize:"11px", color:T.subText }}>{handle.trim()}</div></div>
              </div>
            )}
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={()=>setStep("pick")} style={{ flex:1, padding:"12px", background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"12px", color:T.subText, fontSize:"14px", fontWeight:"600", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
                <MI name="arrow_back" size={16} color={T.subText} /> Back
              </button>
              <button onClick={confirm} disabled={!handle.trim()} style={{ flex:2, padding:"12px", background:handle.trim()?"linear-gradient(135deg,#2a8a5a,#1e6b44)":T.inputBg, border:"none", borderRadius:"12px", color:handle.trim()?"#fff":T.subText, fontSize:"14px", fontWeight:"700", cursor:handle.trim()?"pointer":"default" }}>Add Link</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PEOPLE LIST MODAL (followers/following) ─── */
function PeopleModal({ title, ids, onClose, onViewProfile, T }) {
  const list = ids.map(id=>PEOPLE.find(p=>p.id===id));
  const [search,setSearch]=useState("");
  const [followStates,setFollowStates]=useState(Object.fromEntries(list.map(p=>[p.id,p.isFollowing])));
  const filtered = list.filter(p=>{
    const q=search.toLowerCase();
    return p.name.toLowerCase().includes(q)||p.handle.toLowerCase().includes(q)||p.role.toLowerCase().includes(q);
  });
  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:600,backdropFilter:"blur(6px)" }} onClick={onClose}>
      <div style={{ width:"100%",maxWidth:"480px",background:T.modalBg,borderRadius:"22px 22px 0 0",border:`1px solid ${T.cardBorder}`,maxHeight:"88vh",display:"flex",flexDirection:"column" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 4px" }}><div style={{ width:"36px",height:"4px",borderRadius:"2px",background:T.handleBar }} /></div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 20px 12px" }}>
          <div style={{ fontSize:"17px",fontWeight:"800",color:T.white }}>{title}</div>
          <button onClick={onClose} style={{ background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"50%",width:"30px",height:"30px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><MI name="close" size={16} color={T.subText} /></button>
        </div>
        <div style={{ padding:"0 20px 10px" }}>
          <div style={{ position:"relative" }}>
            <MI name="search" size={16} color={T.subText} style={{ position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)" }} />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" style={{ width:"100%",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"12px",padding:"10px 12px 10px 36px",fontSize:"13px",color:T.text,outline:"none",boxSizing:"border-box" }} />
          </div>
        </div>
        <div style={{ overflowY:"auto",flex:1,padding:"0 16px 24px",display:"flex",flexDirection:"column",gap:"8px" }}>
          {filtered.map(person=>(
            <div key={person.id} onClick={()=>onViewProfile(person)} style={{ display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",borderRadius:"14px",background:T.cardBg,border:`1px solid ${T.cardBorder}`,cursor:"pointer" }}>
              <div style={{ position:"relative",flexShrink:0 }}>
                <LazyAvatar src={person.avatar} alt={person.name} size={46} border="2px solid rgba(42,138,90,0.5)" />
                {person.verified&&<div style={{ position:"absolute",bottom:0,right:0,background:"#2a8a5a",borderRadius:"50%",width:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${T.dark?"#1a1f2e":"#fff"}` }}><MI name="check" size={9} color="white" /></div>}
              </div>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:"14px",fontWeight:"700",color:T.white,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{person.name}</div>
                <div style={{ fontSize:"12px",color:T.subText }}>{person.handle} · {fmtN(person.followers)} followers</div>
                <div style={{ fontSize:"11px",color:"#2a8a5a",background:T.tagBg,display:"inline-block",padding:"1px 7px",borderRadius:"10px",marginTop:"3px" }}>{person.industry||person.role}</div>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:"6px",flexShrink:0 }}>
                <button onClick={e=>{ e.stopPropagation(); setFollowStates(s=>({...s,[person.id]:!s[person.id]})); }}
                  style={{ padding:"6px 12px",borderRadius:"20px",border:followStates[person.id]?`1.5px solid ${T.inputBorder}`:"none",fontSize:"11px",fontWeight:"700",cursor:"pointer",background:followStates[person.id]?"transparent":"linear-gradient(135deg,#2a8a5a,#1e6b44)",color:followStates[person.id]?T.subText:"#fff" }}>
                  {followStates[person.id]?"Following":"Follow"}
                </button>
                <MI name="chevron_right" size={18} color={T.subText} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════ */
export default function ProfilePage() {
  const [theme, setTheme] = useState("light");
  const T = makeTheme(theme === "dark");

  /* ── Auth state ── */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  /* ── Page / nav state ── */
  // page: "search" | "profile" | "login"
  const [page, setPage] = useState("search"); // guests start on search
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(null); // MiniProfile for other people
  const [authGate, setAuthGate] = useState(null); // null | reason string

  /* ── Profile owner data ── */
  const [profileData, setProfileData] = useState({
    name:"Thandiwe Nkosi", handle:"@thandiwe", role:"Freelance Photographer", showRole:true,
    location:"Johannesburg, South Africa", bio:"📷 Capturing the beauty of South Africa. Available for shoots!",
    avatar:"https://picsum.photos/seed/thandiwe/200/200", email:"thandiwe@example.com", industry:"Photography",
  });
  const [editDraft, setEditDraft] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editTab, setEditTab] = useState("details");
  const [portfolioPhotos, setPortfolioPhotos] = useState([
    { id:"p1", src:"https://picsum.photos/seed/port1/400/400", caption:"Golden hour shoot" },
    { id:"p2", src:"https://picsum.photos/seed/port2/400/400", caption:"Studio session" },
    { id:"p3", src:"https://picsum.photos/seed/port3/400/400", caption:"Street editorial" },
    { id:"p4", src:"https://picsum.photos/seed/port4/400/400", caption:"Nature series" },
  ]);
  const [portfolioDraft, setPortfolioDraft] = useState(null);
  const [editingCaption, setEditingCaption] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  /* ── Links state ── */
  const [links, setLinks] = useState(INITIAL_LINKS);
  const [showAddLink, setShowAddLink] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deletingUid, setDeletingUid] = useState(null);
  const [kebabOpen, setKebabOpen] = useState(false);

  /* ── Followers/following modal ── */
  const [peopleModal, setPeopleModal] = useState(null); // null | {title,ids}

  /* ── Toast ── */
  const [toast, setToast] = useState(null);
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(null), 2500); };

  /* ── Actions ── */
  const handleLogin = () => {
    if (!loginEmail || !loginPass) { showToast("Please fill in all fields"); return; }
    setIsLoggedIn(true);
    setPage("profile");
    setDrawerOpen(false);
    setLoginEmail(""); setLoginPass("");
    showToast("Welcome back, Thandiwe! 👋");
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("search");
    setKebabOpen(false);
    setDrawerOpen(false);
    showToast("Logged out. See you soon!");
  };
  const handleAuthGate = (reason) => {
    setAuthGate(reason);
    setViewingProfile(prev=>prev); // keep profile open behind modal
  };
  const openEditProfile = (tab="details") => { setEditDraft({...profileData}); setPortfolioDraft([...portfolioPhotos]); setEditTab(tab); setShowEditProfile(true); setKebabOpen(false); };
  const saveEditProfile = () => { setProfileData({...editDraft}); setPortfolioPhotos([...portfolioDraft]); setShowEditProfile(false); showToast("Profile updated!"); };
  const handleAvatarChange = e => {
    const file=e.target.files?.[0]; if(!file) return;
    const reader=new FileReader(); reader.onload=ev=>setEditDraft(d=>({...d,avatar:ev.target.result})); reader.readAsDataURL(file);
  };
  const handlePortfolioAdd = e => {
    Array.from(e.target.files||[]).forEach(file=>{ const r=new FileReader(); r.onload=ev=>setPortfolioDraft(d=>[...(d||[]),{id:"p"+Date.now()+Math.random(),src:ev.target.result,caption:""}]); r.readAsDataURL(file); });
  };
  const removePortfolioPhoto = id=>setPortfolioDraft(d=>d.filter(p=>p.id!==id));
  const updateCaption=(id,caption)=>setPortfolioDraft(d=>d.map(p=>p.id===id?{...p,caption}:p));
  const movePhoto=(from,to)=>setPortfolioDraft(d=>{ const a=[...d],[item]=a.splice(from,1); a.splice(to,0,item); return a; });
  const addLink=link=>{ setLinks(l=>[...l,link]); showToast(`${link.label} added!`); };
  const deleteLink=uid=>{ setLinks(l=>l.filter(x=>x.uid!==uid)); setDeletingUid(null); showToast("Link removed"); };

  const KEBAB_ITEMS = [
    {icon:"workspace_premium",label:"Get Verified",action:()=>{setKebabOpen(false);showToast("Verification coming soon!");},highlight:true},
    {icon:"edit",label:"Edit Profile",action:()=>openEditProfile("details")},
    {icon:"link",label:"Copy Profile Link",action:()=>{setKebabOpen(false);navigator.clipboard?.writeText("https://umlinked.co.za/@thandiwe").catch(()=>{});showToast("Link copied!");}},
    {icon:"share",label:"Share Profile",action:()=>{setKebabOpen(false);showToast("Opening share sheet…");}},
    {icon:"bar_chart",label:"View Analytics",action:()=>{setKebabOpen(false);showToast("Opening analytics…");}},
    {icon:"lock",label:"Privacy Settings",action:()=>{setKebabOpen(false);showToast("Opening privacy settings…");}},
    {icon:"logout",label:"Log Out",action:handleLogout,danger:true},
  ];

  const inp={width:"100%",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"10px",padding:"11px 13px",fontSize:"14px",color:T.text,outline:"none",boxSizing:"border-box",fontFamily:"inherit"};

  /* ════ NAV ════ */
  const Nav = () => (
    <nav style={{ position:"sticky", top:0, zIndex:200, height:"58px", background:T.navBg, backdropFilter:"blur(16px)", borderBottom:`1px solid ${T.navBorder}`, display:"flex", alignItems:"center", padding:"0 16px", gap:"10px", transition:"background 0.25s" }}>

      {/* Left: Home */}
      <button onClick={()=>{ setPage(isLoggedIn?"profile":"search"); setViewingProfile(null); }} title="Home"
        style={{ background:"none", border:"none", cursor:"pointer", padding:"6px", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <MI name="home" size={22} color={T.subText} />
      </button>

      {/* Center: Logo */}
      <div style={{ flex:1, display:"flex", justifyContent:"center" }}>
        <button onClick={()=>{ setPage(isLoggedIn?"profile":"search"); setViewingProfile(null); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <Logo />
        </button>
      </div>

      {/* Right: Search + (avatar or sign-in) + hamburger */}
      <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
        {/* Search icon — always visible */}
        <button onClick={()=>{ setViewingProfile(null); setPage("search"); }}
          style={{ background:page==="search"?T.tagBg:"none", border:page==="search"?`1px solid ${T.tagBorder}`:"none", cursor:"pointer", padding:"6px", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <MI name="search" size={22} color={page==="search"?"#2a8a5a":T.subText} />
        </button>

        {isLoggedIn ? (
          /* Logged-in: avatar pill */
          <button onClick={()=>{ setPage("profile"); setViewingProfile(null); }}
            style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", borderRadius:"50%", display:"flex", alignItems:"center" }} title="My Profile">
            <LazyAvatar src={profileData.avatar} alt="me" size={32} border={page==="profile"?"2.5px solid #2a8a5a":`2px solid ${T.inputBorder}`} />
          </button>
        ) : (
          /* Guest: Sign In button */
          <button onClick={()=>setPage("login")}
            style={{ padding:"7px 14px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"20px", color:"#fff", fontSize:"12px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", boxShadow:"0 2px 10px rgba(42,138,90,0.3)" }}>
            <MI name="login" size={15} color="#fff" /> Sign In
          </button>
        )}

        {/* Hamburger */}
        <button onClick={()=>setDrawerOpen(o=>!o)}
          style={{ background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"10px", width:"36px", height:"36px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"4px" }}>
          {[22,22,15].map((w,i)=><div key={i} style={{ width:w, height:2, background:T.text, borderRadius:2 }} />)}
        </button>
      </div>
    </nav>
  );

  /* ════ DRAWER ════ */
  const Drawer = () => (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:599, backdropFilter:"blur(4px)" }} onClick={()=>setDrawerOpen(false)}>
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:"280px", background:T.drawerBg, borderLeft:`1px solid ${T.drawerBorder}`, zIndex:600, display:"flex", flexDirection:"column", boxShadow:T.dark?"none":"-8px 0 32px rgba(30,40,80,0.1)", overflowY:"auto" }} onClick={e=>e.stopPropagation()}>

        {/* Drawer header */}
        <div style={{ padding:"18px 18px 14px", borderBottom:`1px solid ${T.divider}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Logo />
          <button onClick={()=>setDrawerOpen(false)} style={{ background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"50%", width:"30px", height:"30px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <MI name="close" size={17} color={T.subText} />
          </button>
        </div>

        <div style={{ padding:"14px 16px", flex:1, display:"flex", flexDirection:"column", gap:"4px" }}>
          {/* Theme toggle */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 14px", borderRadius:"14px", background:T.inputBg, border:`1px solid ${T.inputBorder}`, marginBottom:"12px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <MI name={T.dark?"dark_mode":"light_mode"} size={20} color={T.dark?"#a5b4fc":"#f59e0b"} />
              <div>
                <div style={{ fontSize:"13px", fontWeight:"700", color:T.white }}>{T.dark?"Dark Mode":"Light Mode"}</div>
                <div style={{ fontSize:"11px", color:T.subText }}>Tap to switch</div>
              </div>
            </div>
            <button onClick={()=>setTheme(t=>t==="dark"?"light":"dark")}
              style={{ width:"46px", height:"26px", borderRadius:"13px", border:"none", cursor:"pointer", position:"relative", background:T.dark?"#2a8a5a":"#d0d8f0", transition:"background 0.25s", flexShrink:0 }}>
              <div style={{ position:"absolute", top:"4px", left:T.dark?"23px":"3px", width:"18px", height:"18px", borderRadius:"50%", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,0.25)", transition:"left 0.25s" }} />
            </button>
          </div>

          {/* User info or sign-in CTA */}
          {isLoggedIn ? (
            <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px", borderRadius:"14px", background:T.tagBg, border:`1px solid ${T.tagBorder}`, marginBottom:"8px" }}>
              <LazyAvatar src={profileData.avatar} alt="me" size={40} border="2px solid #2a8a5a" />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:"14px", fontWeight:"700", color:T.white, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{profileData.name}</div>
                <div style={{ fontSize:"11px", color:T.subText }}>{profileData.handle}</div>
              </div>
              <MI name="verified" size={18} color="#2a8a5a" />
            </div>
          ) : (
            <button onClick={()=>{ setDrawerOpen(false); setPage("login"); }} style={{ display:"flex", alignItems:"center", gap:"11px", padding:"13px 14px", marginBottom:"8px", borderRadius:"12px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer", width:"100%" }}>
              <MI name="login" size={18} color="#fff" /><span>Login / Sign Up</span>
            </button>
          )}

          {/* Nav items */}
          {[
            {icon:"search",label:"Browse Talent",action:()=>{setDrawerOpen(false);setPage("search");setViewingProfile(null);}},
            isLoggedIn&&{icon:"person",label:"My Profile",action:()=>{setDrawerOpen(false);setPage("profile");setViewingProfile(null);}},
            isLoggedIn&&{icon:"add_photo_alternate",label:"Post a Project",action:()=>{setDrawerOpen(false);showToast("Opening form…");}},
            {icon:"chat",label:"Messages",action:()=>{setDrawerOpen(false);if(!isLoggedIn){setPage("login");}else{showToast("Opening messages…");}}},
            {icon:"grade",label:"Top Rated",action:()=>{setDrawerOpen(false);showToast("Opening top rated…");}},
            {icon:"location_city",label:"Joburg Creatives",action:()=>{setDrawerOpen(false);showToast("Loading listings…");}},
          ].filter(Boolean).map(item=>(
            <button key={item.label} onClick={item.action} style={{ display:"flex", alignItems:"center", gap:"11px", padding:"11px 14px", borderRadius:"11px", border:"none", background:"transparent", color:T.text, fontSize:"13px", cursor:"pointer", textAlign:"left", width:"100%" }}
              onMouseEnter={e=>e.currentTarget.style.background=T.hoverBg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <MI name={item.icon} size={18} color={T.subText} /><span>{item.label}</span>
            </button>
          ))}

          <div style={{ height:"1px", background:T.divider, margin:"8px 0" }} />

          {[["security","Safety Centre"],["description","Terms of Use"],["policy","Privacy Policy"]].map(([icon,lb])=>(
            <button key={lb} onClick={()=>{setDrawerOpen(false);showToast(`Opening ${lb}…`);}} style={{ display:"flex", alignItems:"center", gap:"11px", padding:"9px 14px", borderRadius:"10px", border:"none", background:"transparent", color:T.subText, fontSize:"12px", cursor:"pointer", textAlign:"left", width:"100%" }}>
              <MI name={icon} size={16} color={T.mutedText} /><span>{lb}</span>
            </button>
          ))}

          {isLoggedIn && (
            <>
              <div style={{ height:"1px", background:T.divider, margin:"8px 0" }} />
              <button onClick={handleLogout} style={{ display:"flex", alignItems:"center", gap:"11px", padding:"11px 14px", borderRadius:"11px", border:"none", background:"transparent", color:"#f87171", fontSize:"13px", cursor:"pointer", textAlign:"left", width:"100%" }}>
                <MI name="logout" size={18} color="#f87171" /><span>Log Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  /* ════ LOGIN PAGE ════ */
  const LoginPage = () => (
    <div style={{ display:"flex", justifyContent:"center", padding:"40px 16px" }}>
      <div style={{ width:"100%", maxWidth:"360px" }}>
        <div style={{ textAlign:"center", marginBottom:"28px" }}>
          <Logo />
          <div style={{ fontSize:"22px", fontWeight:"900", color:T.white, fontFamily:"'Playfair Display',Georgia,serif", marginTop:"16px", marginBottom:"6px" }}>Welcome back</div>
          <div style={{ fontSize:"13px", color:T.subText }}>Sign in to your UmLinked account</div>
        </div>
        <div style={{ background:T.cardBg, borderRadius:"22px", padding:"24px", border:`1px solid ${T.cardBorder}`, boxShadow:T.cardShadow }}>
          <div style={{ marginBottom:"14px" }}>
            <div style={{ fontSize:"11px", color:T.subText, marginBottom:"6px", fontWeight:"600", display:"flex", alignItems:"center", gap:"5px" }}><MI name="mail" size={13} color={T.subText} />Email address</div>
            <input value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="you@example.com" type="email" style={inp} onKeyDown={e=>{if(e.key==="Enter")handleLogin();}} />
          </div>
          <div style={{ marginBottom:"20px" }}>
            <div style={{ fontSize:"11px", color:T.subText, marginBottom:"6px", fontWeight:"600", display:"flex", alignItems:"center", gap:"5px" }}><MI name="lock" size={13} color={T.subText} />Password</div>
            <input value={loginPass} onChange={e=>setLoginPass(e.target.value)} placeholder="••••••••" type="password" style={inp} onKeyDown={e=>{if(e.key==="Enter")handleLogin();}} />
          </div>
          <button onClick={handleLogin} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer", marginBottom:"12px", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", boxShadow:"0 4px 16px rgba(42,138,90,0.3)" }}>
            <MI name="login" size={17} color="#fff" /> Sign In
          </button>
          <div style={{ display:"flex", gap:"8px", marginBottom:"12px" }}>
            {[["Create Account",()=>showToast("Redirecting to signup…")],["Forgot Password",()=>showToast("Reset email sent!")]].map(([lb,fn])=>(
              <button key={lb} onClick={fn} style={{ flex:1, padding:"10px", background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"10px", color:T.subText, fontSize:"12px", fontWeight:"600", cursor:"pointer" }}>{lb}</button>
            ))}
          </div>
          <button onClick={()=>setPage("search")} style={{ display:"block", width:"100%", padding:"9px", background:"none", border:"none", color:T.mutedText, fontSize:"12px", cursor:"pointer", textAlign:"center" }}>Continue as guest →</button>
        </div>
        <div style={{ textAlign:"center", marginTop:"18px" }}>
          <div style={{ fontSize:"12px", color:T.mutedText }}>By signing in you agree to our <span style={{ color:T.green, cursor:"pointer" }}>Terms</span> and <span style={{ color:T.green, cursor:"pointer" }}>Privacy Policy</span></div>
        </div>
      </div>
    </div>
  );

  /* ════ MY PROFILE PAGE ════ */
  const MyProfilePage = () => (
    <div style={{ display:"flex", justifyContent:"center", padding:"0 16px 60px" }}>
      <div style={{ width:"100%", maxWidth:"420px" }}>

        {/* My Profile banner */}
        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 16px", margin:"16px 0 12px", background:T.tagBg, borderRadius:"14px", border:`1px solid ${T.tagBorder}` }}>
          <MI name="verified_user" size={18} color="#2a8a5a" />
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"13px", fontWeight:"700", color:T.white }}>My Profile</div>
            <div style={{ fontSize:"11px", color:T.subText }}>Only you see this banner. Tap ⋯ to edit.</div>
          </div>
          <button onClick={()=>openEditProfile("details")} style={{ padding:"6px 12px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"20px", color:"#fff", fontSize:"11px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", gap:"4px" }}>
            <MI name="edit" size={13} color="#fff" />Edit
          </button>
        </div>

        {/* Profile Card */}
        <div style={{ background:T.cardBg, borderRadius:"24px", padding:"22px", marginBottom:"14px", border:`1px solid ${T.cardBorder}`, boxShadow:T.cardShadow, position:"relative" }}>
          {/* Kebab */}
          <div style={{ position:"absolute", top:"16px", right:"16px", zIndex:10 }}>
            <button onClick={()=>setKebabOpen(o=>!o)} style={{ background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"10px", width:"34px", height:"34px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"3.5px", cursor:"pointer" }}>
              {[0,1,2].map(i=><div key={i} style={{ width:"4px", height:"4px", background:T.subText, borderRadius:"50%" }} />)}
            </button>
            {kebabOpen && (
              <>
                <div style={{ position:"fixed", inset:0, zIndex:9 }} onClick={()=>setKebabOpen(false)} />
                <div style={{ position:"absolute", top:"40px", right:0, zIndex:10, background:T.kebabBg, border:`1px solid ${T.cardBorder}`, borderRadius:"16px", minWidth:"210px", boxShadow:T.dark?"0 16px 48px rgba(0,0,0,0.6)":"0 8px 32px rgba(30,40,80,0.14)", overflow:"hidden" }}>
                  <div style={{ padding:"11px 16px 9px", borderBottom:`1px solid ${T.divider}` }}>
                    <div style={{ fontSize:"11px", color:T.mutedText, fontWeight:"600", textTransform:"uppercase", letterSpacing:"0.06em" }}>Profile Options</div>
                  </div>
                  {KEBAB_ITEMS.map((item,i)=>(
                    <button key={i} onClick={item.action}
                      style={{ display:"flex", alignItems:"center", gap:"11px", width:"100%", padding:"11px 16px", background:item.highlight?T.tagBg:"none", border:"none", cursor:"pointer", fontSize:"13px", fontWeight:"500", color:item.danger?"#f87171":item.highlight?"#2a8a5a":T.text, borderBottom:i<KEBAB_ITEMS.length-1?`1px solid ${T.divider}`:"none", textAlign:"left" }}
                      onMouseEnter={e=>e.currentTarget.style.background=item.danger?"rgba(248,113,113,0.08)":T.hoverBg}
                      onMouseLeave={e=>e.currentTarget.style.background=item.highlight?T.tagBg:"none"}>
                      <MI name={item.icon} size={17} color={item.danger?"#f87171":item.highlight?"#2a8a5a":T.subText} />{item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div style={{ display:"flex", alignItems:"flex-start", gap:"16px", marginBottom:"16px" }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <LazyAvatar src={profileData.avatar} alt={profileData.name} size={76} border="3px solid #2a8a5a" />
              <button onClick={()=>openEditProfile("portfolio")} style={{ position:"absolute", bottom:2, right:2, background:"#2a8a5a", borderRadius:"50%", width:"22px", height:"22px", display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${T.dark?"#1a1f2e":"#fff"}`, cursor:"pointer", padding:0 }}>
                <MI name="photo_camera" size={12} color="white" />
              </button>
            </div>
            <div style={{ flex:1, paddingRight:"30px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"2px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"20px", fontWeight:"900", color:T.white, fontFamily:"'Playfair Display',Georgia,serif", letterSpacing:"-0.3px" }}>{profileData.name}</span>
                <MI name="verified" size={17} color="#2a8a5a" />
              </div>
              <div style={{ fontSize:"12px", color:T.subText, marginBottom:"4px" }}>{profileData.handle}</div>
              <div style={{ display:"flex", alignItems:"center", gap:"3px", fontSize:"12px", color:T.subText }}>
                <MI name="location_on" size={13} color={T.subText} />{profileData.location}
              </div>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"12px" }}>
            {profileData.showRole && <div style={{ fontSize:"13px", color:T.subText }}>{profileData.role}</div>}
            <span style={{ fontSize:"11px", color:"#2a8a5a", background:T.tagBg, padding:"3px 11px", borderRadius:"20px", border:`1px solid ${T.tagBorder}`, fontWeight:"600", alignSelf:"flex-start", display:"flex", alignItems:"center", gap:"5px" }}>
              <MI name="business_center" size={13} color="#2a8a5a" />{profileData.industry||"Photography"}
            </span>
          </div>
          <div style={{ fontSize:"13px", color:T.subText, lineHeight:1.6, marginBottom:"18px" }}>{profileData.bio}</div>

          <div style={{ display:"flex", borderTop:`1px solid ${T.divider}`, paddingTop:"14px" }}>
            {[{n:fmtN(12500),l:"Followers",action:()=>setPeopleModal({title:"Followers · 12.5k",ids:FOLLOWERS_IDS})},{n:"320",l:"Following",action:()=>setPeopleModal({title:"Following · 320",ids:FOLLOWING_IDS})},{n:"48",l:"Projects",action:null}].map((s,i)=>(
              <button key={s.l} onClick={s.action||undefined} disabled={!s.action}
                style={{ flex:1, background:"none", border:"none", cursor:s.action?"pointer":"default", padding:"8px 0", borderRight:i<2?`1px solid ${T.divider}`:"none", borderRadius:"8px" }}
                onMouseEnter={e=>{if(s.action)e.currentTarget.style.background=T.hoverBg;}} onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <div style={{ fontSize:"17px", fontWeight:"800", color:T.white }}>{s.n}</div>
                <div style={{ fontSize:"11px", color:s.action?"#2a8a5a":T.subText, display:"flex", alignItems:"center", justifyContent:"center", gap:"2px" }}>
                  {s.l}{s.action&&<MI name="arrow_forward" size={11} color="#2a8a5a" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div style={{ marginBottom:"14px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px", padding:"0 2px" }}>
            <div>
              <div style={{ fontSize:"15px", fontWeight:"800", color:T.white }}>Social Links</div>
              <div style={{ fontSize:"11px", color:T.mutedText, marginTop:"1px" }}>{links.length} link{links.length!==1?"s":""}</div>
            </div>
            <div style={{ display:"flex", gap:"7px" }}>
              {links.length>0&&<button onClick={()=>{setEditMode(m=>!m);setDeletingUid(null);}} style={{ padding:"6px 14px", borderRadius:"20px", background:editMode?"rgba(220,38,38,0.08)":T.inputBg, border:editMode?"1px solid rgba(220,38,38,0.3)":`1px solid ${T.inputBorder}`, color:editMode?"#dc2626":T.subText, fontSize:"12px", fontWeight:"600", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px" }}>
                <MI name={editMode?"check":"edit"} size={14} color={editMode?"#dc2626":T.subText} />{editMode?"Done":"Edit"}
              </button>}
              <button onClick={()=>setShowAddLink(true)} style={{ padding:"6px 14px", borderRadius:"20px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", color:"#fff", fontSize:"12px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px" }}>
                <MI name="add" size={16} color="#fff" /> Add Link
              </button>
            </div>
          </div>
          {links.length===0?(
            <div style={{ textAlign:"center", padding:"32px 20px", background:T.cardBg, borderRadius:"18px", border:`1px dashed ${T.emptyBorder}` }}>
              <MI name="link" size={32} color={T.subText} style={{ marginBottom:"8px", display:"block" }} />
              <div style={{ fontSize:"14px", fontWeight:"600", color:T.subText }}>No links yet</div>
            </div>
          ):(
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {links.map(link=>{
                const plat=getPlatform(link.platformId);
                const isDeleting=deletingUid===link.uid;
                return (
                  <div key={link.uid} style={{ position:"relative" }}>
                    {editMode&&isDeleting&&(
                      <div style={{ position:"absolute",inset:0,zIndex:5,background:"rgba(20,10,10,0.9)",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",backdropFilter:"blur(4px)" }}>
                        <span style={{ fontSize:"13px",color:"#fca5a5" }}>Remove this link?</span>
                        <button onClick={()=>deleteLink(link.uid)} style={{ padding:"6px 14px",background:"#dc2626",border:"none",borderRadius:"8px",color:"#fff",fontSize:"12px",fontWeight:"700",cursor:"pointer" }}>Remove</button>
                        <button onClick={()=>setDeletingUid(null)} style={{ padding:"6px 12px",background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"8px",color:"#e8eaf0",fontSize:"12px",cursor:"pointer" }}>Cancel</button>
                      </div>
                    )}
                    {/* All social links are direct <a href> — no modal */}
                    <a href={editMode?undefined:link.url} target={editMode?undefined:"_blank"} rel="noreferrer" onClick={editMode?e=>e.preventDefault():undefined} style={{ textDecoration:"none", display:"block" }}>
                      <div style={{ display:"flex",alignItems:"center",gap:"15px",padding:"14px 16px",borderRadius:"16px",background:T.linkCard,border:`1px solid ${editMode?"rgba(220,38,38,0.25)":T.linkBorder}`,cursor:editMode?"default":"pointer",boxShadow:T.dark?"none":"0 1px 8px rgba(30,40,80,0.06)" }}
                        onMouseEnter={e=>{if(!editMode){e.currentTarget.style.borderColor=`${plat.color}60`;e.currentTarget.style.background=T.linkCardHov;}}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor=editMode?"rgba(220,38,38,0.25)":T.linkBorder;e.currentTarget.style.background=T.linkCard;}}>
                        {editMode&&<div style={{ display:"flex",flexDirection:"column",gap:"3px",flexShrink:0,opacity:0.4 }}>{[0,1,2].map(i=><div key={i} style={{ width:"14px",height:"2px",background:T.subText,borderRadius:"1px" }} />)}</div>}
                        <div style={{ width:"50px",height:"50px",borderRadius:"14px",background:plat.gradient,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",flexShrink:0,boxShadow:`0 4px 18px ${plat.color}40` }}>{plat.icon}</div>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ fontSize:"15px",fontWeight:"700",color:T.white,marginBottom:"2px" }}>{link.label}</div>
                          <div style={{ fontSize:"13px",color:T.subText,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{link.handle}</div>
                        </div>
                        {editMode?(
                          <button onClick={()=>setDeletingUid(link.uid)} style={{ width:"28px",height:"28px",borderRadius:"50%",background:"rgba(220,38,38,0.12)",border:"1px solid rgba(220,38,38,0.3)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0 }}>
                            <MI name="close" size={13} color="#f87171" />
                          </button>
                        ):<MI name="arrow_forward" size={18} color={plat.color} style={{ flexShrink:0, opacity:0.85 }} />}
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
          {!editMode&&links.length>0&&(
            <button onClick={()=>setShowAddLink(true)} style={{ width:"100%",marginTop:"10px",padding:"12px",background:"transparent",border:`1px dashed ${T.emptyBorder}`,borderRadius:"14px",color:T.mutedText,fontSize:"13px",fontWeight:"500",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px" }}
              onMouseEnter={e=>{e.currentTarget.style.background=T.tagBg;e.currentTarget.style.borderColor="rgba(42,138,90,0.3)";e.currentTarget.style.color="#2a8a5a";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=T.emptyBorder;e.currentTarget.style.color=T.mutedText;}}>
              <MI name="add" size={15} /> Add another link
            </button>
          )}
        </div>

        {/* Portfolio */}
        {portfolioPhotos.length>0&&(
          <div style={{ marginBottom:"14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px", padding:"0 2px" }}>
              <div>
                <div style={{ fontSize:"15px", fontWeight:"800", color:T.white }}>My Portfolio</div>
                <div style={{ fontSize:"11px", color:T.mutedText, marginTop:"1px" }}>{portfolioPhotos.length} photo{portfolioPhotos.length!==1?"s":""}</div>
              </div>
              <button onClick={()=>openEditProfile("portfolio")} style={{ padding:"6px 14px", borderRadius:"20px", background:T.inputBg, border:`1px solid ${T.inputBorder}`, color:T.subText, fontSize:"12px", fontWeight:"600", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px" }}>
                <MI name="edit" size={14} color={T.subText} /> Edit
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
              {portfolioPhotos.map((photo)=>(
                <div key={photo.id} style={{ position:"relative", borderRadius:"14px", overflow:"hidden", height:"150px" }}>
                  <LazyImg src={photo.src} alt={photo.caption||"Portfolio"} style={{ width:"100%", height:"150px", borderRadius:"14px" }} />
                  {photo.caption&&<div style={{ position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent)",padding:"18px 10px 8px" }}><div style={{ fontSize:"11px",color:"#fff",fontWeight:"500",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{photo.caption}</div></div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {portfolioPhotos.length===0&&(
          <button onClick={()=>openEditProfile("portfolio")} style={{ width:"100%",marginBottom:"14px",padding:"18px",background:T.cardBg,border:`1px dashed ${T.emptyBorder}`,borderRadius:"18px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:T.cardShadow }}>
            <MI name="add_photo_alternate" size={28} color={T.mutedText} />
            <div style={{ fontSize:"13px",fontWeight:"600",color:T.subText }}>Add portfolio photos</div>
          </button>
        )}
      </div>
    </div>
  );

  /* ════ EDIT PROFILE SHEET ════ */
  const EditProfileSheet = () => showEditProfile && editDraft && (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:600,backdropFilter:"blur(6px)" }} onClick={()=>setShowEditProfile(false)}>
      <div style={{ background:T.modalBg,borderRadius:"24px 24px 0 0",padding:"0 0 32px",width:"100%",maxWidth:"480px",maxHeight:"92vh",overflowY:"auto",border:`1px solid ${T.cardBorder}`,boxShadow:"0 -16px 60px rgba(0,0,0,0.18)" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 4px" }}><div style={{ width:"40px",height:"4px",background:T.handleBar,borderRadius:"2px" }} /></div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 22px 14px",borderBottom:`1px solid ${T.divider}` }}>
          <div><div style={{ fontSize:"17px",fontWeight:"800",color:T.white }}>Edit Profile</div><div style={{ fontSize:"11px",color:T.mutedText,marginTop:"2px" }}>Update your public info</div></div>
          <button onClick={()=>setShowEditProfile(false)} style={{ background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}><MI name="close" size={17} color={T.subText} /></button>
        </div>
        {/* Tabs */}
        <div style={{ display:"flex",padding:"14px 22px 0" }}>
          {[{id:"details",icon:"person",label:"Details"},{id:"portfolio",icon:"photo_library",label:"Portfolio"}].map(tab=>(
            <button key={tab.id} onClick={()=>setEditTab(tab.id)} style={{ flex:1,padding:"10px 8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",fontSize:"13px",fontWeight:"700",background:"transparent",color:editTab===tab.id?"#2a8a5a":T.subText,borderBottom:editTab===tab.id?"2.5px solid #2a8a5a":`2px solid ${T.divider}`,transition:"color .15s,border-color .15s" }}>
              <MI name={tab.icon} size={16} color={editTab===tab.id?"#2a8a5a":T.subText} />{tab.label}
            </button>
          ))}
        </div>

        {editTab==="details" && (
          <div style={{ padding:"20px 22px",display:"flex",flexDirection:"column",gap:"16px" }}>
            {/* Avatar */}
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:"12px",padding:"20px",background:T.sectionBg,borderRadius:"18px",border:`1px solid ${T.cardBorder}` }}>
              <div style={{ position:"relative" }}>
                <LazyAvatar src={editDraft.avatar} alt="avatar" size={88} border="3px solid #2a8a5a" />
                <div style={{ position:"absolute",inset:0,borderRadius:"50%",background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .2s",cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}
                  onClick={()=>document.getElementById("avatarFileInput").click()}>
                  <MI name="photo_camera" size={22} color="white" />
                </div>
              </div>
              <input id="avatarFileInput" type="file" accept="image/*" style={{ display:"none" }} onChange={handleAvatarChange} />
              <div style={{ display:"flex",gap:"8px" }}>
                <button onClick={()=>document.getElementById("avatarFileInput").click()} style={{ padding:"8px 18px",background:"linear-gradient(135deg,#2a8a5a,#1e6b44)",border:"none",borderRadius:"20px",color:"#fff",fontSize:"12px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px" }}>
                  <MI name="upload" size={14} color="#fff" /> Upload
                </button>
                <button onClick={()=>{const seed=Math.random().toString(36).slice(2,8);setEditDraft(d=>({...d,avatar:`https://picsum.photos/seed/${seed}/200/200`}));}} style={{ padding:"8px 14px",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"20px",color:T.subText,fontSize:"12px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px" }}>
                  <MI name="casino" size={14} color={T.subText} /> Random
                </button>
              </div>
            </div>
            {[{key:"name",label:"Full Name",icon:"person",ph:"Your display name"},{key:"handle",label:"Handle",icon:"alternate_email",ph:"@yourhandle"},{key:"location",label:"Location",icon:"location_on",ph:"City, Country"},{key:"email",label:"Email",icon:"mail",ph:"you@example.com"}].map(({key,label,icon,ph})=>(
              <div key={key}>
                <div style={{ fontSize:"11px",color:T.subText,marginBottom:"6px",fontWeight:"600",display:"flex",alignItems:"center",gap:"5px" }}><MI name={icon} size={14} color={T.subText} />{label}</div>
                <input value={editDraft[key]||""} onChange={e=>setEditDraft(d=>({...d,[key]:e.target.value}))} placeholder={ph}
                  style={{ width:"100%",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"12px",padding:"12px 14px",fontSize:"14px",color:T.text,outline:"none",boxSizing:"border-box",fontFamily:"inherit" }}
                  onFocus={e=>e.target.style.borderColor="rgba(42,138,90,0.5)"} onBlur={e=>e.target.style.borderColor=T.inputBorder} />
              </div>
            ))}
            <div>
              <div style={{ fontSize:"11px",color:T.subText,marginBottom:"6px",fontWeight:"600",display:"flex",alignItems:"center",gap:"5px" }}><MI name="badge" size={14} color={T.subText} />Role / Title</div>
              <input value={editDraft.role||""} onChange={e=>setEditDraft(d=>({...d,role:e.target.value}))} placeholder="e.g. Freelance Photographer"
                style={{ width:"100%",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"12px",padding:"12px 14px",fontSize:"14px",color:T.text,outline:"none",boxSizing:"border-box",fontFamily:"inherit",marginBottom:"8px" }}
                onFocus={e=>e.target.style.borderColor="rgba(42,138,90,0.5)"} onBlur={e=>e.target.style.borderColor=T.inputBorder} />
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderRadius:"12px",background:T.sectionBg,border:`1px solid ${T.cardBorder}` }}>
                <div><div style={{ fontSize:"13px",fontWeight:"600",color:T.text }}>Show role on profile</div><div style={{ fontSize:"11px",color:T.subText,marginTop:"1px" }}>Visitors will see your role title</div></div>
                <button onClick={()=>setEditDraft(d=>({...d,showRole:!d.showRole}))} style={{ width:"44px",height:"24px",borderRadius:"12px",border:"none",cursor:"pointer",position:"relative",background:editDraft.showRole?"#2a8a5a":"#d0d8f0",transition:"background 0.2s",flexShrink:0 }}>
                  <div style={{ position:"absolute",top:"3px",left:editDraft.showRole?"23px":"3px",width:"18px",height:"18px",borderRadius:"50%",background:"#fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)",transition:"left 0.2s" }} />
                </button>
              </div>
            </div>
            <div>
              <div style={{ fontSize:"11px",color:T.subText,marginBottom:"6px",fontWeight:"600",display:"flex",alignItems:"center",gap:"5px" }}><MI name="business_center" size={14} color={T.subText} />Industry Category</div>
              <select value={editDraft.industry||"Photography"} onChange={e=>setEditDraft(d=>({...d,industry:e.target.value}))} style={{ width:"100%",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"12px",padding:"12px 14px",fontSize:"14px",color:T.text,outline:"none",boxSizing:"border-box",fontFamily:"inherit",cursor:"pointer" }}>
                {INDUSTRY_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize:"11px",color:T.subText,marginBottom:"6px",fontWeight:"600",display:"flex",alignItems:"center",gap:"5px" }}><MI name="notes" size={14} color={T.subText} />Bio</div>
              <textarea value={editDraft.bio||""} onChange={e=>setEditDraft(d=>({...d,bio:e.target.value}))} placeholder="Tell the world about yourself…" rows={3}
                style={{ width:"100%",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"12px",padding:"12px 14px",fontSize:"14px",color:T.text,outline:"none",boxSizing:"border-box",fontFamily:"inherit",resize:"vertical",lineHeight:1.6 }}
                onFocus={e=>e.target.style.borderColor="rgba(42,138,90,0.5)"} onBlur={e=>e.target.style.borderColor=T.inputBorder} />
              <div style={{ fontSize:"11px",color:T.mutedText,marginTop:"4px",textAlign:"right" }}>{editDraft.bio?.length||0} chars</div>
            </div>
            <div style={{ display:"flex",gap:"10px" }}>
              <button onClick={()=>setShowEditProfile(false)} style={{ flex:1,padding:"13px",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"14px",color:T.subText,fontSize:"14px",fontWeight:"600",cursor:"pointer" }}>Cancel</button>
              <button onClick={saveEditProfile} style={{ flex:2,padding:"13px",background:"linear-gradient(135deg,#2a8a5a,#1e6b44)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px" }}>
                <MI name="check" size={17} color="#fff" /> Save Changes
              </button>
            </div>
          </div>
        )}

        {editTab==="portfolio" && portfolioDraft && (
          <div style={{ padding:"20px 22px",display:"flex",flexDirection:"column",gap:"16px" }}>
            <div onClick={()=>document.getElementById("portfolioFileInput").click()}
              onDragOver={e=>{e.preventDefault();setDragOver("area");}} onDragLeave={()=>setDragOver(null)}
              onDrop={e=>{e.preventDefault();setDragOver(null);Array.from(e.dataTransfer.files||[]).forEach(file=>{const r=new FileReader();r.onload=ev=>setPortfolioDraft(d=>[...(d||[]),{id:"p"+Date.now()+Math.random(),src:ev.target.result,caption:""}]);r.readAsDataURL(file);});}}
              style={{ border:`2px dashed ${dragOver?"#2a8a5a":T.emptyBorder}`,borderRadius:"18px",padding:"28px 20px",textAlign:"center",cursor:"pointer",background:dragOver?T.tagBg:T.sectionBg,transition:"all .15s" }}>
              <MI name="add_photo_alternate" size={36} color={dragOver?"#2a8a5a":T.subText} style={{ marginBottom:"8px",display:"block" }} />
              <div style={{ fontSize:"14px",fontWeight:"700",color:dragOver?"#2a8a5a":T.white,marginBottom:"4px" }}>Add Photos</div>
              <div style={{ fontSize:"12px",color:T.subText }}>Tap to browse · or drag & drop</div>
            </div>
            <input id="portfolioFileInput" type="file" accept="image/*" multiple style={{ display:"none" }} onChange={handlePortfolioAdd} />
            {portfolioDraft.length>0&&<div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}><div style={{ fontSize:"13px",fontWeight:"700",color:T.white }}>{portfolioDraft.length} photo{portfolioDraft.length!==1?"s":""}</div><div style={{ fontSize:"11px",color:T.subText,display:"flex",alignItems:"center",gap:"4px" }}><MI name="drag_indicator" size={14} color={T.subText} />Drag to reorder</div></div>}
            {portfolioDraft.length===0?(
              <div style={{ textAlign:"center",padding:"20px",background:T.sectionBg,borderRadius:"16px",border:`1px solid ${T.cardBorder}` }}>
                <MI name="photo_library" size={32} color={T.mutedText} style={{ marginBottom:"8px",display:"block" }} />
                <div style={{ fontSize:"13px",color:T.subText }}>No portfolio photos yet</div>
              </div>
            ):(
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px" }}>
                {portfolioDraft.map((photo,idx)=>(
                  <div key={photo.id} draggable
                    onDragStart={e=>e.dataTransfer.setData("idx",String(idx))}
                    onDragOver={e=>{e.preventDefault();setDragOver(photo.id);}} onDragLeave={()=>setDragOver(null)}
                    onDrop={e=>{e.preventDefault();setDragOver(null);const from=Number(e.dataTransfer.getData("idx"));if(from!==idx)movePhoto(from,idx);}}
                    style={{ position:"relative",borderRadius:"14px",overflow:"hidden",border:dragOver===photo.id?`2px solid #2a8a5a`:`1px solid ${T.cardBorder}`,background:T.sectionBg,cursor:"grab" }}>
                    <LazyImg src={photo.src} alt={photo.caption||"Photo"} style={{ width:"100%",height:"140px" }} />
                    <div style={{ position:"absolute",top:"6px",left:"6px",background:"rgba(0,0,0,0.5)",borderRadius:"8px",padding:"3px 5px",display:"flex",alignItems:"center",gap:"2px",backdropFilter:"blur(4px)" }}>
                      <MI name="drag_indicator" size={13} color="white" /><span style={{ fontSize:"10px",color:"white",fontWeight:"600" }}>{idx+1}</span>
                    </div>
                    <button onClick={()=>removePortfolioPhoto(photo.id)} style={{ position:"absolute",top:"6px",right:"6px",background:"rgba(220,38,38,0.85)",border:"none",borderRadius:"50%",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
                      <MI name="delete" size={14} color="white" />
                    </button>
                    <div style={{ padding:"7px 8px",background:T.dark?"rgba(0,0,0,0.3)":T.sectionBg }}>
                      {editingCaption===photo.id?(
                        <input autoFocus value={photo.caption} onChange={e=>updateCaption(photo.id,e.target.value)} onBlur={()=>setEditingCaption(null)} onKeyDown={e=>{if(e.key==="Enter")setEditingCaption(null);}} placeholder="Add caption…" style={{ width:"100%",background:"transparent",border:"none",borderBottom:`1px solid #2a8a5a`,outline:"none",fontSize:"11px",color:T.text,fontFamily:"inherit",padding:"2px 0",boxSizing:"border-box" }} />
                      ):(
                        <div onClick={()=>setEditingCaption(photo.id)} style={{ fontSize:"11px",color:photo.caption?T.subText:T.mutedText,cursor:"text",display:"flex",alignItems:"center",gap:"4px" }}>
                          <MI name="edit" size={11} color={T.mutedText} /><span style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{photo.caption||"Add caption…"}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display:"flex",gap:"10px",paddingTop:"4px" }}>
              <button onClick={()=>setShowEditProfile(false)} style={{ flex:1,padding:"13px",background:T.inputBg,border:`1px solid ${T.inputBorder}`,borderRadius:"14px",color:T.subText,fontSize:"14px",fontWeight:"600",cursor:"pointer" }}>Cancel</button>
              <button onClick={saveEditProfile} style={{ flex:2,padding:"13px",background:"linear-gradient(135deg,#2a8a5a,#1e6b44)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"7px" }}>
                <MI name="check" size={17} color="#fff" /> Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ════ FOOTER ════ */
  const Footer = () => (
    <footer style={{ background:T.footerBg,borderTop:`1px solid ${T.footerBorder}`,padding:"28px 24px 24px",transition:"background 0.25s" }}>
      <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px" }}>
        <div style={{ width:"24px",height:"24px",borderRadius:"6px",background:"linear-gradient(135deg,#2a8a5a,#1e6b44)",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        </div>
        <span style={{ fontSize:"17px",fontWeight:"800",background:"linear-gradient(135deg,#2a8a5a,#1a6640)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>UmLinked</span>
        <span style={{ fontSize:"11px",color:T.mutedText }}>by Mzansi Connect</span>
      </div>
      <div style={{ fontSize:"12px",color:T.subText,marginBottom:"20px" }}>Connecting South Africa's creative talent 🇿🇦</div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 16px",marginBottom:"20px" }}>
        {[{icon:"search",label:"Browse Talent",fn:()=>{setPage("search");setViewingProfile(null);}},{icon:"login",label:"Login / Sign Up",fn:()=>setPage("login")},{icon:"person",label:"My Profile",fn:()=>{if(isLoggedIn){setPage("profile");}else setPage("login");}},{icon:"chat",label:"Messages",fn:()=>{}},{icon:"grade",label:"Top Rated",fn:()=>{}},{icon:"location_city",label:"Joburg Creatives",fn:()=>{}},{icon:"security",label:"Safety Centre",fn:()=>{}},{icon:"description",label:"Terms of Use",fn:()=>{}},{icon:"policy",label:"Privacy Policy",fn:()=>{}},{icon:"info",label:"About UmLinked",fn:()=>{}}].map(({icon,label,fn})=>(
          <button key={label} onClick={fn} style={{ background:"none",border:"none",textAlign:"left",fontSize:"12px",color:T.subText,cursor:"pointer",padding:"6px 0",display:"flex",alignItems:"center",gap:"7px" }}>
            <MI name={icon} size={15} color={T.mutedText} />{label}
          </button>
        ))}
      </div>
      <div style={{ height:"1px",background:T.divider,margin:"4px 0 14px" }} />
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
        <span style={{ fontSize:"11px",color:T.mutedText }}>© 2025 UmLinked · Mzansi Connect</span>
        <span style={{ fontSize:"11px",color:"#2a8a5a",background:T.tagBg,padding:"3px 10px",borderRadius:"20px",border:`1px solid ${T.tagBorder}` }}>🇿🇦 Made in SA</span>
      </div>
    </footer>
  );

  /* ════ RENDER ════ */
  return (
    <div style={{ minHeight:"100vh", background:T.bodyBg, fontFamily:"'DM Sans','Segoe UI',sans-serif", color:T.text, transition:"background 0.25s,color 0.25s" }}>
      <Nav />

      {/* Page content */}
      {page==="search" && !viewingProfile && <SearchPage onViewProfile={p=>{setViewingProfile(p);}} onGoLogin={()=>setPage("login")} T={T} />}
      {page==="profile" && isLoggedIn && !viewingProfile && <MyProfilePage />}
      {page==="login" && !viewingProfile && (
        <div><LoginPage /></div>
      )}

      {/* Show footer on search and profile pages, not on login */}
      {page!=="login" && !viewingProfile && <Footer />}

      {/* MiniProfile overlay (from search results or people modals) */}
      {viewingProfile && (
        <MiniProfile person={viewingProfile} onBack={()=>setViewingProfile(null)} onAuthGate={handleAuthGate} isLoggedIn={isLoggedIn} T={T} />
      )}

      {/* Drawer */}
      {drawerOpen && <Drawer />}

      {/* Modals */}
      {showAddLink && <AddLinkModal onClose={()=>setShowAddLink(false)} onAdd={addLink} existingLinks={links} T={T} />}
      {showEditProfile && editDraft && <EditProfileSheet />}
      {peopleModal && <PeopleModal title={peopleModal.title} ids={peopleModal.ids} onClose={()=>setPeopleModal(null)} onViewProfile={p=>{setPeopleModal(null);setViewingProfile(p);}} T={T} />}
      {authGate && <AuthGateModal reason={authGate} onClose={()=>setAuthGate(null)} onGoLogin={()=>{setAuthGate(null);setPage("login");}} T={T} />}

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed",bottom:"24px",left:"50%",transform:"translateX(-50%)",background:"#2a8a5a",color:"#fff",padding:"10px 22px",borderRadius:"30px",fontSize:"13px",fontWeight:"600",zIndex:999,boxShadow:"0 4px 20px rgba(42,138,90,0.35)",whiteSpace:"nowrap",pointerEvents:"none" }}>
          {toast}
        </div>
      )}
    </div>
  );
      }

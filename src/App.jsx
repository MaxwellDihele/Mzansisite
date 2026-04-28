import { useState, useEffect, useRef, useMemo } from "react";

/* ─────────────── INJECT FONTS + MATERIAL ICONS ─────────────── */
if (typeof document !== "undefined" && !document.getElementById("umlinked-fonts")) {
  const fonts = document.createElement("link");
  fonts.id = "umlinked-fonts";
  fonts.rel = "stylesheet";
  fonts.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(fonts);
}
if (typeof document !== "undefined" && !document.getElementById("material-icons")) {
  const mi = document.createElement("link");
  mi.id = "material-icons";
  mi.rel = "stylesheet";
  mi.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
  document.head.appendChild(mi);
}
if (typeof document !== "undefined" && !document.getElementById("umlinked-home-styles")) {
  const s = document.createElement("style");
  s.id = "umlinked-home-styles";
  s.textContent = `
    *,*::before,*::after{box-sizing:border-box;}
    html,body{max-width:100vw;overflow-x:hidden;}
    .uml-logo-text{font-size:clamp(15px,4.5vw,19px)!important;}
    .uml-drawer{width:min(280px,90vw)!important;}
    @keyframes spin{to{transform:rotate(360deg)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    .uml-fade-up{animation:fadeUp 0.38s ease both;}
    .uml-card-hover{transition:transform 0.18s ease,box-shadow 0.18s ease;}
    .uml-card-hover:hover{transform:translateY(-2px);}
    .uml-input-focus:focus{outline:none;border-color:rgba(42,138,90,0.55)!important;}
    .uml-pill-btn{transition:background 0.15s,color 0.15s,border-color 0.15s;}
    .uml-clear-btn{transition:opacity 0.15s;}
    .uml-clear-btn:hover{opacity:0.7;}
    input,textarea,select{max-width:100%;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:rgba(42,138,90,0.3);border-radius:4px;}
  `;
  document.head.appendChild(s);
}

/* ─────────────── MI COMPONENT ─────────────── */
const MI = ({ name, size = 20, color = "currentColor", style = {} }) => (
  <span className="material-icons-round" style={{ fontSize: size, color, lineHeight: 1, display: "inline-flex", alignItems: "center", userSelect: "none", ...style }}>{name}</span>
);

/* ─────────────── THEME ─────────────── */
function makeTheme(dark) {
  return {
    dark,
    bodyBg:       dark ? "#0d1018"  : "#f4f6fb",
    cardBg:       dark ? "linear-gradient(145deg,#1c2130,#1a1f2e)" : "#ffffff",
    cardShadow:   dark ? "0 4px 32px rgba(0,0,0,0.45)" : "0 2px 20px rgba(30,40,80,0.08)",
    cardBorder:   dark ? "rgba(255,255,255,0.06)" : "rgba(200,210,235,0.6)",
    navBg:        dark ? "rgba(13,16,24,0.96)"   : "rgba(255,255,255,0.96)",
    navBorder:    dark ? "rgba(255,255,255,0.07)" : "rgba(200,210,235,0.7)",
    text:         dark ? "#e8eaf0"  : "#1a1d2e",
    subText:      dark ? "#9ba3b8"  : "#5c647e",
    mutedText:    dark ? "#5a6278"  : "#9ba3c0",
    inputBg:      dark ? "rgba(255,255,255,0.05)" : "#f0f3fc",
    inputBorder:  dark ? "rgba(255,255,255,0.1)"  : "#d4daf0",
    divider:      dark ? "rgba(255,255,255,0.07)" : "rgba(200,210,235,0.6)",
    hoverBg:      dark ? "rgba(255,255,255,0.04)" : "rgba(42,138,90,0.04)",
    sectionBg:    dark ? "rgba(255,255,255,0.03)" : "#f7f9ff",
    tagBg:        dark ? "rgba(42,138,90,0.12)" : "rgba(42,138,90,0.08)",
    tagBorder:    "rgba(42,138,90,0.28)",
    white:        dark ? "#ffffff"  : "#1a1d2e",
    green:        "#2a8a5a",
    shimmerBase:  dark ? "#1c2130" : "#eef1fa",
    shimmerHigh:  dark ? "#252d40" : "#f7f9ff",
  };
}

/* ─────────────── FORMAT NUMBER ─────────────── */
function fmtN(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "K";
  return String(n);
}

/* ─────────────── PEOPLE DATA ─────────────── */
const PEOPLE = [
  { id:1,  name:"Zinhle Dube",       handle:"@zinhle_d",      avatar:"https://picsum.photos/seed/zinhle1/200/200",   role:"Model",            industry:"Modeling",          location:"Cape Town, ZA",    bio:"Fashion & commercial model. Lover of art, culture and the African sun.",         followers:8400,    following:210, projects:22,  rating:4.7, reviews:41,  verified:true  },
  { id:2,  name:"Kagiso Sithole",    handle:"@kagiso_s",      avatar:"https://picsum.photos/seed/kagiso2/200/200",   role:"Fashion Designer",  industry:"Fashion Design",    location:"Durban, ZA",       bio:"Designing bold African fashion for the modern world. Streetwear meets heritage.", followers:3200,    following:180, projects:15,  rating:4.5, reviews:28,  verified:false },
  { id:3,  name:"Naledi Mokoena",    handle:"@naledi.m",      avatar:"https://picsum.photos/seed/naledi3/200/200",   role:"Makeup Artist",     industry:"Makeup & Beauty",   location:"Pretoria, ZA",     bio:"Bridal, editorial & SFX makeup. Over 200 happy clients.",                       followers:12100,   following:304, projects:67,  rating:4.9, reviews:93,  verified:true  },
  { id:4,  name:"Bongani Khumalo",   handle:"@bongani_k",     avatar:"https://picsum.photos/seed/bongani4/200/200",  role:"Videographer",      industry:"Videography",       location:"Johannesburg, ZA", bio:"Cinematic storytelling for brands, events & music videos.",                     followers:5700,    following:260, projects:34,  rating:4.6, reviews:52,  verified:false },
  { id:5,  name:"Lerato Ntuli",      handle:"@lerato.ntuli",  avatar:"https://picsum.photos/seed/lerato5/200/200",   role:"Stylist",           industry:"Styling",           location:"Sandton, ZA",      bio:"Celebrity stylist. Fashion week veteran.",                                      followers:9300,    following:190, projects:44,  rating:4.8, reviews:76,  verified:true  },
  { id:6,  name:"Sipho Nkosi",       handle:"@sipho_n",       avatar:"https://picsum.photos/seed/sipho6/200/200",    role:"Art Director",      industry:"Art Direction",     location:"Cape Town, ZA",    bio:"Creative direction for lifestyle brands.",                                      followers:4100,    following:142, projects:19,  rating:4.4, reviews:33,  verified:false },
  { id:7,  name:"Ayanda Mthembu",    handle:"@ayanda.m",      avatar:"https://picsum.photos/seed/ayanda7/200/200",   role:"Content Creator",   industry:"Content Creation",  location:"Durban, ZA",       bio:"Travel & lifestyle content creator. Exploring Africa one post at a time 🌍",   followers:31000,   following:520, projects:88,  rating:4.7, reviews:110, verified:true  },
  { id:8,  name:"Thabo Dlamini",     handle:"@thabo_d",       avatar:"https://picsum.photos/seed/thabo8/200/200",    role:"Photographer",      industry:"Photography",       location:"Pretoria, ZA",     bio:"Documentary & street photographer. Telling South Africa's untold stories.",    followers:7200,    following:388, projects:29,  rating:4.8, reviews:64,  verified:false },
  { id:9,  name:"Minnie Dlamini",    handle:"@minniedlamini", avatar:"https://picsum.photos/seed/minnie9/200/200",   role:"TV Presenter",      industry:"Entertainment",     location:"Johannesburg, ZA", bio:"TV presenter, actress & entrepreneur. Living my best life. ✨",               followers:2100000, following:890, projects:120, rating:4.9, reviews:202, verified:true  },
  { id:10, name:"Trevor Noah",       handle:"@trevornoah",    avatar:"https://picsum.photos/seed/trevor10/200/200",  role:"Comedian",          industry:"Entertainment",     location:"New York / SA",    bio:"Comedian, author. Proudly South African 🇿🇦",                                 followers:8900000, following:420, projects:55,  rating:4.9, reviews:312, verified:true  },
  { id:11, name:"Nomzamo Mbatha",    handle:"@nomzamo_m",     avatar:"https://picsum.photos/seed/nomzamo11/200/200", role:"Actress",           industry:"Acting & Performance",location:"Los Angeles / SA", bio:"Actress, humanitarian & UNHCR Goodwill Ambassador. 🌍",                       followers:3400000, following:660, projects:78,  rating:5.0, reviews:188, verified:true  },
  { id:12, name:"DJ Zinhle",         handle:"@djzinhle",      avatar:"https://picsum.photos/seed/djzinhle12/200/200",role:"DJ & Entrepreneur", industry:"Music & Entertainment",location:"Johannesburg, ZA",bio:"Award-winning DJ, entrepreneur & mother. Era by DJ Zinhle. 🎧",              followers:4200000, following:730, projects:96,  rating:4.8, reviews:174, verified:true  },
  { id:13, name:"Riky Rick Studio",  handle:"@rikyrickworld", avatar:"https://picsum.photos/seed/riky13/200/200",    role:"Creative Studio",   industry:"Art Direction",     location:"Johannesburg, ZA", bio:"A creative collective honouring Riky Rick's legacy.",                          followers:980000,  following:310, projects:44,  rating:4.7, reviews:89,  verified:false },
  { id:14, name:"Sho Madjozi",       handle:"@shomadjozi",    avatar:"https://picsum.photos/seed/sho14/200/200",     role:"Musician",          industry:"Music & Entertainment",location:"Johannesburg, ZA",bio:"BET Award winner. Tsonga girl changing the world through music 🎶",           followers:1700000, following:480, projects:62,  rating:4.9, reviews:143, verified:true  },
];

/* ─────────────── INDUSTRY DATA ─────────────── */
const INDUSTRIES = {
  "Primary Sectors": ["Agriculture","Forestry","Fishing","Mining","Quarrying"],
  "Secondary Sectors": ["Manufacturing","Food Production","Textiles and Apparel","Automotive Manufacturing","Chemical Production","Metal and Steel Production","Electronics Manufacturing","Construction","Infrastructure Development","Energy Production","Water Supply"],
  "Tertiary Sectors": ["Wholesale Trade","Retail Trade","Hospitality","Tourism","Transport","Logistics","Storage and Warehousing","Telecommunications","Finance","Banking","Insurance","Real Estate","Business Services","Consulting","Legal Services","Accounting Services","Marketing Services","Education","Healthcare","Social Services","Public Administration","Defence","Security Services","Entertainment","Media","Sports and Recreation","Personal Services"],
  "Government Sectors": ["National Government","Provincial Government","Local Government","Public Infrastructure","Public Health","Public Education","Public Safety","Judiciary","Home Affairs","Revenue Services","State-Owned Enterprises"],
  "Private Sectors": ["Small and Medium Enterprises","Corporations","Startups","Family Businesses","Franchises","Private Equity","Venture Capital"],
  "Digital & Internet": ["Software Development","Web Development","Mobile App Development","Artificial Intelligence","Machine Learning","Data Science","Cybersecurity","Cloud Computing","Blockchain","Cryptocurrency","FinTech","EdTech","HealthTech","AgriTech","E-commerce","Digital Marketing","Content Creation","Social Media Management","Streaming Services","Gaming Industry","SaaS (Software as a Service)","Platform Businesses","Online Marketplaces"],
  "Emerging & Specialized": ["Renewable Energy","Green Economy","Sustainability","Waste Management","Recycling","Biotechnology","Nanotechnology","Space Technology","Smart Cities","Internet of Things (IoT)","Robotics and Automation","3D Printing","Electric Vehicles","Drone Technology"],
  "Informal Sector": ["Street Trading","Spaza Shops","Informal Transport","Home-Based Businesses","Freelancing","Gig Economy"],
  "Household Sector": ["Domestic Work","Private Household Services"],
  "International Sector": ["Embassies","International Organizations","Cross-border Trade","Export and Import"],
  "Creative Industries": ["Photography","Videography","Modeling","Fashion Design","Makeup & Beauty","Styling","Art Direction","Content Creation","Music & Entertainment","Acting & Performance","Graphic Design","Illustration","Brand Strategy","Event Management","Hair & Beauty","Fitness & Wellness","Interior Design","Architecture","Journalism & Media","Film & Production","Dance & Choreography","Voice & Narration","Digital Marketing"],
};

const ALL_INDUSTRIES = Object.values(INDUSTRIES).flat();

/* ─────────────── TRENDING INDUSTRIES ─────────────── */
const TRENDING = ["Photography","Content Creation","Digital Marketing","Software Development","Music & Entertainment","Fashion Design","FinTech","Artificial Intelligence"];

/* ─────────────── AVATAR COMPONENT ─────────────── */
function Avatar({ src, alt, size, verified }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position:"relative", flexShrink:0 }}>
      <div style={{ width:size, height:size, borderRadius:"50%", overflow:"hidden", background:"rgba(120,130,160,0.12)", border:"2px solid rgba(42,138,90,0.2)" }}>
        <img src={src} alt={alt||""} onLoad={()=>setLoaded(true)}
          style={{ width:"100%", height:"100%", objectFit:"cover", opacity:loaded?1:0, transition:"opacity 0.3s" }} />
      </div>
      {verified && (
        <div style={{ position:"absolute", bottom:-1, right:-1, width:size*0.32, height:size*0.32, borderRadius:"50%", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid white" }}>
          <MI name="check" size={size*0.18} color="#fff" />
        </div>
      )}
    </div>
  );
}

/* ─────────────── STAR RATING ─────────────── */
function Stars({ rating, size=12 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"1px" }}>
      {[1,2,3,4,5].map(i=>(
        <MI key={i} name={i<=Math.floor(rating)?"star":i-0.5<=rating?"star_half":"star_border"} size={size} color="#f59e0b" />
      ))}
    </div>
  );
}

/* ─────────────── PERSON CARD ─────────────── */
function PersonCard({ person, T, onView, animDelay=0 }) {
  return (
    <div className="uml-card-hover uml-fade-up" style={{ animationDelay:`${animDelay}ms`, background:T.cardBg, border:`1px solid ${T.cardBorder}`, borderRadius:"18px", padding:"18px", boxShadow:T.cardShadow, cursor:"pointer" }}
      onClick={()=>onView(person)}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
        <Avatar src={person.avatar} alt={person.name} size={52} verified={person.verified} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:"6px", flexWrap:"wrap" }}>
            <span style={{ fontSize:"15px", fontWeight:"800", color:T.white, fontFamily:"'DM Sans',sans-serif", wordBreak:"break-word" }}>{person.name}</span>
          </div>
          <div style={{ fontSize:"12px", color:T.green, fontWeight:"600", marginTop:"1px" }}>{person.handle}</div>
          <div style={{ fontSize:"12px", color:T.subText, marginTop:"2px", display:"flex", alignItems:"center", gap:"4px" }}>
            <MI name="work" size={12} color={T.mutedText} />
            {person.role}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"3px", flexShrink:0, background:T.tagBg, border:`1px solid ${T.tagBorder}`, borderRadius:"20px", padding:"3px 8px" }}>
          <Stars rating={person.rating} size={11} />
          <span style={{ fontSize:"11px", color:T.green, fontWeight:"700", marginLeft:"2px" }}>{person.rating}</span>
        </div>
      </div>

      <p style={{ fontSize:"13px", color:T.subText, marginTop:"10px", lineHeight:1.55, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {person.bio}
      </p>

      <div style={{ display:"flex", alignItems:"center", gap:"6px", marginTop:"10px", flexWrap:"wrap" }}>
        <span style={{ fontSize:"11px", background:T.tagBg, border:`1px solid ${T.tagBorder}`, color:T.green, borderRadius:"20px", padding:"3px 10px", fontWeight:"600" }}>
          {person.industry}
        </span>
        <span style={{ fontSize:"11px", color:T.mutedText, display:"flex", alignItems:"center", gap:"3px" }}>
          <MI name="location_on" size={11} color={T.mutedText} />
          {person.location}
        </span>
      </div>

      <div style={{ display:"flex", gap:"0", marginTop:"12px", paddingTop:"12px", borderTop:`1px solid ${T.divider}` }}>
        {[
          { n:fmtN(person.followers), l:"Followers" },
          { n:fmtN(person.following), l:"Following" },
          { n:person.projects,        l:"Projects" },
          { n:person.reviews,         l:"Reviews" },
        ].map((s,i,arr)=>(
          <div key={s.l} style={{ flex:1, textAlign:"center", borderRight:i<arr.length-1?`1px solid ${T.divider}`:"none" }}>
            <div style={{ fontSize:"13px", fontWeight:"800", color:T.white }}>{s.n}</div>
            <div style={{ fontSize:"10px", color:T.mutedText, marginTop:"1px" }}>{s.l}</div>
          </div>
        ))}
      </div>

      <button style={{ width:"100%", marginTop:"12px", padding:"10px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"13px", fontWeight:"700", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", boxShadow:"0 4px 16px rgba(42,138,90,0.25)" }}>
        <MI name="person" size={15} color="#fff" /> View Profile
      </button>
    </div>
  );
}

/* ─────────────── SKELETON CARD ─────────────── */
function SkeletonCard({ T }) {
  const shimmer = {
    background:`linear-gradient(90deg,${T.shimmerBase} 25%,${T.shimmerHigh} 50%,${T.shimmerBase} 75%)`,
    backgroundSize:"400px 100%",
    animation:"shimmer 1.4s infinite linear",
    borderRadius:"8px",
  };
  return (
    <div style={{ background:T.cardBg, border:`1px solid ${T.cardBorder}`, borderRadius:"18px", padding:"18px", boxShadow:T.cardShadow }}>
      <div style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
        <div style={{ ...shimmer, width:52, height:52, borderRadius:"50%", flexShrink:0 }} />
        <div style={{ flex:1 }}>
          <div style={{ ...shimmer, height:14, width:"60%", marginBottom:"8px" }} />
          <div style={{ ...shimmer, height:11, width:"40%" }} />
        </div>
      </div>
      <div style={{ ...shimmer, height:11, marginTop:14, marginBottom:6 }} />
      <div style={{ ...shimmer, height:11, width:"80%" }} />
      <div style={{ display:"flex", gap:"8px", marginTop:14 }}>
        <div style={{ ...shimmer, height:22, width:90, borderRadius:20 }} />
        <div style={{ ...shimmer, height:22, width:80, borderRadius:20 }} />
      </div>
      <div style={{ ...shimmer, height:36, marginTop:14, borderRadius:12 }} />
    </div>
  );
}

/* ─────────────── INDUSTRY PILL ─────────────── */
function IndustryPill({ label, active, T, onClick }) {
  return (
    <button className="uml-pill-btn" onClick={onClick}
      style={{ padding:"7px 14px", borderRadius:"20px", border:`1px solid ${active?T.green:T.cardBorder}`, background:active?"linear-gradient(135deg,#2a8a5a,#1e6b44)":T.inputBg, color:active?"#fff":T.subText, fontSize:"12px", fontWeight:active?"700":"600", cursor:"pointer", whiteSpace:"nowrap", boxShadow:active?"0 4px 14px rgba(42,138,90,0.28)":"none" }}>
      {label}
    </button>
  );
}

/* ─────────────── PROFILE MODAL ─────────────── */
function ProfileModal({ person, T, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)" }}
      onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="uml-fade-up" style={{ width:"100%", maxWidth:"520px", background:T.dark?"linear-gradient(160deg,#1e2538,#181d2b)":"#ffffff", borderRadius:"24px 24px 0 0", padding:"0 0 32px", boxShadow:"0 -8px 48px rgba(0,0,0,0.25)", maxHeight:"90vh", overflowY:"auto" }}>
        {/* Handle */}
        <div style={{ display:"flex", justifyContent:"center", paddingTop:"12px", paddingBottom:"8px" }}>
          <div style={{ width:36, height:4, borderRadius:2, background:T.dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.12)" }} />
        </div>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px 16px" }}>
          <span style={{ fontSize:"16px", fontWeight:"800", color:T.white, fontFamily:"'Playfair Display',serif" }}>Profile</span>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <MI name="close" size={22} color={T.subText} />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding:"0 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"16px" }}>
            <Avatar src={person.avatar} alt={person.name} size={72} verified={person.verified} />
            <div>
              <div style={{ fontSize:"20px", fontWeight:"800", color:T.white, fontFamily:"'Playfair Display',serif" }}>{person.name}</div>
              <div style={{ fontSize:"13px", color:T.green, fontWeight:"600" }}>{person.handle}</div>
              <div style={{ fontSize:"13px", color:T.subText, marginTop:"2px", display:"flex", alignItems:"center", gap:"4px" }}>
                <MI name="work" size={13} color={T.mutedText} />{person.role}
              </div>
            </div>
          </div>
          <p style={{ fontSize:"14px", color:T.subText, lineHeight:1.6, marginBottom:"16px" }}>{person.bio}</p>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"16px" }}>
            <span style={{ fontSize:"12px", background:T.tagBg, border:`1px solid ${T.tagBorder}`, color:T.green, borderRadius:"20px", padding:"4px 12px", fontWeight:"600" }}>{person.industry}</span>
            <span style={{ fontSize:"12px", color:T.subText, display:"flex", alignItems:"center", gap:"4px" }}>
              <MI name="location_on" size={13} color={T.mutedText} />{person.location}
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"20px" }}>
            <Stars rating={person.rating} size={14} />
            <span style={{ fontSize:"13px", color:T.green, fontWeight:"700" }}>{person.rating}</span>
            <span style={{ fontSize:"12px", color:T.mutedText }}>({person.reviews} reviews)</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"20px" }}>
            {[{n:fmtN(person.followers),l:"Followers"},{n:fmtN(person.following),l:"Following"},{n:person.projects,l:"Projects"}].map(s=>(
              <div key={s.l} style={{ background:T.sectionBg, border:`1px solid ${T.cardBorder}`, borderRadius:"12px", padding:"12px 8px", textAlign:"center" }}>
                <div style={{ fontSize:"18px", fontWeight:"800", color:T.white }}>{s.n}</div>
                <div style={{ fontSize:"11px", color:T.mutedText, marginTop:"2px" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={onClose} style={{ flex:1, padding:"12px", background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"14px", color:T.subText, fontSize:"14px", fontWeight:"600", cursor:"pointer" }}>Close</button>
            <button style={{ flex:2, padding:"12px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"14px", color:"#fff", fontSize:"14px", fontWeight:"700", cursor:"pointer", boxShadow:"0 4px 16px rgba(42,138,90,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:"7px" }}>
              <MI name="person_add" size={17} color="#fff" /> Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── INDUSTRY BROWSER MODAL ─────────────── */
function IndustryModal({ T, onSelect, onClose }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(()=>{
    if(!search.trim()) return INDUSTRIES;
    const q = search.toLowerCase();
    const result = {};
    for(const [cat, items] of Object.entries(INDUSTRIES)){
      const hits = items.filter(i=>i.toLowerCase().includes(q));
      if(hits.length) result[cat] = hits;
    }
    return result;
  },[search]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(6px)" }}
      onClick={(e)=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="uml-fade-up" style={{ width:"100%", maxWidth:"520px", background:T.dark?"linear-gradient(160deg,#1e2538,#181d2b)":"#ffffff", borderRadius:"24px 24px 0 0", boxShadow:"0 -8px 48px rgba(0,0,0,0.25)", maxHeight:"85vh", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"center", paddingTop:"12px" }}>
          <div style={{ width:36, height:4, borderRadius:2, background:T.dark?"rgba(255,255,255,0.15)":"rgba(0,0,0,0.12)" }} />
        </div>
        <div style={{ padding:"12px 20px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:"16px", fontWeight:"800", color:T.white, fontFamily:"'Playfair Display',serif" }}>Browse Industries</span>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px" }}>
            <MI name="close" size={22} color={T.subText} />
          </button>
        </div>
        <div style={{ padding:"12px 20px" }}>
          <div style={{ position:"relative" }}>
            <MI name="search" size={17} color={T.mutedText} style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)" }} />
            <input className="uml-input-focus" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search industries…"
              style={{ width:"100%", paddingLeft:"38px", paddingRight:"12px", paddingTop:"10px", paddingBottom:"10px", background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"12px", fontSize:"14px", color:T.text, fontFamily:"'DM Sans',sans-serif" }} />
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"0 20px 24px" }}>
          {Object.entries(filtered).map(([cat, items])=>(
            <div key={cat} style={{ marginBottom:"18px" }}>
              <div style={{ fontSize:"11px", fontWeight:"700", color:T.mutedText, letterSpacing:"0.07em", textTransform:"uppercase", marginBottom:"8px" }}>{cat}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                {items.map(item=>(
                  <button key={item} onClick={()=>{ onSelect(item); onClose(); }} className="uml-pill-btn"
                    style={{ padding:"6px 13px", borderRadius:"20px", border:`1px solid ${T.cardBorder}`, background:T.inputBg, color:T.subText, fontSize:"12px", fontWeight:"600", cursor:"pointer" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="#2a8a5a"; e.currentTarget.style.color="#2a8a5a"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.cardBorder; e.currentTarget.style.color=T.subText; }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(filtered).length===0 && (
            <div style={{ textAlign:"center", padding:"32px 0", color:T.mutedText, fontSize:"14px" }}>
              <MI name="search_off" size={36} color={T.mutedText} style={{ display:"block", margin:"0 auto 10px" }} />
              No industries match "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN HOME PAGE ─────────────── */
export default function HomePage() {
  const [dark, setDark] = useState(false);
  const T = makeTheme(dark);

  const [query, setQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState(null);
  const [sortBy, setSortBy] = useState("followers"); // followers | rating | projects
  const [loading, setLoading] = useState(false);
  const [displayPeople, setDisplayPeople] = useState(PEOPLE);
  const [viewPerson, setViewPerson] = useState(null);
  const [showIndustryModal, setShowIndustryModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef(null);

  /* ── search + filter logic ── */
  const results = useMemo(() => {
    let list = PEOPLE;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.industry.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.bio.toLowerCase().includes(q)
      );
    }
    if (activeIndustry) {
      list = list.filter(p => p.industry.toLowerCase().includes(activeIndustry.toLowerCase()) || p.role.toLowerCase().includes(activeIndustry.toLowerCase()));
    }
    list = [...list].sort((a,b) => b[sortBy] - a[sortBy]);
    return list;
  }, [query, activeIndustry, sortBy]);

  /* Simulate loading on search change */
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => { setDisplayPeople(results); setLoading(false); }, 380);
    return () => clearTimeout(t);
  }, [results]);

  const clearSearch = () => { setQuery(""); setActiveIndustry(null); inputRef.current?.focus(); };

  const hasFilter = query.trim() || activeIndustry;

  return (
    <div style={{ minHeight:"100vh", background:T.bodyBg, fontFamily:"'DM Sans',sans-serif", color:T.text }}>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:T.navBg, borderBottom:`1px solid ${T.navBorder}`, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}>
        <div style={{ maxWidth:"520px", margin:"0 auto", padding:"0 16px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:32, height:32, borderRadius:"10px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 14px rgba(42,138,90,0.35)" }}>
              <MI name="link" size={18} color="#fff" />
            </div>
            <span className="uml-logo-text" style={{ fontFamily:"'Playfair Display',serif", fontWeight:"800", color:T.white }}>UMLinked</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <button onClick={()=>setDark(d=>!d)} style={{ background:T.inputBg, border:`1px solid ${T.inputBorder}`, borderRadius:"10px", padding:"6px 8px", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", color:T.subText, fontSize:"12px", fontWeight:"600" }}>
              <MI name={dark?"light_mode":"dark_mode"} size={17} color={T.subText} />
            </button>
            <button style={{ background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"10px", padding:"7px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"5px", color:"#fff", fontSize:"12px", fontWeight:"700", boxShadow:"0 3px 12px rgba(42,138,90,0.28)" }}>
              <MI name="person_add" size={15} color="#fff" /> Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ maxWidth:"520px", margin:"0 auto", padding:"32px 16px 0" }}>
        <div className="uml-fade-up" style={{ marginBottom:"24px", textAlign:"center" }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(26px,7vw,36px)", fontWeight:"900", color:T.white, margin:0, lineHeight:1.15 }}>
            Discover <span style={{ color:"#2a8a5a" }}>Talent</span> &amp; Professionals
          </h1>
          <p style={{ fontSize:"14px", color:T.subText, marginTop:"10px", lineHeight:1.6, maxWidth:"360px", margin:"10px auto 0" }}>
            Search by name, username, profession or industry to find the right people.
          </p>
        </div>

        {/* ── SEARCH BOX ── */}
        <div className="uml-fade-up" style={{ animationDelay:"60ms", marginBottom:"16px" }}>
          <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
            <MI name="search" size={20} color={query ? T.green : T.mutedText} style={{ position:"absolute", left:"15px", flexShrink:0, zIndex:1, transition:"color 0.2s" }} />
            <input ref={inputRef}
              className="uml-input-focus"
              value={query}
              onChange={e=>setQuery(e.target.value)}
              placeholder="Search name, @handle, profession, industry…"
              style={{ width:"100%", paddingLeft:"46px", paddingRight:query?"44px":"16px", paddingTop:"14px", paddingBottom:"14px", background:T.dark?"rgba(255,255,255,0.06)":"#fff", border:`1.5px solid ${query?T.green:T.inputBorder}`, borderRadius:"16px", fontSize:"15px", color:T.text, fontFamily:"'DM Sans',sans-serif", boxShadow:query?"0 0 0 3px rgba(42,138,90,0.1)":"none", transition:"border-color .2s,box-shadow .2s" }} />
            {query && (
              <button className="uml-clear-btn" onClick={clearSearch} style={{ position:"absolute", right:"12px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", padding:"4px" }}>
                <MI name="cancel" size={20} color={T.mutedText} />
              </button>
            )}
          </div>
        </div>

        {/* ── QUICK FILTERS ROW ── */}
        <div className="uml-fade-up" style={{ animationDelay:"100ms", marginBottom:"14px" }}>
          <div style={{ display:"flex", gap:"8px", overflowX:"auto", paddingBottom:"6px", scrollbarWidth:"none" }}>
            <IndustryPill label="All" active={!activeIndustry} T={T} onClick={()=>setActiveIndustry(null)} />
            {TRENDING.map(ind=>(
              <IndustryPill key={ind} label={ind} active={activeIndustry===ind} T={T} onClick={()=>setActiveIndustry(activeIndustry===ind?null:ind)} />
            ))}
            <button onClick={()=>setShowIndustryModal(true)} className="uml-pill-btn"
              style={{ padding:"7px 14px", borderRadius:"20px", border:`1px solid ${T.cardBorder}`, background:T.inputBg, color:T.subText, fontSize:"12px", fontWeight:"600", cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:"5px", flexShrink:0 }}>
              <MI name="tune" size={14} color={T.subText} /> More
            </button>
          </div>
        </div>

        {/* ── RESULTS HEADER ── */}
        <div className="uml-fade-up" style={{ animationDelay:"130ms", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
          <div>
            {hasFilter ? (
              <span style={{ fontSize:"13px", color:T.subText }}>
                <span style={{ fontWeight:"700", color:T.white }}>{loading ? "…" : displayPeople.length}</span> result{displayPeople.length!==1?"s":""}
                {activeIndustry && <span> in <span style={{ color:T.green, fontWeight:"600" }}>{activeIndustry}</span></span>}
                {query && <span> for <span style={{ color:T.green, fontWeight:"600" }}>"{query}"</span></span>}
              </span>
            ) : (
              <span style={{ fontSize:"13px", color:T.subText }}>
                <span style={{ fontWeight:"700", color:T.white }}>{loading ? "…" : displayPeople.length}</span> professionals
              </span>
            )}
          </div>
          {/* Sort */}
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <span style={{ fontSize:"11px", color:T.mutedText, fontWeight:"600" }}>Sort:</span>
            {[["followers","People"],["rating","Rating"],["projects","Projects"]].map(([val,lbl])=>(
              <button key={val} onClick={()=>setSortBy(val)} className="uml-pill-btn"
                style={{ padding:"4px 10px", borderRadius:"20px", border:`1px solid ${sortBy===val?T.green:T.cardBorder}`, background:sortBy===val?"linear-gradient(135deg,#2a8a5a,#1e6b44)":T.inputBg, color:sortBy===val?"#fff":T.subText, fontSize:"11px", fontWeight:"600", cursor:"pointer" }}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* ── ACTIVE FILTER CHIP ── */}
        {activeIndustry && (
          <div className="uml-fade-up" style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"6px", background:T.tagBg, border:`1px solid ${T.tagBorder}`, borderRadius:"20px", padding:"5px 12px" }}>
              <MI name="business_center" size={13} color={T.green} />
              <span style={{ fontSize:"12px", color:T.green, fontWeight:"600" }}>{activeIndustry}</span>
              <button onClick={()=>setActiveIndustry(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:"0", display:"flex", lineHeight:1 }}>
                <MI name="close" size={14} color={T.green} />
              </button>
            </div>
          </div>
        )}

        {/* ── GRID ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"14px", paddingBottom:"40px" }}>
          {loading ? (
            Array.from({length:4}).map((_,i)=><SkeletonCard key={i} T={T} />)
          ) : displayPeople.length === 0 ? (
            <div style={{ textAlign:"center", padding:"48px 16px", gridColumn:"1/-1" }}>
              <MI name="search_off" size={48} color={T.mutedText} style={{ display:"block", margin:"0 auto 12px" }} />
              <div style={{ fontSize:"16px", fontWeight:"700", color:T.white, marginBottom:"6px" }}>No results found</div>
              <div style={{ fontSize:"13px", color:T.mutedText, marginBottom:"20px" }}>
                Try a different name, handle, profession, or industry.
              </div>
              <button onClick={clearSearch} style={{ padding:"10px 24px", background:"linear-gradient(135deg,#2a8a5a,#1e6b44)", border:"none", borderRadius:"12px", color:"#fff", fontSize:"13px", fontWeight:"700", cursor:"pointer", boxShadow:"0 4px 16px rgba(42,138,90,0.25)" }}>
                Clear Search
              </button>
            </div>
          ) : (
            displayPeople.map((p, i) => (
              <PersonCard key={p.id} person={p} T={T} onView={setViewPerson} animDelay={i * 45} />
            ))
          )}
        </div>
      </div>

      {/* ── PROFILE MODAL ── */}
      {viewPerson && <ProfileModal person={viewPerson} T={T} onClose={()=>setViewPerson(null)} />}

      {/* ── INDUSTRY BROWSER MODAL ── */}
      {showIndustryModal && <IndustryModal T={T} onSelect={setActiveIndustry} onClose={()=>setShowIndustryModal(false)} />}
    </div>
  );
    }

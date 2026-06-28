import { useState, useEffect, useCallback } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  bg:      "#0A0A0A",
  surface: "#141414",
  card:    "#1E1E1E",
  border:  "#2C2C2C",
  red:     "#C0111A",
  redD:    "#8B0D13",
  gold:    "#F2B807",
  goldD:   "#B8890A",
  white:   "#F5F5F5",
  grey:    "#888",
  greyL:   "#555",
  green:   "#22C55E",
  blue:    "#3B82F6",
};

const WA_NUMBER = "51969179450"; // Peru country code + number

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_MENU = [
  // Hamburguesas
  { id: 1, cat: "Hamburguesas", name: "Hamburguesa Clásica",    price: 4.00,  desc: "San Fernando + Papas + Ensalada",                        active: true,  emoji: "🍔" },
  { id: 2, cat: "Hamburguesas", name: "Hamburguesa Montada",    price: 5.00,  desc: "San Fernando + Huevo + Papas + Ensalada",                 active: true,  emoji: "🍔" },
  { id: 3, cat: "Hamburguesas", name: "Cheeseburger Clásica",   price: 8.50,  desc: "125g Carne + Queso Cheddar + Papas + Ensalada",           active: true,  emoji: "🍔" },
  { id: 4, cat: "Hamburguesas", name: "BBQ Burger",             price: 10.50, desc: "125g Carne + Tocino + Queso Cheddar + Papas + Ensalada",  active: true,  emoji: "🍔" },
  { id: 5, cat: "Hamburguesas", name: "Burger Hawaiiana",       price: 14.00, desc: "250g Carne + Piña + Salsa BBQ + Jamón + Queso + Papas",   active: true,  emoji: "🍔" },
  { id: 6, cat: "Hamburguesas", name: "Burger de Infarto",      price: 18.00, desc: "500g Carne + Broaster + Tocino + Queso + Papas",          active: true,  emoji: "🍔" },
  { id: 7, cat: "Hamburguesas", name: "Burger Parrillera",      price: 15.00, desc: "250g Carne + Chorizo + Chimichurri + Papas",              active: false, emoji: "🍔" },
  { id: 8, cat: "Hamburguesas", name: "Doble Clásica",          price: 10.00, desc: "2 Hamburguesas + Salsa Tocino + Queso + Papas + Aros",    active: true,  emoji: "🍔" },
  // Broasters
  { id: 9,  cat: "Broasters", name: "Broaster Clásico",         price: 8.50,  desc: "1 Broaster + Papas Fritas + Refresco",                   active: true,  emoji: "🍗" },
  { id: 10, cat: "Broasters", name: "Broaster con Chaufa",      price: 9.50,  desc: "1 Broaster + Papas + Chaufa + Refresco",                 active: true,  emoji: "🍗" },
  { id: 11, cat: "Broasters", name: "Salchi-Broaster con Chaufa", price: 10.00, desc: "Broaster + Papas + Salchichas + Chaufa + Refresco",    active: true,  emoji: "🍗" },
  { id: 12, cat: "Broasters", name: "Broaster para Dos",        price: 16.00, desc: "2 Broaster + Papas + Refresco",                          active: true,  emoji: "🍗" },
  { id: 13, cat: "Broasters", name: "Broaster Chaufero",        price: 18.00, desc: "2 Broaster + Papas + Chaufa + Refresco",                 active: true,  emoji: "🍗" },
  { id: 14, cat: "Broasters", name: "Broaster con Salsa",       price: 11.00, desc: "1 Broaster + Papas + Refresco + Salsa Picante o Dulce",  active: true,  emoji: "🍗" },
  { id: 15, cat: "Broasters", name: "Broaster Parrillero",      price: 18.00, desc: "Broaster + Chorizo + Papas + Refresco + Chimichurri",    active: false, emoji: "🍗" },
  { id: 16, cat: "Broasters", name: "Broaster Parrilla Ficho",  price: 20.00, desc: "Broaster + Chorizo + Chifles + Papas Nativas + Ají",     active: true,  emoji: "🍗" },
  // Alitas
  { id: 17, cat: "Alitas", name: "Alitas BBQ",                  price: 12.00, desc: "4 Porciones + Papas Fritas + Salchicha",                 active: true,  emoji: "🔥" },
  { id: 18, cat: "Alitas", name: "Alitas Picantes",             price: 13.00, desc: "4 Porciones + Papas Fritas + Salchicha",                 active: true,  emoji: "🔥" },
  { id: 19, cat: "Alitas", name: "Alitas Acevichadas",          price: 14.00, desc: "4 Porciones + Papas Fritas + Salchicha",                 active: true,  emoji: "🔥" },
  { id: 20, cat: "Alitas", name: "Alitas a la Maracuya",        price: 14.00, desc: "4 Porciones + Papas Fritas + Salchicha",                 active: true,  emoji: "🔥" },
  { id: 21, cat: "Alitas", name: "Alitas con Mango",            price: 15.00, desc: "4 Porciones + Papas Fritas + Salchicha",                 active: true,  emoji: "🔥" },
  { id: 22, cat: "Alitas", name: "Alitas Búfalo",               price: 15.00, desc: "4 Porciones + Papas Fritas + Salchicha",                 active: true,  emoji: "🔥" },
  { id: 23, cat: "Alitas", name: "Alitas Extra Grande BBQ",     price: 30.00, desc: "10 Porciones + Papas Fritas + Salchicha",                active: true,  emoji: "🔥" },
  // Conos
  { id: 24, cat: "Conos", name: "Salchipapa Clásica",           price: 8.00,  desc: "Papas Fritas + Salchicha + Gaseosa",                     active: true,  emoji: "🍟" },
  { id: 25, cat: "Conos", name: "Salchi-Revuelto",              price: 9.00,  desc: "Papas + Huevo + Salchicha + Gaseosa",                    active: true,  emoji: "🍟" },
  { id: 26, cat: "Conos", name: "Salchi-Pollo",                 price: 10.00, desc: "Pollo Deshilachado + Papas + Salchicha + Gaseosa",        active: true,  emoji: "🍟" },
  { id: 27, cat: "Conos", name: "Salchipapa Especial",          price: 12.00, desc: "Papas + Chorizo + Salchicha + Queso Gratinado + Gaseosa", active: true,  emoji: "🍟" },
  { id: 28, cat: "Conos", name: "Cono Chino",                   price: 12.00, desc: "Pollo + Chorizo + Salchicha + Gaseosa",                   active: true,  emoji: "🍟" },
  { id: 29, cat: "Conos", name: "Cono Acevichada",              price: 13.50, desc: "Papas + Chorizo + 2 Alitas + Salchicha + Gaseosa",        active: true,  emoji: "🍟" },
  // Pechugas
  { id: 30, cat: "Pechugas", name: "Pechuga Clásica",           price: 17.00, desc: "Pechuga + Papas Fritas + Ensalada + Refresco",            active: true,  emoji: "🍽️" },
  { id: 31, cat: "Pechugas", name: "Pechuga con Chimichurri",   price: 18.00, desc: "Pechuga + Papas Fritas + Ensalada + Refresco",            active: true,  emoji: "🍽️" },
  { id: 32, cat: "Pechugas", name: "Pechuga a la Pachamanca",   price: 20.00, desc: "Pechuga + Papas + Palta + Ensalada + Refresco",           active: true,  emoji: "🍽️" },
  { id: 33, cat: "Pechugas", name: "Pechuga a la BBQ",          price: 19.00, desc: "Pechuga + Papas + Chorizo + Ensalada + Refresco",         active: true,  emoji: "🍽️" },
  // Combinados
  { id: 34, cat: "Combinados", name: "Chaufa de Pollo",         price: 8.00,  desc: "Arroz chaufa con pollo",                                  active: true,  emoji: "🍱" },
  { id: 35, cat: "Combinados", name: "Chaufa con Salchicha",    price: 12.00, desc: "Chaufa especial con salchichas",                          active: true,  emoji: "🍱" },
  { id: 36, cat: "Combinados", name: "Lomo Saltado de Pollo",   price: 9.00,  desc: "Pollo saltado al estilo peruano",                         active: true,  emoji: "🍱" },
  { id: 37, cat: "Combinados", name: "Chaufa Mixto",            price: 15.00, desc: "Chaufa combinado especial",                               active: true,  emoji: "🍱" },
  { id: 38, cat: "Combinados", name: "Aeropuerto",              price: 10.00, desc: "Combinación especial de la casa",                         active: true,  emoji: "🍱" },
  // Bebidas
  { id: 40, cat: "Bebidas", name: "Gaseosa Pequeña",            price: 1.50,  desc: "Gaseosa 300ml de tu elección",                           active: true,  emoji: "🥤" },
  { id: 41, cat: "Bebidas", name: "Café Americano",             price: 3.00,  desc: "Café negro americano",                                    active: true,  emoji: "☕" },
  { id: 42, cat: "Bebidas", name: "Café con Leche",             price: 5.00,  desc: "Café con leche cremosa",                                  active: true,  emoji: "☕" },
  { id: 43, cat: "Bebidas", name: "Mates",                      price: 2.50,  desc: "Variedad de mates naturales",                             active: true,  emoji: "🍵" },
];

const INITIAL_PROMOS = [
  { id: 1, title: "Por S/ 1.50 llévate una gaseosa pequeña", desc: "Válido con cualquier pedido del día", active: true, color: "#C0111A" },
  { id: 2, title: "Combo Doble Broaster", desc: "2 Broasters + 2 Papas + 2 Refrescos · S/ 28.00", active: true, color: "#B8890A" },
  { id: 3, title: "Martes de Alitas", desc: "20% descuento en todas las alitas los martes", active: false, color: "#1D4ED8" },
];

const CATS = ["Hamburguesas", "Broasters", "Alitas", "Conos", "Pechugas", "Combinados", "Bebidas"];
const CAT_EMOJI = { Hamburguesas:"🍔", Broasters:"🍗", Alitas:"🔥", Conos:"🍟", Pechugas:"🍽️", Combinados:"🍱", Bebidas:"🥤" };

const VIP = [
  { name: "Bronce", min: 0,    max: 300,  color: "#CD7F32", icon: "🥉" },
  { name: "Plata",  min: 300,  max: 1000, color: "#A8A9AD", icon: "🥈" },
  { name: "Oro",    min: 1000, max: 2500, color: "#F2B807", icon: "👑" },
  { name: "Diamante", min: 2500, max: 99999, color: "#67E8F9", icon: "💎" },
];

const getLevel = (pts) => VIP.find(l => pts >= l.min && pts < l.max) || VIP[3];
const fmt = (n) => `S/ ${Number(n).toFixed(2)}`;
const nextId = (arr) => Math.max(0, ...arr.map(i => i.id)) + 1;

// ─── WHATSAPP HELPERS ─────────────────────────────────────────────────────────
const buildOrderMsg = (cart, payMethod, name, address, notes) => {
  const lines = cart.map(i => `  • ${i.qty}x ${i.name} — ${fmt(i.price * i.qty)}`).join("\n");
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const pts   = Math.floor(total);
  return encodeURIComponent(
`🔥 *CHINO BROASTER — NUEVO PEDIDO*

👤 *Cliente:* ${name || "Cliente"}
${address ? `📍 *Dirección:* ${address}\n` : ""}
🛒 *Pedido:*
${lines}

💰 *Total:* ${fmt(total)}
💳 *Pago:* ${payMethod}
⭐ *Puntos que ganará:* +${pts} pts
${notes ? `\n📝 *Notas:* ${notes}` : ""}

_Enviado desde Chino Broaster App_`
  );
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html,body,#root{height:100%;}
body{background:#050505;min-height:100vh;font-family:'Poppins',sans-serif;display:flex;align-items:flex-start;justify-content:center;padding:0;}

/* ── En móvil real: fullscreen ── */
@media (max-width:480px){
  body{padding:0;}
  .shell{width:100vw!important;min-height:100dvh!important;max-height:100dvh!important;border-radius:0!important;box-shadow:none!important;}
  .notch{display:none!important;}
  .sbar{display:none!important;}
  .mode-switch{top:8px;right:8px;}
}

/* ── En escritorio: shell de teléfono ── */
@media (min-width:481px){
  body{padding:20px 12px 40px;align-items:flex-start;}
  .shell{width:390px;min-height:844px;max-height:900px;}
}

/* ── phone shell ── */
.shell{background:${T.bg};border-radius:44px;overflow:hidden;position:relative;box-shadow:0 0 0 9px #1a1a1a,0 0 0 11px #2a2a2a,0 40px 90px rgba(0,0,0,.95),0 0 80px rgba(192,17,26,.12);display:flex;flex-direction:column;}
.notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:110px;height:28px;background:#000;border-radius:0 0 18px 18px;z-index:200;}

/* ── status bar ── */
.sbar{display:flex;justify-content:space-between;align-items:center;padding:14px 24px 6px;flex-shrink:0;position:relative;z-index:10;}
.sbar-time{color:${T.white};font-size:15px;font-weight:700;}
.sbar-icons{display:flex;gap:4px;align-items:center;color:${T.white};font-size:12px;}

/* ── scroll ── */
.scroll{flex:1;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;}
.scroll::-webkit-scrollbar{display:none;}

/* ── bottom nav ── */
.bnav{display:flex;background:${T.surface};border-top:1px solid ${T.border};padding:6px 0 18px;flex-shrink:0;position:relative;z-index:100;}
.bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px;cursor:pointer;border:none;background:none;transition:.15s;}
.bnav-icon{font-size:20px;line-height:1;}
.bnav-label{font-size:9px;color:${T.grey};font-family:'Poppins',sans-serif;font-weight:500;}
.bnav-item.act .bnav-label{color:${T.red};}
.bnav-qr{flex:1;display:flex;flex-direction:column;align-items:center;cursor:pointer;border:none;background:none;position:relative;top:-20px;}
.bnav-qr-ring{width:60px;height:60px;border-radius:50%;background:${T.gold};display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 4px 24px rgba(242,184,7,.5);}
.bnav-qr-label{font-size:9px;color:${T.gold};font-family:'Poppins',sans-serif;font-weight:700;margin-top:2px;}

/* ── cards ── */
.card{background:${T.card};border:1px solid ${T.border};border-radius:18px;padding:16px;}

/* ── buttons ── */
.btn-red{background:${T.red};color:#fff;border:none;border-radius:12px;padding:14px;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;cursor:pointer;width:100%;transition:.15s;letter-spacing:.3px;}
.btn-red:active{transform:scale(.98);background:${T.redD};}
.btn-gold{background:${T.gold};color:#000;border:none;border-radius:12px;padding:12px;font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:.15s;}
.btn-gold:active{transform:scale(.97);}
.btn-outline{background:transparent;color:${T.gold};border:1.5px solid ${T.gold};border-radius:12px;padding:11px 16px;font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;cursor:pointer;}
.btn-ghost{background:transparent;border:none;cursor:pointer;font-family:'Poppins',sans-serif;}

/* ── input ── */
.inp{background:${T.card};border:1.5px solid ${T.border};border-radius:12px;padding:12px 14px;color:${T.white};font-family:'Poppins',sans-serif;font-size:14px;width:100%;outline:none;transition:.15s;}
.inp:focus{border-color:${T.gold};}
.inp::placeholder{color:${T.grey};}
textarea.inp{resize:vertical;min-height:72px;}
select.inp{appearance:none;cursor:pointer;}

/* ── badge ── */
.badge{position:absolute;top:-4px;right:-4px;background:${T.red};color:#fff;width:18px;height:18px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;}

/* ── toast ── */
.toast{position:fixed;bottom:110px;left:50%;transform:translateX(-50%);background:${T.green};color:#fff;padding:11px 20px;border-radius:12px;font-size:13px;font-weight:600;z-index:999;white-space:nowrap;animation:slideUp .25s ease;box-shadow:0 4px 20px rgba(34,197,94,.4);}
@keyframes slideUp{from{transform:translateX(-50%) translateY(16px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}

/* ── tag ── */
.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
.progress-track{background:${T.border};border-radius:20px;height:7px;overflow:hidden;}
.progress-fill{height:100%;border-radius:20px;background:linear-gradient(90deg,${T.goldD},${T.gold});transition:width .6s cubic-bezier(.4,0,.2,1);}

/* ── chip ── */
.chip{padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid ${T.border};background:transparent;color:${T.grey};font-family:'Poppins',sans-serif;white-space:nowrap;transition:.15s;flex-shrink:0;}
.chip.act{background:${T.red};border-color:${T.red};color:#fff;}

/* ── floating cart ── */
.fcart{position:absolute;bottom:88px;left:16px;right:16px;background:${T.red};border-radius:16px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;z-index:50;box-shadow:0 8px 28px rgba(192,17,26,.5);animation:slideUp .3s ease;}

/* ── admin switch ── */
.mode-switch{position:fixed;top:16px;right:16px;z-index:1000;display:flex;gap:6px;}
.mode-btn{padding:8px 14px;border-radius:20px;border:1.5px solid ${T.border};font-family:'Poppins',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:.15s;backdrop-filter:blur(10px);}
.mode-btn.act{background:${T.red};border-color:${T.red};color:#fff;}
.mode-btn:not(.act){background:rgba(20,20,20,.9);color:${T.grey};}

/* ── admin panel ── */
.admin-wrap{width:390px;background:${T.bg};border-radius:44px;overflow:hidden;box-shadow:0 0 0 9px #1a1a1a,0 0 0 11px #2a2a2a,0 40px 90px rgba(0,0,0,.95);display:flex;flex-direction:column;min-height:844px;}
.admin-header{background:${T.surface};padding:18px 20px 14px;border-bottom:1px solid ${T.border};flex-shrink:0;}
.admin-tabs{display:flex;gap:4px;background:${T.card};border-radius:12px;padding:4px;}
.atab{flex:1;padding:8px 4px;border-radius:9px;border:none;font-family:'Poppins',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:.15s;background:transparent;color:${T.grey};}
.atab.act{background:${T.red};color:#fff;}

/* ── order card ── */
.order-card{background:${T.card};border:1px solid ${T.border};border-radius:16px;padding:14px;margin-bottom:10px;}
.order-status{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}

/* ── toggle switch ── */
.toggle{position:relative;width:42px;height:24px;flex-shrink:0;}
.toggle input{opacity:0;width:0;height:0;}
.toggle-track{position:absolute;inset:0;background:${T.border};border-radius:12px;cursor:pointer;transition:.2s;}
.toggle input:checked + .toggle-track{background:${T.red};}
.toggle-track::before{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:#fff;top:3px;left:3px;transition:.2s;}
.toggle input:checked + .toggle-track::before{transform:translateX(18px);}

/* ── modal overlay ── */
.modal-bg{position:absolute;inset:0;background:rgba(0,0,0,.8);z-index:500;display:flex;align-items:flex-end;}
.modal-sheet{background:${T.surface};border-radius:24px 24px 0 0;padding:20px;width:100%;max-height:85%;overflow-y:auto;}
.modal-handle{width:40px;height:4px;background:${T.border};border-radius:2px;margin:0 auto 16px;}

/* ── qr grid ── */
.qr-grid{display:grid;grid-template-columns:repeat(11,1fr);gap:1.5px;padding:12px;}
`;

// ─── QR COMPONENT ─────────────────────────────────────────────────────────────
const QR_SEED = [1,1,1,1,1,1,1,0,1,0,1,1,0,0,0,1,0,1,0,1,1,0,1,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,0,0,1,1,0,1,0,1,0,1,0,1,1,0,0,1,1,1,0,0,1,0,1,0,1,1,0,1,0,0,0,1,0,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,0,0,1,0,0,1,1,1];
function QRBlock({ size = 160 }) {
  return (
    <div style={{ width: size, height: size, background: "#fff", borderRadius: 12, display: "grid", gridTemplateColumns: "repeat(11,1fr)", gap: 1.5, padding: 12 }}>
      {QR_SEED.map((c, i) => <div key={i} style={{ background: c ? "#0A0A0A" : "transparent", borderRadius: 1 }} />)}
    </div>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

// ─── STATUS CHIP ─────────────────────────────────────────────────────────────
const STATUS_META = {
  "Nuevo":      { bg: "#1E3A5F", color: "#60A5FA", dot: "#3B82F6" },
  "Preparando": { bg: "#3B1F00", color: "#FBBF24", dot: "#F59E0B" },
  "En Reparto": { bg: "#1A2E1A", color: "#4ADE80", dot: "#22C55E" },
  "Entregado":  { bg: "#1A1A3E", color: "#A78BFA", dot: "#8B5CF6" },
  "Cancelado":  { bg: "#2A0A0A", color: "#F87171", dot: "#EF4444" },
};
function StatusChip({ status }) {
  const m = STATUS_META[status] || STATUS_META["Nuevo"];
  return (
    <span className="order-status" style={{ background: m.bg, color: m.color }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.dot, display: "inline-block" }} />
      {status}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// CLIENT APP SCREENS
// ════════════════════════════════════════════════════════════════════════════

// ── SPLASH ──────────────────────────────────────────────────────────────────
function SplashScreen({ onLogin, onRegister }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "linear-gradient(180deg,#1a0000 0%,#0A0A0A 55%)", padding: "0 24px 32px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{ fontSize: 72, lineHeight: 1, filter: "drop-shadow(0 0 24px rgba(192,17,26,.5))" }}>🔥</div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div style={{ fontSize: 40, fontWeight: 900, color: T.red, letterSpacing: -1, lineHeight: 1 }}>CHINO</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.gold, letterSpacing: 7, lineHeight: 1.3 }}>BROASTER</div>
        </div>
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.white }}>CHINO CLUB <span style={{ color: T.gold }}>REWARDS</span></div>
          <div style={{ color: T.grey, fontSize: 13, marginTop: 6 }}>Mientras más comes, más ganas 🔥</div>
        </div>
        <div style={{ marginTop: 32, width: "100%", background: T.card, borderRadius: 20, border: `1px solid ${T.border}`, padding: 18, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${T.gold},${T.goldD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>👑</div>
          <div>
            <div style={{ color: T.gold, fontWeight: 700, fontSize: 14 }}>Acumula puntos en cada compra</div>
            <div style={{ color: T.grey, fontSize: 12, marginTop: 2 }}>S/1 gastado = 1 punto de recompensa</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <button className="btn-red" onClick={onLogin}>INICIAR SESIÓN</button>
        <button className="btn-outline" style={{ width: "100%" }} onClick={onRegister}>REGISTRARME GRATIS</button>
        <div style={{ textAlign: "center", color: T.grey, fontSize: 11, marginTop: 2 }}>
          Al continuar aceptas nuestros <span style={{ color: T.gold }}>Términos y Condiciones</span>
        </div>
      </div>
    </div>
  );
}

// ── REGISTER ─────────────────────────────────────────────────────────────────
function RegisterScreen({ onBack, onSuccess }) {
  const [f, setF] = useState({ nombre: "", celular: "", fecha: "" });
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <button className="btn-ghost" onClick={onBack} style={{ color: T.white, fontSize: 22 }}>←</button>
        <span style={{ color: T.white, fontWeight: 700, fontSize: 16 }}>Crear Cuenta</span>
      </div>
      <div className="scroll" style={{ padding: "20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 44 }}>🎉</div>
          <div style={{ color: T.white, fontWeight: 700, fontSize: 18, marginTop: 8 }}>¡Únete al Club!</div>
          <div style={{ color: T.grey, fontSize: 13 }}>Regístrate y empieza a ganar puntos hoy</div>
        </div>
        {[["NOMBRE COMPLETO","Tu nombre completo","nombre","text"],["CELULAR","999 999 999","celular","tel"],["FECHA DE CUMPLEAÑOS","DD/MM/AAAA","fecha","text"]].map(([lbl,ph,key,type]) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <div style={{ color: T.grey, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>{lbl}</div>
            <input className="inp" placeholder={ph} type={type} value={f[key]} onChange={e => setF({...f,[key]:e.target.value})} />
            {key==="fecha" && <div style={{ color: T.grey, fontSize: 11, marginTop: 4 }}>🎂 Te enviamos un regalo especial en tu cumpleaños</div>}
          </div>
        ))}
        <div style={{ background: "#0d1f06", border: "1px solid #2d4a0f", borderRadius: 12, padding: "12px 14px", marginBottom: 18, display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 20 }}>🎁</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#7ec850", fontSize: 12, fontWeight: 700 }}>Código de Referido (opcional)</div>
            <input className="inp" placeholder="Ej: ABC123" style={{ marginTop: 6, padding: "8px 12px", fontSize: 13 }} />
          </div>
        </div>
        <button className="btn-red" onClick={() => f.nombre && f.celular && onSuccess(f)}>CREAR MI CUENTA GRATIS</button>
        <div style={{ textAlign: "center", color: T.grey, fontSize: 12, marginTop: 14 }}>
          ¿Ya tienes cuenta? <span style={{ color: T.gold, fontWeight: 600, cursor: "pointer" }} onClick={onBack}>Inicia sesión</span>
        </div>
      </div>
    </div>
  );
}

// ── HOME ─────────────────────────────────────────────────────────────────────
function HomeScreen({ user, cart, promos, onNav, menuItems }) {
  const lvl = getLevel(user.pts);
  const next = VIP[VIP.indexOf(lvl) + 1];
  const progress = next ? (user.pts - lvl.min) / (next.min - lvl.min) : 1;
  const activePromos = promos.filter(p => p.active);
  const cats = CATS.filter(c => menuItems.some(m => m.cat === c && m.active));

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Hero header */}
      <div style={{ background: "linear-gradient(180deg,#1a0000 0%,#0A0A0A 100%)", padding: "6px 18px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900 }}>
            <span style={{ color: T.red }}>CHINO </span>
            <span style={{ color: T.gold, fontSize: 15, fontStyle: "italic" }}>Broaster</span>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onNav("pedidos")}>
              <span style={{ fontSize: 22 }}>🛒</span>
              {cart.length > 0 && <div className="badge">{cart.reduce((a,b)=>a+b.qty,0)}</div>}
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 22 }}>🔔</span>
              <div className="badge">2</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 10, paddingBottom: 14 }}>
          <div style={{ color: T.grey, fontSize: 13 }}>🔥 ¡Hola, {user.nombre}!</div>
          <div style={{ color: T.white, fontWeight: 800, fontSize: 19 }}>Bienvenido al club</div>
          <div style={{ color: T.grey, fontSize: 12 }}>Mientras más comes, más ganas 🔥</div>
        </div>
      </div>

      <div className="scroll" style={{ padding: "0 14px 14px" }}>
        {/* Points card */}
        <div className="card" style={{ marginBottom: 14, border: `1px solid ${T.gold}22`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 120, height: 120, background: `${T.gold}06`, borderRadius: "50%" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: T.gold, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>MIS PUNTOS</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 3 }}>
                <span style={{ color: T.white, fontSize: 38, fontWeight: 900, lineHeight: 1 }}>{user.pts}</span>
                <span style={{ color: T.gold, fontSize: 14 }}>⭐</span>
              </div>
              <div style={{ color: T.grey, fontSize: 12 }}>≈ S/ {(user.pts * 0.01).toFixed(2)} en descuentos</div>
              <button onClick={() => onNav("nivel")} style={{ background: "none", border: `1px solid ${T.gold}`, borderRadius: 20, color: T.gold, fontSize: 11, fontWeight: 600, padding: "4px 12px", marginTop: 8, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>Ver mi nivel →</button>
            </div>
            <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid ${lvl.color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `${lvl.color}18`, flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>{lvl.icon}</span>
              <span style={{ color: lvl.color, fontSize: 9, fontWeight: 800 }}>NIVEL</span>
              <span style={{ color: lvl.color, fontSize: 11, fontWeight: 900 }}>{lvl.name.toUpperCase()}</span>
            </div>
          </div>
          {next && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ color: T.grey, fontSize: 10 }}>{user.pts} pts</span>
                <span style={{ color: T.red, fontSize: 10, fontWeight: 700 }}>{next.min - user.pts} pts para {next.name}</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${progress * 100}%` }} /></div>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[{icon:"📱",label:"Mi QR",tab:"qr"},{icon:"🎁",label:"Premios",tab:"rewards"},{icon:"%",label:"Promos",tab:null},{icon:"👥",label:"Referir",tab:null}].map(({icon,label,tab}) => (
            <button key={label} onClick={() => tab && onNav(tab)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "11px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: T.grey, fontSize: 9, fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Promo banners */}
        {activePromos.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {activePromos.map(p => (
              <div key={p.id} style={{ background: `linear-gradient(135deg,${p.color} 0%,${p.color}88 100%)`, borderRadius: 16, padding: "14px 18px", marginBottom: 8, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => onNav("menu")}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>{p.title}</div>
                  <div style={{ color: "rgba(255,255,255,.75)", fontSize: 11, marginTop: 4 }}>{p.desc}</div>
                </div>
                <span style={{ color: "#fff", fontSize: 22, opacity: .8 }}>›</span>
              </div>
            ))}
          </div>
        )}

        {/* Categories */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ color: T.white, fontWeight: 700, fontSize: 15 }}>NUESTRO MENÚ</span>
          <span style={{ color: T.gold, fontSize: 13, cursor: "pointer" }} onClick={() => onNav("menu")}>Ver todo →</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none", marginBottom: 14 }}>
          {cats.map(c => (
            <button key={c} onClick={() => onNav("menu")} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 14, padding: "10px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0, minWidth: 72, fontFamily: "Poppins,sans-serif" }}>
              <span style={{ fontSize: 26 }}>{CAT_EMOJI[c]}</span>
              <span style={{ color: T.grey, fontSize: 9, fontWeight: 600, textAlign: "center" }}>{c}</span>
            </button>
          ))}
        </div>

        {/* Whatsapp CTA */}
        <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("¡Hola! Quiero hacer un pedido 🍔")}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          <div style={{ background: "#075E54", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
            <span style={{ fontSize: 28 }}>💬</span>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Pedir por WhatsApp</div>
              <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12 }}>969 179 450 — Respuesta inmediata</div>
            </div>
            <span style={{ color: "#fff", fontSize: 20, marginLeft: "auto" }}>›</span>
          </div>
        </a>
      </div>
    </div>
  );
}

// ── MENU ──────────────────────────────────────────────────────────────────────
function MenuScreen({ cart, onAdd, onNav, menuItems }) {
  const [cat, setCat] = useState("Hamburguesas");
  const [detail, setDetail] = useState(null);
  const cats = CATS.filter(c => menuItems.some(m => m.cat === c && m.active));
  const items = menuItems.filter(m => m.cat === cat && m.active);

  if (detail) return <ItemDetail item={detail} onBack={() => setDetail(null)} onAdd={(item) => { onAdd(item); setDetail(null); }} />;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <span style={{ color: T.white, fontWeight: 800, fontSize: 17 }}>MENÚ</span>
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onNav("pedidos")}>
          <span style={{ fontSize: 22 }}>🛒</span>
          {cart.length > 0 && <div className="badge">{cart.reduce((a,b)=>a+b.qty,0)}</div>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", overflowX: "auto", scrollbarWidth: "none", flexShrink: 0 }}>
        {cats.map(c => <button key={c} className={`chip ${cat===c?"act":""}`} onClick={() => setCat(c)}>{CAT_EMOJI[c]} {c}</button>)}
      </div>
      <div className="scroll" style={{ padding: "0 14px 14px" }}>
        {items.map(item => (
          <div key={item.id} onClick={() => setDetail(item)} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 8 }}>
            <div style={{ width: 54, height: 54, background: `${T.red}18`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: T.white, fontWeight: 700, fontSize: 14 }}>{item.name}</div>
              <div style={{ color: T.grey, fontSize: 11, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
              <div style={{ color: T.gold, fontWeight: 800, fontSize: 15, marginTop: 4 }}>{fmt(item.price)}</div>
            </div>
            <button onClick={e => { e.stopPropagation(); onAdd(item); }} style={{ width: 32, height: 32, borderRadius: "50%", background: T.red, border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</button>
          </div>
        ))}
        {items.length === 0 && <div style={{ textAlign: "center", color: T.grey, padding: "40px 0" }}>No hay productos disponibles en esta categoría</div>}
      </div>
      {cart.length > 0 && (
        <div className="fcart" onClick={() => onNav("pedidos")}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "rgba(255,255,255,.2)", borderRadius: 8, padding: "3px 10px", fontWeight: 700, fontSize: 13, color: "#fff" }}>{cart.reduce((a,b)=>a+b.qty,0)}</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Ver carrito</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>{fmt(cart.reduce((s,i)=>s+i.price*i.qty,0))}</span>
        </div>
      )}
    </div>
  );
}

// ── ITEM DETAIL ───────────────────────────────────────────────────────────────
function ItemDetail({ item, onBack, onAdd }) {
  const [qty, setQty] = useState(1);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
        <button className="btn-ghost" onClick={onBack} style={{ color: T.white, fontSize: 22 }}>←</button>
        <button className="btn-ghost" style={{ color: T.white, fontSize: 22 }}>♡</button>
      </div>
      <div className="scroll" style={{ padding: "0 18px 20px" }}>
        <div style={{ background: "linear-gradient(135deg,#2a0808,#1a0000)", borderRadius: 20, height: 170, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90, marginBottom: 18 }}>{item.emoji}</div>
        <div style={{ color: T.white, fontWeight: 800, fontSize: 20 }}>{item.name}</div>
        <div style={{ color: T.grey, fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{item.desc}</div>
        <div style={{ color: T.gold, fontWeight: 900, fontSize: 28, marginTop: 8 }}>{fmt(item.price)}</div>
        <div style={{ color: T.grey, fontSize: 12, marginTop: 4 }}>💫 Acumulas {Math.floor(item.price)} puntos en esta compra</div>
        {[["Agregar extras","Tocino +S/ 1.50","Huevo +S/ 1.00","Queso extra +S/ 1.50"]].map(([title,...extras]) => (
          <div key={title} style={{ marginTop: 18 }}>
            <div style={{ color: T.white, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>{title}</div>
            {extras.map(ex => (
              <div key={ex} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 20, height: 20, border: `1.5px solid ${T.grey}`, borderRadius: 4 }} />
                  <span style={{ color: T.grey, fontSize: 13 }}>{ex.split("+")[0]}</span>
                </div>
                <span style={{ color: T.grey, fontSize: 13 }}>+S/ {ex.split("+S/ ")[1]}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, background: T.card, borderRadius: 12, padding: "8px 14px", border: `1px solid ${T.border}` }}>
            <button onClick={() => setQty(Math.max(1,qty-1))} style={{ background: "none", border: "none", color: T.white, fontSize: 22, cursor: "pointer", fontFamily: "Poppins,sans-serif", lineHeight: 1 }}>−</button>
            <span style={{ color: T.white, fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: "center" }}>{qty}</span>
            <button onClick={() => setQty(qty+1)} style={{ background: "none", border: "none", color: T.white, fontSize: 22, cursor: "pointer", fontFamily: "Poppins,sans-serif", lineHeight: 1 }}>+</button>
          </div>
          <button className="btn-red" onClick={() => { for(let i=0;i<qty;i++) onAdd(item); }} style={{ flex: 1 }}>AGREGAR AL CARRITO</button>
        </div>
      </div>
    </div>
  );
}

// ── QR SCREEN ─────────────────────────────────────────────────────────────────
function QRScreen({ user, onBack }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <button className="btn-ghost" onClick={onBack} style={{ color: T.white, fontSize: 22 }}>←</button>
        <span style={{ color: T.white, fontWeight: 700, fontSize: 16 }}>MI CÓDIGO QR</span>
      </div>
      <div className="scroll" style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ color: T.grey, fontSize: 13, textAlign: "center", marginBottom: 24 }}>Muestra este código al pagar<br/>para acumular tus puntos</div>
        <div style={{ background: "#fff", borderRadius: 24, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <QRBlock size={190} />
          <div style={{ background: T.red, borderRadius: 8, padding: "3px 12px" }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>CHINO BROASTER</span>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <div style={{ color: T.white, fontWeight: 700, fontSize: 18 }}>{user.nombre}</div>
          <div style={{ color: T.grey, fontSize: 13 }}>{user.celular}</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${T.gold}20`, border: `1px solid ${T.gold}`, borderRadius: 20, padding: "5px 14px", marginTop: 10 }}>
            <span>{getLevel(user.pts).icon}</span>
            <span style={{ color: T.gold, fontWeight: 700, fontSize: 12 }}>Nivel {getLevel(user.pts).name} · {user.pts} pts</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", marginTop: 28 }}>
          <button className="btn-outline" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>📤 COMPARTIR QR</button>
          <button className="btn-gold" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>🔄 ACTUALIZAR QR</button>
        </div>
        <div style={{ color: T.grey, fontSize: 11, marginTop: 20, textAlign: "center" }}>🔒 Código cifrado único — se renueva automáticamente</div>
      </div>
    </div>
  );
}

// ── REWARDS SCREEN ────────────────────────────────────────────────────────────
const REWARDS = [
  { id:1,name:"Gaseosa Pequeña",pts:100,emoji:"🥤" },
  { id:2,name:"Papas Fritas Grandes",pts:150,emoji:"🍟" },
  { id:3,name:"Hamburguesa Clásica",pts:400,emoji:"🍔" },
  { id:4,name:"Broaster Clásico",pts:600,emoji:"🍗" },
  { id:5,name:"Doble Hamburguesa",pts:1000,emoji:"🍔" },
  { id:6,name:"Combo para Dos",pts:1500,emoji:"🎉" },
];
function RewardsScreen({ user, onClaim }) {
  const [claimed, setClaimed] = useState([]);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <span style={{ color: T.white, fontWeight: 800, fontSize: 17 }}>MIS RECOMPENSAS</span>
      </div>
      <div className="scroll" style={{ padding: "14px" }}>
        <div style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.gold}30`, padding: "14px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ color: T.gold, fontSize: 10, fontWeight: 700 }}>PUNTOS DISPONIBLES</div><div style={{ color: T.white, fontWeight: 900, fontSize: 30 }}>{user.pts} <span style={{ fontSize: 16, color: T.gold }}>pts</span></div></div>
          <div style={{ textAlign: "right" }}><div style={{ color: T.grey, fontSize: 11 }}>Equivale a</div><div style={{ color: T.green, fontWeight: 700, fontSize: 16 }}>S/ {(user.pts * 0.01).toFixed(2)}</div></div>
        </div>
        {REWARDS.map(r => {
          const can = user.pts >= r.pts && !claimed.includes(r.id);
          const done = claimed.includes(r.id);
          return (
            <div key={r.id} style={{ background: T.card, border: `1px solid ${can ? T.gold+"44" : T.border}`, borderRadius: 16, padding: "13px 14px", marginBottom: 9, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 52, height: 52, background: done ? "#0d2a0d" : `${T.red}18`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{r.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: T.white, fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                <div style={{ color: T.gold, fontWeight: 700, fontSize: 13, marginTop: 2 }}>{r.pts} pts</div>
                {!can && !done && <div style={{ color: T.grey, fontSize: 11 }}>Faltan {r.pts - user.pts} pts</div>}
              </div>
              {done ? <span style={{ color: T.green, fontSize: 12, fontWeight: 700 }}>✓ Canjeado</span>
                : <button onClick={() => { if(can){ onClaim(r.pts); setClaimed([...claimed,r.id]); }}} disabled={!can} style={{ background: can ? T.gold : T.border, border: "none", borderRadius: 10, padding: "8px 14px", color: can ? "#000" : T.grey, fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 12, cursor: can ? "pointer" : "not-allowed" }}>Canjear</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── NIVEL VIP ─────────────────────────────────────────────────────────────────
function NivelScreen({ user }) {
  const lvl = getLevel(user.pts);
  const idx = VIP.indexOf(lvl);
  const next = VIP[idx+1];
  const prog = next ? (user.pts-lvl.min)/(next.min-lvl.min) : 1;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <span style={{ color: T.white, fontWeight: 800, fontSize: 17 }}>MI NIVEL VIP</span>
      </div>
      <div className="scroll" style={{ padding: "14px" }}>
        <div style={{ textAlign: "center", padding: "24px 0", background: `radial-gradient(circle at 50% 50%,${lvl.color}18 0%,transparent 70%)` }}>
          <div style={{ fontSize: 72 }}>{lvl.icon}</div>
          <div style={{ color: lvl.color, fontWeight: 900, fontSize: 26, marginTop: 8, letterSpacing: 2 }}>NIVEL {lvl.name.toUpperCase()}</div>
          <div style={{ color: T.grey, fontSize: 13, marginTop: 4 }}>{lvl.name === "Diamante" ? "¡Eres nuestro cliente más especial!" : `Descuento especial en todos tus pedidos`}</div>
        </div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ color: T.white, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Tus beneficios actuales</div>
          {["Descuento exclusivo en combos","Cupones digitales prioritarios","Notificaciones de promos VIP"].map(b => (
            <div key={b} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: T.gold }}>✓</span>
              <span style={{ color: T.grey, fontSize: 13 }}>{b}</span>
            </div>
          ))}
        </div>
        {next && (
          <div className="card">
            <div style={{ color: T.white, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Próximo nivel: {next.icon} {next.name}</div>
            <div className="progress-track" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: `${prog*100}%`, background: `linear-gradient(90deg,${lvl.color},${next.color})` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ color: T.grey, fontSize: 11 }}>{user.pts} pts</span>
              <span style={{ color: T.red, fontSize: 11, fontWeight: 700 }}>Faltan {next.min-user.pts} pts</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PEDIDOS / CHECKOUT ────────────────────────────────────────────────────────
function PedidosScreen({ cart, user, onUpdate, onPlaceOrder }) {
  const [pay, setPay] = useState("Yape");
  const [addr, setAddr] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState(user.nombre);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const pts = Math.floor(total);

  const hist = [
    { id:"#CB-001",date:"18 May · 8:35 PM",status:"Entregado",total:35.00,pts:35,emoji:"🍔" },
    { id:"#CB-002",date:"15 May · 7:20 PM",status:"Entregado",total:28.50,pts:28,emoji:"🍗" },
  ];

  const doOrder = () => {
    if (cart.length === 0) return;
    const msg = buildOrderMsg(cart, pay, name, addr, notes);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
    onPlaceOrder();
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <span style={{ color: T.white, fontWeight: 800, fontSize: 17 }}>MIS PEDIDOS</span>
      </div>
      <div className="scroll" style={{ padding: "12px 14px" }}>
        {/* Cart */}
        {cart.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: T.white, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🛒 TU PEDIDO ACTUAL</div>
            {cart.map(item => (
              <div key={item.id} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "11px 13px", marginBottom: 7, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 22 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: T.white, fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: T.gold, fontSize: 13, fontWeight: 700 }}>{fmt(item.price*item.qty)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => onUpdate(item.id, item.qty-1)} style={{ background: T.border, border: "none", borderRadius: 6, width: 26, height: 26, color: T.white, cursor: "pointer", fontFamily: "Poppins,sans-serif", fontSize: 16 }}>−</button>
                  <span style={{ color: T.white, fontWeight: 700, fontSize: 13, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => onUpdate(item.id, item.qty+1)} style={{ background: T.red, border: "none", borderRadius: 6, width: 26, height: 26, color: "#fff", cursor: "pointer", fontFamily: "Poppins,sans-serif", fontSize: 16 }}>+</button>
                </div>
              </div>
            ))}

            {/* Order form */}
            <div className="card" style={{ marginTop: 12 }}>
              <div style={{ color: T.white, fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Datos del pedido</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ color: T.grey, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>TU NOMBRE</div>
                <input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ color: T.grey, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>DIRECCIÓN (para delivery)</div>
                <input className="inp" value={addr} onChange={e=>setAddr(e.target.value)} placeholder="Ej: Jr. Los Pinos 234, Apt 3B" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: T.grey, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>MÉTODO DE PAGO</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Yape","Efectivo","Contra entrega"].map(m => (
                    <button key={m} onClick={() => setPay(m)} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, border: `1.5px solid ${pay===m ? T.gold : T.border}`, background: pay===m ? `${T.gold}18` : T.card, color: pay===m ? T.gold : T.grey, fontFamily: "Poppins,sans-serif", fontWeight: 600, fontSize: 11, cursor: "pointer" }}>{m}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: T.grey, fontSize: 11, fontWeight: 600, marginBottom: 5 }}>NOTAS ADICIONALES</div>
                <textarea className="inp" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Ej: Sin cebolla, salsa aparte..." style={{ resize: "none", height: 60 }} />
              </div>
              {/* Summary */}
              <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: T.grey, fontSize: 13 }}>Subtotal</span>
                  <span style={{ color: T.white, fontSize: 13, fontWeight: 600 }}>{fmt(total)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: T.gold, fontSize: 13 }}>💫 Ganarás</span>
                  <span style={{ color: T.gold, fontWeight: 700, fontSize: 13 }}>+{pts} pts</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ color: T.white, fontWeight: 700, fontSize: 15 }}>TOTAL</span>
                  <span style={{ color: T.white, fontWeight: 900, fontSize: 15 }}>{fmt(total)}</span>
                </div>
              </div>
              <button onClick={doOrder} style={{ width: "100%", background: "#075E54", border: "none", borderRadius: 12, padding: 14, color: "#fff", fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>💬</span> ENVIAR PEDIDO POR WHATSAPP
              </button>
              <div style={{ color: T.grey, fontSize: 11, textAlign: "center", marginTop: 8 }}>Se abrirá WhatsApp con tu pedido listo para enviar</div>
            </div>
          </div>
        )}

        {/* Historial */}
        <div style={{ color: T.white, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>HISTORIAL</div>
        {hist.map(h => (
          <div key={h.id} className="card" style={{ marginBottom: 9, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 26 }}>{h.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: T.grey, fontSize: 11 }}>{h.date} · {h.id}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                <StatusChip status={h.status} />
                <span style={{ color: T.green, fontSize: 11, fontWeight: 700 }}>+{h.pts} pts</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: T.white, fontWeight: 700, fontSize: 14 }}>{fmt(h.total)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROFILE SCREEN ────────────────────────────────────────────────────────────
function ProfileScreen({ user, onLogout }) {
  const lvl = getLevel(user.pts);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 18px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <span style={{ color: T.white, fontWeight: 800, fontSize: 17 }}>PERFIL</span>
      </div>
      <div className="scroll" style={{ padding: "18px 14px" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
          <div style={{ width: 66, height: 66, borderRadius: "50%", background: `linear-gradient(135deg,${T.red},${T.redD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${T.gold}` }}>{user.nombre[0].toUpperCase()}</div>
          <div>
            <div style={{ color: T.white, fontWeight: 800, fontSize: 17 }}>{user.nombre}</div>
            <div style={{ color: T.grey, fontSize: 13 }}>{user.celular}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${T.gold}20`, border: `1px solid ${T.gold}40`, borderRadius: 20, padding: "3px 10px", marginTop: 4 }}>
              <span style={{ color: T.gold, fontSize: 11, fontWeight: 700 }}>{lvl.icon} {lvl.name} · {user.pts} pts</span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
          {[{label:"Visitas",val:"12"},{label:"Puntos",val:user.pts},{label:"Canjes",val:"3"}].map(s => (
            <div key={s.label} className="card" style={{ textAlign: "center" }}>
              <div style={{ color: T.white, fontWeight: 800, fontSize: 20 }}>{s.val}</div>
              <div style={{ color: T.grey, fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {[{icon:"📱",label:"Mi QR Personal"},{icon:"🔔",label:"Notificaciones"},{icon:"👥",label:"Referir amigos",badge:"GANA 50 PTS"},{icon:"📍",label:"Dirección de entrega"},{icon:"💬",label:"Soporte por WhatsApp"}].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: `1px solid ${T.border}`, cursor: "pointer" }}>
            <span style={{ fontSize: 20, width: 26, textAlign: "center" }}>{item.icon}</span>
            <span style={{ color: T.white, fontSize: 14, flex: 1 }}>{item.label}</span>
            {item.badge && <span style={{ background: T.gold, color: "#000", fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 20 }}>{item.badge}</span>}
            <span style={{ color: T.grey }}>›</span>
          </div>
        ))}
        <div style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.border}`, padding: 14, marginTop: 16 }}>
          {[["📍","Av. Daniel Alcides Carrión · Frente al Parque de la Juventud"],["🕐","Lunes a Domingo · 11:00 AM – 11:00 PM"],["📞","969 179 450"]].map(([icon,text]) => (
            <div key={icon} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
              <span>{icon}</span>
              <span style={{ color: T.grey, fontSize: 12 }}>{text}</span>
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ width: "100%", background: "transparent", border: `1.5px solid ${T.red}`, borderRadius: 12, padding: 13, color: T.red, fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 18 }}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ADMIN PANEL
// ════════════════════════════════════════════════════════════════════════════

function AdminPanel({ menuItems, setMenuItems, promos, setPromos, orders, setOrders, onClose }) {
  const [tab, setTab] = useState("pedidos");
  const [editItem, setEditItem] = useState(null);
  const [editPromo, setEditPromo] = useState(null);
  const [newItem, setNewItem] = useState(false);

  // ── Tab: Pedidos ──────────────────────────────────────────────────────────
  const TabPedidos = () => {
    const stats = [
      { label: "Nuevos", val: orders.filter(o=>o.status==="Nuevo").length, color: T.blue },
      { label: "En proceso", val: orders.filter(o=>o.status==="Preparando"||o.status==="En Reparto").length, color: T.gold },
      { label: "Entregados", val: orders.filter(o=>o.status==="Entregado").length, color: T.green },
    ];
    const nextStatus = { "Nuevo":"Preparando","Preparando":"En Reparto","En Reparto":"Entregado","Entregado":"Entregado" };

    return (
      <div className="scroll" style={{ padding: "12px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ textAlign: "center" }}>
              <div style={{ color: s.color, fontWeight: 900, fontSize: 22 }}>{s.val}</div>
              <div style={{ color: T.grey, fontSize: 10 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {orders.length === 0 && <div style={{ textAlign: "center", color: T.grey, padding: "40px 0" }}>No hay pedidos aún.<br/>Los pedidos de WhatsApp aparecerán aquí.</div>}
        {orders.map(o => (
          <div key={o.id} className="order-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ color: T.white, fontWeight: 700, fontSize: 14 }}>{o.name}</div>
                <div style={{ color: T.grey, fontSize: 11 }}>{o.id} · {o.time}</div>
              </div>
              <StatusChip status={o.status} />
            </div>
            <div style={{ color: T.grey, fontSize: 12, marginBottom: 8 }}>
              {o.items.map(i=>`${i.qty}x ${i.name}`).join(", ")}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ color: T.white, fontWeight: 700, fontSize: 15 }}>{fmt(o.total)}</span>
                <span style={{ color: T.grey, fontSize: 12 }}> · {o.pay}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {o.status !== "Entregado" && (
                  <button onClick={() => setOrders(prev => prev.map(x => x.id===o.id ? {...x,status:nextStatus[x.status]} : x))}
                    style={{ background: T.red, border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontFamily: "Poppins,sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    → {nextStatus[o.status]}
                  </button>
                )}
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola ${o.name}! Tu pedido ${o.id} está ${o.status.toLowerCase()}. 🍔`)}`} target="_blank" rel="noreferrer"
                  style={{ background: "#075E54", border: "none", borderRadius: 8, padding: "6px 10px", color: "#fff", fontFamily: "Poppins,sans-serif", fontSize: 11, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "flex", alignItems: "center" }}>💬</a>
              </div>
            </div>
          </div>
        ))}
        {/* Simulate incoming order */}
        <button onClick={() => {
          const demo = { id:`#CB-00${orders.length+10}`, name:"Cliente Demo", time: new Date().toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"}), status:"Nuevo", pay:"Yape", total:28.50, items:[{qty:1,name:"Cheeseburger Clásica"},{qty:2,name:"Gaseosa Pequeña"}] };
          setOrders(prev=>[demo,...prev]);
        }} style={{ width:"100%",background:"transparent",border:`1.5px dashed ${T.border}`,borderRadius:12,padding:12,color:T.grey,fontFamily:"Poppins,sans-serif",fontSize:13,cursor:"pointer",marginTop:8 }}>
          + Simular pedido de prueba
        </button>
      </div>
    );
  };

  // ── Tab: Menú ─────────────────────────────────────────────────────────────
  const TabMenu = () => {
    const [filterCat, setFilterCat] = useState("Todas");
    const visible = filterCat==="Todas" ? menuItems : menuItems.filter(m=>m.cat===filterCat);

    const toggle = (id) => setMenuItems(prev=>prev.map(m=>m.id===id?{...m,active:!m.active}:m));
    const del = (id) => { if(window.confirm&&window.confirm("¿Eliminar este plato?")) setMenuItems(prev=>prev.filter(m=>m.id!==id)); };

    return (
      <div style={{ display:"flex",flexDirection:"column",overflow:"hidden",flex:1 }}>
        <div style={{ padding:"10px 14px 0",flexShrink:0 }}>
          <div style={{ display:"flex",gap:6,overflowX:"auto",scrollbarWidth:"none",paddingBottom:8 }}>
            {["Todas",...CATS].map(c=>(
              <button key={c} className={`chip ${filterCat===c?"act":""}`} style={{ fontSize:11,padding:"6px 12px" }} onClick={()=>setFilterCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="scroll" style={{ padding:"0 14px 14px" }}>
          <button onClick={()=>setNewItem(true)} style={{ width:"100%",background:"transparent",border:`1.5px dashed ${T.gold}`,borderRadius:12,padding:11,color:T.gold,fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:10,marginTop:4 }}>+ Agregar nuevo plato</button>
          {visible.map(item=>(
            <div key={item.id} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"11px 12px",marginBottom:7,display:"flex",alignItems:"center",gap:10,opacity:item.active?1:.5 }}>
              <span style={{ fontSize:22,flexShrink:0 }}>{item.emoji}</span>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ color:T.white,fontWeight:700,fontSize:13 }}>{item.name}</div>
                <div style={{ color:T.grey,fontSize:10,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{item.cat} · {fmt(item.price)}</div>
              </div>
              <div style={{ display:"flex",gap:8,alignItems:"center",flexShrink:0 }}>
                <label className="toggle"><input type="checkbox" checked={item.active} onChange={()=>toggle(item.id)}/><span className="toggle-track"/></label>
                <button onClick={()=>setEditItem({...item})} style={{ background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"5px 8px",color:T.grey,cursor:"pointer",fontSize:12 }}>✏️</button>
                <button onClick={()=>del(item.id)} style={{ background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"5px 8px",color:"#EF4444",cursor:"pointer",fontSize:12 }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Tab: Promos ───────────────────────────────────────────────────────────
  const TabPromos = () => {
    const toggle = (id) => setPromos(prev=>prev.map(p=>p.id===id?{...p,active:!p.active}:p));
    const del = (id) => setPromos(prev=>prev.filter(p=>p.id!==id));
    return (
      <div className="scroll" style={{ padding:"12px 14px" }}>
        <button onClick={()=>setEditPromo({id:nextId(promos),title:"",desc:"",active:true,color:T.red,isNew:true})}
          style={{ width:"100%",background:"transparent",border:`1.5px dashed ${T.gold}`,borderRadius:12,padding:11,color:T.gold,fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:10 }}>+ Nueva promoción</button>
        {promos.map(p=>(
          <div key={p.id} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"12px 14px",marginBottom:8,opacity:p.active?1:.55 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4 }}>
              <div style={{ flex:1 }}>
                <div style={{ color:T.white,fontWeight:700,fontSize:13 }}>{p.title||"Sin título"}</div>
                <div style={{ color:T.grey,fontSize:11,marginTop:2 }}>{p.desc}</div>
              </div>
              <div style={{ display:"flex",gap:6,marginLeft:8,alignItems:"center" }}>
                <label className="toggle"><input type="checkbox" checked={p.active} onChange={()=>toggle(p.id)}/><span className="toggle-track"/></label>
              </div>
            </div>
            <div style={{ display:"flex",gap:6,marginTop:8 }}>
              <button onClick={()=>setEditPromo({...p})} style={{ flex:1,background:"none",border:`1px solid ${T.border}`,borderRadius:8,padding:"6px",color:T.grey,cursor:"pointer",fontSize:11,fontFamily:"Poppins,sans-serif" }}>✏️ Editar</button>
              <button onClick={()=>del(p.id)} style={{ flex:1,background:"none",border:`1px solid #EF444430`,borderRadius:8,padding:"6px",color:"#EF4444",cursor:"pointer",fontSize:11,fontFamily:"Poppins,sans-serif" }}>🗑️ Eliminar</button>
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("🔥 *CHINO BROASTER* 🔥\n\n"+p.title+"\n\n"+p.desc+"\n\n📍 Av. Daniel Alcides Carrión\n📞 969 179 450")}`} target="_blank" rel="noreferrer"
                style={{ flex:1,background:"#075E54",border:"none",borderRadius:8,padding:"6px",color:"#fff",cursor:"pointer",fontSize:11,fontFamily:"Poppins,sans-serif",fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>💬 Enviar</a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── Tab: Clientes ─────────────────────────────────────────────────────────
  const TabClientes = () => {
    const clients = [
      { name:"Valeria Torres",tel:"969179450",pts:850,lvl:"Oro",bd:"15 Jun" },
      { name:"Carlos Mamani",tel:"987654321",pts:320,lvl:"Plata",bd:"22 Ago" },
      { name:"María López",tel:"912345678",pts:1250,lvl:"Oro",bd:"08 Mar" },
      { name:"Diego Quispe",tel:"945678123",pts:2600,lvl:"Diamante",bd:"30 Nov" },
    ];
    return (
      <div className="scroll" style={{ padding:"12px 14px" }}>
        <div className="card" style={{ marginBottom:12,display:"flex",justifyContent:"space-between" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:T.white,fontWeight:800,fontSize:20 }}>{clients.length}</div>
            <div style={{ color:T.grey,fontSize:10 }}>Clientes</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:T.gold,fontWeight:800,fontSize:20 }}>2</div>
            <div style={{ color:T.grey,fontSize:10 }}>Nivel Oro+</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:T.red,fontWeight:800,fontSize:20 }}>1</div>
            <div style={{ color:T.grey,fontSize:10 }}>Cumpleaños hoy</div>
          </div>
        </div>
        {clients.map(c=>{
          const lvl = VIP.find(v=>v.name===c.lvl)||VIP[0];
          return (
            <div key={c.name} className="card" style={{ marginBottom:8 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:`${T.red}25`,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:16,border:`1.5px solid ${lvl.color}` }}>{c.name[0]}</div>
                  <div>
                    <div style={{ color:T.white,fontWeight:700,fontSize:13 }}>{c.name}</div>
                    <div style={{ color:T.grey,fontSize:11 }}>{c.tel} · 🎂 {c.bd}</div>
                    <div style={{ display:"flex",gap:6,marginTop:3,alignItems:"center" }}>
                      <span style={{ color:lvl.color,fontSize:11,fontWeight:700 }}>{lvl.icon} {c.lvl}</span>
                      <span style={{ color:T.gold,fontSize:11 }}>· {c.pts} pts</span>
                    </div>
                  </div>
                </div>
                <a href={`https://wa.me/51${c.tel}?text=${encodeURIComponent("¡Hola "+c.name.split(" ")[0]+"! 🔥 Tienes una promo especial en Chino Broaster. ¡Visítanos!")}`} target="_blank" rel="noreferrer"
                  style={{ background:"#075E54",borderRadius:10,padding:"8px 10px",color:"#fff",textDecoration:"none",fontSize:16 }}>💬</a>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── Item Edit Modal ────────────────────────────────────────────────────────
  const ItemEditModal = ({ item, onClose }) => {
    const [f, setF] = useState(item);
    const isNew = !menuItems.find(m=>m.id===f.id);
    const save = () => {
      if (isNew || newItem) setMenuItems(prev=>[...prev,{...f,id:nextId(menuItems),active:true}]);
      else setMenuItems(prev=>prev.map(m=>m.id===f.id?f:m));
      onClose();
    };
    return (
      <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle"/>
          <div style={{ color:T.white,fontWeight:700,fontSize:16,marginBottom:16 }}>{isNew||newItem?"Nuevo Plato":"Editar Plato"}</div>
          {[["Nombre del plato","nombre","text"],["Descripción","desc","text"],["Precio (S/)","price","number"]].map(([lbl,key,type])=>(
            <div key={key} style={{ marginBottom:10 }}>
              <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:4 }}>{lbl.toUpperCase()}</div>
              <input className="inp" type={type} value={f[key]||""} onChange={e=>setF({...f,[key]:type==="number"?parseFloat(e.target.value)||0:e.target.value})} placeholder={lbl} />
            </div>
          ))}
          <div style={{ marginBottom:10 }}>
            <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:4 }}>CATEGORÍA</div>
            <select className="inp" value={f.cat||"Hamburguesas"} onChange={e=>setF({...f,cat:e.target.value})}>
              {CATS.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:4 }}>EMOJI</div>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {["🍔","🍗","🔥","🍟","🍽️","🍱","🥤","☕","🍵","🌮","🥗"].map(em=>(
                <button key={em} onClick={()=>setF({...f,emoji:em})} style={{ fontSize:22,width:38,height:38,borderRadius:10,border:`2px solid ${f.emoji===em?T.gold:T.border}`,background:T.card,cursor:"pointer" }}>{em}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <button onClick={onClose} className="btn-outline" style={{ flex:1 }}>Cancelar</button>
            <button onClick={save} className="btn-red" style={{ flex:1 }}>Guardar</button>
          </div>
        </div>
      </div>
    );
  };

  // ── Promo Edit Modal ──────────────────────────────────────────────────────
  const PromoEditModal = ({ promo, onClose }) => {
    const [f, setF] = useState(promo);
    const save = () => {
      if (f.isNew) setPromos(prev=>[...prev,{...f,isNew:undefined}]);
      else setPromos(prev=>prev.map(p=>p.id===f.id?f:p));
      onClose();
    };
    return (
      <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle"/>
          <div style={{ color:T.white,fontWeight:700,fontSize:16,marginBottom:16 }}>{f.isNew?"Nueva Promoción":"Editar Promoción"}</div>
          {[["Título de la promo","title"],["Descripción / detalle","desc"]].map(([lbl,key])=>(
            <div key={key} style={{ marginBottom:10 }}>
              <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:4 }}>{lbl.toUpperCase()}</div>
              <input className="inp" value={f[key]||""} onChange={e=>setF({...f,[key]:e.target.value})} placeholder={lbl} />
            </div>
          ))}
          <div style={{ marginBottom:14 }}>
            <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:8 }}>COLOR DEL BANNER</div>
            <div style={{ display:"flex",gap:8 }}>
              {[T.red,"#B8890A","#1D4ED8","#065F46","#7C3AED"].map(col=>(
                <button key={col} onClick={()=>setF({...f,color:col})} style={{ width:34,height:34,borderRadius:"50%",background:col,border:`3px solid ${f.color===col?"#fff":"transparent"}`,cursor:"pointer" }}/>
              ))}
            </div>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <button onClick={onClose} className="btn-outline" style={{ flex:1 }}>Cancelar</button>
            <button onClick={save} className="btn-red" style={{ flex:1 }}>Guardar</button>
          </div>
        </div>
      </div>
    );
  };

  const TABS = [
    { id:"pedidos", label:"Pedidos", icon:"📋" },
    { id:"menu",    label:"Menú",    icon:"🍔" },
    { id:"promos",  label:"Promos",  icon:"🔥" },
    { id:"clientes",label:"Clientes",icon:"👥" },
  ];

  return (
    <div className="admin-wrap">
      <div className="notch"/>
      <div style={{ padding:"18px 18px 10px", background: T.surface, borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div>
            <div style={{ fontSize:16,fontWeight:900 }}><span style={{ color:T.red }}>CHINO</span> <span style={{ color:T.gold,fontSize:12,fontStyle:"italic" }}>Admin</span></div>
            <div style={{ color:T.grey,fontSize:11 }}>Panel de Control</div>
          </div>
          <button onClick={onClose} style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:"6px 12px",color:T.grey,cursor:"pointer",fontFamily:"Poppins,sans-serif",fontSize:11,fontWeight:600 }}>← App</button>
        </div>
        <div className="admin-tabs">
          {TABS.map(t=>(
            <button key={t.id} className={`atab ${tab===t.id?"act":""}`} onClick={()=>setTab(t.id)}>{t.icon} {t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden" }}>
        {tab==="pedidos" && <TabPedidos/>}
        {tab==="menu"    && <TabMenu/>}
        {tab==="promos"  && <TabPromos/>}
        {tab==="clientes"&& <TabClientes/>}
      </div>

      {/* Modals */}
      {(editItem||newItem) && <ItemEditModal item={editItem||{name:"",desc:"",price:0,cat:"Hamburguesas",emoji:"🍔",active:true}} onClose={()=>{setEditItem(null);setNewItem(false);}}/>}
      {editPromo && <PromoEditModal promo={editPromo} onClose={()=>setEditPromo(null)}/>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [mode, setMode]         = useState("app");   // "app" | "admin"
  const [screen, setScreen]     = useState("splash"); // splash | register | app
  const [tab, setTab]           = useState("home");

  // Shared state
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [promos, setPromos]       = useState(INITIAL_PROMOS);
  const [orders, setOrders]       = useState([]);

  // Client state
  const [user, setUser]   = useState({ nombre:"Valeria", celular:"969 179 450", pts:850 });
  const [cart, setCart]   = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      return ex ? prev.map(c => c.id===item.id ? {...c,qty:c.qty+1} : c) : [...prev,{...item,qty:1}];
    });
    showToast(`✓ ${item.name} agregado`);
  }, [showToast]);

  const updateCart = useCallback((id, qty) => {
    setCart(prev => qty <= 0 ? prev.filter(c=>c.id!==id) : prev.map(c=>c.id===id?{...c,qty}:c));
  }, []);

  const placeOrder = useCallback(() => {
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    const newOrder = {
      id: `#CB-${String(orders.length+1).padStart(3,"0")}`,
      name: user.nombre,
      time: new Date().toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"}),
      status: "Nuevo",
      pay: "Yape",
      total,
      items: cart.map(i=>({qty:i.qty,name:i.name})),
    };
    setOrders(prev=>[newOrder,...prev]);
    setUser(prev=>({...prev,pts:prev.pts+Math.floor(total)}));
    setCart([]);
    showToast("🎉 Pedido enviado por WhatsApp · +" + Math.floor(total) + " pts");
    setTab("home");
  }, [cart, orders, user, showToast]);

  const navItems = [
    { id:"home",    icon:"🏠", label:"Inicio" },
    { id:"menu",    icon:"🍴", label:"Menú" },
    { id:"qr",      icon:"📱", label:"Pagar",  isQR:true },
    { id:"rewards", icon:"🎁", label:"Premios" },
    { id:"perfil",  icon:"👤", label:"Perfil" },
  ];

  const renderTab = () => {
    switch(tab) {
      case "home":    return <HomeScreen user={user} cart={cart} promos={promos} onNav={setTab} menuItems={menuItems}/>;
      case "menu":    return <MenuScreen cart={cart} onAdd={addToCart} onNav={setTab} menuItems={menuItems}/>;
      case "qr":      return <QRScreen user={user} onBack={()=>setTab("home")}/>;
      case "rewards": return <RewardsScreen user={user} onClaim={pts=>setUser(prev=>({...prev,pts:prev.pts-pts}))}/>;
      case "nivel":   return <NivelScreen user={user}/>;
      case "pedidos": return <PedidosScreen cart={cart} user={user} onUpdate={updateCart} onPlaceOrder={placeOrder}/>;
      case "perfil":  return <ProfileScreen user={user} onLogout={()=>{setScreen("splash");setCart([]);setTab("home");}}/>;
      default: return null;
    }
  };

  const ClientApp = () => (
    <div className="shell">
      <div className="notch"/>
      <div style={{ display:"flex",flexDirection:"column",height:"100%" }}>
        {/* Status bar */}
        <div className="sbar">
          <span className="sbar-time">9:41</span>
          <div className="sbar-icons"><span>●●●●</span><span>WiFi</span><span>🔋</span></div>
        </div>

        {/* Screen content */}
        <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative" }}>
          {screen === "splash"   && <SplashScreen onLogin={()=>setScreen("app")} onRegister={()=>setScreen("register")}/>}
          {screen === "register" && <RegisterScreen onBack={()=>setScreen("splash")} onSuccess={f=>{setUser({nombre:f.nombre,celular:f.celular,pts:0});setScreen("app");}}/>}
          {screen === "app"      && renderTab()}
          <Toast msg={toast}/>
        </div>

        {/* Bottom Nav */}
        {screen === "app" && tab !== "qr" && (
          <nav className="bnav">
            {navItems.map(item => item.isQR ? (
              <button key={item.id} className="bnav-qr" onClick={()=>setTab(item.id)}>
                <div className="bnav-qr-ring">📱</div>
                <span className="bnav-qr-label">{item.label}</span>
              </button>
            ) : (
              <button key={item.id} className={`bnav-item ${tab===item.id?"act":""}`} onClick={()=>setTab(item.id)}>
                <span className="bnav-icon">{item.icon}</span>
                <span className="bnav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );

  return (
    <>
      <style>{CSS}</style>
      {/* Mode switcher */}
      <div className="mode-switch">
        <button className={`mode-btn ${mode==="app"?"act":""}`} onClick={()=>setMode("app")}>📱 App</button>
        <button className={`mode-btn ${mode==="admin"?"act":""}`} onClick={()=>setMode("admin")}>⚙️ Admin</button>
      </div>

      {mode === "app"
        ? <ClientApp/>
        : <AdminPanel menuItems={menuItems} setMenuItems={setMenuItems} promos={promos} setPromos={setPromos} orders={orders} setOrders={setOrders} onClose={()=>setMode("app")}/>
      }
    </>
  );
}

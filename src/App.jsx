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
.scroll{flex:1;overflow-y:scroll;overflow-x:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:${T.red}99 ${T.border}44;}
.scroll::-webkit-scrollbar{width:5px;}
.scroll::-webkit-scrollbar-track{background:${T.border}44;border-radius:4px;}
.scroll::-webkit-scrollbar-thumb{background:${T.red}99;border-radius:4px;}
.scroll::-webkit-scrollbar-thumb:hover{background:${T.red};}

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
.inp{background:${T.card};border:1.5px solid ${T.border};border-radius:12px;padding:12px 14px;color:${T.white};font-family:'Poppins',sans-serif;font-size:16px;width:100%;outline:none;transition:.15s;-webkit-appearance:none;touch-action:manipulation;}
.inp:focus{border-color:${T.gold};}
.inp::placeholder{color:${T.grey};}
textarea.inp{resize:vertical;min-height:72px;font-size:14px;}
select.inp{appearance:none;cursor:pointer;font-size:14px;}

/* ── modal scroll ── */
.modal-sheet{scrollbar-width:thin;scrollbar-color:${T.red}55 transparent;}
.modal-sheet::-webkit-scrollbar{width:4px;}
.modal-sheet::-webkit-scrollbar-thumb{background:${T.red}70;border-radius:4px;}

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
@media (max-width:480px){
  .admin-wrap{width:100vw!important;min-height:100dvh!important;border-radius:0!important;box-shadow:none!important;}
}
.admin-header{background:${T.surface};padding:18px 20px 14px;border-bottom:1px solid ${T.border};flex-shrink:0;}
.admin-tabs{display:flex;gap:3px;background:${T.card};border-radius:12px;padding:4px;}
.atab{flex:1;padding:7px 2px;border-radius:9px;border:none;font-family:'Poppins',sans-serif;font-size:9px;font-weight:700;cursor:pointer;transition:.15s;background:transparent;color:${T.grey};}
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

// ─── CÓDIGO QR NUMÉRICO (6 dígitos por sesión por usuario) ───────────────────
function generateCode(celular) {
  // código determinista por celular + día de hoy → 6 dígitos
  const seed = celular.replace(/\D/g,"") + new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) { hash = ((hash << 5) - hash) + seed.charCodeAt(i); hash |= 0; }
  return String(Math.abs(hash) % 900000 + 100000);
}

function CodeDisplay({ user }) {
  const code = generateCode(user.celular);
  const digits = code.split("");
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
      <div style={{ display:"flex",gap:6 }}>
        {digits.map((d,i) => (
          <div key={i} style={{ width:40,height:52,background:"#fff",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#0A0A0A",boxShadow:"0 2px 8px rgba(0,0,0,.2)" }}>{d}</div>
        ))}
      </div>
      <div style={{ background:T.red,borderRadius:8,padding:"3px 14px",marginTop:4 }}>
        <span style={{ color:"#fff",fontSize:10,fontWeight:800,letterSpacing:1 }}>CHINO BROASTER</span>
      </div>
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
        <div style={{ textAlign: "center", color: T.greyL, fontSize: 10, marginTop: 4 }}>v0.2</div>
      </div>
    </div>
  );
}

// ── REGISTER ─────────────────────────────────────────────────────────────────
function RegisterScreen({ onBack, onSuccess }) {
  const [f, setF] = useState({ nombre:"", celular:"", fecha:"", contrasena:"", confirmar:"", referido:"" });
  const [error, setError] = useState("");

  const doRegister = () => {
    if (!f.nombre || !f.celular || !f.contrasena || !f.fecha) { setError("Completa todos los campos"); return; }
    if (f.contrasena !== f.confirmar) { setError("Las contraseñas no coinciden"); return; }
    if (f.contrasena.length < 6) { setError("La contraseña debe tener al menos 6 caracteres"); return; }
    const cel = f.celular.replace(/\s/g,"");
    const users = getUsers();
    if (users.find(u => u.celular.replace(/\s/g,"") === cel)) { setError("Este número ya está registrado"); return; }
    const activeCode = (() => { try { const c=localStorage.getItem("cb_refcode"); const a=localStorage.getItem("cb_refactive"); return a!=="false"&&c?c:"POLLO"; } catch{return "POLLO";} })();
    const refIsActive = (() => { try { return localStorage.getItem("cb_refactive")!=="false"; } catch{return true;} })();
    const newUser = { nombre:f.nombre, celular:cel, contrasena:f.contrasena, nacimiento:f.fecha, referido:f.referido||"", pts:(refIsActive && f.referido.toUpperCase()===activeCode)?50:0, isOwner:false };
    users.push(newUser);
    saveUsers(users);
    setError("");
    onSuccess(newUser);
  };

  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"10px 18px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.border}`,flexShrink:0 }}>
        <button className="btn-ghost" onClick={onBack} style={{ color:T.white,fontSize:22 }}>←</button>
        <span style={{ color:T.white,fontWeight:700,fontSize:16 }}>Crear Cuenta</span>
      </div>
      <div className="scroll" style={{ padding:"20px 20px" }}>
        <div style={{ textAlign:"center",marginBottom:24 }}>
          <div style={{ fontSize:44 }}>🎉</div>
          <div style={{ color:T.white,fontWeight:700,fontSize:18,marginTop:8 }}>¡Únete al Club!</div>
          <div style={{ color:T.grey,fontSize:13 }}>Regístrate y empieza a ganar puntos hoy</div>
        </div>
        {[
          ["NOMBRE COMPLETO","Tu nombre completo","nombre","text"],
          ["CELULAR","999 999 999","celular","tel"],
          ["FECHA DE NACIMIENTO","DD/MM/AAAA","fecha","text"],
        ].map(([lbl,ph,key,type]) => (
          <div key={key} style={{ marginBottom:12 }}>
            <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>{lbl}</div>
            <input className="inp" placeholder={ph} type={type} value={f[key]} onChange={e=>setF({...f,[key]:e.target.value})} />
            {key==="fecha" && <div style={{ color:T.grey,fontSize:11,marginTop:4 }}>🎂 Te enviamos un regalo especial en tu cumpleaños</div>}
          </div>
        ))}
        <div style={{ marginBottom:12 }}>
          <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>CONTRASEÑA</div>
          <input className="inp" placeholder="Mínimo 6 caracteres" type="password" value={f.contrasena} onChange={e=>setF({...f,contrasena:e.target.value})} />
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>CONFIRMAR CONTRASEÑA</div>
          <input className="inp" placeholder="Repite tu contraseña" type="password" value={f.confirmar} onChange={e=>setF({...f,confirmar:e.target.value})} />
        </div>
        <div style={{ background:"#0d1f06",border:"1px solid #2d4a0f",borderRadius:12,padding:"12px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"center" }}>
          <span style={{ fontSize:20 }}>🎁</span>
          <div style={{ flex:1 }}>
            <div style={{ color:"#7ec850",fontSize:12,fontWeight:700 }}>Código de Referido (opcional)</div>
            <input className="inp" placeholder="Ej: POLLO" style={{ marginTop:6,padding:"8px 12px",fontSize:13 }}
              value={f.referido} onChange={e=>setF({...f,referido:e.target.value})} />
            <div style={{ color:T.grey,fontSize:11,marginTop:4 }}>Con código válido ganas 50 pts extra al registrarte</div>
          </div>
        </div>
        {error && <div style={{ background:"#2a0a0a",border:`1px solid ${T.red}40`,borderRadius:10,padding:"10px 14px",color:"#F87171",fontSize:13,marginBottom:14 }}>⚠️ {error}</div>}
        <button className="btn-red" onClick={doRegister}>CREAR MI CUENTA GRATIS</button>
        <div style={{ textAlign:"center",color:T.grey,fontSize:12,marginTop:14 }}>
          ¿Ya tienes cuenta? <span style={{ color:T.gold,fontWeight:600,cursor:"pointer" }} onClick={onBack}>Inicia sesión</span>
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

// ── QR / CÓDIGO DE PAGO ───────────────────────────────────────────────────────
function QRScreen({ user, onBack }) {
  const lvl = getLevel(user.pts);
  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"10px 18px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.border}`,flexShrink:0 }}>
        <button className="btn-ghost" onClick={onBack} style={{ color:T.white,fontSize:22 }}>←</button>
        <span style={{ color:T.white,fontWeight:700,fontSize:16 }}>MI CÓDIGO DE PAGO</span>
      </div>
      <div className="scroll" style={{ padding:"24px 20px",display:"flex",flexDirection:"column",alignItems:"center" }}>
        <div style={{ color:T.grey,fontSize:13,textAlign:"center",marginBottom:24 }}>Muestra este código al pagar<br/>para acumular tus puntos</div>
        <div style={{ background:"#fff",borderRadius:24,padding:"28px 20px",display:"flex",flexDirection:"column",alignItems:"center",gap:16,width:"100%" }}>
          <CodeDisplay user={user}/>
        </div>
        <div style={{ textAlign:"center",marginTop:18 }}>
          <div style={{ color:T.white,fontWeight:700,fontSize:18 }}>{user.nombre}</div>
          <div style={{ color:T.grey,fontSize:13 }}>{user.celular}</div>
          <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:`${T.gold}20`,border:`1px solid ${T.gold}`,borderRadius:20,padding:"5px 14px",marginTop:10 }}>
            <span>{lvl.icon}</span>
            <span style={{ color:T.gold,fontWeight:700,fontSize:12 }}>Nivel {lvl.name} · {user.pts} pts</span>
          </div>
        </div>
        <div style={{ color:T.grey,fontSize:11,marginTop:20,textAlign:"center",background:T.card,borderRadius:12,padding:"10px 16px",border:`1px solid ${T.border}`,width:"100%" }}>
          🔒 Tu código cambia cada día. Muéstralo al local para registrar tus puntos.
        </div>
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
function PedidosScreen({ cart, user, onUpdate, onPlaceOrder, orders, onUpdateUser }) {
  const [pay, setPay]     = useState("Yape");
  const [addr, setAddr]   = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName]   = useState(user.nombre);
  const [step, setStep]   = useState("form"); // "form"|"waiting"|"confirmed_cash"|"confirmed_pay"
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const pts   = Math.floor(total);

  const myOrders = orders.filter(o => o.celular === user.celular);
  const lastOrder = myOrders[0];

  // Polling: si el admin confirmó el pago de Yape/Contra entrega
  const isConfirmed = lastOrder?.payConfirmed && step === "waiting";
  if (isConfirmed && lastOrder?.pts_credited_to_client !== true) {
    // acreditar puntos al usuario si no se han acreditado aún
  }

  const doOrder = () => {
    if (cart.length === 0) return;
    if (pay === "Efectivo") {
      onPlaceOrder(pay, addr, notes, name, true);
      setStep("confirmed_cash");
    } else {
      // Build WA order message with all details
      const lines = cart.map(i=>`  • ${i.qty}x ${i.name} — S/ ${(i.price*i.qty).toFixed(2)}`).join("\n");
      const waMsg = encodeURIComponent(
`🔥 *CHINO BROASTER — NUEVO PEDIDO*

👤 *Cliente:* ${name||user.nombre}
📱 *Celular:* ${user.celular}
${addr?`📍 *Dirección:* ${addr}\n`:""}
🛒 *Pedido:*
${lines}

💰 *Total:* S/ ${total.toFixed(2)}
💳 *Pago:* ${pay}
⭐ *Puntos que ganará:* +${pts} pts
${notes?`\n📝 *Notas:* ${notes}`:""}

_Enviado desde Chino Broaster App v0.2_`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, "_blank");
      onPlaceOrder(pay, addr, notes, name, false);
      setStep("waiting");
    }
  };

  // Pantalla: esperando confirmación admin (Yape / Contra entrega)
  if (step === "waiting") {
    const confirmed = myOrders[0]?.payConfirmed;
    if (confirmed) {
      return (
        <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,textAlign:"center" }}>
          <div style={{ fontSize:72 }}>✅</div>
          <div style={{ color:T.green,fontWeight:800,fontSize:20,marginTop:16 }}>¡Pago recibido!</div>
          <div style={{ color:T.white,fontSize:14,marginTop:12,lineHeight:1.7 }}>Su pedido ha sido registrado correctamente y será procesado en breve. ¡Gracias por su compra!</div>
          <div style={{ color:T.gold,fontWeight:700,fontSize:17,marginTop:20 }}>+{myOrders[0]?.ptsEarned||pts} pts acumulados 🎉</div>
          <button className="btn-red" style={{ marginTop:32,width:"100%" }} onClick={()=>setStep("form")}>Volver al inicio</button>
        </div>
      );
    }
    return (
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,textAlign:"center" }}>
        <div style={{ fontSize:64,animation:"pulse 1.5s infinite" }}>⏳</div>
        <div style={{ color:T.gold,fontWeight:800,fontSize:18,marginTop:16 }}>Esperando confirmación</div>
        <div style={{ color:T.grey,fontSize:13,marginTop:10,lineHeight:1.7 }}>
          {pay==="Yape"
            ? "Envía la captura de tu pago Yape por WhatsApp. El local confirmará y tus puntos serán acreditados."
            : "Tu pedido está registrado. El repartidor te contactará al momento de la entrega."}
        </div>
        <div style={{ background:T.card,borderRadius:16,border:`1px solid ${T.border}`,padding:18,marginTop:24,width:"100%" }}>
          <div style={{ color:T.white,fontWeight:700,fontSize:15 }}>Total: S/ {total.toFixed(2)}</div>
          <div style={{ color:T.gold,fontSize:13,marginTop:6 }}>Ganarás: +{pts} pts al confirmarse</div>
        </div>
        <div style={{ color:T.grey,fontSize:11,marginTop:14 }}>Esta pantalla se actualiza automáticamente</div>
        <button className="btn-outline" style={{ marginTop:20,width:"100%" }} onClick={()=>setStep("form")}>← Volver</button>
      </div>
    );
  }

  // Pantalla: pago en efectivo confirmado
  if (step === "confirmed_cash") {
    return (
      <div style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:28,textAlign:"center" }}>
        <div style={{ fontSize:72 }}>✅</div>
        <div style={{ color:T.green,fontWeight:800,fontSize:20,marginTop:16 }}>¡Pago recibido!</div>
        <div style={{ color:T.white,fontSize:14,marginTop:12,lineHeight:1.7 }}>Su pedido ha sido registrado correctamente y será procesado en breve. ¡Gracias por su compra!</div>
        <div style={{ color:T.gold,fontWeight:700,fontSize:17,marginTop:20 }}>+{pts} pts acumulados 🎉</div>
        <button className="btn-red" style={{ marginTop:32,width:"100%" }} onClick={()=>setStep("form")}>Volver al inicio</button>
      </div>
    );
  }

  // Formulario principal
  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"10px 18px",borderBottom:`1px solid ${T.border}`,flexShrink:0 }}>
        <span style={{ color:T.white,fontWeight:800,fontSize:17 }}>MIS PEDIDOS</span>
      </div>
      <div className="scroll" style={{ padding:"12px 14px" }}>
        {cart.length > 0 && (
          <div style={{ marginBottom:18 }}>
            <div style={{ color:T.white,fontWeight:700,fontSize:14,marginBottom:10 }}>🛒 TU PEDIDO ACTUAL</div>
            {cart.map(item => (
              <div key={item.id} style={{ background:T.card,borderRadius:14,border:`1px solid ${T.border}`,padding:"11px 13px",marginBottom:7,display:"flex",alignItems:"center",gap:10 }}>
                <span style={{ fontSize:22 }}>{item.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ color:T.white,fontSize:13,fontWeight:600 }}>{item.name}</div>
                  <div style={{ color:T.gold,fontSize:13,fontWeight:700 }}>S/ {(item.price*item.qty).toFixed(2)}</div>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <button onClick={()=>onUpdate(item.id,item.qty-1)} style={{ background:T.border,border:"none",borderRadius:6,width:26,height:26,color:T.white,cursor:"pointer",fontFamily:"Poppins,sans-serif",fontSize:16 }}>−</button>
                  <span style={{ color:T.white,fontWeight:700,fontSize:13,minWidth:16,textAlign:"center" }}>{item.qty}</span>
                  <button onClick={()=>onUpdate(item.id,item.qty+1)} style={{ background:T.red,border:"none",borderRadius:6,width:26,height:26,color:"#fff",cursor:"pointer",fontFamily:"Poppins,sans-serif",fontSize:16 }}>+</button>
                </div>
              </div>
            ))}

            <div className="card" style={{ marginTop:12 }}>
              <div style={{ color:T.white,fontWeight:700,fontSize:13,marginBottom:12 }}>Datos del pedido</div>
              <div style={{ marginBottom:10 }}>
                <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>TU NOMBRE</div>
                <input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" />
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>DIRECCIÓN (para delivery)</div>
                <input className="inp" value={addr} onChange={e=>setAddr(e.target.value)} placeholder="Ej: Jr. Los Pinos 234, Apt 3B" />
              </div>
              <div style={{ marginBottom:14 }}>
                <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>MÉTODO DE PAGO</div>
                <div style={{ display:"flex",gap:8 }}>
                  {["Yape","Efectivo","Contra entrega"].map(m=>(
                    <button key={m} onClick={()=>setPay(m)} style={{ flex:1,padding:"9px 4px",borderRadius:10,border:`1.5px solid ${pay===m?T.gold:T.border}`,background:pay===m?`${T.gold}18`:T.card,color:pay===m?T.gold:T.grey,fontFamily:"Poppins,sans-serif",fontWeight:600,fontSize:11,cursor:"pointer" }}>{m}</button>
                  ))}
                </div>
              </div>

              {pay==="Yape" && (
                <div style={{ background:"#0a1628",border:"1px solid #1e3a5f",borderRadius:12,padding:"12px 14px",marginBottom:14 }}>
                  <div style={{ color:"#60A5FA",fontWeight:700,fontSize:12,marginBottom:6 }}>💜 Pago por Yape</div>
                  <div style={{ color:T.grey,fontSize:12,lineHeight:1.6 }}>
                    Una vez realizado el pago al número <strong style={{ color:T.white }}>969179450</strong> a nombre de <strong style={{ color:T.white }}>Brandon Tarazona Nieto</strong>, envíe la captura del comprobante para confirmar el pago.
                  </div>
                </div>
              )}
              {pay==="Contra entrega" && (
                <div style={{ background:"#0d1f06",border:"1px solid #2d4a0f",borderRadius:12,padding:"12px 14px",marginBottom:14 }}>
                  <div style={{ color:"#7ec850",fontWeight:700,fontSize:12,marginBottom:4 }}>🛵 Contra entrega</div>
                  <div style={{ color:T.grey,fontSize:12 }}>Pagas cuando recibes tu pedido. El repartidor te contactará al llegar.</div>
                </div>
              )}
              {pay==="Efectivo" && (
                <div style={{ background:"#1a0a00",border:"1px solid #3a2a0f",borderRadius:12,padding:"12px 14px",marginBottom:14 }}>
                  <div style={{ color:T.gold,fontWeight:700,fontSize:12,marginBottom:4 }}>💵 Pago en efectivo</div>
                  <div style={{ color:T.grey,fontSize:12 }}>Realiza el pago en el local. Tus puntos se acreditarán al instante.</div>
                </div>
              )}

              <div style={{ marginBottom:14 }}>
                <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>NOTAS ADICIONALES</div>
                <textarea className="inp" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Ej: Sin cebolla, salsa aparte..." style={{ resize:"none",height:60 }}/>
              </div>

              <div style={{ borderTop:`1px solid ${T.border}`,paddingTop:12 }}>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                  <span style={{ color:T.grey,fontSize:13 }}>Subtotal</span>
                  <span style={{ color:T.white,fontSize:13,fontWeight:600 }}>S/ {total.toFixed(2)}</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                  <span style={{ color:T.gold,fontSize:13 }}>💫 Ganarás</span>
                  <span style={{ color:T.gold,fontWeight:700,fontSize:13 }}>+{pts} pts</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",marginBottom:16 }}>
                  <span style={{ color:T.white,fontWeight:700,fontSize:15 }}>TOTAL</span>
                  <span style={{ color:T.white,fontWeight:900,fontSize:15 }}>S/ {total.toFixed(2)}</span>
                </div>
              </div>

              {(pay==="Yape"||pay==="Contra entrega") && (
                <>
                  <button onClick={doOrder} style={{ width:"100%",background:"#075E54",border:"none",borderRadius:12,padding:14,color:"#fff",fontFamily:"Poppins,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}>
                    <span style={{ fontSize:20 }}>💬</span> ENVIAR PEDIDO POR WHATSAPP
                  </button>
                  <div style={{ color:T.grey,fontSize:11,textAlign:"center",marginTop:8 }}>Se abrirá WhatsApp con tu pedido listo para enviar</div>
                </>
              )}
              {pay==="Efectivo" && (
                <button onClick={doOrder} style={{ width:"100%",background:T.red,border:"none",borderRadius:12,padding:14,color:"#fff",fontFamily:"Poppins,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer" }}>
                  💵 CONFIRMAR PEDIDO EN EFECTIVO
                </button>
              )}
            </div>
          </div>
        )}

        <div style={{ color:T.white,fontWeight:700,fontSize:14,marginBottom:10 }}>HISTORIAL</div>
        {myOrders.length===0 && <div style={{ color:T.grey,fontSize:13,textAlign:"center",padding:"20px 0" }}>Aún no tienes pedidos</div>}
        {myOrders.map(h=>(
          <div key={h.id} className="card" style={{ marginBottom:9,display:"flex",alignItems:"center",gap:12 }}>
            <span style={{ fontSize:26 }}>🍗</span>
            <div style={{ flex:1 }}>
              <div style={{ color:T.grey,fontSize:11 }}>{h.time} · {h.id}</div>
              <div style={{ display:"flex",gap:8,alignItems:"center",marginTop:4 }}>
                <StatusChip status={h.status}/>
                {h.payConfirmed && <span style={{ color:T.green,fontSize:11,fontWeight:700 }}>+{h.ptsEarned||Math.floor(h.total)} pts</span>}
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ color:T.white,fontWeight:700,fontSize:14 }}>S/ {h.total.toFixed(2)}</div>
              <div style={{ color:T.grey,fontSize:10 }}>{h.pay}</div>
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

function AdminPanel({ menuItems, setMenuItems, promos, setPromos, orders, setOrders, clients, refreshClients, onClose, onConfirmPayForUser }) {
  const [tab, setTab] = useState("pedidos");
  const [editItem, setEditItem] = useState(null);
  const [editPromo, setEditPromo] = useState(null);
  const [newItem, setNewItem] = useState(false);

  // Código de referido settings
  const [refCode, setRefCode]       = useState(() => { try { return localStorage.getItem("cb_refcode")||"POLLO"; } catch{return "POLLO";} });
  const [refActive, setRefActive]   = useState(() => { try { return localStorage.getItem("cb_refactive")!=="false"; } catch{return true;} });
  const [refEdit, setRefEdit]       = useState(false);
  const [refTemp, setRefTemp]       = useState(refCode);

  const saveRef = () => {
    const c = refTemp.trim().toUpperCase();
    if (!c) return;
    setRefCode(c);
    setRefActive(true);
    try { localStorage.setItem("cb_refcode",c); localStorage.setItem("cb_refactive","true"); } catch{}
    setRefEdit(false);
  };
  const toggleRef = (v) => {
    setRefActive(v);
    try { localStorage.setItem("cb_refactive",String(v)); } catch{}
  };

  // ── Tab: Pedidos ──────────────────────────────────────────────────────────
  const TabPedidos = () => {
    const stats = [
      { label:"Nuevos",     val:orders.filter(o=>o.status==="Nuevo").length,                               color:T.blue  },
      { label:"En proceso", val:orders.filter(o=>o.status==="Preparando"||o.status==="En Reparto").length, color:T.gold  },
      { label:"Entregados", val:orders.filter(o=>o.status==="Entregado").length,                           color:T.green },
    ];
    const nextStatus = { "Nuevo":"Preparando","Preparando":"En Reparto","En Reparto":"Entregado","Entregado":"Entregado" };

    const confirmPay = (orderId) => {
      setOrders(prev => prev.map(o => {
        if (o.id !== orderId) return o;
        const updated = { ...o, payConfirmed: true, status: "Preparando" };
        const users = getUsers();
        const idx = users.findIndex(u => u.celular === o.celular);
        if (idx !== -1) {
          const newPts = (users[idx].pts||0) + Math.floor(o.total);
          users[idx] = { ...users[idx], pts: newPts };
          saveUsers(users);
          refreshClients();
          onConfirmPayForUser && onConfirmPayForUser(o.celular, newPts);
        }
        return updated;
      }));
    };

    return (
      <div className="scroll" style={{ padding:"12px 14px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14 }}>
          {stats.map(s=>(
            <div key={s.label} className="card" style={{ textAlign:"center" }}>
              <div style={{ color:s.color,fontWeight:900,fontSize:22 }}>{s.val}</div>
              <div style={{ color:T.grey,fontSize:10 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {orders.length===0 && <div style={{ textAlign:"center",color:T.grey,padding:"40px 0" }}>No hay pedidos aún.</div>}
        {orders.map(o=>(
          <div key={o.id} className="order-card">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
              <div>
                <div style={{ color:T.white,fontWeight:700,fontSize:14 }}>{o.name}</div>
                <div style={{ color:T.grey,fontSize:11 }}>{o.id} · {o.time}</div>
              </div>
              <StatusChip status={o.status}/>
            </div>
            <div style={{ color:T.grey,fontSize:12,marginBottom:8 }}>
              {o.items.map(i=>`${i.qty}x ${i.name}`).join(", ")}
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
              <div>
                <span style={{ color:T.white,fontWeight:700,fontSize:15 }}>{fmt(o.total)}</span>
                <span style={{ color:T.grey,fontSize:12 }}> · {o.pay}</span>
              </div>
            </div>

            {/* Acciones según método de pago */}
            {!o.payConfirmed && (o.pay==="Yape"||o.pay==="Contra entrega") && (
              <div style={{ background:"#1a2a0a",border:"1px solid #2d4a0f",borderRadius:10,padding:"10px 12px",marginBottom:8 }}>
                <div style={{ color:"#7ec850",fontSize:12,fontWeight:700,marginBottom:6 }}>
                  {o.pay==="Yape" ? "💜 Esperando comprobante Yape" : "🛵 Pedido contra entrega"}
                </div>
                <button onClick={()=>confirmPay(o.id)}
                  style={{ width:"100%",background:T.green,border:"none",borderRadius:8,padding:"8px",color:"#fff",fontFamily:"Poppins,sans-serif",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                  ✅ CONFIRMAR PAGO RECIBIDO
                </button>
              </div>
            )}
            {!o.payConfirmed && o.pay==="Efectivo" && (
              <div style={{ background:"#0d1f06",border:"1px solid #2d4a0f",borderRadius:10,padding:"10px 12px",marginBottom:8 }}>
                <div style={{ color:"#7ec850",fontSize:12,fontWeight:700,marginBottom:6 }}>💵 Pago en efectivo</div>
                <button onClick={()=>confirmPay(o.id)}
                  style={{ width:"100%",background:T.green,border:"none",borderRadius:8,padding:"8px",color:"#fff",fontFamily:"Poppins,sans-serif",fontSize:12,fontWeight:700,cursor:"pointer" }}>
                  ✅ PAGAR Y REGISTRAR
                </button>
              </div>
            )}
            {o.payConfirmed && (
              <div style={{ background:"#0d2a0d",border:"1px solid #22C55E40",borderRadius:10,padding:"8px 12px",marginBottom:8 }}>
                <span style={{ color:T.green,fontSize:12,fontWeight:700 }}>✅ Pago confirmado · +{Math.floor(o.total)} pts acreditados</span>
              </div>
            )}

            <div style={{ display:"flex",gap:6 }}>
              {o.status!=="Entregado" && (
                <button onClick={()=>setOrders(prev=>prev.map(x=>x.id===o.id?{...x,status:nextStatus[x.status]}:x))}
                  style={{ flex:1,background:T.red,border:"none",borderRadius:8,padding:"6px 12px",color:"#fff",fontFamily:"Poppins,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer" }}>
                  → {nextStatus[o.status]}
                </button>
              )}
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola ${o.name}! Tu pedido ${o.id} está ${o.status.toLowerCase()}. 🍔`)}`} target="_blank" rel="noreferrer"
                style={{ background:"#075E54",border:"none",borderRadius:8,padding:"6px 10px",color:"#fff",fontFamily:"Poppins,sans-serif",fontSize:11,fontWeight:700,cursor:"pointer",textDecoration:"none",display:"flex",alignItems:"center" }}>💬</a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── Tab: Código QR (escanear código del cliente) ──────────────────────────
  const TabCodigo = () => {
    const [inputCode, setInputCode] = useState("");
    const [pts, setPts]             = useState("");
    const [found, setFound]         = useState(null);
    const [err, setErr]             = useState("");
    const [done, setDone]           = useState(false);

    const buscar = () => {
      setErr(""); setFound(null); setDone(false);
      const users = getUsers();
      const match = users.find(u => generateCode(u.celular) === inputCode.trim());
      if (!match) { setErr("Código incorrecto o no encontrado"); return; }
      setFound(match);
    };

    const registrar = () => {
      const ptsNum = parseInt(pts);
      if (!ptsNum || ptsNum <= 0) { setErr("Ingresa puntos válidos"); return; }
      const users = getUsers();
      const idx = users.findIndex(u => u.celular === found.celular);
      if (idx !== -1) {
        users[idx] = { ...users[idx], pts: (users[idx].pts||0) + ptsNum };
        saveUsers(users);
        refreshClients();
      }
      setDone(true);
    };

    return (
      <div className="scroll" style={{ padding:"16px 14px" }}>
        <div style={{ textAlign:"center",marginBottom:20 }}>
          <div style={{ fontSize:40 }}>📱</div>
          <div style={{ color:T.white,fontWeight:700,fontSize:16,marginTop:8 }}>Ingresar Código del Cliente</div>
          <div style={{ color:T.grey,fontSize:12,marginTop:4 }}>El cliente te muestra su código de 6 dígitos</div>
        </div>

        <div style={{ marginBottom:12 }}>
          <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>CÓDIGO DEL CLIENTE (6 dígitos)</div>
          <input className="inp" placeholder="000000" type="number" maxLength={6} value={inputCode}
            onChange={e=>{ setInputCode(e.target.value); setFound(null); setErr(""); setDone(false); }}
            style={{ fontSize:24,fontWeight:800,letterSpacing:6,textAlign:"center" }} />
        </div>
        <button onClick={buscar} className="btn-red" style={{ marginBottom:16 }}>BUSCAR CLIENTE</button>

        {err && <div style={{ background:"#2a0a0a",border:`1px solid ${T.red}40`,borderRadius:10,padding:"10px 14px",color:"#F87171",fontSize:13,marginBottom:12 }}>⚠️ {err}</div>}

        {found && !done && (
          <div style={{ background:T.card,border:`1px solid ${T.gold}40`,borderRadius:16,padding:16,marginBottom:14 }}>
            <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:14 }}>
              <div style={{ width:46,height:46,borderRadius:"50%",background:`${T.red}25`,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:20,border:`2px solid ${T.gold}` }}>{found.nombre[0].toUpperCase()}</div>
              <div>
                <div style={{ color:T.white,fontWeight:700,fontSize:15 }}>{found.nombre}</div>
                <div style={{ color:T.grey,fontSize:12 }}>{found.celular}</div>
                <div style={{ display:"flex",gap:4,alignItems:"center",marginTop:3 }}>
                  <span style={{ color:getLevel(found.pts||0).color,fontSize:12,fontWeight:700 }}>{getLevel(found.pts||0).icon} {getLevel(found.pts||0).name}</span>
                  <span style={{ color:T.gold,fontSize:12 }}>· {found.pts||0} pts actuales</span>
                </div>
              </div>
            </div>
            <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>PUNTOS A ACUMULAR</div>
            <input className="inp" placeholder="Ej: 28 (según total del pedido)" type="number" value={pts}
              onChange={e=>setPts(e.target.value)} style={{ marginBottom:12 }} />
            <button onClick={registrar} style={{ width:"100%",background:T.green,border:"none",borderRadius:12,padding:13,color:"#fff",fontFamily:"Poppins,sans-serif",fontWeight:700,fontSize:14,cursor:"pointer" }}>
              ✅ REGISTRAR PUNTOS
            </button>
          </div>
        )}

        {done && (
          <div style={{ background:"#0d2a0d",border:"1px solid #22C55E40",borderRadius:16,padding:20,textAlign:"center" }}>
            <div style={{ fontSize:40 }}>🎉</div>
            <div style={{ color:T.green,fontWeight:800,fontSize:16,marginTop:8 }}>¡Listo!</div>
            <div style={{ color:T.white,fontSize:13,marginTop:6 }}>Se acreditaron <strong style={{ color:T.gold }}>{pts} puntos</strong> a {found?.nombre}</div>
            <button onClick={()=>{ setInputCode(""); setPts(""); setFound(null); setErr(""); setDone(false); }}
              className="btn-red" style={{ marginTop:16,width:"100%" }}>Registrar otro</button>
          </div>
        )}
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

        {/* ── Código de Referido ── */}
        <div style={{ background:T.card,border:`1px solid ${T.gold}40`,borderRadius:16,padding:16,marginBottom:16 }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
            <div>
              <div style={{ color:T.gold,fontWeight:700,fontSize:13 }}>🎁 Código de Referido</div>
              <div style={{ color:T.grey,fontSize:11,marginTop:2 }}>Los clientes usan este código al registrarse</div>
            </div>
            <label className="toggle"><input type="checkbox" checked={refActive} onChange={e=>toggleRef(e.target.checked)}/><span className="toggle-track"/></label>
          </div>
          {refEdit ? (
            <div style={{ display:"flex",gap:8,alignItems:"center" }}>
              <input className="inp" value={refTemp} onChange={e=>setRefTemp(e.target.value.toUpperCase())} placeholder="Nuevo código" style={{ flex:1,fontWeight:800,letterSpacing:2,textTransform:"uppercase" }} maxLength={12} />
              <button onClick={saveRef} style={{ background:T.green,border:"none",borderRadius:10,padding:"10px 14px",color:"#fff",fontFamily:"Poppins,sans-serif",fontWeight:700,fontSize:12,cursor:"pointer" }}>✓ Guardar</button>
              <button onClick={()=>setRefEdit(false)} style={{ background:T.border,border:"none",borderRadius:10,padding:"10px 10px",color:T.grey,fontFamily:"Poppins,sans-serif",fontSize:12,cursor:"pointer" }}>✕</button>
            </div>
          ) : (
            <div style={{ display:"flex",alignItems:"center",gap:10,background:T.surface,borderRadius:12,padding:"10px 14px" }}>
              <div style={{ flex:1 }}>
                <div style={{ color:refActive?T.white:T.grey,fontWeight:800,fontSize:22,letterSpacing:3 }}>{refCode}</div>
                <div style={{ color:refActive?T.green:T.grey,fontSize:11,marginTop:2 }}>{refActive?"✅ Activo · 50 pts por referido":"⛔ Desactivado"}</div>
              </div>
              <button onClick={()=>{setRefTemp(refCode);setRefEdit(true);}} style={{ background:"none",border:`1px solid ${T.border}`,borderRadius:10,padding:"8px 12px",color:T.grey,cursor:"pointer",fontSize:12,fontFamily:"Poppins,sans-serif" }}>✏️ Cambiar</button>
            </div>
          )}
        </div>

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
    // clientes reales registrados (excluye al dueño de la lista visible si quieres, o muéstralos todos)
    const todayMD = new Date().toLocaleDateString("es",{day:"2-digit",month:"2-digit"});
    const bdToday = clients.filter(c => {
      if (!c.nacimiento) return false;
      const parts = c.nacimiento.split("/");
      return parts[0]===todayMD.split("/")[0] && parts[1]===todayMD.split("/")[1];
    }).length;
    const nivelOroPlus = clients.filter(c => { const l=getLevel(c.pts||0); return l.name==="Oro"||l.name==="Diamante"; }).length;
    return (
      <div className="scroll" style={{ padding:"12px 14px" }}>
        <div className="card" style={{ marginBottom:12,display:"flex",justifyContent:"space-between" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:T.white,fontWeight:800,fontSize:20 }}>{clients.length}</div>
            <div style={{ color:T.grey,fontSize:10 }}>Clientes</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:T.gold,fontWeight:800,fontSize:20 }}>{nivelOroPlus}</div>
            <div style={{ color:T.grey,fontSize:10 }}>Nivel Oro+</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:T.red,fontWeight:800,fontSize:20 }}>{bdToday}</div>
            <div style={{ color:T.grey,fontSize:10 }}>Cumpleaños hoy</div>
          </div>
        </div>
        {clients.length === 0 && (
          <div style={{ textAlign:"center",padding:"40px 0",color:T.grey }}>
            <div style={{ fontSize:40,marginBottom:12 }}>👥</div>
            <div style={{ fontWeight:600 }}>Aún no hay clientes registrados</div>
            <div style={{ fontSize:12,marginTop:6 }}>Cuando alguien se registre en la app, aparecerá aquí</div>
          </div>
        )}
        {clients.map(c=>{
          const lvl = getLevel(c.pts||0);
          return (
            <div key={c.celular} className="card" style={{ marginBottom:8 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                  <div style={{ width:38,height:38,borderRadius:"50%",background:`${T.red}25`,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:16,border:`1.5px solid ${lvl.color}` }}>{(c.nombre||"?")[0].toUpperCase()}</div>
                  <div>
                    <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                      <div style={{ color:T.white,fontWeight:700,fontSize:13 }}>{c.nombre}</div>
                      {c.isOwner && <span style={{ background:T.gold,color:"#000",fontSize:8,fontWeight:700,padding:"1px 6px",borderRadius:10 }}>DUEÑO</span>}
                    </div>
                    <div style={{ color:T.grey,fontSize:11 }}>{c.celular} · 🎂 {c.nacimiento||"—"}</div>
                    <div style={{ display:"flex",gap:6,marginTop:3,alignItems:"center" }}>
                      <span style={{ color:lvl.color,fontSize:11,fontWeight:700 }}>{lvl.icon} {lvl.name}</span>
                      <span style={{ color:T.gold,fontSize:11 }}>· {c.pts||0} pts</span>
                    </div>
                  </div>
                </div>
                <a href={`https://wa.me/51${c.celular}?text=${encodeURIComponent("¡Hola "+((c.nombre||"").split(" ")[0])+"! 🔥 Tienes una promo especial en Chino Broaster. ¡Visítanos!")}`} target="_blank" rel="noreferrer"
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
    { id:"pagar",   label:"Pagar",   icon:"📱" },
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
        {tab==="pagar"   && <TabCodigo/>}
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
// USER DATABASE (localStorage)
// ════════════════════════════════════════════════════════════════════════════

const OWNER = {
  nombre: "Brandon",
  celular: "969179450",
  contrasena: "03032002",   // fecha nacimiento sin slashes
  nacimiento: "03/03/2002",
  referido: "POLLO",
  pts: 0,
  isOwner: true,
};

function getUsers() {
  try {
    const raw = localStorage.getItem("cb_users");
    if (!raw) return [OWNER];
    const users = JSON.parse(raw);
    // siempre asegurar que el dueño existe
    if (!users.find(u => u.celular === OWNER.celular)) users.unshift(OWNER);
    return users;
  } catch { return [OWNER]; }
}

function saveUsers(users) {
  try { localStorage.setItem("cb_users", JSON.stringify(users)); } catch {}
}

// ── Session persistence: guardar sesión por 2 horas ──────────────────────────
const SESSION_KEY = "cb_session";
const SESSION_TTL = 2 * 60 * 60 * 1000; // 2 horas

function saveSession(user) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({ user, ts: Date.now() })); } catch {}
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { user, ts } = JSON.parse(raw);
    if (Date.now() - ts > SESSION_TTL) { localStorage.removeItem(SESSION_KEY); return null; }
    const users = getUsers();
    const fresh = users.find(u => u.celular === user.celular);
    return fresh || user;
  } catch { return null; }
}

function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

// ════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ════════════════════════════════════════════════════════════════════════════
function LoginScreen({ onBack, onSuccess }) {
  const [celular, setCelular] = useState("");
  const [pass, setPass]       = useState("");
  const [error, setError]     = useState("");

  const doLogin = () => {
    const cel = celular.replace(/\s/g,"");
    const users = getUsers();
    const found = users.find(u => u.celular.replace(/\s/g,"") === cel);
    if (!found) { setError("Número no registrado en este dispositivo. Si te registraste en otro celular, vuelve a registrarte aquí."); return; }
    if (found.contrasena !== pass) { setError("Contraseña incorrecta"); return; }
    setError("");
    onSuccess(found);
  };

  return (
    <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
      <div style={{ padding:"10px 18px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${T.border}`,flexShrink:0 }}>
        <button className="btn-ghost" onClick={onBack} style={{ color:T.white,fontSize:22 }}>←</button>
        <span style={{ color:T.white,fontWeight:700,fontSize:16 }}>Iniciar Sesión</span>
      </div>
      <div className="scroll" style={{ padding:"28px 22px" }}>
        <div style={{ textAlign:"center",marginBottom:28 }}>
          <div style={{ fontSize:52 }}>🔥</div>
          <div style={{ color:T.white,fontWeight:800,fontSize:20,marginTop:8 }}>Bienvenido de vuelta</div>
          <div style={{ color:T.grey,fontSize:13 }}>Ingresa con tu celular y contraseña</div>
        </div>
        <div style={{ marginBottom:14 }}>
          <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>NÚMERO DE CELULAR</div>
          <input className="inp" placeholder="999 999 999" type="tel" value={celular} onChange={e=>setCelular(e.target.value)} />
        </div>
        <div style={{ marginBottom:18 }}>
          <div style={{ color:T.grey,fontSize:11,fontWeight:600,marginBottom:5 }}>CONTRASEÑA</div>
          <input className="inp" placeholder="Tu contraseña" type="password" value={pass} onChange={e=>setPass(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&doLogin()} />
        </div>
        {error && <div style={{ background:"#2a0a0a",border:`1px solid ${T.red}40`,borderRadius:10,padding:"10px 14px",color:"#F87171",fontSize:13,marginBottom:14 }}>⚠️ {error}</div>}
        <button className="btn-red" onClick={doLogin}>INICIAR SESIÓN</button>
        <div style={{ textAlign:"center",color:T.grey,fontSize:12,marginTop:16 }}>
          ¿No tienes cuenta? <span style={{ color:T.gold,fontWeight:600,cursor:"pointer" }} onClick={onBack}>Regístrate gratis</span>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [mode, setMode]           = useState("app");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Shared state
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [promos, setPromos]       = useState(INITIAL_PROMOS);
  const [orders, setOrders]       = useState([]);

  // Client state — restore from session automatically
  const [user, setUser]   = useState(() => loadSession());
  const [cart, setCart]   = useState([]);
  const [toast, setToast] = useState(null);

  // Restore screen to "app" if session found
  const [screen, setScreen] = useState(() => loadSession() ? "app" : "splash");
  const [tab, setTab]       = useState("home");

  // Sync clients list for admin
  const [clients, setClients] = useState(() => getUsers());

  const refreshClients = () => setClients(getUsers());

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

  const placeOrder = useCallback((payMethod, addr, notes, name, givePointsNow) => {
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    const earned = Math.floor(total);
    const newOrder = {
      id: `#CB-${String(orders.length+1).padStart(3,"0")}`,
      name: name || user.nombre,
      celular: user.celular,
      time: new Date().toLocaleTimeString("es",{hour:"2-digit",minute:"2-digit"}),
      date: new Date().toLocaleDateString("es",{day:"2-digit",month:"short"}),
      status: "Nuevo",
      pay: payMethod,
      total,
      items: cart.map(i=>({qty:i.qty,name:i.name,emoji:i.emoji})),
      payConfirmed: givePointsNow,
      ptsEarned: earned,
      addr: addr||"",
      notes: notes||"",
    };
    setOrders(prev=>[newOrder,...prev]);
    if (givePointsNow) {
      const updatedUser = {...user, pts: user.pts + earned};
      setUser(updatedUser);
      saveSession(updatedUser);
      const users = getUsers();
      const idx = users.findIndex(u => u.celular === user.celular);
      if (idx !== -1) { users[idx] = {...users[idx], pts: updatedUser.pts}; saveUsers(users); refreshClients(); }
    }
    setCart([]);
  }, [cart, orders, user]);

  const doLogin = (foundUser) => {
    saveSession(foundUser);
    setUser(foundUser);
    setScreen("app");
    setTab("home");
  };

  const doLogout = () => {
    clearSession();
    setUser(null);
    setScreen("splash");
    setCart([]);
    setTab("home");
  };

  // Admin access: only owner (Brandon)
  const tryAdmin = () => {
    const users = getUsers();
    const owner = users.find(u => u.isOwner);
    if (adminPass === owner.contrasena) {
      setMode("admin");
      setShowAdminModal(false);
      setAdminPass("");
      setAdminError("");
      refreshClients();
    } else {
      setAdminError("Contraseña incorrecta");
    }
  };

  const navItems = [
    { id:"home",    icon:"🏠", label:"Inicio" },
    { id:"menu",    icon:"🍴", label:"Menú" },
    { id:"qr",      icon:"📱", label:"Pagar",  isQR:true },
    { id:"rewards", icon:"🎁", label:"Premios" },
    { id:"perfil",  icon:"👤", label:"Perfil" },
  ];

  const updateUserPts = useCallback((newPts) => {
    const updatedUser = {...user, pts: newPts};
    setUser(updatedUser);
    const users = getUsers();
    const idx = users.findIndex(u => u.celular === user.celular);
    if (idx !== -1) { users[idx] = {...users[idx], pts: newPts}; saveUsers(users); refreshClients(); }
  }, [user]);

  const renderTab = () => {
    if (!user) return null;
    switch(tab) {
      case "home":    return <HomeScreen user={user} cart={cart} promos={promos} onNav={setTab} menuItems={menuItems}/>;
      case "menu":    return <MenuScreen cart={cart} onAdd={addToCart} onNav={setTab} menuItems={menuItems}/>;
      case "qr":      return <QRScreen user={user} onBack={()=>setTab("home")}/>;
      case "rewards": return <RewardsScreen user={user} onClaim={pts=>{ const newPts=user.pts-pts; updateUserPts(newPts); }}/>;
      case "nivel":   return <NivelScreen user={user}/>;
      case "pedidos": return <PedidosScreen cart={cart} user={user} onUpdate={updateCart} onPlaceOrder={placeOrder} orders={orders} onUpdateUser={updateUserPts}/>;
      case "perfil":  return <ProfileScreen user={user} onLogout={doLogout}/>;
      default: return null;
    }
  };

  // Admin password modal — defined outside render to avoid focus loss
  const AdminModal = useCallback(() => (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.85)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:24 }}>
      <div style={{ background:T.surface,borderRadius:20,padding:24,width:"100%",maxWidth:340,border:`1px solid ${T.border}` }}>
        <div style={{ textAlign:"center",marginBottom:20 }}>
          <div style={{ fontSize:36 }}>🔐</div>
          <div style={{ color:T.white,fontWeight:700,fontSize:16,marginTop:8 }}>Acceso Admin</div>
          <div style={{ color:T.grey,fontSize:12,marginTop:4 }}>Solo para el dueño del negocio</div>
        </div>
        <input
          className="inp"
          type="password"
          placeholder="Contraseña del dueño"
          autoFocus
          autoComplete="current-password"
          value={adminPass}
          onChange={e=>{setAdminPass(e.target.value);setAdminError("");}}
          onKeyDown={e=>e.key==="Enter"&&tryAdmin()}
          style={{ marginBottom:10 }}
        />
        {adminError && <div style={{ color:"#F87171",fontSize:12,marginBottom:10 }}>⚠️ {adminError}</div>}
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={()=>{setShowAdminModal(false);setAdminPass("");setAdminError("");}} className="btn-outline" style={{ flex:1 }}>Cancelar</button>
          <button onClick={tryAdmin} className="btn-red" style={{ flex:1 }}>Entrar</button>
        </div>
      </div>
    </div>
  ), [adminPass, adminError]);

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
          {screen === "splash"   && <SplashScreen onLogin={()=>setScreen("login")} onRegister={()=>setScreen("register")}/>}
          {screen === "login"    && <LoginScreen onBack={()=>setScreen("splash")} onSuccess={doLogin}/>}
          {screen === "register" && <RegisterScreen onBack={()=>setScreen("splash")} onSuccess={doLogin}/>}
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

      {/* Admin button — pequeño, discreto, solo visible en splash o cuando está en admin */}
      {(screen === "splash" || screen === "login" || mode === "admin") && (
        <div className="mode-switch">
          {mode === "admin"
            ? <>
                <button className="mode-btn act" onClick={()=>setMode("app")}>← App</button>
              </>
            : <button className="mode-btn" onClick={()=>setShowAdminModal(true)} style={{ fontSize:10,padding:"6px 10px" }}>⚙️</button>
          }
        </div>
      )}

      {showAdminModal && <AdminModal/>}

      {mode === "app"
        ? <ClientApp/>
        : <AdminPanel menuItems={menuItems} setMenuItems={setMenuItems} promos={promos} setPromos={setPromos} orders={orders} setOrders={setOrders} clients={clients} refreshClients={refreshClients} onClose={()=>setMode("app")}
            onConfirmPayForUser={(cel,newPts)=>{ if(user && user.celular===cel){ setUser(prev=>({...prev,pts:newPts})); } }}
          />
      }
    </>
  );
}

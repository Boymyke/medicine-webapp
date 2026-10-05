"use client";

import {
  Activity,
  Bell,
  Box,
  ChevronDown,
  Clock,
  CreditCard,
  Grid,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Star,
  Truck,
  User,
  Users,
  X,
} from "react-feather";
import { useMemo, useState } from "react";

type Medicine = {
  name: string;
  generic: string;
  strength: string;
  form: string;
  price: number;
  pharmacies: number;
  stock: string;
  eta: string;
};

const medicines: Medicine[] = [
  { name: "Augmentin", generic: "Amoxicillin + Clavulanate", strength: "625mg", form: "14 tablets", price: 12500, pharmacies: 18, stock: "In stock", eta: "18–25 min" },
  { name: "Panadol Extra", generic: "Paracetamol + Caffeine", strength: "500mg / 65mg", form: "24 tablets", price: 3200, pharmacies: 42, stock: "In stock", eta: "12–20 min" },
  { name: "Coartem", generic: "Artemether + Lumefantrine", strength: "20mg / 120mg", form: "24 tablets", price: 4800, pharmacies: 27, stock: "In stock", eta: "20–35 min" },
  { name: "Norvasc", generic: "Amlodipine", strength: "10mg", form: "30 tablets", price: 8900, pharmacies: 11, stock: "Low stock", eta: "25–40 min" },
];

const pharmacies = [
  { name: "HealthPlus Lekki", distance: "1.2 km", rating: "4.9", stock: "96%", eta: "18 min" },
  { name: "MedPlus Admiralty", distance: "2.4 km", rating: "4.8", stock: "92%", eta: "24 min" },
  { name: "Alpha Pharmacy", distance: "3.1 km", rating: "4.7", stock: "89%", eta: "29 min" },
];

const orders = [
  { id: "#MD-10482", medicine: "Augmentin 625mg", pharmacy: "HealthPlus Lekki", amount: "₦12,500", status: "Out for delivery" },
  { id: "#MD-10479", medicine: "Panadol Extra", pharmacy: "MedPlus Admiralty", amount: "₦3,200", status: "Delivered" },
  { id: "#MD-10472", medicine: "Coartem 20/120mg", pharmacy: "Alpha Pharmacy", amount: "₦4,800", status: "Delivered" },
];

const nav = [
  { label: "Dashboard", icon: Home },
  { label: "Find medicine", icon: Search },
  { label: "Orders", icon: ShoppingBag },
  { label: "Pharmacies", icon: MapPin },
  { label: "Prescriptions", icon: Activity },
  { label: "Insurance / HMO", icon: Shield },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return medicines;
    const q = query.toLowerCase();
    return medicines.filter((m) => `${m.name} ${m.generic} ${m.strength}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><Activity size={20} /></div>
          <div>
            <div className="brand-name">MediFind</div>
            <div className="brand-sub">Medicine network</div>
          </div>
          <button className="icon-btn mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={19} /></button>
        </div>

        <div className="sidebar-search">
          <Search size={16} />
          <input placeholder="Search" />
          <span>⌘ K</span>
        </div>

        <div className="section-label">MAIN MENU</div>
        <nav className="nav-list">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} onClick={() => { setActive(item.label); setMobileOpen(false); }}>
                <Icon size={17} />
                <span>{item.label}</span>
                {item.label === "Orders" && <span className="nav-badge">3</span>}
              </button>
            );
          })}
        </nav>

        <div className="section-label">PHARMACY TOOLS</div>
        <nav className="nav-list">
          <button className="nav-item"><Package size={17} /><span>Inventory portal</span></button>
          <button className="nav-item"><Users size={17} /><span>Hospital API</span></button>
          <button className="nav-item"><Grid size={17} /><span>Integrations</span></button>
        </nav>

        <div className="section-label">GENERAL</div>
        <nav className="nav-list general-nav">
          <button className="nav-item"><Settings size={17} /><span>Settings</span></button>
          <button className="nav-item"><HelpCircle size={17} /><span>Help centre</span></button>
          <button className="nav-item"><LogOut size={17} /><span>Log out</span></button>
        </nav>

        <div className="upgrade-card">
          <div className="upgrade-icon"><Shield size={17} /></div>
          <strong>Pharmacy partner?</strong>
          <p>Sync live inventory and receive verified orders.</p>
          <button>Join network</button>
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button>
            <div className="crumbs"><span>MediFind</span><span>›</span><strong>{active}</strong></div>
          </div>
          <div className="top-actions">
            <button className="icon-btn"><HelpCircle size={18} /></button>
            <button className="icon-btn"><Bell size={18} /></button>
            <div className="user-pill"><div className="avatar">OM</div><ChevronDown size={15} /></div>
          </div>
        </header>

        <div className="page-wrap">
          <div className="page-heading-row">
            <div>
              <h1>Find medicine near you</h1>
              <p>Search live stock from verified pharmacies and order from the best available option.</p>
            </div>
            <button className="location-pill"><MapPin size={16} /> Lekki, Lagos <ChevronDown size={14} /></button>
          </div>

          <section className="hero-search-card">
            <div className="hero-copy">
              <span className="eyebrow">LIVE PHARMACY INVENTORY</span>
              <h2>Know where your medicine is before you leave home.</h2>
              <p>Compare nearby stock, prices, HMO coverage and delivery time in one place.</p>
            </div>
            <div className="medicine-search">
              <Search size={20} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search medicine, generic name or strength" />
              <button>Search</button>
            </div>
            <div className="quick-searches">
              <span>Popular:</span>
              {['Augmentin', 'Panadol', 'Coartem', 'Amlodipine'].map((item) => <button key={item} onClick={() => setQuery(item)}>{item}</button>)}
            </div>
          </section>

          <section className="stat-grid">
            <article className="stat-card primary">
              <div className="stat-icon"><Package size={20} /></div>
              <div className="stat-top"><span>Medicines indexed</span><span className="trend">+8.4%</span></div>
              <strong>48,290</strong>
              <p>Across branded and generic options</p>
            </article>
            <article className="stat-card">
              <div className="stat-icon soft"><MapPin size={20} /></div>
              <div className="stat-top"><span>Verified pharmacies</span><span className="trend">+24</span></div>
              <strong>1,284</strong>
              <p>Live inventory partners</p>
            </article>
            <article className="stat-card">
              <div className="stat-icon soft"><Clock size={20} /></div>
              <div className="stat-top"><span>Average fulfilment</span><span className="trend">-6 min</span></div>
              <strong>24 min</strong>
              <p>Search to pharmacy confirmation</p>
            </article>
          </section>

          <section className="main-grid">
            <article className="panel inventory-panel">
              <div className="panel-head">
                <div><h3>Medicine availability</h3><p>Live results from pharmacies around you</p></div>
                <button className="text-btn">View all <span>→</span></button>
              </div>
              <div className="medicine-list">
                {results.map((m) => (
                  <div className="medicine-row" key={m.name}>
                    <div className="med-icon"><Box size={18} /></div>
                    <div className="med-main"><strong>{m.name} <span>{m.strength}</span></strong><p>{m.generic} · {m.form}</p></div>
                    <div className="availability"><span className={`stock-dot ${m.stock === 'Low stock' ? 'low' : ''}`}></span><strong>{m.stock}</strong><p>{m.pharmacies} pharmacies</p></div>
                    <div className="price"><strong>₦{m.price.toLocaleString()}</strong><p>from</p></div>
                    <button className="outline-btn">Compare</button>
                  </div>
                ))}
                {results.length === 0 && <div className="empty-state">No matching medicines found. Try a generic or brand name.</div>}
              </div>
            </article>

            <article className="panel nearby-panel">
              <div className="panel-head"><div><h3>Nearby pharmacies</h3><p>Verified partners with live stock</p></div><button className="mini-filter">Nearest <ChevronDown size={14} /></button></div>
              <div className="pharmacy-list">
                {pharmacies.map((p, index) => (
                  <div className="pharmacy-card" key={p.name}>
                    <div className="pharm-index">{index + 1}</div>
                    <div className="pharm-info"><strong>{p.name}</strong><div><MapPin size={13} /> {p.distance} <span>•</span> <Star size={13} /> {p.rating}</div></div>
                    <div className="pharm-meta"><span>{p.stock} stocked</span><small>{p.eta}</small></div>
                  </div>
                ))}
              </div>
              <button className="map-btn"><MapPin size={16} /> Open pharmacy map</button>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel orders-panel">
              <div className="panel-head"><div><h3>Recent orders</h3><p>Track your latest pharmacy purchases</p></div><button className="text-btn">View all <span>→</span></button></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Order</th><th>Medicine</th><th>Pharmacy</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td><strong>{order.medicine}</strong></td><td>{order.pharmacy}</td><td>{order.amount}</td><td><span className={`status ${order.status === 'Delivered' ? 'done' : ''}`}>{order.status === 'Delivered' ? <Activity size={12} /> : <Truck size={12} />}{order.status}</span></td></tr>)}</tbody>
                </table>
              </div>
            </article>

            <article className="panel insurance-card">
              <div className="insurance-icon"><CreditCard size={22} /></div>
              <span className="eyebrow dark">HMO & INSURANCE</span>
              <h3>Check what your health plan covers.</h3>
              <p>Connect an HMO to see eligible medicines and estimated out-of-pocket costs before checkout.</p>
              <div className="insurance-badges"><span>AXA Mansard</span><span>Hygeia</span><span>Reliance</span></div>
              <button>Connect HMO <span>→</span></button>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

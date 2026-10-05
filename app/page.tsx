"use client";

import {
  Activity,
  BarChart2,
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  CreditCard,
  Database,
  FileText,
  Grid,
  HelpCircle,
  Home,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sliders,
  Truck,
  Users,
  X,
  Zap,
} from "react-feather";
import { useMemo, useState } from "react";

type MedicineRow = {
  name: string;
  generic: string;
  inventory: string;
  pharmacies: number;
  price: string;
  demand: string;
  status: "Healthy" | "Low stock";
};

const medicineRows: MedicineRow[] = [
  { name: "Augmentin 625mg", generic: "Amoxicillin + Clavulanate", inventory: "3,824 units", pharmacies: 118, price: "₦12,500", demand: "+18.4%", status: "Healthy" },
  { name: "Panadol Extra", generic: "Paracetamol + Caffeine", inventory: "8,416 units", pharmacies: 204, price: "₦3,200", demand: "+12.7%", status: "Healthy" },
  { name: "Coartem 20/120mg", generic: "Artemether + Lumefantrine", inventory: "2,931 units", pharmacies: 146, price: "₦4,800", demand: "+9.3%", status: "Healthy" },
  { name: "Norvasc 10mg", generic: "Amlodipine", inventory: "682 units", pharmacies: 57, price: "₦8,900", demand: "+22.1%", status: "Low stock" },
];

const navPrimary = [
  { label: "Dashboard", icon: Home },
  { label: "Find medicines", icon: Search },
  { label: "Orders", icon: ShoppingCart },
  { label: "Pharmacies", icon: MapPin },
  { label: "Prescriptions", icon: FileText },
  { label: "HMO & Insurance", icon: Shield },
];

const navBusiness = [
  { label: "Inventory", icon: Package },
  { label: "API & Integrations", icon: Database },
  { label: "Analytics", icon: BarChart2 },
  { label: "Settings", icon: Settings },
];

const availability = [
  { label: "Pain relief", value: 94, amount: "12,486" },
  { label: "Antibiotics", value: 86, amount: "8,942" },
  { label: "Malaria", value: 79, amount: "6,735" },
  { label: "Hypertension", value: 68, amount: "5,204" },
];

const chartPoints = "0,122 35,134 70,108 105,121 140,92 175,107 210,77 245,94 280,63 315,76 350,43 385,61 420,30 455,42 490,17 525,29";

export default function HomePage() {
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [range, setRange] = useState("Last 12 months");

  const filteredMedicines = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicineRows;
    return medicineRows.filter((item) => `${item.name} ${item.generic}`.toLowerCase().includes(q));
  }, [search]);

  return (
    <main className="dashboard-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon"><Activity size={20} /></div>
          <div>
            <strong>MediFind</strong>
            <span>Medicine network</span>
          </div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={19} /></button>
        </div>

        <nav className="side-nav">
          {navPrimary.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { setActive(label); setMobileOpen(false); }}
              className={active === label ? "active" : ""}
            >
              <Icon size={17} />
              <span>{label}</span>
              {label === "Orders" && <b>12</b>}
            </button>
          ))}
        </nav>

        <div className="nav-caption">PHARMACY BUSINESS</div>
        <nav className="side-nav secondary-nav">
          {navBusiness.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => { setActive(label); setMobileOpen(false); }}
              className={active === label ? "active" : ""}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="sidebar-network-card">
          <div className="network-art">
            <div className="art-pill pill-a" />
            <div className="art-pill pill-b" />
            <div className="art-cross">+</div>
          </div>
          <strong>Join the live network</strong>
          <p>Sync pharmacy inventory and receive verified medicine orders.</p>
          <button>Connect pharmacy</button>
        </div>
        <button className="logout"><LogOut size={16} /> Log out</button>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button>
          <div className="global-search">
            <Search size={17} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicines, pharmacies, orders..." />
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-actions">
            <button className="top-icon" aria-label="Notifications"><Bell size={17} /><i /></button>
            <button className="top-icon help" aria-label="Help"><HelpCircle size={17} /></button>
            <div className="profile">
              <div className="profile-avatar">OM</div>
              <div className="profile-copy"><strong>Osondu</strong><span>Admin</span></div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">MEDICINE NETWORK OVERVIEW</p>
              <h1>Growing access to medicines.</h1>
              <p className="welcome-copy">Live stock visibility, pharmacy fulfilment and order intelligence across your network.</p>
            </div>
            <button className="location-control"><MapPin size={15} /> Lagos, Nigeria <ChevronDown size={14} /></button>
          </div>

          <section className="summary-layout">
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-icon"><Package size={20} /></div>
                <span>Medicines tracked</span>
                <div className="metric-value"><strong>48,290</strong><em>↑ 8.4%</em></div>
              </article>
              <article className="metric-card">
                <div className="metric-icon"><Users size={20} /></div>
                <span>Pharmacy partners</span>
                <div className="metric-value"><strong>1,284</strong><em>↑ 6.2%</em></div>
              </article>
              <article className="metric-card">
                <div className="metric-icon"><ShoppingCart size={20} /></div>
                <span>Orders today</span>
                <div className="metric-value"><strong>2,350</strong><em>↑ 14.8%</em></div>
              </article>
              <article className="metric-card">
                <div className="metric-icon"><CheckCircle size={20} /></div>
                <span>Fulfilment rate</span>
                <div className="metric-value"><strong>96.4%</strong><em>↑ 3.1%</em></div>
              </article>
            </div>

            <article className="network-promo">
              <div>
                <span>PHARMACY SAAS</span>
                <h2>Make every shelf searchable.</h2>
                <p>Connect live inventory and turn stock into verified orders.</p>
                <button>Sync inventory <Zap size={15} /></button>
              </div>
              <div className="promo-visual">
                <div className="visual-card vc-one"><Package size={22} /></div>
                <div className="visual-card vc-two"><Activity size={22} /></div>
                <div className="visual-card vc-three"><Truck size={22} /></div>
              </div>
            </article>
          </section>

          <section className="analytics-layout">
            <article className="chart-panel">
              <div className="panel-top">
                <div>
                  <span>Total medicine searches</span>
                  <div className="big-number">549,735 <em>↑ 15.6%</em></div>
                </div>
                <button onClick={() => setRange(range === "Last 12 months" ? "Last 30 days" : "Last 12 months")}>{range} <ChevronDown size={13} /></button>
              </div>

              <div className="chart-wrap">
                <div className="y-labels"><span>60k</span><span>45k</span><span>30k</span><span>15k</span><span>0</span></div>
                <div className="chart-area">
                  <div className="grid-line g1" /><div className="grid-line g2" /><div className="grid-line g3" /><div className="grid-line g4" /><div className="grid-line g5" />
                  <svg className="line-chart" viewBox="0 0 525 150" preserveAspectRatio="none" aria-label="Medicine search trend chart">
                    <defs>
                      <linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2f7df6" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2f7df6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon points={`0,150 ${chartPoints} 525,150`} fill="url(#fillBlue)" />
                    <polyline points={chartPoints} fill="none" stroke="#2f7df6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="315" y1="0" x2="315" y2="150" stroke="#a9c8fb" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="315" cy="76" r="6" fill="#fff" stroke="#2f7df6" strokeWidth="3" />
                  </svg>
                  <div className="chart-tooltip"><span>JULY 2026</span><strong>47,284 searches</strong><small>91% found nearby stock</small></div>
                  <div className="month-row"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
                </div>
              </div>
            </article>

            <div className="right-stack">
              <article className="insight-card">
                <div className="insight-icon"><MapPin size={18} /></div>
                <h3>In the last 30 days</h3>
                <p><strong>91%</strong> of medicine searches found an in-stock pharmacy within 5 km.</p>
                <div className="insight-footer"><span>Last 30 days <ChevronDown size={12} /></span><button>View map</button></div>
              </article>

              <article className="availability-card">
                <div className="mini-panel-title"><div><h3>Availability by category</h3><p>Share of searches successfully matched</p></div><Sliders size={16} /></div>
                <div className="availability-bars">
                  {availability.map((item) => (
                    <div className="bar-row" key={item.label}>
                      <div className="bar-copy"><span>{item.label}</span><strong>{item.value}%</strong></div>
                      <div className="bar-track"><i style={{ width: `${item.value}%` }} /></div>
                      <small>{item.amount} searches</small>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </section>

          <section className="table-panel">
            <div className="table-heading">
              <div><h3>Top medicines</h3><p>Fast-moving inventory across connected pharmacies</p></div>
              <div className="table-actions"><button><Clock size={14} /> Today</button><button className="view-button">View inventory</button></div>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>Medicine</th><th>Network inventory</th><th>Pharmacies</th><th>Starting price</th><th>Demand</th><th>Status</th></tr></thead>
                <tbody>
                  {filteredMedicines.map((item) => (
                    <tr key={item.name}>
                      <td><div className="medicine-cell"><div className="medicine-icon"><Package size={16} /></div><div><strong>{item.name}</strong><span>{item.generic}</span></div></div></td>
                      <td>{item.inventory}</td>
                      <td>{item.pharmacies}</td>
                      <td><strong>{item.price}</strong></td>
                      <td><span className="demand">{item.demand}</span></td>
                      <td><span className={`stock-status ${item.status === "Low stock" ? "low" : ""}`}><i />{item.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredMedicines.length === 0 && <div className="empty-search">No medicines match “{search}”.</div>}
            </div>
          </section>

          <footer className="dashboard-footer">
            <span><Grid size={14} /> MediFind Network</span>
            <p>Live pharmacy inventory • Orders • HMO/Hospital API</p>
            <div><CreditCard size={14} /> Secure healthcare commerce</div>
          </footer>
        </div>
      </section>
    </main>
  );
}

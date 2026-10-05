"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bell, FileText, Heart, Home, LogOut, MapPin, Menu, Package, Search, Shield, ShoppingBag, User, X } from "react-feather";
import { ReactNode, useState } from "react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/medicines", label: "Find medicines", icon: Search },
  { href: "/health", label: "Health tracker", icon: Heart },
  { href: "/vault", label: "Health vault", icon: Shield },
  { href: "/dashboard#orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard#prescriptions", label: "Prescriptions", icon: FileText },
];

export default function AppShell({ children, title, subtitle, action }: { children: ReactNode; title: string; subtitle?: string; action?: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <main className="app-shell">
      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div className="app-brand">
          <Link href="/" className="app-brand-link">
            <div className="app-brand-mark"><Activity size={22} /></div>
            <div><strong>MediFind</strong><span>Health + medicine</span></div>
          </Link>
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button>
        </div>

        <nav className="app-nav">
          {nav.map(({ href, label, icon: Icon }) => {
            const base = href.split("#")[0];
            const active = pathname === base;
            return <Link key={href} href={href} className={active ? "active" : ""} onClick={() => setOpen(false)}><Icon size={19} /><span>{label}</span></Link>;
          })}
        </nav>

        <div className="sidebar-section-label">CARE NETWORK</div>
        <div className="app-nav secondary">
          <a href="#"><MapPin size={19} /><span>Nearby pharmacies</span></a>
          <a href="#"><Package size={19} /><span>Pharmacy services</span></a>
        </div>

        <div className="sidebar-profile-card">
          <div className="sidebar-avatar"><User size={18} /></div>
          <div><strong>My health space</strong><span>Private personal vault</span></div>
        </div>
        <Link href="/" className="sidebar-logout"><LogOut size={18} /> Back to website</Link>
      </aside>

      <section className="app-main">
        <header className="app-topbar">
          <button className="mobile-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <div className="app-page-title"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
          <div className="app-top-actions">{action}<button className="app-icon-btn" aria-label="Notifications"><Bell size={19} /></button><div className="top-avatar">OM</div></div>
        </header>
        <div className="app-content">{children}</div>
      </section>
    </main>
  );
}

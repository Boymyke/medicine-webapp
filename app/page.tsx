"use client";

import Link from "next/link";
import { Activity, ArrowRight, CheckCircle, FileText, Heart, Lock, MapPin, Search, Shield, ShoppingBag, Smartphone, UploadCloud, Users } from "react-feather";

const features = [
  { icon: Search, title: "Find medicines fast", copy: "Search live stock across verified pharmacies, compare prices and know what is available before leaving home." },
  { icon: Shield, title: "Your private health vault", copy: "Keep prescriptions, allergies, lab results, medication history and important health documents in one secure place." },
  { icon: Heart, title: "Track your health", copy: "Record blood pressure, glucose, weight, symptoms and personal notes so you can see your health history over time." },
  { icon: ShoppingBag, title: "Order from pharmacies", copy: "Choose a nearby pharmacy, request delivery or pickup, and keep every medicine order in one timeline." },
  { icon: FileText, title: "Prescription ready", copy: "Upload prescriptions and keep them connected to your medication history for easier refills and care coordination." },
  { icon: Users, title: "Built for the care network", copy: "Pharmacies, HMOs and hospitals can connect through APIs without exposing the user's personal vault." },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Link href="/" className="landing-logo"><span><Activity size={23} /></span><strong>MediFind</strong></Link>
        <nav><a href="#features">Features</a><a href="#vault">Health vault</a><a href="#network">For pharmacies</a></nav>
        <div className="landing-nav-actions"><Link href="/dashboard" className="text-link">Sign in</Link><Link href="/dashboard" className="primary-link">Open my health space <ArrowRight size={17} /></Link></div>
      </header>

      <section className="landing-hero">
        <div className="hero-copy-large">
          <div className="hero-badge"><CheckCircle size={16} /> One health space for everyday care</div>
          <h1>Find your medicine. Keep your health history. Stay in control.</h1>
          <p>MediFind combines live pharmacy availability with a private personal health vault, so you can search, order, track and organise your health from one place.</p>
          <div className="hero-actions"><Link href="/dashboard" className="primary-link large">Get started <ArrowRight size={18} /></Link><Link href="/medicines" className="secondary-link large"><Search size={18} /> Find medicine</Link></div>
          <div className="hero-proof"><span><Shield size={17} /> Private health records</span><span><MapPin size={17} /> Nearby pharmacy stock</span><span><Smartphone size={17} /> Mobile-first</span></div>
        </div>

        <div className="hero-product-card">
          <div className="hero-product-top"><div><span>Good afternoon</span><strong>Your health, organised.</strong></div><div className="product-avatar">OM</div></div>
          <div className="hero-search-demo"><Search size={20} /><span>Search a medicine near you...</span><button>Search</button></div>
          <div className="hero-stats-grid">
            <div><span>Health score</span><strong>82</strong><em>On track</em></div>
            <div><span>Vault items</span><strong>14</strong><em>Secure</em></div>
            <div><span>Medications</span><strong>3</strong><em>Active</em></div>
          </div>
          <div className="hero-card-row">
            <div className="mini-health-card"><div className="mini-icon blue"><Heart size={19} /></div><div><span>Blood pressure</span><strong>118 / 76</strong><small>Today, 8:15 AM</small></div></div>
            <div className="mini-health-card"><div className="mini-icon green"><Activity size={19} /></div><div><span>Next appointment</span><strong>Dr. Adebayo</strong><small>12 Oct · 10:30 AM</small></div></div>
          </div>
        </div>
      </section>

      <section className="trust-strip"><span>LIVE PHARMACY INVENTORY</span><span>PERSONAL HEALTH VAULT</span><span>HEALTH TRACKING</span><span>HMO + HOSPITAL API</span></section>

      <section className="landing-section" id="features">
        <div className="section-heading-center"><span className="section-kicker">EVERYDAY HEALTH, CONNECTED</span><h2>More than a medicine search app.</h2><p>Built around what a person actually needs before, during and after getting care.</p></div>
        <div className="feature-grid">{features.map(({ icon: Icon, title, copy }) => <article key={title} className="feature-card"><div className="feature-icon"><Icon size={23} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="landing-section vault-showcase" id="vault">
        <div className="vault-copy"><span className="section-kicker">MY HEALTH VAULT</span><h2>Your important health information should not live across WhatsApp, paper files and screenshots.</h2><p>Store what matters and bring it with you whenever you need care. Your vault is designed for personal records, not public sharing.</p>
          <div className="vault-list"><span><Lock size={18} /> Private personal record space</span><span><UploadCloud size={18} /> Save prescriptions and lab files</span><span><Heart size={18} /> Keep vitals and symptoms together</span><span><FileText size={18} /> Track medication and care history</span></div>
          <Link href="/vault" className="primary-link large">Open health vault <ArrowRight size={18} /></Link>
        </div>
        <div className="vault-ui-card"><div className="vault-ui-head"><div><strong>Health Vault</strong><span>All your important records</span></div><button>+ Add record</button></div><div className="vault-ui-grid"><div><span>Prescriptions</span><strong>6 files</strong></div><div><span>Lab results</span><strong>4 files</strong></div><div><span>Allergies</span><strong>2 listed</strong></div><div><span>Medical notes</span><strong>8 notes</strong></div></div><div className="vault-file"><div className="file-icon"><FileText size={20} /></div><div><strong>Malaria treatment prescription</strong><span>PDF · 04 Oct 2026</span></div><em>Saved</em></div><div className="vault-file"><div className="file-icon"><Heart size={20} /></div><div><strong>Blood pressure log</strong><span>12 readings · Updated today</span></div><em>Active</em></div></div>
      </section>

      <section className="network-section" id="network"><div><span className="section-kicker light">FOR PHARMACIES, HOSPITALS & HMOs</span><h2>A connected supply and care network.</h2><p>Pharmacies can sync inventory and receive orders. Hospitals and HMOs can integrate medicine availability and approved workflows through APIs.</p></div><div className="network-cards"><div><PackageBadge title="Pharmacy SaaS" copy="Inventory, orders, branches and fulfilment." /></div><div><PackageBadge title="Hospital API" copy="Medicine search and care workflow integrations." /></div><div><PackageBadge title="HMO connectivity" copy="Coverage checks and approved medicine pathways." /></div></div></section>

      <section className="cta-section"><div><h2>Start with one health space.</h2><p>Search medicine, save records, track health and build a useful personal history over time.</p></div><Link href="/dashboard" className="primary-link light-button">Open MediFind <ArrowRight size={18} /></Link></section>

      <footer className="landing-footer"><Link href="/" className="landing-logo"><span><Activity size={21} /></span><strong>MediFind</strong></Link><p>Medicine availability + personal health vault.</p><span>© 2026 MediFind</span></footer>
    </main>
  );
}

function PackageBadge({ title, copy }: { title: string; copy: string }) {
  return <article className="network-card"><div><Shield size={21} /></div><h3>{title}</h3><p>{copy}</p></article>;
}

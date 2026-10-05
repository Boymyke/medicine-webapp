"use client";

import Link from "next/link";
import { Activity, ArrowRight, Calendar, CheckCircle, FileText, Heart, MapPin, Pill, Plus, Search, Shield, ShoppingBag, Thermometer } from "react-feather";
import AppShell from "../components/AppShell";

export default function DashboardPage() {
  return (
    <AppShell title="My health overview" subtitle="Your medicine access, health records and daily tracking in one place." action={<Link href="/medicines" className="app-primary-btn"><Search size={18} /> Find medicine</Link>}>
      <section className="health-summary-grid">
        <article className="health-hero-card">
          <div><span className="app-kicker">TODAY</span><h2>Good afternoon, Osondu.</h2><p>Everything important about your health is organised and ready when you need it.</p></div>
          <div className="health-score"><span>Health score</span><strong>82</strong><em>On track</em></div>
        </article>
        <article className="summary-card"><div className="summary-icon blue"><Heart size={22} /></div><span>Blood pressure</span><strong>118 / 76</strong><small>Normal · today 8:15 AM</small></article>
        <article className="summary-card"><div className="summary-icon green"><Activity size={22} /></div><span>Active medicines</span><strong>3</strong><small>2 doses due today</small></article>
        <article className="summary-card"><div className="summary-icon purple"><Shield size={22} /></div><span>Vault records</span><strong>14</strong><small>6 prescriptions · 4 labs</small></article>
      </section>

      <section className="dashboard-two-col">
        <div className="stack-gap">
          <article className="app-card">
            <div className="card-heading"><div><h3>Today’s medications</h3><p>Stay on top of your medicine routine.</p></div><Link href="/vault" className="card-link">View all <ArrowRight size={16} /></Link></div>
            <div className="medication-list">
              {[['Amlodipine 10mg','1 tablet','8:00 AM','Taken'],['Vitamin D3','1 capsule','1:00 PM','Due'],['Amoxicillin 500mg','1 capsule','8:00 PM','Later']].map(([name,dose,time,status]) => <div className="medication-item" key={name}><div className="medication-icon"><Pill size={20} /></div><div><strong>{name}</strong><span>{dose}</span></div><time>{time}</time><em className={status === 'Taken' ? 'done' : ''}>{status}</em></div>)}
            </div>
          </article>

          <article className="app-card" id="orders">
            <div className="card-heading"><div><h3>Recent medicine orders</h3><p>Track purchases and pharmacy fulfilment.</p></div><Link href="/medicines" className="card-link">Order medicine <ArrowRight size={16} /></Link></div>
            <div className="simple-table">
              <div className="simple-table-head"><span>Order</span><span>Pharmacy</span><span>Amount</span><span>Status</span></div>
              {[['Augmentin 625mg','HealthPlus Lekki','₦12,500','Delivered'],['Panadol Extra','MedPlus Admiralty','₦3,200','Processing'],['Coartem','Alpha Pharmacy','₦4,800','Delivered']].map(row => <div className="simple-table-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><em>{row[3]}</em></div>)}
            </div>
          </article>
        </div>

        <div className="stack-gap">
          <article className="app-card next-care-card"><div className="card-heading"><div><h3>Next appointment</h3><p>Your upcoming care.</p></div><Calendar size={20} /></div><div className="appointment-date"><strong>12</strong><span>OCT<br/>MON</span></div><h4>Dr. Adebayo</h4><p>General consultation · 10:30 AM</p><button className="secondary-action"><Calendar size={17} /> View appointment</button></article>
          <article className="app-card quick-actions-card"><div className="card-heading"><div><h3>Quick actions</h3><p>Common health tasks.</p></div></div><Link href="/health"><Plus size={18} /> Log a health reading</Link><Link href="/vault"><FileText size={18} /> Add a vault record</Link><Link href="/medicines"><Search size={18} /> Find nearby medicine</Link><button><MapPin size={18} /> Find a pharmacy</button></article>
        </div>
      </section>

      <section className="app-card tracker-preview"><div className="card-heading"><div><h3>Your recent health trend</h3><p>Last 7 recorded days.</p></div><Link href="/health" className="card-link">Open tracker <ArrowRight size={16} /></Link></div><div className="trend-grid"><div><div className="trend-label"><Heart size={18} /><span>Blood pressure</span><strong>118/76</strong></div><div className="sparkline"><i style={{height:'48%'}}/><i style={{height:'54%'}}/><i style={{height:'50%'}}/><i style={{height:'62%'}}/><i style={{height:'58%'}}/><i style={{height:'67%'}}/><i style={{height:'60%'}}/></div></div><div><div className="trend-label"><Thermometer size={18} /><span>Temperature</span><strong>36.6°C</strong></div><div className="sparkline"><i style={{height:'44%'}}/><i style={{height:'48%'}}/><i style={{height:'46%'}}/><i style={{height:'49%'}}/><i style={{height:'45%'}}/><i style={{height:'50%'}}/><i style={{height:'47%'}}/></div></div><div><div className="trend-label"><Activity size={18} /><span>Weight</span><strong>78.4kg</strong></div><div className="sparkline"><i style={{height:'72%'}}/><i style={{height:'70%'}}/><i style={{height:'69%'}}/><i style={{height:'68%'}}/><i style={{height:'67%'}}/><i style={{height:'66%'}}/><i style={{height:'65%'}}/></div></div></div></section>

      <section className="dashboard-bottom-grid" id="prescriptions"><article className="app-card"><div className="card-heading"><div><h3>Health vault</h3><p>Your recent secure records.</p></div><Link href="/vault" className="card-link">Open vault <ArrowRight size={16} /></Link></div><div className="vault-preview-list"><div><FileText size={20}/><span><strong>Malaria prescription</strong><small>PDF · 04 Oct 2026</small></span><CheckCircle size={18}/></div><div><Activity size={20}/><span><strong>Full blood count</strong><small>Lab result · 28 Sep 2026</small></span><CheckCircle size={18}/></div></div></article><article className="app-card secure-card"><Shield size={30}/><h3>Your health vault is private.</h3><p>Records in your personal space are designed to stay separate from public pharmacy search and marketplace activity.</p><Link href="/vault">Manage vault <ArrowRight size={16}/></Link></article></section>
    </AppShell>
  );
}

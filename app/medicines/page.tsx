"use client";

import { useMemo, useState } from "react";
import { CheckCircle, MapPin, Package, Search, ShoppingBag, Star } from "react-feather";
import AppShell from "../components/AppShell";

const inventory=[
  {name:"Augmentin 625mg",generic:"Amoxicillin + Clavulanate",price:12500,pharmacy:"HealthPlus Lekki",distance:"1.2 km",stock:"In stock",rating:"4.9",eta:"18–25 min"},
  {name:"Panadol Extra",generic:"Paracetamol + Caffeine",price:3200,pharmacy:"MedPlus Admiralty",distance:"2.4 km",stock:"In stock",rating:"4.8",eta:"12–20 min"},
  {name:"Coartem 20/120mg",generic:"Artemether + Lumefantrine",price:4800,pharmacy:"Alpha Pharmacy",distance:"3.1 km",stock:"In stock",rating:"4.7",eta:"20–35 min"},
  {name:"Norvasc 10mg",generic:"Amlodipine",price:8900,pharmacy:"HealthPlus Ikoyi",distance:"4.8 km",stock:"Low stock",rating:"4.8",eta:"25–40 min"},
  {name:"Vitamin C 1000mg",generic:"Ascorbic Acid",price:4100,pharmacy:"MedPlus Lekki",distance:"2.8 km",stock:"In stock",rating:"4.6",eta:"15–25 min"}
];

export default function MedicinesPage(){
  const [q,setQ]=useState("");
  const [ordered,setOrdered]=useState<string[]>([]);
  const results=useMemo(()=>{const x=q.toLowerCase().trim(); return x?inventory.filter(i=>`${i.name} ${i.generic} ${i.pharmacy}`.toLowerCase().includes(x)):inventory},[q]);
  return <AppShell title="Find medicines" subtitle="Search sample live inventory across nearby verified pharmacies.">
    <section className="medicine-search-hero"><div><span className="app-kicker">LIVE AVAILABILITY</span><h2>Know where your medicine is before you leave home.</h2><p>Compare nearby stock, prices and estimated fulfilment times.</p></div><div className="large-medicine-search"><Search size={21}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search medicine, generic name or pharmacy"/><button>Search</button></div></section>
    <div className="medicine-results-head"><div><h3>{results.length} available option{results.length===1?'':'s'}</h3><p>Results are sample inventory for the current prototype.</p></div><span><MapPin size={17}/> Lagos</span></div>
    <section className="medicine-results-grid">{results.map(item=><article className="medicine-result-card" key={item.name+item.pharmacy}><div className="result-top"><div className="result-med-icon"><Package size={22}/></div><span className={`result-stock ${item.stock==='Low stock'?'low':''}`}><i/>{item.stock}</span></div><h3>{item.name}</h3><p>{item.generic}</p><div className="result-pharmacy"><strong>{item.pharmacy}</strong><span><MapPin size={15}/>{item.distance} · <Star size={15}/>{item.rating}</span></div><div className="result-meta"><div><span>Price</span><strong>₦{item.price.toLocaleString()}</strong></div><div><span>Estimated time</span><strong>{item.eta}</strong></div></div><button className={ordered.includes(item.name)?"ordered-btn":"app-primary-btn result-order"} onClick={()=>setOrdered(prev=>prev.includes(item.name)?prev:[...prev,item.name])}>{ordered.includes(item.name)?<><CheckCircle size={18}/> Added to order</>:<><ShoppingBag size={18}/> Add to order</>}</button></article>)}</section>
  </AppShell>
}

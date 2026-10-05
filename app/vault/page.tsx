"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AlertCircle, FileText, Heart, Lock, Plus, Shield, Trash2, UploadCloud } from "react-feather";
import AppShell from "../components/AppShell";

type VaultItem = { id:number; title:string; category:string; details:string; date:string };
const categories = ["Prescription", "Lab result", "Allergy", "Medication", "Medical note", "Appointment record"];

export default function VaultPage(){
  const [items,setItems]=useState<VaultItem[]>([]);
  const [title,setTitle]=useState("");
  const [category,setCategory]=useState("Prescription");
  const [details,setDetails]=useState("");

  useEffect(()=>{
    const saved=localStorage.getItem("medifind-vault");
    if(saved) setItems(JSON.parse(saved));
    else setItems([
      {id:1,title:"Malaria treatment prescription",category:"Prescription",details:"Artemether/Lumefantrine course",date:"2026-10-04"},
      {id:2,title:"Full blood count",category:"Lab result",details:"Routine laboratory result",date:"2026-09-28"},
      {id:3,title:"Penicillin",category:"Allergy",details:"Reported medication allergy",date:"2026-09-20"}
    ]);
  },[]);
  useEffect(()=>{if(items.length) localStorage.setItem("medifind-vault",JSON.stringify(items));},[items]);

  const counts=useMemo(()=>Object.fromEntries(categories.map(c=>[c,items.filter(i=>i.category===c).length])),[items]);
  function addItem(e:FormEvent){e.preventDefault(); if(!title.trim()) return; setItems(prev=>[{id:Date.now(),title:title.trim(),category,details:details.trim(),date:new Date().toISOString().slice(0,10)},...prev]); setTitle("");setDetails("");}

  return <AppShell title="My health vault" subtitle="A private place for your personal health records and care history." action={<button className="app-primary-btn" onClick={()=>document.getElementById('vault-form')?.scrollIntoView({behavior:'smooth'})}><Plus size={18}/> Add record</button>}>
    <section className="vault-security-banner"><div className="vault-security-icon"><Lock size={26}/></div><div><span className="app-kicker">PRIVATE PERSONAL SPACE</span><h2>Your health records, organised around you.</h2><p>Keep key details together so you can find them quickly when a pharmacy, doctor or hospital asks.</p></div><div className="vault-security-status"><Shield size={20}/><span>Personal vault</span></div></section>

    <section className="vault-category-grid">
      <VaultStat label="Prescriptions" value={counts["Prescription"]||0} icon={<FileText size={21}/>} />
      <VaultStat label="Lab results" value={counts["Lab result"]||0} icon={<Heart size={21}/>} />
      <VaultStat label="Allergies" value={counts["Allergy"]||0} icon={<AlertCircle size={21}/>} />
      <VaultStat label="Other records" value={items.length-(counts["Prescription"]||0)-(counts["Lab result"]||0)-(counts["Allergy"]||0)} icon={<Shield size={21}/>} />
    </section>

    <section className="dashboard-two-col vault-layout">
      <article className="app-card" id="vault-form"><div className="card-heading"><div><h3>Add a health record</h3><p>Save important information to your vault.</p></div><UploadCloud size={21}/></div>
        <form className="health-form" onSubmit={addItem}>
          <label>Record title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Dental prescription" /></label>
          <label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
          <label>Details<textarea rows={5} value={details} onChange={e=>setDetails(e.target.value)} placeholder="Add medicine name, doctor, result summary, allergy reaction, or other useful context." /></label>
          <button className="app-primary-btn submit-wide" type="submit"><Plus size={18}/> Save to vault</button>
        </form>
      </article>

      <article className="app-card"><div className="card-heading"><div><h3>What belongs here?</h3><p>Keep the pieces of your health history that are easy to lose.</p></div></div><div className="vault-guidance"><span><FileText size={18}/> Prescriptions and refill instructions</span><span><Heart size={18}/> Lab summaries and health measurements</span><span><AlertCircle size={18}/> Allergies and reactions</span><span><Shield size={18}/> Medication history and medical notes</span></div></article>
    </section>

    <article className="app-card vault-records-card"><div className="card-heading"><div><h3>Saved records</h3><p>{items.length} item{items.length===1?'':'s'} in your vault.</p></div></div><div className="vault-record-list">{items.map(item=><div className="vault-record-row" key={item.id}><div className="vault-record-icon"><FileText size={20}/></div><div><strong>{item.title}</strong><span>{item.category} · {item.date}</span>{item.details&&<p>{item.details}</p>}</div><em>{item.category}</em><button onClick={()=>setItems(prev=>prev.filter(x=>x.id!==item.id))} aria-label="Delete record"><Trash2 size={18}/></button></div>)}</div></article>
  </AppShell>
}
function VaultStat({label,value,icon}:{label:string;value:number;icon:React.ReactNode}){return <article className="summary-card vault-stat"><div className="summary-icon blue">{icon}</div><span>{label}</span><strong>{value}</strong><small>Saved records</small></article>}

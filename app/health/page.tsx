"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Activity, Droplet, Heart, Plus, Save, Thermometer, Trash2 } from "react-feather";
import AppShell from "../components/AppShell";

type Reading = { id: number; type: string; value: string; note: string; date: string };

const metricOptions = ["Blood pressure", "Blood glucose", "Weight", "Temperature", "Heart rate", "Symptoms / note"];

export default function HealthPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [type, setType] = useState("Blood pressure");
  const [value, setValue] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("medifind-health-readings");
    if (saved) setReadings(JSON.parse(saved));
    else setReadings([
      { id: 1, type: "Blood pressure", value: "118 / 76 mmHg", note: "Morning reading", date: "2026-10-05" },
      { id: 2, type: "Weight", value: "78.4 kg", note: "Before breakfast", date: "2026-10-04" },
      { id: 3, type: "Temperature", value: "36.6 °C", note: "No symptoms", date: "2026-10-03" },
    ]);
  }, []);

  useEffect(() => { if (readings.length) localStorage.setItem("medifind-health-readings", JSON.stringify(readings)); }, [readings]);

  const latest = useMemo(() => Object.fromEntries(metricOptions.map(m => [m, readings.find(r => r.type === m)?.value || "—"])), [readings]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setReadings(prev => [{ id: Date.now(), type, value: value.trim(), note: note.trim(), date: new Date().toISOString().slice(0,10) }, ...prev]);
    setValue(""); setNote("");
  }

  return <AppShell title="Health tracker" subtitle="Log simple personal readings and keep a clear record over time." action={<button className="app-primary-btn" onClick={() => document.getElementById('log-form')?.scrollIntoView({behavior:'smooth'})}><Plus size={18}/> Add reading</button>}>
    <section className="tracker-metrics-grid">
      <Metric icon={<Heart size={22}/>} label="Blood pressure" value={latest["Blood pressure"]} helper="Latest reading" />
      <Metric icon={<Droplet size={22}/>} label="Blood glucose" value={latest["Blood glucose"]} helper="Latest reading" />
      <Metric icon={<Activity size={22}/>} label="Weight" value={latest["Weight"]} helper="Latest reading" />
      <Metric icon={<Thermometer size={22}/>} label="Temperature" value={latest["Temperature"]} helper="Latest reading" />
    </section>

    <section className="dashboard-two-col tracker-layout">
      <article className="app-card" id="log-form"><div className="card-heading"><div><h3>Log a health reading</h3><p>Save a new entry to your personal history.</p></div><Save size={20}/></div>
        <form className="health-form" onSubmit={submit}>
          <label>Reading type<select value={type} onChange={e=>setType(e.target.value)}>{metricOptions.map(m=><option key={m}>{m}</option>)}</select></label>
          <label>Value<input value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. 120 / 80 mmHg" /></label>
          <label>Note<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional context, symptoms, meal timing, etc." rows={4}/></label>
          <button className="app-primary-btn submit-wide" type="submit"><Save size={18}/> Save reading</button>
        </form>
      </article>

      <article className="app-card"><div className="card-heading"><div><h3>Why track consistently?</h3><p>Simple trends are easier to discuss with a clinician than scattered screenshots and memory.</p></div></div><div className="health-tip-list"><span>• Use the same units each time.</span><span>• Add notes when a reading feels unusual.</span><span>• Bring your history to appointments.</span><span>• This tracker is informational, not a diagnosis tool.</span></div></article>
    </section>

    <article className="app-card readings-card"><div className="card-heading"><div><h3>Reading history</h3><p>{readings.length} saved entr{readings.length === 1 ? 'y' : 'ies'} on this device.</p></div></div><div className="reading-list">{readings.map(r=><div className="reading-row" key={r.id}><div><strong>{r.type}</strong><span>{r.date}{r.note ? ` · ${r.note}` : ''}</span></div><b>{r.value}</b><button onClick={()=>setReadings(prev=>prev.filter(x=>x.id!==r.id))} aria-label="Delete reading"><Trash2 size={18}/></button></div>)}</div></article>
  </AppShell>
}

function Metric({icon,label,value,helper}:{icon:React.ReactNode;label:string;value:string;helper:string}) { return <article className="summary-card tracker-card"><div className="summary-icon blue">{icon}</div><span>{label}</span><strong>{value}</strong><small>{helper}</small></article> }

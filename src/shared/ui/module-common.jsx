import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from './Icon.jsx';
import { Bar, Badge } from './primitives.jsx';
import { VEH_STATUS_TONE } from '../data/index.js';

export function PageHead({ title, subtitle, actions }) {
  return (
    <div className="row between wrap gap-16" style={{ marginBottom: 22 }}>
      <div>
        <h2 style={{ fontSize: 24 }}>{title}</h2>
        {subtitle && <p className="muted" style={{ fontSize: 14.5, marginTop: 5 }}>{subtitle}</p>}
      </div>
      {actions && <div className="row gap-10 wrap">{actions}</div>}
    </div>
  );
}

export function Toolbar({ children, search = "Buscar…", onSearch }) {
  return (
    <div className="row between wrap gap-12" style={{ marginBottom: 16 }}>
      <div className="input-group" style={{ width: 300, maxWidth: "100%" }}>
        <Icon name="search" size={17} />
        <input className="input" placeholder={search} onChange={e => onSearch && onSearch(e.target.value)} />
      </div>
      <div className="row gap-10 wrap">{children}</div>
    </div>
  );
}

export function FilterChip({ label, count, active, onClick }) {
  return (
    <button onClick={onClick} className="row gap-6" style={{
      border: "1px solid " + (active ? "var(--ink-800)" : "var(--line)"),
      background: active ? "var(--ink-800)" : "var(--surface)",
      color: active ? "#fff" : "var(--ink-700)",
      borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 600, transition: "all .14s",
    }}>
      {label}
      {count != null && <span style={{ fontSize: 11.5, opacity: .65 }}>{count}</span>}
    </button>
  );
}

/* Right-side detail drawer */
export function Drawer({ open, onClose, title, children, footer, width = 460 }) {
  if (!open) return null;
  return (
    <Fragment>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,20,28,.4)", zIndex: 100, animation: "fadeIn .2s" }} />
      <div className="fade-in" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width, maxWidth: "92vw", background: "var(--surface)", zIndex: 110, boxShadow: "var(--sh-lg)", display: "flex", flexDirection: "column" }}>
        <div className="row between" style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
          <span style={{ fontFamily: "var(--font-head)", fontWeight: 600, fontSize: 17 }}>{title}</span>
          <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 22 }}>{children}</div>
        {footer && <div className="row gap-12" style={{ padding: "16px 22px", borderTop: "1px solid var(--line)" }}>{footer}</div>}
      </div>
    </Fragment>
  );
}

export function KV({ label, children }) {
  return (
    <div className="row between" style={{ padding: "11px 0", borderBottom: "1px solid var(--line-soft)" }}>
      <span style={{ fontSize: 13.5, color: "var(--slate-500)", fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-800)", textAlign: "right" }}>{children}</span>
    </div>
  );
}

/* veh category -> icon */
export const CAT_ICON = { truck: "truck", crane: "construction", pickup: "truck", excavator: "construction", bus: "bus", moto: "bike" };

export function VehBadge({ status }) {
  return <Badge tone={VEH_STATUS_TONE[status]} dot>{status}</Badge>;
}

/* Mini donut using conic-gradient */
export function Donut({ value, size = 120, tone = "amber", label, sub }) {
  const color = tone === "amber" ? "var(--amber-500)" : `var(--${tone})`;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${color} ${value * 3.6}deg, var(--bg-2) 0)` }} />
      <div style={{ position: "absolute", inset: 12, borderRadius: "50%", background: "var(--surface)", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: size * 0.2 }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: "var(--slate-400)", fontWeight: 600 }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

/* Bar chart (vertical) */
export function BarChart({ data, height = 180, tone = "ink" }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div className="row gap-8" style={{ alignItems: "flex-end", height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: 38, height: (d.v / max) * (height - 28) + "px", background: d.hl ? "var(--amber-500)" : (tone === "ink" ? "var(--ink-700)" : `var(--${tone})`), borderRadius: "5px 5px 0 0", transition: "height .5s", position: "relative" }} title={d.v}>
          </div>
          <span style={{ fontSize: 11, color: "var(--slate-400)", fontWeight: 600 }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

/* Line/area chart (SVG) */
export function AreaChart({ points, height = 160, color = "var(--amber-500)" }) {
  const w = 600, h = height;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / range) * (h - 24) - 12]);
  const line = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0].toFixed(1) + " " + c[1].toFixed(1)).join(" ");
  const area = line + ` L${w} ${h} L0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function EmptyHint({ icon, text }) {
  return (
    <div className="col center" style={{ padding: "50px 20px", color: "var(--slate-400)", gap: 12 }}>
      <span style={{ width: 52, height: 52, borderRadius: 14, background: "var(--bg-2)", display: "grid", placeItems: "center", color: "var(--slate-300)" }}><Icon name={icon} size={26} /></span>
      <span style={{ fontSize: 14, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

/* ---------------- Breadcrumb ---------------- */
export function Breadcrumb({ items }) {
  return (
    <div className="row gap-6" style={{ marginBottom: 14, flexWrap: "wrap" }}>
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && <Icon name="chevron-right" size={14} className="muted" />}
          {it.onClick
            ? <button onClick={it.onClick} style={{ border: "none", background: "transparent", color: "var(--slate-500)", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}>{it.label}</button>
            : <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-800)" }}>{it.label}</span>}
        </Fragment>
      ))}
    </div>
  );
}

/* ---------------- Tabs ---------------- */
export function Tabs({ tabs, value, onChange, size = "md" }) {
  return (
    <div className="row gap-2" style={{ borderBottom: "1px solid var(--line)", gap: 4, overflowX: "auto" }}>
      {tabs.map(t => {
        const v = typeof t === "string" ? t : t.value;
        const lab = typeof t === "string" ? t : t.label;
        const count = typeof t === "object" ? t.count : null;
        const on = v === value;
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            border: "none", background: "transparent", cursor: "pointer", whiteSpace: "nowrap",
            padding: size === "sm" ? "8px 12px" : "11px 14px", fontSize: 13.5, fontWeight: 600,
            color: on ? "var(--ink-900)" : "var(--slate-500)",
            borderBottom: on ? "2px solid var(--amber-500)" : "2px solid transparent",
            marginBottom: -1, display: "flex", alignItems: "center", gap: 7,
          }}>
            {lab}
            {count != null && <span style={{ background: on ? "var(--amber-tint)" : "var(--bg-2)", color: on ? "var(--amber-700)" : "var(--slate-500)", fontSize: 11.5, fontWeight: 700, borderRadius: 999, padding: "1px 8px" }}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Sortable table hook ---------------- */
export function useSort(rows, initial) {
  const [sort, setSort] = useState(initial ? { key: initial, dir: "asc" } : null);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const arr = [...rows].sort((a, b) => {
      const x = a[sort.key], y = b[sort.key];
      if (typeof x === "number" && typeof y === "number") return x - y;
      return String(x).localeCompare(String(y), "es");
    });
    return sort.dir === "asc" ? arr : arr.reverse();
  }, [rows, sort]);
  const toggle = (key) => setSort(s => s && s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
  return { sorted, sort, toggle };
}

export function SortTh({ label, sortKey, sort, toggle, align = "left", style = {} }) {
  const on = sort && sort.key === sortKey;
  return (
    <th onClick={() => toggle(sortKey)} style={{ cursor: "pointer", userSelect: "none", textAlign: align, ...style }}>
      <span className="row gap-4" style={{ justifyContent: align === "right" ? "flex-end" : "flex-start", color: on ? "var(--ink-700)" : "inherit" }}>
        {label}
        <Icon name={on ? (sort.dir === "asc" ? "arrow-up" : "arrow-down") : "chevrons-up-down"} size={13} style={{ opacity: on ? 1 : 0.4 }} />
      </span>
    </th>
  );
}

/* ---------------- Toast ---------------- */
export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (msg, tone = "green") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  };
  const node = (
    <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 200, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      {toasts.map(t => (
        <div key={t.id} className="fade-in row gap-10" style={{ background: "var(--ink-900)", color: "#fff", padding: "12px 18px", borderRadius: 12, boxShadow: "var(--sh-lg)", fontSize: 13.5, fontWeight: 600 }}>
          <Icon name={t.tone === "green" ? "check-circle-2" : t.tone === "red" ? "alert-circle" : "info"} size={18} style={{ color: t.tone === "green" ? "var(--amber-400)" : t.tone === "red" ? "#f87171" : "var(--amber-400)" }} />
          {t.msg}
        </div>
      ))}
    </div>
  );
  return { push, node };
}

/* ---------------- Pagination footer ---------------- */
export function TableFooter({ total, perPage = 25, page = 1, onPer }) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  return (
    <div className="row between" style={{ padding: "12px 16px", borderTop: "1px solid var(--line-soft)", fontSize: 13, color: "var(--slate-500)" }}>
      <div className="row gap-8">
        <span>Mostrando {Math.min(perPage, total)} de {total}</span>
        <select className="select" defaultValue="25" onChange={e => onPer && onPer(+e.target.value)} style={{ height: 30, fontSize: 12.5, width: "auto", paddingRight: 30 }}>
          <option value="10">10 / pág</option><option value="25">25 / pág</option><option value="50">50 / pág</option>
        </select>
      </div>
      <div className="row gap-4">
        <button className="btn btn-soft btn-sm btn-icon" disabled><Icon name="chevron-left" size={16} /></button>
        <button className="btn btn-sm" style={{ background: "var(--ink-800)", color: "#fff", width: 32 }}>1</button>
        {pages > 1 && <button className="btn btn-soft btn-sm" style={{ width: 32 }}>2</button>}
        {pages > 2 && <button className="btn btn-soft btn-sm" style={{ width: 32 }}>3</button>}
        <button className="btn btn-soft btn-sm btn-icon" disabled={pages <= 1}><Icon name="chevron-right" size={16} /></button>
      </div>
    </div>
  );
}


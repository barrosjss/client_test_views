import React from 'react';
import { Icon } from './Icon.jsx';

export function Logo({ size = 30, light = false, showText = true }) {
  return (
    <div className="row gap-10" style={{ alignItems: "center" }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.28,
        background: "linear-gradient(145deg, #fbbf24, #d97706)",
        boxShadow: "0 4px 12px rgba(217,119,6,.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flex: "none", position: "relative",
      }}>
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none"
          stroke="#0d141c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h11" />
          <path d="m12 6 6 6-6 6" />
        </svg>
      </div>
      {showText && (
        <span style={{
          fontFamily: "var(--font-head)", fontWeight: 700, fontSize: size * 0.62,
          letterSpacing: "-0.04em", color: light ? "#fff" : "var(--ink-900)",
        }}>CMOCS</span>
      )}
    </div>
  );
}

export function Btn({ variant = "ghost", size, icon, iconRight, block, children, className = "", ...rest }) {
  const cls = ["btn", "btn-" + variant];
  if (size) cls.push("btn-" + size);
  if (block) cls.push("btn-block");
  if (!children) cls.push("btn-icon");
  cls.push(className);
  return (
    <button className={cls.join(" ")} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 16 : 18} />}
    </button>
  );
}

export function Badge({ tone = "gray", dot, icon, children }) {
  return (
    <span className={"badge badge-" + tone}>
      {dot && <span className="dot" />}
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

export const AV_COLORS = ["#d97706", "#2563eb", "#16a34a", "#7c3aed", "#dc2626", "#0891b2", "#db2777", "#475569"];
export function Avatar({ name = "", size = 36, src }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const color = AV_COLORS[(name.charCodeAt(0) || 0) % AV_COLORS.length];
  return (
    <span className="avatar" style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}>
      {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}

export function Field({ label, hint, error, children }) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-hint" style={{ color: "var(--danger)" }}>{error}</span>}
    </div>
  );
}

export function Input({ icon, affix, ...rest }) {
  if (icon || affix) {
    return (
      <div className="input-group">
        {icon && <Icon name={icon} size={17} />}
        <input className="input" {...rest} />
        {affix && <span className="input-affix">{affix}</span>}
      </div>
    );
  }
  return <input className="input" {...rest} />;
}

export function Select({ children, ...rest }) {
  return <select className="select" {...rest}>{children}</select>;
}

export function Checkbox({ checked, onChange, label }) {
  return (
    <label className="row gap-8" style={{ cursor: "pointer", userSelect: "none" }} onClick={(e) => { e.preventDefault(); onChange && onChange(!checked); }}>
      <span className={"checkbox" + (checked ? " on" : "")}>
        {checked && <Icon name="check" size={13} strokeWidth={3} />}
      </span>
      {label && <span style={{ fontSize: 14, color: "var(--ink-700)" }}>{label}</span>}
    </label>
  );
}

export function Switch({ checked, onChange }) {
  return <span className={"switch" + (checked ? " on" : "")} onClick={() => onChange && onChange(!checked)} />;
}

export function Card({ title, action, pad, children, className = "", style = {} }) {
  return (
    <div className={"card " + className} style={style}>
      {title && (
        <div className="card-hd">
          <span className="card-title">{title}</span>
          {action}
        </div>
      )}
      <div className={pad ? "card-pad" : ""}>{children}</div>
    </div>
  );
}

/* Stat tile used in dashboards */
export function Stat({ icon, label, value, delta, tone = "amber", suffix }) {
  const up = delta != null && delta >= 0;
  return (
    <div className="card card-pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="row between">
        <span style={{
          width: 38, height: 38, borderRadius: 11, display: "grid", placeItems: "center",
          background: `var(--${tone}-tint)`, color: `var(--${tone === "amber" ? "amber-600" : tone})`,
        }}>
          <Icon name={icon} size={19} />
        </span>
        {delta != null && (
          <Badge tone={up ? "green" : "red"} icon={up ? "trending-up" : "trending-down"}>
            {up ? "+" : ""}{delta}%
          </Badge>
        )}
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-head)", fontSize: 28, fontWeight: 700, color: "var(--ink-900)", letterSpacing: "-0.03em" }} className="tnum">
          {value}{suffix && <span style={{ fontSize: 16, color: "var(--slate-400)", fontWeight: 600 }}> {suffix}</span>}
        </div>
        <div style={{ fontSize: 13, color: "var(--slate-400)", fontWeight: 600, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

/* Empty image placeholder with striped fill */
export function ImgSlot({ label, height = 200, radius = 16, style = {} }) {
  return (
    <div style={{
      height, borderRadius: radius,
      background: "repeating-linear-gradient(135deg, #eef2f5 0 12px, #f5f7f9 12px 24px)",
      border: "1px dashed var(--slate-200)", display: "grid", placeItems: "center",
      color: "var(--slate-400)", fontFamily: "var(--font-mono)", fontSize: 12, ...style,
    }}>{label}</div>
  );
}

/* Segmented control */
export function Segmented({ options, value, onChange }) {
  return (
    <div style={{ display: "inline-flex", background: "var(--bg-2)", borderRadius: 10, padding: 3, gap: 2 }}>
      {options.map(o => {
        const v = typeof o === "string" ? o : o.value;
        const lab = typeof o === "string" ? o : o.label;
        const on = v === value;
        return (
          <button key={v} onClick={() => onChange(v)} style={{
            border: "none", background: on ? "#fff" : "transparent",
            color: on ? "var(--ink-900)" : "var(--slate-500)",
            fontWeight: 600, fontSize: 13, padding: "6px 13px", borderRadius: 8,
            boxShadow: on ? "var(--sh-xs)" : "none", transition: "all .14s",
          }}>{lab}</button>
        );
      })}
    </div>
  );
}

/* Simple progress bar */
export function Bar({ value, tone = "amber", height = 7 }) {
  const color = tone === "amber" ? "var(--amber-500)" : `var(--${tone})`;
  return (
    <div style={{ background: "var(--bg-2)", borderRadius: 999, height, overflow: "hidden", width: "100%" }}>
      <div style={{ width: Math.min(100, value) + "%", height: "100%", background: color, borderRadius: 999, transition: "width .5s ease" }} />
    </div>
  );
}


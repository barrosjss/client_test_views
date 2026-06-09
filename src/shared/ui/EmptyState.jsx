import { Icon } from './Icon.jsx';
import { Btn } from './primitives.jsx';

const VARIANTS = {
  loading: { icon: 'loader-circle', tone: 'amber', spin: true },
  empty: { icon: 'inbox', tone: 'slate' },
  error: { icon: 'alert-triangle', tone: 'amber' },
  offline: { icon: 'wifi-off', tone: 'slate' },
};

export function EmptyState({
  variant = 'empty',
  icon,
  title = 'Sin datos',
  description,
  actionLabel,
  onAction,
  compact = false,
}) {
  const preset = VARIANTS[variant] ?? VARIANTS.empty;
  const ic = icon ?? preset.icon;
  const pad = compact ? '32px 20px' : '56px 24px';

  return (
    <div
      className="col center fade-in"
      style={{
        padding: pad,
        textAlign: 'center',
        gap: compact ? 10 : 14,
        minHeight: compact ? 160 : 280,
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          width: compact ? 44 : 56,
          height: compact ? 44 : 56,
          borderRadius: 14,
          background: 'var(--bg-2)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--slate-400)',
          animation: preset.spin ? 'spin 1s linear infinite' : undefined,
        }}
      >
        <Icon name={ic} size={compact ? 22 : 28} />
      </span>
      <div style={{ maxWidth: 360 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: compact ? 15 : 17, color: 'var(--ink-900)' }}>
          {title}
        </div>
        {description && (
          <p style={{ fontSize: 14, color: 'var(--slate-500)', marginTop: 6, lineHeight: 1.5 }}>
            {description}
          </p>
        )}
      </div>
      {actionLabel && onAction && (
        <Btn variant="soft" onClick={onAction}>{actionLabel}</Btn>
      )}
    </div>
  );
}

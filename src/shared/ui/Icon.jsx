import React from 'react';
import * as LucideIcons from 'lucide-react';

function toPascal(name) {
  return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

export function Icon({ name, size = 20, strokeWidth = 2, className = '', style = {} }) {
  const pascal = toPascal(name);
  const LucideIcon = LucideIcons[pascal];
  if (!LucideIcon) {
    return <span className={'icon ' + className} style={{ width: size, height: size, ...style }} />;
  }
  return (
    <span className={'icon ' + className} style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      <LucideIcon size={size} strokeWidth={strokeWidth} />
    </span>
  );
}

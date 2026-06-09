#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, '.design-bundle/cmocs/project/js');
const OUT = path.join(ROOT, 'src');

const MODULE_IMPORTS = `import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import {
  Logo, Btn, Badge, Avatar, Field, Input, Select, Checkbox, Switch,
  Card, Stat, ImgSlot, Segmented, Bar,
} from '../../shared/ui/primitives.jsx';
import {
  PageHead, Toolbar, FilterChip, Drawer, KV, CAT_ICON, VehBadge,
  Donut, BarChart, AreaChart, EmptyHint, Breadcrumb, Tabs,
  useSort, SortTh, useToasts, TableFooter,
} from '../../shared/ui/module-common.jsx';
import {
  VEHICLES, VEH_STATUS_TONE, DRIVERS, TRIPS, TRIP_TONE, MAINTENANCE,
  MNT_PRIORITY_TONE, MNT_STATUS_TONE, DOCUMENTS, DOC_TONE, INVOICES, INV_TONE,
  CONTACTS, USERS, ROLES, ALERTS, FUEL_LOG, INVENTORY, INV_STOCK_TONE, PAYROLL,
  WORKSHOPS, OT_STATES, WORK_ORDERS, OT_KPIS, FUEC_LIST, FUEC_STATUS_TONE,
  CONCILIATIONS, CONC_TONE, COMPARENDOS, COMP_TONE, CLIENTS, ODOMETER,
  INSPECTIONS, INSP_TONE, PERSONNEL, PERDIEMS, PERDIEM_TONE,
  SIIGO_JOURNALS, SIIGO_TONE, INSIGHTS_TEXT,
  fmtCOP, fmtNum,
} from '../../shared/data/index.js';
`;

const FEATURE_IMPORTS = `import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import {
  Logo, Btn, Badge, Avatar, Field, Input, Select, Checkbox, Switch,
  Card, Stat, ImgSlot, Segmented, Bar,
} from '../../shared/ui/primitives.jsx';
import { fmtCOP, fmtNum } from '../../shared/data/index.js';
`;

const SHELL_IMPORTS = `import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from '../../shared/ui/Icon.jsx';
import { Logo, Btn, Badge, Avatar, Bar } from '../../shared/ui/primitives.jsx';
import { ALERTS } from '../../shared/data/index.js';
`;

function transform(content, kind) {
  let code = content
    .replace(/^\/\*[\s\S]*?\*\/\s*/m, '')
    .replace(/window\.\w+\s*=\s*\w+;?\s*/g, '')
    .replace(/Object\.assign\(window,\s*\{[\s\S]*?\}\);?\s*/g, '')
    .replace(/React\.Fragment/g, 'Fragment')
    .replace(/React\.useState/g, 'useState')
    .replace(/React\.useEffect/g, 'useEffect')
    .replace(/^function /gm, 'export function ')
    .replace(/^const ([A-Z_][A-Z0-9_]*)\s*=/gm, 'export const $1 =');

  if (kind === 'icons') {
    return `import React from 'react';
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
`;
  }

  if (kind === 'ui') {
    return `import React from 'react';
import { Icon } from './Icon.jsx';

${code}`;
  }

  if (kind === 'common') {
    const commonImports = `import React, { useState, useEffect, Fragment } from 'react';
import { Icon } from './Icon.jsx';
import { Bar } from './primitives.jsx';
`;
    return `${commonImports}\n${code}`;
  }
  if (kind === 'data' || kind === 'data2') return code;
  if (kind === 'shell') return `${SHELL_IMPORTS}\n${code}`;
  if (kind === 'feature') return `${FEATURE_IMPORTS}\n${code}`;
  if (kind === 'module') return `${MODULE_IMPORTS}\n${code}`;
  return code;
}

function port(src, dest, kind) {
  const destPath = path.join(OUT, dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, transform(fs.readFileSync(path.join(SRC, src), 'utf8'), kind));
  console.log('ported', dest);
}

[
  ['icons.jsx', 'shared/ui/Icon.jsx', 'icons'],
  ['ui.jsx', 'shared/ui/primitives.jsx', 'ui'],
  ['data.jsx', 'shared/data/core.js', 'data'],
  ['data2.jsx', 'shared/data/extended.js', 'data2'],
  ['modules/common.jsx', 'shared/ui/module-common.jsx', 'common'],
  ['landing.jsx', 'features/marketing/Landing.jsx', 'feature'],
  ['auth.jsx', 'features/marketing/Auth.jsx', 'feature'],
  ['docs.jsx', 'features/marketing/Docs.jsx', 'feature'],
  ['app-shell.jsx', 'platform/shell/AppShell.jsx', 'shell'],
  ['modules/dashboard.jsx', 'modules/dashboard/Dashboard.jsx', 'module'],
  ['modules/vehicles.jsx', 'modules/vehicles/Vehicles.jsx', 'module'],
  ['modules/workorders.jsx', 'modules/workorders/WorkOrders.jsx', 'module'],
  ['modules/fuec.jsx', 'modules/fuec/Fuec.jsx', 'module'],
  ['modules/trips.jsx', 'modules/trips/Trips.jsx', 'module'],
  ['modules/tracking.jsx', 'modules/tracking/Tracking.jsx', 'module'],
  ['modules/maintenance.jsx', 'modules/maintenance/Maintenance.jsx', 'module'],
  ['modules/documents.jsx', 'modules/documents/Documents.jsx', 'module'],
  ['modules/billing.jsx', 'modules/billing/Billing.jsx', 'module'],
  ['modules/contacts.jsx', 'modules/contacts/Contacts.jsx', 'module'],
  ['modules/users.jsx', 'modules/users/Users.jsx', 'module'],
  ['modules/personnel.jsx', 'modules/personnel/index.jsx', 'module'],
].forEach(([s, d, k]) => port(s, d, k));

// Reports + Payroll from secondary.jsx
const secondary = fs.readFileSync(path.join(SRC, 'modules/secondary.jsx'), 'utf8');
const reportsBlock = secondary.slice(secondary.indexOf('/* ---------------- REPORTS'));
const reportsPath = path.join(OUT, 'modules/reports/Reports.jsx');
fs.mkdirSync(path.dirname(reportsPath), { recursive: true });
fs.writeFileSync(reportsPath, transform(reportsBlock, 'module'));

const payrollBlock = secondary.match(/\/\* -+ PAYROLL[\s\S]*?(?=\/\* -+ REPORTS)/)?.[0] || '';
const payrollPath = path.join(OUT, 'modules/payroll/Payroll.jsx');
fs.mkdirSync(path.dirname(payrollPath), { recursive: true });
fs.writeFileSync(payrollPath, transform(payrollBlock, 'module'));
console.log('ported modules/reports/Reports.jsx');
console.log('ported modules/payroll/Payroll.jsx');

fs.writeFileSync(
  path.join(OUT, 'shared/data/index.js'),
  `export * from './core.js';\nexport * from './extended.js';\n`
);

console.log('done');

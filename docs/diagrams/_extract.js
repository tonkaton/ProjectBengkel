const fs = require('fs');
const path = require('path');
const md = fs.readFileSync('diagram.md', 'utf8');
const names = [
  'use-case',
  'activity-1-booking',
  'activity-2-autentikasi',
  'activity-3-penawaran',
  'activity-4-tukar-reward',
  'activity-5-update-status-transaksi',
  'activity-6-reminder-otomatis',
  'activity-7-crud-generik',
  'sequence-1-booking',
  'sequence-2-autentikasi',
  'sequence-3-penawaran',
  'sequence-4-tukar-reward',
  'sequence-5-update-status-transaksi',
  'sequence-6-reminder-otomatis',
  'sequence-7-crud-generik',
  'erd',
  'class-diagram'
];
const re = /```mermaid\s*\n([\s\S]*?)```/g;
let m, i = 0;
const out = path.join('docs', 'diagrams');
while ((m = re.exec(md)) !== null) {
  const name = names[i] || ('diagram-' + i);
  fs.writeFileSync(path.join(out, name + '.mmd'), m[1].trimEnd() + '\n');
  i++;
}
console.log('Extracted ' + i + ' diagrams');

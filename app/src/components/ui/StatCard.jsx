import React from 'react';
import { TrendingUp } from 'lucide-react';

const chipMap = {
  'bg-red-600': 'bg-red-100 text-red-600',
  'bg-yellow-600': 'bg-amber-100 text-amber-600',
  'bg-zinc-700': 'bg-slate-200 text-ink2',
};

const StatCard = ({ icon: Icon, label, value, color, trend }) => {
  const chip = chipMap[color] || 'bg-base text-accent';

  return (
    <div className="rounded-4xl border border-line bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-soft-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
          <h3 className="mt-2 font-mono text-3xl font-semibold tracking-tight text-ink">{value}</h3>
          {trend && (
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${chip} shadow-soft-sm`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

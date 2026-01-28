import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, trend }) => {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
          {trend && (
            <div className="flex items-center text-green-400 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

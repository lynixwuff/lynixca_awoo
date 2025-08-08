'use client';

import { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
}

export default function StatCard({ title, value, icon, color, change, changeType = 'neutral' }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-green-400';
      case 'decrease': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase': return 'fa-arrow-up';
      case 'decrease': return 'fa-arrow-down';
      default: return 'fa-minus';
    }
  };

  return (
    <div 
      className={`bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:border-gray-600 hover:shadow-lg ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {change && (
            <p className={`text-xs flex items-center gap-1 ${getChangeColor()}`}>
              <i className={`fas ${getChangeIcon()}`}></i>
              <span>{change}</span>
            </p>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'scale-110' : ''
        }`}>
          <i className={`fas ${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}

import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  isNegative: boolean;
}

export function KPICard({ title, value, change, changeLabel, isNegative }: KPICardProps) {
  return (
    <div className="bg-[#0a0e27] p-2 rounded border border-[#1a2150]">
      <div className="text-gray-400 text-[10px] mb-1">{title}</div>
      <div className="text-cyan-400 text-lg mb-0.5">{value}</div>
      <div className={`flex items-center gap-1 text-[10px] mb-0.5 ${isNegative ? 'text-red-400' : 'text-green-400'}`}>
        {isNegative ? <TrendingDown className="w-2.5 h-2.5" /> : <TrendingUp className="w-2.5 h-2.5" />}
        <span>{change}</span>
      </div>
      <div className="text-gray-500 text-[9px]">{changeLabel}</div>
    </div>
  );
}

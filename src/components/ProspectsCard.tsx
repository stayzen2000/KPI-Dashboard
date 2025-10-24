import { useKpiData } from '../context/DataContext';

export function ProspectsCard() {
  const { data } = useKpiData();
  const value = data?.prospects.value ?? 0;
  const change = data?.prospects.changePct ?? 0;

  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Prospects</h3>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-cyan-400 text-5xl mb-2">{value.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">{change >= 0 ? `+${change}% change` : `${change}% change`}</div>
        <div className="text-gray-500 text-xs">LAST WK: {data?.prospects.lastWeek.toLocaleString()}</div>
      </div>
    </div>
  );
}

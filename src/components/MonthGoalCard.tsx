import { useKpiData } from '../context/DataContext';

export function MonthGoalCard() {
  const { data } = useKpiData();
  const pct = data?.monthGoal.percent ?? 0;
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col justify-center items-center">
      <h3 className="text-white mb-2 text-sm">Month Goal Completion</h3>
      <div className="text-cyan-400 text-5xl mb-2">{pct}%</div>
      <div className="text-gray-400 text-xs">
        {data ? `${data.monthGoal.numerator} / ${data.monthGoal.denominator} Prospects` : '—'}
      </div>
    </div>
  );
}

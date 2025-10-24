import { useKpiData } from './context/DataContext';
import { KPICard } from './components/KPICard';
import { DialCountChart } from './components/DialCountChart';
import { ProspectsDialedChart } from './components/ProspectsDialedChart';
import { MonthGoalCard } from './components/MonthGoalCard';
import { ProspectsCard } from './components/ProspectsCard';
import { ProspectQualityPieChart } from './components/ProspectQualityPieChart';
import { ProspectQualityByDayChart } from './components/ProspectQualityByDayChart';

export default function App() {
  const { data, loading, error } = useKpiData();

  return (
    <div className="h-screen bg-[#0a0e27] p-3 overflow-hidden flex flex-col">
      <h1 className="text-white text-center mb-2 text-sm">
        {loading && 'Loading…'}
        {error && 'Error loading'}
        {!loading && !error && `Weekly KPI Metrics Dashboard - Week Ending - ${data?.weekEnding}`}
      </h1>

      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
        <div className="col-span-2 flex flex-col">
          <div className="bg-[#0f1535] p-2 rounded-lg border border-[#1a2150] flex flex-col h-full">
            <h2 className="text-white mb-2 text-xs">Monthly Progress</h2>

            {!data ? null : (
              <div className="space-y-2 flex-1 flex flex-col justify-around">
                <KPICard
                  title="Dials Total"
                  value={data.kpiCards.dialsTotal.toLocaleString()}
                  change={`${percentDelta(data.kpiCards.dialsTotal, data.kpiCards.lastWeek.dialsTotal)}%`}
                  changeLabel={`LAST WK: ${data.kpiCards.lastWeek.dialsTotal.toLocaleString()}`}
                  isNegative={data.kpiCards.dialsTotal < data.kpiCards.lastWeek.dialsTotal}
                />
                <KPICard
                  title="Interested"
                  value={data.kpiCards.interested.toLocaleString()}
                  change={`${percentDelta(data.kpiCards.interested, data.kpiCards.lastWeek.interested)}%`}
                  changeLabel={`LAST WK: ${data.kpiCards.lastWeek.interested.toLocaleString()}`}
                  isNegative={data.kpiCards.interested < data.kpiCards.lastWeek.interested}
                />
                <KPICard
                  title="Nurtured"
                  value={data.kpiCards.nurtured.toLocaleString()}
                  change={`${percentDelta(data.kpiCards.nurtured, data.kpiCards.lastWeek.nurtured)}%`}
                  changeLabel={`LAST WK: ${data.kpiCards.lastWeek.nurtured.toLocaleString()}`}
                  isNegative={data.kpiCards.nurtured < data.kpiCards.lastWeek.nurtured}
                />
                <KPICard
                  title="Clients"
                  value={data.kpiCards.clients.toLocaleString()}
                  change="+0% change"
                  changeLabel="LAST WK: 0"
                  isNegative={false}
                />
              </div>
            )}
          </div>
        </div>

        <div className="col-span-10 flex flex-col gap-2 min-h-0">
          <div className="grid grid-cols-12 gap-2 flex-1">
            <div className="col-span-6"><DialCountChart /></div>
            <div className="col-span-3"><MonthGoalCard /></div>
            <div className="col-span-3"><ProspectQualityPieChart /></div>
          </div>

          <div className="grid grid-cols-12 gap-2 flex-1">
            <div className="col-span-6"><ProspectsDialedChart /></div>
            <div className="col-span-6"><ProspectsCard /></div>
          </div>

          <div className="flex-1">
            <ProspectQualityByDayChart />
          </div>
        </div>
      </div>
    </div>
  );
}

function percentDelta(curr:number, prev:number){
  if (!prev) return 0;
  return Math.round(((curr - prev)/prev)*100);
}

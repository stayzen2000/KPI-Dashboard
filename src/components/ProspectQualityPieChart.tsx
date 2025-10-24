import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useKpiData } from '../context/DataContext';

const COLORS = ['#84cc16', '#ef4444', '#f59e0b', '#06b6d4', '#6b7280'];

const renderCustomLabel = (entry: any) => `${entry.percentage}`;

export function ProspectQualityPieChart() {
  const { data } = useKpiData();
  const series = data?.prospectQuality ?? [];

  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Prospect Quality</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={series} cx="50%" cy="45%" labelLine={false} label={renderCustomLabel} outerRadius="60%" dataKey="value">
              {series.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor:'#0f1535', border:'1px solid #1a2150', borderRadius:'8px', color:'#fff', fontSize:'11px' }}/>
            <Legend verticalAlign="bottom" height={30} iconType="circle" wrapperStyle={{ color:'#9ca3af', fontSize:'9px' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useKpiData } from '../context/DataContext';

export function ProspectsDialedChart() {
  const { data } = useKpiData();
  const series = data?.prospectsDialedLast7 ?? [];

  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Prospects Dialed (Last 7 Days)</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2150" />
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fill:'#9ca3af', fontSize:10 }}/>
            <YAxis stroke="#6b7280" tick={{ fill:'#9ca3af', fontSize:10 }}/>
            <Tooltip contentStyle={{ backgroundColor:'#0f1535', border:'1px solid #1a2150', borderRadius:'8px', color:'#fff', fontSize:'11px' }}/>
            <Bar dataKey="count" fill="#06b6d4" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

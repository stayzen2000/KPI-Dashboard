import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useKpiData } from '../context/DataContext';

export function ProspectQualityByDayChart() {
  const { data } = useKpiData();
  const series = data?.typeOfBusinessByDay ?? [];

  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Type of Business</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={series}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2150" />
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fill:'#9ca3af', fontSize:10 }}/>
            <YAxis stroke="#6b7280" tick={{ fill:'#9ca3af', fontSize:10 }}/>
            <Tooltip contentStyle={{ backgroundColor:'#0f1535', border:'1px solid #1a2150', borderRadius:'8px', color:'#fff', fontSize:'11px' }}/>
            <Legend wrapperStyle={{ color:'#9ca3af', fontSize:'10px' }} iconType="circle" />
            <Bar dataKey="Car Dealerships" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Contractors"    stackId="a" fill="#f59e0b" />
            <Bar dataKey="Law Firms"       stackId="a" fill="#8b5cf6" />
            <Bar dataKey="Clinics"         stackId="a" fill="#10b981" />
            <Bar dataKey="Restaurants"     stackId="a" fill="#ef4444" />
            <Bar dataKey="Med Spas"        stackId="a" fill="#ec4899" />
            <Bar dataKey="Gyms"            stackId="a" fill="#06b6d4" />
            <Bar dataKey="Barbershop"      stackId="a" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

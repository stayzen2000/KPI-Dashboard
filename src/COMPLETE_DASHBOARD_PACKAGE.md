# AI Agency KPI Dashboard - Complete Build Package

## Overview
This is a dark-themed KPI dashboard for tracking AI agency prospect engagement metrics. The dashboard displays real-time analytics including dial counts, prospect quality, business type distribution, and goal completion metrics. The entire layout is optimized to fit on one screen without scrolling.

---

## Tech Stack
- **React** (with TypeScript)
- **Tailwind CSS** (v4.0)
- **Recharts** (for data visualization)
- **Lucide React** (for icons)

---

## File Structure

```
├── App.tsx
├── styles/
│   └── globals.css
└── components/
    ├── KPICard.tsx
    ├── DialCountChart.tsx
    ├── ProspectsDialedChart.tsx
    ├── MonthGoalCard.tsx
    ├── ProspectsCard.tsx
    ├── ProspectQualityPieChart.tsx
    └── ProspectQualityByDayChart.tsx
```

---

## Installation Instructions

### 1. Create a new React + TypeScript project with Vite:
```bash
npm create vite@latest ai-agency-dashboard -- --template react-ts
cd ai-agency-dashboard
```

### 2. Install dependencies:
```bash
npm install
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind CSS for v4.0

Update `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Source Code Files

### 1. `/App.tsx`

```tsx
import { KPICard } from './components/KPICard';
import { DialCountChart } from './components/DialCountChart';
import { ProspectsDialedChart } from './components/ProspectsDialedChart';
import { MonthGoalCard } from './components/MonthGoalCard';
import { ProspectsCard } from './components/ProspectsCard';
import { ProspectQualityPieChart } from './components/ProspectQualityPieChart';
import { ProspectQualityByDayChart } from './components/ProspectQualityByDayChart';

export default function App() {
  return (
    <div className="h-screen bg-[#0a0e27] p-3 overflow-hidden flex flex-col">
      {/* Header */}
      <h1 className="text-white text-center mb-2 text-sm">
        Weekly KPI Metrics Dashboard - Week Ending - 10/22/2025
      </h1>

      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
        {/* Left Sidebar - KPI Cards */}
        <div className="col-span-2 flex flex-col">
          <div className="bg-[#0f1535] p-2 rounded-lg border border-[#1a2150] flex flex-col h-full">
            <h2 className="text-white mb-2 text-xs">Monthly Progress</h2>
            <div className="space-y-2 flex-1 flex flex-col justify-around">
              <KPICard
                title="Dials Total"
                value="1,377"
                change="+1%"
                changeLabel="LAST WK: 1,751"
                isNegative={false}
              />
              <KPICard
                title="Interested"
                value="19"
                change="+525% change"
                changeLabel="LAST WK: 11"
                isNegative={false}
              />
              <KPICard
                title="Nurtured"
                value="5"
                change="-43% change"
                changeLabel="LAST WK: 9"
                isNegative={true}
              />
              <KPICard
                title="Clients"
                value="0"
                change="+0% change"
                changeLabel="LAST WK: 0"
                isNegative={false}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-10 flex flex-col gap-2 min-h-0">
          {/* Row 1: Charts and Cards */}
          <div className="grid grid-cols-12 gap-2 flex-1">
            <div className="col-span-6">
              <DialCountChart />
            </div>
            <div className="col-span-3">
              <MonthGoalCard />
            </div>
            <div className="col-span-3">
              <ProspectQualityPieChart />
            </div>
          </div>

          {/* Row 2: Bar Chart and Prospects */}
          <div className="grid grid-cols-12 gap-2 flex-1">
            <div className="col-span-6">
              <ProspectsDialedChart />
            </div>
            <div className="col-span-6">
              <ProspectsCard />
            </div>
          </div>

          {/* Row 3: Type of Business Chart */}
          <div className="flex-1">
            <ProspectQualityByDayChart />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 2. `/components/KPICard.tsx`

```tsx
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
```

---

### 3. `/components/DialCountChart.tsx`

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '10/10', count: 0 },
  { date: '10/11', count: 320 },
  { date: '10/12', count: 479 },
  { date: '10/13', count: 0 },
  { date: '10/14', count: 375 },
  { date: '10/15', count: 128 },
  { date: '10/16', count: 75 },
];

export function DialCountChart() {
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Dial Count Last 7 Days</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2150" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f1535', 
                border: '1px solid #1a2150',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#fbbf24" 
              strokeWidth={2}
              dot={{ fill: '#fbbf24', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

### 4. `/components/ProspectsDialedChart.tsx`

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '10/10', count: 0 },
  { date: '10/11', count: 335 },
  { date: '10/12', count: 139 },
  { date: '10/13', count: 137 },
  { date: '10/14', count: 0 },
  { date: '10/15', count: 0 },
  { date: '10/16', count: 22 },
];

export function ProspectsDialedChart() {
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Prospects Dialed (Last 7 Days)</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2150" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f1535', 
                border: '1px solid #1a2150',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px'
              }}
            />
            <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

### 5. `/components/MonthGoalCard.tsx`

```tsx
export function MonthGoalCard() {
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col justify-center items-center">
      <h3 className="text-white mb-2 text-sm">Month Goal Completion</h3>
      <div className="text-cyan-400 text-5xl mb-2">77%</div>
      <div className="text-gray-400 text-xs">386 / 500 Prospects</div>
    </div>
  );
}
```

---

### 6. `/components/ProspectsCard.tsx`

```tsx
export function ProspectsCard() {
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Prospects</h3>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="text-cyan-400 text-5xl mb-2">386</div>
        <div className="text-gray-400 text-sm">+17% change</div>
        <div className="text-gray-500 text-xs">LAST WK: 360</div>
      </div>
    </div>
  );
}
```

---

### 7. `/components/ProspectQualityPieChart.tsx`

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Interested', value: 30, percentage: '30%' },
  { name: 'Not Interested', value: 25, percentage: '25%' },
  { name: 'Follow-Up', value: 20, percentage: '20%' },
  { name: 'VM/Ringing', value: 15, percentage: '15%' },
  { name: 'Dead', value: 10, percentage: '10%' },
];

const COLORS = ['#84cc16', '#ef4444', '#f59e0b', '#06b6d4', '#6b7280'];

const renderCustomLabel = (entry: any) => {
  return `${entry.percentage}`;
};

export function ProspectQualityPieChart() {
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Prospect Quality</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius="60%"
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f1535', 
                border: '1px solid #1a2150',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={30}
              iconType="circle"
              wrapperStyle={{ color: '#9ca3af', fontSize: '9px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

### 8. `/components/ProspectQualityByDayChart.tsx` (Type of Business Chart)

```tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    date: '10/10',
    'Car Dealerships': 35,
    'Contractors': 45,
    'Law Firms': 25,
    'Clinics': 40,
    'Restaurants': 30,
    'Med Spas': 20,
    'Gyms': 15,
    'Barbershop': 10,
  },
  {
    date: '10/11',
    'Car Dealerships': 0,
    'Contractors': 0,
    'Law Firms': 0,
    'Clinics': 0,
    'Restaurants': 0,
    'Med Spas': 0,
    'Gyms': 0,
    'Barbershop': 0,
  },
  {
    date: '10/12',
    'Car Dealerships': 70,
    'Contractors': 85,
    'Law Firms': 50,
    'Clinics': 75,
    'Restaurants': 60,
    'Med Spas': 45,
    'Gyms': 35,
    'Barbershop': 25,
  },
  {
    date: '10/13',
    'Car Dealerships': 65,
    'Contractors': 80,
    'Law Firms': 55,
    'Clinics': 70,
    'Restaurants': 55,
    'Med Spas': 40,
    'Gyms': 30,
    'Barbershop': 20,
  },
  {
    date: '10/14',
    'Car Dealerships': 0,
    'Contractors': 0,
    'Law Firms': 0,
    'Clinics': 0,
    'Restaurants': 0,
    'Med Spas': 0,
    'Gyms': 0,
    'Barbershop': 0,
  },
  {
    date: '10/15',
    'Car Dealerships': 0,
    'Contractors': 0,
    'Law Firms': 0,
    'Clinics': 0,
    'Restaurants': 0,
    'Med Spas': 0,
    'Gyms': 0,
    'Barbershop': 0,
  },
  {
    date: '10/16',
    'Car Dealerships': 40,
    'Contractors': 55,
    'Law Firms': 30,
    'Clinics': 50,
    'Restaurants': 45,
    'Med Spas': 25,
    'Gyms': 20,
    'Barbershop': 15,
  },
];

export function ProspectQualityByDayChart() {
  return (
    <div className="bg-[#0f1535] p-3 rounded-lg border border-[#1a2150] h-full flex flex-col">
      <h3 className="text-white mb-2 text-sm">Type of Business</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2150" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f1535', 
                border: '1px solid #1a2150',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px'
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#9ca3af', fontSize: '10px' }}
              iconType="circle"
            />
            <Bar dataKey="Car Dealerships" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Contractors" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Law Firms" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Clinics" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Restaurants" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Med Spas" stackId="a" fill="#ec4899" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Gyms" stackId="a" fill="#06b6d4" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Barbershop" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

---

### 9. `/styles/globals.css`

```css
@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}
```

---

## Important Notes for AI Assistants (ChatGPT/Claude)

When building this dashboard:

1. **File Locations**: In a Vite React project, place all source files in the `src/` directory:
   - `src/App.tsx`
   - `src/components/` (all component files)
   - `src/styles/globals.css`

2. **Import the CSS**: Make sure to import the globals.css in your `main.tsx`:
```tsx
import './styles/globals.css'
```

3. **Color Scheme**: 
   - Primary background: `#0a0e27`
   - Card background: `#0f1535`
   - Border color: `#1a2150`
   - Accent color: Cyan (`#06b6d4`)

4. **Business Types & Colors** (Type of Business Chart):
   - Car Dealerships: Blue (#3b82f6)
   - Contractors: Amber (#f59e0b)
   - Law Firms: Purple (#8b5cf6)
   - Clinics: Green (#10b981)
   - Restaurants: Red (#ef4444)
   - Med Spas: Pink (#ec4899)
   - Gyms: Cyan (#06b6d4)
   - Barbershop: Indigo (#6366f1)

5. **Responsive Layout**: The dashboard uses CSS Grid with a 12-column layout and is optimized to fit on one screen without scrolling.

6. **Key Features**:
   - Monthly Progress KPI cards (left sidebar)
   - Dial Count line chart (7 days)
   - Month Goal Completion card
   - Prospect Quality pie chart
   - Prospects Dialed bar chart
   - Prospects summary card
   - Type of Business stacked bar chart

---

## Running the Dashboard

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5173`

---

## Customization

- **Data**: Update the `data` arrays in each chart component to reflect real metrics
- **Date Range**: Modify date ranges in chart data arrays
- **Colors**: Adjust color values in component files
- **KPI Values**: Update values in the `App.tsx` KPICard props

---

## Package Version

**Version**: 1.0.0  
**Last Updated**: October 24, 2025  
**Dashboard Type**: AI Agency Prospect Engagement Metrics  
**Layout**: Single-page, no-scroll design

---

## Support

This package includes all necessary files and instructions to build the dashboard from scratch. Simply copy the code into the appropriate files in your React project structure.

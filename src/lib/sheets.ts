// src/lib/sheets.ts
export type ApiData = {
  ok: boolean;
  weekEnding: string;
  dialCountLast7: { date: string; count: number }[];
  prospectsDialedLast7: { date: string; count: number }[];
  prospectQuality: { name: string; value: number; percentage: string }[];
  prospects: { value: number; changePct: number; lastWeek: number };
  monthGoal: { percent: number; numerator: number; denominator: number };
  kpiCards: {
    dialsTotal: number;
    interested: number;
    nurtured: number;
    clients: number;
    lastWeek: { dialsTotal: number; interested: number; nurtured: number; clients: number };
  };
  typeOfBusinessByDay: Record<string, number | string>[];
};

export async function fetchKpi(): Promise<ApiData> {
  const url = import.meta.env.VITE_SHEETS_API_URL;
  if (!url) throw new Error("VITE_SHEETS_API_URL missing");

  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();
  if (!res.ok || !json || json.ok === false) {
    throw new Error(json?.error || "API returned an error");
  }

  // Accept both summary (preferred) and raw-rows and normalize to summary:
  if (json.weekEnding && json.monthGoal) return json as ApiData;

  if (Array.isArray(json.rows)) {
    return rowsToSummary(json.rows);
  }
  throw new Error("Unexpected API response shape");
}

/** Transform the raw `rows` payload (fallback) into the summary shape */
function rowsToSummary(rows: any[]): ApiData {
  if (!rows?.length) {
    return {
      ok: true,
      weekEnding: "",
      dialCountLast7: [],
      prospectsDialedLast7: [],
      prospectQuality: [],
      prospects: { value: 0, changePct: 0, lastWeek: 0 },
      monthGoal: { percent: 0, numerator: 0, denominator: 500 },
      kpiCards: {
        dialsTotal: 0, interested: 0, nurtured: 0, clients: 0,
        lastWeek: { dialsTotal: 0, interested: 0, nurtured: 0, clients: 0 }
      },
      typeOfBusinessByDay: []
    };
  }
  const copy = [...rows].filter(r => r?.date);
  copy.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const weekEnding = toISO(copy[copy.length-1].date);
  const last7 = copy.slice(-7);
  const prev7 = copy.slice(-14, -7);
  const sum = (arr:any[], k:string) => arr.reduce((a,r)=> a + Number(r?.[k] || 0), 0);

  const dialCountLast7 = last7.map(r => ({ date: toMMDD(r.date), count: Number(r.total||0) }));
  const prospectsDialedLast7 = dialCountLast7.slice();

  const interested = sum(copy, "interested");
  const notInterested = sum(copy, "not_interested");
  const followUp = sum(copy, "follow_up");
  const vmRinging = sum(copy, "vm_ringing");
  const dead = sum(copy, "dead");
  const pieTotal = Math.max(1, interested + notInterested + followUp + vmRinging + dead);

  const prospectsLast7 = sum(last7, "total");
  const last7Prev = sum(prev7, "total");
  const changePct = last7Prev ? Math.round(((prospectsLast7 - last7Prev)/last7Prev)*100) : 0;

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthTotal = copy
    .filter(r => { const d=new Date(r.date); return d>=monthStart && d<=now; })
    .reduce((a,r)=> a + Number(r.total||0), 0);
  const GOAL = 500;
  const goalPct = Math.round((thisMonthTotal/GOAL)*100);

  const kpiCards = {
  dialsTotal: prospectsLast7,
  interested: sum(last7, "interested"),
  nurtured:   sum(last7, "interested"),   // 👈 was "follow_up"
  clients:    0,
  lastWeek: {
    dialsTotal: last7Prev,
    interested: sum(prev7, "interested"),
    nurtured:   sum(prev7, "interested"), // 👈 was "follow_up"
    clients:    0
  }
};


  const typeOfBusinessByDay = last7.map(r => ({
    date: toMMDD(r.date),
    "Car Dealerships": Number(r.car_dealerships||0),
    "Contractors":     Number(r.contractors||0),
    "Law Firms":       Number(r.law_firms||0),
    "Clinics":         Number(r.clinics||0),
    "Restaurants":     Number(r.restaurants||0),
    "Med Spas":        Number(r.med_spas||0),
    "Gyms":            Number(r.gyms||0),
    "Barbershop":      Number(r.barbershops||r.barbershop||0),
  }));

  return {
    ok: true,
    weekEnding,
    dialCountLast7,
    prospectsDialedLast7,
    prospectQuality: [
      { name:"Interested",    value: interested,    percentage: pct(interested, pieTotal) },
      { name:"Not Interested",value: notInterested, percentage: pct(notInterested, pieTotal) },
      { name:"Follow-Up",     value: followUp,      percentage: pct(followUp, pieTotal) },
      { name:"VM/Ringing",    value: vmRinging,     percentage: pct(vmRinging, pieTotal) },
      { name:"Dead",          value: dead,          percentage: pct(dead, pieTotal) },
    ],
    prospects: { value: prospectsLast7, changePct, lastWeek: last7Prev },
    monthGoal: { percent: clamp(goalPct,0,100), numerator: thisMonthTotal, denominator: GOAL },
    kpiCards,
    typeOfBusinessByDay
  };
}

function toISO(x:any){ const d=new Date(x); const m=String(d.getMonth()+1).padStart(2,"0"); const day=String(d.getDate()).padStart(2,"0"); return `${d.getFullYear()}-${m}-${day}`;}
function toMMDD(x:any){ const d=new Date(x); const m=String(d.getMonth()+1).padStart(2,"0"); const day=String(d.getDate()).padStart(2,"0"); return `${m}/${day}`;}
function pct(n:number,d:number){ return `${Math.round((n/d)*100)}%`; }
function clamp(n:number,min:number,max:number){ return Math.max(min, Math.min(max, n)); }

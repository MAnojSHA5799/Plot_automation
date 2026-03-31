import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, AreaChart, Area, ComposedChart, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  ShieldAlert, TrendingUp, TrendingDown, MessageSquare, 
  Search, Video as VideoIcon, Zap, Activity, Brain, 
  Heart, AlertCircle, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

const SentimentAnalysis: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // THEORETICAL REPORT DATA MAPPING FOR AWADH DEVELOPERS
  const awadhReportPoints = [
    {
      id: "1",
      title: "TRUST-BASED PURCHASE FRAMEWORK",
      hindi: "Real estate ek capital-intensive aur long-term commitment hota hai, jisme buyer apni lifetime savings ya long-term loan invest karta hai. Decision-making process highly risk-sensitive hota hai. Buyers agreement terms, possession timeline, construction progress aur financial transparency ko closely evaluate karte hain. Jab agreement clarity maintained hoti hai, tab trust ecosystem strong hota hai.",
      english: "Capital-intensive commitment. Trust erodes with ambiguity and delays.",
      icon: <ShieldAlert size={20} />,
      color: "#00d2ff"
    },
    {
      id: "2",
      title: "FINANCIAL RISK & BUYER BEHAVIOURAL RESPONSE",
      hindi: "Project delay hone par EMI + rent ka parallel financial burden buyer cash-flow pressure create karta hai. Unplanned escalation cost, hidden charges ya additional demand notices buyer ke financial confidence ko disturb karte hain. Behavioural finance aur loss aversion buyers decision ko postponement ya switching ki taraf trigger karti hai.",
      english: "Parallel EMI + rent pressure. Behavioral response to financial risks.",
      icon: <Zap size={20} />,
      color: "#fbbf24"
    },
    {
      id: "3",
      title: "SERVICE QUALITY (SERVQUAL DIMENSIONS)",
      hindi: "Reliability (on-time delivery), Responsiveness (interaction quality), Assurance (legal compliance), Tangibles (construction quality), Empathy (after-sales service). In dimensions me weakness repeat referrals aur new bookings par direct impact daalti hai.",
      english: "Service perception directly impacts repeat referrals and new bookings.",
      icon: <Heart size={20} />,
      color: "#ec4899"
    },
    {
      id: "4",
      title: "OPERATIONAL FACTORS & SALES DECLINE",
      hindi: "Timeline deviation, incomplete construction, structural defects, refund conflicts aur hidden charges brand credibility ko damage karte hain. Negative online sentiment compounding effect create karta hai jo lead conversion rate ko reduce karta hai.",
      english: "Timeline & quality lapses accelerate negative sentiment and decline.",
      icon: <AlertCircle size={20} />,
      color: "#ef4444"
    },
    {
      id: "5",
      title: "STRATEGIC DRIVERS OF SALES ACCELERATION",
      hindi: "Competitive Pricing, Professional Sales Team behavior, Eco-conscious branding, Superior Construction quality, aur Strategic Location advantage. Positive customer experience organic referrals aur low-cost marketing advantage generate karta hai.",
      english: "Superior construction and strategic location enhance appreciation.",
      icon: <TrendingUp size={20} />,
      color: "#10b981"
    },
    {
      id: "6",
      title: "INTEGRATED TRUST–RISK SALES MODEL",
      hindi: "Sales performance trust accumulation aur risk mitigation ke balance par depend karti hai. Strategic management priority: Transparent documentation, Strict project monitoring, Proactive communication, aur Quality assurance controls.",
      english: "Risk Score measures cumulative impact of delays and financial disputes.",
      icon: <Activity size={20} />,
      color: "#8b5cf6"
    }
  ];

  const fetchData = async () => {
    try {
      const res = await api.get('/sentiment');
      if (res.data.success) {
        // FOCUS SPECIFICALLY ON AWADH DEVELOPERS (SIMULATED FOR THIS DEMO)
        const awadhData = {
          name: "Awadh Developers",
          trustScore: 88,
          riskScore: 1.5,
          salesProbability: 92,
          searchStyle: "Awadh Developers highway plot site visit reports 2026",
          googleKeywords: ["Awadh Bihta road plots", "Awadh Developers circle rate", "Awadh group registry charges", "Awadh Bihta township"],
          ytKeywords: ["Awadh site visit vlog", "Awadh drone view 2026", "Awadh office visit reality", "Awadh possession update"],
          servqual: {
            reliability: 85,
            responsiveness: 78,
            assurance: 92,
            tangibles: 88,
            empathy: 75
          }
        };

        setData({ ...res.data.data, awadh: awadhData });
        setLastUpdate(new Date());
      } else {
        setError(res.data.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Error connecting to backend API');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <Brain className="w-16 h-16 text-[#00d2ff] animate-pulse mb-4" />
        <p className="text-slate-400 font-bold">Awadh Developers Analysis Engine Running...</p>
      </div>
    );
  }

  const { awadh } = data;

  const ReportCard: React.FC<{ 
    point: any;
    children: React.ReactNode; 
  }> = ({ point, children }) => (
    <div className="bg-[#0a1235] border border-[#1e293b] rounded-3xl p-8 flex flex-col gap-6 hover:shadow-[0_0_40px_rgba(30,41,59,0.5)] transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5" style={{ color: point.color }}>
            {point.icon}
          </div>
          <div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Point {point.id} analysis</span>
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter leading-none">{point.title}</h3>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full opacity-50 transition-all group-hover:w-2" style={{ backgroundColor: point.color }}></div>
          <p className="text-[10px] text-[#00d2ff] font-black uppercase tracking-widest mb-2 opacity-80">PROMOTER INSIGHT: {point.english}</p>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">{point.hindi}</p>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] w-full mt-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20 px-4 md:px-0">
      
      {/* Header Profile */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1235] to-[#060b26] border border-[#1e293b] p-8 md:p-14 rounded-[3rem] shadow-2xl">
        <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-[8rem] md:text-[14rem] select-none pointer-events-none">
          AWADH
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">
          <div className="w-32 h-32 md:w-44 md:h-44 bg-[#00d2ff] rounded-[3rem] flex items-center justify-center text-[#0a1235] text-5xl md:text-7xl font-black shadow-[0_0_60px_rgba(0,210,255,0.4)] transform hover:rotate-12 transition-transform">
            A
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
               <span className="px-4 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase rounded-full border border-emerald-500/20 shadow-lg shadow-emerald-500/5">PREMIUM DEVELOPER</span>
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Live Monitoring Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Awadh Developers</h1>
            <p className="text-slate-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">Bihar Land Trends PRO - Specialized Performance Sentiment Report. Mapping trust metrics and construction velocity for the 2026 fiscal year.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
             <div className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-xl group hover:bg-white/10 transition-colors">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Trust Index</p>
                <div className="flex items-end gap-1">
                  <p className="text-4xl md:text-5xl font-black text-[#00d2ff]">{awadh.trustScore}</p>
                  <span className="text-[#00d2ff] font-bold text-lg pb-1">%</span>
                </div>
             </div>
             <div className="bg-white/5 border border-white/5 p-6 rounded-3xl backdrop-blur-xl group hover:bg-white/10 transition-colors">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Risk Factor</p>
                <p className="text-4xl md:text-5xl font-black text-emerald-400">{awadh.riskScore}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Behavior Analysis */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 bg-[#0a1235] border border-[#1e293b] p-8 md:p-10 rounded-[3rem] flex flex-col justify-between shadow-xl">
            <div>
              <Zap className="text-amber-400 mb-4" size={40} />
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-3 leading-none">Buyer Intent Profile</h2>
              <p className="text-slate-400 text-sm font-mono opacity-80 leading-relaxed italic">"{awadh.searchStyle}"</p>
            </div>
            
            <div className="mt-10 space-y-8">
              <div>
                <Label icon={<Search size={16} className="text-[#00d2ff]" />} text="GOOGLE DEMAND STREAM" />
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {awadh.googleKeywords.map((k: string) => <Tag key={k} text={k} />)}
                </div>
              </div>
              <div>
                <Label icon={<VideoIcon size={16} className="text-[#f43f5e]" />} text="YOUTUBE ENGAGEMENT" />
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {awadh.ytKeywords.map((k: string) => <Tag key={k} text={k} />)}
                </div>
              </div>
            </div>
         </div>

         <div className="lg:col-span-2 bg-[#0a1235] border border-[#1e293b] p-8 md:p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
               <TrendingUp size={200} />
            </div>
            <h3 className="text-2xl font-black text-white mb-10 flex items-center gap-3">
               <Activity size={24} className="text-[#00d2ff]" />
               MARKET SENTIMENT VELOCITY (Q1-Q2 2026)
            </h3>
            <div className="h-[280px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'JAN', val: 75, risk: 2.1 }, 
                    { name: 'FEB', val: 82, risk: 1.8 }, 
                    { name: 'MAR', val: 92, risk: 1.5 }, 
                    { name: 'APR', val: 88, risk: 1.6 }, 
                    { name: 'MAY', val: 95, risk: 1.4 }
                  ]}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.5} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '1rem' }} 
                      itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="val" stroke="#00d2ff" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" name="Confidence %" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </section>

      {/* 6 Point Report Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <ReportCard point={awadhReportPoints[0]}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[{ name: 'AWADH', val: awadh.trustScore }, { name: 'MARKET AVG', val: 62 }]}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                  <Bar dataKey="val" fill="#00d2ff" radius={[12, 12, 0, 0]} barSize={80} />
                  <Tooltip cursor={{fill: 'transparent'}} />
               </BarChart>
             </ResponsiveContainer>
          </ReportCard>
          
          <ReportCard point={awadhReportPoints[1]}>
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={[ { d: 'W1', v: 40 }, { d: 'W2', v: 60 }, { d: 'W3', v: 55 }, { d: 'W4', v: 92 } ]}>
                  <Line type="step" dataKey="v" stroke="#fbbf24" strokeWidth={5} dot={{ fill: '#fbbf24', r: 6 }} />
                  <Tooltip />
               </LineChart>
             </ResponsiveContainer>
          </ReportCard>

          <ReportCard point={awadhReportPoints[2]}>
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                  { s: 'RELIABILITY', v: awadh.servqual.reliability },
                  { s: 'RESPONSE', v: awadh.servqual.responsiveness },
                  { s: 'ASSURANCE', v: awadh.servqual.assurance },
                  { s: 'TANGIBLES', v: awadh.servqual.tangibles },
                  { s: 'EMPATHY', v: awadh.servqual.empathy },
                ]}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="s" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }} />
                  <Radar name="SERVQUAL" dataKey="v" stroke="#ec4899" fill="#ec4899" fillOpacity={0.45} />
                  <Tooltip />
                </RadarChart>
             </ResponsiveContainer>
          </ReportCard>

          <ReportCard point={awadhReportPoints[3]}>
             <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={[ { n: 'AWADH', f: 4, d: 2, q: 2 }, { n: 'OTHERS', f: 18, d: 35, q: 25 } ]}>
                   <XAxis dataKey="n" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                   <Bar dataKey="f" stackId="a" fill="#ef4444" name="Financial" radius={[0, 0, 0, 0]} />
                   <Bar dataKey="d" stackId="a" fill="#f59e0b" name="Delay" />
                   <Bar dataKey="q" stackId="a" fill="#3b82f6" name="Quality" radius={[10, 10, 0, 0]} />
                   <Tooltip />
                </ComposedChart>
             </ResponsiveContainer>
          </ReportCard>

          <ReportCard point={awadhReportPoints[4]}>
             <div className="flex flex-col h-full justify-center gap-6 px-4">
                <MetricBar label="CONSTRUCTION DURABILITY" value={95} color="#10b981" />
                <MetricBar label="STAFF PROFESSIONALISM" value={88} color="#10b981" />
                <MetricBar label="STRATEGIC APPRECIATION" value={92} color="#10b981" />
             </div>
          </ReportCard>

          <ReportCard point={awadhReportPoints[5]}>
             <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                   <XAxis dataKey="t" type="number" hide domain={[0, 100]} />
                   <YAxis dataKey="s" type="number" hide domain={[0, 100]} />
                   <ZAxis type="number" range={[400, 1000]} />
                   <Scatter name="Awadh Position" data={[{ t: 88, s: 92 }]} fill="#8b5cf6" shape="star" />
                   <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                </ScatterChart>
             </ResponsiveContainer>
          </ReportCard>
      </section>

      <div className="text-center bg-[#0a1235] border border-[#1e293b] p-12 rounded-[4rem] relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-30"></div>
         <h4 className="text-white font-black opacity-20 uppercase tracking-[0.8em] mb-6 text-sm md:text-base">Live Deep Analytics Framework Complete</h4>
         <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 font-mono text-xs text-slate-500">
            <p>ENGINE: SENTI-MAP-V4.2</p>
            <p>ID: AWADH-PRO-2026</p>
            <p className="flex items-center gap-2">
               <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
               REFRESHING IN 30S
            </p>
         </div>
      </div>

    </div>
  );
};

// UI COMPONENTS
const Tag = ({ text }: { text: string }) => (
  <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold rounded-xl hover:border-[#00d2ff]/40 hover:bg-white/10 transition-all cursor-pointer shadow-sm">
    {text}
  </span>
);

const Label = ({ icon, text }: { icon: any, text: string }) => (
  <div className="flex items-center gap-2.5">
    {icon}
    <span className="text-xs font-black text-slate-500 uppercase tracking-[0.15em]">{text}</span>
  </div>
);

const MetricBar = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
      <span>{label}</span>
      <span style={{ color }}>{value}%</span>
    </div>
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
      <div className="h-full rounded-full transition-all duration-1500 ease-out shadow-[0_0_15px_rgba(16,185,129,0.3)]" style={{ width: `${value}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

export default SentimentAnalysis;

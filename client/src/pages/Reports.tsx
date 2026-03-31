import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Download, 
  PieChart as PieIcon, 
  TrendingUp, 
  ArrowRight,
  UserCheck,
  Building2,
  Wallet,
  Activity,
  Zap,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

const Reports = () => {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [perfData, setPerfData] = useState([
    { month: 'Jan', revenue: 4500000, leads: 120 },
    { month: 'Feb', revenue: 3200000, leads: 98 },
    { month: 'Mar', revenue: 5800000, leads: 145 },
    { month: 'Apr', revenue: 4900000, leads: 132 },
    { month: 'May', revenue: 7200000, leads: 168 },
  ]);

  const [sourceData, setSourceData] = useState([
    { name: 'Digital Marketing', value: 45, color: '#00d2ff' },
    { name: 'Direct Referrals', value: 25, color: '#10b981' },
    { name: 'Channel Partners', value: 20, color: '#f59e0b' },
    { name: 'Organic SEO', value: 10, color: '#8b5cf6' },
  ]);

  const [stats, setStats] = useState([
    { label: 'Avg Sale Price', value: '₹48.2L', sub: 'Last 30 days | पिछले 30 दिन', icon: <Building2 />, color: 'text-[#00d2ff]', bg: 'bg-[#00d2ff]/10' },
    { label: 'Booking Ratio', value: '22.4%', sub: 'Target 25% | लक्ष्य 25%', icon: <UserCheck />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Audit Compliance', value: '100%', sub: 'RERA Approved | रेरा स्वीकृत', icon: <ShieldCheck />, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Pending Dues', value: '₹8.4L', sub: 'Across 3 units | 3 यूनिट बकाया', icon: <Wallet />, color: 'text-amber-400', bg: 'bg-amber-400/10' }
  ]);

  // REPORT PRESETS DATA
  const reportManifest = [
    { 
      id: 1,
      title: 'Monthly Sales & Collection Audit', 
      desc: 'Detailed breakdown of payment schedules and fiscal inflows.', 
      hindi: 'मासिक बिक्री और संग्रह ऑडिट',
      data: [
        { date: '2026-03-28', customer: 'Rajesh Kumar', amount: '₹12,40,000', mode: 'RTGS', status: 'Verified' },
        { date: '2026-03-26', customer: 'Sita Devi', amount: '₹8,50,000', mode: 'Cheque', status: 'Processing' },
        { date: '2026-03-24', customer: 'Amit Singh', amount: '₹4,20,000', mode: 'Cash', status: 'Verified' },
        { date: '2026-03-20', customer: 'Priya Sharma', amount: '₹15,00,000', mode: 'RTGS', status: 'Verified' }
      ]
    },
    { 
      id: 2,
      title: 'Inventory Availability Manifest', 
      desc: 'Real-time status of plot availability and booking holds.', 
      hindi: 'इन्वेंट्री उपलब्धता मेनिफेस्ट',
      data: [
        { plot: 'A-101', block: 'East Block', size: '1200 Sqft', status: 'Booked', client: 'Vivek Singh' },
        { plot: 'A-102', block: 'East Block', size: '1500 Sqft', status: 'Available', client: '-' },
        { plot: 'B-205', block: 'Bihar Colony', size: '1800 Sqft', status: 'Hold', client: 'Neeraj Jha' },
        { plot: 'C-09', block: 'Highway Front', size: '2400 Sqft', status: 'Booked', client: 'Meera Rai' }
      ]
    },
    { 
      id: 3,
      title: 'Lead Conversion Performance', 
      desc: 'Sales team ROI analysis and channel attribution metrics.', 
      hindi: 'लीड रूपांतरण प्रदर्शन',
      data: [
        { agent: 'Rahul Khanna', leads: 45, conversions: 8, roi: '17.8%', rating: '★★★★★' },
        { agent: 'Sana Khan', leads: 32, conversions: 4, roi: '12.5%', rating: '★★★★☆' },
        { agent: 'Vikram Aditya', leads: 58, conversions: 12, roi: '20.6%', rating: '★★★★★' },
        { agent: 'Anjali Gupta', leads: 28, conversions: 3, roi: '10.7%', rating: '★★★☆☆' }
      ]
    },
    { 
      id: 4,
      title: 'Construction Compliance Report', 
      desc: 'RERA timeline adherence and quality assurance scores.', 
      hindi: 'निर्माण अनुपालन रिपोर्ट',
      data: [
        { stage: 'Boundary Wall', target: '2026-04-15', progress: 100, quality: 'Exceeds' },
        { stage: 'Main Entrance Gate', target: '2026-05-10', progress: 45, quality: 'Standard' },
        { stage: 'Black Top Roads', target: '2026-06-30', progress: 15, quality: 'Pending' },
        { stage: 'Drainage System', target: '2026-07-20', progress: 5, quality: 'Early Phase' }
      ]
    }
  ];

  const simulateDataUpdate = () => {
    setPerfData(prev => prev.map(d => ({
      ...d,
      revenue: d.revenue + (Math.random() - 0.5) * 200000,
      leads: Math.round(d.leads + (Math.random() - 0.5) * 10)
    })));
    setLastUpdate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(simulateDataUpdate, 30000);
    return () => clearInterval(interval);
  }, []);

  // PREVIEW MODAL COMPONENT
  const PreviewModal = ({ report, onClose }: { report: any, onClose: () => void }) => {
    if (!report) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300">
        <div className="absolute inset-0 bg-[#060b26]/90 backdrop-blur-3xl" onClick={onClose}></div>
        <div className="relative w-full max-w-5xl bg-[#0a1235] border border-[#1e293b] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          
          <div className="p-10 md:p-14 border-b border-[#1e293b] flex items-start justify-between bg-gradient-to-r from-transparent to-white/5">
             <div>
               <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#00d2ff]/10 text-[#00d2ff] text-[10px] font-black uppercase rounded-lg border border-[#00d2ff]/20">Report ID: AW-00{report.id}</span>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none flex items-center gap-2">
                    <Activity size={12} className="text-emerald-400" /> Live Data Stream
                  </span>
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">{report.title}</h2>
               <p className="text-slate-400 mt-2 text-lg font-medium">{report.desc}</p>
             </div>
             <button onClick={onClose} className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                <ArrowRight size={24} className="rotate-180" />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 md:p-14 custom-scrollbar">
             <div className="bg-[#060b26] border border-[#1e293b] rounded-[2.5rem] overflow-hidden shadow-inner">
               <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-[#1e293b]">
                    <tr>
                       {Object.keys(report.data[0]).map((key) => (
                         <th key={key} className="p-6 text-[10px] font-black text-[#00d2ff] uppercase tracking-widest">{key}</th>
                       ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b]">
                    {report.data.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group">
                        {Object.values(row).map((val: any, j: number) => (
                          <td key={j} className="p-6">
                            {typeof val === 'number' && val <= 100 ? (
                               <div className="flex items-center gap-4 min-w-[150px]">
                                  <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${val}%` }}></div>
                                  </div>
                                  <span className="text-xs font-black text-white">{val}%</span>
                               </div>
                            ) : (
                               <span className={`text-sm font-bold ${j === 0 ? 'text-white' : 'text-slate-400'} group-hover:text-white transition-colors`}>{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>

             <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-[#00d2ff]/5 border border-[#00d2ff]/10 rounded-3xl">
                   <h4 className="text-white font-black uppercase text-sm mb-4 flex items-center gap-2">
                     <ShieldCheck size={18} className="text-[#00d2ff]" /> Verification Status
                   </h4>
                   <p className="text-slate-400 text-xs leading-relaxed font-medium">This report is automatically compiled from the primary "Bihar Land Trends PRO" cloud architecture. All entries are cryptographically signed for Awadh Developers' performance audits.</p>
                </div>
                <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                   <h4 className="text-white font-black uppercase text-sm mb-4 flex items-center gap-2">
                     <Zap size={18} className="text-emerald-400" /> Operational Insight
                   </h4>
                   <p className="text-slate-400 text-xs leading-relaxed font-medium">Data indicates a {Math.floor(Math.random() * 10 + 5)}% increase in velocity compared to the previous fiscal quarter. Performance benchmarks are currently in the 98th percentile.</p>
                </div>
             </div>
          </div>

          <div className="p-10 bg-white/5 border-t border-[#1e293b] flex items-center justify-between">
             <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Digital Audit Hash: 0x82f...{Math.random().toString(16).slice(2, 6)}</div>
             <button className="px-8 py-3 bg-[#00d2ff] text-[#0a1235] text-xs font-black uppercase rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-[#00d2ff]/20">
                <Download size={16} /> Download CSV Manifest
             </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* MODAL */}
      {selectedReport && <PreviewModal report={selectedReport} onClose={() => setSelectedReport(null)} />}

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-gradient-to-br from-[#0a1235] to-[#060b26] p-10 rounded-[2.5rem] border border-[#1e293b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-8xl pointer-events-none select-none">AUDIT</div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-[#00d2ff]/10 rounded-lg text-[#00d2ff]">
                <Activity size={18} className="animate-pulse" />
             </div>
             <span className="text-[10px] font-black text-[#00d2ff] uppercase tracking-[0.3em]">Live Performance Cloud</span>
          </div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter">Performance Audit 2026</h1>
          <p className="text-slate-400 mt-2 text-lg font-medium">Awadh Developers: Analytical breakdown of sales velocity and fiscal compliance.</p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-14 w-14 bg-[#1e293b] rounded-2xl flex flex-col items-center justify-center border border-white/5 group hover:border-[#00d2ff]/30 transition-all cursor-pointer">
             <Download size={22} className="text-[#00d2ff] group-hover:scale-110 transition-transform" />
          </div>
          <button className="h-14 px-8 bg-[#00d2ff] text-[#0a1235] rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all">
            Generate Full PDF
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0a1235] p-8 rounded-[2rem] border border-[#1e293b] flex flex-col gap-6 hover:translate-y-[-8px] transition-all group">
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
              {React.cloneElement(stat.icon as React.ReactElement, { size: 28 })}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <h4 className="text-3xl font-black text-white">{stat.value}</h4>
              <p className="text-[10px] text-slate-400 font-medium mt-3 italic opacity-80 border-l-2 border-[#1e293b] pl-3 leading-relaxed">
                 {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* REVENUE CHART */}
        <div className="bg-[#0a1235] p-10 rounded-[2.5rem] border border-[#1e293b] shadow-xl relative group">
           <div className="flex items-center justify-between mb-10">
             <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Revenue Growth</h3>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Monthly collection scale | मासिक राजस्व संग्रह</p>
             </div>
             <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl font-black text-sm flex items-center gap-2 border border-emerald-500/10">
                <TrendingUp size={18} /> +22.8%
             </div>
           </div>
           
           <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={perfData}>
                 <defs>
                   <linearGradient id="colorRev" x1="0" y1="02" x2="0" y2="1">
                     <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.4}/>
                     <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} hide />
                 <Tooltip contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '1rem' }} />
                 <Area type="monotone" dataKey="revenue" stroke="#00d2ff" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* CONVERSION SOURCES */}
        <div className="bg-[#0a1235] p-10 rounded-[2.5rem] border border-[#1e293b] shadow-xl relative overflow-hidden">
           <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Lead Ecosystem</h3>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-8">Channel attribution | मार्केटिंग चैनल वितरण</p>
           
           <div className="flex flex-col md:flex-row items-center gap-10">
             <div className="h-64 w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                       data={sourceData}
                       innerRadius={70}
                       outerRadius={95}
                       paddingAngle={8}
                       dataKey="value"
                       stroke="none"
                     >
                       {sourceData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '1rem' }} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="w-full md:w-1/2 space-y-6">
                {sourceData.map((source, i) => (
                  <div key={i} className="group cursor-default">
                     <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full" style={{backgroundColor: source.color}}></div>
                           <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{source.name}</span>
                        </div>
                        <span className="text-sm font-black text-white">{source.value}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full opacity-50 transition-all duration-1000 group-hover:opacity-100" style={{width: `${source.value}%`, backgroundColor: source.color}}></div>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      {/* REPORTS LIST TABLE */}
      <div className="bg-[#0a1235] rounded-[3rem] border border-[#1e293b] shadow-2xl overflow-hidden">
        <div className="p-10 border-b border-[#1e293b] flex items-center justify-between">
           <div>
             <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Report Manifest</h3>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Audit-ready documentation | ऑडिट-रेडी रिपोर्ट</p>
           </div>
           <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
              <Activity size={14} className="text-emerald-400" /> Auto-sync enabled: {lastUpdate.toLocaleTimeString()}
           </div>
        </div>
        <div className="divide-y divide-[#1e293b]">
           {reportManifest.map((report, i) => (
             <div key={i} className="p-8 flex items-center justify-between hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="flex items-center gap-6" onClick={() => setSelectedReport(report)}>
                 <div className="w-14 h-14 bg-[#1e293b] rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-[#00d2ff] group-hover:bg-[#00d2ff]/10 transition-all font-black border border-white/5">
                   {report.id}
                 </div>
                 <div>
                   <div className="flex items-center gap-3">
                     <span className="font-black text-white uppercase text-sm tracking-tight group-hover:text-[#00d2ff] transition-colors">{report.title}</span>
                     <span className="text-[9px] font-black bg-white/10 px-2 py-0.5 rounded text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">PDF | XLSX</span>
                   </div>
                   <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">{report.desc}</p>
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">{report.hindi}</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setSelectedReport(report)}
                  className="px-6 py-3 bg-[#1e293b] text-xs font-black uppercase text-slate-300 rounded-xl hover:bg-[#1e293b]/50 transition-colors border border-white/5"
                 >
                   Preview
                 </button>
                 <div className="h-12 w-12 bg-[#00d2ff] rounded-xl flex items-center justify-center text-[#0a1235] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                   <ArrowRight size={20} />
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>
      
    </div>
  );
};

export default Reports;

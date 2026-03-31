import React, { useState, useEffect } from 'react';
import { Bot, MapPin, Zap, TrendingUp, Users, Compass, ExternalLink, CalendarDays, AlertCircle, X, ShieldCheck, Activity } from 'lucide-react';
import api from '../services/api';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const CITY_COORDS: Record<string, {x: number, y: number}> = {
  'Patna': { x: 85.1376, y: 25.5941 },
  'Muzaffarpur': { x: 85.3647, y: 26.1209 },
  'Gaya': { x: 85.0002, y: 24.7914 },
  'Bhagalpur': { x: 87.0119, y: 25.2425 },
  'Darbhanga': { x: 85.8918, y: 26.1542 },
};

interface EventData {
  Event_Name: string;
  Location: string;
  Link: string;
  Snippet?: string;
  Predicted_Attendance: number;
  AI_Confidence: number;
  Real_Estate_Impact: number;
  Category: string;
  Event_Date: string;
}

const ComingEvents: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upcomingAlerts, setUpcomingAlerts] = useState<EventData[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [scanStatus, setScanStatus] = useState('IDLE');

  useEffect(() => {
    const fetchEvents = async () => {
      setScanStatus('SCANNING');
      try {
        const res = await api.get('/events');
        if (res.data.success) {
          const allEvents = res.data.data;
          
          // 🧐 Inject Curiosity-Driven Dummy Event
          const curiosityEvent: EventData = {
            Event_Name: "⚠️ PLOT SURGE: Sector-7 Expansion Project",
            Location: "Bihta Core",
            Link: "#",
            Snippet: "CONFIDENTIAL: Internal data suggests a 45% valuation spike in Sector-7. Govt infrastructure clearance imminent. Strategic acquisition recommended.",
            Predicted_Attendance: 1250,
            AI_Confidence: 98,
            Real_Estate_Impact: 10,
            Category: "High Value",
            Event_Date: new Date().toISOString().split('T')[0] // Today
          };
          
          const finalEvents = [curiosityEvent, ...allEvents];
          setEvents(finalEvents);
          setMetrics(res.data.globalMetrics);
          
          // Logic for notifications (Within 5 days)
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Normalize to midnight
          
          const maxDate = new Date(today);
          maxDate.setDate(today.getDate() + 5);
          
          const alerts = finalEvents.filter((ev: EventData) => {
            const evDate = new Date(ev.Event_Date);
            evDate.setHours(0, 0, 0, 0); // Normalize to midnight
            return evDate >= today && evDate <= maxDate;
          });
          
          setUpcomingAlerts(alerts);
          if (alerts.length > 0) {
            setTimeout(() => setShowNotification(true), 1500);
          }
        } else {
          setError(res.data.message || 'Failed to fetch events');
        }
      } catch (err: any) {
        setError('Error connecting to backend API');
        console.error(err);
      } finally {
        setLoading(false);
        setScanStatus('ACTIVE');
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-indigo-500 absolute top-0 left-0"></div>
          <div className="animate-ping rounded-full h-24 w-24 border border-fuchsia-500/50"></div>
          <Bot className="w-8 h-8 text-fuchsia-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 font-bold mt-6 uppercase tracking-widest">
          AI Engine Analyzing...
        </p>
        <p className="text-slate-500 text-sm mt-2">Predicting upcoming market events and demographic shifts</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-6 rounded-2xl flex flex-col items-center max-w-lg mx-auto mt-20">
        <Zap className="w-12 h-12 mb-4 animate-pulse opacity-70" />
        <h2 className="text-xl font-bold mb-2">Neural Prediction Offline</h2>
        <p className="text-center">{error}</p>
      </div>
    );
  }

  const COLORS = ['#8b5cf6', '#d946ef', '#3b82f6', '#06b6d4', '#10b981'];

  const filteredEvents = events.filter((event: EventData) => {
    const text = `${event.Event_Name} ${event.Snippet || ''} ${event.Category || ''}`.toLowerCase();
    // Include high-value curiosity events
    if (event.Category === "High Value") return true;
    return text.includes('expo') || text.includes('conference');
  });

  // Calculate Spatial Markers
  const mapData = Object.entries(
    filteredEvents.reduce((acc: Record<string, number>, ev: EventData) => {
      acc[ev.Location] = (acc[ev.Location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([city, count]: [string, number]) => ({
    city,
    count,
    x: CITY_COORDS[city]?.x || 85.3131,
    y: CITY_COORDS[city]?.y || 25.0961 
  }));

  return (
    <div className="space-y-6 relative pb-20">
      {/* 🔔 Notification Popup */}
    {showNotification && upcomingAlerts.length > 0 && (
  <div className="fixed top-24 right-6 z-[100] animate-in fade-in slide-in-from-right-full duration-1000 ease-out max-w-md">
    
    <div className="bg-[#0a1235]/95 backdrop-blur-2xl border-2 border-red-500/40 rounded-3xl p-6 shadow-[0_0_40px_rgba(255,0,0,0.25)] relative overflow-hidden group">
      
      {/* Left Gradient Line */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 via-white to-red-500 animate-pulse"></div>

      {/* Close Button */}
      <button 
        onClick={() => setShowNotification(false)}
        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1"
      >
        <X size={20} />
      </button>

      {/* Alert Header */}
      <div className="flex items-center gap-4 mb-4">
        
        {/* Icon Box */}
        <div className="relative p-3 rounded-2xl border border-red-500/40 bg-white overflow-hidden">
          
          {/* Animated Gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,0,0,0.15),rgba(255,255,255,0.6),rgba(255,0,0,0.15))] bg-[length:200%_200%] animate-[gradientMove_3s_linear_infinite]"></div>

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-lg animate-pulse"></div>

          {/* Icon */}
          <Zap className="relative z-10 w-6 h-6 text-red-500 animate-bounce" />
        </div>

        {/* Text */}
        <div>
          <h4 className="text-white font-semibold text-lg tracking-tight">
            System Priority Alert
          </h4>

          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <p className="text-red-300 text-xs font-semibold uppercase tracking-wider">
              Intercepting Alpha-Feed
            </p>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4 mb-6">
        {upcomingAlerts.slice(0, 2).map((ev: EventData, i: number) => (
          <div
            key={i}
            className={`bg-white/5 border ${
              ev.Category === "High Value"
                ? "border-red-500/50"
                : "border-white/10"
            } p-4 rounded-xl`}
          >
            <div className="flex justify-between items-start mb-2">
              <p
                className={`text-sm font-bold ${
                  ev.Category === "High Value"
                    ? "text-red-400"
                    : "text-white"
                } line-clamp-1`}
              >
                {ev.Event_Name}
              </p>

              <span className="text-[10px] bg-red-500/20 px-2 py-0.5 rounded text-red-400 font-bold uppercase shrink-0 ml-2">
                {ev.Location}
              </span>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2 italic">
              "{ev.Snippet}"
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-red-300 font-mono tracking-tighter">
                {ev.Event_Date}
              </span>

              {ev.Category === "High Value" && (
                <span className="text-[9px] text-emerald-400 animate-pulse font-bold tracking-widest uppercase">
                  Secret Lead Alert
                </span>
              )}
            </div>
          </div>
        ))}

        {upcomingAlerts.length > 2 && (
          <p className="text-center text-[10px] text-slate-500 font-bold uppercase">
            Discover {upcomingAlerts.length - 2} more hidden signals
          </p>
        )}
      </div>

      {/* Action Button */}
      <button 
        onClick={() => setShowNotification(false)}
        className="w-full bg-gradient-to-r from-red-600 to-white/80 hover:from-red-500 hover:to-white text-black font-bold py-3 rounded-2xl transition-all shadow-lg shadow-red-500/20 text-sm uppercase tracking-widest"
      >
        Intercept Detections
      </button>
    </div>
  </div>
)}

      {/* 🚀 Real-time Ticker */}
      <div className="bg-[#050b24] border-y border-indigo-500/20 py-2 overflow-hidden flex items-center relative z-20">
        <div className="flex items-center gap-2 px-4 border-r border-indigo-500/30 bg-[#050b24] z-10 shrink-0">
          <Activity className="text-emerald-400 w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">Live Neural Feed</span>
        </div>
        <div className="ticker-scroll flex items-center gap-8 whitespace-nowrap animate-ticker">
          {events.slice(0, 10).map((ev: EventData, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
              <span className="text-[10px] text-slate-400 font-medium">New Detection in <span className="text-white font-bold">{ev.Location}</span>: {ev.Event_Name}</span>
              <span className="text-[9px] text-fuchsia-500 font-mono">[{ev.AI_Confidence}% CONF]</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-scroll {
            animation: ticker 30s linear infinite;
          }
        `}</style>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative mb-8">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-fuchsia-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <div className="z-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              AI Event Prognosis
              <div className="bg-[#0a1235] p-1.5 rounded-lg border border-indigo-500/30">
                <ShieldCheck className="text-emerald-400 w-5 h-5" />
              </div>
            </h1>
            <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-transparent border-l-2 border-indigo-500 px-3 py-1">
              <span className={`w-2 h-2 rounded-full ${scanStatus === 'SCANNING' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]'}`}></span>
              <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">
                {scanStatus === 'SCANNING' ? 'Engine Scanning...' : 'Real-time Monitoring Active'}
              </span>
            </div>
          </div>
          <p className="text-slate-400 font-medium max-w-xl">Deep learning models predicting future market attractors, expos, and demographic surges across key regions.</p>
        </div>
      </div>

      {/* Global AI Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0a1235]/80 backdrop-blur-xl border border-indigo-500/20 p-6 rounded-3xl relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-lg shadow-indigo-500/10">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users size={120} className="text-indigo-400" />
            </div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 z-10 relative">Total Predicted Influx</p>
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 z-10 relative">
              {(metrics.TotalPredictedAttendance / 1000).toFixed(1)}k
            </h3>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-400 bg-emerald-400/10 w-max px-2 py-1 rounded-md z-10 relative">
              <TrendingUp size={14} className="mr-1" /> +12% Expected Growth
            </div>
          </div>

          <div className="bg-[#0a1235]/80 backdrop-blur-xl border border-fuchsia-500/20 p-6 rounded-3xl relative overflow-hidden group hover:border-fuchsia-500/50 transition-all shadow-lg shadow-fuchsia-500/10">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap size={120} className="text-fuchsia-400" />
            </div>
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 z-10 relative">Avg Market Impact</p>
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 z-10 relative">
              {metrics.AverageMarketImpact} <span className="text-xl text-slate-500">/ 10</span>
            </h3>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-5 overflow-hidden z-10 relative">
              <div 
                className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 h-1.5 rounded-full" 
                style={{ width: `${(metrics.AverageMarketImpact / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[#0a1235]/80 backdrop-blur-xl border border-cyan-500/20 p-6 rounded-3xl flex flex-col justify-between group hover:border-cyan-500/50 transition-all shadow-lg shadow-cyan-500/10 overflow-hidden relative">
            <div className="z-10 relative">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Forecast Signal</p>
              <div className="h-[80px] w-full mt-2 absolute bottom-0 left-0 right-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics.AITrends}>
                    <defs>
                      <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="signal" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorSignal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: AI Predictions List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="text-fuchsia-400" /> Evaluated Event Vectors
            </h2>
            <div className="text-xs text-slate-400 font-mono tracking-widest">{filteredEvents.length} SIGNALS FOUND</div>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="bg-[#0a1235]/50 border border-[#1e293b] p-8 rounded-3xl text-center">
              <Bot className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No events found matching neural criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((event, index) => (
                <div key={index} className="bg-gradient-to-br from-[#0a1235] to-[#0f172a] border border-[#1e293b] hover:border-indigo-500/50 p-5 rounded-3xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] relative overflow-hidden group">
                  
                  {/* Glowing corner effect on hover */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                  {/* Confidence Badge */}
                  <div className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase px-2 py-1 rounded-md flex items-center z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5 animate-pulse"></span>
                    {event.AI_Confidence || 'N/A'}% Confidence
                  </div>

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 p-2.5 rounded-xl border border-fuchsia-500/30 group-hover:border-fuchsia-400/60 transition-colors">
                      <CalendarDays className="text-fuchsia-400 w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-fuchsia-300 font-bold uppercase tracking-wider">{event.Category || 'Event'}</span>
                      <div className="flex items-center text-slate-300 text-sm mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                        {event.Location}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 pr-12 group-hover:text-fuchsia-400 transition-colors relative z-10 min-h-[56px]">
                    {event.Event_Name}
                  </h3>
                  
                  {event.Snippet && (
                    <p className="text-slate-400 text-xs line-clamp-2 mb-4 h-[32px] relative z-10">
                      {event.Snippet}
                    </p>
                  )}

                  <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between relative z-10">
                    <div className="flex flex-col gap-2">
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5 tracking-wider">Est. Attendance</p>
                        <p className="text-white font-black flex items-center text-sm">
                          <Users className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                          {event.Predicted_Attendance?.toLocaleString() || 'Computing...'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3 h-3 text-fuchsia-400" />
                        <span className="text-[10px] text-fuchsia-300 font-bold">{event.Event_Date}</span>
                      </div>
                    </div>
                    {event.Link && (
                      <a href={event.Link} target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-fuchsia-500/20 text-fuchsia-400 p-2.5 rounded-xl transition-all hover:scale-110">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: AI Analysis Charts & Map */}
        <div className="space-y-6">

          {/* Geographical Event Map / Radar */}
          <div className="bg-[#0a1235]/80 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6 shadow-lg relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <h3 className="text-white font-bold mb-6 flex items-center border-b border-[#1e293b] pb-4 relative z-10">
              <Compass className="text-fuchsia-400 w-5 h-5 mr-2" />
              Geo-Spatial Event Radar
            </h3>
            
            {/* Radar Sweep Effect */}
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 border border-indigo-500/20 rounded-full opacity-50 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 border border-indigo-500/30 rounded-full opacity-50 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 border border-fuchsia-500/40 rounded-full opacity-50 pointer-events-none"></div>

            <div className="h-[250px] w-full relative z-10">
              {mapData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" domain={[83.5, 88.5]} hide />
                    <YAxis type="number" dataKey="y" domain={[24.0, 27.0]} hide />
                    <ZAxis type="number" dataKey="count" range={[100, 600]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-[#0a1235]/95 border border-indigo-500/30 p-3 rounded-xl shadow-xl shadow-indigo-500/20 backdrop-blur-md">
                              <p className="text-white font-bold mb-1 text-sm">{data.city}</p>
                              <p className="text-fuchsia-400 font-black text-xs">{data.count} Signals Detected</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Cities" data={mapData} fill="#8b5cf6">
                      {mapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-4 h-4 rounded-full bg-fuchsia-500/20 animate-ping"></div>
                  <span className="text-slate-500 text-sm ml-3 font-mono tracking-widest">SCANNING...</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 right-4 text-[9px] text-slate-500 font-mono">LAT/LONG GRID ACTIVE</div>
          </div>

          <div className="bg-[#0a1235]/80 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6 shadow-lg">
            <h3 className="text-white font-bold mb-6 flex items-center border-b border-[#1e293b] pb-4">
              <MapPin className="text-indigo-400 w-5 h-5 mr-2" />
              Predicted Hubs by Volume
            </h3>
            <div className="h-[250px] w-full">
              {metrics?.CityDistribution?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.CityDistribution} layout="vertical" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} width={85} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.02)'}}
                      contentStyle={{ backgroundColor: 'rgba(10, 18, 53, 0.95)', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                    />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={20}>
                      {metrics.CityDistribution.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-sm">No topological data.</div>
              )}
            </div>
          </div>

          {/* AI Intelligence Briefing */}
          <div className="bg-gradient-to-b from-[#0a1235] to-[#040817] border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-indigo-500/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <h3 className="text-indigo-400 font-bold mb-4 flex items-center text-xs uppercase tracking-widest border-b border-indigo-500/20 pb-4">
              <Bot className="w-4 h-4 mr-2" /> Strategic AI Directives
            </h3>
            <div className="space-y-5 mt-4">
              <div className="flex gap-4 items-start relative before:absolute before:left-[3px] before:top-4 before:bottom-[-20px] before:w-[1px] before:bg-slate-800 last:before:hidden">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] mt-1.5 shrink-0 z-10"></div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Deep neural scanning indicates high probability of <span className="text-white font-bold">real estate traction</span> in events intersecting tech and development sectors.
                </p>
              </div>
              <div className="flex gap-4 items-start relative before:absolute before:left-[3px] before:top-4 before:bottom-[-20px] before:w-[1px] before:bg-slate-800 last:before:hidden">
                <div className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.8)] mt-1.5 shrink-0 z-10"></div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Focus outreach efforts on <span className="text-white font-bold text-fuchsia-300">Expos</span> exhibiting <span className="text-white font-bold">&gt;90% confidence index</span> for optimal lead generation ROI.
                </p>
              </div>
              <div className="flex gap-4 items-start relative">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] mt-1.5 shrink-0 z-10"></div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Patna events currently display the highest baseline <span className="text-white font-bold">attendance trajectory</span> (+12% MoM growth signal).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingEvents;

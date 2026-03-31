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
  Heart, AlertCircle, ArrowUpRight, CheckCircle2, Building2, ShieldCheck, Wallet
} from 'lucide-react';

const theoretical_report = `
================ रियल एस्टेट सेल्स परफॉरमेंस का सैद्धांतिक आधार (THEORETICAL BASIS) ================

1️⃣ भरोसे पर आधारित खरीद ढांचा (TRUST-BASED PURCHASE FRAMEWORK)
• रियल एस्टेट एक बड़ा निवेश है जहां खरीदार अपनी जीवन भर की बचत लगाता है।
• निर्णय लेने की प्रक्रिया बहुत संवेदनशील होती है। खरीदार एग्रीमेंट की शर्तों, समय पर पज़ेशन और निर्माण की गति को बहुत ध्यान से देखते हैं।
• अगर पारदर्शिता और सही जानकारी दी जाए, तो ग्राहक का भरोसा बढ़ता है और बिक्री आसान होती है।

2️⃣ वित्तीय जोखिम और खरीदार का व्यवहार (FINANCIAL RISK & BUYER BEHAVIOURAL RESPONSE)
• मध्यम वर्ग के खरीदार लोन पर निर्भर होते हैं। प्रोजेक्ट में देरी होने से उन पर EMI और किराये का दोहरा बोझ पड़ता है।
• छिपे हुए खर्च या अचानक मांग (demand notices) खरीदार के विश्वास को पूरी तरह तोड़ देते हैं।
• छोटी सी अनिश्चितता भी खरीदार को बुकिंग कैंसिल करने या दूसरे प्रोजेक्ट पर जाने के लिए मजबूर कर सकती है।

3️⃣ सेवा की गुणवत्ता और कार्य का प्रभाव (SERVICE QUALITY & EXECUTION IMPACT)
• विश्वसनीयता (Reliability): समय पर प्रोजेक्ट पूरा करना।
• जवाबदेही (Responsiveness): ग्राहकों की समस्याओं का तुरंत समाधान।
• आश्वासन (Assurance): कानूनी स्पष्टता और सही काग़ज़ी कार्रवाई।
• भौतिक गुणवत्ता (Tangibles): निर्माण की फिनिशिंग और मजबूती।
• सहानुभूति (Empathy): बिक्री के बाद की सर्विस और ग्राहक से जुड़ाव।

4️⃣ बिक्री घटने के परिचालन कारण (OPERATIONAL FACTORS CONTRIBUTING TO SALES DECLINE)
• समय पर काम न होना और निर्माण में खामियां ब्रांड की छवि खराब करती हैं।
• छिपे हुए खर्च पारदर्शिता को खत्म करते हैं, जिससे मार्केट में नकारात्मक संदेश जाता है।
• इंटरनेट पर मिलने वाले खराब रिव्यूज लीड कन्वर्जन रेट को धीरे-धीरे कम कर देते हैं।

5️⃣ बिक्री बढ़ाने के रणनीतिक उपाय (STRATEGIC DRIVERS OF SALES ACCELERATION)
• सही और प्रतिस्पर्धी कीमत बिक्री बढ़ाने का सबसे बड़ा कारण है।
• सेल्स टीम का पेशेवर व्यवहार और स्पष्ट बातचीत खरीदार को आश्वस्त करती है।
• निर्माण की उच्च गुणवत्ता और प्रोजेक्ट की लोकेशन भविष्य में कीमत बढ़ने की गारंटी देते हैं।
• पज़ेशन के बाद दी जाने वाली अच्छी सर्विस से पुराने ग्राहक नए ग्राहक लेकर आते हैं।

6️⃣ एकीकृत भरोसा-जोखिम बिक्री मॉडल (INTEGRATED TRUST–RISK SALES MODEL)
• बिक्री का प्रदर्शन इस बात पर निर्भर करता है कि आपने 'भरोसे' और 'पैसे के जोखिम' के बीच कैसा तालमेल बिठाया है।
• अगर भरोसा (Trust) ज़्यादा है और जोखिम (Risk) कम, तो बुकिंग और कमाई स्थिर रहेगी।

====================================================================================
`;

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
      hindi: "भरोसे पर आधारित खरीद ढांचा: रियल एस्टेट एक बड़ा निवेश है जहां खरीदार अपनी जीवन भर की बचत लगाता है। पारदर्शिता और सही जानकारी ग्राहक का भरोसा बढ़ाती है और बिक्री को सफल बनाती है।",
      english: "Capital-intensive commitment. Trust erodes with ambiguity and delays.",
      icon: <ShieldAlert size={20} />,
      color: "#00d2ff"
    },
    {
      id: "2",
      title: "FINANCIAL RISK & BUYER BEHAVIOURAL RESPONSE",
      hindi: "वित्तीय जोखिम और व्यवहार: प्रोजेक्ट में देरी होने से खरीदार पर EMI और किराये का दोहरा बोझ पड़ता है। छिपे हुए खर्च खरीदार के विश्वास को कम कर देते हैं, जिससे बुकिंग कैंसिल होने का खतरा बढ़ता है।",
      english: "Parallel EMI + rent pressure. Behavioral response to financial risks.",
      icon: <Zap size={20} />,
      color: "#fbbf24"
    },
    {
      id: "3",
      title: "SERVICE QUALITY (SERVQUAL DIMENSIONS)",
      hindi: "सेवा की गुणवत्ता: समय पर डिलीवरी, ग्राहकों की समस्याओं का तुरंत समाधान, कानूनी स्पष्टता और निर्माण की बेहतरीन गुणवत्ता ही नए खरीदारों और रेफरल की सबसे बड़ी चाबी है।",
      english: "Service perception directly impacts repeat referrals and new bookings.",
      icon: <Heart size={20} />,
      color: "#ec4899"
    },
    {
      id: "4",
      title: "OPERATIONAL FACTORS & SALES DECLINE",
      hindi: "बिक्री घटने के मुख्य कारण: काम में देरी, निर्माण में खामियां और पारदर्शिता की कमी ब्रांड की छवि खराब करते हैं। नकारात्मक ऑनलाइन रिव्यूज सेल्स की रफ्तार को काफी धीमा कर देते हैं।",
      english: "Timeline & quality lapses accelerate negative sentiment and decline.",
      icon: <AlertCircle size={20} />,
      color: "#ef4444"
    },
    {
      id: "5",
      title: "STRATEGIC DRIVERS OF SALES ACCELERATION",
      hindi: "बिक्री बढ़ाने के रणनीतिक उपाय: सही कीमत, पेशेवर सेल्स टीम, निर्माण की उच्च गुणवत्ता और प्रोजेक्ट की लोकेशन खरीदारों को आकर्षित करती है और निवेश पर भविष्य में अच्छा रिटर्न सुनिश्चित करती है।",
      english: "Superior construction and strategic location enhance appreciation.",
      icon: <TrendingUp size={20} />,
      color: "#10b981"
    },
    {
      id: "6",
      title: "INTEGRATED TRUST–RISK SALES MODEL",
      hindi: "भरोसा और जोखिम मॉडल: बेहतरीन सेल्स परफॉरमेंस 'भरोसे' के बढ़ने और 'पैसे के जोखिम' के कम होने के संतुलन पर टिकी है। इसके लिए सही डॉक्यूमेंटेशन और समय पर प्रोजेक्ट पूरा करना अनिवार्य है।",
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
          },
          behavioral: {
            phases: [
              { stage: 'Awareness', count: 450, color: '#3b82f6' },
              { stage: 'Interest', count: 280, color: '#8b5cf6' },
              { stage: 'Evaluation', count: 120, color: '#ec4899' },
              { stage: 'Decision', count: 45, color: '#10b981' }
            ],
            archetypes: [
              { subject: 'Investor', value: 85 },
              { subject: 'End-User', value: 65 },
              { subject: 'Speculator', value: 30 },
              { subject: 'Researcher', value: 92 },
              { subject: 'Local Buyer', value: 78 }
            ],
            purchaseTrends: [
              { week: 'W1', leads: 40, prob: 25, visits: 12 },
              { week: 'W2', leads: 55, prob: 42, visits: 18 },
              { week: 'W3', leads: 48, prob: 38, visits: 15 },
              { week: 'W4', leads: 70, prob: 65, visits: 28 },
              { week: 'W5', leads: 82, prob: 78, visits: 35 }
            ]
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

      {/* Behavior Analysis Section Enhanced */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 bg-[#0a1235] border border-[#1e293b] p-8 md:p-10 rounded-[3rem] flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00d2ff]/10 blur-[80px] rounded-full"></div>
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

         <div className="lg:col-span-1 bg-[#0a1235] border border-[#1e293b] p-8 md:p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-tighter">
               <Brain size={20} className="text-[#8b5cf6]" />
               Decision Journey Funnel
            </h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={awadh.behavioral.phases}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="stage" type="category" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} width={80} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '1rem' }}
                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                     />
                     <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={30}>
                        {awadh.behavioral.phases.map((entry: any, index: number) => (
                           <rect key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-6 text-center">Simulated high-intent lead distribution</p>
         </div>

         <div className="lg:col-span-1 bg-[#0a1235] border border-[#1e293b] p-8 md:p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-tighter">
               <Activity size={20} className="text-[#ec4899]" />
               Buyer Archetype Radar
            </h3>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={awadh.behavioral.archetypes}>
                     <PolarGrid stroke="#1e293b" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }} />
                     <Radar name="Archetype" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.4} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '1rem' }}
                        itemStyle={{ color: '#fff', fontSize: '12px' }}
                     />
                  </RadarChart>
               </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
               <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ec4899]"></div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Market Fit</span>
               </div>
            </div>
         </div>
      </section>

      {/* 6 Point Report Grid */}
      {/* Plot Purchase Behavior Proper Analysis */}
      <section className="bg-gradient-to-br from-[#0a1235] to-[#060b26] border border-[#1e293b] rounded-[3.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-5">
            <Building2 size={300} />
         </div>
         
         <div className="flex flex-col lg:flex-row gap-14 relative z-10">
            <div className="lg:w-1/2 space-y-10">
               <div>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="px-4 py-1.5 bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase rounded-xl border border-amber-500/20">Behavior Report V1.0</span>
                     <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">प्लॉट खरीद व्यवहार विश्लेषण (Plot Purchase Behavior Analysis)</h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">अवध डेवलपर्स के ग्राहकों का गहन व्यवहारिक अध्ययन और खरीद निर्णय के मुख्य कारक।</p>
               </div>

               <div className="space-y-6">
                  <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all">
                     <h4 className="text-[#00d2ff] font-black uppercase text-xs mb-2 tracking-widest flex items-center gap-2">
                        <CheckCircle2 size={16} /> निवेश का मुख्य उद्देश्य (Investment Focus)
                     </h4>
                     <p className="text-slate-300 text-sm leading-relaxed">75% खरीदार बिहटा क्षेत्र में तेजी से होते विकास के कारण 'भविष्य में घर बनाने' और 'पूंजी वृद्धि' (Appreciation) के उद्देश्य से प्लॉट खरीद रहे हैं।</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all">
                     <h4 className="text-emerald-400 font-black uppercase text-xs mb-2 tracking-widest flex items-center gap-2">
                        <ShieldCheck size={16} /> सुरक्षा और पारदर्शिता (Trust & Legality)
                     </h4>
                     <p className="text-slate-300 text-sm leading-relaxed">निर्णय लेने में सबसे बड़ा कारक 'LPC/पक्की रजिस्ट्री' और 'रेरा (RERA) अनुपालन' है। ग्राहक कानूनी सुरक्षा को 100% प्राथमिकता दे रहे हैं।</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all">
                     <h4 className="text-amber-400 font-black uppercase text-xs mb-2 tracking-widest flex items-center gap-2">
                        <Wallet size={16} /> वित्तीय व्यवहार (Financial Pattern)
                     </h4>
                     <p className="text-slate-300 text-sm leading-relaxed">औसत खरीदार 35% अपनी जमा पूंजी (Savings) और 65% बैंक लोन के माध्यम से भुगतान की योजना बनाते हैं। EMI दबाव खरीद की गति को प्रभावित करता है।</p>
                  </div>
               </div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-between">
               <div className="bg-[#060b26] border border-white/5 rounded-[2.5rem] p-8 h-full">
                  <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3 uppercase tracking-tighter pl-2">
                     <TrendingUp size={20} className="text-[#00d2ff]" /> 
                     Purchase Intensity vs Probability (W1-W5)
                  </h3>
                  <div className="h-[350px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={awadh.behavioral.purchaseTrends}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.5} />
                           <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                           <YAxis hide />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '1rem' }}
                              itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                           />
                           <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                           <Bar dataKey="leads" name="Daily Leads" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
                           <Area type="monotone" dataKey="prob" name="Purchase Probability %" fill="#00d2ff" stroke="#00d2ff" fillOpacity={0.2} strokeWidth={3} />
                           <Line type="monotone" dataKey="visits" name="Site Visits" stroke="#fbbf24" strokeWidth={4} dot={{ fill: '#fbbf24', r: 5 }} />
                        </ComposedChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Conversion Velocity</p>
                        <p className="text-xl font-black text-emerald-400">+18.5% <span className="text-[10px] text-slate-500 font-bold">MoM</span></p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Buyer Sentiment</p>
                        <p className="text-xl font-black text-[#00d2ff]">88.2 <span className="text-[10px] text-slate-500 font-bold">Stable</span></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

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

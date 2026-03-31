import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Map as MapIcon, 
  CheckCircle, 
  IndianRupee, 
  Zap,
  LineChart as LineChartIcon,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingDown,
  LayoutGrid,
  Share2,
  Globe
} from 'lucide-react';
import api from '../services/api';
import IndiaMap from '../components/IndiaMap';
import { 
  BasicLineChart, 
  BasicBarChart, 
  BasicAreaChart, 
  BasicPieChart, 
  BasicDoughnutChart 
} from '../components/charts/BasicCharts';
import { 
  StackedBarChart, 
  DualAxisChart 
} from '../components/charts/ComparisonCharts';
import { 
  CandlestickChart, 
  OHLCChart 
} from '../components/charts/FinancialCharts';
import { 
  Histogram, 
  BoxPlot 
} from '../components/charts/DistributionCharts';
import { 
  ScatterPlot 
} from '../components/charts/RelationshipCharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalPlots: 0,
    soldPlots: 0,
    revenue: 0
  });

  // --- Real-time Data States ---
  const [peakGoogleData, setPeakGoogleData] = useState([
    { name: '6 AM', value: 25 }, { name: '9 AM', value: 45 }, { name: '12 PM', value: 35 },
    { name: '3 PM', value: 50 }, { name: '6 PM', value: 85 }, { name: '9 PM', value: 95 }, { name: '12 AM', value: 40 },
  ]);

  const [peakYoutubeData, setPeakYoutubeData] = useState([
    { name: '6 AM', value: 15 }, { name: '9 AM', value: 30 }, { name: '12 PM', value: 40 },
    { name: '3 PM', value: 65 }, { name: '6 PM', value: 92 }, { name: '9 PM', value: 100 }, { name: '12 AM', value: 55 },
  ]);

  const [ageGroupData, setAgeGroupData] = useState([
    { name: '18-24', value: 25 }, { name: '25-34', value: 45 }, { name: '35-44', value: 20 },
    { name: '45-54', value: 7 }, { name: '55+', value: 3 },
  ]);

  const [locationSearchData, setLocationData] = useState([
    { name: 'Patna', value: 95 }, { name: 'Bihta', value: 82 }, { name: 'Muzaffarpur', value: 68 },
    { name: 'Gaya', value: 58 }, { name: 'Bagaha', value: 45 }, { name: 'Darbhanga', value: 42 },
  ]);

  const [platformComparisonData, setPlatformData] = useState([
    { name: 'Jan', google: 4000, youtube: 2400 }, { name: 'Feb', google: 3000, youtube: 1398 },
    { name: 'Mar', google: 2000, youtube: 9800 }, { name: 'Apr', google: 2780, youtube: 3908 }, { name: 'May', google: 1890, youtube: 4800 },
  ]);

  const [sizePreferenceData, setSizeData] = useState([
    { name: '1 Kattha', value: 45 }, { name: '2 Kattha', value: 30 },
    { name: '3 Kattha', value: 15 }, { name: '5+ Kattha', value: 10 },
  ]);

  const [regionalPriceData, setRegionalPriceData] = useState([
    { name: 'Patna', price: 2500, appreciation: 500 }, { name: 'Bihta', price: 1800, appreciation: 400 },
    { name: 'Gaya', price: 1200, appreciation: 200 }, { name: 'Muzaffarpur', price: 1500, appreciation: 300 },
  ]);

  const [registryCostData, setCostData] = useState([
    { name: 'Stamp Duty', value: 60 }, { name: 'Registration Fee', value: 20 }, { name: 'Legal/Misc', value: 20 },
  ]);

  const [dailySearchData, setDailyData] = useState([
    { name: 'Mon', value: 65 }, { name: 'Tue', value: 58 }, { name: 'Wed', value: 62 },
    { name: 'Thu', value: 75 }, { name: 'Fri', value: 88 }, { name: 'Sat', value: 95 }, { name: 'Sun', value: 100 },
  ]);

  const [boxPlotData, setBoxPlotData] = useState([
    { x: 'Patna', y: [40, 50, 60, 70, 80] }, { x: 'Bihta', y: [30, 45, 55, 65, 75] }, { x: 'Gaya', y: [50, 60, 70, 80, 90] },
  ]);

  const [distributionData, setDistributionData] = useState([
    { range: '0-1M', count: 40 }, { range: '1-5M', count: 120 }, { range: '5-10M', count: 80 }, { range: '10M+', count: 20 },
  ]);

  const [relationshipData, setRelData] = useState([
    { x: 10, y: 30, z: 200 }, { x: 20, y: 50, z: 400 }, { x: 30, y: 40, z: 300 }, { x: 40, y: 80, z: 500 },
  ]);

  const [comparisonData, setCompData] = useState([
    { name: 'North', leads: 400, sales: 240, revenue: 2400 },
    { name: 'South', leads: 300, sales: 139, revenue: 2210 },
  ]);

  const financialData = [
    { x: new Date().getTime(), y: [51.4, 61.8, 54.0, 59.0] },
    { x: new Date().getTime() + 86400000, y: [59.0, 65.5, 58.0, 62.1] },
  ];

  const mapData = [
    { id: "BR", value: 100 },
  ];

  const markers = [
    { markerOffset: -15, name: "Patna", coordinates: [85.1376, 25.5941] as [number, number] },
    { markerOffset: -15, name: "Bihta", coordinates: [84.8727, 25.5568] as [number, number] },
  ];

  // --- Helper to randomize data ---
  const randomize = (currentData: any[], key: string = 'value', min: number = 10, max: number = 100) => {
    return currentData.map(item => ({
      ...item,
      [key]: Math.floor(Math.random() * (max - min + 1) + min)
    }));
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leads, plots, payments] = await Promise.all([
          api.get('/leads'), api.get('/plots'), api.get('/payments')
        ]);
        setStats({
          totalLeads: leads.data.length,
          totalPlots: plots.data.length,
          soldPlots: plots.data.filter((p: any) => p.status === 'sold').length,
          revenue: payments.data.reduce((acc: number, p: any) => acc + Number(p.amount), 0)
        });
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    };
    fetchStats();

    const intervalId = setInterval(() => {
      setPeakGoogleData(prev => randomize(prev, 'value', 20, 95));
      setPeakYoutubeData(prev => randomize(prev, 'value', 15, 100));
      setAgeGroupData(prev => randomize(prev, 'value', 5, 50));
      setLocationData(prev => randomize(prev, 'value', 30, 98));
      setDailyData(prev => randomize(prev, 'value', 40, 100));
      setPlatformData(prev => prev.map(i => ({
        ...i,
        google: Math.floor(Math.random() * 5000 + 1000),
        youtube: Math.floor(Math.random() * 5000 + 1000)
      })));
      setRegionalPriceData(prev => prev.map(i => ({
        ...i,
        price: Math.floor(Math.random() * 1000 + 1500),
        appreciation: Math.floor(Math.random() * 300 + 100)
      })));
      setDistributionData(prev => randomize(prev, 'count', 10, 150));
      setCompData(prev => prev.map(i => ({
        ...i,
        leads: Math.floor(Math.random() * 500 + 100),
        sales: Math.floor(Math.random() * 200 + 50)
      })));
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-[#1e293b] pb-2">
        <div className="p-2 bg-[#1e293b] rounded-lg text-[#00d2ff]">{icon}</div>
        <h2 className="text-xl font-black text-white tracking-widest uppercase">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );

  const ChartCard = ({ title, description, children }: { title: string, description?: string, children: React.ReactNode }) => (
    <div className="bg-[#0a1235] p-5 rounded-2xl border border-[#1e293b] shadow-2xl relative group overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{title}</h3>
        {description && <p className="text-[10px] text-slate-500 mt-1 italic leading-relaxed">{description}</p>}
      </div>
      <div className="h-[250px] w-full mt-auto">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      
      {/* Main Map & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-[#0a1235] rounded-3xl border border-[#1e293b] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-widest uppercase">Bihar Plot Presence</h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-[#1e293b] rounded-full text-[10px] text-slate-400 font-bold uppercase animate-pulse">Live</span>
               <span className="px-3 py-1 bg-[#00d2ff]/20 rounded-full text-[10px] text-[#00d2ff] font-bold uppercase">Active Regions</span>
            </div>
          </div>
          <div className="h-[450px]">
            <IndiaMap data={mapData} markers={markers} type="geo" />
          </div>
        </div>
        
        <div className="lg:col-span-4 flex flex-col gap-6">
          {[
            { title: 'Leads', value: stats.totalLeads, color: '#00d2ff', icon: <Users /> },
            { title: 'Sold', value: stats.soldPlots, color: '#9d50bb', icon: <CheckCircle /> },
            { title: 'Revenue', value: `₹${(stats.revenue/100000).toFixed(1)}L`, color: '#f83600', icon: <IndianRupee /> },
            { title: 'Growth', value: '14.2%', color: '#00f2fe', icon: <Zap /> },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0a1235] px-6 py-4 rounded-2xl border border-[#1e293b] flex items-center justify-between group hover:border-[#334155] transition-all">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.title}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}11`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Section title="Search Behavior" icon={<Globe size={20} />}>
        <ChartCard 
          title="Google Search Peaks" 
          description="यह ग्राफ दर्शाता है कि Google पर सबसे ज्यादा लोग किस समय प्लॉट सर्च कर रहे हैं। (Shows hourly search intensity on Google)."
        >
          <BasicLineChart data={peakGoogleData} />
        </ChartCard>
        <ChartCard 
          title="YouTube Video Interest" 
          description="YouTube पर साइट विज़िट वीडियो और प्लॉट रिव्यु की बढ़ती मांग। (Live viewership trends for site-visit videos)."
        >
          <BasicAreaChart data={peakYoutubeData} />
        </ChartCard>
        <ChartCard 
          title="Age Demographics" 
          description="प्लॉट खरीदने में किस उम्र के लोग सबसे ज्यादा दिलचस्पी ले रहे हैं। (Demographic breakdown of potential investors)."
        >
          <BasicPieChart data={ageGroupData} />
        </ChartCard>
        <ChartCard 
          title="Regional Hotspots" 
          description="बिहार के वो इलाके जहाँ से सबसे ज्यादा प्लॉट की पूछताछ आ रही है। (Top regional search volume hotspots)."
        >
          <BasicBarChart data={locationSearchData} layout="vertical" />
        </ChartCard>
      </Section>

      <Section title="Market Dynamics" icon={<TrendingDown size={20} />}>
        <ChartCard 
          title="Platform Comparison" 
          description="Google vs YouTube: यूजर्स किस माध्यम से ज्यादा जानकारी जुटा रहे हैं? (Comparison between platform engagement volume)."
        >
          <DualAxisChart data={platformComparisonData} dataKey1="google" dataKey2="youtube" />
        </ChartCard>
        <ChartCard 
          title="Plot Size Demand" 
          description="इन्वेस्टर्स की पहली पसंद: 1 कट्ठा, 2 कट्ठा या ज्यादा? (Demand distribution by plot size in Katthas)."
        >
          <BasicDoughnutChart data={sizePreferenceData} />
        </ChartCard>
        <ChartCard 
          title="Price Variations" 
          description="चुनिंदा क्षेत्रों में जमीन की औसत कीमतें और उनमें होने वाली बढ़ोतरी। (Average rates and appreciation by location)."
        >
          <StackedBarChart data={regionalPriceData} dataKey1="price" dataKey2="appreciation" />
        </ChartCard>
        <ChartCard 
          title="Search Velocity" 
          description="हफ्ते के किस दिन लोग सबसे ज्यादा एक्टिव रहते हैं? (Live tracking of daily search activity peaks)."
        >
          <BasicAreaChart data={dailySearchData} />
        </ChartCard>
      </Section>

      <Section title="Distribution & Depth" icon={<LayoutGrid size={20} />}>
        <ChartCard 
          title="Valuation Variance" 
          description="प्रमुख इलाकों में जमीन की कीमतों का रेंज और उतार-चढ़ाव। (Price range analysis across top locations)."
        >
          <BoxPlot data={boxPlotData} />
        </ChartCard>
        <ChartCard 
          title="Price vs Size Scatter" 
          description="जमीन के साइज और उसकी कीमत के बीच का संबंध। (Correlating plot size with market valuation)."
        >
          <ScatterPlot data={relationshipData} />
        </ChartCard>
        <ChartCard 
          title="Registry Cost Split" 
          description="जमीन रजिस्ट्री के दौरान होने वाले खर्चों का प्रतिशत विवरण। (Breakdown of registration, stamp duty, and legal fees)."
        >
          <BasicPieChart data={registryCostData} />
        </ChartCard>
        <ChartCard 
          title="Market Cap Distribution" 
          description="अलग-अलग बजट रेंज में उपलब्ध प्लॉट की संख्या। (Volume of plots available in different price brackets)."
        >
          <Histogram data={distributionData} />
        </ChartCard>
      </Section>

      <Section title="Financial Pulse" icon={<IndianRupee size={20} />}>
        <ChartCard 
          title="Market Volatility (OHLC)" 
          description="साप्ताहिक कीमतों का उतार-चढ़ाव और मार्केट की स्थिरता। (Weekly price volatility and market stability tracking)."
        >
          <OHLCChart data={financialData} />
        </ChartCard>
        <ChartCard 
          title="Engagement Metrics" 
          description="North vs South regions performance metrics. (Comparison between leads and sales volume)."
        >
          <DualAxisChart data={comparisonData} dataKey1="leads" dataKey2="sales" />
        </ChartCard>
      </Section>

    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Map as MapIcon, 
  CheckCircle, 
  IndianRupee, 
  Zap,
  Bell,
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
  GroupedBarChart, 
  StackedAreaChart, 
  MixedChart, 
  DualAxisChart 
} from '../components/charts/ComparisonCharts';
import { 
  CandlestickChart, 
  OHLCChart, 
  HeikinAshiChart 
} from '../components/charts/FinancialCharts';
import { 
  Histogram, 
  BoxPlot, 
  ViolinPlot 
} from '../components/charts/DistributionCharts';
import { 
  ScatterPlot, 
  BubbleChart 
} from '../components/charts/RelationshipCharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalPlots: 0,
    soldPlots: 0,
    revenue: 0
  });

  // Dummy Data
  const basicData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  const comparisonData = [
    { name: 'North', leads: 400, sales: 240, revenue: 2400 },
    { name: 'South', leads: 300, sales: 139, revenue: 2210 },
    { name: 'East', leads: 200, sales: 980, revenue: 2290 },
    { name: 'West', leads: 278, sales: 390, revenue: 2000 },
  ];

  const financialData = [
    { x: new Date('2024-01-01').getTime(), y: [51.4, 61.8, 54.0, 59.0] },
    { x: new Date('2024-01-02').getTime(), y: [59.0, 65.5, 58.0, 62.1] },
    { x: new Date('2024-01-03').getTime(), y: [62.1, 68.4, 60.5, 66.2] },
    { x: new Date('2024-01-04').getTime(), y: [66.2, 70.0, 64.0, 68.5] },
  ];

  const distributionData = [
    { range: '0-1M', count: 40 },
    { range: '1-5M', count: 120 },
    { range: '5-10M', count: 80 },
    { range: '10M+', count: 20 },
  ];

  const boxPlotData = [
    { x: 'Mumbai', y: [40, 50, 60, 70, 80] },
    { x: 'Delhi', y: [30, 45, 55, 65, 75] },
    { x: 'Bangalore', y: [50, 60, 70, 80, 90] },
  ];

  const relationshipData = [
    { x: 10, y: 30, z: 200 },
    { x: 20, y: 50, z: 400 },
    { x: 30, y: 40, z: 300 },
    { x: 40, y: 80, z: 500 },
  ];

  const mapData = [
    { id: "MH", value: 100 },
    { id: "UP", value: 80 },
    { id: "MP", value: 70 },
    { id: "RJ", value: 90 },
    { id: "TN", value: 60 },
    { id: "KA", value: 85 },
  ];

  const markers = [
    { markerOffset: -15, name: "Mumbai", coordinates: [72.8777, 19.0760] },
    { markerOffset: -15, name: "Delhi", coordinates: [77.1025, 28.7041] },
    { markerOffset: -15, name: "Bangalore", coordinates: [77.5946, 12.9716] },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leads, plots, payments] = await Promise.all([
          api.get('/leads'),
          api.get('/plots'),
          api.get('/payments')
        ]);
        
        setStats({
          totalLeads: leads.data.length,
          totalPlots: plots.data.length,
          soldPlots: plots.data.filter((p: any) => p.status === 'sold').length,
          revenue: payments.data.reduce((acc: number, p: any) => acc + Number(p.amount), 0)
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats');
      }
    };
    fetchStats();
  }, []);

  const Section = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-[#1e293b] pb-2">
        <div className="p-2 bg-[#1e293b] rounded-lg text-[#00d2ff]">{icon}</div>
        <h2 className="text-xl font-black text-white tracking-widest uppercase">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );

  const ChartCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-[#0a1235] p-5 rounded-2xl border border-[#1e293b] shadow-2xl relative group overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#00d2ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 group-hover:text-white transition-colors">{title}</h3>
      <div className="h-[300px] w-full">
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
            <h2 className="text-xl font-black text-white tracking-widest uppercase">Global Plot Presence</h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-[#1e293b] rounded-full text-[10px] text-slate-400 font-bold uppercase">Live</span>
               <span className="px-3 py-1 bg-[#00d2ff]/20 rounded-full text-[10px] text-[#00d2ff] font-bold uppercase">24 Active Regions</span>
            </div>
          </div>
          <div className="h-[500px]">
            <IndiaMap data={mapData} markers={markers} type="geo" />
          </div>
        </div>
        
        <div className="lg:col-span-4 flex flex-col gap-6">
          {[
            { title: 'Total Leads', value: stats.totalLeads, color: '#00d2ff', icon: <Users /> },
            { title: 'Sold Plots', value: stats.soldPlots, color: '#9d50bb', icon: <CheckCircle /> },
            { title: 'Revenue', value: `₹${(stats.revenue/100000).toFixed(1)}L`, color: '#f83600', icon: <IndianRupee /> },
            { title: 'Conversion', value: '14.2%', color: '#00f2fe', icon: <Zap /> },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0a1235] p-6 rounded-2xl border border-[#1e293b] flex items-center justify-between group hover:border-[#334155] transition-all cursor-pointer">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.title}</p>
                <p className="text-3xl font-black text-white" style={{ textShadow: `0 0 10px ${stat.color}44` }}>{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl transition-all group-hover:scale-110" style={{ backgroundColor: `${stat.color}11`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Charts */}
      <Section title="Basic Visualizations" icon={<BarChart3 size={20} />}>
        <ChartCard title="Performance Trends (Line)"><BasicLineChart data={basicData} /></ChartCard>
        <ChartCard title="inventory Distribution (Bar)"><BasicBarChart data={basicData} /></ChartCard>
        <ChartCard title="Growth Projection (Area)"><BasicAreaChart data={basicData} /></ChartCard>
        <ChartCard title="Leads by Source (Pie)"><BasicPieChart data={basicData} /></ChartCard>
        <ChartCard title="Plot Status (Doughnut)"><BasicDoughnutChart data={basicData} /></ChartCard>
        <ChartCard title="Regional Sales (Horizontal Bar)"><BasicBarChart data={basicData} layout="vertical" /></ChartCard>
      </Section>

      {/* Advanced Comparison Charts */}
      <Section title="Comparative Analysis" icon={<TrendingDown size={20} />}>
        <ChartCard title="Lead Conversion (Stacked Bar)"><StackedBarChart data={comparisonData} /></ChartCard>
        <ChartCard title="Market Share (Stacked Area)"><StackedAreaChart data={comparisonData} /></ChartCard>
        <ChartCard title="Regional Flux (Grouped Bar)"><GroupedBarChart data={comparisonData} /></ChartCard>
        <ChartCard title="Cost vs Revenue (Mixed)"><MixedChart data={comparisonData} /></ChartCard>
        <ChartCard title="Engagement Metrics (Dual Axis)"><DualAxisChart data={comparisonData} /></ChartCard>
      </Section>

      {/* Financial Charts */}
      <Section title="Market Dynamics" icon={<IndianRupee size={20} />}>
        <ChartCard title="Price Volatility (Candlestick)"><CandlestickChart data={financialData} /></ChartCard>
        <ChartCard title="Weekly Range (OHLC)"><OHLCChart data={financialData} /></ChartCard>
        <ChartCard title="Trend Momentum (Heikin Ashi)"><HeikinAshiChart data={financialData} /></ChartCard>
      </Section>

      {/* Distribution Charts */}
      <Section title="Statistical Distribution" icon={<LayoutGrid size={20} />}>
        <ChartCard title="Price Bracketing (Histogram)"><Histogram data={distributionData} /></ChartCard>
        <ChartCard title="Valuation variance (Box Plot)"><BoxPlot data={boxPlotData} /></ChartCard>
        <ChartCard title="Demand Density (Violin/Radar)"><ViolinPlot data={[{ name: 'Series 1', data: [80, 50, 30, 40, 100] }]} /></ChartCard>
      </Section>

      {/* Relationship Charts */}
      <Section title="Relational Insights" icon={<Share2 size={20} />}>
        <ChartCard title="Price vs Size (Scatter)"><ScatterPlot data={relationshipData} /></ChartCard>
        <ChartCard title="Regional Impact (Bubble)"><BubbleChart data={relationshipData} /></ChartCard>
      </Section>

      {/* Geographical Charts */}
      <Section title="Geographical variations" icon={<Globe size={20} />}>
        <ChartCard title="Inquiry Density (Heat Map)"><IndiaMap data={mapData} type="heat" /></ChartCard>
        <ChartCard title="Regional Activity (Choropleth)"><IndiaMap data={mapData} type="choropleth" /></ChartCard>
        <ChartCard title="Office Locations (Geo Map)"><IndiaMap markers={markers} type="geo" /></ChartCard>
      </Section>
    </div>
  );
};

export default Dashboard;

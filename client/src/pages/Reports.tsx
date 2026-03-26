import React from 'react';
import { 
  BarChart3, 
  Download, 
  PieChart as PieIcon, 
  TrendingUp, 
  ArrowRight,
  UserCheck,
  Building2,
  Wallet
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const Reports = () => {
  const performanceData = [
    { month: 'Jan', revenue: 4500000, leads: 120 },
    { month: 'Feb', revenue: 3200000, leads: 98 },
    { month: 'Mar', revenue: 5800000, leads: 145 },
    { month: 'Apr', revenue: 4900000, leads: 132 },
    { month: 'May', revenue: 7200000, leads: 168 },
  ];

  const sourceDetails = [
    { name: 'Facebook Ads', value: 45, color: '#4d77ff' },
    { name: 'Direct/In-Office', value: 25, color: '#10b981' },
    { name: 'Website SEO', value: 20, color: '#f59e0b' },
    { name: 'Referrals', value: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive performance analysis and financial audits.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none font-medium shadow-sm">
            <option>Last 6 Months</option>
            <option>Last 1 Month</option>
            <option>Year to Date</option>
          </select>
          <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-50 transition-all">
            <Download size={18} />
            Generate PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Area Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="text-lg font-bold text-gray-900">Revenue Growth</h3>
               <p className="text-sm text-gray-500">Monthly revenue collection trends.</p>
             </div>
             <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
               <TrendingUp size={16} /> +18.4%
             </div>
           </div>
           
           <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={performanceData}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#4d77ff" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#4d77ff" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                 <Tooltip />
                 <Area type="monotone" dataKey="revenue" stroke="#4d77ff" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Lead Source Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
           <h3 className="text-lg font-bold text-gray-900 mb-8">Conversion Sources</h3>
           <div className="flex flex-col md:flex-row items-center gap-8">
             <div className="h-64 w-full md:w-1/2">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={sourceDetails}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sourceDetails.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="w-full md:w-1/2 space-y-4">
                {sourceDetails.map((source, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: source.color}}></div>
                        <span className="text-sm font-medium text-gray-600">{source.name}</span>
                     </div>
                     <span className="text-sm font-bold text-gray-900">{source.value}%</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      {/* Audit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Avg Sale Price', value: '₹42.5L', sub: 'Last 30 days', icon: <Building2 />, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'Booking Ratio', value: '18%', sub: 'Higher than last mo', icon: <UserCheck />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           { label: 'Outstanding Dues', value: '₹12.8L', sub: 'Across 4 customers', icon: <Wallet />, color: 'text-amber-600', bg: 'bg-amber-50' },
           { label: 'Total Enquiries', value: '1,280', sub: 'YTD Performance', icon: <PieIcon />, color: 'text-indigo-600', bg: 'bg-indigo-50' }
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:translate-y-[-4px] transition-all">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <h4 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h4>
                <p className="text-[10px] text-gray-500 font-medium mt-1 italic">{stat.sub}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100">
           <h3 className="text-lg font-bold text-gray-900">Standard Reports</h3>
        </div>
        <div className="divide-y divide-gray-50">
           {[
             'Monthly Sales & Collection Audit',
             'Inventory Availability Manifest',
             'Lead Personnel Performance Analysis',
             'Marketing ROI & Channel Attribution'
           ].map((report, i) => (
             <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                   <BarChart3 size={20} />
                 </div>
                 <span className="font-bold text-gray-700">{report}</span>
               </div>
               <button className="text-primary-600 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                 View Report <ArrowRight size={16} />
               </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;

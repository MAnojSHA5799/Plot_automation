import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { ShieldAlert, TrendingUp, TrendingDown, MessageSquare } from 'lucide-react';

const SentimentAnalysis: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/sentiment');
        if (res.data.success) {
          setData(res.data.data);
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

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00d2ff] mb-4"></div>
        <p className="text-slate-400">Analyzing sentiments and generating reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const { records, summary, theoreticalReport } = data;

  // Transform summary for radar chart
  const radarData = summary.map((s: any) => ({
    subject: s["Promoter Name"],
    "Trust Score": parseFloat(s["Trust Score (0-100)"]),
    "Sales Prob": parseFloat(s["Sales Probability (%)"]),
    "Risk Score": parseFloat(s["Risk Score"]) * 10, // Scaled for visibility
  }));

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Project Sentiment & Trust Analysis</h1>
        <p className="text-slate-400 mb-8">AI-driven insights into promoter reputation, risk scores, and sales probabilities.</p>

        {/* Top Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summary.map((promoter: any, idx: number) => (
            <div key={idx} className="bg-[#0a1235] border border-[#1e293b] p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                {promoter["Performance Trend"] === 'Upward' ? <TrendingUp size={64} /> : <TrendingDown size={64} />}
              </div>
              <h3 className="text-sm text-slate-400 font-medium mb-1 truncate" title={promoter["Promoter Name"]}>
                {promoter["Promoter Name"]}
              </h3>
              <div className="text-2xl font-bold text-white mb-4">
                Trust: {promoter["Trust Score (0-100)"]}
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Risk Score:</span>
                <span className={`font-semibold ${promoter["Risk Score"] > 2 ? 'text-red-400' : 'text-green-400'}`}>
                  {promoter["Risk Score"]}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-slate-400">Sales Prob:</span>
                <span className="text-[#00d2ff] font-semibold">{promoter["Sales Probability (%)"]}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0a1235] border border-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Promoter Comparison</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Trust Score" dataKey="Trust Score" stroke="#00d2ff" fill="#00d2ff" fillOpacity={0.5} />
                  <Radar name="Sales Probability" dataKey="Sales Prob" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                  <Tooltip contentStyle={{ backgroundColor: '#0a1235', borderColor: '#1e293b', color: '#fff' }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0a1235] border border-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Issue Diagnostics</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="Promoter Name" stroke="#94a3b8" tick={{fontSize: 11}} width={100} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#0a1235', borderColor: '#1e293b', color: '#fff' }} />
                  <Legend />
                  <Bar dataKey="Financial Issue" stackId="a" fill="#ef4444" name="Financial" />
                  <Bar dataKey="Delay Issue" stackId="a" fill="#f59e0b" name="Delay" />
                  <Bar dataKey="Quality Issue" stackId="a" fill="#3b82f6" name="Quality" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Reviews (Left Column) */}
          <div className="lg:col-span-1 bg-[#0a1235] border border-[#1e293b] rounded-2xl flex flex-col h-[500px]">
            <div className="p-6 border-b border-[#1e293b]">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-[#00d2ff]" />
                Raw Sentiment Samples
              </h3>
            </div>
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {records.slice(0, 15).map((record: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-[#1e293b]/50 border border-[#1e293b]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-[#00d2ff] font-medium">{record["Project Name"]}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      record["Sentiment Label"] === 'Positive' ? 'bg-green-500/10 text-green-400' :
                      record["Sentiment Label"] === 'Negative' ? 'bg-red-500/10 text-red-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {record["Sentiment Label"]} ({(record["Sentiment Score"]).toFixed(1)})
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">"{record["Comment"]}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Theoretical Report (Right Column) */}
          <div className="lg:col-span-2 bg-[#0a1235] border border-[#1e293b] p-6 rounded-2xl h-[500px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-indigo-400" />
              Theoretical Sales Report
            </h3>
            <div className="bg-[#1e293b]/30 rounded-xl p-6 overflow-y-auto flex-1 font-mono text-sm text-slate-300 border border-[#1e293b]">
              <pre className="whitespace-pre-wrap font-sans">{theoreticalReport}</pre>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SentimentAnalysis;

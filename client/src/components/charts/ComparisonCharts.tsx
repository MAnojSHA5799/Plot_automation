import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, ComposedChart, Line, Legend
} from 'recharts';

interface ChartProps {
  data: any[];
}

export const StackedBarChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Bar dataKey="leads" stackId="a" fill="#00d2ff" />
      <Bar dataKey="sales" stackId="a" fill="#9d50bb" />
    </BarChart>
  </ResponsiveContainer>
);

export const GroupedBarChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Bar dataKey="leads" fill="#00d2ff" radius={[4, 4, 0, 0]} />
      <Bar dataKey="sales" fill="#9d50bb" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const StackedAreaChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Area type="monotone" dataKey="leads" stackId="1" stroke="#00d2ff" fill="#00d2ff" fillOpacity={0.6} />
      <Area type="monotone" dataKey="sales" stackId="1" stroke="#9d50bb" fill="#9d50bb" fillOpacity={0.6} />
    </AreaChart>
  </ResponsiveContainer>
);

export const MixedChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Bar dataKey="sales" barSize={20} fill="#9d50bb" />
      <Line type="monotone" dataKey="leads" stroke="#00d2ff" strokeWidth={3} />
    </ComposedChart>
  </ResponsiveContainer>
);

export const DualAxisChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis yAxisId="left" stroke="#00d2ff" fontSize={12} />
      <YAxis yAxisId="right" orientation="right" stroke="#9d50bb" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Bar yAxisId="left" dataKey="leads" fill="#00d2ff" />
      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#9d50bb" strokeWidth={3} />
    </ComposedChart>
  </ResponsiveContainer>
);

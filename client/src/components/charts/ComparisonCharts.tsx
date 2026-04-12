import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, ComposedChart, Line, Legend, LabelList
} from 'recharts';

interface ChartProps {
  data: any[];
  dataKey1?: string;
  dataKey2?: string;
  valueSuffix?: string;
}

export const StackedBarChart: React.FC<ChartProps> = ({ data, dataKey1 = 'leads', dataKey2 = 'sales', valueSuffix = '' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => valueSuffix ? `${val}${valueSuffix}` : val} />
      <Tooltip 
        formatter={(val: any) => valueSuffix ? `${val}${valueSuffix}` : val}
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Bar dataKey={dataKey1} stackId="a" fill="#00d2ff">
        <LabelList dataKey={dataKey1} position="center" fill="#fff" fontSize={10} formatter={(val: any) => valueSuffix ? `${val}${valueSuffix}` : val} />
      </Bar>
      <Bar dataKey={dataKey2} stackId="a" fill="#9d50bb">
        <LabelList dataKey={dataKey2} position="center" fill="#fff" fontSize={10} formatter={(val: any) => valueSuffix ? `${val}${valueSuffix}` : val} />
      </Bar>
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
      <Bar dataKey="leads" fill="#00d2ff" radius={[4, 4, 0, 0]}>
        <LabelList dataKey="leads" position="top" fill="#94a3b8" fontSize={10} />
      </Bar>
      <Bar dataKey="sales" fill="#9d50bb" radius={[4, 4, 0, 0]}>
        <LabelList dataKey="sales" position="top" fill="#94a3b8" fontSize={10} />
      </Bar>
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
      <Area type="monotone" dataKey="leads" stackId="1" stroke="#00d2ff" fill="#00d2ff" fillOpacity={0.6}>
        <LabelList dataKey="leads" position="top" fill="#fff" fontSize={10} />
      </Area>
      <Area type="monotone" dataKey="sales" stackId="1" stroke="#9d50bb" fill="#9d50bb" fillOpacity={0.6}>
        <LabelList dataKey="sales" position="top" fill="#fff" fontSize={10} />
      </Area>
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
      <Bar dataKey="sales" barSize={20} fill="#9d50bb">
        <LabelList dataKey="sales" position="top" fill="#94a3b8" fontSize={10} />
      </Bar>
      <Line type="monotone" dataKey="leads" stroke="#00d2ff" strokeWidth={3}>
        <LabelList dataKey="leads" position="top" fill="#94a3b8" fontSize={10} />
      </Line>
    </ComposedChart>
  </ResponsiveContainer>
);

export const DualAxisChart: React.FC<ChartProps> = ({ data, dataKey1 = 'leads', dataKey2 = 'revenue' }) => (
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
      <Bar yAxisId="left" dataKey={dataKey1} fill="#00d2ff">
        <LabelList dataKey={dataKey1} position="top" fill="#00d2ff" fontSize={10} />
      </Bar>
      <Line yAxisId="right" type="monotone" dataKey={dataKey2} stroke="#9d50bb" strokeWidth={3}>
        <LabelList dataKey={dataKey2} position="top" fill="#9d50bb" fontSize={10} />
      </Line>
    </ComposedChart>
  </ResponsiveContainer>
);

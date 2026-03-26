import React from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

interface ChartProps {
  data: any[];
}

export const ScatterPlot: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis type="number" dataKey="x" name="Price" unit="Lac" stroke="#94a3b8" fontSize={12} />
      <YAxis type="number" dataKey="y" name="Size" unit="SqFt" stroke="#94a3b8" fontSize={12} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Scatter name="Plots" data={data} fill="#00f2fe" />
    </ScatterChart>
  </ResponsiveContainer>
);

export const BubbleChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis type="number" dataKey="x" name="Price" unit="Lac" stroke="#94a3b8" fontSize={12} />
      <YAxis type="number" dataKey="y" name="Demand" stroke="#94a3b8" fontSize={12} />
      <ZAxis type="number" dataKey="z" range={[60, 400]} name="Inquiries" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
      <Scatter name="Regional Demand" data={data} fill="#f83600" />
    </ScatterChart>
  </ResponsiveContainer>
);

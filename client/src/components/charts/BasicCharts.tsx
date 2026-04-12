import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, Legend, LabelList
} from 'recharts';

const COLORS = ['#00d2ff', '#9d50bb', '#f83600', '#00f2fe', '#6a11cb'];

interface ChartProps {
  data: any[];
  layout?: 'horizontal' | 'vertical';
}

export const BasicLineChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Line type="monotone" dataKey="value" stroke="#00d2ff" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }}>
        <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={11} />
      </Line>
    </LineChart>
  </ResponsiveContainer>
);

export const BasicBarChart: React.FC<ChartProps> = ({ data, layout = 'horizontal' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} layout={layout}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey={layout === 'horizontal' ? 'name' : 'value'} type={layout === 'horizontal' ? 'category' : 'number'} stroke="#94a3b8" fontSize={12} />
      <YAxis dataKey={layout === 'horizontal' ? 'value' : 'name'} type={layout === 'horizontal' ? 'number' : 'category'} stroke="#94a3b8" fontSize={12} width={80} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Bar dataKey="value" fill="#9d50bb" radius={[4, 4, 0, 0]}>
        <LabelList dataKey="value" position={layout === 'horizontal' ? 'top' : 'right'} fill="#94a3b8" fontSize={11} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const BasicAreaChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#00d2ff" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Area type="monotone" dataKey="value" stroke="#00d2ff" fillOpacity={1} fill="url(#colorValue)">
        <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={11} />
      </Area>
    </AreaChart>
  </ResponsiveContainer>
);

export const BasicPieChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={0}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export const BasicDoughnutChart: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

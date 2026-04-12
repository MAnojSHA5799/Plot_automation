import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList 
} from 'recharts';
import Chart from 'react-apexcharts';

interface ChartProps {
  data: any[];
}

export const Histogram: React.FC<ChartProps> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} barGap={0}>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} />
      <YAxis stroke="#94a3b8" fontSize={12} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#0a1235', border: '1px solid #1e293b', borderRadius: '8px' }}
        itemStyle={{ color: '#fff' }}
      />
      <Bar dataKey="count" fill="#00d2ff">
        <LabelList dataKey="count" position="top" fill="#94a3b8" fontSize={10} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const BoxPlot: React.FC<ChartProps> = ({ data }) => (
  <Chart
    options={{
      chart: {
        type: 'boxPlot',
        height: 350,
        background: 'transparent',
        toolbar: { show: false }
      },
      title: {
        text: 'Price Distribution by Region (Box Plot)',
        align: 'left',
        style: { color: '#fff' }
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: '#00d2ff',
            lower: '#9d50bb'
          }
        }
      },
      dataLabels: { enabled: true },
      xaxis: {
        labels: { style: { colors: '#94a3b8' } }
      },
      yaxis: {
        labels: { style: { colors: '#94a3b8' } }
      },
      grid: { borderColor: '#1e293b' }
    }}
    series={[{ data: data }]}
    type="boxPlot"
    height={300}
  />
);

export const ViolinPlot: React.FC<ChartProps> = ({ data }) => (
  // ApexCharts doesn't have a direct Violin Plot, but we can simulate it or use a Density Plot.
  // For now, let's use a Column chart with rounded edges to approximate.
  <Chart
    options={{
      chart: {
        type: 'radar',
        height: 350,
        background: 'transparent',
        toolbar: { show: false }
      },
      title: {
        text: 'Regional Market Profile (Violin/Radar)',
        align: 'left',
        style: { color: '#fff' }
      },
      theme: { mode: 'dark' },
      dataLabels: { enabled: true },
      xaxis: {
        categories: ['Price', 'Demand', 'Supply', 'Conversion', 'Leads'],
        labels: { style: { colors: '#94a3b8' } }
      },
      yaxis: { show: false },
      grid: { borderColor: '#1e293b' }
    }}
    series={data}
    type="radar"
    height={300}
  />
);

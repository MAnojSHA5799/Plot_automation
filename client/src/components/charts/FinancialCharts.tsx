import React from 'react';
import Chart from 'react-apexcharts';

const commonOptions: any = {
  chart: {
    type: 'candlestick',
    height: 350,
    background: 'transparent',
    toolbar: {
      show: false
    }
  },
  theme: {
    mode: 'dark'
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: '#94a3b8'
      }
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    },
    labels: {
      style: {
        colors: '#94a3b8'
      }
    }
  },
  grid: {
    borderColor: '#1e293b'
  }
};

interface FinancialChartProps {
  data: any[];
}

export const CandlestickChart: React.FC<FinancialChartProps> = ({ data }) => (
  <Chart
    options={{
      ...commonOptions,
      title: {
        text: 'Plot Price Trends (Candlestick)',
        align: 'left',
        style: { color: '#fff' }
      }
    }}
    series={[{ data }]}
    type="candlestick"
    height={300}
  />
);

export const OHLCChart: React.FC<FinancialChartProps> = ({ data }) => (
  <Chart
    options={{
      ...commonOptions,
      chart: {
        ...commonOptions.chart,
        type: 'rangeBar'
      },
      title: {
        text: 'Weekly Price Range (OHLC)',
        align: 'left',
        style: { color: '#fff' }
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    }}
    series={[{ data }]}
    type="rangeBar"
    height={300}
  />
);

export const HeikinAshiChart: React.FC<FinancialChartProps> = ({ data }) => (
  <Chart
    options={{
      ...commonOptions,
      title: {
        text: 'Market Momentum (Heikin Ashi)',
        align: 'left',
        style: { color: '#fff' }
      }
    }}
    series={[{ data }]}
    type="candlestick"
    height={300}
  />
);

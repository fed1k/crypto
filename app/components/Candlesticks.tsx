'use client'

import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface CandlestickData {
  time: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: CandlestickData[];
  colors?: {
    backgroundColor?: string;
    upColor?: string;
    downColor?: string;
    wickUpColor?: string;
    wickDownColor?: string;
  };
}

const CandlestickChart = ({ 
  data,
  colors: {
    backgroundColor = '#ffffff',
    upColor = '#26a69a',
    downColor = '#ef5350',
    wickUpColor = '#26a69a',
    wickDownColor = '#ef5350',
  } = {}
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };

    if (!chartContainerRef.current) return;

    // const chart = createChart(chartContainerRef.current, {
    //   layout: {
    //     background: { type: ColorType.Solid, color: backgroundColor },
    //     textColor: '#000000',
    //   },
    //   width: chartContainerRef.current.clientWidth,
    //   height: 500,
    //   grid: {
    //     vertLines: { color: '#e1e1e1' },
    //     horzLines: { color: '#e1e1e1' },
    //   },
    //   rightPriceScale: {
    //     borderVisible: false,
    //   },
    //   timeScale: {
    //     timeVisible: true,
    //     secondsVisible: false,
    //   },
    // });

    const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor: '#d1d5db', // Lighter text color for better contrast
        },
        width: chartContainerRef.current.clientWidth,
        height: 700,
        grid: {
          vertLines: {
            color: 'rgba(75, 85, 99, 0.2)', // Darker gray with transparency
            style: 1, // Dotted line style
          },
          horzLines: {
            color: 'rgba(75, 85, 99, 0.2)', // Matching vertical lines
            style: 1,
          },
        },
        rightPriceScale: {
          borderVisible: false,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          borderVisible: false, // Remove border
        },
      });

    let candlestickSeries = chart.addSeries(CandlestickSeries, { 
      upColor,
      downColor,
      borderVisible: false,
      wickUpColor,
      wickDownColor,
    });
    
    candlestickSeries.setData(data);
    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, backgroundColor, upColor, downColor, wickUpColor, wickDownColor]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default CandlestickChart;

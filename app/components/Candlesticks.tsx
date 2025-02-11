'use client'

import { createChart, ColorType, CandlestickSeries, ISeriesApi, IChartApi } from 'lightweight-charts';
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
      
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth, height: chartContainerRef.current?.clientHeight });
    };


    const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor: '#d1d5db',
        },
        width: chartContainerRef.current.clientWidth,
        height: 700,
        grid: {
          vertLines: {
            color: 'rgba(75, 85, 99, 0.2)', 
            style: 1, 
          },
          horzLines: {
            color: 'rgba(17, 109, 238, 0.2)',
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
          borderVisible: false, 
        },
    });


    let candlestickSeries = chart.addSeries(CandlestickSeries, { 
      upColor,
      downColor,
      borderVisible: false,
      wickUpColor,
      wickDownColor,
    });


    candlestickSeries.setData(data as any);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, upColor, downColor, wickUpColor, wickDownColor]);


  return <div ref={chartContainerRef} className="w-full" />;
};

export default CandlestickChart;

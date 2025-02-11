'use client'

import { createChart, ColorType, IChartApi, ISeriesApi, IRange, CandlestickSeries, Time } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface CandlestickData {
  time: number;
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
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const visibleTimeRangeRef = useRef<IRange<Time> | null>(null);
  const isUserZoomedRef = useRef(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: '#d1d5db',
      },
      width: chartContainerRef.current.clientWidth,
      height: 700,
      grid: {
        vertLines: { color: 'rgba(75, 85, 99, 0.2)', style: 1 },
        horzLines: { color: 'rgba(17, 109, 238, 0.2)', style: 1 },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderVisible: false,
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor,
      downColor,
      wickUpColor,
      wickDownColor,
      borderVisible: false,
    });

    seriesRef.current = candlestickSeries;

    chart.timeScale().subscribeVisibleTimeRangeChange((timeRange) => {
      if (timeRange) {
        visibleTimeRangeRef.current = timeRange;
        const latestTime = data[data.length - 1]?.time;
        if (latestTime) {
          const threshold = (timeRange.to - timeRange.from) * 0.02;
          isUserZoomedRef.current = !(latestTime - timeRange.to <= threshold);
        }
      }
    });

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [backgroundColor, upColor, downColor, wickUpColor, wickDownColor]);

  useEffect(() => {
    if (seriesRef.current && chartRef.current) {
      const currentTimeRange = chartRef.current.timeScale().getVisibleRange();
      const newLastTime = data[data.length - 1]?.time;

      seriesRef.current.setData(data);

      if (currentTimeRange && isUserZoomedRef.current) {
        chartRef.current.timeScale().setVisibleRange(currentTimeRange);
      } else if (newLastTime) {
        chartRef.current.timeScale().scrollToRealTime();
      }
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default CandlestickChart;
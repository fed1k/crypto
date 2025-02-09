'use client';

import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function PageTable({ initialCoinData }) {
  const [coinsData, setCoinsData] = useState(initialCoinData);

  useEffect(() => {
    const symbols = Object.keys(initialCoinData);
    console.log(symbols)
    // Store WebSocket instances to ensure each connection is handled properly
    const sockets = symbols.map((symbol) => {
      const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@ticker`;
      const socket = new WebSocket(wsUrl);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { P, c, s } = data;

        // Prevent state update if data hasn't changed
        setCoinsData((prevData) => {

          return {
            ...prevData,
            [s.toLowerCase()]: { name: s, price: c, priceChangePercent: P },
          };
        });
      };

      socket.onopen = () => {
        console.log(`WebSocket connected for ${symbol}`);
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
      };

      socket.onclose = () => {
        console.log(`WebSocket connection closed for ${symbol}`);
      };

      return socket;
    });

    // Cleanup function to close all WebSocket connections when the component is unmounted or when the symbols change
    return () => {
      sockets.forEach((socket) => socket.close());
    };
  }, [initialCoinData]); // Dependency array ensures this runs only when the initialCoinData changes

  // Format price with two decimal places
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format percentage change with two decimal places
  const formatPercent = (percent) => {
    return parseFloat(percent).toFixed(2);
  };

  // Function to get the coin name (e.g., btc from btcusdt)
  const getCoinName = (symbol) => {
    return symbol.slice(0, -4);  // Remove "usdt" or similar suffix
  };

  console.log(coinsData)

  return (
    <TableBody>
      {Object.keys(coinsData).map((symbol) => {
        const coin = coinsData[symbol];

        return coin && (
          <TableRow key={coin.name}>
            <TableCell className="font-medium">{getCoinName(coin.name)}</TableCell>
            <TableCell>${formatPrice(coin.price)}</TableCell>
            <TableCell className={coin.priceChangePercent > 0 ? "text-green-500" : "text-red-500"}>
              {coin.priceChangePercent > 0 ? "+" + formatPercent(coin.priceChangePercent) : formatPercent(coin.priceChangePercent)}%
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Торговать
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}

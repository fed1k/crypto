"use client";

import { formatPercent, formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useCoinData = (symbols = ["btcusdt"]) => {
    const [coinsData, setCoinsData] = useState(
        symbols.reduce((acc, symbol) => {
            acc[symbol] = { name: symbol, price: null, priceChangePercent: null };
            return acc;
        }, {})
    );

    useEffect(() => {
        // Handle WebSocket connection for each coin
        const sockets = symbols.map((symbol) => {
            const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@ticker`;
            const socket = new WebSocket(wsUrl);

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const { P, c, s } = data;

                setCoinsData((prevData) => ({
                    ...prevData,
                    [s.toLowerCase()]: { name: s, price: formatPrice(c), priceChangePercent: formatPercent(P) },
                }));
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

        // Cleanup WebSocket connections when component unmounts or symbols change
        return () => {
            sockets.forEach((socket) => socket.close());
        };
    }, [symbols]);

    // Return the coin data object
    return coinsData;
};

export default useCoinData;

"use client";
import { useState, useCallback, useEffect } from "react";
import { useSocket } from "@/lib/hooks/use-socket";
import type { ListItemProps } from "@/components/list/list-item";
import { List, } from "@/components/list";
import { parseJson, payloadGuard, subscriptionGuard, } from "@/lib/utils/parse-json";

const MarketTicker = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [data, setData] = useState<ListItemProps[]>([]);

  const onMessage = useCallback((event: MessageEvent) => {
    if (!subscribed) {
      const { hasError } = parseJson(subscriptionGuard)(event.data);
      setSubscribed(!hasError);
    } else {
      const { hasError, parsed: payload } = parseJson(payloadGuard)(event.data);
      if(!hasError) {
        setData(payload.map((item) => ({
          title: item.s,
          subtitle: "Perpetual",
          price: item.c,
          diff: item.p,
        })));
      }
    }
  }, [subscribed]);

  const { socket } = useSocket({
    url: "wss://fstream.binance.com/ws",
    onOpen: () => {
      setConnected(true);
    },
    onMessage,
    onClose: () => {
      setConnected(false);
    },
  });

  useEffect(() => {
    if (connected && socket && socket.readyState) {
      socket.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": ["!ticker@arr"],
        "id": "1"
      }));
    }
  }, [socket, connected]);

  return (
    <>
      {connected ? (
        <List
          data={data}
        />
      ) : (
        <p>
            connecting...
        </p>
      )}
    </>
  );
};

export default MarketTicker;

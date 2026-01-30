"use client";
import { useEffect, useRef, useCallback, useState } from "react";

interface UseWebSocketProps {
  url?: string;
  queryParams?: Record<string, string>;
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
  shouldConnect?: boolean;
}

export const useWebSocket = ({
  url,
  queryParams,
  onOpen,
  onClose,
  onMessage,
  onError,
  shouldConnect = true,
}: UseWebSocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const onMessageRef = useRef(onMessage);
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    onErrorRef.current = onError;
  }, [onMessage, onOpen, onClose, onError]);

  const connect = useCallback(() => {
    if (!url || !shouldConnect) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = new URL(url);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value) wsUrl.searchParams.append(key, value);
      });
    }

    console.log("Connecting to WebSocket:", wsUrl.toString());
    const socket = new WebSocket(wsUrl.toString());

    socket.onopen = () => {
      console.log("WebSocket Connected");
      setIsConnected(true);
      onOpenRef.current?.();
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      setIsConnected(false);
      onCloseRef.current?.();
    };

    socket.onerror = (event) => {
      console.log("WebSocket Error:", event);
      onErrorRef.current?.(event);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket Message:", event);
      onMessageRef.current?.(event);
    };

    socketRef.current = socket;
  }, [url, shouldConnect]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (shouldConnect) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [connect, disconnect, shouldConnect]);

  const sendMessage = useCallback((data: string | object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const message = typeof data === "string" ? data : JSON.stringify(data);
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected");
    }
  }, []);

  return {
    sendMessage,
    disconnect,
    connect,
    isConnected,
  };
};

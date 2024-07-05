import React from "react";

type UseSocketProps = {
  url: string | URL;
  onOpen: () => void;
  onMessage: (event: MessageEvent) => void;
  onClose: () => void;
}

const useSocket = ({ url, onOpen, onMessage, onClose, }: UseSocketProps) => {
  const [socket, setSocket] = React.useState<WebSocket | null>(null);

  React.useEffect(() => {
    if (socket === null) {
      const ws = new WebSocket(url);
      setSocket(ws);
    }
  }, [url, socket]);

  React.useEffect(() => {
    socket?.addEventListener("open", onOpen);
    return () => socket?.removeEventListener("open", onOpen);
  }, [socket, onOpen]);

  React.useEffect(() => {
    socket?.addEventListener("message", onMessage);
    return () => socket?.removeEventListener("message", onMessage);
  }, [socket, onMessage]);

  React.useEffect(() => {
    socket?.addEventListener("close", onClose);
    return () => socket?.removeEventListener("close", onClose);
  }, [socket, onClose]);

  return { socket };
};

export { useSocket };

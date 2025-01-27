import config from "../../config";
import io from "socket.io-client";
import { storage } from "@nucleoidjs/webstorage";

import { useEffect, useRef } from "react";

export const useSocket = () => {
  const socketRef = useRef();
  const { name } = config;

  useEffect(() => {
    const token = storage.get(name, "accessToken");

    socketRef.current = io(config.api, {
      auth: {
        token: token,
      },
      transports: ["websocket", "polling"],
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socketRef.current;
};

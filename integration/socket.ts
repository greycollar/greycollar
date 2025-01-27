import { Socket, io } from "socket.io-client";

import { displayCommand } from "./actions/displayCommand";

//TODO re-visit
let socketInstance: Socket | null = null;

const setupSocket = (app) => {
  const socket = io(process.env.BASE_URL);
  socketInstance = socket;

  socket.on("connect", () => {
    console.log("Slack app connected to websocket server");

    socket.on("command_sent", async (update) => {
      try {
        console.log("command_sent", update.data);
        await displayCommand(app, update.data);
      } catch (error) {
        console.error("Error handling command:", error);
      }
    });
  });

  return socket;
};

const getSocket = () => socketInstance;

export { setupSocket, getSocket };
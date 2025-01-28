import { Socket, io } from "socket.io-client";

import { account } from "./account";
import connects from "./connects.json";
import { displayCommand } from "./actions/displayCommand";

//TODO re-visit
let socketInstance: Socket | null = null;

const userId = connects[1];

const setupSocket = (app) => {
  const session = account(userId);
  const socket = io(process.env.BASE_URL, {
    auth: {
      token: session.accessToken,
    },
  });
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

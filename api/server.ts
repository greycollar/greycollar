import * as platform from "@nucleoidai/platform-express";

import { Server } from "socket.io";
import config from "./config";
import http from "http";
import models from "./src/models";
import { setupSocket } from "./socketHandler";

platform.init(config).then(() => {
  const app = require("./src/app").default;
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env["FRONTEND_URL"] || "http://localhost:5173",
    },
  });
  models.init();

  setupSocket(io);

  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});

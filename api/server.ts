import * as platform from "@nucleoidai/platform-express";

import { Server } from "socket.io";
import config from "./config";
import http from "http";
import models from "./src/models";
import sessions from "./src/socket/sessions";

platform.init(config).then(() => {
  const app = require("./src/app").default;
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env["FRONTEND_URL"] || "http://localhost:3000/dashboard",
    },
  });

  models.init();
  sessions.setup(io);

  server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
  });
});

import * as platform from "@nucleoidai/platform-express";

import { Server } from "socket.io";
import config from "./config";
import dotenv from "dotenv";
import http from "http";
import models from "./src/models";
import sessions from "./src/socket/sessions";

dotenv.config();

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", (reason) => {
  console.log(`Unhandled Rejection: ${reason}`);
});

platform.init(config).then(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const app = require("./src/app").default;
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  models.init();
  sessions.setup(io);

  server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
  });
});

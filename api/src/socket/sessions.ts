import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { publish, subscribe } from "../lib/Event";
import { v4 as uuid } from "uuid";

const sockets = {};

const setup = (io: Server) => {
  const Colleague = require("../models/Colleague.js");

  io.on("connection", async (socket) => {
    const token = socket.handshake.auth.token;
    const colleagueId = socket.handshake.query.colleagueId;

    const { sub, aud, rls, aid, oid } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    const session = {
      id: uuid(),
      appId: aid,
      organizationId: oid,
      projectId: aud,
      userId: sub,
      roles: rls,
      timestamp: new Date(),
    };

    const colleague = await Colleague.findByPk(colleagueId);

    if (!colleague || colleague.teamId !== session.projectId) {
      socket.disconnect();
      return;
    }

    socket.on("disconnect", () => {
      delete sockets[session.id];
    });

    sockets[session.id] = socket.id;

    socket.on("customer_message", async ({ content }) =>
      publish("SESSION", "CUSTOMER_MESSAGED", { session, content })
    );
  });

  subscribe("SESSION", "AI_MESSAGED", ({ session, content }) => {
    const socketId = sockets[session.id];
    if (socketId) {
      io.to(socketId).emit("ai_message", {
        content,
      });
    }
  });
};

export default { setup };

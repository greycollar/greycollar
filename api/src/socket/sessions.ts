import { publish, subscribe } from "../lib/Event";

import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const sockets = {};

const setup = (io: Server) => {
  const Colleague = require("../models/Colleague.js");
  const session = require("../functions/session.ts").default;

  io.on("connection", async (socket) => {
    try {
      const token = socket.handshake.auth.token;
      const colleagueId = socket.handshake.query.colleagueId as string;

      const { sub, aud, rls, aid, oid } = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      const oauth = {
        appId: aid,
        organizationId: oid,
        projectId: aud,
        userId: sub,
        roles: rls,
        timestamp: new Date(),
      };

      const { id: sessionId } = await session.create({
        type: "CHAT",
        colleagueId,
      });

      const colleague = await Colleague.findByPk(colleagueId);

      if (!colleague || colleague.teamId !== oauth.projectId) {
        socket.disconnect();
        return;
      }

      socket.on("disconnect", () => {
        delete sockets[sessionId];
      });

      sockets[sessionId] = socket.id;

      socket.on("customer_message", async ({ content }, callback) => {
        await session.addConversation({
          sessionId,
          colleagueId,
          role: "USER",
          content,
        });

        callback({ status: "success" });
      });
    } catch (err) {
      socket.disconnect();
      console.error(err);
    }
  });

  io.on("error", (err) => {
    console.error("Socket error:", err);
  });

  subscribe("SESSION", "AI_MESSAGED", ({ sessionId, content }) => {
    const socketId = sockets[sessionId];
    if (socketId) {
      io.to(socketId).emit("ai_message", {
        content,
      });
    }
  });
};

export default { setup };

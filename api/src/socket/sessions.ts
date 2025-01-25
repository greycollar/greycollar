import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { publish, subscribe } from "../lib/Event";
import { v4 as uuid } from "uuid";

const sockets = {};

const setup = (io: Server) => {
  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;

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

    socket.on("disconnect", () => {
      delete sockets[session.id];
    });

    sockets[session.id] = socket.id;

    socket.on("send_message", async ({ content }) =>
      publish("CHAT.USER_MESSAGED", { session, content })
    );
  });

  subscribe("CHAT.AI_MESSAGED", ({ session, content }) => {
    const socketId = sockets[session.id];
    io.to(socketId).emit("ai_response", {
      content,
    });
  });
};

export default { setup };

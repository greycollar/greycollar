import { Server } from "socket.io";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("create_session", async ({ id, colleagueId, type }, callback) => {
      const session = { id, colleagueId, type };
      if (typeof callback === "function") {
        callback({ success: true, data: session });
      }
    });

    socket.on("send_message", async ({ sessionId, message }, callback) => {
      const messageData = {
        sessionId,
        content: message,
        timestamp: new Date(),
        role: "USER",
      };

      io.emit("new_message", { message: messageData });

      if (typeof callback === "function") {
        callback({ success: true, data: messageData });
      }

      setTimeout(() => {
        const aiResponse = {
          content: {
            sessionId,
            role: "ASSISTANT",
            content: "How can I help you?",
            timestamp: new Date(),
          },
        };

        io.emit("ai_response", aiResponse);
        io.emit("session_updated", { sessionId });
      }, 1000);
    });

    socket.on("get_session", async ({ sessionId }, callback) => {
      const conversations = [];
      if (typeof callback === "function") {
        callback({ success: true, data: conversations });
      }
    });
  });
};

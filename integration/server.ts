import { createApp } from "./app";
import { createChatApp } from "./chatApp";
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from "dotenv";
import express from "express";
import { setupSocket } from "./socket";

dotenv.config();


const startServer = async () => {
  const mainApp = express();

  const slackApp = createApp();
  const chatApp = createChatApp();

  setupSocket(slackApp);
  setupSocket(chatApp);

  const slackPort = process.env.SLACK_PORT || 3002;
  const chatPort = process.env.CHAT_PORT || 3003;

  await slackApp.start(slackPort);
  await chatApp.start(chatPort);

  const slackProxy = createProxyMiddleware({
    target: `http://localhost:${slackPort}`,
    ws: true,
    pathRewrite: {
      "^/bot": "",
    },
  });

  const chatProxy = createProxyMiddleware({
    target: `http://localhost:${chatPort}`,
    ws: true,
    pathRewrite: {
      "^/chat": "",
    },
  });

  mainApp.use("/bot", slackProxy);
  mainApp.use("/chat", chatProxy);

  const mainPort = process.env.MAIN_PORT || 3001;
  mainApp.listen(mainPort, () => {
    console.log(`⚡️ Main server running on port ${mainPort}`);
    console.log(`⚡️ Bot app accessible at /bot`);
    console.log(`⚡️ Chat app accessible at /chat`);
  });
};

startServer().catch(console.error);

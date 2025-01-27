import "../styles/chat.css";

import { ChatWidget } from "../widgets/ChatWidget";
import { Helmet } from "react-helmet-async";
import React from "react";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

function Chat() {
  const projectId = storage.get("projectId");
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> {config.name} - Chat </title>
      </Helmet>

      <ChatWidget projectId={projectId} />
    </>
  );
}

export default Chat;

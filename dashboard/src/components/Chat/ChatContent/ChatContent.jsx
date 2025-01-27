import { Box } from "@mui/material";
import MessageInput from "../MessageInput";
import MessageList from "../MessageList";
import React from "react";

const ChatContent = ({ user, handleNewUserMessage, team, messages }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        <MessageList user={user} team={team} messages={messages} />
      </Box>
      <MessageInput handleNewUserMessage={handleNewUserMessage} />
    </Box>
  );
};

export default ChatContent;

import { Box } from "@mui/material";
import MessageText from "../MessageText";
import React from "react";

const MessageList = ({ user, messages, team }) => {
  return (
    <Box
      sx={{
        overflowY: "auto",
        maxHeight: "calc(100vh - 150px)",
        p: 2,
      }}
    >
      {messages.map((message, index) => (
        <MessageText key={index} user={user} team={team} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;

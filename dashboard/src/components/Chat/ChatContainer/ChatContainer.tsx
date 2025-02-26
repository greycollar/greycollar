import { Box } from "@mui/material";
import ChatContent from "../ChatContent";
import React from "react";
import { alpha } from "@mui/material/styles";

const ChatContainer = ({ user, handleNewUserMessage, team, messages }) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "90vh",
        flexDirection: "column",
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
        borderLeft: "1px solid #4a4d52",
        borderRight: "1px solid #4a4d52",
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => alpha(theme.palette.grey[800], 0.8),
          color: "#fff",
          padding: "10px",
          borderBottom: "1px solid #4a4d52",
          display: "flex",
        }}
      ></Box>
      <ChatContent
        user={user}
        handleNewUserMessage={handleNewUserMessage}
        team={team}
        messages={messages}
      />
    </Box>
  );
};

export default ChatContainer;

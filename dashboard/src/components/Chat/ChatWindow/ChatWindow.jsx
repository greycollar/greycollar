import React from "react";
import { Send } from "@mui/icons-material";

import { Box, IconButton, Paper, TextField } from "@mui/material";

const Message = React.memo(({ message, owner }) => {
  return (
    <Box sx={{ width: "100%", p: 0.2 }}>
      {owner ? (
        <Box sx={{ backgroundColor: "ButtonFace", p: 1 }}>{message}</Box>
      ) : (
        <Box sx={{ backgroundColor: "ButtonFace", p: 1, borderRadius: 5 }}>
          {message}
        </Box>
      )}
    </Box>
  );
});

const Messages = React.memo(({ messages }) => {
  return (
    <Box sx={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
      {messages?.map(({ message }, index) => (
        <Message key={index} message={message} />
      ))}
    </Box>
  );
});

const MessageForm = React.memo(({ handleSendMessage }) => {
  const inputRef = React.useRef();
  const [text, setText] = React.useState("");

  return (
    <Box
      sx={{
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 1,
        alignItems: "center",
      }}
    >
      <TextField
        type="text"
        autoComplete="off"
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputRef={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(text);
            setText("");
          }
        }}
        fullWidth
      />
      <IconButton
        onClick={() => {
          handleSendMessage(text);
          setText("");
          inputRef.current.focus();
        }}
      >
        <Send />
      </IconButton>
    </Box>
  );
});

const ChatWindow = React.memo(({ messages, handleNewMessage }) => {
  function handleSendMessage(message) {
    handleNewMessage(message);
  }

  return (
    <Box sx={{ width: "100%", height: "100%", p: 2 }}>
      <Paper sx={{ height: "100%", p: 1 }}>
        <Messages messages={messages} />
        <MessageForm handleSendMessage={handleSendMessage} />
      </Paper>
    </Box>
  );
});

export default ChatWindow;

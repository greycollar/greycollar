import Draggable from "react-draggable";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import MessageSfx from "./messageSFX.mp3";
import { Scrollbar } from "@nucleoidai/platform/minimal/components";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import styles from "./styles";
import { useEvent } from "@nucleoidai/react-event";
import useSound from "use-sound";

import { Box, Fab, IconButton, TextField, Typography } from "@mui/material";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const sub = { item: null };
const response = (res) => {
  sub.item = res;
};

export const handleAddResponseMessage = (ret) => {
  sub.item(ret);
};

// Memoized Message Components
const AIMessage = memo(({ content, messageRef }) => (
  <Stack
    ref={messageRef}
    sx={{
      p: 2,
      alignContent: "center",
      justifyContent: "center",
      backgroundColor: (theme) => alpha(theme.palette.primary.dark, 0.5),
      borderRadius: 1,
      height: "auto",
      mt: 1,
    }}
  >
    <Typography variant="body1" textAlign="start">
      {content}
    </Typography>
  </Stack>
));

const HumanMessage = memo(({ message, selectedId, messageRef }) => (
  <Stack
    ref={messageRef}
    sx={{
      p: 2,
      height: 50,
      m: 1,
      alignContent: "center",
      justifyContent: "center",
      borderWidth: message?.id === selectedId ? 8 : 0,
      borderRadius: "5px 15px 15px 5px",
      borderStyle: message?.id === selectedId ? "none solid none none" : "none",
      borderColor: (theme) =>
        message?.id === selectedId ? theme.palette.warning.main : "transparent",
      backgroundColor: (theme) =>
        message?.id === selectedId ? alpha(theme.palette.warning.main, 0.3) : 0,
      animation: message?.id === selectedId ? `${pulse} 1.2s` : "none",
    }}
  >
    <Typography variant="body1" textAlign="end">
      {message.content}
    </Typography>
  </Stack>
));

const LoadingMessage = memo(() => (
  <Stack
    sx={{
      p: 2,
      height: 50,
      backgroundColor: (theme) => alpha(theme.palette.primary.dark, 0.5),
      borderRadius: 1,
    }}
  >
    <Iconify icon="svg-spinners:tadpole" sx={{ width: 25, height: 25 }} />
  </Stack>
));

const MessageList = memo(
  ({ messages, selectedId, messagesEndRef, highlightedMessage }) => (
    <>
      <AIMessage content="Hi, How can I help you today?" />
      {messages.map((item, index) => {
        const isLastMessage = index === messages.length - 1;
        const isSelected = item.id === selectedId;

        return item.role === "USER" ? (
          <HumanMessage
            key={item.id || index}
            message={item}
            selectedId={selectedId}
            messageRef={isSelected ? highlightedMessage : undefined}
          />
        ) : (
          <AIMessage
            key={item.id || index}
            content={item.content}
            messageRef={isLastMessage ? messagesEndRef : undefined}
          />
        );
      })}
    </>
  )
);

const Head = memo(({ title, mute, changeMute, handleClose, readOnly }) => (
  <Box sx={styles.header}>
    <Box sx={{ marginRight: "auto", color: "white" }}>{title}</Box>
    {!readOnly && (
      <IconButton onClick={changeMute}>
        <Iconify
          icon={
            mute
              ? "solar:volume-cross-bold-duotone"
              : "solar:volume-loud-bold-duotone"
          }
          sx={{ width: 22, height: 22 }}
        />
      </IconButton>
    )}
    <IconButton onClick={handleClose}>
      <Iconify
        icon="solar:close-circle-line-duotone"
        sx={{ width: 26, height: 26 }}
      />
    </IconButton>
  </Box>
));

const PopChat = ({
  selectedConversationId,
  title,
  open,
  handleClose,
  handleNewUserMessage,
  history = [],
  readOnly,
  closeButton,
  //eslint-disable-next-line
  sx,
}) => {
  const [aiResponded] = useEvent("AI_RESPONDED", null);
  const [conversationSent] = useEvent("CONVERSATION_SENT", null);
  const [supervisingAnswered, setSupervisingAnswered] = useEvent(
    "SUPERVISING_ANSWERED",
    null
  );

  const [messages, setMessages] = useState([]);
  const [mute, setMute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [supervisorLoading, setSupervisorLoading] = useState(false);

  const [play] = useSound(MessageSfx);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const highlightedMessage = useRef(null);

  const scrollToBottom = useCallback(() => {
    highlightedMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const handleSend = useCallback(
    (messageContent) => {
      if (!messageContent.trim()) return;

      setMessages((prev) => [
        ...prev,
        { content: messageContent, role: "USER" },
      ]);
      handleNewUserMessage(messageContent);
      !mute && play();
      setLoading(true);
      setSupervisorLoading(false);
    },
    [handleNewUserMessage, mute, play]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const content = inputRef.current?.value?.trim();
        if (content) {
          handleSend(content);
          inputRef.current.value = "";
        }
      }
    },
    [handleSend]
  );

  const changeMute = useCallback(() => {
    setMute((prev) => !prev);
  }, []);

  useEffect(() => {
    response((ret) => {
      setMessages((prev) => [...prev, { content: ret, role: "AI" }]);
      setLoading(false);
      setSupervisorLoading(false);
    });
  }, []);

  useEffect(() => {
    setMessages(history);
  }, [history]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, aiResponded, scrollToBottom]);

  useEffect(() => {
    if (selectedConversationId) {
      scrollToBottom();
    }
  }, [selectedConversationId, scrollToBottom]);

  useEffect(() => {
    if (aiResponded !== null) {
      setLoading(false);
      setSupervisorLoading(false);
      !mute && play();
    }
  }, [aiResponded, mute, play]);

  useEffect(() => {
    if (supervisingAnswered) {
      setSupervisorLoading(true);
    }
  }, [supervisingAnswered]);

  useEffect(() => {
    return () => {
      setSupervisorLoading(false);
      setSupervisingAnswered("SUPERVISING_ANSWERED", null);
    };
  }, [setSupervisingAnswered]);

  const renderIndicator = useCallback(() => {
    if (conversationSent?.createdAt > aiResponded?.createdAt) return true;
    if (loading || supervisorLoading) return true;
    if (conversationSent && aiResponded === null) return true;
    return false;
  }, [conversationSent, aiResponded, loading, supervisorLoading]);

  if (!open) return null;

  return (
    <Draggable>
      <Box sx={readOnly ? styles.readOnlyBoxHeader : styles.boxHeader}>
        <Head
          title={title}
          mute={mute}
          changeMute={changeMute}
          handleClose={handleClose}
          readOnly={readOnly}
        />

        <Stack
          sx={{
            height: "100%",
            width: "100%",
            p: 1,
            overflowY: "auto",
            overflowX: "hidden",
            flexDirection: "column",
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: 2,
            borderRadius: readOnly ? "0px 0px 7px 7px" : "0px",
          }}
        >
          <Scrollbar sx={{ height: "100%" }}>
            <MessageList
              messages={messages}
              selectedId={selectedConversationId}
              messagesEndRef={messagesEndRef}
              highlightedMessage={highlightedMessage}
            />
            {renderIndicator() && <LoadingMessage />}
          </Scrollbar>
        </Stack>

        {!readOnly && (
          <Box
            sx={{
              width: "100%",
              p: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
              boxShadow: 20,
              borderRadius: "0px 0px 7px 7px",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                variant="outlined"
                autoComplete="off"
                fullWidth
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        const content = inputRef.current?.value?.trim();
                        if (content) {
                          handleSend(content);
                          inputRef.current.value = "";
                        }
                      }}
                    >
                      <Iconify
                        icon="material-symbols:send"
                        sx={{
                          width: 22,
                          height: 22,
                          color: (theme) =>
                            inputRef.current?.value
                              ? alpha(theme.palette.primary.main, 0.6)
                              : "inherit",
                        }}
                      />
                    </IconButton>
                  ),
                }}
              />
            </Stack>
          </Box>
        )}

        <Box
          sx={{ width: "100%", p: 1, display: "flex", justifyContent: "end" }}
        >
          <Fab
            className="handle"
            onClick={closeButton ? handleClose : undefined}
            sx={{ cursor: "pointer" }}
            color="primary"
          >
            <Iconify
              icon="solar:chat-round-bold-duotone"
              sx={{ width: 36, height: 36 }}
            />
          </Fab>
        </Box>
      </Box>
    </Draggable>
  );
};

export default memo(PopChat);

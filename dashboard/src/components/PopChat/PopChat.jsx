import "regenerator-runtime";

import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import MessageSfx from "./messageSFX.mp3";
import { Scrollbar } from "@nucleoidai/platform/minimal/components";
import Stack from "@mui/material/Stack";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { alpha } from "@mui/material/styles";
import styles from "./styles";
import { useEvent } from "@nucleoidai/react-event";
import useSound from "use-sound";

import { Box, Fab, IconButton, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const sub = { item: null };
const response = (res) => {
  sub.item = res;
};

export const handleAddResponseMessage = (ret) => {
  sub.item(ret);
};

const PopChat = ({
  title,
  open,
  closeButton,
  handleClose,
  handleNewUserMessage,
  history = [],
  readOnly,
  sx,
}) => {
  const [aiResponded] = useEvent("AI_RESPONDED", null);
  const [conversationSent] = useEvent("CONVERSATION_SENT", null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mute, setMute] = useState(false);

  const [play] = useSound(MessageSfx);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const messagesEndRef = React.useRef(null);
  const [listen, setListen] = React.useState(false);

  const draggableRef = React.useRef(null);

  useEffect(() => {
    setMessages([...history]);
  }, [history]);

  React.useEffect(() => {
    response((ret) => {
      setMessages([...messages, { content: ret, role: "AI" }]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, open, aiResponded]);

  React.useEffect(() => {
    listen
      ? SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        })
      : SpeechRecognition.stopListening();
  }, [listen]);

  const handleSend = useCallback(() => {
    setMessages([
      ...messages,
      { content: message || transcript, role: "USER" },
    ]);
    handleNewUserMessage(message);
    setMessage("");
    resetTranscript();
    !mute && play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNewUserMessage, messages, message, transcript]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleSend]
  );

  const changeMute = () => {
    setMute(!mute);
  };

  const chatButtonClick = () => {
    return closeButton ? handleClose() : false;
  };

  const listenUser = () => {
    setListen(!listen);
  };

  useEffect(() => {
    if (aiResponded !== null && !mute) {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiResponded]);

  const renderIndicator = () => {
    if (conversationSent?.createdAt > aiResponded?.createdAt) {
      return true;
    }
    if (conversationSent && aiResponded === null) {
      return true;
    } else {
      return false;
    }
  };

  if (readOnly) {
    return (
      <Draggable nodeRef={draggableRef}>
        <Box
          ref={draggableRef}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "650px",
            width: "500px",
            zIndex: 99999,
            ...sx,
          }}
        >
          <Stack
            sx={{
              borderRadius: 1,
              height: "100%",
              width: "100%",
              p: 1,
              overflowY: "auto",
              overflowX: "hidden",
              flexDirection: "column",
              backgroundColor: (theme) => theme.palette.background.paper,
              boxShadow: 2,
            }}
          >
            <Scrollbar>
              <Stack
                sx={{
                  p: 2,
                  height: 50,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.dark, 0.5),
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" textAlign={"start"}>
                  Hi, How can I help you today?
                </Typography>
              </Stack>
              {messages.map((item, index) =>
                item.role === "USER" ? (
                  <Stack
                    key={`${item.role}-${index}`}
                    sx={{
                      p: 2,
                      height: 50,
                      borderRadius: 1,
                      m: 1,
                    }}
                  >
                    <Typography variant="body1" textAlign={"end"}>
                      {item.content}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack
                    ref={messagesEndRef}
                    key={`${item.role}-${index}`}
                    sx={{
                      p: 2,
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.dark, 0.5),
                      borderRadius: 1,
                      height: "auto",
                    }}
                  >
                    <Typography variant="body1" textAlign={"start"}>
                      {item.content}
                    </Typography>
                  </Stack>
                )
              )}
              {renderIndicator() ? (
                <Stack
                  sx={{
                    p: 2,
                    height: 50,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.dark, 0.5),
                    borderRadius: 1,
                  }}
                >
                  <Iconify
                    icon="svg-spinners:tadpole"
                    sx={{ width: 25, height: 25 }}
                  />
                </Stack>
              ) : null}
            </Scrollbar>
          </Stack>
        </Box>
      </Draggable>
    );
  }

  if (open) {
    return (
      <Draggable nodeRef={draggableRef}>
        <Box
          ref={draggableRef}
          sx={styles.boxHeader}
          style={{
            borderRadius: "7px 7px 0px 0px",
          }}
        >
          {/* header */}
          <Box sx={styles.header}>
            <Box sx={{ marginRight: "auto", color: `white` }}>{title}</Box>
            <IconButton onClick={changeMute}>
              {mute ? (
                <VolumeOffIcon sx={{ color: "white" }} />
              ) : (
                <VolumeUpIcon sx={{ color: "white" }} />
              )}
            </IconButton>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          {/* content */}
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
            }}
          >
            <Scrollbar>
              <Stack
                sx={{
                  p: 2,
                  height: 50,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.dark, 0.5),
                  borderRadius: 1,
                }}
              >
                <Typography variant="body1" textAlign={"start"}>
                  Hi, How can I help you today?
                </Typography>
              </Stack>
              {messages.map((item, index) =>
                item.role === "USER" ? (
                  <Stack
                    key={`${item.role}-${index}`}
                    sx={{
                      p: 2,
                      height: 50,
                      borderRadius: 1,
                      m: 1,
                    }}
                  >
                    <Typography variant="body1" textAlign={"end"}>
                      {item.content}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack
                    ref={messagesEndRef}
                    key={`${item.role}-${index}`}
                    sx={{
                      p: 2,
                      backgroundColor: (theme) =>
                        alpha(theme.palette.primary.dark, 0.5),
                      borderRadius: 1,
                      height: "auto",
                    }}
                  >
                    <Typography variant="body1" textAlign={"start"}>
                      {item.content}
                    </Typography>
                  </Stack>
                )
              )}
              {renderIndicator() ? (
                <Stack
                  sx={{
                    p: 2,
                    height: 50,
                    backgroundColor: (theme) =>
                      alpha(theme.palette.primary.dark, 0.5),
                    borderRadius: 1,
                  }}
                >
                  <Iconify
                    icon="svg-spinners:tadpole"
                    sx={{ width: 25, height: 25 }}
                  />
                </Stack>
              ) : null}
            </Scrollbar>
          </Stack>
          {/*footer */}
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
                fullWidth
                autoComplete="off"
                value={message}
                InputProps={{
                  startAdornment: browserSupportsSpeechRecognition && (
                    <IconButton onClick={listenUser}>
                      <Iconify
                        icon={
                          listen ? "mingcute:mic-fill" : "mingcute:mic-line"
                        }
                        sx={{ width: 22, height: 22 }}
                      />
                    </IconButton>
                  ),
                  endAdornment: (
                    <IconButton onClick={handleSend}>
                      <Iconify
                        icon={"material-symbols:send"}
                        sx={{
                          width: 22,
                          height: 22,
                          color: (theme) =>
                            message
                              ? alpha(theme.palette.primary.main, 0.6)
                              : "inherit",
                        }}
                      />
                    </IconButton>
                  ),
                }}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </Stack>
          </Box>
          {/*button */}
          <Box
            sx={{ width: "100%", p: 1, display: "flex", justifyContent: "end" }}
          >
            <Fab className="handle" onClick={chatButtonClick}>
              <Iconify
                icon="solar:chat-round-bold-duotone"
                sx={{ width: 36, height: 36 }}
              />
            </Fab>
          </Box>
        </Box>
      </Draggable>
    );
  } else {
    return null;
  }
};

export default PopChat;

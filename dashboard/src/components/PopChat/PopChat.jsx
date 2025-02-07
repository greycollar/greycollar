import "regenerator-runtime";

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

import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const sub = { item: null };
const response = (res) => {
  sub.item = res;
};

export const handleAddResponseMessage = (ret) => {
  sub.item(ret);
};

const PopChat = ({
  selectedConversationId,
  title,
  open,
  handleClose,
  handleNewUserMessage,
  history = [],
  readOnly,
  //eslint-disable-next-line
  sx,
}) => {
  const [aiResponded] = useEvent("AI_RESPONDED", null);
  const [conversationSent] = useEvent("CONVERSATION_SENT", null);
  const [supervisingAnswered, setSupervisingAnswered] = useEvent(
    "SUPERVISING_ANSWERED",
    null
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mute, setMute] = useState(false);

  const [loading, setLoading] = useState(false);
  const [supervisorLoading, setSupervisorLoading] = useState(false);

  const [play] = useSound(MessageSfx);
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  const messagesEndRef = React.useRef(null);
  const higlihtedMessage = React.useRef(null);

  const [listen, setListen] = React.useState(false);

  useEffect(() => {
    setMessages([...history]);
  }, [history]);

  useEffect(() => {
    response((ret) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: ret, role: "AI" },
      ]);
      setLoading(false);
      setSupervisorLoading(false);
    });
  }, []);

  useEffect(() => {
    if (aiResponded !== null) {
      setLoading(false);
      setSupervisorLoading(false);
    }
  }, [aiResponded]);

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

  useEffect(() => {
    return () => {
      setSupervisorLoading(false);
      setSupervisingAnswered("SUPERVISING_ANSWERED", null);
    };
  }, [setSupervisingAnswered]);

  const scrollToBottom = () => {
    higlihtedMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, aiResponded]);

  useEffect(() => {
    if (selectedConversationId) {
      higlihtedMessage.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    listen
      ? SpeechRecognition.startListening({
          continuous: true,
          language: "en-US",
        })
      : SpeechRecognition.stopListening();
  }, [listen]);

  const handleSend = useCallback(() => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: message || transcript, role: "USER" },
    ]);
    handleNewUserMessage(message);
    setMessage("");
    resetTranscript();
    !mute && play();
    setLoading(true);
    setSupervisorLoading(false);
    setSupervisorLoading(false);
  }, [handleNewUserMessage, message, transcript, mute, play, resetTranscript]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const changeMute = () => {
    setMute(!mute);
  };

  const listenUser = () => {
    setListen(!listen);
  };

  useEffect(() => {
    if (aiResponded !== null && !mute) {
      play();
    }
  }, [aiResponded, mute, play]);

  const renderIndicator = () => {
    if (conversationSent?.createdAt > aiResponded?.createdAt) {
      return true;
    }
    if (loading || supervisorLoading) {
      return true;
    }
    if (conversationSent && aiResponded === null) {
      return true;
    } else {
      return false;
    }
  };

  const LoadingMessage = () => (
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
  );

  const AIMessage = ({ message }) => (
    <Stack
      ref={messagesEndRef}
      key={message.id}
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
      <Typography variant="body1" textAlign={"start"}>
        {message.content}
      </Typography>
    </Stack>
  );

  const HumanMessage = ({ message }) => (
    <Stack
      key={message.id}
      ref={message?.id === selectedConversationId ? higlihtedMessage : null}
      sx={{
        p: 2,
        height: 50,
        m: 1,
        alignContent: "center",
        justifyContent: "center",
        borderWidth: message?.id === selectedConversationId ? 8 : 0,
        borderRadius: "5px 15px 15px 5px",
        borderStyle:
          message?.id === selectedConversationId
            ? "none solid none none"
            : "none",
        borderColor:
          message?.id === selectedConversationId
            ? (theme) => theme.palette.warning.main
            : "transparent",
        backgroundColor:
          message?.id === selectedConversationId
            ? (theme) => alpha(theme.palette.warning.main, 0.3)
            : 0,
        animation:
          message?.id === selectedConversationId ? `${pulse} 1.2s` : "none",
      }}
    >
      <Typography variant="body1" textAlign={"end"}>
        {message.content}
      </Typography>
    </Stack>
  );

  const MessageList = ({ messages }) => (
    <>
      <AIMessage message={{ content: "Hi, How can I help you today?" }} />
      {messages.map((item) =>
        item.role === "USER" ? (
          <HumanMessage key={item.id} message={item} />
        ) : (
          <AIMessage key={item.id} message={item} />
        )
      )}
    </>
  );

  const Head = () => (
    <Box
      sx={styles.header}
      style={{
        borderRadius: "7px 7px 0px 0px",
      }}
    >
      <Box sx={{ marginRight: "auto", color: `white` }}>{title}</Box>
      {readOnly ? null : (
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
  );

  if (open) {
    return (
      <Draggable>
        <Box sx={readOnly ? styles.readOnlyBoxHeader : styles.boxHeader}>
          <Head />
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
            <Scrollbar sx={{ height: "100%" }}>
              <MessageList messages={messages} />
              {renderIndicator() ? <LoadingMessage /> : null}
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
                  autoComplete={false}
                  fullWidth
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
          )}
        </Box>
      </Draggable>
    );
  } else {
    return null;
  }
};

export default PopChat;

import ActionMessageItem from "../../SystemMessage/SystemMessage";
import Box from "@mui/material/Box";
import ChatMessageItem from "./ChatMessageItem";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material"; // Add Skeleton
import { ReactEditor } from "slate-react";
import SystemMessage from "../../SystemMessage/SystemMessage";
import { Types } from "./CommandArea/chat.config";
import { useEvent } from "@nucleoidai/react-event";

import { Label, Scrollbar } from "@nucleoidai/platform/minimal/components";
import { memo, useEffect, useRef } from "react";

const ChatMessageContent = memo(function ChatMessageList({
  user,
  messages,
  replied,
  editor,
  selectedMessage,
  isReplying,
  setIsReplying,
}) {
  const messagesEndRef = useRef(null);
  const [event] = useEvent("KNOWLEDGE_STATUS_CHANGED", null);

  const handleClick = (message) => {
    setIsReplying(true);
    selectedMessage.current = message;
    scrollMessagesToBottom();
    ReactEditor.focus(editor);
  };

  useEffect(() => {
    scrollMessagesToBottom();
  }, [messages]);

  const scrollMessagesToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const Colors = Types.reduce(
    (colors, type) => {
      colors[type.name] = type.replyColor;
      return colors;
    },
    { default: "rgba(69, 79, 91, .5)" }
  );

  const titles = selectedMessage.current?.mode || selectedMessage.current?.role;

  const renderMessages = (message) => {
    if (!message) return null;

    switch (message.role) {
      case "SYSTEM": {
        const type = message.mode;
        return (
          <SystemMessage
            key={message.id}
            id={message.id}
            type={type}
            message={message}
            loading={false}
            handleClick={() => handleClick(message)}
          />
        );
      }
      case "ASSISTANT":
        return (
          <ChatMessageItem
            key={message.id}
            content={message.content}
            message={message}
            handleClick={() => handleClick(message)}
            isAI={message.role === "ASSISTANT"}
            user={user}
          />
        );
      case "USER":
        return (
          <ChatMessageItem
            key={message.id}
            replied={replied}
            message={message}
            messages={messages}
            handleClick={() => handleClick(message)}
            content={message.content}
            isAI={message.role === "ASSISTANT"}
            user={user}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message, index) => renderMessages(message, index))}
          {event !== null && (
            <ActionMessageItem
              loading={event.status === "IN_PROGRESS" ? true : false}
              action={event}
            />
          )}
        </Box>
      </Scrollbar>
      {isReplying && (
        <>
          <Label
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 20px",
              fontSize: "14px",
              borderRadius: "5px",
              backgroundColor:
                Colors[selectedMessage.current?.mode] || Colors.default,
              color: "grey",
            }}
          >
            <span>Replying to {titles}</span>
            <IconButton onClick={() => setIsReplying(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Label>
        </>
      )}
    </>
  );
});

export default ChatMessageContent;

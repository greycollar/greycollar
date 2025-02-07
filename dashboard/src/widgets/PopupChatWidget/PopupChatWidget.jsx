import { Iconify } from "@nucleoidai/platform/minimal/components";
import PopChat from "../../components/PopChat";
import { useEvent } from "@nucleoidai/react-event";
import useSession from "../../hooks/useSession";
import { v4 as uuidv4 } from "uuid";

import { Badge, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const PopupChatWidget = ({
  readOnly,
  conversationId,
  openPopChat,
  setOpenPopChat,
  sessionId,
}) => {
  const { colleagueId } = useParams();
  const [open, setOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const { conversations, sendMessage, getSession } = useSession(colleagueId);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [aiResponded] = useEvent("AI_RESPONDED", null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversations.length > 0) {
      setMessages(conversations);
    }
  }, [conversations]);

  useEffect(() => {
    if (aiResponded !== null) {
      setUnreadMessages(true);
    }
  }, [aiResponded]);

  useEffect(() => {
    if (openPopChat && sessionId) {
      getSession(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPopChat, sessionId]);

  useEffect(() => {
    if (open && !search) {
      const id = uuidv4();
      navigate(pathname + "?sessionId=" + id);
      //  createSession(id, colleagueId, "CHAT");
    } else if (openPopChat) {
      const sessionId = searchParams.get("sessionId");
      getSession(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleNewUserMessage = async (content) => {
    const newMessage = {
      role: "USER",
      content,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    sendMessage(content);
  };

  const handleClose = () => {
    openPopChat ? setOpenPopChat(false) : setOpen(false);
    setUnreadMessages(false);
  };

  return (
    <>
      <PopChat
        title={`Async Chat Session`}
        open={openPopChat || open}
        handleClose={handleClose}
        history={messages}
        handleNewUserMessage={handleNewUserMessage}
        color="appTheme"
        readOnly={readOnly}
        selectedConversationId={conversationId || null}
      />
      {!open && !readOnly && (
        <Fab onClick={() => setOpen(!open)} cursor="pointer" size="small">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            color="success"
            overlap="circular"
            badgeContent=" "
            invisible={!unreadMessages}
          >
            <Iconify
              icon={
                open ? "solar:chat-round-bold-duotone" : "solar:chat-round-bold"
              }
              sx={{ width: 24, height: 24 }}
            />
          </Badge>
        </Fab>
      )}
    </>
  );
};

export default PopupChatWidget;

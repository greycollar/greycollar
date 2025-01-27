import { Iconify } from "@nucleoidai/platform/minimal/components";
import PopChat from "../../components/PopChat";
import { useEvent } from "@nucleoidai/react-event";
import { useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";

import { Badge, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";

const PopupChatWidget = ({ readOnly }) => {
  const { colleagueId } = useParams();
  const [open, setOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(false);
  const { conversations, sendMessage } = useSession(colleagueId);
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
    if (readOnly) {
      setOpen(true);
    }
  }, [readOnly]);

  const handleNewUserMessage = async (content) => {
    const newMessage = {
      role: "USER",
      content,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    sendMessage(content);
  };

  const handleClose = () => {
    setOpen(false);
    setUnreadMessages(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <PopChat
        title={`Practice Chat`}
        open={open}
        handleClose={handleClose}
        closeButton={true}
        history={messages}
        handleNewUserMessage={handleNewUserMessage}
        color="appTheme"
        readOnly={readOnly}
      />
      {!open && (
        <Fab onClick={handleOpen} cursor="pointer" size="small">
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
              icon="solar:chat-round-bold-duotone"
              sx={{ width: 24, height: 24 }}
            />
          </Badge>
        </Fab>
      )}
    </>
  );
};

export default PopupChatWidget;

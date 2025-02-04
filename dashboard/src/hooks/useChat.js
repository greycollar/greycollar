import http from "../http";
import useApi from "./useApi";
import { useLocation } from "react-router-dom";
import useMessage from "./useMessage";

import { publish, useEvent } from "@nucleoidai/react-event";
import { useCallback, useEffect, useRef, useState } from "react";

function useChat() {
  const [messages, setMessages] = useState([
    {
      role: "",
      content: "",
      colleagueId: "",
      createdAt: "",
      userId: "",
      command: "",
      knowledgeId: "",
    },
  ]);

  const location = useLocation();

  const onChatPage = location.pathname === "/chat";

  const { getMessagesByDate, updateMessageStatus } = useMessage();

  const { loading, error, handleResponse } = useApi();

  const [messageCreated] = useEvent("MESSAGE_CREATED", null);
  const [supervisingAnswered] = useEvent("SUPERVISING_ANSWERED", null);
  const [taskStatus] = useEvent("TASK_STATUS_CHANGED", null);
  const [taskCreated] = useEvent("TASK_CREATED", null);

  // TODO - Research self-call events

  useEffect(() => {
    getMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageCreated, supervisingAnswered, taskStatus, taskCreated]);

  const intervalId = useRef();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (messages.length > 0) {
        let lastMessageDate = null;
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].status === "READ") {
            lastMessageDate = messages[i].createdAt;
            break;
          }
        }
        getMessagesByDate(lastMessageDate);
        if (onChatPage && !document.hidden) {
          updateMessageStatus(lastMessageDate);
        }
      }
    }, 2000);

    return () => clearInterval(intervalId.current);
  });

  const getMessages = useCallback(() => {
    handleResponse(http.get(`/messages`), (response) => {
      const sortedMessages = response.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(sortedMessages);
      publish("MESSAGES_LOADED", { messages: sortedMessages });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    messages,
    loading,
    error,
  };
}

export default useChat;

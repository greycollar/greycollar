import { AIMessage } from "./AIMessage";
import { HumanMessage } from "./HumanMessage";

import React, { memo } from "react";

const MessageList = memo(
  ({
    messages,
    selectedId,
    messagesEndRef,
    highlightedMessage,
  }: {
    messages: { id: string; content: string; role: string }[];
    selectedId: string;
    messagesEndRef: { current: HTMLDivElement | null };
    highlightedMessage: { current: HTMLDivElement | null };
  }) => (
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

export { MessageList };

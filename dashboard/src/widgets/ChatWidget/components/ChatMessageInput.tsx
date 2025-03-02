import CommandArea from "./CommandArea/CommandArea.jsx";
import { Commands } from "./CommandArea/chat.config.js";
/* eslint-disable */
import IconButton from "@mui/material/IconButton";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import Stack from "@mui/material/Stack";
import { Types } from "./CommandArea/chat.config.js";
import { sub } from "date-fns";
import { v4 as uuid } from "uuid";

import { memo, useCallback, useRef } from "react";

const ChatMessageInput = memo(function ChatMessageInput({
  disabled,
  onSendMessage,
  editor,
  selectedMessage,
  replied,
  createMessage,
  userId,
}: {
  disabled: boolean;
  onSendMessage: (message: string | { command: Event }) => void;
  editor: [];
  selectedMessage: { current: { type: string } };
  replied: { current: boolean };
  createMessage: (message: string) => void;
  userId: string;
}) {
  const fileRef = useRef(null);

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const messageRef = useRef("");

  const handleChangeMessage = useCallback((event) => {
    messageRef.current = event[0].children[0].text;
  }, []);

  const handleSendMessage = useCallback(
    async (event) => {
      if (event.key === "Enter") {
        try {
          if (event.target.value instanceof Map) {
            onSendMessage({ command: event.target.value });
          } else if (selectedMessage.current) {
            const messageType = selectedMessage.current.type;
            const typeObject = Types.find((type) => type.name === messageType);

            if (typeObject && typeObject.replyAction) {
              const message = messageRef.current;
              await typeObject.replyAction(selectedMessage.current, message);
              onSendMessage(message);
            } else {
              onSendMessage(messageRef.current);
            }
            replied.current = true;
            messageRef.current = "";
            selectedMessage.current = null;
          } else {
            onSendMessage(messageRef.current);
          }

          messageRef.current = "";
        } catch (error) {
          console.error(error);
        }
      }
    },
    [onSendMessage]
  );

  return (
    <>
      <CommandArea
        createMessage={createMessage}
        userId={userId}
        editor={editor}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        chatCommands={Commands}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          display: "flex",
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: "none" }} />
    </>
  );
});

export default ChatMessageInput;

import ChatCommands from "../../../widgets/ChatWidget/ChatCommands";
import CommandDropdown from "./CommandDropdown";
import Element from "./Element";
import Grow from "@mui/material/Grow";
import Popover from "@mui/material/Popover";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useEvent } from "@nucleoidjs/synapses";

import { Box, IconButton } from "@mui/material";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import React, { useCallback, useState } from "react";
import { Transforms, createEditor } from "slate";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const insertBox = (editor, arg) => {
  const box = {
    type: "box",
    prompt: arg,
    content: "",
    children: [{ text: "" }],
  };

  Transforms.insertText(editor, " ");
  Transforms.move(editor);
  Transforms.insertText(editor, "\u200B");
  Transforms.move(editor, { distance: 1, reverse: true });
  Transforms.insertNodes(editor, box);
};

const extractTextFromNodes = (nodes) => {
  let text = "";

  nodes.forEach((node) => {
    if (node.text) {
      text += node.text;
    } else if (node.children) {
      text += extractTextFromNodes(node.children);
    }
  });

  return text;
};

const withInlines = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "box" ? true : isInline(element);
  };

  return editor;
};

function MessageInput({ handleNewUserMessage }) {
  const [learned] = useEvent("LEARNED", { loading: false });
  const [editor] = useState(() => withInlines(withReact(createEditor())));
  const [showCommands, setShowCommands] = useState(false);
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);
  const [editorEmpty, setEditorEmpty] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState();

  React.useEffect(() => {
    if (learned.loading === true) {
      setTimeout(() => {
        setPopoverOpen(true);
      }, 1000);

      setTimeout(() => {
        setPopoverOpen(false);
      }, 3000);
    }
  }, [learned.loading]);

  const handleSend = useCallback(() => {
    const content = extractTextFromNodes(editor.children[0].children);
    handleNewUserMessage(content);
    Transforms.delete(editor, { at: [0], unit: "block" });
    Transforms.insertNodes(editor, initialValue[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      } else if (event.key === "Tab") {
        event.preventDefault();
        const content = extractTextFromNodes(editor.children[0].children);
        const command = ChatCommands.find((c) =>
          content.trim().startsWith(c.command)
        );
        if (
          command &&
          command.inputs &&
          command.inputs[currentInputIndex + 1]
        ) {
          insertBox(editor, command.inputs[currentInputIndex + 1].title);
          setCurrentInputIndex(currentInputIndex + 1);
        }
      } else if (event.key === "/") {
        const content = extractTextFromNodes(editor.children[0].children);
        if (content.endsWith("/")) {
          setShowCommands(true);
        } else {
          setShowCommands(false);
        }
      }
    },
    [editor, currentInputIndex, handleSend]
  );

  const handleKeyUp = useCallback(() => {
    const content = editor.children[0].children.map((n) => n.text).join("");
    if (content.endsWith("/")) {
      setShowCommands(true);
    } else {
      setShowCommands(false);
    }
  }, [editor.children]);

  const handleCommandSelect = (command) => {
    Transforms.insertText(editor, command.name.replace(/^\//, ""));

    if (command.inputs && command.inputs[0]) {
      insertBox(editor, command.inputs[0].title);
      setCurrentInputIndex(0);
    }
    setShowCommands(false);
    ReactEditor.focus(editor);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderTop: "1px solid #202225",
        bgcolor: (theme) => alpha(theme.palette.grey[800], 0.8),
      }}
    >
      <>
        <div
          style={{
            position: "relative",
            flexGrow: 1,
          }}
        >
          {showCommands && (
            <CommandDropdown
              commands={ChatCommands}
              onSelect={handleCommandSelect}
            />
          )}
          <Slate
            editor={editor}
            initialValue={initialValue}
            onChange={() => {
              const content = extractTextFromNodes(editor.children[0].children);
              if (content.trim().length === 0) {
                setEditorEmpty(true);
              } else {
                setEditorEmpty(false);
              }
            }}
          >
            <Editable
              readOnly={false}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              renderElement={Element}
              data-testid="message-input"
              style={{
                flexGrow: 1,
                borderRadius: "25px",
                bgcolor: (theme) => alpha(theme.palette.info[600], 0.8),
                padding: "10px 14px",
                outline: "none",
                minWidth: 0,
                color: "white",
                fontFamily: "inherit",
                fontSize: "inherit",
                border: "1px solid #40444B",
                borderColor: learned.loading ? "#103996" : "#40444B",
                "&:focus": {
                  borderColor: "#7289da",
                },
              }}
            />
          </Slate>
        </div>
        <IconButton
          data-testid="send-button"
          onClick={handleSend}
          color="primary"
          disabled={editorEmpty}
          sx={{
            color: "#7289da",
          }}
        >
          <SendIcon />
        </IconButton>
      </>
      <Popover
        open={popoverOpen}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 620, left: 190 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        TransitionComponent={Grow}
      >
        <Stack
          sx={{
            p: 2,
            borderRadius: 1,
            width: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: (theme) => theme.palette.primary.dark,
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Learned Succesfuly !
          </Typography>
        </Stack>
      </Popover>
    </Box>
  );
}

export default MessageInput;

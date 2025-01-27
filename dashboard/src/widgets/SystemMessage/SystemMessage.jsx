import KnowledgeMessage from "./KnowledgeMessage";
import SupervisingMessage from "./SupervisingMessage";
import SystemLoadedMessage from "./SystemLoadedMessage";
import SystemLoadingMessage from "./SystemLoadingMessage";
import TaskMessage from "./TaskMessage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Stack, Typography, alpha } from "@mui/material";

const typeStyles = {
  KNOWLEDGE: {
    title: "Knowledge",
    background: (theme) => alpha(theme.palette.info.dark, 0.6),
    borderColor: (theme) => alpha(theme.palette.info.dark, 0.6),
  },
  SUPERVISING: {
    title: "Supervising",
    background: (theme) => alpha(theme.palette.primary.dark, 0.6),
    borderColor: (theme) => alpha(theme.palette.primary.dark, 0.6),
  },
  TASK: {
    title: "Task",
    background: (theme) => alpha(theme.palette.secondary.dark, 0.6),
    borderColor: (theme) => alpha(theme.palette.secondary.dark, 0.6),
  },
  DEFAULT: {
    title: "System",
    background: (theme) => alpha(theme.palette.success.dark, 0.1),
    borderColor: (theme) => alpha(theme.palette.success.dark, 0.1),
  },
};

function SystemMessage({ loading, type, id, message, handleClick }) {
  const currentTypeStyle = typeStyles[type] || typeStyles.DEFAULT;
  const [createdAt, setCreatedAt] = useState(null);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm")); // 0 - 600
  const smAndMd = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600 - 900

  const renderMessage = () => {
    switch (type) {
      case "KNOWLEDGE":
        return (
          <KnowledgeMessage
            handleClick={() => handleClick()}
            id={id}
            onDateFetched={(date) => setCreatedAt(date)}
          />
        );
      case "SUPERVISING":
        return (
          <SupervisingMessage
            handleClick={() => handleClick()}
            id={id}
            onDateFetched={(date) => setCreatedAt(date)}
          />
        );
      case "TASK":
        return (
          <TaskMessage
            handleClick={() => handleClick()}
            id={id}
            onDateFetched={(date) => setCreatedAt(date)}
          />
        );
      default:
        return loading ? (
          <SystemLoadingMessage message={message} />
        ) : (
          <SystemLoadedMessage
            message={message}
            command={message?.command}
            handleClick={() => handleClick()}
            onDateFetched={(date) => setCreatedAt(date)}
          />
        );
    }
  };

  return (
    <Stack
      sx={{
        boxShadow: 5,
        borderStyle: "none none none solid",
        borderColor: currentTypeStyle.borderColor,
        backgroundColor: currentTypeStyle.background,
        width: smAndMd ? "87vw" : smDown ? "84vw" : "97%",
        ml: 2,
        p: 1,
        borderRadius: 1,
        justifyItems: "start",
        display: "flex",
        minWidth: 48,
        minHeight: 48,
        mt: 2.5,
      }}
    >
      <div data-cy="command-card">
        <Typography
          noWrap
          variant="caption"
          display={"flex"}
          sx={{
            mb: 0.5,
            ml: 0.5,
            color: "text.disabled",
          }}
        >
          {type !== "TASK" && type !== "KNOWLEDGE" && type !== "SUPERVISING" ? (
            <>
              {currentTypeStyle.title} <strong>{message?.command}</strong>
            </>
          ) : (
            currentTypeStyle.title
          )}{" "}
          <Typography
            noWrap
            variant="caption"
            sx={{
              ml: 1,
              color: "text.disabled",
            }}
          >
            {createdAt}
          </Typography>
        </Typography>

        <Stack
          data-cy="system-item"
          sx={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {renderMessage()}
        </Stack>
      </div>
    </Stack>
  );
}

export default SystemMessage;

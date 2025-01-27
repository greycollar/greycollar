import { Label } from "@nucleoidai/platform/minimal/components";
import ReplyIcon from "@mui/icons-material/Reply";
import SourcedAvatar from "../../components/SourcedAvatar/SourcedAvatar";
import { fDateTime } from "../../utils/formatTime";
import useColleague from "../../hooks/useColleague";
import { useEffect } from "react";
import useKnowledge from "../../hooks/useKnowledge";

import { Chip, IconButton, Stack, Typography, alpha } from "@mui/material";

function KnowledgeMessage({ id, handleClick, onDateFetched }) {
  const { knowledge } = useKnowledge(id);
  const { colleague } = useColleague(knowledge.colleagueId);

  useEffect(() => {
    if (knowledge) {
      onDateFetched(fDateTime(knowledge.createdAt));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [knowledge?.createdAt]);

  return (
    <Stack
      data-cy="knowledge-message"
      sx={{
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            p: 1.5,
            minWidth: 48,
            maxWidth: 750,
            borderRadius: 1,
            typography: "body2",
            color: "grey.800",
            background: (theme) => alpha(theme.palette.background.default, 1),
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Chip
              avatar={
                <SourcedAvatar
                  name={colleague.name}
                  source={"MINIMAL"}
                  avatarUrl={colleague.avatar}
                  sx={{ ml: 1, width: 18, height: 18 }}
                />
              }
              label={colleague.name}
              size="small"
              color="primary"
              variant="filled"
            />
            <Typography variant="body2" color="grey.500" sx={{ mx: 1 }}>
              {knowledge.status === "COMPLETED"
                ? "learned"
                : knowledge.status === "IN_PROGRESS"
                ? "is learning"
                : ""}
            </Typography>
            <Label
              sx={{
                backgroundColor: "rgba(2,136,209, .6)",
                color: "rgba(79,195,247, .6)",
              }}
            >
              {knowledge.type}
            </Label>
          </Stack>
        </Stack>

        {knowledge.status === "IN_PROGRESS" ? (
          <IconButton
            onClick={() => handleClick(knowledge)}
            data-cy="reply-button"
          >
            <ReplyIcon />
          </IconButton>
        ) : null}
      </Stack>

      <Typography
        noWrap
        variant="caption"
        sx={{
          color: "text.disabled",
        }}
      >
        {(() => {
          switch (knowledge.status) {
            case "IN_PROGRESS":
              return "Read";
            case "COMPLETED":
              return "Completed";
            default:
              return knowledge.status;
          }
        })()}
      </Typography>
    </Stack>
  );
}

export default KnowledgeMessage;

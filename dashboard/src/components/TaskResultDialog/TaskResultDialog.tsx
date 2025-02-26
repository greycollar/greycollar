import CodeBlock from "../CodeBlock/CodeBlock";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import InfoCard from "../InfoCard/InfoCard";
import { ResultTable } from "../ResultTable/ResultTable";
import { parseJsonResult } from "../../utils/formatters";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Switch,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

const TaskResultDialog = ({ open, setOpen, task }) => {
  const [viewMode, setViewMode] = useState("table");
  const { isJson, parsedResult } = parseJsonResult(task.result);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "table" ? "text" : "table"));
  }, []);

  const renderResult = () => {
    if (!isJson) {
      return <Typography variant="body1">{parsedResult}</Typography>;
    }

    return viewMode === "table" ? (
      <ResultTable data={parsedResult} />
    ) : (
      <CodeBlock>{JSON.stringify(parsedResult, null, 2)}</CodeBlock>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          textAlign: "center",
        }}
      >
        Task details
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Box>
          <InfoCard label="Comment" value={task.comment} />
          <InfoCard
            label="Status"
            value={task.status === "IN_PROGRESS" ? "In Progress" : "Done"}
          />
          <InfoCard
            label="Created At"
            value={new Date(task.createdAt).toLocaleTimeString()}
          />
          <InfoCard
            label="Result"
            sx={{ position: "relative" }}
            value={
              <>
                {isJson && (
                  <>
                    <Switch
                      checked={viewMode === "table"}
                      onChange={toggleViewMode}
                      color="background.paper"
                      sx={{
                        position: "absolute",
                        top: -5,
                        right: -12,
                        transform: "scale(0.8)",
                      }}
                    />
                    <Typography
                      variant="body2"
                      color={
                        viewMode === "table" ? "text.disabled" : "text.primary"
                      }
                      sx={{
                        position: "absolute",
                        top: 3,
                        right: 33,
                        transform: "scale(0.8)",
                      }}
                    >
                      JSON
                    </Typography>
                  </>
                )}
                {renderResult()}
              </>
            }
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TaskResultDialog;

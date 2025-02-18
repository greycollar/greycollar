import CodeBlock from "../CodeBlock/CodeBlock";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import { InfoCard } from "../InfoCard/InfoCard";
import { ResultTable } from "../ResultTable/ResultTable";
import { parseJsonResult } from "../../utils/formatters";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
                  <Button
                    size="small"
                    sx={{ position: "absolute", top: -5, right: 8 }}
                    onClick={toggleViewMode}
                  >
                    <Iconify
                      icon={
                        viewMode === "table"
                          ? "material-symbols:file-json-outline-sharp"
                          : "material-symbols:aod-tablet-outline"
                      }
                    />
                  </Button>
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

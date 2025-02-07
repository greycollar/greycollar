import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import SourcedAvatar from "../SourcedAvatar/SourcedAvatar";
import TaskIcon from "@mui/icons-material/Task";

import {
  AccordionDetails,
  Box,
  Card,
  Collapse,
  Fab,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const TaskCard = ({ task, getSteps, steps }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    getSteps(task.id);
  };

  return (
    <Box sx={{ mt: 2 }} data-cy="tasks-card">
      <Card sx={{ width: "60%", margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            gap: 1,
            borderRadius: 5,
            padding: 3,
            height: 250,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flex: 4,
                paddingTop: 2,
              }}
            >
              <SourcedAvatar
                variant="rounded"
                sx={{
                  width: 36,
                  height: 36,
                  mb: 1,
                  bgcolor: "primary.main",
                }}
              >
                <TaskIcon />
              </SourcedAvatar>

              <ListItemText
                primary={
                  <Typography color="inherit">{task.description}</Typography>
                }
                secondary={`Date: ${new Date(
                  task.createdAt
                ).toLocaleDateString()}`}
                primaryTypographyProps={{
                  typography: "subtitle1",
                }}
                secondaryTypographyProps={{
                  mt: 1,
                  component: "span",
                  typography: "caption",
                  color: "text.disabled",
                }}
              />

              <Stack
                spacing={0.5}
                direction="row"
                alignItems="center"
                sx={{
                  color:
                    task.status === "READ" ? "primary.main" : "success.main",
                  typography: "caption",
                }}
              >
                <Iconify width={16} icon="solar:users-group-rounded-bold" />
                Status: {task.status === "IN_PROGRESS" ? "In Progress" : "Done"}
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flexDirection: "column",
                gap: 2,
                flex: 4,
                paddingTop: 2,
              }}
            >
              <Tooltip title="See Task Progress">
                <Fab
                  data-cy="progress-button"
                  onClick={handleExpand}
                  size="small"
                  sx={{
                    textAlign: "center",
                  }}
                  color="default"
                >
                  <ArrowCircleDownIcon />
                </Fab>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Card>

      <Collapse in={expanded} timeout={700}>
        <Card
          sx={{
            bgcolor: "grey.400",
            width: "55%",
            margin: "0 auto",
            borderRadius: 0,
          }}
        >
          <AccordionDetails>
            <Table
              sx={{
                // bgcolor: "grey.200",
                borderRadius: 2,
                "& .MuiTableCell-root": {
                  color: "black",
                  borderBottom: "1px solid #bdbdbd",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Comment</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(steps) &&
                  steps.map((step, i) => (
                    <TableRow key={i} data-cy="progress-card">
                      <TableCell>{step.comment}</TableCell>
                      <TableCell>
                        {new Date(step.createdAt).toDateString() ===
                        new Date().toDateString()
                          ? new Date(step.createdAt).toLocaleTimeString()
                          : new Date(step.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{step.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Card>
      </Collapse>
    </Box>
  );
};

export default TaskCard;

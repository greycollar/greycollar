import ChatIcon from "@mui/icons-material/Chat";
import DoneIcon from "@mui/icons-material/Done";

import {
  Box,
  Card,
  Divider,
  Fab,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const SupervisingCard = ({ supervisings, updateSupervising }) => {
  const [inputValues, setInputValues] = useState({});

  const handleSubmit = (superviseId) => {
    if (inputValues[superviseId]) {
      updateSupervising(superviseId, inputValues[superviseId]);
      setInputValues({
        ...inputValues,
        [superviseId]: "",
      });
    }
  };

  return (
    <>
      {supervisings.map((supervise, i) => (
        <Card data-cy="supervise-card" key={i}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              gap: 1,
              borderRadius: 5,
              padding: 2,
              minHeight: 180,
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
                  paddingTop: 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: "8px",
                    paddingLeft: 0.5,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    Question #{i + 1}: {supervise.question}
                  </Typography>
                </Box>

                {supervise.answer ? (
                  <TextField
                    variant="outlined"
                    label="Answer"
                    value={`${supervise.answer}`}
                    InputProps={{
                      readOnly: true,
                      style: { cursor: "text" },
                    }}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        cursor: "default",
                      },
                      marginTop: 1,
                    }}
                  />
                ) : (
                  <TextField
                    multiline
                    rows={3}
                    label="Answer"
                    variant="outlined"
                    data-cy="answer-supervise"
                    value={inputValues[supervise.id] || ""}
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        [supervise.id]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(supervise.id);
                      }
                    }}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              width: "100%",
                            }}
                          >
                            <Fab
                              size="small"
                              disabled={!inputValues[supervise.id]}
                              sx={{
                                position: "absolute",
                                bottom: 5,
                                right: 5,
                                backgroundColor: "inherit",
                                boxShadow: "none",
                                "&:hover": {
                                  backgroundColor: "common.white",
                                  color: "common.black",
                                },
                              }}
                            >
                              <DoneIcon
                                data-cy="send-answer"
                                onClick={() => handleSubmit(supervise.id)}
                              />
                            </Fab>
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <TableContainer>
                  <Table
                    size="small"
                    sx={{
                      tableLayout: "fixed",
                      width: "120px",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ textAlign: "center" }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ textAlign: "center" }}>
                          <Typography
                            sx={{
                              mt: 1,
                            }}
                          >
                            {(() => {
                              switch (supervise.status) {
                                case "IN_PROGRESS":
                                  return "In Progress";
                                case "ANSWERED":
                                  return "Answered";
                                default:
                                  return supervise.status;
                              }
                            })()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Tooltip title="Go to sessions">
                  <Fab
                    size="small"
                    sx={{
                      ml: 5,
                      textAlign: "center",
                    }}
                    color="default"
                  >
                    <ChatIcon />
                  </Fab>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default SupervisingCard;

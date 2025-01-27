import MoreVertButton from "../MoreButton/MoreButton";

import {
  Card,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import {
  Scrollbar,
  TableHeadCustom,
  TableSelectedAction,
} from "@nucleoidai/platform/minimal/components";

function KnowledgeTable({
  table,
  selectedType,
  knowledges,
  handleEdit,
  handleDeleteClick,
}) {
  const getTableHead = (selectedType) => {
    switch (selectedType) {
      case "ALL":
        return [
          { id: "type", label: "Type" },
          { id: "content", label: "Content" },
          { id: "status", label: "Status" },
          { id: "date", label: "Date" },
          { id: "", label: "" },
        ];
      case "URL":
        return [
          { id: "url", label: "URL" },
          { id: "status", label: "Status" },
          { id: "date", label: "Date" },
          { id: "", label: "" },
        ];
      case "TEXT":
        return [
          { id: "text", label: "Text" },
          { id: "status", label: "Status" },
          { id: "date", label: "Date" },
          { id: "", label: "" },
        ];
      case "QA":
        return [
          { id: "question", label: "Question" },
          { id: "answer", label: "Answer" },
          { id: "status", label: "Status" },
          { id: "date", label: "Date" },
          { id: "", label: "" },
        ];
      default:
        return [{ id: "status", label: "Status" }];
    }
  };
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card>
      <TableContainer sx={{ position: "relative", overflow: "unset" }}>
        <TableSelectedAction dense={table.dense} />
        <Scrollbar>
          <Table size={table.dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={getTableHead(selectedType)}
            />
            <TableBody>
              {knowledges
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index} tabIndex={-1}>
                    {selectedType === "ALL" && (
                      <>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>
                          {row.type === "URL" && row.url}
                          {row.type === "TEXT" && row.text}
                          {row.type === "QA" &&
                            `Q: ${row.question} A: ${row.answer}`}
                        </TableCell>
                        <TableCell>
                          {(() => {
                            switch (row.status) {
                              case "IN_PROGRESS":
                                return "In Progress";
                              case "COMPLETED":
                                return "Completed";
                              default:
                                return row.status;
                            }
                          })()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                    {selectedType === "URL" && (
                      <>
                        <TableCell>{row.url}</TableCell>
                        <TableCell>
                          {(() => {
                            switch (row.status) {
                              case "IN_PROGRESS":
                                return "In Progress";
                              case "COMPLETED":
                                return "Completed";
                              default:
                                return row.status;
                            }
                          })()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                    {selectedType === "TEXT" && (
                      <>
                        <TableCell>{row.text}</TableCell>
                        <TableCell>
                          {(() => {
                            switch (row.status) {
                              case "IN_PROGRESS":
                                return "In Progress";
                              case "COMPLETED":
                                return "Completed";
                              default:
                                return row.status;
                            }
                          })()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                    {selectedType === "QA" && (
                      <>
                        <TableCell>{row.question}</TableCell>
                        <TableCell>{row.answer}</TableCell>
                        <TableCell>
                          {(() => {
                            switch (row.status) {
                              case "IN_PROGRESS":
                                return "In Progress";
                              case "COMPLETED":
                                return "Completed";
                              default:
                                return row.status;
                            }
                          })()}
                        </TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                      </>
                    )}
                    <TableCell sx={{ width: "5%" }}>
                      <MoreVertButton
                        handleDelete={() => handleDeleteClick(row)}
                        handleEdit={() => handleEdit(row)}
                        isEditable={row.type !== "URL"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {knowledges.length > rowsPerPage && (
            <Pagination
              count={Math.ceil(knowledges.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "5px",
              }}
            />
          )}
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

export default KnowledgeTable;

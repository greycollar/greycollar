import React from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatKey, getAllKeys } from "../../utils/formatters";

export const ResultTable = ({ data }) => {
  const keys = getAllKeys(data);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>{formatKey(key)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) ? (
            data.map((item, index) => (
              <TableRow key={index}>
                {keys.map((key) => (
                  <TableCell key={`${index}-${key}`}>
                    {item[key] !== undefined
                      ? JSON.stringify(item[key])
                      : "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {keys.map((key) => (
                <TableCell key={key}>
                  {data && typeof data === "object"
                    ? JSON.stringify(data[key])
                    : "N/A"}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

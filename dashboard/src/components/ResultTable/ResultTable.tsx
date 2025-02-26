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
      <Table size="small" sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ lineHeight: ".8rem" }}>Key</TableCell>
            <TableCell sx={{ lineHeight: ".8rem" }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data)
            ? data.map((value, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ lineHeight: ".8rem" }}>
                    {keys[index]}
                  </TableCell>
                  <TableCell sx={{ lineHeight: ".8rem" }}>{value}</TableCell>
                </TableRow>
              ))
            : Object.entries(data).map(([key, value], index) => (
                <TableRow key={index}>
                  <TableCell sx={{ lineHeight: ".8rem" }}>
                    {formatKey(key)}
                  </TableCell>
                  <TableCell sx={{ lineHeight: ".8rem" }}>{value}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

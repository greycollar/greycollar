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
          {keys.map((item, index) =>
            item.keys.length > 0
              ? item.keys.map((key, keyIndex) => (
                  <TableRow key={`${index}-${keyIndex}`}>
                    <TableCell sx={{ lineHeight: ".8rem" }}>
                      {formatKey(key)}
                    </TableCell>
                    <TableCell sx={{ lineHeight: ".8rem" }}>
                      {item.values[keyIndex]}
                    </TableCell>
                  </TableRow>
                ))
              : item.values.map((value, valueIndex) => (
                  <TableRow key={`${index}-${valueIndex}`}>
                    <TableCell sx={{ lineHeight: ".8rem" }}>
                      Value {item.index}
                    </TableCell>
                    <TableCell sx={{ lineHeight: ".8rem" }}>{value}</TableCell>
                  </TableRow>
                ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { OutlinedInput } from "@mui/material";
import React from "react";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

function TypeToolbar({ types, selectedType, handleChange }) {
  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: "flex-end", md: "center" }}
        direction={{
          xs: "column",
          md: "row",
        }}
        sx={{
          pb: 2.5,
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Types</InputLabel>

          <Select
            value={selectedType}
            onChange={handleChange}
            input={<OutlinedInput label="Types" />}
            data-cy="type-select"
          >
            {types.map((option) => (
              <MenuItem
                data-cy={`type-menu-${option}`}
                key={option}
                value={option}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default TypeToolbar;

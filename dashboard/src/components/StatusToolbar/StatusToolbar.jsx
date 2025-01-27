import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { OutlinedInput } from "@mui/material";
import React from "react";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";

function StatusToolbar({ handleChange, selectedStatus, statuses }) {
  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: "flex-end", md: "center" }}
        direction={{
          xs: "column",
          md: "row",
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Status</InputLabel>

          <Select
            value={selectedStatus}
            onChange={handleChange}
            input={<OutlinedInput label="Status" />}
            data-cy="type-select"
          >
            {statuses.map((option) => {
              let displayOption = option;
              if (option === "ANSWERED") displayOption = "Answered";
              if (option === "DONE") displayOption = "Done";
              if (option === "IN_PROGRESS") displayOption = "In Progress";

              return (
                <MenuItem
                  data-cy={`type-menu-${option}`}
                  key={option}
                  value={option}
                >
                  {displayOption}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default StatusToolbar;

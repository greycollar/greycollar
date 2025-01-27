import CloseIcon from "@mui/icons-material/Close";
import React from "react";

import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";

function ListSelectDialog({
  openAssignForm,
  setSelectedDep,
  teamState,
  onAssign,
  selectedDep,
  setOpenAssignForm,
}) {
  return (
    <Dialog
      open={openAssignForm}
      sx={{
        border: "2px solid #000",
        boxShadow: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3),
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: (theme) => theme.spacing(1, 1, 0),
        }}
      >
        <DialogTitle>Assign to team</DialogTitle>
        <IconButton
          onClick={() => {
            setSelectedDep(null), setOpenAssignForm(false);
          }}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider sx={{ borderStyle: "solid" }} />
      <List sx={{ minHeight: "6rem" }}>
        {teamState?.teamsData?.map((team) => (
          <ListItem
            key={team.id}
            onClick={() => setSelectedDep(team.id)}
            sx={{
              minHeight: "4rem",
              borderStyle:
                team.id === 1
                  ? "none none none none"
                  : "dashed none dashed none ",
              borderWidth: "0.2px",
              borderColor: (theme) => theme.palette.grey[700],
              cursor: "pointer",
              backgroundColor:
                selectedDep === team.id
                  ? (theme) => theme.palette.primary.main
                  : undefined,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
                borderStyle: "dashed",
              },
            }}
          >
            <ListItemText primary={team.name} />
          </ListItem>
        ))}
        <ListItemButton
          onClick={() => onAssign(selectedDep)}
          sx={{
            justifyContent: "center",
            "&:hover": { backgroundColor: "gray" },
          }}
        >
          Select
        </ListItemButton>
      </List>
    </Dialog>
  );
}

export default ListSelectDialog;

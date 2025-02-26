import AddIcon from "@mui/icons-material/Add";
import AddTaskDialog from "../AddTaskDialog/AddTaskDialog";
import CloseIcon from "@mui/icons-material/Close";
import { Iconify } from "@nucleoidai/platform/minimal/components";
import React from "react";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Drawer,
  Fab,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const IncomingDrawer = ({
  drawerOpen,
  handleDrawerClose,
  selectedSkill,
  instructions,
  colleague,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
      <Box sx={{ width: "800px" }}>
        <Stack
          sx={{
            m: 1,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <IconButton
            onClick={handleDrawerClose}
            sx={{ marginBottom: 2, cursor: "pointer" }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
          {selectedSkill.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {instructions.map((instruction, index) => (
            <Card
              key={instruction.id}
              sx={{ marginBottom: "8px", width: "80%" }}
            >
              <CardContent>
                <Typography variant="body1">
                  {index + 1}. {instruction.instruction}
                </Typography>
              </CardContent>
              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: 2,
                    mb: 0.2,
                  }}
                >
                  <Fab
                    variant="button"
                    color="default"
                    sx={{ width: 32, height: 32 }}
                  >
                    <Iconify icon="solar:pen-bold" width={16} height={16} />
                  </Fab>
                  <Fab
                    variant="button"
                    color="default"
                    sx={{ width: 32, height: 32 }}
                  >
                    <Iconify
                      icon="solar:trash-bin-trash-bold"
                      width={16}
                      height={16}
                    />
                  </Fab>
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box>
          <Stack sx={{ display: "flex", alignItems: "flex-end" }}>
            <Fab
              variant="button"
              color="default"
              size="small"
              sx={{ m: 2 }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Stack>

          <AddTaskDialog
            open={open}
            setOpen={setOpen}
            colleagueId={colleague.id}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default IncomingDrawer;

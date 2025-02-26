import ListIcon from "@mui/icons-material/List";
import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";

import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from "@mui/material";

function SettingsMenuWigdet() {
  return (
    <Box
      sx={{
        borderWidth: "0.1rem",
        borderColor: "black",
        borderStyle: " none solid none none",
        height: "100vh",
        backgroundColor: "background.paper",
      }}
    >
      <MenuList>
        <TitleBar
          title={"Settings"}
          barHeight={"4rem"}
          bgColor={"defaultBgColor"}
          color={"defaultColor"}
        />
        <Divider sx={{ marginTop: "3.59rem" }} />
        <MenuItem sx={{ height: "3.8rem", marginY: -1 }}>
          <ListItemIcon>
            <ListIcon></ListIcon>
          </ListItemIcon>
          <ListItemText>Permissions</ListItemText>
        </MenuItem>
        <Divider />
      </MenuList>
    </Box>
  );
}

export default SettingsMenuWigdet;

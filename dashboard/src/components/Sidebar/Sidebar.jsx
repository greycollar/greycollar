import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import config from "../.././../config.js";
import styles from "./styles";

const Sidebar = ({ routes, isCollapsed }) => {
  const drawerWidth = isCollapsed ? 75 : 280;
  // TODO : responsive sidebar
  // const matches = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Box
        sx={{
          backgroundColor: config.topMenuColor,
          top: 0,
          left: 0,
          height: "4rem",
          width: 75,
          position: "absolute",
          marginRight: -10.2,
        }}
      ></Box>
      <Drawer
        anchor="left"
        variant="persistent"
        open={true}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            ...styles.paper,
            width: drawerWidth,
            transition: ".5s ease",
          },
        }}
      >
        <List sx={styles.list}>
          {routes.map((page, index) => (
            <div key={index}>
              <Link to={page.url} style={{ textDecoration: "none" }}>
                <ListItemButton sx={styles.listItemButton}>
                  <Box
                    sx={{
                      ...styles.box,
                      flexDirection: isCollapsed ? "column" : "row",
                      alignItems: isCollapsed ? "center" : "flex-start",
                    }}
                  >
                    {page.icon && (
                      <Box
                        sx={{
                          mb: isCollapsed ? 0 : 0,
                          mr: isCollapsed ? 0 : 3,
                        }}
                      >
                        <page.icon />
                      </Box>
                    )}
                    {!isCollapsed && <ListItemText primary={page.name} />}
                  </Box>
                </ListItemButton>
              </Link>
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;

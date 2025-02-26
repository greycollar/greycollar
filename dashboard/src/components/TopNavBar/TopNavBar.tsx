import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GrayCollarLogo from "./GrayCollarLogo.png";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Person } from "@mui/icons-material";
import React from "react";
import config from ".././../config";
import styles from "./styles";
import { useContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

function TopNavBar({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  teamState,
  onTeamSelect,
  routes,
  sideBarToggle,
  selectedTeam,
  setSelectedTeam,
}) {
  const [anchorElTeam, setAnchorElTeam] = React.useState(null);

  const handleOpenTeamMenu = (event) => {
    setAnchorElTeam(event.currentTarget);
  };

  const handleCloseTeamMenu = () => {
    setAnchorElTeam(null);
  };
  const navigate = useNavigate();

  const selectTeam = (team) => {
    dispatch({ type: "TEAM_SELECT", payload: team.id });
    setSelectedTeam(team);
    onTeamSelect(team);
    handleCloseTeamMenu();
  };

  const [state, dispatch] = useContext();
  const settings = [
    {
      name: "Profile",
      action: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "Logout",
      action: () => {
        dispatch({ type: "LOGOUT" });
        handleCloseUserMenu();
        navigate(0);
      },
    },
  ];

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.teamId]);

  return (
    <AppBar position="sticky" sx={styles.appBar} variant="dense">
      <Toolbar disableGutters sx={styles.toolBar}>
        <Box
          component="img"
          src={GrayCollarLogo}
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        />
        {selectedTeam && (
          <Box>
            <IconButton size="large" onClick={sideBarToggle} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Box
          sx={{
            flexGrow: 0,
            pl: 2,
          }}
        >
          <Button
            onClick={handleOpenTeamMenu}
            sx={{ my: 2, color: "primary.contrastText" }}
          >
            {state.teamId ? selectedTeam?.name : "Select a Team"}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            id="team-menu"
            anchorEl={anchorElTeam}
            keepMounted
            open={Boolean(anchorElTeam)}
            onClose={handleCloseTeamMenu}
            sx={{ my: 2, color: "primary.contrastText" }}
          >
            {teamState.teamsData.map((team) => (
              <MenuItem
                key={team.id}
                component={Link}
                to={`/teams/colleagues`}
                onClick={() => selectTeam(team)}
              >
                <Box
                  component="img"
                  src={`${config.base}/media/TeamIcons/${team.icon.replace(
                    /:/g,
                    ""
                  )}.png`}
                  sx={styles.imgBox}
                ></Box>
                <Typography textAlign="center">{team.name}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {routes
            .filter((route) => !route.hide)
            .map((page, index) => (
              <Button
                key={index}
                component={Link}
                to={page.url}
                sx={{ my: 2, color: "primary.contrastText" }}
              >
                {page.name}
              </Button>
            ))}
        </Box>
        <Box sx={{ position: "absolute", right: 30 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ backgroundColor: "background.default" }}>
                <Person color="primary" />
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={setting.action}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavBar;

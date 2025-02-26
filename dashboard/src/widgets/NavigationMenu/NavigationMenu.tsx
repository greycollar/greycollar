import { Box } from "@mui/system";
import Sidebar from "../../components/Sidebar";
import TopNavBar from "../../components/TopNavBar";
import config from "../../../config";
import { storage } from "@nucleoidjs/webstorage";
import { useContext } from "../context/ContextProvider";
import useTeamsState from "../../hooks/useTeamsState";

import React, { useEffect, useState } from "react";

const NavigationMenu = ({ Outlet }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { teamState, fetchTeamsData } = useTeamsState();
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState();
  const [, dispatch] = useContext();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (isSubmenuOpen) {
      setSubmenuOpen(false);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleTeamSelect = (team) => {
    dispatch({ type: "TEAM_SELECT", payload: team });
  };

  useEffect(() => {
    function checkTeamData() {
      const savedTeamId = storage.get(config.name, "teamId");
      const foundTeam = teamState.teamsData.find(
        (team) => team.id === savedTeamId
      );
      if (foundTeam) {
        setSelectedTeam(foundTeam);
      }
    }
    selectedTeam && setSubmenuOpen(false);
    window.addEventListener("storage", checkTeamData);
    return () => {
      window.removeEventListener("storage", checkTeamData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamState.teamsData]);

  useEffect(() => {
    fetchTeamsData();
  }, [fetchTeamsData]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNavBar
        sx={{ flexShrink: 0 }}
        anchorElUser={anchorElUser}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseUserMenu={handleCloseUserMenu}
        routes={config.topMenu}
        teamState={teamState}
        onTeamSelect={handleTeamSelect}
        sideBarToggle={toggleCollapse}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {storage.get(config.name, "teamId") ? (
          <Sidebar
            sx={{ flexShrink: 0 }}
            routes={config.sideMenu}
            isCollapsed={isCollapsed}
          />
        ) : null}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>{Outlet}</Box>
      </Box>
    </Box>
  );
};

export default NavigationMenu;

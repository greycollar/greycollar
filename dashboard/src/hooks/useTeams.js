import http from "../http";
import { publish } from "@nucleoidai/react-event";
import useApi from "./useApi";

import { useCallback, useState } from "react";

function useTeams() {
  const [teams, setTeams] = useState([{ id: "", name: "", icon: "" }]);
  const { loading, error, handleResponse } = useApi();

  const getTeams = useCallback(() => {
    handleResponse(http.get("/teams"), (response) => setTeams(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTeam = useCallback((team) => {
    handleResponse(
      http.post(`/projects`, {
        name: team.name,
        avatar: team.avatar,
        character: team.character,
        role: team.role,
        companyId: "4def7431-cb19-4aab-aa4b-2a84198cb56a",
        teamId: team.teamId,
      }),

      publish("TEAM_ADDED", { teamId: team.id })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteTeam = useCallback((teamId) => {
    handleResponse(
      http.delete(`/projects/${teamId}`),
      publish("TEAM_DELETED", { teamId })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    teams,
    loading,
    error,
    createTeam,
    getTeams,
    deleteTeam,
  };
}

export default useTeams;

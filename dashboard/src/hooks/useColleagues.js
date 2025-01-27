import http from "../http";
import { storage } from "@nucleoidjs/webstorage";
import useApi from "./useApi";

import { publish, useEvent } from "@nucleoidai/react-event";
import { useCallback, useEffect, useState } from "react";

function useColleagues() {
  const [colleagues, setColleagues] = useState([
    {
      id: "",
      name: "",
      avatar: "",
      character: "",
      role: "",
      teamId: "",
      aiEngineId: "",
    },
  ]);
  const { loading, error, handleResponse } = useApi();
  const [colleagueUpdated] = useEvent("COLLEAGUE_UPDATED", null);
  const [colleagueDeleted] = useEvent("COLLEAGUE_DELETED", null);
  const [colleagueAdded] = useEvent("COLLEAGUE_ADDED", null);

  useEffect(() => {
    getTeamColleagues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colleagueUpdated, colleagueDeleted, colleagueAdded]);

  const getTeamColleagues = useCallback(() => {
    handleResponse(http.get(`/colleagues`), (response) =>
      setColleagues(response.data)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createColleague = useCallback((colleague) => {
    colleague.teamId = storage.get("itemId");
    handleResponse(
      http.post(`/colleagues`, {
        title: colleague.name,
        name: colleague.name,
        avatar: colleague.avatar,
        character: colleague.character,
        role: colleague.role,
        teamId: "add6dfa4-45ba-4da2-bc5c-5a529610b52f",
        aiEngineId: colleague.aiEngineId,
      }),
      publish("COLLEAGUE_ADDED", { colleagueId: colleague.id })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteColleague = useCallback((colleagueId) => {
    handleResponse(
      http.delete(`/colleagues/${colleagueId}`),
      publish("COLLEAGUE_DELETED", { colleagueId })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    colleagues,
    loading,
    error,
    createColleague,
    deleteColleague,
    getTeamColleagues,
  };
}

export default useColleagues;

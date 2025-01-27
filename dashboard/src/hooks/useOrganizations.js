import http from "../http";
import useApi from "./useApi";
import { useEvent } from "@nucleoidai/react-event";

import { useCallback, useEffect, useState } from "react";

function useOrganizations(id) {
  const [organizations, setOrganizations] = useState([{}]);

  const { loading, error, handleResponse } = useApi();

  // TODO - Research self-call events

  const [teamSelected] = useEvent("TEAM_SELECTED", null);

  useEffect(() => {
    if (id) {
      getOrganizationsById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelected, id]);

  const getOrganizationsById = useCallback((id) => {
    if (!id) {
      return;
    }
    handleResponse(http.get(`/organizations/${id}`), (response) =>
      setOrganizations(response.data)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    organizations,
    loading,
    error,
  };
}

export default useOrganizations;

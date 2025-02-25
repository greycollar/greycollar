import http from "../http";
import useApi from "./useApi";
import { useEvent } from "@nucleoidai/react-event";

import { useCallback, useEffect, useState } from "react";

function useOrganizations() {
  const [organizations, setOrganizations] = useState([]);

  const { loading, error, handleResponse } = useApi();

  const [teamSelected] = useEvent("TEAM_SELECTED", null);

  useEffect(() => {
    getOrganizations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelected]);

  const getOrganizations = useCallback(() => {
    handleResponse(http.get(`/organizations`), (response) =>
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

export { useOrganizations };

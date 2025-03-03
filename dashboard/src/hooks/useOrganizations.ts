import { useCallback, useEffect, useState } from "react";

import http from "../http";
import useApi from "./useApi";
import { useEvent } from "@nucleoidai/react-event";

function useOrganizations() {

  const [organizations, setOrganizations] = useState<{
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }[]>([{
    id: '',
    name: '',
    description: '',
    created_at: '',
    updated_at: ''
  }]);

  const { loading, error, handleResponse } = useApi();

  const [teamSelected] = useEvent("TEAM_SELECTED", null);

  useEffect(() => {
    getOrganizations();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelected]);

  const getOrganizations = useCallback(() => {
    handleResponse(
      http.get(`/organizations`),
      (response) => setOrganizations(response.data),
      (error) => {
        console.error(error);
      }
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

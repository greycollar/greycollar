import http from "../http";
import useApi from "./useApi";
import { useEvent } from "@nucleoidai/react-event";

import { useCallback, useEffect, useState } from "react";

function useStatistics() {
  const [statistic, setStatistick] = useState({
    responseRate: "",
    knowledgeSize: "",
    taskCount: "",
    totalMessages: "",
    id: "",
    supervisingRate: "",
  });

  const { loading, error, handleResponse } = useApi();

  const [teamSelected] = useEvent("PROJECT_SELECTED", null);

  useEffect(() => {
    getStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSelected]);

  const getStatistics = useCallback(() => {
    handleResponse(
      http.get(`/statistics`),
      (response) => {
        setStatistick(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    statistic,
  };
}

export default useStatistics;

import http from "../http";
import useApi from "./useApi";

import { useCallback, useEffect, useState } from "react";

function useKnowledge(id) {
  const [knowledge, setKnowledge] = useState({
    id: "",
    type: "",
    text: "",
    url: "",
    question: "",
    answer: "",
    colleagueId: "",
    status: "",
    createdAt: "",
    teamId: "",
  });

  const { loading, error, handleResponse } = useApi();

  useEffect(() => {
    getKnowledgeById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getKnowledgeById = useCallback((id) => {
    handleResponse(
      http.get(`/knowledge/${id}`),
      (response) => {
        setKnowledge(response.data);
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
    knowledge,
  };
}

export default useKnowledge;

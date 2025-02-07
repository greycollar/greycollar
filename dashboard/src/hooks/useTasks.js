import http from "../http";
import useApi from "./useApi";

import { publish, useEvent } from "@nucleoidai/react-event";
import { useCallback, useEffect, useState } from "react";

function useTasks(colleagueId) {
  const [tasks, setTasks] = useState([
    {
      description: "",
      colleagueId: "",
      status: "",
      commandId: "",
      id: "",
      createdAt: "",
    },
  ]);

  const [steps, setSteps] = useState([
    {
      description: "",
      id: "",
      type: "",
      createdAt: "",
      referenceId: "",
    },
  ]);

  const { loading, error, handleResponse } = useApi();

  const [taskStatus] = useEvent("TASK_STATUS_CHANGED", null);
  const [taskCreated] = useEvent("TASK_CREATED", null);

  useEffect(() => {
    getTasks(colleagueId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStatus, taskCreated]);

  const createTask = useCallback((task, colleagueId) => {
    handleResponse(
      http.post(`/tasks`, {
        description: task,
        colleagueId: colleagueId,
      }),
      (response) => {
        publish("TASK_CREATED", response.data);
        return response.data;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTasks = useCallback((colleagueId) => {
    handleResponse(
      http.get(`/tasks?colleagueId=${colleagueId}`),
      (response) => {
        setTasks(response.data);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSteps = useCallback((id) => {
    handleResponse(http.get(`/tasks/${id}/steps`), (response) => {
      setSteps(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    tasks,
    getSteps,
    steps,
    createTask,
  };
}

export default useTasks;

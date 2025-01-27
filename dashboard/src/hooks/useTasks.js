import http from "../http";
import useApi from "./useApi";

import { publish, useEvent } from "@nucleoidai/react-event";
import { useCallback, useEffect, useState } from "react";

function useTasks() {
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

  const [progress, setProgress] = useState([
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
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStatus, taskCreated]);

  const createTask = useCallback((task, colleagueId) => {
    handleResponse(
      http.post(`/tasks`, {
        description: task,
        colleagueId: colleagueId,
        status: "IN_PROGRESS",
      }),
      (response) => {
        publish("TASK_CREATED", response.data);
        return response.data;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTasks = useCallback(() => {
    handleResponse(http.get(`/tasks`), (response) => {
      setTasks(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTaskProgress = useCallback((id) => {
    handleResponse(http.get(`/tasks/${id}/progresses`), (response) => {
      setProgress(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    tasks,
    getTaskProgress,
    progress,
    createTask,
  };
}

export default useTasks;

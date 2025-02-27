import useApi from "./useApi";
import userInstance from "../http/user";

import { useCallback, useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState({ name: "", avatarUrl: "", id: "" });
  const { loading, error, handleResponse } = useApi();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = useCallback(() => {
    handleResponse(
      userInstance.getUserDetails(),
      (response) => {
        setUser(response);
      },
      (error) => {
        console.error(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading, error };
}

export default useUser;

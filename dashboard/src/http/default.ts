import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, { retries: 3 });

axios.interceptors.response.use((response) => {
  if (response.headers["content-type"] === "application/json") {
    response.data = JSON.parse(response.data);
  }

  return response;
});

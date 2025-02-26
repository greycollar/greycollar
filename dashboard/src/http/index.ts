import axios from "axios";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

const instance = axios.create({
  baseURL: config.api,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

instance.interceptors.request.use((request) => {
  const accessToken = storage.get(config.name, "accessToken");
  if (!accessToken) {
    window.location.href =
      config.base === "/" ? "/login" : `${config.base}/login`;
  }
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  request.headers["companyId"] = "1";
  return request;
});

instance.interceptors.response.use((response) => {
  const accessToken = storage.get(config.name, "accessToken");
  if (!accessToken) {
    window.location.href = "/login";
  }
  response.headers["Authorization"] = `Bearer ${accessToken}`;
  response.headers["companyId"] = "1";
  return response;
});

instance.interceptors.response.use((response) => {
  return response;
});

export default instance;

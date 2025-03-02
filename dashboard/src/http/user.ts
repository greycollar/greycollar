import axios from "axios";
import config from "../../config";
import { storage } from "@nucleoidjs/webstorage";

declare module "axios" {
  interface AxiosInstance {
    getUserDetails(): Promise<{
      name: string;
      avatarUrl: string;
      id: string | number;
    } | null>;
  }
}

const instance = axios.create({
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
});

instance.interceptors.request.use(async (request) => {
  const refreshToken = await storage.get(config.name, "refreshToken");
  if (refreshToken) {
    request.headers["Authorization"] = `Bearer ${refreshToken}`;
  }
  return request;
});

instance.getUserDetails = async () => {
  const refreshToken = await storage.get(config.name, "refreshToken");
  const { project } = config;
  const { github, google } = project;

  let userUrl;
  let provider;
  if (google) {
    userUrl = google.userUrl;
    provider = "google";
  } else if (github) {
    userUrl = github.userUrl;
    provider = "github";
  }

  if (refreshToken) {
    try {
      const response = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (provider === "github") {
        return {
          name: response.data.login,
          avatarUrl: response.data.avatar_url,
          id: response.data.id,
        };
      } else if (provider === "google") {
        return {
          name: response.data.name,
          avatarUrl: response.data.picture,
          id: response.data.id,
        };
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw error;
    }
  }
  return null;
};

export default instance;

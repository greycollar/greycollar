import config from "../../config";
import jwtDecode from "jwt-decode";
import { storage } from "@nucleoidjs/webstorage";

let login = true;
const teamId = storage.get(config.name, "teamId");
try {
  const token = storage.get(config.name, "accessToken");
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    login = false;
  }
} catch (err) {
  login = false;
}

export const initialState = {
  login,
  teamId,
};

export const reducer = (state, action) => {
  state = { ...state };

  switch (action.type) {
    case "LOGIN": {
      state.login = true;
      break;
    }
    case "LOGOUT": {
      storage.clear();
      state.login = false;
      break;
    }

    case "TEAM_SELECT": {
      state.teamId = action.payload;
      storage.set("dashboard", "teamId", state.teamId);
      break;
    }

    case "TEAM_DELETE": {
      storage.remove("dashboard", "teamId");
      state.teamId = null;
      break;
    }

    default:
  }

  return state;
};

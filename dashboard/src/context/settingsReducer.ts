export const actionTypes = {
  FETCH_PERMISSION_DATA: "FETCH_PERMISSION_DATA",
  FETCH_USER_GITHUB_DATA: "FETCH_USER_GITHUB_DATA",
};

const initialState = {
  permissionData: [],
  userGithubData: [],
};
const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PERMISSION_DATA:
      return { ...state, permissionData: action.payload };
    case actionTypes.FETCH_USER_GITHUB_DATA:
      return { ...state, userGithubData: action.payload };
    default:
      return state;
  }
};

export { initialState, settingsReducer };

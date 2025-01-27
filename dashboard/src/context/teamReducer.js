export const actionTypes = {
  SET_TEAM_TO_EDIT: "SET_TEAM_TO_EDIT",
  FETCH_TEAMS_DATA: "FETCH_TEAMS_DATA",
  FETCH_TEAMS_MEMBERS: "FETCH_TEAMS_MEMBERS",
};

const initialState = {
  teamsData: [],
  teamsMembers: [],
  teamToEdit: null,
};
const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TEAM_TO_EDIT:
      return { ...state, teamToEdit: action.payload };
    case actionTypes.FETCH_TEAMS_DATA:
      return { ...state, teamsData: action.payload };
    case actionTypes.FETCH_TEAMS_MEMBERS:
      return { ...state, teamsMembers: action.payload };
    default:
      return state;
  }
};

export { initialState, teamReducer };

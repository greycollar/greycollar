export const actionTypes = {
  SET_COLLEAGUE_TO_EDIT: "SET_COLLEAGUE_TO_EDIT",
  FETCH_COLLEAGUES_DATA: "FETCH_COLLEAGUES_DATA",
};

const initialState = {
  colleaguesData: [],
  colleagueToEdit: null,
};

const colleagueReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLEAGUE_TO_EDIT:
      return { ...state, colleagueToEdit: action.payload };
    case actionTypes.FETCH_COLLEAGUES_DATA:
      return { ...state, colleaguesData: action.payload };
    default:
      return state;
  }
};

export { initialState, colleagueReducer };

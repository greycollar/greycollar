export const actionTypes = {
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SET_USERS: "SET_USERS",
  SET_ERROR: "SET_ERROR",
  REMOVE_ERROR: "REMOVE_ERROR",
};

const initialState = {
  loading: false,
  error: "",
  users: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING: {
      return { ...state, loading: true };
    }
    case actionTypes.STOP_LOADING: {
      return { ...state, loading: false };
    }
    case actionTypes.SET_USERS: {
      return {
        ...state,
        loading: false,
        error: "",
        users: [...action.payload],
      };
    }
    case actionTypes.SET_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case actionTypes.REMOVE_ERROR: {
      return { loading: false, error: "", ...state };
    }
    default:
      return state;
  }
};

export { initialState, chatReducer };

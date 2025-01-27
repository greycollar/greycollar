export const actionTypes = {
  SET_LINE_GRAPH: "SET_LINE_GRAPH",
  SET_PIE_GRAPH: "SET_PIE_GRAPH",
};

const initialState = {
  lineGraph: {},
  pieGraph: [],
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LINE_GRAPH:
      return { ...state, lineGraph: action.payload };
    case actionTypes.SET_PIE_GRAPH:
      return { ...state, pieGraph: action.payload };
    default:
      return state;
  }
};

export { initialState, graphReducer };

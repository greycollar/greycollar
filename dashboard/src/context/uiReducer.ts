export const actionTypes = {
  SET_FORM_OPEN: "SET_FORM_OPEN",
  SET_WIZARD_OPEN: "SET_WIZARD_OPEN",
  SET_DIALOG_OPEN: "SET_DIALOG_OPEN",
};

const initialState = {
  formOpen: false,
  wizardOpen: false,
  dialogOpen: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FORM_OPEN:
      return { ...state, formOpen: action.payload };
    case actionTypes.SET_WIZARD_OPEN:
      return { ...state, wizardOpen: action.payload };
    case actionTypes.SET_DIALOG_OPEN:
      return { ...state, dialogOpen: action.payload };
    default:
      return state;
  }
};

export { initialState, uiReducer };

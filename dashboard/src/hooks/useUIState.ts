import { useReducer } from "react";

import {
  actionTypes as uiActionTypes,
  initialState as uiInitialState,
  uiReducer,
} from "../context/uiReducer";

const useUIState = () => {
  const [uiState, dispatch] = useReducer(uiReducer, uiInitialState);

  const openForm = () => {
    dispatch({
      type: uiActionTypes.SET_FORM_OPEN,
      payload: true,
    });
  };

  const closeForm = () => {
    dispatch({
      type: uiActionTypes.SET_FORM_OPEN,
      payload: false,
    });
  };

  const openWizard = () => {
    dispatch({
      type: uiActionTypes.SET_WIZARD_OPEN,
      payload: true,
    });
  };

  const closeWizard = () => {
    dispatch({
      type: uiActionTypes.SET_WIZARD_OPEN,
      payload: false,
    });
  };

  const openDialog = () => {
    dispatch({
      type: uiActionTypes.SET_DIALOG_OPEN,
      payload: true,
    });
  };

  const closeDialog = () => {
    dispatch({
      type: uiActionTypes.SET_DIALOG_OPEN,
      payload: false,
    });
  };

  return {
    uiState,
    openForm,
    closeForm,
    openWizard,
    closeWizard,
    openDialog,
    closeDialog,
  };
};

export default useUIState;

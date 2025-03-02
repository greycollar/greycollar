import React from "react";

const ContextStore = React.createContext({});
ContextStore.displayName = "ContextStore";

const useContext = () => React.useContext(ContextStore);

const ContextProvider = ({ children, state, reducer }) => {
  const [contextState, contextDispatch] = React.useReducer(reducer, state);

  return (
    <ContextStore.Provider value={[contextState, contextDispatch]}>
      {children}
    </ContextStore.Provider>
  );
};

export { useContext };
export default ContextProvider;

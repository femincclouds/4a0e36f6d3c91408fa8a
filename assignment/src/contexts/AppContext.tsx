import React, { createContext, useReducer } from "react";

import { initState, appReducer } from "./appReducer";
import { Context } from "../types/context";

const initValue = {
  state: initState,
  dispatch: () => initState,
};

export const AppContext = createContext<Context>(initValue);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

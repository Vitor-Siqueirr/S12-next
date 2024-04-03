import { createContext, useMemo, useState } from "react";

export const ViewStateContext = createContext(undefined);

export const ViewStateProvider = ({ children }) => {
  const [viewState, setViewState] = useState({
    view: "Rooms",
  });

  const value = useMemo(
    () => ({
      viewState,
      setViewState,
    }),
    [viewState]
  );

  return (
    <ViewStateContext.Provider value={value}>
      {children}
    </ViewStateContext.Provider>
  );
};

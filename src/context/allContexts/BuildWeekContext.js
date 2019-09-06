import React, { useState, createContext } from "react";
import { db } from "../../logic/firebase";

export const BuildWeekContext = createContext();

export function BuildWeekProvider(props) {
  const [projectsContext, setProjectsContext] = useState([]);

  return (
    <BuildWeekContext.Provider
      value={{
        projectsContext,
        setProjectsContext
      }}
    >
      {props.children}
    </BuildWeekContext.Provider>
  );
}

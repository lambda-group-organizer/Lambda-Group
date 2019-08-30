import { useState, createContext } from "react";

export const StudentContext = createContext();

export function StudentProvider(props) {
  const [student, setStudent] = useState(null);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {props.children}
    </StudentContext.Provider>
  );
}

import React, { useState, createContext } from "react";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [currentBuildWeekURL, setCurrentBuildWeekURL] = useState(null);
  const [projectRole, setProjectRole] = useState("")

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        role,
        setRole,
        currentBuildWeekURL,
        setCurrentBuildWeekURL,
        projectRole,
        setProjectRole
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

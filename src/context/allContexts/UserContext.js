import React, { useState, createContext } from "react";
// import Spinner from "../../components/globalComponents/Spinner/Spinner.js";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [currentBuildWeekURL, setCurrentBuildWeekURL] = useState(null);
  const [projectRole, setProjectRole] = useState("");
  const [currentSelectedProject, setCurrentSelectedProject] = useState("");
  const [currentSelectedProjectUid, setCurrentSelectedProjectUid] = useState(
    ""
  );
  const [loading, setLoading] = useState(false);
  const [userBuildWeeks, setUserBuildWeeks] = useState({});

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
        setProjectRole,
        currentSelectedProject,
        setCurrentSelectedProject,
        loading,
        setLoading,
        currentSelectedProjectUid,
        setCurrentSelectedProjectUid,
        userBuildWeeks,
        setUserBuildWeeks
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

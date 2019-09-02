import React, { useState, createContext } from "react";
import firebase, { db } from "../../logic/firebase";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

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
        setRole
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

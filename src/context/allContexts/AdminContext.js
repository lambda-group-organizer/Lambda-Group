import React, { createContext, useState } from "react";

export const AdminContext = React.createContext();

export function AdminProvider(props) {
  const [admin, setAdmin] = useState(null);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
}

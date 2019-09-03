import React from "react";
// import StudentLogin from "../components/Auth/StudentLogin";
// import { StudentProvider } from "./allContexts";
// import { AdminProvider } from "./allContexts";
import { UserProvider } from "./allContexts";

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids
      }),

    children
  );
}

function ContextProvider({ children }) {
  return (
    // <ProviderComposer contexts={[<StudentProvider />, <AdminProvider />]}>
    <ProviderComposer contexts={[<UserProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };

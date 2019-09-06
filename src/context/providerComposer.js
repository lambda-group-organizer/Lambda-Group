import React from "react";
// import StudentLogin from "../components/Auth/StudentLogin";
// import { StudentProvider } from "./allContexts";
// import { AdminProvider } from "./allContexts";
import { UserProvider, BuildWeekProvider } from "./allContexts";

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
    <ProviderComposer contexts={[<UserProvider />, <BuildWeekProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };

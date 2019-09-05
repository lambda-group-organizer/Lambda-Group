import React, { useState, createContext } from "react";
import Spinner from '../../components/globalComponents/Spinner/Spinner.js'

export const SpinnerContext = createContext();

export function SpinnerProvider(props) {
  const [loading, setLoading] = useState(false);


  const showSpinner = (loading) => {
    if (loading) {
      return <Spinner />
    } else {
      return null
    }
  }

  return (
    <SpinnerContext.Provider
      value={{
        loading,
        setLoading,
        showSpinner
      }}
    >
      {props.children}
    </SpinnerContext.Provider>
  );
}

import React, { useState, useEffect, useContext } from "react";
import DashBoardHeader from "../../globalComponents/DashBoardHeader.js";
import BuildWeekSelection from "./BuildWeekSelection.js";
import SelectProjectRole from "../SelectProjectRole/SelectProjectRole.js";
import { UserContext } from "../../../context/allContexts";

const StudentDashBoard = props => {
  const { currentBuildWeekURL } = useContext(UserContext);
  // console.log(currentBuildWeekURL);

  return (
    <>
      <DashBoardHeader />
      {!currentBuildWeekURL && <BuildWeekSelection />}
      {currentBuildWeekURL && <SelectProjectRole />}
    </>
  );
};

export default StudentDashBoard;

// function formatLinksName(item) {
// ALTERNATIVE OPTION BUT WORSE ON PERFORMANCE
//retun item.split('/').pop(-1);
// return item.toString().match(/\/([^\/]+)\/?$/)[1];
//   \/ match a slash
//   (  start of a captured group within the match
//   [^\/] match a non-slash character
//   + match one of more of the non-slash characters
//   )  end of the captured group
//   \/? allow one optional / at the end of the string
//   $  match to the end of the string
// }

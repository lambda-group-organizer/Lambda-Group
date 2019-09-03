import React, { useState } from "react";
import DashBoardHeader from "../../globalComponents/DashBoardHeader.js";
import AddBuildWeeks from "../../../components/AddBuildWeeks.js";
import BuildWeeksList from "../BuildWeeksList/BuildWeeksList.js";
import { Link } from "react-router-dom";
import AddMinion from "./AddMinion.js";
import { Divider, Tab } from "semantic-ui-react";

import "./overlordMainDashBoard.css";

const OverLoardMainDashboard = props => {
  // Needed update, setUpdate for state sync
  const [update, setUpdate] = useState(false);
  const [showBuildWeekView, setShowBuildWeekView] = useState(true);
  const panes = [
    {
      menuItem: "Build Weeks",
      render: () => (
        <Tab.Pane attached={false}>
          <AddBuildWeeks update={update} setUpdate={setUpdate} />
          <BuildWeeksList update={update} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Administrators",
      render: () => (
        <Tab.Pane attached={false}>
          <AddMinion />
        </Tab.Pane>
      )
    }
  ];
  return (
    <>
      <div>
        <DashBoardHeader />
        <Tab
          menu={{
            color: "red",
            inverted: true,
            attached: false,
            tabular: false
          }}
          panes={panes}
        />
      </div>
    </>
  );
};

export default OverLoardMainDashboard;

import React from 'react'
import DashBoardHeader from '../../globalComponents/DashBoardHeader.js';
import AddBuildWeeks from '../../../components/AddBuildWeeks.js';

const OverLoardMainDashboard = props => {

  return (
    <div>
    <DashBoardHeader />
    <p>main OLord DBoard</p>
      <AddBuildWeeks />
    </div>
  )
}

export default OverLoardMainDashboard;

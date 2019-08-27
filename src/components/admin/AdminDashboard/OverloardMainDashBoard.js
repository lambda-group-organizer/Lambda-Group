import React from 'react'
import DashBoardHeader from '../../globalComponents/DashBoardHeader.js';
import AddBuildWeeks from '../../../components/AddBuildWeeks.js';
import BuildWeeksList from '../BuildWeeksList/BuildWeeksList.js';

const OverLoardMainDashboard = props => {

  return (
    <div>
      <DashBoardHeader />
      <h2>Main Lord Board</h2>
      <AddBuildWeeks />
      <BuildWeeksList />
    </div>
  )
}

export default OverLoardMainDashboard;

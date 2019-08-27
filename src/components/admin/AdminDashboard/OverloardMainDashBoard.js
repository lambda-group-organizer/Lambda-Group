import React, {useState} from 'react'
import DashBoardHeader from '../../globalComponents/DashBoardHeader.js';
import AddBuildWeeks from '../../../components/AddBuildWeeks.js';
import BuildWeeksList from '../BuildWeeksList/BuildWeeksList.js';

const OverLoardMainDashboard = props => {
  const [state, setState] = useState(false)

  const refresh = (cb) => {
    cb()
  }

  return (
    <div>
      <DashBoardHeader />
      <h2>Main Lord Board</h2>
      <AddBuildWeeks />
      <BuildWeeksList refresh={refresh}/>
    </div>
  )
}

export default OverLoardMainDashboard;

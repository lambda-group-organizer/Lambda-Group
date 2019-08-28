import React, {useState} from 'react'
import DashBoardHeader from '../../globalComponents/DashBoardHeader.js';
import AddBuildWeeks from '../../../components/AddBuildWeeks.js';
import BuildWeeksList from '../BuildWeeksList/BuildWeeksList.js';

const OverLoardMainDashboard = props => {
  const [update, setUpdate] = useState(false)

  return (
    <div>
      <DashBoardHeader />
      <h2>Main Lord Board</h2>
      <AddBuildWeeks update={update} setUpdate={setUpdate}/>
      <BuildWeeksList update={update}/>
    </div>
  )
}

export default OverLoardMainDashboard;

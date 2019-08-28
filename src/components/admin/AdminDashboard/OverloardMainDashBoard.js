import React, {useState} from 'react';
import DashBoardHeader from '../../globalComponents/DashBoardHeader.js';
import AddBuildWeeks from '../../../components/AddBuildWeeks.js';
import BuildWeeksList from '../BuildWeeksList/BuildWeeksList.js';
import AddMinion from './AddMinion.js';
import {Link, Switch, Route} from 'react-router-dom';

const OverLoardMainDashboard = props => {
  const [update, setUpdate] = useState(false);

  return (
    <>
    <div>
      <DashBoardHeader />
      <h2>Main Lord Board</h2>
      <Link to="/admin/addMinion">Add Admin</Link>
      <AddBuildWeeks update={update} setUpdate={setUpdate} />
      <BuildWeeksList update={update} />
    </div>
    <Switch>
      <Route path="admin/addMinion" component={AddMinion} />
    </Switch>
    </>
  );
};

export default OverLoardMainDashboard;

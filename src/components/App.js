import React, {useContext} from 'react';
import CSVreader from './CSV'
import Dashboard from './Dashboard/Dashboard'

const App = () => {
  return (
    <div className="App">
      <p>Lambda Group Organizer</p>
      {/* <CSVreader /> */}
      <Dashboard />
    </div>
  );
}

export default App;

import React from 'react';
import CSVreader from './CSV'
import Dashboard from './Dashboard/Dashboard'

function App() {
  return (
    <div className="App">
      <p>Lambda Group Organizer</p>
      {/* <CSVreader /> */}
      <Dashboard />
    </div>
  );
}

export default App;

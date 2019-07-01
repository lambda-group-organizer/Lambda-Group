import React, {useContext} from 'react';
import CSVreader from './CSV'
import Test from './Dashboard/Test'

const App = () => {
  return (
    <div className="App">
      <p>Lambda Group Organizer</p>
      {/* <CSVreader /> */}
      <Test />
    </div>
  );
}

export default App;

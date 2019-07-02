import React, { useContext } from "react";
import CSVreader from "./CSV";
import Dashboard from "./Dashboard/Dashboard";
import { Header, Icon } from "semantic-ui-react";

const App = () => {
    return (
        <div className="App">
            <Header as="h1"><Icon color="red" name='chevron up' />Lambda Group Organizer</Header>
            <Dashboard />
        </div>
    );
};

export default App;

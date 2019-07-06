import React, { useState, useContext } from "react";
import { Statistic, Segment } from "semantic-ui-react";
import UserContext from "../../context/UserContext";
import "./DisplayInfo.css";
import CSVReader from "react-csv-reader";

const StatisticExampleValueShorthand = ({ handleForce, projects }) => {
    const { user } = useContext(UserContext);
    const [tempProjects, setTempProjects] = useState([]);

    console.log(user, "from TESTING");

    // users are on an object need to pull value out to conditional render admin view

    return (
        <div>
            {user ? (
                <div>
                    <Segment className="DisplayInfo">
                        <h3>Project Data</h3>
                        <Statistic.Group tex size="small">
                            <Statistic
                                label="Projects"
                                value={projects.length}
                            />
                            <Statistic label="Students" value="600" />
                        </Statistic.Group>
                    </Segment>

                    <CSVReader
                        cssClass="csv-reader-input"
                        label="Select CSV with projects"
                        onFileLoaded={handleForce}
                        inputId="ObiWan"
                        inputStyle={{ color: "red" }}
                    />
                </div>
            ) : <h1>Student View</h1>}
        </div>
    );
};

export default StatisticExampleValueShorthand;

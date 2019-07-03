import React, { useState, useContext } from "react";
import { Statistic, Segment } from "semantic-ui-react";
import "./DisplayInfo.css";
import CSVReader from "react-csv-reader";

const StatisticExampleValueShorthand = ({handleForce, projects}) => {
    const [tempProjects, setTempProjects] = useState([]);

    return (
        <div>
            <Segment className="DisplayInfo">
                <h3>Project Data</h3>
                <Statistic.Group tex size="small">
                    <Statistic label="Projects" value={projects.length} />
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
    );
};

export default StatisticExampleValueShorthand;

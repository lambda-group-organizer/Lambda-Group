import React from "react";
import { Statistic,  Segment} from "semantic-ui-react";
import './DisplayInfo.css'

const StatisticExampleValueShorthand = () => (
  <Segment style={{marginBottom: "25px", width: "210px", marginLeft: "10px", marginTop: '2%'}}>
        <h3 style={{textAlign: "center"}}>Project Data</h3>
        <Statistic.Group size="mini">
            <Statistic label="Projects" value="50" />
            <Statistic label="Signups" value="200" />
        </Statistic.Group>
    </Segment>
);

export default StatisticExampleValueShorthand;

import React, { useState, useEffect, useContext } from "react";
import { db } from "../../../logic/firebase.js";
import { Link } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";
import { UserContext } from "../../../context/allContexts";

const BuildWeekSelection = props => {
  const { setCurrentBuildWeekURL } = useContext(UserContext);
  const [hackathons, setHackathons] = useState([]);
  useEffect(() => {
    let urls = [];
    db.collection("build_weeks")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          urls.push(doc.data().buildWeekName);
        });
        console.log(urls);
        setHackathons(urls);
      });
  }, []);

  const handleBuildWeekSelection = nameOfBuildWeek => {
    setCurrentBuildWeekURL(nameOfBuildWeek);
    // TODO: CHECK IF ROLE ALREADY CHOOSEN FOR PREVIOUS BUILD WEEK.
    // IF IT IS PUSH TO BUILD WEEK VIEW
  };

  return (
    <div>
      <Header as="h2">Pick a build week</Header>
      {hackathons &&
        hackathons.map(hack => {
          console.log("hack", hack);
          return (
            <Button
              key={hack}
              color="blue"
              onClick={() => handleBuildWeekSelection(hack)}
            >
              {hack}
            </Button>
          );
        })}
    </div>
  );
};

export default BuildWeekSelection;
//to={`/student/buildWeek/${hack}`}

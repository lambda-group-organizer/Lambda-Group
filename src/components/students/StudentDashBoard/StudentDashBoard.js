import React, { useState, useEffect } from "react";
import DashBoardHeader from "../../globalComponents/DashBoardHeader.js";
import { db } from "../../../logic/firebase.js";
import { Link } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";
//import StudentBuildWeekLink from '../StudentBuildWeekLink/StudentBuildWeekLink.js';

const StudentDashBoard = props => {
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

  // function formatLinksName(item) {
  // ALTERNATIVE OPTION BUT WORSE ON PERFORMANCE
  //retun item.split('/').pop(-1);
  // return item.toString().match(/\/([^\/]+)\/?$/)[1];
  //   \/ match a slash
  //   (  start of a captured group within the match
  //   [^\/] match a non-slash character
  //   + match one of more of the non-slash characters
  //   )  end of the captured group
  //   \/? allow one optional / at the end of the string
  //   $  match to the end of the string
  // }

  return (
    <>
      <DashBoardHeader />
      <Header as="h2">Pick a build week</Header>
      <div>
        {hackathons &&
          hackathons.map(hack => {
            console.log("hack", hack);
            return (
              <Button key={hack} color="blue">
                <Link
                  style={{ color: "white" }}
                  to={`/student/buildWeek/${hack}`}
                >
                  {hack}
                </Link>
              </Button>
            );
          })}
      </div>
    </>
  );
};

export default StudentDashBoard;

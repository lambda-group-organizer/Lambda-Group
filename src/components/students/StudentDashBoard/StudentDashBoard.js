import React, { useState, useEffect, useContext } from "react";
import DashBoardHeader from "../../globalComponents/DashBoardHeader.js";
import { db } from "../../../logic/firebase.js";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { UserContext } from "../../../context/allContexts";
import fetchBuildWeekProjects from "../../../utils/fetchBuildWeekProjects";

//import StudentBuildWeekLink from '../StudentBuildWeekLink/StudentBuildWeekLink.js';

const StudentDashBoard = props => {
  const [hackathons, setHackathons] = useState([]);
  const {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    currentBuildWeekURL,
    setCurrentBuildWeekURL
  } = useContext(UserContext);

  useEffect(() => {
    let url = "localhost:3000/";
    let tempProjects = [];
    db.collection("build_weeks")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(async doc => {
          if (currentBuildWeekURL === doc.data().buildWeekName) {
            // url += currentBuildWeekURL;
            tempProjects = await fetchBuildWeekProjects(currentBuildWeekURL);
          }
          // console.log(url);
        });
        console.log(url);
        setHackathons(tempProjects);
      });
  }, []);

  function formatLinksName(item) {
    // ALTERNATIVE OPTION BUT WORSE ON PERFORMANCE
    //retun item.split('/').pop(-1);
    return item.toString().match(/\/([^\/]+)\/?$/)[1];
    //   \/ match a slash
    //   (  start of a captured group within the match
    //   [^\/] match a non-slash character
    //   + match one of more of the non-slash characters
    //   )  end of the captured group
    //   \/? allow one optional / at the end of the string
    //   $  match to the end of the string
  }

  return (
    <>
      <DashBoardHeader />
      {/*<StudentBuildWeekLink />*/}
      <div>
        {hackathons &&
          hackathons.map(hack => {
            console.log("hack", hack);
            return (
              <Button key={hack} color="blue">
                <Link style={{ color: "white" }} to={hack}>
                  {formatLinksName(hack.toString())}
                </Link>
              </Button>
            );
          })}
      </div>
    </>
  );
};

export default StudentDashBoard;

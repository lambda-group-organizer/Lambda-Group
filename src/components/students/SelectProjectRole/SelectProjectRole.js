import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { UserContext } from "../../../context/allContexts";
import { db } from "../../../logic/firebase.js";
import { withRouter } from "react-router-dom";

const SelectProjectRole = ({ history }) => {
  const {
    projectRole,
    setProjectRole,
    user,
    currentSelectedProject,
    currentBuildWeekURL,
    setCurrentBuildWeekURL
  } = useContext(UserContext);

  const possibleRoles = [
    {
      title: "Android Developer",
      selection: "androidDeveloper"
    },
    {
      title: "Data Engineer",
      selection: "dataEngineer"
    },
    {
      title: "Front End Developer",
      selection: "frontEndDeveloper"
    },
    {
      title: "Front End Frame Work Developer",
      selection: "FrontEndFrameWorkDeveloper"
    },
    {
      title: "Machine Learning Engineer",
      selection: "machineLearningEngineer"
    },
    {
      title: "Project Lead",
      selection: "projectLead"
    },
    {
      title: "UX Designer",
      selection: "uXDesigner"
    },
    {
      title: "Web Back End Developer",
      selection: "webBackEndDeveloper"
    },
    {
      title: "Web UI Developer",
      selection: "WebUiDeveloper"
    }
  ];
  const [roles] = useState(possibleRoles);

  const addProjectRoleToContext = whichRole => {
    setProjectRole(whichRole);
    addProjectRoleToFirestore(whichRole);
    console.log("ROLE SET");
  };

  const addProjectRoleToFirestore = projectRole => {
    console.log("user: ", user);
    console.log("projectRole: ", projectRole);
    // TODO: Call to DB and get current project
    let data;
    console.log(currentSelectedProject);
    if (currentSelectedProject !== "") {
      data = {
        buildWeeks: {
          [currentBuildWeekURL]: {
            projectRole: projectRole,
            project: currentSelectedProject
          }
        }
      };
    } else {
      data = {
        buildWeeks: {
          [currentBuildWeekURL]: {
            projectRole: projectRole,
            project: ""
          }
        }
      };
    }

    db.collection("students")
      .doc(user.uid)
      .set(data, { merge: true })
      .then(history.push(`/student/buildweek/${currentBuildWeekURL}`));
  };

  return (
    <div>
      <h1>Whats Your Role For This Build Week / Hackathon?</h1>
      {roles.map(role => {
        return (
          <Button
            onClick={() => addProjectRoleToContext(role.selection)}
            color="green"
            key={role.title}
          >
            {role.title}
          </Button>
        );
      })}
      <p>
        Back to build week selection{" "}
        <Button onClick={() => setCurrentBuildWeekURL(null)}>Back</Button>
      </p>
    </div>
  );
};

export default withRouter(SelectProjectRole);

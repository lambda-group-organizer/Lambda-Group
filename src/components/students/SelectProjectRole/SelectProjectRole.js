import React, { useState, useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { UserContext, BuildWeekContext } from "../../../context/allContexts";
import { db } from "../../../logic/firebase.js";
import { withRouter } from "react-router-dom";

const SelectProjectRole = ({ history }) => {
  const {
    email,
    userBuildWeeks,
    currentBuildWeekURL,
    setCurrentBuildWeekURL
  } = useContext(UserContext);

  const { projectsContext, fetchBuildWeekProjects } = useContext(
    BuildWeekContext
  );

  const possibleRoles = [
    {
      title: "Android Developer",
      selection: "androidDeveloper"
    },
    {
      title: "iOS Developer",
      selection: "iosDeveloper"
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
      selection: "frontEndFrameWorkDeveloper"
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
      selection: "webUiDeveloper"
    }
  ];
  const [roles] = useState(possibleRoles);

  const addProjectRoleToContext = whichRole => {
    addProjectRoleToFirestore(whichRole);
  };

  const addProjectRoleToFirestore = async projectRole => {
    let data;

    // If user is signing into a buildweek that they signed up for a project in previously as a different role,
    // remove them from the old project and clear out their project info from database
    if (
      !userBuildWeeks ||
      !userBuildWeeks[currentBuildWeekURL] ||
      userBuildWeeks[currentBuildWeekURL].projectRole === "" ||
      userBuildWeeks[currentBuildWeekURL].projectRole !== projectRole
    ) {
      // TODO: make a confirm here to double check they wish to proceed
      if (
        userBuildWeeks &&
        userBuildWeeks[currentBuildWeekURL] &&
        userBuildWeeks[currentBuildWeekURL].projectRole !== "" &&
        !window.confirm(
          "Are you sure?  If you signed up as a different role for this build week previously, you will be removed from that project!"
        )
      ) {
        return null;
      }

      // If moving to a different role in the same buildweek
      if (
        userBuildWeeks &&
        userBuildWeeks[currentBuildWeekURL] &&
        userBuildWeeks[currentBuildWeekURL].projectRole !== projectRole &&
        userBuildWeeks[currentBuildWeekURL].project !== ""
      ) {
        // remove user from previous project in the build week

        // filter names from project context
        let projectToChange = projectsContext.filter(project => {
          return (
            project.project.uid ===
            userBuildWeeks[currentBuildWeekURL].projectUid
          );
        });

        projectToChange = projectToChange[0];

        // filter student out of previous project's list of names for his/her role
        let newNames = projectToChange.project.availableRoles[
          userBuildWeeks[currentBuildWeekURL].projectRole
        ].names.filter(n => n.email !== email);

        // remove student's name object from previous build week in DB
        await db
          .doc(
            // build_weeks/current_build_week/projects/<project_uid>
            `build_weeks/${currentBuildWeekURL}/projects/${userBuildWeeks[currentBuildWeekURL].projectUid}`
          )
          .update({
            project: {
              ...projectToChange.project,
              availableRoles: {
                ...projectToChange.project.availableRoles,
                [userBuildWeeks[currentBuildWeekURL].projectRole]: {
                  ...projectToChange.project.availableRoles[
                    userBuildWeeks[currentBuildWeekURL].projectRole
                  ],
                  names: [...newNames]
                }
              }
            }
          })
          .then(() => null)
          .catch(err => console.error("err: ", err));
      }

      // Build data that goes into user side of database
      data = {
        buildWeeks: {
          [currentBuildWeekURL]: {
            projectRole: projectRole,
            project: "",
            projectUid: ""
          }
        }
      };
      db.collection("students")
        .doc(email)
        .set(data, { merge: true })
        .then(history.push(`/student/buildweek/${currentBuildWeekURL}`));
    } else {
      history.push(`/student/buildweek/${currentBuildWeekURL}`);
    }
  };

  useEffect(() => {
    fetchBuildWeekProjects(currentBuildWeekURL, projectsContext);
  }, []);

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

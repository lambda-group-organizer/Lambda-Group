import React, { useState, useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { UserContext, BuildWeekContext } from "../../../context/allContexts";
import { db } from "../../../logic/firebase.js";
import { withRouter } from "react-router-dom";

const SelectProjectRole = ({ history }) => {
  const {
    email,
    userBuildWeeks,
    user,
    setProjectRole,
    currentSelectedProject,
    currentBuildWeekURL,
    setCurrentBuildWeekURL
  } = useContext(UserContext);

  // const {project, projectRole, projectUid} = userBuildWeeks[currentBuildWeekURL];

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
    addProjectRoleToFirestore(whichRole);
    console.log("ROLE SET");
  };

  const addProjectRoleToFirestore = async projectRole => {
    console.log("user: ", user);
    console.log("projectRole: ", projectRole);
    let data;
    console.log(currentSelectedProject);

    // If user is signing into a buildweek that they signed up for a project in previously as a different role,
    // remove them from the old project and clear out their project info from database
    if (
      !userBuildWeeks ||
      !userBuildWeeks[currentBuildWeekURL] ||
      userBuildWeeks[currentBuildWeekURL].projectRole === "" ||
      userBuildWeeks[currentBuildWeekURL].projectRole !== projectRole
    ) {
      // TODO: make an alert here to double check they wish to proceed
      if (
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

        console.log(projectsContext);
        let projectToChange = projectsContext.filter(project => {
          console.log(
            "====================================================================================="
          );
          console.log(project.project.uid);
          console.log(userBuildWeeks[currentBuildWeekURL].projectUid);
          console.log(
            project.project.uid ===
              userBuildWeeks[currentBuildWeekURL].projectUid
          );
          return (
            project.project.uid ===
            userBuildWeeks[currentBuildWeekURL].projectUid
          );
        });

        projectToChange = projectToChange[0];

        console.log(
          "Role to change from",
          userBuildWeeks[currentBuildWeekURL].projectRole
        );
        // filter student out of previous project's list of names for his/her role
        let newNames = projectToChange.project.availableRoles[
          userBuildWeeks[currentBuildWeekURL].projectRole
        ].names.filter(n => n.email !== email);
        console.log(newNames);

        // remove student's name object from previous build week in DB
        console.log("Data being sent: ", {
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
        });
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
          .then(() => console.log("finished updating"))
          .catch(err => console.log("err: ", err));
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

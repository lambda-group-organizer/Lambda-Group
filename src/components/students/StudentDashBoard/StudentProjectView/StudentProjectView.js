import React, { useContext } from "react";
import { Card, Button } from "semantic-ui-react";
import { UserContext } from "../../../../context/allContexts";
import { db } from "../../../../logic/firebase";

import styles from "./StudentProjectView.module.scss";

// TODO: Add minion powers to this file with conditional rendering for minion role

const StudentProjectView = ({ project: { project }, setProjectModalData }) => {
  const {
    user,
    email,
    currentBuildWeekURL,
    userBuildWeeks,
    setLoading
  } = useContext(UserContext);

  //function showStudents() {
  //console.log(user)
  //TODO: Hook this up to show signed up
  //}

  const handleJoinProject = async project => {
    setLoading(true);
    if (
      userBuildWeeks[currentBuildWeekURL] &&
      userBuildWeeks[currentBuildWeekURL].project !== ""
    ) {
      let oldProjRef = await db
        .collection("build_weeks")
        .doc(currentBuildWeekURL)
        .collection("projects")
        .doc(userBuildWeeks[currentBuildWeekURL].projectUid);
      let oldProjectData = await oldProjRef.get();
      oldProjectData = oldProjectData.data();
      if (
        oldProjectData.project.availableRoles[
          userBuildWeeks[currentBuildWeekURL].projectRole
        ].names.length > 0
      ) {
        let newOldProjectData = oldProjectData.project.availableRoles[
          userBuildWeeks[currentBuildWeekURL].projectRole
        ].names.filter(n => n.email !== email);

        oldProjectData.project.availableRoles[
          userBuildWeeks[currentBuildWeekURL].projectRole
        ].names = newOldProjectData;

        oldProjRef.set(oldProjectData);
      }
    }
    // reference project in DB
    const projectRef = db
      .collection("build_weeks")
      .doc(currentBuildWeekURL)
      .collection("projects")
      .doc(project.uid);
    // Get the data for the user's desired role that project from DB
    const projectData = await projectRef.get();
    console.log(projectData.data())

    let projectRoleData = await projectData.data().project.availableRoles[
      userBuildWeeks[currentBuildWeekURL].projectRole
    ];
    console.log(projectRoleData)
    console.log(userBuildWeeks[currentBuildWeekURL].projectRole);
    // check if there is room in that project for user
    if (
      projectRoleData.names.length <
      project[userBuildWeeks[currentBuildWeekURL].projectRole].names
    ) {
      // Add user to project's data on DB
      await projectRef.set(
        {
          project: {
            availableRoles: {
              [userBuildWeeks[currentBuildWeekURL].projectRole]: {
                names: [
                  ...projectRoleData.names,
                  { name: user.displayName, email: email }
                ]
              }
            }
          }
        },
        { merge: true }
      );

      // Add project to user's data on DB
      const userRef = db.collection("students").doc(email);
      await userRef.set(
        {
          buildWeeks: {
            [currentBuildWeekURL]: {
              project: project.title,
              projectUid: project.uid
            }
          }
        },
        { merge: true }
      );
      // setCurrentSelectedProject(project.title);
      // setCurrentSelectedProjectUid(project.uid);
      //showStudents()
    } else {
      alert(
        `SORRY NO MORE ${userBuildWeeks[currentBuildWeekURL].projectRole}S SLOTS LEFT. PICK ANOTHER PROJECT PLEASE!`
      );
    }
    // const projectData = await projectRef.set({availableRoles: {[projectRole]: {names: []}}}, {merge: true})
    // data = data.data(); "Frontend Developer"
    setLoading(false);
  };

  //const fetchNames = (project) => {
  //project.availableRoles.androidDeveloper.names.map(({name, email}) => (
  //<span key={email}>{name}</span>
  //))}

  return (
    <Card key={project.uid} raised={true} centered={true}>
      <Card.Content
        header={
          project.title.length > 25
            ? project.title.slice(0, 25) + "..."
            : project.title
        }
        className={styles.cardHeader}
      />
      <Card.Content>
        {/* TODO: MUST REFACTOR THIS LATER*/}
        {project.pitch.length > 200
          ? project.pitch.slice(0, 200) + "..."
          : project.pitch}
      </Card.Content>
      <Card.Content>
        {project.availableRoles.androidDeveloper.names.map(
          ({ name, email }) => (
            <span className={styles.span} key={email}>
              {name}
            </span>
          )
        )}
        {project.availableRoles.iosDeveloper.names.map(({ name, email }) => (
          <span className={styles.span} key={email}>
            {name}
          </span>
        ))}
        {project.availableRoles.dataEngineer.names.map(({ name, email }) => (
          <span className={styles.span} key={email}>
            {name}
          </span>
        ))}
        {project.availableRoles.frontEndDeveloper.names.map(
          ({ name, email }) => (
            <span className={styles.span} key={email}>
              {name}
            </span>
          )
        )}
        {project.availableRoles.frontEndFrameWorkDeveloper.names.map(
          ({ name, email }) => (
            <span className={styles.span} key={email}>
              {name}
            </span>
          )
        )}
        {project.availableRoles.machineLearningEngineer.names.map(
          ({ name, email }) => (
            <span className={styles.span} key={email}>
              {name}
            </span>
          )
        )}
        {project.availableRoles.projectLead.names.map(({ name, email }) => (
          <span className={styles.span} key={email}>
            {name}
          </span>
        ))}
        {project.availableRoles.uXDesigner.names.map(({ name, email }) => (
          <span className={styles.span} key={email}>
            {name}
          </span>
        ))}
        {project.availableRoles.webBackEndDeveloper.names.map(
          ({ name, email }) => (
            <span className={styles.span} key={email}>
              {name}
            </span>
          )
        )}
        {project.availableRoles.webUiDeveloper.names.map(({ name, email }) => (
          <span className={styles.span} key={email}>
            {name}
          </span>
        ))}
      </Card.Content>
      {userBuildWeeks[currentBuildWeekURL].project !== project.title && (
        <Card.Content>
          {project.productType}{" "}
          <Button onClick={() => handleJoinProject(project)}>+Join</Button>
        </Card.Content>
      )}
      {userBuildWeeks[currentBuildWeekURL].project === project.title && (
        <Card.Content style={{ backgroundColor: "green", color: "white" }}>
          Signed up!
        </Card.Content>
      )}
      <div
        style={{ height: "50px", width: "100%", backgroundColor: "cyan" }}
        onClick={() => setProjectModalData(project)}
      >
        See more
      </div>
    </Card>
  );
};

export default StudentProjectView;

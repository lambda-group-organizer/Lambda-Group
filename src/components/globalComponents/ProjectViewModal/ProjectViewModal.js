import React, { useContext, useEffect } from "react";
import { Card, Button, Header, Icon } from "semantic-ui-react";
import { UserContext } from "../../../context/allContexts";
import { db } from "../../../logic/firebase";

import styles from "./ProjectViewModal.module.scss";

const StudentProjectViewModal = ({ projectModalData, setProjectModalData }) => {
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
    setCurrentBuildWeekURL,
    projectRole,
    setProjectRole,
    currentSelectedProject,
    setCurrentSelectedProject,
    setLoading,
    currentSelectedProjectUid,
    setCurrentSelectedProjectUid
  } = useContext(UserContext);

  //function showStudents() {
  //console.log(user)
  //TODO: Hook this up to show signed up
  //}

  const handleJoinProject = async project => {
    console.log(project);
    setLoading(true);
    if (currentSelectedProject !== "") {
      let oldProjRef = await db
        .collection("build_weeks")
        .doc(currentBuildWeekURL)
        .collection("projects")
        .doc(currentSelectedProjectUid);
      let oldProjectData = await oldProjRef.get();
      oldProjectData = oldProjectData.data();
      if (oldProjectData.project.availableRoles[projectRole].names.length > 0) {
        let newOldProjectData = oldProjectData.project.availableRoles[
          projectRole
        ].names.filter(n => n.email !== email);

        oldProjectData.project.availableRoles[
          projectRole
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
    let projectRoleData = await projectData.data().project.availableRoles[
      projectRole
    ];
    // check if there is room in that project for user
    if (projectRoleData.names.length < project[projectRole]) {
      // Add user to project's data on DB
      await projectRef.set(
        {
          project: {
            availableRoles: {
              [projectRole]: {
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
      const userRef = db.collection("students").doc(user.uid);
      let data = await userRef.set(
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
      setCurrentSelectedProject(project.title);
      setCurrentSelectedProjectUid(project.uid);
      //showStudents()
    } else {
      alert(
        `SORRY NO MORE ${projectRole}S SLOTS LEFT. PICK ANOTHER PROJECT PLEASE!`
      );
    }
    setLoading(false);
  };

  return (
    <div
      className={styles.modalContainer}
      onClick={() => setProjectModalData(null)}
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalTitle}>
          <h3>{projectModalData.title}</h3>
        </div>
        <div className={styles.modalMainBody}>
          <p>{projectModalData.pitch}</p>
          <p>{projectModalData.mvp}</p>
          <p>{projectModalData.stretch}</p>
        </div>
        <div className={styles.modalTeamMembers}>
          <h3>Team Members</h3>
          {projectModalData.availableRoles.androidDeveloper.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.iosDeveloper.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.dataEngineer.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.frontEndDeveloper.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.frontEndFrameWorkDeveloper.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.machineLearningEngineer.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.projectLead.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.uXDesigner.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.webBackEndDeveloper.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
          {projectModalData.availableRoles.webUiDeveloper.names.map(
            ({ name, email }) => (
              <span className={styles.span} key={email}>
                {name}
              </span>
            )
          )}
        </div>
        <div className={styles.modalSignup}>
          <Button
            color="green"
            onClick={() => handleJoinProject(projectModalData)}
          >
            Sign up
          </Button>
          <Button onClick={() => setProjectModalData(null)} color="red">
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentProjectViewModal;

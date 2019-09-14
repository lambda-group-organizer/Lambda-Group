import React, { useContext } from "react";
import { Button, Icon } from "semantic-ui-react";
import { UserContext } from "../../../context/allContexts";
import { db } from "../../../logic/firebase";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

import styles from "./ProjectViewModal.module.scss";

const ProjectViewModal = ({ projectModalData, setProjectModalData }) => {
  const {
    user,
    email,
    role,
    currentBuildWeekURL,
    userBuildWeeks,
    setLoading
  } = useContext(UserContext);

  const handleJoinProject = async project => {
    console.log(project);
    setLoading(true);
    if (userBuildWeeks[currentBuildWeekURL].project !== "") {
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
    let projectRoleData = await projectData.data().project.availableRoles[
      userBuildWeeks[currentBuildWeekURL].projectRole
    ];
    // check if there is room in that project for user
    if (
      projectRoleData.names.length <
      project[userBuildWeeks[currentBuildWeekURL].projectRole]
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
    } else {
      alert(
        `SORRY NO MORE ${userBuildWeeks[currentBuildWeekURL].projectRole}S SLOTS LEFT. PICK ANOTHER PROJECT PLEASE!`
      );
    }
    setLoading(false);
  };

  const handleAddRole = async roleToAdd => {
    let limit = parseInt(projectModalData[roleToAdd]);
    limit++;
    await db
      .doc(
        `build_weeks/${currentBuildWeekURL}/projects/${projectModalData.uid}`
      )
      .set(
        {
          project: { [roleToAdd]: limit }
        },
        { merge: true }
      );
  };

  const handleSubtractRole = async roleToSubtract => {
    let limit = parseInt(projectModalData[roleToSubtract]);
    const numSignedUp =
      projectModalData.availableRoles[roleToSubtract].names.length;
    if (numSignedUp < limit && limit > 0) {
      limit--;
      await db
        .doc(
          `build_weeks/${currentBuildWeekURL}/projects/${projectModalData.uid}`
        )
        .set(
          {
            project: { [roleToSubtract]: limit }
          },
          { merge: true }
        );
    } else if (limit === 0) {
      alert("Can't subtract any more");
    } else {
      alert("Please delete a user first");
    }
  };

  const handleRemoveStudent = async (email, studentRole, namesList) => {
    console.log(email, studentRole, namesList);
    // remove student from project in project database
    const studentRef = db.doc(`students/${email}`);
    let studentToBeRemoved = await studentRef.get();
    studentToBeRemoved = studentToBeRemoved.data();
    studentRef.set({
      ...studentToBeRemoved,
      buildWeeks: {
        ...studentToBeRemoved.buildWeeks,
        [currentBuildWeekURL]: {
          ...studentToBeRemoved.buildWeeks[currentBuildWeekURL],
          project: "",
          projectUid: ""
        }
      }
    });
    let newNames = namesList.filter(n => n.email !== email);

    console.log(newNames);
    console.log(
      `build_weeks/${currentBuildWeekURL}/projects/${projectModalData.uid}`
    );

    await db
      .doc(
        `build_weeks/${currentBuildWeekURL}/projects/${projectModalData.uid}`
      )
      .update({
        project: {
          ...projectModalData,
          availableRoles: {
            ...projectModalData.availableRoles,
            [studentRole]: {
              ...projectModalData.availableRoles[studentRole],
              names: [...newNames]
            }
          }
        }
      });
    // remove project from student in student database
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
          <ul>
            {Object.keys(projectModalData.availableRoles).map(allRoles => {
              console.log("allRoles: ", projectModalData[allRoles]);
              if (role === "student" && projectModalData[allRoles] <= 0) {
                return null;
              } else {
                return (
                  <li key={allRoles}>
                    {allRoles} (max - {projectModalData[allRoles]}){" "}
                    {role !== "student" ? (
                      <>
                        <FaMinusSquare
                          className={styles.icon}
                          // TODO: Fix handle add role
                          // TODO: Add loading state for adding roles
                          onClick={() => handleSubtractRole(allRoles)}
                        />
                        <FaPlusSquare
                          className={styles.icon}
                          // TODO: Fix handle add role
                          // TODO: Add loading state for adding roles
                          onClick={() => handleAddRole(allRoles)}
                        />
                      </>
                    ) : null}
                    {projectModalData.availableRoles[allRoles].names.map(r => {
                      return (
                        <div key={r.email}>
                          {/*ADD FUNCTION TO REMOVE STUDENT FROM PROJECT*/}
                          {role === "overlord" ? (
                            <Button
                              color="red"
                              animated="vertical"
                              onClick={() =>
                                handleRemoveStudent(
                                  r.email,
                                  allRoles,
                                  projectModalData.availableRoles[allRoles]
                                    .names
                                )
                              }
                            >
                              <Button.Content visible>{r.name}</Button.Content>
                              <Button.Content hidden>
                                <Icon name="remove user" />
                              </Button.Content>
                            </Button>
                          ) : (
                            <p>
                              {r.name}
                              {r.email}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.modalSignup}>
          {role !== "overlord" ? (
            <Button
              color="green"
              onClick={() => handleJoinProject(projectModalData)}
            >
              Sign up
            </Button>
          ) : null}
          <Button onClick={() => setProjectModalData(null)} color="red">
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewModal;

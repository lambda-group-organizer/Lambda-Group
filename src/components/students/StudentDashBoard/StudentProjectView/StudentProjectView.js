import React, { useContext } from "react";
import { Card, Button } from "semantic-ui-react";
import { UserContext } from "../../../../context/allContexts";
import { db } from "../../../../logic/firebase";

import styles from "./StudentProjectView.module.scss";

const StudentProjectView = ({ project: { project }, setProjectModalData }) => {
  const {
    user,
    email,
    currentBuildWeekURL,
    userBuildWeeks,
    setLoading
  } = useContext(UserContext);

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
      // TODO: Make this alert pretty and not just a system alert
      alert(
        `Sorry no more ${userBuildWeeks[currentBuildWeekURL].projectRole}s slots left.  Please pick another project.`
      );
    }
    setLoading(false);
  };

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
        {project.pitch.length > 200
          ? project.pitch.slice(0, 200) + "..."
          : project.pitch}
      </Card.Content>
      <Card.Content>
        Team:
        {Object.keys(project.availableRoles).map(projectRole => {
          return project.availableRoles[projectRole].names.map(student => {
            return (
              <span className={styles.span} key={student.email}>
                {/* TODO: Fix to be dots with two initials */}
                {student.name[0]}
              </span>
            );
          });
        })}
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

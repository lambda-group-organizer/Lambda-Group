import React, { useContext, useEffect } from "react";
import { Card, Button, Header, Icon } from "semantic-ui-react";
import { UserContext } from "../../../context/allContexts";
import { db } from "../../../logic/firebase";

import styles from "../../students/StudentDashBoard/StudentProjectView/StudentProjectView.module.scss";

const AdminProjectView = ({ project: { project }, setProjectModalData }) => {
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
        Team:
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
      {/* {currentSelectedProject !== project.title && (
        <Card.Content>
          {project.productType}{" "}
          <Button onClick={() => handleJoinProject(project)}>+Join</Button>
        </Card.Content>
      )}
      {currentSelectedProject === project.title && (
        <Card.Content style={{ backgroundColor: "green", color: "white" }}>
          Signed up!
        </Card.Content>
      )} */}
      <div
        style={{ height: "50px", width: "100%", backgroundColor: "cyan" }}
        onClick={() => setProjectModalData(project)}
      >
        See more
      </div>
    </Card>
  );
};

export default AdminProjectView;

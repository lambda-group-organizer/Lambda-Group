import React from "react";
import { Card, Header } from "semantic-ui-react";

import styles from "../../students/StudentDashBoard/StudentProjectView/StudentProjectView.module.scss";

const AdminProjectView = ({ project: { project }, setProjectModalData }) => {
  return (
    <Card
      key={project.uid}
      raised={true}
      centered={true}
      onClick={() => setProjectModalData(project)}
    >
      <Card.Content style={{ backgroundColor: "#ba112e", color: "white" }}>
        <Header
          as="h3"
          className={styles.cardHeader}
          style={{ color: "white" }}
        >
          {project.title.length > 25
            ? project.title.slice(0, 25) + "..."
            : project.title}
        </Header>
      </Card.Content>
      <Card.Content style={{ color: "#323232" }}>
        {project.pitch.length > 200
          ? project.pitch.slice(0, 200) + "..."
          : project.pitch}
      </Card.Content>
      <Card.Content>
        {/* TODO: CHANGE TO DOTS WITH FIRST AND LAST INITIAL*/}
        Team:
        {Object.keys(project.availableRoles).map(projectRole => {
          return project.availableRoles[projectRole].names.map(student => {
            return (
              <span className={styles.span} key={student.email}>
                {student.name[0]}
              </span>
            );
          });
        })}
      </Card.Content>
    </Card>
  );
};

export default AdminProjectView;

// Modules
import React, { useState, useEffect, useContext, useRef } from "react";
import firebase, { db } from "../../../logic/firebase.js";
import { Button, Card, Header, Form, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import fuzzySearch from "../../../components/globalComponents/fuzzySearch";
import { UserContext, BuildWeekContext } from "../../../context/allContexts";
// Components
import DashBoardHeader from "../../globalComponents/DashBoardHeader";
import StudentProjectView from "./StudentProjectView/StudentProjectView";
import LoginAnimation from "../../Auth/LoginAnimation";
import "../../../Dashboard/Dashboard.css";
import ProjectViewModal from "../../globalComponents/ProjectViewModal/ProjectViewModal";

const StudentBuildWeekView = props => {
  // state from context
  const {
    user,
    currentBuildWeekURL,
    setProjectRole,
    setCurrentSelectedProject,
    setCurrentSelectedProjectUid,
  } = useContext(UserContext);

  const { projectsContext, setProjectsContext, fetchBuildWeekProjects } = useContext(BuildWeekContext);
  const [filteredProjects, setFilteredProjects] = useState([]);
  // Local state
  const [projectModalData, setProjectModalData] = useState(null);


  const fetchProjects = async () => {
    const { buildWeek } = props.match.params;
    fetchBuildWeekProjects(buildWeek, projectsContext);
  };

  const getStudentRole = async () => {
    const userRef = db.collection("students").doc(user.uid);
    let data = await userRef.get();
    setProjectRole(data.data().buildWeeks[currentBuildWeekURL].projectRole);
    setCurrentSelectedProject(
      data.data().buildWeeks[currentBuildWeekURL].project
    );
    setCurrentSelectedProjectUid(
      data.data().buildWeeks[currentBuildWeekURL].projectUid
    );
  };

  useEffect((buildWeek, projectsContext) => {
    fetchProjects(buildWeek, projectsContext);
    getStudentRole();
  }, []);

  useEffect(() => {
      setFilteredProjects(projectsContext);
  }, [projectsContext]);

  function handleFuzzySearch(e) {
    // Fuzzy search for students involved, title, description, productType(ios, web, etc)
    let searchResults = fuzzySearch(
      projectsContext,
      ["project.title", "project.description", "project.productType"],
      e
    );
    if (e.target.value === "") {
      setFilteredProjects(projectsContext);
    } else {
      setFilteredProjects(searchResults);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
      {projectModalData && (
        <ProjectViewModal
          setProjectModalData={setProjectModalData}
          projectModalData={projectModalData}
        />
      )}
      <DashBoardHeader />
      <div className="displayContainer">
        <LoginAnimation />
        <div>
          <Form.Input
            type="text"
            onChange={e => handleFuzzySearch(e)}
            focus
            size="big"
            icon="filter"
            iconPosition="left"
            placeholder="Fuzzy Search Projects"
          />
        </div>
      </div>
      <Card.Group>
        {filteredProjects &&
          filteredProjects.map(project => {
            return (
              <div key={project.project.uid}>
                <StudentProjectView
                  project={project}
                  setProjectModalData={setProjectModalData}
                />
              </div>
            );
          })}
      </Card.Group>
    </div>
  );
};

export default withRouter(StudentBuildWeekView);

// Modules
import React, { useState, useEffect, useContext } from "react";
import { Card, Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import fuzzySearch from "../../../components/globalComponents/fuzzySearch";
import { BuildWeekContext } from "../../../context/allContexts";
import ExportCSV from "../BuildWeeksList/ExportCSV.js";

// Components
import DashBoardHeader from "../../globalComponents/DashBoardHeader";
import AdminProjectView from "./AdminProjectView";
import LoginAnimation from "../../Auth/LoginAnimation";
import "../../../Dashboard/Dashboard.css";
import ProjectViewModal from "../../globalComponents/ProjectViewModal/ProjectViewModal";

const Dashboard = props => {
  const { projectsContext, fetchBuildWeekProjects } = useContext(
    BuildWeekContext
  );
  const [filteredProjects, setFilteredProjects] = useState([]);
  // Local state
  const [projectModalData, setProjectModalData] = useState(null);

  // const signOut = () => {
  //   firebase.auth().signOut();
  // };

  const fetchProjects = async () => {
    const { buildWeek } = props.match.params;
    fetchBuildWeekProjects(buildWeek, projectsContext);
  };

  useEffect((buildWeek, projectsContext) => {
    fetchProjects(buildWeek, projectsContext);
  }, []);

  useEffect(() => {
    // when projects on the backend update, update all project cards
    setFilteredProjects(projectsContext);

    // update the project modal with new data only if it's open
    if (projectModalData) {
      projectsContext.map(contextProject => {
        if (contextProject.project.uid === projectModalData.uid) {
          setProjectModalData(contextProject.project);
        }
        return null;
      });
    }
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
            placeholder="Search by Project title, type or student name"
          />
        </div>
        <ExportCSV />
      </div>
      <Card.Group>
        {filteredProjects &&
          filteredProjects.map(project => {
            console.log("FILTERED PROJECTS");
            return (
              <div key={project.project.uid}>
                <AdminProjectView
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

export default withRouter(Dashboard);

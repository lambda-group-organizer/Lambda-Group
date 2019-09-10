// Modules
import React, { useState, useEffect, useContext } from "react";
import firebase, { db } from "../../../logic/firebase.js";
import { Button, Card, Header, Form, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import fuzzySearch from "../../../components/globalComponents/fuzzySearch";
import { BuildWeekContext } from "../../../context/allContexts";

// Components
import DashBoardHeader from "../../globalComponents/DashBoardHeader";
import AdminProjectView from "./AdminProjectView";
import LoginAnimation from "../../Auth/LoginAnimation";
import "../../../Dashboard/Dashboard.css";
import fetchBuildWeekProjects from "../../../utils/fetchBuildWeekProjects";

const Dashboard = props => {
  const {
    projectsContext,
    setProjectsContext,
    fetchBuildWeekProjects
  } = useContext(BuildWeekContext);
  const [filteredProjects, setFilteredProjects] = useState([]);
  // Local state
  const [projectModalData, setProjectModalData] = useState(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

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
      </div>
      {filteredProjects &&
        filteredProjects.map(project => {
          console.log("FILTERED PROJECTS");
          return (
            <div key={project.project.uid}>
              <AdminProjectView project={project} />
            </div>
          );
        })}
    </div>
  );
};

export default withRouter(Dashboard);

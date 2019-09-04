// Modules
import React, { useState, useEffect } from "react";
import firebase, { db } from "../../../logic/firebase.js";
import { Button, Card, Header, Form, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import fuzzySearch from "../../../components/globalComponents/fuzzySearch";

// Components
import DashBoardHeader from "../../globalComponents/DashBoardHeader";
import StudentProjectView from "./StudentProjectView/StudentProjectView";
import LoginAnimation from "../../Auth/LoginAnimation";
import "../../../Dashboard/Dashboard.css";
import fetchBuildWeekProjects from "../../../utils/fetchBuildWeekProjects";

const StudentBuildWeekView = props => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const fetchProjects = async () => {
    const { buildWeek } = props.match.params;
    let tempProjects = await fetchBuildWeekProjects(buildWeek);
    setProjects(tempProjects);
    setFilteredProjects(tempProjects);
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  function handleFuzzySearch(e) {
    console.log(projects);
    // Fuzzy search for students involved, title, description, productType(ios, web, etc)
    let searchResults = fuzzySearch(
      projects,
      ["project.title", "project.description", "project.productType"],
      e
    );
    if (e.target.value === "") {
      setFilteredProjects(projects);
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
            placeholder="Fuzzy Search Projects"
          />
        </div>
      </div>
      <Card.Group>
        {filteredProjects &&
          filteredProjects.map(project => {
            return (
              <div key={project.project.uid}>
                <StudentProjectView project={project} />
              </div>
            );
          })}
      </Card.Group>
    </div>
  );
};

export default withRouter(StudentBuildWeekView);

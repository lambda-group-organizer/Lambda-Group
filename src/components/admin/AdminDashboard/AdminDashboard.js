// Modules
import React, { useState, useEffect } from "react";
import firebase, { db } from "../../../logic/firebase.js";
import { Button, Header, Form, Icon, Card } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import fuzzySearch from "../../../components/globalComponents/fuzzySearch";

// Components
import DashBoardHeader from "../../globalComponents/DashBoardHeader";
import AdminProjectView from "./AdminProjectView";
import LoginAnimation from "../../Auth/LoginAnimation";

// CSS
// import './AdminProjectView.css';

const Dashboard = props => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const fetchProjects = async () => {
    let tempProjects = [];
    const { BuildWeek } = props.match.params;
    let projectsCollection = await db
      .collection("build_weeks")
      .doc(`${BuildWeek}`)
      .collection("projects")
      .get();
    projectsCollection.forEach(function(doc) {
      tempProjects.push(doc.data());
      console.log(tempProjects);
    });
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
            // <div key={project.project.uid} className="card-wrapper">
            // </div>
            // <Card.Content>
              <AdminProjectView project={project} />
            // </Card.Content>
          );
        })}
      </Card.Group>
    </div>
  );
};

export default withRouter(Dashboard);

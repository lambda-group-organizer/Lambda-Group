// Modules
import React, { useState, useEffect, useContext } from "react";
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
// import fetchBuildWeekProjects from "../../../utils/fetchBuildWeekProjects";
import ProjectViewModal from "../../globalComponents/ProjectViewModal/ProjectViewModal";

const StudentBuildWeekView = props => {
  // state from context
  const {
    user,
    currentBuildWeekURL,
    setProjectRole,
    setCurrentSelectedProject,
    setCurrentSelectedProjectUid
  } = useContext(UserContext);

  const { projectsContext, setProjectsContext } = useContext(BuildWeekContext);
  // const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  // Local state
  const [projectModalData, setProjectModalData] = useState(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const fetchBuildWeekProjects = async buildWeek => {
    console.log("PROJECTS CONTEXT: ", projectsContext);
    debugger;
    let changeType = "";
    let collection = await db
      .collection("build_weeks")
      .doc(`${buildWeek}`)
      .collection("projects");
    let observer = collection.onSnapshot(querySnapshot => {
      let data = querySnapshot.docChanges().map(change => {
        console.log(change.type);
        changeType = change.type;
        return change.doc.data();
      });
      console.log(data[0]);
      if (changeType === "modified") {
        console.log("MODIFIED IF");
        console.log(projectsContext);
        let newProjects = projectsContext.map(tempProject => {
          console.log("TEMP PROJECT: ", tempProject);
          if (data[0].uid === tempProject.uid) {
            console.log(data);
            return data[0];
          } else {
            return tempProject;
          }
        });
        setProjectsContext(newProjects);
      } else {
        setProjectsContext(data);
      }
    });
  };

  const fetchProjects = async () => {
    const { buildWeek } = props.match.params;
    fetchBuildWeekProjects(buildWeek, projectsContext);
    console.log("PROJECTS UPDATED");
  };

  const getStudentRole = async () => {
    const userRef = db.collection("students").doc(user.uid);
    let data = await userRef.get();
    setProjectRole(data.data().buildWeeks[currentBuildWeekURL].projectRole);
    console.log(data.data().buildWeeks[currentBuildWeekURL].project);
    setCurrentSelectedProject(
      data.data().buildWeeks[currentBuildWeekURL].project
    );
    setCurrentSelectedProjectUid(
      data.data().buildWeeks[currentBuildWeekURL].projectUid
    );
    //console.log("data.data()", data.data())
  };

  useEffect(() => {
    fetchProjects();
    getStudentRole();
  }, []);

  useEffect(() => {
    setFilteredProjects(projectsContext);
  }, [projectsContext]);

  function handleFuzzySearch(e) {
    // console.log(projects);
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

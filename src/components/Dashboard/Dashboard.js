import React, { useState, useRef, useContext, useEffect } from "react";
import CurrentProjectContext from "../../context/CurrentProjectContext";
import CSVReader from "react-csv-reader";
import ProjectModal from "./ProjectModal";
import firebase from "../../logic/firebase";
import { Button, Card, Grid, Header } from "semantic-ui-react";
import DisplayInfo from "./DisplayInfo";
import "./Dashboard.css";

const Dashboard = () => {
    const [currentProject, setCurrentProject] = useState(null);
    // const { setCurrentProject } = useContext(CurrentProjectContext);
    const [projects, setProjects] = useState([]);
    const [tempProjects, setTempProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const projectsRefFirebase = firebase.database().ref("projects");

    const refTo_projectsVariable = useRef();
    refTo_projectsVariable.current = projects;

    const handleForce = data => {
        // console.log(data);
        setTempProjects(data);
    };

    const signOut = () => {
        firebase.auth().signOut();
    };

    const addProject = () => {
        // console.log("addProject");
        const projectId = projectsRefFirebase.push().key;

        const newProject = {
            id: projectId,
            name: projectName,
            description: projectDescription
        };

        projectsRefFirebase
            .child(projectId)
            .set(newProject)
            .then(project => console.log(`success : ${project}`))
            .catch(err => console.log(`error : ${err}`));
    };

    const addProjectListener = () => {
        // console.log("project listener is added");
        projectsRefFirebase.on("child_added", snap => {
            // console.log(snap.val());
            let newProject = [...refTo_projectsVariable.current, snap.val()];
            // console.log(refTo_projectsVariable.current);
            setProjects(newProject);
        });
    };

    const removeProjectListener = () => {
        // console.log("project listener is removed");
        projectsRefFirebase.off();
    };

    useEffect(() => {
        addProjectListener();

        return () => removeProjectListener();
    }, []); // --- mount \ unmount

    useEffect(() => {
        convertedProjects();
    }, [tempProjects]); // --- mount \ unmount

    const convertedProjects = () => {
        // console.log("converted projects running", tempProjects);
        const newConvertedProjects = tempProjects.map((item, index) => {
            const newProject = {
                title: item[0],
                description: item[1],
                targetGroup: item[2],
                teamMembers: [],
                studentCohort: item[4],
                dateSubmmited: item[5],
                id: index
            };

            if (index > 0) {
                const projectId = projectsRefFirebase.push().key;
                newProject.uid = projectId
                projectsRefFirebase
                    .child(projectId)
                    .set(newProject)
                    .then(project => console.log(`success : ${project}`))
                    .catch(err => console.log(`error : ${err}`));
            }
            return newProject;
        });
        newConvertedProjects.shift();
        setProjects(newConvertedProjects);
    };

    const openProject = id => {
        console.log("Opened", id);
    };

    const getData = () => {
        firebase.database().ref('/projects').on('value', function(snapshot) {
            console.log(snapshot.val());
            const projectData = snapshot.val()
            console.log()
        });
    };

    const projectsElements = (
        <div className="container">
            {projects &&
                projects.map((item, index) => {
                    let targetArr = item.targetGroup.split(",");

                    return (
                        <div
                            key={index}
                            className="cardContainer"
                            onClick={id => openProject(item.id)}
                        >
                            <Card raised={true} fluid={true} centered={true}>
                                <Card.Header className="cardHeader">
                                    <h3 className="headerTitle">
                                        {item.title.length > 25
                                            ? item.title.slice(0, 25) + "..."
                                            : item.title}
                                    </h3>
                                </Card.Header>
                                <div className="contentContainer">
                                    <Card.Description className="description">
                                        <p className="descriptionText">
                                            {item.description.length > 200
                                                ? item.description.slice(
                                                      0,
                                                      200
                                                  ) + "..."
                                                : item.description}
                                        </p>
                                    </Card.Description>
                                </div>
                                <ProjectModal
                                    item={item}
                                    openProject={openProject}
                                    projectsRefFirebase={projectsRefFirebase}
                                />
                                <div className="cardFooter">
                                    {/* <Card.Content> */}
                                    <ul className="targetMembersContainer">
                                        {targetArr.map((target, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="cardMember"
                                                >
                                                    {target}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </Card>
                            {/* <ProjectModal
                                item={item}
                                openProject={openProject}
                                projectsRefFirebase={projectsRefFirebase}
                            /> */}
                        </div>
                    );
                })}
        </div>
    );

    return (
        <div>
            <DisplayInfo />
            <CSVReader
                cssClass="csv-reader-input"
                label="Select CSV with projects"
                onFileLoaded={handleForce}
                inputId="ObiWan"
                inputStyle={{ color: "red" }}
            />
            <button className="mini ui negative basic button" onClick={signOut}>
                <i className="icon sign-out" />
                Logout
            </button>
            <Header as="h2">Projects</Header>
            <Button onClick={getData}>click</Button>
            {projectsElements}
        </div>
    );
};

export default Dashboard;

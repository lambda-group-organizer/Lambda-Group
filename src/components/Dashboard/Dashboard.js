import React, { useState, useRef, useContext, useEffect } from "react";
import CurrentProjectContext from "../../context/CurrentProjectContext";
import CSVReader from "react-csv-reader";
import firebase from "../../logic/firebase";
import { Button, Card, Grid } from "semantic-ui-react";

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
                dateSubmmited: item[5]
            };

            if (index > 0) {
                const projectId = projectsRefFirebase.push().key;
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

    const projectsElements = (
        <Grid columns={3}>
            {projects &&
                projects.map((item, index) => {
                    let targetArr = item.targetGroup.split(",");
                    return (
                        <Grid.Row>
                            <Card key={index} fluid centered={true} className="">
                                <h3>{item.title}</h3>
                                <div>
                                    <p>{item.description}</p>
                                    <div>
                                        <ul>
                                            {targetArr.map((target, index) => {
                                                return <li key={index}>{target}</li>
                                            })}
                                        </ul>
                                        <ul>
                                            {item.teamMembers && item.teamMembers.map((member, index) => {
                                                return <li key={index}>{member}</li>
                                            })}
                                        </ul>
                                        {/* <p>Current group size: {item.teamMembers.length}</p> */}
                                    </div>
                                </div>
                                <div className="buttons">
                                    <Button color="green" >Join!</Button>
                                    <Button color="google plus" >Leave!</Button>
                                </div>
                            </Card>

                        </Grid.Row>
                    );
                })}
        </Grid>
    );

    return (
        <div>
            <CSVReader
                cssClass="csv-reader-input"
                label="Select CSV with projects"
                onFileLoaded={handleForce}
                inputId="ObiWan"
                inputStyle={{ color: "red" }}
            />
            <h4>Projects</h4>
            {projectsElements}
        </div>
    );
};

export default Dashboard;
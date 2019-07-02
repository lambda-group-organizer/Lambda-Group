import React, { useState, useRef, useContext, useEffect } from "react";
import CurrentProjectContext from "../../context/CurrentProjectContext";
import CSVReader from "react-csv-reader";
import ProjectModal from "./ProjectModal";
import firebase from "../../logic/firebase";
import { db } from "../../logic/firebase";
import { Button, Card, Grid, Header } from "semantic-ui-react";
import DisplayInfo from "./DisplayInfo";
import "./Dashboard.css";
import Fuse from "fuse.js";

const Dashboard = () => {
    const [currentProject, setCurrentProject] = useState(null);
    // const { setCurrentProject } = useContext(CurrentProjectContext);
    const [projects, setProjects] = useState([]);
    const [tempProjects, setTempProjects] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const projectsRefFirebase = firebase.database().ref("projects");
    const [filteredProj, setFilteredProj] = useState([]);

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

    const addProjectListener = async () => {
        console.log("project listener is added");
        let projectRef = db.collection("projects");
        let allProjects = projectRef
            .get()
            .then(snapshot => {
                const tempProjects = projects;
                snapshot.forEach(doc => {
                    const projectData = doc.data().newProject;
                    tempProjects.push(projectData);
                });
                setProjects(tempProjects);
            })
            .catch(err => {
                console.log("Error getting documents", err);
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
                let projectRef = db
                    .collection("projects")
                    .add({
                        newProject
                    })
                    .then(ref => {
                        console.log("Added document with ID: ", ref.id);
                        newProject.uid = ref.id;
                        ref.set(
                            { newProject: { ...ref.newProject, uid: ref.id } },
                            { merge: true }
                        );
                        // setProjects(ref);
                    });
            }

            return newProject;
        });
        newConvertedProjects.shift();
        setProjects(newConvertedProjects);
    };

    const openProject = id => {
        console.log("Opened", id);
    };

    //const addUserToProject = () => {
    //if (someting.length >= 6) {
    //return <Spinner />
    //} else {
    //db.push(something)
    //}
    //}
    const changeProjects = arr => {
        console.log("arr from line 114", arr);
        setFilteredProj(arr);
    };

    //***************FUZZYSEARCH***************************
    const FuzzySearch = (arr, changeProjects) => {
        //console.log('arr :',arr)
        console.log(changeProjects);
        return (
            <form onSubmit={e => e.preventDefault()}>
                <input type="text" onChange={e => fuzzySearch(arr.arr, e)} />
            </form>
        );
    };

    const fuzzySearch = (list, e) => {
        e.preventDefault();
        //console.log(list.arr, 'list.arr')
        //console.log('list', list)
        let options = {
            findAllMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["description", "studentCohort", "targetGroup", "title"]
        };
        const fuse = new Fuse(list, options); // "list" is the item array
        const result = fuse.search(e.target.value);
        setFilteredProj(result);
        console.log("filteredProj", filteredProj);
        //console.log('e.target.value', e.target.value)
        //console.log(result)
    };

    useEffect(() => {
        console.log(projects, "useEffect");
        setFilteredProj(projects);
    }, [projects]);
    // ***************** END FUZZY SEARCH ************************

    const projectsElements = (
        <>
            {projects && (
                <input
                    className="filter"
                    type="text"
                    onChange={e => fuzzySearch(projects, e)}
                />
            )}
            <div className="container">
                {projects &&
                    filteredProj &&
                    filteredProj.map((item, index) => {
                        console.log(item, "From map");
                        let targetArr = item.targetGroup.split(",");

                        return (
                            <div
                                key={index}
                                className="cardContainer"
                                onClick={id => openProject(item.id)}
                            >
                                <Card
                                    raised={true}
                                    fluid={true}
                                    centered={true}
                                >
                                    <Card.Header className="cardHeader">
                                        <h3 className="headerTitle">
                                            {item.title.length > 25
                                                ? item.title.slice(0, 25) +
                                                  "..."
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
                                        projectsRefFirebase={
                                            projectsRefFirebase
                                        }
                                        //id={item.id}
                                        //onClick={() => {addUserToProject()}}
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
        </>
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
            {projectsElements}
        </div>
    );
};

export default Dashboard;

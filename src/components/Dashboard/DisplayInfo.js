import React, { useState, useContext, useEffect } from "react";
import { Statistic, Segment, Button } from "semantic-ui-react";
import UserContext from "../../context/UserContext";
import CurrentProjectContext from "../../context/CurrentProjectContext";
import { db } from "../../logic/firebase";
import "./DisplayInfo.css";
import CSVReader from "react-csv-reader";

const StatisticExampleValueShorthand = ({ handleForce, user }) => {
    const { tempProjects } = useContext(UserContext);
    const [projects, setProjects] = useState([]);
    const [tempUsers, setTempUsers] = useState([]);

    const deleteCollection = () => {
        let projectRef = db.collection("projects");
        let allProjects = projectRef
            .get()
            .then(snapshot => {
                const tempProject = projects;
                let count = 1;
                snapshot.forEach(doc => {
                    // console.log(doc.data().newProject.uid);
                    console.log(doc, `count: ${count++}`);
                    db.collection("projects")
                        .doc(doc.data().newProject.uid)
                        .delete();
                });
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
        setProjects([]);
    };

    const getUsers = () => {
        const tempUserData = [];
        let citiesRef = db.collection("students");
        let query = citiesRef
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                snapshot.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data());
                    tempUserData.push(doc.data());
                });
                //   console.log(tempUserData, "from snap");
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
        setTempUsers(tempUserData);
    };

    const getProjects = () => {
        const tempProjectData = [];
        let citiesRef = db.collection("projects");
        let query = citiesRef
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                snapshot.forEach(doc => {
                    // console.log(doc.id, '=>', doc.data());
                    tempProjectData.push(doc.data());
                });
                //   console.log(tempUserData, "from snap");
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
        setProjects(tempProjectData);
    };

    useEffect(() => {
        getUsers();
    }, [user]);

    useEffect(() => {
        getProjects();
    }, [tempProjects]);

    return (
        <div>
            {user && tempUsers ? (
                <div>
                    <Segment className="DisplayInfo">
                        <h3>Project Data</h3>
                        <Statistic.Group tex size="small">
                            <Statistic
                                label="Projects"
                                value={projects.length}
                            />
                            <Statistic
                                label="Students"
                                value={tempUsers.length}
                            />
                        </Statistic.Group>
                    </Segment>

                    <CSVReader
                        cssClass="csv-reader-input"
                        label="Select CSV with projects"
                        onFileLoaded={handleForce}
                        inputId="ObiWan"
                        inputStyle={{ color: "red" }}
                    />
                    <Button
                        color="black"
                        size="mini"
                        // className="mini ui negative basic button logoutButton"
                        onClick={deleteCollection}
                        style={{ marginLeft: "1%", alignSelf: "center" }}
                    >
                        <i className="icon sign-out" />
                        Delete All Projects
                    </Button>
                </div>
            ) : (
                <h1>Student View</h1>
            )}
        </div>
    );
};

export default StatisticExampleValueShorthand;

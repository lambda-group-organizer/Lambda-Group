import React, { useState, useContext, useEffect } from "react";
import { Statistic, Segment } from "semantic-ui-react";
import UserContext from "../../context/UserContext";
import { db } from "../../logic/firebase";
import "./DisplayInfo.css";
import CSVReader from "react-csv-reader";

const StatisticExampleValueShorthand = ({ handleForce, projects }) => {
    const { user } = useContext(UserContext);
    const [tempProjects, setTempProjects] = useState([]);
    const [tempUsers, setTempUsers] = useState([]);

    // console.log(user, "from TESTING");

    // users are on an object need to pull value out to conditional render admin view

    const getUsers = () => {
        const tempUserData = []
        let citiesRef = db.collection("users");
        let query = citiesRef
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                }

                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    tempUserData.push(doc.data())
                  });
                  console.log(tempUserData, "from snap");
            })
            .catch(err => {
                console.log("Error getting documents", err);
            });
            setTempUsers(tempUserData)
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {user  && tempUsers ? (
                <div>
                    <Segment className="DisplayInfo">
                        <h3>Project Data</h3>
                        <Statistic.Group tex size="small">
                            <Statistic
                                label="Projects"
                                value={projects.length}
                            />
                            <Statistic label="Students" value={tempUsers.length} />
                        </Statistic.Group>
                    </Segment>

                    <CSVReader
                        cssClass="csv-reader-input"
                        label="Select CSV with projects"
                        onFileLoaded={handleForce}
                        inputId="ObiWan"
                        inputStyle={{ color: "red" }}
                    />
                </div>
            ) : (
                <h1>Student View</h1>
            )}
        </div>
    );
};

export default StatisticExampleValueShorthand;

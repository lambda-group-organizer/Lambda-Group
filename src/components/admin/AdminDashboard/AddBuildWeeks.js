import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { db } from "../../../logic/firebase";
import CSVReader from "react-csv-reader";

const AddBuildWeek = props => {
  // ============================== Creating a Build Week ========================= //

  const [buildWeekName, SetBuildWeekName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    let spaceLessInput = e.target.value.replace(/ /g, "_");
    SetBuildWeekName(spaceLessInput);
  };

  const addBuildWeek = async e => {
    e.preventDefault();
    if (buildWeekName === undefined || buildWeekName === "") {
      setError("Must Provide A Name!");
      return;
    } else if (CSVData.length === 0) {
      setError("Must Provide A CSV File!");
      return;
    }
    console.log("TARGET: ", e.target.value);
    setLoading(true);
    const check = db.collection("build_weeks").doc(`${buildWeekName}`);
    const giveMe = await check.get();
    const exist = giveMe.data();
    if (!exist) {
      db.collection("build_weeks")
        .doc(`${buildWeekName}`)
        .set({
          buildWeekName
        })
        .then(async () => {
          const buildWeek = db
            .collection("build_weeks")
            .doc(`${buildWeekName}`);
          const response = await buildWeek.get();
          response.data();
          SetBuildWeekName("");
          setError(null);
          // Add projects to database
          convertedProjects();
        })
        .catch(err => {
          console.log(err);
          setError(err);
        });
    } else {
      setError("That name is Already in the database!");
    }
  };

  // ========================= Populate Build Week with projects ========================= //

  const [CSVData, setCSVData] = useState([]);

  const convertedProjects = () => {
    CSVData.map((item, index) => {
      const project = {
        title: item[0],
        pitch: item[1],
        mvp: item[2],
        stretch: item[3],
        designLinks_dataSets: item[4],
        productType: item[5],
        iosDeveloper: item[6],
        webUiDeveloper: item[7],
        frontEndDeveloper: item[8],
        frontEndFrameWorkDeveloper: item[9],
        webBackEndDeveloper: item[10],
        uXDesigner: item[11],
        projectLead: item[12],
        androidDeveloper: item[13],
        dataEngineer: item[14],
        machineLearningEngineer: item[15],
        teamMembers: []
      };
      if (index > 0 && project.title !== "") {
        console.log(
          project.webUiDeveloper,
          project.frontEndDeveloper,
          project.frontEndFrameWorkDeveloper,
          project.webBackEndDeveloper,
          project.uXDesigner,
          project.projectLead,
          project.androidDeveloper,
          project.dataEngineer,
          project.machineLearningEngineer
        );
        db.collection("build_weeks")
          .doc(`${buildWeekName}`)
          .collection("projects")
          .add({ project })
          .then(ref => {
            project.uid = ref.id;
            ref.set(
              {
                project: {
                  ...ref.project,
                  uid: ref.id,
                  availableRoles: {
                    androidDeveloper: {
                      names: [],
                      limits: project.androidDeveloper
                    },
                    iosDeveloper: {
                      names: [],
                      limits: project.iosDeveloper
                    },
                    dataEngineer: { names: [], limits: project.dataEngineer },
                    frontEndDeveloper: {
                      names: [],
                      limits: project.frontEndDeveloper
                    },
                    frontEndFrameWorkDeveloper: {
                      names: [],
                      limits: project.frontEndFrameWorkDeveloper
                    },
                    machineLearningEngineer: {
                      names: [],
                      limits: project.machineLearningEngineer
                    },
                    projectLead: { names: [], limits: project.projectLead },
                    uXDesigner: { names: [], limits: project.uXDesigner },
                    webBackEndDeveloper: {
                      names: [],
                      limits: project.webBackEndDeveloper
                    },
                    webUiDeveloper: {
                      names: [],
                      limits: project.webUiDeveloper
                    }
                  }
                }
              },
              { merge: true }
            );
          });
      }
      if (project.title !== "") {
        return project;
      } else {
        return null;
      }
    });
    setLoading(false);
    props.setUpdate(!props.update);
  };

  return (
    <Form onSubmit={e => addBuildWeek(e)}>
      <Form.Field>
        <Input
          label="name"
          value={buildWeekName}
          onChange={handleChange}
          placeholder="build week ... ?"
        />
      </Form.Field>
      <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with projects"
        onFileLoaded={data => setCSVData(data)}
        inputId="ObiWan"
        inputStyle={{ color: "red" }}
      />
      <Button
        type="submit"
        loading={loading ? loading : null}
        color="green"
        disabled={loading}
      >
        Creat{loading ? "ing" : "e"} Build Week
      </Button>
      {error && <p>{error}</p>}
    </Form>
  );
};

export default AddBuildWeek;

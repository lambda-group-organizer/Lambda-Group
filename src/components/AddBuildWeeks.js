import React, { useState, useEffect } from 'react';
import {Form, Button, Input } from 'semantic-ui-react';
import { db } from '../logic/firebase.js';
import CSVReader from 'react-csv-reader';

const AddBuildWeek = props => {

    // ============================== Creating a Build Week ========================= //

    const [buildWeekName, SetBuildWeekName] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        SetBuildWeekName(e.target.value)
    }

  const addBuildWeek = async ( e ) => {
      e.preventDefault();
      setLoading(true)
      const check = db.collection('build_weeks').doc(`${buildWeekName}`)
      const giveMe = await check.get()
      const exist = giveMe.data()
    if (!exist) {
        db.collection('build_weeks').doc(`${buildWeekName}`).set({
            buildWeekName
        }).then(async ()  => {
            const buildWeek = db.collection('build_weeks').doc(`${buildWeekName}`)
            const response = await buildWeek.get()
            response.data();
            SetBuildWeekName("")
            setError(null)
            // Add projects to database
            convertedProjects();      
        }).catch(err => {
            console.log(err)
            setError(err)
      })
    } else {
        setError("That name is Already in the database!")
    }

  };

  
    // ========================= Populate Build Week with projects ========================= //


    const [CSVData, setCSVData] = useState([]);

  const convertedProjects = () => {
    CSVData.map((item, index) => {
      const project = {
        title: item[0],
        description: item[1],
        designLinks_dataSets: item[2],
        productType: item[3],
        webUiDeveloper: item[4],
        frontEndDeveloper: item[5],
        frontEndFrameWorkDeveloper: item[6],
        webBackEndDeveloper: item[7],
        uXDesigner: item[8],
        projectLead: item[9],
        androidDeveloper: item[10],
        dataEngineer: item[11],
        machineLearningEngineer: item[12],
        teamMembers: [],
      };
      if (index > 0 && project.title !== '') {
        const buildWeek = db.collection('build_weeks').doc(`${buildWeekName}`).collection('projects')
          .add({project})
          .then(ref => {
            project.uid = ref.id;
            ref.set(
              {project: {...ref.project, uid: ref.id}},
              {merge: true},
            );
          });
      }
      if (project.title !== '') {
        return project;
      } else {
        return null;
      }
    });
    setLoading(false)
  };

  return (
      <Form onSubmit={e => addBuildWeek(e)}>
        <Form.Field>
          <Input label="name" value={buildWeekName} onChange={handleChange} placeholder="build week ... ?" />
        </Form.Field>
        <CSVReader
          cssClass="csv-reader-input"
          label="Select CSV with projects"
          onFileLoaded={(data) => setCSVData(data)}
          inputId="ObiWan"
          inputStyle={{color: 'red'}}
        /> 
        <Button type="submit" loading={loading ? loading : null } color="green" disabled={loading}>
          Creat{loading ? 'ing' : 'e'} Build Week
        </Button>
      {error && <p>{error}</p>}
      </Form>
  );
};

export default AddBuildWeek;

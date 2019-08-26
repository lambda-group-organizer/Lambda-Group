import React, { useState } from 'react';
import {Form, Button, Input } from 'semantic-ui-react';
import { db } from '../logic/firebase.js';

const AddBuildWeek = props => {
    const [buildWeekName, SetBuildWeekName] = useState("")
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        SetBuildWeekName(e.target.value)
    }

  const addBuildWeek = async ( e ) => {
      e.preventDefault();
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
        }).catch(err => {
            console.log(err)
            setError(err)
      })
    } else {
        setError("That name is Already in the database!")
    }

  };
  return (
      <Form onSubmit={e => addBuildWeek(e)}>
        <Form.Field>
          <Input label="name" value={buildWeekName} onChange={handleChange} placeholder="build week ... ?" />
        </Form.Field>
        <Button type="submit" color="green">
          test
        </Button>
      {error && <p>{error}</p>}
      </Form>
  );
};

export default AddBuildWeek;

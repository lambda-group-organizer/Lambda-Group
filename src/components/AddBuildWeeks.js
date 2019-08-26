import React, { useState, useEffect } from 'react';
import {Form, Button, Input, FormField} from 'semantic-ui-react';
import firebase, { db } from '../logic/firebase.js';

const AddBuildWeek = props => {
    const [buildWeekName, SetBuildWeekName] = useState("")
    const handleChange = (e) => {
        SetBuildWeekName(e.target.value)
    }

  const addBuildWeek = e => {
    e.preventDefault();
      db.collection('build_weeks').add({buildWeekName}).then(ref => {
          console.log(ref)
      })
  };
  return (
      <Form onSubmit={e => addBuildWeek(e)}>
        <Form.Field>
          <Input label="name" value={buildWeekName} onChange={handleChange} placeholder="build week ... ?" />
        </Form.Field>
        <Button type="submit" color="green">
          test
        </Button>
      </Form>
  );
};

export default AddBuildWeek;

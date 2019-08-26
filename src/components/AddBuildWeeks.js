import React, { useState, useEffect } from 'react';
import {Form, Button, Input, FormField} from 'semantic-ui-react';
import firebase, { db } from '../logic/firebase.js';

const AddBuildWeek = props => {
    const [buildWeekName, SetBuildWeekName] = useState("")
    const handleChange = (e) => {
        SetBuildWeekName(e.target.value)
    }

  const addBuildWeek = async ( e ) => {
      e.preventDefault();
      const check = db.collection('build_weeks').doc(`${buildWeekName}`)
      const giveMe = await check.get()
      const isUndefined = giveMe.data()
      //console.log('check: ', check);
      console.log('giveMe: ', giveMe.data());
    if (!isUndefined) {
        db.collection('build_weeks').doc(`${buildWeekName}`).set({
            buildWeekName
        }).then(async ()  => {
            const buildWeek = db.collection('build_weeks').doc(`${buildWeekName}`)
            const response = await buildWeek.get()
            response.data();
        }).catch(err => {
            console.log(err)
      })
    } else {
        alert('STOP IT')
    }

      //db.collection('build_weeks').add({buildWeekName}).then(ref => {
          //buildWeekName.uid = ref._key.path.segment[1]
          //ref.set({
              //buildWeekName: {...ref.buildWeekName, uid: ref._key.path.segment[1]}
          //})
      //})
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

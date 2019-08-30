// PROBABLY GOING TO DELETE THIS COMPONENT. ORIGIONAL IDEA NOT GOING TO WORK
// FINDING ALTERNATIVES NOW
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { db } from '../../../logic/firebase.js';

const StudentBuildWeekLink = props => {
  console.log(props.location.pathname)
  //const getUrl = `${window.location.protocol}/${window.location.host}/${window.location.pathname.toString()}${window.location.search.toString()}`
  const url = window.location.href
  console.log(url)

  const getBuildWeekURLOptions = async () => {
    let urls = []
    await db.collection('build_weeks').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        urls.push(doc.data().studentUrl)
      })
      console.log(urls)
    })
  }
  useEffect(() => {
    getBuildWeekURLOptions()
  }, [])

  return (
    <div>
    <p>will this work?</p>
    </div>
  )
}

export default withRouter(StudentBuildWeekLink);

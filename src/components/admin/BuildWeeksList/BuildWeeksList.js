import React, {useState} from 'react'
import {db}from '../../../logic/firebase';

const BuildWeeksList = props => {
    const [ListOfBuildWeeks, setListOfBuildWeeks] = useState([])

    const fetchBuildWeeks = () => {

    }

  return (
    <div>
        <p>Build Week</p>
        <p>Build Week</p>
        <p>Build Week</p>
        <p>Build Week</p>
    </div>
  )
}

export default BuildWeeksList;

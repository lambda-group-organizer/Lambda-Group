import React, {useState, useEffect} from 'react';
//import firebase from '../../logic/firebase';
import {db} from '../../../logic/firebase.js';
import Fuse from 'fuse.js';
import {Form} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'


const AddMinion = props => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const fetchStudents = async () => {
    console.log('running filtered students')
    let studentArr = [];
    await db
      .collection('students')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const studentData = {
            name: doc.data().displayName,
            email: doc.data().email,
          };
          studentArr.push(studentData);
          console.log(studentData);
          return studentArr;
        });
        setStudents(studentArr);
        setFilteredStudents(studentArr);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const searchStudents = (studentArr, e) => {
    console.log(studentArr)
    let options = {
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'email'],
    }
    const fuse = new Fuse(studentArr, options);
    const result = fuse.search(e.target.value);
    if(e.target.value === "") {
      setFilteredStudents(students);
    } else  {
      setFilteredStudents(result);
    }
  }


  return (
    <div>
      {console.log('rendered!!')}
      <p>Add Minion</p>
      <Form.Input
        size="big"
        focus icon="filter"
        iconPosition="left"
        placeholder="Fuzzy Search Users"
        type="text"
        onChange={(e) => searchStudents(students, e)}
        />
      {filteredStudents && filteredStudents.map(s => {
        return (<p key={s.email}>{s.name} | {s.email}</p>)
      })}
    </div>
  );
};

export default withRouter(AddMinion);

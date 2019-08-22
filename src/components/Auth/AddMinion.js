import React, {useState, useEffect} from 'react';
//import firebase from '../../logic/firebase';
import {db} from '../../logic/firebase';
import Fuse from 'fuse.js';
import {Button, Card, Grid, Header, Form, Input, Icon} from 'semantic-ui-react';


const AddMinion = props => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchStudents = async () => {
    let studentArr = [];
    await db
      .collection('users')
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
        setUsers(studentArr);
        setFilteredUsers(studentArr);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const searchUsers = (usersArr, e) => {
    let options = {
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'email'],
    }
    const fuse = new Fuse(usersArr, options);
    const result = fuse.search(e.target.value);
    if(e.target.value === "") {
      setFilteredUsers(users);
    } else  {
      setFilteredUsers(result);
    }
  }


  return (
    <div>
      <p>Add Minion</p>
      <Form.Input 
        size="big"
        focus icon="filter"
        iconPosition="left" 
        placeholder="Fuzzy Search Users"
        type="text"
        onChange={(e) => searchUsers(users, e)}
        />
      {filteredUsers && filteredUsers.map(student => {
        return (<p>{student.name} | {student.email}</p>)
      })}
    </div>
  );
};

export default AddMinion;
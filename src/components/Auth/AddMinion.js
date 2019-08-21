import React, {useState, useEffect} from 'react';
//import firebase from '../../logic/firebase';
import {db} from '../../logic/firebase';
import Fuse from 'fuse.js';
import FuzzySearch from '../../components/Dashboard/FuzzySearch.js';

const AddMinion = props => {
  const [students, setStudents] = useState([]);
  const [filteredStudent, setFilteredStudent] = useState([]);

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
        setStudents(studentArr);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const FuzzySearch = (students, e) => {
    //console.log('arr :',arr)
    console.log(students);
    return (
      <form onSubmit={e => e.preventDefault(e)}>
        <input type="text" value={filteredStudent} onChange={e => fuzzySearch(students, e)} />
      </form>
    );
  };

  let select;
  const fuzzySearch = ({students}, e) => {
    e.preventDefault();
    //console.log(list.arr, 'list.arr')
    console.log('students', students);
    let options = {
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['email', 'name'],
    };
    const fuse = new Fuse(students, options);
    const result = fuse.search(e.target.value);
    console.log('result: ', result);
    //console.log('select: ', select);
    setFilteredStudent(result)
  };
  //const selectMinion = (e,result) => {
    //e.preventDefault();
    //setFilteredStudent(result);
    //console.log('filteredStudent', filteredStudent);
  //};

  useEffect(() => {
    setFilteredStudent(select);
  },[filteredStudent])

  return (
    <div>
      <p>Add Minion</p>
      <FuzzySearch students={students} filteredStudent={filteredStudent} />
      {students &&
        students.map(student => {
          {console.log("student", student.email)}
          return <p key={student.email}>{student.name}</p>
        })}
      {filteredStudent &&
        filteredStudent.map(filtStud => {
          {console.log("filtStudent", filtStud)}
          return <p key={filtStud.email}>{filtStud.name}</p>;
        })}
    </div>
  );
};

export default AddMinion;

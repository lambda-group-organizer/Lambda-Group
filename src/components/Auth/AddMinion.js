import React, { useState, useRef } from 'react';
//import firebase from '../../logic/firebase';
import {db} from '../../logic/firebase';


const AddMinion = props => {
    const [students, setStudents] = useState([])

    const fetchStudents = () => {
        db.collection('users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`)
            })
        })
    }
    fetchStudents()


    //const FuzzySearch = (arr, changeProjects) => {
      ////console.log('arr :',arr)
      //console.log(changeProjects);
      //return (
        //<form onSubmit={e => e.preventDefault()}>
          //<input type="text" onChange={e => fuzzySearch(arr.arr, e)} />
        //</form>
      //);
    //};

    //const fuzzySearch = (list, e) => {
      //e.preventDefault();
      ////console.log(list.arr, 'list.arr')
      ////console.log('list', list)
      //let options = {
        //findAllMatches: true,
        //threshold: 0.6,
        //location: 0,
        //distance: 100,
        //maxPatternLength: 32,
        //minMatchCharLength: 1,
        //keys: ['description', 'studentCohort', 'targetGroup', 'title'],
      //};
      //const fuse = new Fuse(list, options); // "list" is the item array
      //const result = fuse.search(e.target.value);
      //setFilteredProj(result);
      //console.log('filteredProj', filteredProj);
      ////console.log('e.target.value', e.target.value)
      ////console.log(result)
    //};

    return (
        <div>
        <p>Add Minion</p>
        </div>
    )
}

export default AddMinion;

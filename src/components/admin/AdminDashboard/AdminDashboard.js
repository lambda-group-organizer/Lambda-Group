import React, {useState,  useEffect} from 'react';
import DashBoardHeader from '../../globalComponents/DashBoardHeader';
import AdminProjectView from './AdminProjectView';
import firebase, {db} from '../../../logic/firebase.js';
import {Button, Card, Header, Form, Icon} from 'semantic-ui-react';
import '../../../Dashboard/Dashboard.css';
import Fuse from 'fuse.js';
import LoginAnimation from '../../Auth/LoginAnimation';
import { withRouter } from 'react-router-dom';

const Dashboard = (props) => {
  const [projects, setProjects] = useState([]);
  const [filteredProj, setFilteredProj] = useState([]);

  const signOut = () => {
    firebase.auth().signOut();
  };


  const fetchProjects = async () => {
    let tempProjects = [];
    const { BuildWeek } = props.match.params;
    let projectsCollection = await db.collection('build_weeks').doc(`${BuildWeek}`).collection('projects').get()
    projectsCollection.forEach(function(doc) {
      tempProjects.push(doc.data())
      console.log(tempProjects)
    })
    setProjects(tempProjects)
  }
  useEffect(() => {
    fetchProjects()
  }, []);


  //***************FUZZYSEARCH***************************

  const fuzzySearch = (list, e) => {
    e.preventDefault();
    //console.log(list.arr, 'list.arr')
    //console.log('list', list)
    let options = {
      findAllMatches: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['description', 'studentCohort', 'productType', 'title'],
    };
    const fuse = new Fuse(list, options); // "list" is the item array
    const result = fuse.search(e.target.value);
    if (e.target.value === '') {
      setFilteredProj(projects);
    } else {
      setFilteredProj(result);
    }
  };


  return (
    <div style={{textAlign: 'center'}}>
      <DashBoardHeader />
      <div className="displayContainer">
        <LoginAnimation />
      </div>
    {projects && projects.map(project => {
      return (
        <div key={project.project.uid}>
        <AdminProjectView project={project}/>
        </div>
      )
    })}
    </div>
  );
};

export default withRouter(Dashboard);

import React, {useState, useRef, useContext, useEffect} from 'react';
import CurrentProjectContext from '../../context/CurrentProjectContext';
import ProjectModal from './ProjectModal';
import AddMinion from '../../components/Auth/AddMinion.js';
import {Link} from 'react-router-dom';
import firebase from '../../logic/firebase';
import {db} from '../../logic/firebase';
import {Button, Card, Grid, Header, Form, Input, Icon} from 'semantic-ui-react';
import DisplayInfo from './DisplayInfo';
import './Dashboard.css';
import Fuse from 'fuse.js';
import LoginAnimation from '../Auth/LoginAnimation.js';

const Dashboard = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tempProjects, setTempProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const projectsRefFirebase = firebase.database().ref('projects');
  const [filteredProj, setFilteredProj] = useState([]);

  const refTo_projectsVariable = useRef();
  refTo_projectsVariable.current = projects;

  const handleForce = data => {
     console.log(data);
    setTempProjects(data);
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  const addProject = () => {
     console.log("addProject");
    const projectId = projectsRefFirebase.push().key;

    const newProject = {
      id: projectId,
      name: projectName,
      description: projectDescription,
    };
    console.log("newProject from addProject", newProject)
    projectsRefFirebase
      .child(projectId)
      .set(newProject)
      .then(project => console.log(`success : ${project}`))
      .catch(err => console.log(`error : ${err}`));
  };

  const addProjectListener = async () => {
    console.log('project listener is added');
    let projectRef = await db.collection('projects');
    let allProjects = projectRef
      .get()
      .then(snapshot => {
        const tempProjects = projects;
        snapshot.forEach(doc => {
          const projectData = doc.data().newProject;
          tempProjects.push(projectData);
        });
        setProjects(tempProjects);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };

  const removeProjectListener = () => {
    // console.log("project listener is removed");
    projectsRefFirebase.off();
  };

  useEffect(() => {
    addProjectListener();

    return () => removeProjectListener();
  }, []); // --- mount \ unmount

  useEffect(() => {
    convertedProjects();
  }, [tempProjects]); // --- mount \ unmount

  const convertedProjects = () => {
     console.log("converted projects running", tempProjects);
    const newConvertedProjects = tempProjects.map((item, index) => {
      const newProject = {
        title: item[0],
        description: item[1],
        designLinks_dataSets: item[2],
        productType: item[3],
        webUiDeveloper: item[4],
        frontEndDeveloper: item[5],
        frontEndFrameWorkDeveloper: item[6],
        webBackEndDeveloper: item[7],
        uXDesigner: item[8],
        projectLead: item[9],
        androidDeveloper: item[10],
        dataEngineer: item[11],
        machineLearningEngineer: item[12],
        teamMembers: [],

      };
      if (index > 0) {
        let projectRef = db
          .collection('projects')
          .add({
            newProject,
          })
          .then(ref => {
            // console.log('Added document with ID: ', ref.id);
            console.log('ref:', ref)
            newProject.uid = ref.id;
            console.log("ref.newProject: ", newProject)
            console.log(Object.assign({}, { ...newProject }, {uid: ref.id}))
            //ref.set(Object.assign({}, {...newProject}, {uid: ref.id}), {merge: true});
            ref.set({newProject: {...ref.newProject, uid: ref.id}}, {merge: true})
          }).catch(err => console.log("err:", err));
      }

      return newProject;
    });
    newConvertedProjects.shift();
    setProjects(newConvertedProjects);
  };

  const openProject = id => {
    // console.log('Opened', id);
  };

  const changeProjects = arr => {
    // console.log('arr from line 114', arr);
    setFilteredProj(arr);
  };

  //***************FUZZYSEARCH***************************
  const FuzzySearch = (arr, changeProjects) => {
    //console.log('arr :',arr)
    // console.log(changeProjects);
    return (
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" onChange={e => fuzzySearch(arr.arr, e)} />
      </form>
    );
  };

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
    setFilteredProj(result);
    console.log('filteredProj', filteredProj);
    //console.log('e.target.value', e.target.value)
    //console.log(result)
  };

  useEffect(() => {
    // console.log('useEffect', projects);
    setFilteredProj(projects);
  }, [projects]);
  // ***************** END FUZZY SEARCH ************************

  let projectsElements = (
    <div>
      <Form.Input
        size="big"
        focus
        icon="filter"
        iconPosition="left"
        placeholder="Fuzzy Search Projects"
        type="text"
        onChange={e => fuzzySearch(projects, e)}
      />
      <div className="container">
        {projects &&
          filteredProj &&
          filteredProj.map((item, index) => {
             console.log('From map', item);
            let targetArr = item.productType.split(',');

            return (
              <div
                key={index}
                className="cardContainer"
                onClick={id => openProject(item.id)}>
                <Card raised={true} fluid={true} centered={true}>
                  <Card.Header className="cardHeader">
                    <h3 className="headerTitle">
                      {item.title.length > 25
                        ? item.title.slice(0, 25) + '...'
                        : item.title}
                    </h3>
                  </Card.Header>
                  <div className="contentContainer">
                    <Card.Description className="description">
                      <p className="descriptionText">
                        {item.description.length > 200
                          ? item.description.slice(0, 200) + '...'
                          : item.description}
                      </p>
                    </Card.Description>
                  </div>
                  <ProjectModal
                    item={item}
                    openProject={openProject}
                    projects={projects}
                  />
                  <div className="cardFooter">
                    <ul className="targetMembersContainer">
                      {targetArr.map((target, index) => {
                        return (
                          <li key={index} className="cardMember">
                            {target}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );

  // if (projects == []) {
  //   projectsElements = (
  //     <h2>No projects are loaded. Please upload a CSV file.</h2>
  //   );
  // }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#ba112e',
          marginBottom: '40px',
        }}>
        <Header as="h1" inverted style={{marginTop: '25px'}}>
          <Icon color="white" name="chevron up" />
          Lambda Group Organizer
        </Header>
        <Button
          inverted
          color="white"
          size="mini"
          // className="mini ui negative basic button logoutButton"
          onClick={signOut}
          style={{marginLeft: '1%', alignSelf: 'center'}}>
          <i className="icon sign-out" />
          Logout
        </Button>
      </div>
      <div className="displayContainer">
        <DisplayInfo projects={projects} handleForce={handleForce} />
        <LoginAnimation />
        <Link to="/admin/addMinion">Add New Admin</Link>
      </div>
      {projectsElements}
    </div>
  );
};

export default Dashboard;

import React, {useContext, useEffect} from 'react';
import {Card, Button, Header, Icon} from 'semantic-ui-react';
import {UserContext} from '../../../../context/allContexts';
import {db} from '../../../../logic/firebase';

import './StudentProjectView.module.scss';

const StudentProjectView = ({project: {project}}) => {
  const {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    currentBuildWeekURL,
    setCurrentBuildWeekURL,
    projectRole,
    setProjectRole,
    currentSelectedProject,
    setCurrentSelectedProject,
    setLoading,
    currentSelectedProjectUid,
    setCurrentSelectedProjectUid,
  } = useContext(UserContext);

  //function showStudents() {
  //console.log(user)
  //TODO: Hook this up to show signed up
  //}

  const handleJoinProject = async project => {
    setLoading(true);
    if (currentSelectedProject !== '') {
      let oldProjRef = await db
        .collection('build_weeks')
        .doc(currentBuildWeekURL)
        .collection('projects')
        .doc(currentSelectedProjectUid);
      let oldProjectData = await oldProjRef.get();
      oldProjectData = oldProjectData.data();
      if (oldProjectData.project.availableRoles[projectRole].names.length > 0) {
        let newOldProjectData = oldProjectData.project.availableRoles[
          projectRole
        ].names.filter(n => n.email !== email);

        oldProjectData.project.availableRoles[
          projectRole
        ].names = newOldProjectData;

        oldProjRef.set(oldProjectData);
      }
      //let oldProjData = await oldProjRef.get();
      //oldProjData.project.availableRoles[projectRole]
      //oldProjData = oldProjData.data().project.availableRoles[projectRole];
      //console.log('oldProjData: ', oldProjData.names);
      //if (oldProjData.names.length > 0) {
      //let updatedProj = oldProjData.names.filter(n => n.email !== user.email);
      //console.log('updatedProj: ', updatedProj);
      //oldProjRef.set(
      //{
      //project: {
      //availableRoles: {
      //[projectRole]: {
      //names: [...updatedProj],
      //},
      //},
      //},
      //},
      //{merge: true},
      //);
      //}
    }
    // reference project in DB
    const projectRef = db
      .collection('build_weeks')
      .doc(currentBuildWeekURL)
      .collection('projects')
      .doc(project.uid);
    // Get the data for the user's desired role that project from DB
    const projectData = await projectRef.get();
    let projectRoleData = await projectData.data().project.availableRoles[
      projectRole
    ];
    //console.log(projectRoleData);
    // check if there is room in that project for user
    if (projectRoleData.names.length < project[projectRole]) {
      console.log(projectRoleData.names);
      // Add user to project's data on DB
      await projectRef.set(
        {
          project: {
            availableRoles: {
              [projectRole]: {
                names: [
                  ...projectRoleData.names,
                  {name: user.displayName, email: email},
                ],
              },
            },
          },
        },
        {merge: true},
      );

      // Add project to user's data on DB
      const userRef = db.collection('students').doc(user.uid);
      let data = await userRef.set(
        {
          buildWeeks: {
            [currentBuildWeekURL]: {
              project: project.title,
              projectUid: project.uid,
            },
          },
        },
        {merge: true},
      );
      setCurrentSelectedProject(project.title);
      setCurrentSelectedProjectUid(project.uid);
      //showStudents()
    } else {
      alert(
        `SORRY NO MORE ${projectRole}S SLOTS LEFT. PICK ANOTHER PROJECT PLEASE!`,
      );
    }
    // const projectData = await projectRef.set({availableRoles: {[projectRole]: {names: []}}}, {merge: true})
    // data = data.data(); "Frontend Developer"
    setLoading(false);
  };

  return (
    <Card key={project.uid} raised={true} centered={true}>
      <Card.Content
        header={
          project.title.length > 25
            ? project.title.slice(0, 25) + '...'
            : project.title
        }
        className="cardHeader"
      />
      <Card.Content>
        {project.description.length > 200
          ? project.description.slice(0, 200) + '...'
          : project.description}
      </Card.Content>
      {currentSelectedProject !== project.title && (
        <Card.Content>
          {project.productType}{' '}
          <Button onClick={() => handleJoinProject(project)}>+Join</Button>
        </Card.Content>
      )}
      {currentSelectedProject === project.title && (
        <Card.Content style={{backgroundColor: 'green', color: 'white'}}>
          Signed up!
        </Card.Content>
      )}
      {/* <p>{project.androidDeveloper}</p>
      <p>{project.dataEngineer}</p>
      <p>{project.frontEndDeveloper}</p>
      <p>{project.FrontEndFrameWorkDeveloper}</p>
      <p>{project.machineLearningEngineer}</p>
      <p>{project.projectLead}</p>
      <p>{project.uXDesigner}</p>
      <p>Team members . map</p>
      <p>{project.webBackEndDeveloper}</p>
      <p>{project.WebUiDeveloper}</p> */}
    </Card>
  );
};

export default StudentProjectView;

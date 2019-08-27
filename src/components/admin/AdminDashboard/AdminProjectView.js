import React from 'react'
import { Card, Button, Header, Icon } from 'semantic-ui-react'

const AdminProjectView = ({project: {project}}) => {
  return (
        <Card key={project.uid}>
        <p>{project.title}</p>
    <p>{project.androidDeveloper}</p>
    <p>{project.dataEngineer}</p>
    <p>{project.designLinks_dataSets}</p>
    <p>{project.frontEndDeveloper}</p>
    <p>{project.FrontEndFrameWorkDeveloper}</p>
    <p>{project.machineLearningEngineer}</p>
    <p>{project.productType}</p>
    <p>{project.projectLead}</p>
    <p>{project.uXDesigner}</p>
    <p>Team members . map</p>
        <p>{project.description}</p>
    <p>{project.webBackEndDeveloper}</p>
    <p>{project.WebUiDeveloper}</p>
        </Card>
  )
}

export default AdminProjectView;

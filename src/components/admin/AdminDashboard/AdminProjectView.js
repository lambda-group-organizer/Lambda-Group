import React from 'react'
import { Button, Header, Icon } from 'semantic-ui-react'
import './AdminProjectView.css'

const AdminProjectView = ({project: {project}}) => {
  return (
        <div className="card" key={project.uid}>
        <p className="p">{project.title}</p>
    <p className="p">{project.androidDeveloper}</p>
    <p className="p">{project.dataEngineer}</p>
    <p className="p">{project.designLinks_dataSets}</p>
    <p className="p">{project.frontEndDeveloper}</p>
    <p className="p">{project.FrontEndFrameWorkDeveloper}</p>
    <p className="p">{project.machineLearningEngineer}</p>
    <p className="p">{project.productType}</p>
    <p className="p">{project.projectLead}</p>
    <p className="p">{project.uXDesigner}</p>
    <p className="p">Team members . map</p>
        <p>{project.description}</p>
    <p>{project.webBackEndDeveloper}</p>
    <p>{project.WebUiDeveloper}</p>
        </div>
  )
}

export default AdminProjectView;

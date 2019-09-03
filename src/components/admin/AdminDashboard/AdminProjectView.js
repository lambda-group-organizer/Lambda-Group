import React from 'react';
import { Card, Button, Header, Icon } from 'semantic-ui-react';
import "./AdminProjectView.css";

const AdminProjectView = ({ project: { project } }) => {
//   let pitchAndMVP = project.description;
//   pitchAndMVP = pitchAndMVP.split('MVP');
//   pitchAndMVP[0] = pitchAndMVP[0].split('Pitch:');
//   pitchAndMVP[0].shift();
	return (
		<Card className="card" centered={true} key={project.uid}>
			<Card.Content>
					<Card.Header className="card-header" as="h3">{project.title}</Card.Header>
					<Card.Description textAlign="left" className="content">
					  <Card.Header as="h4" className="content-header" textAlign="center">Pitch:</Card.Header>
					  <Card.Description className="content-text">{project.description}</Card.Description>
					</Card.Description>
					<Card.Description textAlign="left" className="content">
					  <Card.Header as="h4" className="content-header" textAlign="center">Devs Needed:</Card.Header>
					  <Card.Description className="content-text devs">Yeah we totally need devs</Card.Description>
					</Card.Description>
			</Card.Content>
		</Card>
	);
};

// const AdminProjectView = ({ project: { project } }) => {
//   return (
//     <Card key={project.uid}>
//       <Card.Content>
//         <Card.Content>
//           <Card.Header>{project.title}</Card.Header>
//         </Card.Content>
//         <Card.Description>
//           {project.description}
//           {project.designLinks_dataSets}
//         </Card.Description>
//       </Card.Content>
//     		</Card>
//        <p className="p">{project.title}</p>
//        <p className="p">{project.androidDeveloper}</p>
//     <p className="p">{project.dataEngineer}</p>
//     <p className="p">{project.designLinks_dataSets}</p>
//     <p className="p">{project.frontEndDeveloper}</p>
//     <p className="p">{project.FrontEndFrameWorkDeveloper}</p>
//     <p className="p">{project.machineLearningEngineer}</p>
//     <p className="p">{project.productType}</p>
//     <p className="p">{project.projectLead}</p>
//     <p className="p">{project.uXDesigner}</p>
//        <p className="p">Team members . map</p>
//         <p>{project.description}</p>
//     <p>{project.webBackEndDeveloper}</p>
//     <p>{project.WebUiDeveloper}</p>
//   );
// };

export default AdminProjectView;

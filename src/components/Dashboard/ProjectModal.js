import React, { useState, useEffect } from "react";
import { Modal, Header, Form, Button, Icon } from "semantic-ui-react";
import "./ProjectModal.css";
import firebase from "../../logic/firebase";
import { db } from "../../logic/firebase";

const AddRoomModal = ({ projectsRefFirebase, item }) => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        let projectRef = db.collection("projects").doc(item.uid);
        let getDoc = projectRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    console.log('Document data:', doc.data().newProject.teamMembers);
                    const tempTeamMember = doc.data().newProject.teamMembers;
                    setTeam(tempTeamMember);
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        return () => { "Funky" }
    }, [])

    const [modalOpen, setmodalOpen] = useState(false);

    const handleOpen = () => setmodalOpen(true);
    const handleClose = () => setmodalOpen(false);


    const addToTeam = async () => {
        console.log("ADDTOTEAM")
        var user = firebase.auth().currentUser;
        let projectRef = db.collection("projects").doc(item.uid);
        let getDoc = await projectRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    console.log('Document data:', doc.data().newProject.teamMembers);
                    const tempTeamMember = doc.data().newProject.teamMembers;
                    setTeam(tempTeamMember);
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        // console.log(getDoc)

        console.log("Hook team: ", team)
        console.log("displayName: ", user.displayName);
        // const userData = {
        //     Name: user.displayName
        // };

        console.log("projectRef: ", projectRef);

        let newTeam = team;
        newTeam.push(user.displayName);
        console.log("USER: ", user);

        // if (!team.includes(user.displayName) && team.length < 6) {
        console.log("IMPORTANT INSIDE IF")
        let updateSingle = projectRef.set(
            { newProject: { teamMembers: team } },
            { merge: true }
        );
        // }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Modal
                // trigger={<span onClick={handleOpen}>+</span>}
                trigger={
                    <Button
                        inverted
                        color="red"
                        style={{ marginBottom: "20px" }}
                        onClick={handleOpen}
                    >
                        More Details
                    </Button>
                }
                open={modalOpen}
                onClose={handleClose}
                basic
                size="small"
                centered
            >
                <Header content={item.title} />
                <Modal.Content>
                    {/* <Form onSubmit={}>
                        <Form.Field>
                            <input placeholder="Insert name" onChange={event => setRoomName(event.target.value)} />
                        </Form.Field>
                    </Form> */}






                    <p>{item.description}</p>
                    {Object.values(item.teamMembers).map(member => {
                        return <p>{member}</p>
                    })}







                </Modal.Content>
                <Modal.Actions>
                    <Button basic color="red" inverted onClick={handleClose}>
                        <Icon name="remove" />
                        Cancel
                    </Button>
                    <Button
                        color="green"
                        inverted
                        onClick={() => {
                            addToTeam();
                            handleClose();
                        }}
                    >
                        <Icon name="checkmark" />
                        Join Project
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default AddRoomModal;

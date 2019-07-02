import React, { useState } from "react";
import { Modal, Header, Form, Button, Icon } from "semantic-ui-react";
import "./ProjectModal.css";
import firebase from '../../logic/firebase'

const AddRoomModal = ({ projectsRefFirebase, item }) => {
    const [modalOpen, setmodalOpen] = useState(false);
    const [team, setTeam] = useState([])

    const handleOpen = () => setmodalOpen(true);
    const handleClose = () => setmodalOpen(false);

    const addToTeam = () => {
        var user = firebase.auth().currentUser;
        console.log(user)
        setTeam(user)
    }

    return (
        <div style={{ textAlign: "center"}}>
            <Modal
                // trigger={<span onClick={handleOpen}>+</span>}
                trigger={<Button inverted color="red"  style={{ marginBottom: "20px" }} onClick={handleOpen}>More Details</Button>}
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

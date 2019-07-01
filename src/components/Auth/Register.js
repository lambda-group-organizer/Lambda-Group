import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import {
    Header,
    Button,
    Icon,
    Form,
    Segment,
    Message
} from "semantic-ui-react";
import { appName, appIconName } from "../../logic/constants";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const register = event => {
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createdUser => {
                console.log(`createdUser : ${createdUser}`);
                createdUser.user.updateProfile({ displayName }).then(() => {
                    console.log(createdUser.user);
                    setUser({
                        displayName,
                        uid: createdUser.user.uid
                    });
                    history.push("/");
                });
            })
            .catch(err => console.log(`error : ${err}`));
    };

    return (
        <div className="Register">
            <Segment stacked>
                <Header as="h2">
                    <Icon name={appIconName} /> Register to {appName}
                </Header>
                <Form onSubmit={register}>
                    <Form.Input
                        icon="user"
                        value={displayName}
                        iconPosition="left"
                        placeholder="Display Name"
                        type="text"
                        onChange={event => setDisplayName(event.target.value)}
                    />

                    <Form.Input
                        icon="mail"
                        value={email}
                        iconPosition="left"
                        placeholder="E-mail address"
                        onChange={event => setEmail(event.target.value)}
                    />

                    <Form.Input
                        icon="lock"
                        value={password}
                        iconPosition="left"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />

                    <Button size="large" fluid color="black" type="submit">
                        Register
                    </Button>
                </Form>
            </Segment>
            <Message>
                New to us? <Link to="/Register">Register</Link>
            </Message>
        </div>
    );
};

export default Register;

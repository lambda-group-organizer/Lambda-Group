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
import LoginAnimation from "./LoginAnimation";

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
            <LoginAnimation />
            <Segment stacked>
                <Header as="h2">
                    <Icon color="red" name={appIconName} />
                    {appName}
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
                        type="email"
                        iconPosition="left"
                        placeholder="E-mail address"
                        onChange={event => setEmail(event.target.value)}
                    />

                    <Form.Input
                        icon="lock"
                        value={password}
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        onChange={event => setPassword(event.target.value)}
                    />

                    <Button size="large" fluid color="red" type="submit">
                        Register
                    </Button>
                </Form>
            </Segment>
            <Message>
                Already have an account? <Link to="/Login">Login</Link>
            </Message>
        </div>
    );
};

export default Register;

import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import {db} from "../../logic/firebase";
import {
    Header,
    Button,
    Icon,
    Form,
    Segment,
    Message,
    Label
} from "semantic-ui-react";
import { appName, appIconName } from "../../logic/constants";
import "./Register.css";
import { Link } from "react-router-dom";
import LoginAnimation from "./LoginAnimation";

const Register = ({ history }) => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [displayName, setName] = useState("");
    const [admin, setAdmin] = useState(false);

    const register = event => {
        console.log("Clicked register");
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
                        uid: createdUser.user.uid,
                        role: "student"
                    });

                    let addUser = db.collection('users').doc(createdUser.user.uid).set({
                        name: displayName,
                        uid: createdUser.user.uid,
                        role: "student"
                      }).then(ref => {
                        // console.log('Added document with ID: ', ref.uid);
                      });

                    history.push("/");
                });
            })
            .catch(err => console.log(`error : ${err}`));
    };

    const registerAdmin = event => {
        console.log("Clicked Admin");
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(adminEmail, adminPassword)
            .then(createdUser => {
                console.log(`createdUser : ${createdUser}`);
                createdUser.user.updateProfile({displayName}).then(() => {
                    console.log(createdUser.user);
                    setUser({
                        uid: createdUser.user.uid,
                        role: "admin"
                    });

                    let addadmin = db.collection('users').doc(createdUser.user.uid).set({
                        uid: createdUser.user.uid,
                        role: "admin"
                      }).then(ref => {
                        // console.log('Added document with ID: ', ref.uid);
                      });

                    history.push("/");
                });
            })
            .catch(err => console.log(`error : ${err}`));
    };

    const registerView = (
        <div>
            <Button
                style={{ alignSelf: "center" }}
                basic
                onClick={() => setAdmin(!admin)}
            >
                Register as a group organizer
            </Button>

            <Form onSubmit={register}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "25px"
                    }}
                />
                {!admin ? (
                    <div>
                        {!displayName ? (
                            <Label pointing="below">Enter your full name</Label>
                        ) : (
                            ""
                        )}
                        <Form.Input
                            icon="user"
                            value={displayName}
                            iconPosition="left"
                            placeholder="Full Name"
                            type="text"
                            onChange={event => setName(event.target.value)}
                        />
                        {!email ? (
                            <Label pointing="below">
                                Enter your email address
                            </Label>
                        ) : (
                            ""
                        )}
                        <Form.Input
                            icon="mail"
                            value={email}
                            type="email"
                            iconPosition="left"
                            placeholder="E-mail address"
                            onChange={event => setEmail(event.target.value)}
                        />
                        {!password ? (
                            <Label pointing="below">Enter a password</Label>
                        ) : (
                            ""
                        )}
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
                    </div>
                ) : (
                    <div>
                        {!adminEmail ? (
                            <Label pointing="below">Enter your email</Label>
                        ) : (
                            ""
                        )}
                        <Form.Input
                            icon="mail"
                            value={adminEmail}
                            type="email"
                            iconPosition="left"
                            placeholder="E-mail address"
                            onChange={event =>
                                setAdminEmail(event.target.value)
                            }
                        />
                        {!adminPassword ? (
                            <Label pointing="below">Enter your password</Label>
                        ) : (
                            ""
                        )}
                        <Form.Input
                            icon="lock"
                            value={adminPassword}
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            onChange={event =>
                                setAdminPassword(event.target.value)
                            }
                        />
                        <Button size="large" fluid color="red" type="submit">
                            Register Organizer
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );

    const registerAdminView = (
        <div>
            <Button
                style={{ alignSelf: "center" }}
                basic
                onClick={() => setAdmin(!admin)}
            >
                Back to registering a participant
            </Button>
            <Form onSubmit={registerAdmin}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "25px"
                    }}
                />
                {!adminEmail ? (
                    <Label pointing="below">Enter your email</Label>
                ) : (
                    ""
                )}
                <Form.Input
                    icon="mail"
                    value={adminEmail}
                    type="email"
                    iconPosition="left"
                    placeholder="E-mail address"
                    onChange={event => setAdminEmail(event.target.value)}
                />
                {!adminPassword ? (
                    <Label pointing="below">Enter your password</Label>
                ) : (
                    ""
                )}
                <Form.Input
                    icon="lock"
                    value={adminPassword}
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    onChange={event => setAdminPassword(event.target.value)}
                />
                <Button size="large" fluid color="red" type="submit">
                    Register Organizer
                </Button>
            </Form>
        </div>
    );

    return (
        <div className="Register">
            <LoginAnimation />
            <Segment stacked>
                <Header as="h2">
                    <Icon color="red" name={appIconName} />
                    {appName}
                </Header>
                {admin ? registerAdminView : registerView}
            </Segment>
            <Message>
                Already have an account? <Link to="/Login">Login</Link>
            </Message>
        </div>
    );
};

export default Register;

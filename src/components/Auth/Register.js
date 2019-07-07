import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import { db } from "../../logic/firebase";
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
    const [adminName, setAdminName] = useState("");
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

                    let addUser = db
                        .collection("students")
                        .doc(createdUser.user.uid)
                        .set({
                            name: displayName,
                            uid: createdUser.user.uid,
                            role: "student"
                        })
                        .then(ref => {
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
                createdUser.user.updateProfile({ adminName }).then(() => {
                    console.log(createdUser.user);
                    setUser({
                        adminName,
                        uid: createdUser.user.uid,
                        role: "admin"
                    });

                    let addadmin = db
                        .collection("admin")
                        .doc(createdUser.user.uid)
                        .set({
                            name: adminName,
                            uid: createdUser.user.uid,
                            role: "admin"
                        })
                        .then(ref => {
                            // console.log('Added document with ID: ', ref.uid);
                        });

                    history.push("/");
                });
            })
            .catch(err => console.log(`error : ${err}`));
    };

    const registerView = (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
                style={{ alignSelf: "center" }}
                basic
                color="blue"
                size="small"
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
                            <Label color="red" pointing="below">
                                Enter your full name
                            </Label>
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
                            <Label color="red" pointing="below">
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
                            <Label color="red" pointing="below">
                                Enter a password
                            </Label>
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
                            <Label color="red" pointing="below">
                                Enter your email
                            </Label>
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
                            <Label color="red" pointing="below">
                                Enter your password
                            </Label>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
                style={{ alignSelf: "center" }}
                basic
                color="blue"
                size="small"
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

                {!adminName ? (
                    <Label color="red" pointing="below">
                        Enter your full name
                    </Label>
                ) : (
                    ""
                )}
                <Form.Input
                    icon="user"
                    value={adminName}
                    iconPosition="left"
                    placeholder="Full Name"
                    type="text"
                    onChange={event => setAdminName(event.target.value)}
                />
                {!adminEmail ? (
                    <Label color="red" pointing="below">
                        Enter your email
                    </Label>
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
                    <Label color="red" pointing="below">
                        Enter your password
                    </Label>
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

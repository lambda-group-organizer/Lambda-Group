import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/allContexts";
import firebase from "../../logic/firebase";
import "./Login.css";
import { appName, appIconName } from "../../logic/constants";
import { Form, Button, Icon, Header, Segment } from "semantic-ui-react";
import LoginAnimation from "./LoginAnimation";
import { db } from "../../logic/firebase.js";

const Login = ({ history }) => {
  const {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole
  } = useContext(UserContext);

  const login = event => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loggedInuser => {
        setUser({
          displayName: loggedInuser.user.displayName,
          uid: loggedInuser.user.uid,
          role: role
        });
        checkIfAdmin(loggedInuser.user.email);
      })
      .catch(err => console.log(err));
  };
  // CHECK IF USER IS ADMIN
  const checkIfAdmin = async userEmail => {
    let adminEmails = [];
    await db
      .collection("admin")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          adminEmails.push(doc.data().email);
        });
        let isAdmin = false;
        adminEmails.forEach(theAdmin => {
          if (theAdmin === userEmail) {
            setRole("admin");
            return;
          }
        });
      });
  };

  useEffect(() => {
    if (role === "admin") {
      history.push("/overlord");
    }
  }, [role]);

  return (
    <div className="Login">
      <LoginAnimation />
      <Segment stacked>
        <Header as="h2">
          <Icon color="red" name={appIconName} />
          {appName}
        </Header>
        <Form onSubmit={e => login(e)}>
          <Form.Input
            icon="mail"
            type="email"
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
            type="password"
            onChange={event => setPassword(event.target.value)}
          />

          <Button size="large" fluid color="red" type="submit">
            Login
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

export default Login;

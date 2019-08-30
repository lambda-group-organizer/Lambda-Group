import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import firebase from "../../logic/firebase";
import "./Login.css";
import { appName, appIconName } from "../../logic/constants";
import {
  Form,
  Button,
  Icon,
  Header,
  Segment,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginAnimation from "./LoginAnimation";
import { db } from "../../logic/firebase.js";

const AdminLogin = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // CHECK IF USER IS ADMIN
  const overloardFunc = async userEmail => {
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
            isAdmin = true;
            return;
          }
        });
        if (isAdmin) {
          history.push("/");
        } else {
          history.push("/admin/AdminLogin");
        }
      });
  };

  const login = event => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loggedInuser => {
        setUser({
          displayName: loggedInuser.user.displayName,
          uid: loggedInuser.user.uid
        });
        overloardFunc(loggedInuser.user.email);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="Login">
      <LoginAnimation />
      <Segment stacked>
        <Header as="h2">
          <Icon color="red" name={appIconName} />
          {appName}
        </Header>
        <Form onSubmit={login}>
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

export default AdminLogin;

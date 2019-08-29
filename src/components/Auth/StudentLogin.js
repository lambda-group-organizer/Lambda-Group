import React, {useContext, useState} from 'react';
//import \serContext from '../../context/UserContext';
import StudentContext from '../../context/StudentContext.js';
import firebase from '../../logic/firebase';
import './Login.css';
import {appName, appIconName} from '../../logic/constants';
import {Form, Button, Icon, Header, Segment, Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import LoginAnimation from './LoginAnimation';
import {db} from '../../logic/firebase.js';

const StudentLogin = ({history}) => {
  const {setStudent} = useContext(StudentContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(history)
  // CHECK IF USER IS STUDENT
  const LambdaStudent = async userEmail => {
    let studentEmails = [];
    await db
      .collection('students')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          studentEmails.push(doc.data().email);
        });
        let isStudent = false;
        studentEmails.forEach(student => {
          if (student.toString() === studentEmails.toString()) {
            isStudent = true;
            return;
          }
        });
        let urls = []
        db.collection('build_weeks').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            urls.push(doc.data().studentUrl)
          })
          console.log(urls)
        })
        if (isStudent) {
          history.push('/student/dashboard');
        } else {
          history.push('/student/StudentLogin');
        }
      });
  };

  const login = event => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loggedInuser => {
        setStudent({
          displayName: loggedInuser.user.displayName,
          uid: loggedInuser.user.uid,
        });
        LambdaStudent(loggedInuser.user.email);
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
      <Message>
        New to us? <Link to="/student/Register">Student Register</Link>
      </Message>
    </div>
  );
};

export default StudentLogin;

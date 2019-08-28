import React, {useContext, useState} from 'react';
import StudentContext from '../../context/StudentContext';
import firebase from '../../logic/firebase';
import {db} from '../../logic/firebase.js';
import {
  Header,
  Button,
  Icon,
  Form,
  Segment,
  Message,
  Label,
} from 'semantic-ui-react';
import {appName, appIconName} from '../../logic/constants';
import './Register.css';
import {Link} from 'react-router-dom';
import LoginAnimation from './LoginAnimation';

const StudentRegister = ({history}) => {
  const {setStudent} = useContext(StudentContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');


  const registerStudent = event => {
    console.log('Clicked Student');
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(`createdUser : ${createdUser}`);
        createdUser.user.updateProfile({displayName}).then(() => {
          console.log(createdUser.user);
          setStudent({
            displayName,
            uid: createdUser.user.uid,
            role: 'student',
          });

          db.collection('students')
            .doc(createdUser.user.uid)
            .set({
              uid: createdUser.user.uid,
              email: createdUser.user.email,
              displayName,
              role: 'student',
            })
            .then(ref => {
              // console.log('Added document with ID: ', ref.uid);
            });

          history.push('/student/dashboard');
        });
      })
      .catch(err => console.log(`error : ${err}`));
  };


  const registerStudentView = (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Header as="h2">
        <Icon color="red" name={appIconName} />
        {appName}
      </Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '25px',
        }}
      />
      <Form onSubmit={registerStudent}>
        {!displayName ? (
          <Label color="red" pointing="below">
            Enter your full name
          </Label>
        ) : (
          ''
        )}
        <Form.Input
          icon="user"
          value={displayName}
          type="text"
          iconPosition="left"
          placeholder="Full Name..."
          onChange={event => setDisplayName(event.target.value)}
        />
        {!email ? (
          <Label color="red" pointing="below">
            Enter your email
          </Label>
        ) : (
          ''
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
            Enter your password
          </Label>
        ) : (
          ''
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
          Register Student
        </Button>
      </Form>
    </div>
  );

  return (
    <div className="Register">
      <LoginAnimation />
      {registerStudentView}
      <Message>
    Already have an account? <Link to="/student/StudentLogin">Login</Link>
      </Message>
    </div>
  );
};

export default StudentRegister;
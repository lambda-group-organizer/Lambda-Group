import React, {useContext, useState} from 'react';
import UserContext from '../../context/UserContext';
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

const Register = ({history}) => {
  const {setUser} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [displayName, setName] = useState('');
  const [studentName, setStudent] = useState('');
  const [admin, setAdmin] = useState(false);

  const register = event => {
    console.log('Clicked register');
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(`createdUser : ${createdUser}`);
        createdUser.user.updateProfile({studentName}).then(() => {
          console.log(createdUser.user);
          setUser({
            displayName,
            studentName,
            uid: createdUser.user.uid,
            email: createdUser.user.email,
          });
          db.collection('students')
            .add({
              email,
              displayName,
              studentName,
              uid: createdUser.user.uid,
            })
            .then(docRef => {
              console.log('Document written with id:', docRef.id);
            })
            .catch(err => {
              console.log(`error: ${err}`);
            });
          history.push('/student/dashboard');
        });
      })
      .catch(err => console.log(`error : ${err}`));
  };

  const registerStudent = event => {
    console.log('Clicked Student');
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(studentEmail, studentPassword)
      .then(createdUser => {
        console.log(`createdUser : ${createdUser}`);
        createdUser.user.updateProfile({displayName}).then(() => {
          console.log(createdUser.user);
          setUser({
            displayName,
            studentName,
            uid: createdUser.user.uid,
            role: 'student',
          });

          db.collection('student')
            .doc(createdUser.user.uid)
            .set({
              name: studentName,
              uid: createdUser.user.uid,
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

  const registerView = (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button
        style={{alignSelf: 'center'}}
        basic
        color="blue"
        size="small"
        onClick={() => setStudent(!student)}>
        Register as a group organizer
      </Button>

      <Form onSubmit={register}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '25px',
          }}
        />
        {!studentName ? (
          <div>
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
                Enter a password
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
              Register
            </Button>
          </div>
        ) : (
          <div>
            {!studentEmail ? (
              <Label color="red" pointing="below">
                Enter your email
              </Label>
            ) : (
              ''
            )}
            <Form.Input
              icon="mail"
              value={studentEmail}
              type="email"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={event => setStudentEmail(event.target.value)}
            />
            {!studentPassword ? (
              <Label color="red" pointing="below">
                Enter your password
              </Label>
            ) : (
              ''
            )}
            <Form.Input
              icon="lock"
              value={studentPassword}
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={event => setStudentPassword(event.target.value)}
            />
            <Button size="large" fluid color="red" type="submit">
              Register Organizer
            </Button>
          </div>
        )}
      </Form>
    </div>
  );

  const registerStudentView = (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button
        style={{alignSelf: 'center'}}
        basic
        color="blue"
        size="small"
        onClick={() => setStudent(!studentName)}>
        Back to registering a participant
      </Button>
      <Form onSubmit={registerStudent}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '25px',
          }}
        />

        {!studentName ? (
          <Label color="red" pointing="below">
            Enter your full name
          </Label>
        ) : (
          ''
        )}
        <Form.Input
          icon="user"
          value={studentName}
          iconPosition="left"
          placeholder="Full Name"
          type="text"
          onChange={event => setStudent(event.target.value)}
        />
        {!studentEmail ? (
          <Label color="red" pointing="below">
            Enter your email
          </Label>
        ) : (
          ''
        )}
        <Form.Input
          icon="mail"
          value={studentEmail}
          type="email"
          iconPosition="left"
          placeholder="E-mail address"
          onChange={event => setStudentEmail(event.target.value)}
        />
        {!studentPassword ? (
          <Label color="red" pointing="below">
            Enter your password
          </Label>
        ) : (
          ''
        )}
        <Form.Input
          icon="lock"
          value={studentPassword}
          iconPosition="left"
          placeholder="Password"
          type="password"
          onChange={event => setStudentPassword(event.target.value)}
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
        {studentName ? registerStudentView : registerView}
      </Segment>
      <Message>
        Already have an account? <Link to="/Login">Login</Link>
      </Message>
    </div>
  );
};

export default Register;

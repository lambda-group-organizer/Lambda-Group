import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import StudentContext from "../context/StudentContext";
import firebase, { db } from "../logic/firebase";
import { withRouter } from "react-router-dom";
//import Dashboard from '../Dashboard/Dashboard';
import StudentDashBoard from "../components/students/StudentDashBoard/StudentDashBoard.js";
import StudentBuildWeekLink from "../components/students/StudentBuildWeekLink/StudentBuildWeekLink.js";
import AdminLogin from "../components/Auth/AdminLogin";
import StudentLogin from "../components/Auth/StudentLogin";
import StudentRegister from "../components/Auth/StudentRegister.js";
//import Register from '../components/Auth/Register';
import AddMinion from "../components/admin/AdminDashboard/AddMinion.js";
import OverLoardMainDashboard from "../components/admin/AdminDashboard/OverloardMainDashBoard.js";
import AdminDashboard from "../components/admin/AdminDashboard/AdminDashboard.js";

// import jwt_decode from 'jwt-decode';

const Root = ({ history }) => {
  //const [user, setUser] = useState(null);
  const [student, setStudent] = useState(null);
  //const [rol, setRole] = useState('student');

  //useEffect(() => {
  //firebase.auth().onAuthStateChanged(async user => {
  //if (user) {
  //const overlord = await db.collection('Overlord').get();
  //overlord.forEach(bigTimeAdmin => {
  //console.log(bigTimeAdmin.data());
  //});
  //const admins = await db.collection('admin').get();
  //admins.forEach(admin => {
  //console.log(admin.data());
  //});
  //const {displayName, uid, photoURL} = user;
  //console.log(user.email);
  //setUser({displayName, uid, photoURL});
  //history.push('/');
  //} else {
  //history.push('/admin/AdminLogin');
  //}
  //});
  //}, [history]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async student => {
      //const token = await user.ra;
      //const decoded = jwt_decode(token);
      //console.log(decoded.email);
      if (student) {
        const { displayName, uid, photoURL } = student;
        // console.log(email)
        setStudent({ displayName, uid, photoURL });
        history.push("/student/dashboard");
      } else {
        history.push("/student/StudentLogin");
      }
    });
  }, [history]);

  return (
    <>
      <StudentContext.Provider value={{ student, setStudent }}>
        <Switch>
          <Route path="/student/dashboard" component={StudentDashBoard} />
          <Route path="/student/Register" component={StudentRegister} />
          <Route path="/student/StudentLogin" component={StudentLogin} />
          <Route path="/:buildWeek" component={StudentBuildWeekLink} />
        </Switch>
      </StudentContext.Provider>
    </>
  );
};

export default withRouter(Root);

//<UserContext.Provider value={{user, setUser}}>
//<Switch>
//<Route exact path="/" component={OverLoardMainDashboard} />
//{[> Admin Login <]}
//<Route exact path="/admin/AdminLogin" component={AdminLogin} />
//<Route exact path="/admin/addMinion" component={AddMinion} />
//<Route exact path="/admin/:BuildWeek" component={AdminDashboard} />

//{[> If checks for student role from firebase <]}

//{[> Student Login <]}
//{[> <Route exact path="/Login" component={Login} /> <]}
//<Route exact path="/student/:BuildWeek" component={AdminDashboard} />
//</Switch>
//</UserContext.Provider>
// // PROOF OF CONCEPT

// class Enumeration {

//     constructor(obj) {

//         for (const key in obj) {

//             this[key] = obj[key]

//         }

//         return Object.freeze(this)

//     }

//     has = (key) => {

//         return this.hasOwnProperty(key)

//     }

// }

// const privileges = new Enumeration({

//     //student: 'STUDENT',

//     admin: 'ADMIN',

//     //overloard: 'OVERLOARD'

// })

// // console.log(privileges.admin)

// // privileges.student = 'admin'

// // console.log(privileges.student)

// // privileges.new = "TEST"

// // console.log(privileges.new)

// localStorage.setItem("privileges", privileges.admin)

// let test = localStorage.getItem('privileges')
// console.log(test)
// localStorage.setItem('privileges', 'Student')

// // module.exports = privileges;

// //PROOF OF CONCEPT

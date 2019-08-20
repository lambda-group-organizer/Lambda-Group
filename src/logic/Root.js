import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import App from '../components/App';
import AdminLogin from '../components/Auth/AdminLogin';
import Register from '../components/Auth/Register';
import AddMinion from '../components/Auth/AddMinion.js';
import UserContext from '../context/UserContext';
import firebase from '../logic/firebase';
import {withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Root = ({history}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      const token = await user.ra;
      const decoded = jwt_decode(token);
      console.log(decoded.email);
      if (user) {
        const {displayName, uid, photoURL} = user;
        // console.log(email)
        setUser({displayName, uid, photoURL});
        history.push('/');
      } else {
        history.push('/admin/AdminLogin');
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Switch>
        <Route exact path="/" component={App} />
        {/* Admin Login */}
        <Route exact path="/admin/AdminLogin" component={AdminLogin} />
        <Route exact path="/admin/Dashboard" component={AdminLogin} />
        <Route exact path="/admin/addMinion" component={AddMinion} />

        {/* Student Login */}
        {/* <Route exact path="/Login" component={Login} /> */}
        <Route exact path="/Register" component={Register} />
      </Switch>
    </UserContext.Provider>
  );
};

export default withRouter(Root);

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

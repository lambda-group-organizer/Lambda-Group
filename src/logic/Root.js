import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
// import UserContext from "../context/UserContext";
//import { AdminContext } from "../context/allContexts";
import firebase, { db } from "../logic/firebase";
import { withRouter } from "react-router-dom";
import { UserContext } from "../context/allContexts";

//import Dashboard from '../Dashboard/Dashboard';
import StudentDashBoard from "../components/students/StudentDashBoard/StudentDashBoard.js";
// import StudentBuildWeekLink from "../components/students/StudentBuildWeekLink/StudentBuildWeekLink.js";
import Login from "../components/Auth/Login";
// import StudentLogin from "../components/Auth/StudentLogin";
import Register from "../components/Auth/Register.js";
import AddMinion from "../components/admin/AdminDashboard/AddMinion.js";
import OverLoardMainDashboard from "../components/admin/AdminDashboard/OverloardMainDashBoard.js";
import AdminDashboard from "../components/admin/AdminDashboard/AdminDashboard.js";

const Root = ({ history }) => {
  const {
    user,
    setUser,
    role,
    setRole,
    email,
    setEmail,
    password,
    setPassword
  } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        checkIfAdmin(user.email);
        const { displayName, uid } = user;
        setUser({ displayName, uid });
      } else {
        history.push("/");
      }
    });
  }, []);

  const checkIfAdmin = async userEmail => {
    let adminList = [];
    await db
      .collection("admin")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          adminList.push({ email: doc.data().email, role: doc.data().role });
        });
        let isAdmin = false;
        adminList.forEach(admin => {
          if (admin.email === userEmail) {
            isAdmin = true;
            setEmail(admin.email);
            setRole(admin.role);
            return;
          }
        });
        if (!isAdmin) {
          setEmail(userEmail);
          setRole("student");
        }
      });
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          setUser,
          setRole,
          role,
          email,
          setEmail,
          password,
          setPassword
        }}
      >
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {role === "minion" || role === "overlord" ? (
            <>
              <Route
                exact
                path="/overlord"
                component={OverLoardMainDashboard}
              />
              <Route
                exact
                path="/admin/:BuildWeek"
                component={AdminDashboard}
              />
            </>
          ) : null}
          {role === "student" ? (
            <>
              <Route path="/student/dashboard" component={StudentDashBoard} />
            </>
          ) : null}

          {/* <Route path="/student/StudentLogin" component={StudentLogin} /> */}
          {/* <Route path="/student/:buildWeek" component={StudentBuildWeekLink} /> */}
        </Switch>
      </UserContext.Provider>
    </>
  );
};

export default withRouter(Root);

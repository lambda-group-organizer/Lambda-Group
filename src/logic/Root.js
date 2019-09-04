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
import StudentBuildWeekView from "../components/students/StudentDashBoard/StudentBuildWeekView";
import { list } from "postcss";

const Root = (props, { history, match }) => {
  const {
    user,
    setUser,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    currentBuildWeekURL,
    setCurrentBuildWeekURL,
    projectRole,
    setProjectRole
  } = useContext(UserContext);

  useEffect(() => {
    // In case of student clicking on URL from Overlord, this will grab the build week they are accessing
    // and place it in UserContext so that it can be pushed to after they log in
    let buildWeek = `${props.history.location.pathname}`;
    if (buildWeek.charAt(0) === "/") {
      buildWeek = buildWeek.substring(1);
    }
    let listOfBuildWeeks = [];
    db.collection("build_weeks")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          listOfBuildWeeks.push(doc.data().buildWeekName);
        });
        const result = listOfBuildWeeks.filter(item => {
          return item === buildWeek;
        });
        setCurrentBuildWeekURL(result[0]);
      });

    // Checks if student is already logged in
    firebase.auth().onAuthStateChanged(user => {
      // If it's a build week (matches one in the DB)
      // add to UserContext
      // Go to Build week in User Context
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
          // set build week
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
          setPassword,
          currentBuildWeekURL,
          setCurrentBuildWeekURL,
          projectRole,
          setProjectRole
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
                path="/admin/:buildWeek"
                component={AdminDashboard}
              />
            </>
          ) : null}
          {role === "student" ? (
            <>
              <Route
                exact
                path="/student/dashboard"
                component={StudentDashBoard}
              />
              <Route
                exact
                path="/student/buildweek/:buildWeek"
                component={StudentBuildWeekView}
              />
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

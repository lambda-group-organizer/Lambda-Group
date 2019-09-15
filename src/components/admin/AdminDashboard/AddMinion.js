import React, { useState, useEffect } from "react";
import DisplayAllAdmins from "../AdminDashboard/DisplayAllAdmins/DisplayAllAdmins.js";
import { db } from "../../../logic/firebase.js";
import Fuse from "fuse.js";
import fuzzySearch from "../../globalComponents/fuzzySearch";
import { Form, Button } from "semantic-ui-react";

const AddMinion = props => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [triggerAdminFunc, setTriggerAdminFunc] = useState(false);

  const fetchStudents = async () => {
    let studentArr = [];
    await db
      .collection("students")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const studentData = {
            name: doc.data().displayName,
            email: doc.data().email
          };
          studentArr.push(studentData);
          return studentArr;
        });
        setStudents(studentArr);
        setFilteredStudents(studentArr);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const searchStudents = (studentArr, e) => {
    const keys = ["name", "email"];
    const result = fuzzySearch(studentArr, keys, e);
    if (e.target.value === "") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(result);
    }
  };

  const makeOverloard = (s, role) => {
    db.collection("admin")
      .doc(`${s.email}`)
      .set({
        displayName: s.name,
        email: s.email,
        role: role
      })
      .then(function() {
        setTriggerAdminFunc(!triggerAdminFunc);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div>
      <DisplayAllAdmins
        triggerAdminFunc={triggerAdminFunc}
        setTriggerAdminFunc={setTriggerAdminFunc}
      />
      <Form.Input
        size="big"
        focus
        icon="filter"
        iconPosition="left"
        placeholder="Search Users"
        type="text"
        onChange={e => searchStudents(students, e)}
      />
      {filteredStudents &&
        filteredStudents.map((s, i) => {
          return (
            <div key={s.email}>
              <p>
                {s.name} | {s.email}
              </p>
              <Button onClick={() => makeOverloard(s, "overlord")}>
                Make a Admin!
              </Button>
              <Button onClick={() => makeOverloard(s, "minion")}>
                Make Team Lead!
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default AddMinion;

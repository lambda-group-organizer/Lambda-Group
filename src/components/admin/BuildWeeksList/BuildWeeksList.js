import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { db } from "../../../logic/firebase";
import { Card, Button } from "semantic-ui-react";
import Spinner from "../../globalComponents/Spinner/Spinner.js";
import LocalSpinner from "../../globalComponents/Spinner/LocalSpinner.js";
import { UserContext } from "../../../context/allContexts";

import CopyLink from "./CopyLink";

const BuildWeeksList = props => {
  const { setCurrentBuildWeekURL } = useContext(UserContext);

  const [listOfBuildWeeks, setListOfBuildWeeks] = useState([]);
  const [triggerDeleteState, setTriggerDeleteState] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //  ===================================== Populates list of build weeks ===================================== //

  const fetchBuildWeeks = async () => {
    setListOfBuildWeeks([]);
    let buildWeeksCollection = await db.collection("build_weeks").get();
    buildWeeksCollection.forEach(function(doc) {
      setListOfBuildWeeks(prevSetOfBuildWeeks => {
        return [...prevSetOfBuildWeeks, `${doc.id}`];
      });
    });
  };
  useEffect(() => {
    fetchBuildWeeks();
  }, [props.update, triggerDeleteState]);

  //  ===================================== Push to Individual Build Week View ===================================== //

  function goToBuildWeekView(buildWeek) {
    setCurrentBuildWeekURL(buildWeek);
    props.history.push(`/Admin/${buildWeek}`);
  }

  function removeBuildWeek(buildWeek) {
    setIsDeleting(true);
    db.collection("build_weeks")
      .doc(`${buildWeek}`)
      .collection("projects")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          db.collection("build_weeks")
            .doc(`${buildWeek}`)
            .collection("projects")
            .doc(doc.data().project.uid)
            .delete();
        });
        db.collection("build_weeks")
          .doc(`${buildWeek}`)
          .delete()
          .then(function() {
            setTriggerDeleteState(!triggerDeleteState);
            setIsDeleting(false);
          })
          .catch(err => {
            console.error(err);
          });
      });
  }

  return (
    <div>
      {isDeleting && <Spinner />}
      <Card.Group>
        {listOfBuildWeeks &&
          listOfBuildWeeks.map(buildWeek => (
            <Card key={`${buildWeek}`}>
              {props.currentLoadingBuildWeek === buildWeek ? (
                <LocalSpinner />
              ) : (
                <>
                  <Card.Content onClick={() => goToBuildWeekView(buildWeek)}>
                    <Card.Header>{buildWeek}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <div className="ui buttons">
                      <Button
                        onClick={() => removeBuildWeek(buildWeek)}
                        basic
                        color="red"
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Content>
                  <CopyLink buildWeek={buildWeek} />
                </>
              )}
            </Card>
          ))}
      </Card.Group>
    </div>
  );
};

export default withRouter(BuildWeeksList);

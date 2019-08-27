import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {db} from '../../../logic/firebase';
import {Card, Button} from 'semantic-ui-react';

const BuildWeeksList = props => {
  const [listOfBuildWeeks, setListOfBuildWeeks] = useState([]);

  //  ===================================== Populates list of build weeks ===================================== //
  // needs to run each time a build week is created
  const fetchBuildWeeks = async () => {
    let buildWeeksCollection = await db.collection('build_weeks').get();
    buildWeeksCollection.forEach(function(doc) {
      setListOfBuildWeeks(prevSetOfBuildWeeks => {
        return [...prevSetOfBuildWeeks, `${doc.id}`];
      });
      //console.log(doc.id, '=>', doc.data());
    });
  };
  useEffect(() => {
    fetchBuildWeeks();
  }, []);

  //  ===================================== Push to Individual Build Week View ===================================== //

  function BuildWeekView(buildWeek) {
    console.log(props);
    props.history.push(`/Admin/${buildWeek}`);
  }

  return (
    <div>
      <Card.Group>
        {listOfBuildWeeks &&
          listOfBuildWeeks.map(buildWeek => (
            <Card key={`${buildWeek}`}>
              <Card.Content onClick={() => BuildWeekView(buildWeek)}>
                <Card.Header>{buildWeek}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <div className="ui buttons">
                  <Button basic color="red">
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </div>
  );
};

export default withRouter(BuildWeeksList);

import React, {useState, useEffect} from 'react';
import {db} from '../../../../logic/firebase.js';
import './DisplayAllAdmins.css';
import {Button, Header, Card, List} from 'semantic-ui-react';

const DisplayAllAdmins = ({triggerAdminFunc, setTriggerAdminFunc}) => {
  const [overlords, setOverlords] = useState([]);
  const [minions, setMinions] = useState([]);

  const fetchAdmins = async () => {
    console.log('fetch admins running!')
    let overLoardArr = [];
    let minionArr = [];
    await db
      .collection('admin')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const adminData = {
            name: doc.data().displayName,
            email: doc.data().email,
            role: doc.data().role,
          };
          if (adminData.role === 'overlord') {
            overLoardArr.push(adminData);
            return overLoardArr
          } else {
            minionArr.push(adminData);
            return minionArr
          }
        });
        setMinions(minionArr);
        setOverlords(overLoardArr);
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, [triggerAdminFunc]);

  const removeAdmin = user => {
    db.collection('admin')
      .doc(`${user.email}`)
      .delete()
      .then(function() {
        console.log('DELETED');
        setTriggerAdminFunc(!triggerAdminFunc)
      })
      .catch(err => {
        console.error(err);
      });
  };

  const updatePermissions = (user) => {
    console.log(user)
  }

  return (
    <>
      <h2>Administrators</h2>
      <Card.Group>
        {overlords &&
          overlords.map(o => {
            return (
              <Card key={o.email}>
                <Card.Content>{o.name}</Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button onClick={() => removeAdmin(o)} color="red">
                      Remove
                    </Button>{' '}
                    <Button.Or />
              <Button onClick={() => updatePermissions(o)} color="blue">Make Team Lead</Button>
                  </Button.Group>
                </Card.Content>
              </Card>
            );
          })}
      </Card.Group>
      <h3>Team Leads</h3>
      <Card.Group>
        {minions &&
          minions.map(m => {
            return (
              <Card key={m.email}>
                <Card.Content>
                  <Card.Header>{m.name}</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Button.Group>
                    <Button onClick={() => removeAdmin(m)} color="red">
                      Remove
                    </Button>
                    <Button.Or />
                    <Button color="blue">Make Admin</Button>
                  </Button.Group>
                </Card.Content>
              </Card>
            );
          })}
      </Card.Group>
    </>
  );
};

export default DisplayAllAdmins;

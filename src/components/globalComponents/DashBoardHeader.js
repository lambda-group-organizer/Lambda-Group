import React, { useContext } from 'react'
import {Button, Icon, Header,} from 'semantic-ui-react';
import firebase from '../../logic/firebase.js';
import  { UserContext }  from '../../context/allContexts'

const DashBoardHeader = props => {
    const { setRole, setUser } = useContext(UserContext)
    const signOut = () => {
        setRole(null)
        setUser(null)
      firebase.auth().signOut();
    };

    return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#ba112e',
        marginBottom: '40px',
      }}>
      <Header as="h1" inverted style={{marginTop: '25px'}}>
        {/* <Icon color="white" name="chevron up"/> */}
        <Icon name="chevron up" style={{color: 'white'}} />
        Lambda Group Organizer
      </Header>
      <Button
        inverted
        // color="white"
        size="mini"
        // className="mini ui negative basic button logoutButton"
        onClick={signOut}
        style={{marginLeft: '1%', alignSelf: 'center', color: 'white'}}>
        <i className="icon sign-out" />
        Logout
      </Button>
    </div>
    )
}

export default DashBoardHeader;

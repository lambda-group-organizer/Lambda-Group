import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore";
import "firebase/database"
import "firebase/storage"

// var firebaseConfig = {
//     apiKey: "AIzaSyB1hY9BPU0J0JOmFb-grXOm9LYD2ON4t1I",
//     authDomain: "lambda-group-organizer.firebaseapp.com",
//     databaseURL: "https://lambda-group-organizer.firebaseio.com",
//     projectId: "lambda-group-organizer",
//     storageBucket: "",
//     messagingSenderId: "303661905563",
//     appId: "1:303661905563:web:13e7cea7e52d0b4d"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCqbH5AAseS21cR-5sr1jtwh9ac1BG4_C8",
    authDomain: "lambda-group-organizer-d-a0b2c.firebaseapp.com",
    databaseURL: "https://lambda-group-organizer-d-a0b2c.firebaseio.com",
    projectId: "lambda-group-organizer-d-a0b2c",
    storageBucket: "lambda-group-organizer-d-a0b2c.appspot.com",
    messagingSenderId: "171239286507",
    appId: "1:171239286507:web:278274e365bbedf5"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const db = firebase.firestore();

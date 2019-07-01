import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyB1hY9BPU0J0JOmFb-grXOm9LYD2ON4t1I",
    authDomain: "lambda-group-organizer.firebaseapp.com",
    databaseURL: "https://lambda-group-organizer.firebaseio.com",
    projectId: "lambda-group-organizer",
    storageBucket: "",
    messagingSenderId: "303661905563",
    appId: "1:303661905563:web:13e7cea7e52d0b4d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

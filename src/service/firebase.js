import firebase from "firebase/app";
import  "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCTlVPM8uKX0ZltL0pnFA4j4W_iUsarYLc",
    authDomain: "pokemon-game-8bea6.firebaseapp.com",
    databaseURL: "https://pokemon-game-8bea6-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-8bea6",
    storageBucket: "pokemon-game-8bea6.appspot.com",
    messagingSenderId: "862886558646",
    appId: "1:862886558646:web:4abfbcf84302bc8e829f17"
}

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export {
    firebase,
    database,
}

export default database;



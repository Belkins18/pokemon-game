import firebase from "firebase/app";
import  "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // "AIzaSyCTlVPM8uKX0ZltL0pnFA4j4W_iUsarYLc",
    authDomain: process.env.REACT_APP_AUTH_DOMAIN, // "pokemon-game-8bea6.firebaseapp.com",
    databaseURL: process.env.REACT_APP_DATABASE_URL, // "https://pokemon-game-8bea6-default-rtdb.firebaseio.com",
    projectId: process.env.REACT_APP_PROJECT_ID, // "pokemon-game-8bea6",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // "pokemon-game-8bea6.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, // "862886558646",
    appId: process.env.REACT_APP_ID, // "1:862886558646:web:4abfbcf84302bc8e829f17"
}

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const DT_POKEMONS = "pokemons"

export {
    firebase,
    database,
    DT_POKEMONS
}

export default database;



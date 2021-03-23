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

export default class Firebase {
    constructor() {
        this.firebase = firebase;
        this.database = this.firebase.database();
        this.dbPokemonsName = "pokemons";
    }

    getPokemonsSocket(cb) {
        this.database.ref(this.dbPokemonsName).on("value", (snapshot) => {
            cb(snapshot.val());
        })
    }

    offPokemonsSocket() {
        this.database.ref(this.dbPokemonsName).off();
    }

    async getPokemonsOnce() {
        return await this.database.ref(this.dbPokemonsName).once('value')
            .then(snapshot => snapshot.val());
    }

    postPokemon(uuid, pokemon, cb = null) {
        this.database.ref(`${this.dbPokemonsName}/${uuid}`).set(pokemon)
            .then(() => cb())
            .catch((error) => {console.error(error.message())});
    }

    addPokenon(data, cb = null) {
        const key = this.database.ref().child('pokemons').push().key;
        this.database.ref(`${this.dbPokemonsName}/${key}`).set(data)
            .then(() => cb())
            .catch((error) => {
                console.error(error.message())
            })
    }
}




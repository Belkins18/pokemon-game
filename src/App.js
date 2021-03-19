import {useLocation, Route, Switch, Redirect} from "react-router-dom";
import firebase from "firebase";
import cn from "classnames";
// Components
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import NotFound from "./routes/NotFound";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
//Styles
import s from "./app.module.css";

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

database.ref('pokemons').once('value', (snapshot) => {
    console.log(snapshot.val());
})


const App = () => {
    const location = useLocation();
    const noMatch = () => (location.pathname === "/" || location.pathname === "/welcome")

    return (
        <Switch>
            <Route path="/404" component={NotFound}/>

            <Route>
                <>
                    <MenuHeader bgActive={!noMatch()}/>
                    <div
                        className={cn(s.wrap, {
                            [s.isHomePage]: noMatch(),
                        })}
                    >
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/welcome" component={HomePage}/>
                            <Route path="/game" component={GamePage}/>
                            <Route path="/about" component={AboutPage}/>
                            <Route path="/contact" component={ContactPage}/>
                            <Route render={() => <Redirect to="/404"/>}/>
                        </Switch>
                    </div>
                    <Footer/>
                </>
            </Route>

        </Switch>
    );
};

export default App;

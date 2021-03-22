import {useState} from "react";
import {useLocation, Route, Switch, Redirect} from "react-router-dom";
import cn from "classnames";
// Components
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import NotFound from "./routes/NotFound";
import MenuHeader from "./components/MenuHeader";
import Footer from "./components/Footer";
//ContextProvider
import {FirebaseContext} from "./context/firebaseContext";
import Firebase from "./service/firebase";
//Styles
import s from "./app.module.css";

const App = () => {
    const location = useLocation();
    const noMatch = () => (location.pathname === "/" || location.pathname === "/welcome")

    return (
        <FirebaseContext.Provider value={new Firebase()}>
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
        </FirebaseContext.Provider>
    );
};

export default App;

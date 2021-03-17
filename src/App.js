import { useRouteMatch, useLocation, Route, Switch } from "react-router-dom";
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

const App = () => {
  const location = useLocation();
  const noMatch = () => (location.pathname === "/" || location.pathname === "/welcome")

  return (
    <Switch>
      <Route>
        <>
          <MenuHeader bgActive={!noMatch()} />
          <div
            className={cn(s.wrap, {
              [s.isHomePage]: noMatch(),
            })}
          >
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/game" component={GamePage} />
              <Route path="/welcome" component={HomePage} />
            </Switch>
          </div>
          <Footer />
        </>
      </Route>

      <Route path="/*" component={NotFound} />
    </Switch>
  );
};

export default App;

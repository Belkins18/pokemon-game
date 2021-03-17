import { BrowserRouter, Route, Switch } from "react-router-dom";

// import { useState } from "react";
import AboutPage from "./routes/AboutPage";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import NotFound from "./routes/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/game" component={GamePage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  // const [page, setPage] = useState("app");

  // const handleChangePage = (pageName) => {
  //   setPage(pageName);
  // }

  // switch (page) {
  //   case "app":
  //   default:
  //       return <HomePage onChangePage={handleChangePage}/>
  //   case "game":
  //       return <GamePage onChangePage={handleChangePage}/>
  // }
};

export default App;

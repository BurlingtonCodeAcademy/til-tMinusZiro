import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./index.css";
import { useState } from "react";
import Home from "./components/Home.jsx";
import ReadPage from "./components/ReadPage.jsx";
import WritePage from "./components/WritePage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div id="nav-bar">
          <NavBar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/facts" component={ReadPage} />
          <Route path="/facts/:id" component={WritePage} />
          {/* <Route
            path="/facts/:id"
            render={(props) => <WritePage match={props.match} />}
          /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Lean from "./pages/Lean";
import Main from "./pages/Main";
import Credits from "./pages/Credits";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const generateId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  return (
    <Router>
      <Switch>
        <Route path="/lean/:id">
          <Lean />
        </Route>
        <Route path="/lean/">
          <Redirect to={`/lean/${generateId(8)}`}></Redirect>
        </Route>
        <Route path="/credits/">
          <Credits />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

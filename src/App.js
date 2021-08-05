import Lean from "./pages/Lean";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/lean/:id">
          <Lean />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

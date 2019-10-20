import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { RequestLoan } from "./pages/RequestLoan";
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <RequestLoan />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

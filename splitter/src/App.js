import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MoonChart } from "./pages/MoonChart";
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MoonChart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

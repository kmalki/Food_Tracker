import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/home.js';
import Recettes from './components/recettes.js';
import Paniers from './components/paniers.js';
import Register from './components/register.js';
import Login from './components/login.js';

function App() {

  return (
    <Router>
        <Switch>
          <Route path="/recettes">
            <Recettes />
          </Route>
          <Route path="/paniers">
            <Paniers />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Register />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

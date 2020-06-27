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
import Profile from './components/profile.js'
import Consumed from './components/consumed.js'
function App() {

  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/recettes">
          <Recettes />
        </Route>
        <Route path="/paniers">
          <Paniers />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/consumed">
          <Consumed />
        </Route>
        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

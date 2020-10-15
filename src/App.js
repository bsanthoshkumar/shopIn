import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Products from './components/Products';
import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Products />
      </Route>
    </Switch>
  </Router>
);

export default App;

import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import Product from './components/Product';
import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Header />
        <Products />
      </Route>
      <Route exact path="/product/:id">
        <Header />
        <Product />
      </Route>
    </Switch>
  </Router>
);

export default App;

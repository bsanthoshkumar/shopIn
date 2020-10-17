import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';
import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/products" />
      </Route>
      <Route exact path="/products">
        <Products />
      </Route>
      <Route exact path="/product/:id">
        <Product />
      </Route>
      <Route exact path="/cart">
        <Cart />
      </Route>
    </Switch>
  </Router>
);

export default App;

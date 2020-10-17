const express = require('express');
const app = express();

const menDresses = require('../../data/mendresses.json');
const womenDresses = require('../../data/womendresses.json');
const kidsDresses = require('../../data/kidsdresses.json');
const electronics = require('../../data/electronics.json');
const mobiles = require('../../data/mobiles.json');
const homeappliances = require('../../data/homeappliances.json');
const ladiesDresses = require('../../data/ladiesdresses.json');

app.use(express.json());
app.locals.db = {
  products: [
    ...menDresses.products,
    ...womenDresses.products,
    ...kidsDresses.products,
    ...electronics.products,
    ...mobiles.products,
    ...homeappliances.products,
    ...ladiesDresses.products,
  ],
  cart: [],
};

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/api/products', (req, res) => res.json(req.app.locals.db.products));
app.get('/api/product/:id', (req, res) => {
  const { id } = req.params;
  const product = req.app.locals.db.products.find(
    (product) => product.asin == id
  );
  const isInCart = req.app.locals.db.cart.find((p) => p.id == id);
  res.json({ product, isInCart });
});

app.get('/api/addToCart/:id', (req, res) => {
  const { id } = req.params;
  const product = req.app.locals.db.products.find(
    (product) => product.asin == id
  );
  req.app.locals.db.cart.push(product);
  res.json({ product, isInCart: true });
});

app.get('/api/removeFromCart/:id', (req, res) => {
  const { id } = req.params;
  req.app.locals.db.cart = req.app.locals.db.cart.filter(
    (product) => product.asin != id
  );
  res.json(req.app.locals.db.cart);
});

app.get('/api/cart', (req, res) => res.json(req.app.locals.db.cart));
app.listen(8000, () => console.log('listening on port 8000...'));

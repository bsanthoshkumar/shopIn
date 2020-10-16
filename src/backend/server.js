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
app.locals.db = [
  ...menDresses.products,
  ...womenDresses.products,
  ...kidsDresses.products,
  ...electronics.products,
  ...mobiles.products,
  ...homeappliances.products,
  ...ladiesDresses.products,
];

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('/api/products', (req, res) => res.json(req.app.locals.db));
app.get('/api/product/:id', (req, res) => {
  const { id } = req.params;
  const product = req.app.locals.db.find((product) => product.asin == id);
  res.json(product);
});

app.listen(8000, () => console.log('listening on port 8000...'));

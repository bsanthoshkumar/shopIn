const express = require('express');
const app = express();

const mobilesData = require('../../data/mobiles.json');
const ladiesDressesData = require('../../data/ladiesdresses.json');

app.use(express.json());
app.locals.db = [...mobilesData.products, ...ladiesDressesData.products];

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

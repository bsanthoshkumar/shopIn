const express = require('express');
const app = express();
const { clientID, clientSecret } = require('../../config');
const cookieSession = require('cookie-session');
const axios = require('axios');

const productsData = require('../../data/products.json');
app.use(express.json());
app.locals.db = { products: productsData, cart: [], users: [] };

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.set('sessionMiddleware', cookieSession({ secret: 'shopIn' }));
app.use((...args) => app.get('sessionMiddleware')(...args));

const getUserDetails = (req, res) => {
  const code = req.query.code;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };
  axios
    .post(
      `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
      { headers }
    )
    .then((response) => {
      let [access_token] = response.data.split('&');
      access_token = access_token.split('=')[1];
      const headers = { Authorization: `token ${access_token}` };
      axios.get(`https://api.github.com/user`, { headers }).then((resp2) => {
        const { id, login, avatar_url } = resp2.data;
        req.session.id = id;
        req.session.username = login;
        req.session.avatar_url = avatar_url;
        req.app.locals.db.users.push({ id, name: login, img: avatar_url });
        res.redirect('http://localhost:3000/');
      });
    });
};

const checkAuthentication = (req, res, next) => {
  if (req.session.isNew) {
    res.status(403);
    res.json({ message: 'Please login dude' });
    return;
  }
  next();
};

app.get('/api/login', getUserDetails);

app.get('/api/register', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientID}`
  );
});

app.get('/api/getUser', (req, res) => {
  const id = req.session.id;
  const user = req.app.locals.db.users.find((user) => user.id == id);
  res.json(user || null);
});

app.get('/api/logout', (req, res) => {
  const id = req.session.id;
  req.app.locals.db.users = req.app.locals.db.users.filter(
    (user) => user.id != id
  );
  res.json(null);
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

app.get('/api/filter/:type', (req, res) => {
  const { type } = req.params;
  const products = req.app.locals.db.products.filter(
    (p) => p.categeory == type
  );
  res.json(products);
});

app.get('/api/search/:text', (req, res) => {
  const { text } = req.params;
  const products = req.app.locals.db.products.filter((p) =>
    p.title.match(text)
  );
  res.json(products);
});

app.use(checkAuthentication);
app.get('/api/cart', (req, res) => res.json(req.app.locals.db.cart));
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

app.listen(8000, () => console.log('listening on port 8000...'));

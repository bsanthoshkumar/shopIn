import fetch from 'node-fetch';

const ProductsAPI = {
  getAllProducts: () => fetch('/api/products').then((res) => res.json()),
  getProduct: (id) => fetch(`/api/product/${id}`).then((res) => res.json()),
  addToCart: (id) => fetch(`/api/addToCart/${id}`).then((res) => res.json()),
  removeFromCart: (id) =>
    fetch(`/api/removeFromCart/${id}`).then((res) => res.json()),
  getCart: () => fetch(`/api/cart`).then((res) => res.json()),
  filterProducts: (type) =>
    fetch(`/api/filter/${type}`).then((res) => res.json()),
  searchProducts: (text) =>
    fetch(`/api/search/${text}`).then((res) => res.json()),
};

export default ProductsAPI;

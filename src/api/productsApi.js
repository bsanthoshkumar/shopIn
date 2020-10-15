const post = (body) => ({
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'content-type': 'application/json' },
});

const ProductsAPI = {
  getAllProducts: () => fetch('/api/products').then((res) => res.json()),
  getProduct: (id) => fetch(`/api/product/${id}`).then((res) => res.json()),
};

export default ProductsAPI;

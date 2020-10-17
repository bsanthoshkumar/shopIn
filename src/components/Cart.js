import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';
import ProductView from './ProductView';
import Header from './Header';

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 50px;
  justify-content: space-evenly;
  height: 800px;
`;

const Footer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  position: fixed;
  box-shadow: 2px 3px 8px 2px lightgrey;
  justify-content: space-evenly;
  background: white;
`;

const TotalCost = styled.span`
  font-size: 25px;
  margin-top: 10px;
`;

const getProductsView = (products, removeFromCart) =>
  products.map((product) => (
    <ProductView
      key={product.asin}
      product={product}
      inCart={true}
      onClick={removeFromCart}
    />
  ));

const getTotalCost = (products) =>
  products.reduce(
    (total, product) => total + product.price['current_price'],
    0
  );

const Cart = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    ProductsAPI.getCart().then(setProducts);
  }, []);

  const removeFromCart = (id) =>
    ProductsAPI.removeFromCart(id).then(setProducts);

  if (products == null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <StyledProducts>
        {getProductsView(products, removeFromCart)}
      </StyledProducts>
      <Footer>
        <TotalCost>Total: {getTotalCost(products)}</TotalCost>
      </Footer>
    </div>
  );
};

export default Cart;

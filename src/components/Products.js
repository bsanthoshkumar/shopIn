import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';
import ProductView from './ProductView';

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px 50px;
  justify-content: space-evenly;
`;

const getProductsView = (products) =>
  products.map((product) => (
    <ProductView key={product.asin} product={product} />
  ));

const Products = (props) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    ProductsAPI.getAllProducts().then(setProducts);
  }, []);

  if (products == null) {
    return <p>Loading...</p>;
  }

  return <StyledProducts style={{}}>{getProductsView(products)}</StyledProducts>;
};

export default Products;

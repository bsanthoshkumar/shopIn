import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';
import ProductView from './ProductView';
import useHover from './useHover';

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 50px;
  justify-content: space-evenly;
`;

const Tools = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;

const Sort = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  border: solid 1px lightgrey;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
`;

const SortOptions = styled.div`
  position: absolute;
  margin-top: 35px;
  border: solid 1px lightgrey;
  background-color: white;
`;

const SortOption = styled.div`
  height: 30px;
  width: 250px;
  margin: 5px 0px;
  padding-left: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const getProductsView = (products) =>
  products.map((product) => (
    <ProductView key={product.asin} product={product} />
  ));

const lowToHigh = (a, b) => a.price['current_price'] - b.price['current_price'];
const HighToLow = (a, b) => b.price['current_price'] - a.price['current_price'];
const betterDiscount = (a, b) =>
  b.price['savings_percent'] - a.price['savings_percent'];

const sortProductsByType = (products, type) => {
  let sortedProducts;
  if (type === 'Price: Low to High') sortedProducts = products.sort(lowToHigh);
  if (type === 'Price: High to Low') sortedProducts = products.sort(HighToLow);
  if (type === 'Better discount')
    sortedProducts = products.sort(betterDiscount);

  return sortedProducts;
};

const getSortOptions = (isHovered, sortProducts) => (
  <SortOptions style={{ display: `${isHovered ? 'block' : 'none'}` }}>
    <SortOption onClick={() => sortProducts('Price: Low to High')}>
      Price: Low to High
    </SortOption>
    <SortOption onClick={() => sortProducts('Price: High to Low')}>
      Price: High to Low
    </SortOption>
    <SortOption onClick={() => sortProducts('Better discount')}>
      Better discount
    </SortOption>
  </SortOptions>
);

const Products = ({ sortType }) => {
  const [ref, isHovered] = useHover();
  const [products, setProducts] = useState(null);
  const [sortState, setSortState] = useState(sortType || 'Recommended');

  useEffect(() => {
    ProductsAPI.getAllProducts().then(setProducts);
  }, []);

  if (products == null) {
    return <p>Loading...</p>;
  }

  const sortProducts = (type) => {
    setSortState(type);
    setProducts(sortProductsByType(products, type));
  };

  return (
    <div>
      <Tools>
        <Sort ref={ref}>
          <span style={{ padding: '5px' }}>
            {'Sort By:'} <b>{sortState}</b>
          </span>
          {getSortOptions(isHovered, sortProducts)}
        </Sort>
      </Tools>
      <StyledProducts>{getProductsView(products)}</StyledProducts>
    </div>
  );
};

export default Products;

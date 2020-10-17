import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';
import ProductView from './ProductView';
import Header from './Header';
import useHover from './useHover';
import SearchBar from './SearchBar';

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 50px;
  justify-content: space-evenly;
`;

const Menubar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  border: solid 1px lightgrey;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
`;

const MenuOptions = styled.div`
  position: absolute;
  margin-top: 35px;
  border: solid 1px lightgrey;
  background-color: white;
`;

const MenuOption = styled.div`
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
  <MenuOptions style={{ display: `${isHovered ? 'block' : 'none'}` }}>
    <MenuOption onClick={() => sortProducts('Price: Low to High')}>
      Price: Low to High
    </MenuOption>
    <MenuOption onClick={() => sortProducts('Price: High to Low')}>
      Price: High to Low
    </MenuOption>
    <MenuOption onClick={() => sortProducts('Better discount')}>
      Better discount
    </MenuOption>
  </MenuOptions>
);

const getFilterOptions = (isHovered, FilterProducts) => (
  <MenuOptions style={{ display: `${isHovered ? 'block' : 'none'}` }}>
    <MenuOption onClick={() => FilterProducts('Men dresses')}>
      Men dresses
    </MenuOption>
    <MenuOption onClick={() => FilterProducts('Women dresses')}>
      Women dresses
    </MenuOption>
    <MenuOption onClick={() => FilterProducts('Kids dresses')}>Kids</MenuOption>
    <MenuOption onClick={() => FilterProducts('Electronics')}>
      Electronics
    </MenuOption>
    <MenuOption onClick={() => FilterProducts('Mobiles')}>Mobiles</MenuOption>
    <MenuOption onClick={() => FilterProducts('Home Appliances')}>
      Home Appliances
    </MenuOption>
  </MenuOptions>
);

const Products = () => {
  const [products, setProducts] = useState(null);
  const [sortRef, isSortHovered] = useHover();
  const [sortType, setSortType] = useState('Recommended');
  const [filterRef, isFilterHovered] = useHover();
  const [filterType, setFilterType] = useState('None');

  useEffect(() => {
    ProductsAPI.getAllProducts().then(setProducts);
  }, []);

  if (products == null) {
    return <p>Loading...</p>;
  }

  const sortProducts = (type) => {
    setSortType(type);
    setProducts(sortProductsByType(products, type));
  };

  const filterProducts = (type) => {
    setSortType('Recommended');
    setFilterType(type);
    ProductsAPI.filterProducts(type).then(setProducts);
  };

  const searchProducts = (text) =>
    ProductsAPI.searchProducts(text).then(setProducts);

  return (
    <div>
      <Header searchBar={<SearchBar onSubmit={searchProducts} />} />
      <Menubar>
        <Menu ref={sortRef}>
          <span style={{ padding: '5px' }}>
            {'Sort By:'} <b>{sortType}</b>
          </span>
          {getSortOptions(isSortHovered, sortProducts)}
        </Menu>
        <Menu ref={filterRef}>
          <span style={{ padding: '5px' }}>
            {'Filter By:'} <b>{filterType}</b>
          </span>
          {getFilterOptions(isFilterHovered, filterProducts)}
        </Menu>
      </Menubar>
      <StyledProducts>{getProductsView(products)}</StyledProducts>
    </div>
  );
};

export default Products;

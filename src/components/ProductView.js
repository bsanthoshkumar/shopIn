import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  padding: 5px;
  margin: 20px 10px;
  &:hover {
    box-shadow: 2px 3px 8px 2px lightgrey;
  }
`;

const StyledImg = styled.img`
  max-width: 250px;
  max-height: 250px;
  align-self: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 20px;
  margin: 10px;
  height: 70px;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const Price = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin: 10px;
`;

const ProductView = ({ product }) => (
  <StyledDiv>
    <StyledImg src={product.thumbnail} />
    <NavLink
      exact
      to={`/product/${product.asin}`}
      style={{ textDecoration: 'none' }}
    >
      <Title>{`${product.title.slice(0, 70)} ...`}</Title>
    </NavLink>
    <Price>{`₹.${product.price['current_price']}`}</Price>
  </StyledDiv>
);

export default ProductView;

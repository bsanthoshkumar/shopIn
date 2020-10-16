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

// const Price = styled.div`
//   font-weight: 400;
//   font-size: 18px;
//   margin: 10px;
// `;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  font-weight: 400;
  font-size: 18px;
`;

const OldCost = styled.p`
  color: grey;
  text-decoration-line: line-through;
`;

const Percent = styled.p`
  color: orange;
`;

const ProductView = ({ product }) => (
  <StyledDiv>
    <StyledImg src={product.thumbnail} />
    <div>
      <NavLink
        exact
        to={`/product/${product.asin}`}
        style={{ textDecoration: 'none' }}
      >
        <Title>{`${product.title.slice(0, 70)} ...`}</Title>
      </NavLink>
      <Price>
        <p>{`₹.${product.price['current_price']}`}</p>
        <OldCost>{`₹.${product.price['before_price']}`}</OldCost>
        <Percent>{`(${product.price['savings_percent']}% off)`}</Percent>
      </Price>
    </div>
  </StyledDiv>
);

export default ProductView;

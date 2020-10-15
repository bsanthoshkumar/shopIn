import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 2px 3px 8px 2px lightgrey;
  padding: 5px;
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
`;

const Price = styled.div`
  font-weight: 400;
  font-size: 18px;
  margin: 10px;
`;

const ProductView = ({ product }) => (
  <StyledDiv>
    <StyledImg src={product.thumbnail} />
    <Title>{`${product.title.slice(0, 70)} ...`}</Title>
    <Price>{`₹.${product.price['current_price']}`}</Price>
  </StyledDiv>
);

export default ProductView;

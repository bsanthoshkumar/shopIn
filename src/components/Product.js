import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';

const FlexDiv = styled.div`
  display: flex;
`;

const ImageDiv = styled.div`
  width: 400px;
  height: 500px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: 100px;
  align-self: center;
`;

const StyledImage = styled.img`
  width: 200px;
  &:hover {
    border: solid 1px black;
  }
`;
const Title = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-top: 100px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  font-weight: 400;
  font-size: 18px;
  margin-top: 50px;
`;

const OldCost = styled.p`
  color: grey;
  text-decoration-line: line-through;
`;

const Percent = styled.p`
  color: orange;
`;
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ProductsAPI.getProduct(id).then(setProduct);
  }, []);

  if (product == null) {
    return <p>Loading...</p>;
  }

  return (
    <FlexDiv>
      <ImageDiv>
        <StyledImage src={product.thumbnail} />
      </ImageDiv>
      <div style={{ marginLeft: '50px' }}>
        <Title>{product.title}</Title>
        <Price>
          <p>{`₹.${product.price['current_price']}`}</p>
          <OldCost>{`₹.${product.price['before_price']}`}</OldCost>
          <Percent>{`(${product.price['savings_percent']}% off)`}</Percent>
        </Price>
      </div>
    </FlexDiv>
  );
};

export default Product;

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';
import Price from './Price';

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
        <Price price={product.price} />
      </div>
    </FlexDiv>
  );
};

export default Product;

import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductsAPI from '../api/productsApi';
import Price from './Price';
import Header from './Header';
import { useContext } from 'react';
import UserContext from '../UserContext';

const FlexDiv = styled.div`
  display: flex;
`;

const ImageDiv = styled.div`
  display: flex;
  width: 400px;
  margin: 100px;
  justify-content: center;
  padding: 100px;
  border-radius: 10px;
  box-shadow: 2px 3px 8px 2px lightgrey;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 500;
  margin-top: 100px;
`;

const CartButton = styled.button`
  margin-top: 200px;
  padding: 0px 20px;
  font-size: 30px;
  background-color: #ff4dff;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    transform: scale(1.03);
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isInCart, setCartStatus] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    ProductsAPI.getProduct(id).then(({ product, isInCart }) => {
      setProduct(product);
      setCartStatus(isInCart);
    });
  }, []);

  const addToCart = (id) =>
    ProductsAPI.addToCart(id).then(({ isInCart }) => setCartStatus(isInCart));

  const getCartButton = () =>
    isInCart ? (
      <NavLink to="/cart">
        <CartButton>Go to cart</CartButton>
      </NavLink>
    ) : (
      <CartButton onClick={() => addToCart(product.asin)}>
        Add to cart
      </CartButton>
    );

  if (product == null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />

      <FlexDiv>
        <ImageDiv>
          <img src={product.thumbnail} />
        </ImageDiv>
        <div style={{ marginLeft: '50px' }}>
          <Title>{product.title}</Title>
          <Price price={product.price} />
          {user ? (
            getCartButton(isInCart, product)
          ) : (
            <CartButton
              onClick={() => alert('Please login to add items to the cart')}
            >
              Add to cart
            </CartButton>
          )}
        </div>
      </FlexDiv>
    </div>
  );
};

export default Product;

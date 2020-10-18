import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import UserContext from '../UserContext';
import ProductsAPI from '../api/productsApi';

const cartImg = require('../images/cart.png');

const StyledHeader = styled.div`
  display: flex;
  box-shadow: 2px 3px 8px 2px lightgrey;
  margin: auto 0px;
  justify-content: space-between;
  background: white;
`;

const StyledLogo = styled.p`
  margin: 10px;
  font-size: 50px;
  color: grey;
  cursor: pointer;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 400px;
`;

const StyledCart = styled.img`
  width: 70px;
`;

const StyledBtn = styled.div`
  font-size: 20px;
  width: 80px;
  cursor: pointer;
  padding-top: 30px;
`;

const Header = ({ searchBar }) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    ProductsAPI.getUser().then((user) => setUser(user));
  }, []);

  const logout = () => {
    ProductsAPI.logout().then((user) => setUser(user));
  };

  return (
    <StyledHeader>
      <NavLink to={'/'} style={{ textDecoration: 'none' }}>
        <StyledLogo>Shop In</StyledLogo>
      </NavLink>
      {searchBar}
      <StyledDiv>
        {user ? (
          <NavLink to={'/cart'}>
            <StyledCart src={cartImg} />
          </NavLink>
        ) : (
          <StyledCart
            src={cartImg}
            onClick={() => alert('Please login to visit the cart')}
          />
        )}
        {user == null ? (
          <StyledBtn>
            <a href="http://localhost:8000/api/register">Login</a>
          </StyledBtn>
        ) : (
          <StyledBtn style={{ textDecoration: 'underline' }} onClick={logout}>
            Log out
          </StyledBtn>
        )}
      </StyledDiv>
    </StyledHeader>
  );
};

export default Header;

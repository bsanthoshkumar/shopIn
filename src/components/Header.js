import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledCart = styled.img`
  margin: 20px;
`;

const Header = ({ searchBar }) => (
  <StyledHeader>
    <NavLink to={'/'} style={{ textDecoration: 'none' }}>
      <StyledLogo>Shop In</StyledLogo>
    </NavLink>
    {searchBar}
    <NavLink to={'/cart'}>
      <StyledCart src={cartImg} />
    </NavLink>
  </StyledHeader>
);

export default Header;

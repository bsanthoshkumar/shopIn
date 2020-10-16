import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  height: 80px;
  box-shadow: 2px 3px 8px 2px lightgrey;
  margin: auto;
`;

const StyledLogo = styled.p`
  margin: 10px;
  font-size: 50px;
  color: grey;
  cursor: pointer;
`;

const Header = () => (
  <StyledHeader>
    <NavLink to={'/'} style={{ textDecoration: 'none' }}>
      <StyledLogo>Shop In</StyledLogo>
    </NavLink>
  </StyledHeader>
);

export default Header;

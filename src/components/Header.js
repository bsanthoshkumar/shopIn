import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  height: 80px;
  border-bottom: solid 1px lightgrey;
  margin: auto;
`;
const StyledLogo = styled.p`
  margin: 10px;
  font-size: 50px;
  color: grey;
`;
const Header = () => (
  <StyledHeader>
    <StyledLogo>Shop In</StyledLogo>
    
  </StyledHeader>
);

export default Header;

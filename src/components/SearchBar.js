import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearchBar = styled.input`
  border: none;
  width: 500px;
  font-size: 25px;
  border-bottom: solid 1px grey;
  margin-bottom: 30px;
  outline: none;
`;

const SearchBar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter') {
      onSubmit(text);
    }
  };

  return (
    <StyledSearchBar
      placeholder="Search products"
      value={text}
      onChange={({ target }) => setText(target.value)}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchBar;

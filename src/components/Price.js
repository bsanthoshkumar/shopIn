import React from 'react';
import styled from 'styled-components';

const PriceDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  font-weight: 400;
  font-size: 18px;
  padding-left: 10px;
`;

const OldCost = styled.p`
  color: grey;
  text-decoration-line: line-through;
`;

const Percent = styled.p`
  color: orange;
`;

const Price = ({ price }) => (
  <PriceDiv>
    <p>{`₹.${price['current_price']}`}</p>
    <OldCost>{`₹.${price['before_price']}`}</OldCost>
    <Percent>{`(${price['savings_percent']}% off)`}</Percent>
  </PriceDiv>
);

export default Price;

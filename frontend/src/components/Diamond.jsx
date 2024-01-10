import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50, -50);
  width: 160px;
`;

const Part1 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 50px;
  height: 50px;
  background-color: #999;
  transform: skew(-30deg);
  z-index: 2;
`;

const Part2 = styled.span`
  position: absolute;
  top: 0;
  left: 35px;
  display: block;
  width: 90px;
  height: 50px;
  background-color: #666;
  z-index: 1;
`;

const Part3 = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 50px;
  height: 50px;
  background-color: #999;
  transform: skew(30deg);
  z-index: 3;
`;

const Diamond = () => {

  return (
    <Body>
      <Part1 />
      <Part2 />
      <Part3 />
    </Body>
  );
};

export default Diamond;
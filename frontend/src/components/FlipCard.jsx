import React, { useState } from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const CardContainer = styled.div`
  position: relative;
  min-width: 15em;
  min-height: 8em;
  padding: 1em;
  perspective: 1000px;
  margin-bottom: 3em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  cursor: pointer;
  transform: ${({ isActive }) =>
    isActive ? "rotateY(180deg)" : "rotateY(0deg)"};
  transform-origin: center center;
`;

const Face = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375em;
  font-size: 1.2em;
  font-weight: bold;
  color: ${colors.textPrimary};
  background-color: white;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});
  overflow: hidden;
`;

const Front = styled(Face)`
  transition: color 0.5s ease-in-out, opacity 0.5s ease-in-out; // Combined transitions for clarity

  &::before {
    content: "";
    position: absolute;
    width: 300%;
    height: 300%;
    background-image: url(redRecord.jpg);
    background-size: cover;
    background-attachment: fixed;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    z-index: -1;
  }

  &:hover {
    color: white;

    &::before {
      opacity: 1;
    }
  }
`;

const Back = styled(Face)`
  color: ${colors.textPrimary};
  transform: rotateY(180deg);
  padding: 1em;
  &:hover {
    // color: ${colors.textAccent}
  }
`;

const FlipCard = ({ frontContent, backContent }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <CardContainer onClick={() => setIsActive(!isActive)}>
      <Card isActive={isActive}>
        <Front>{frontContent}</Front>
        <Back>{backContent}</Back>
      </Card>
    </CardContainer>
  );
};

export default FlipCard;

import React, { useState } from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const CardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 15em;
  min-height: 8em;
  padding: 1em;
  perspective: 80em;
  margin-bottom: 2em;

  @media (max-width: 1000px) {
    margin-bottom: 0em;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1em;
  backface-visibility: hidden;
  border-radius: 0.375em;
  font-size: 1.2em;
  font-weight: bold;
  color: ${colors.textPrimary};
  background-color: white;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});
  overflow: hidden;

  @media (max-width: 1000px) {
    height: auto;
    margin-bottom: 1em;
  }
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${colors.textPrimary};
  transform: rotateY(180deg);
  padding: 1em 1em;
  font-size: medium;
  p {
    margin: 0.25em 0; // Adds vertical spacing between paragraphs
  }
`;

const processDescription = (description) => {
  return description.split("$");
};

const FlipCard = ({ frontContent, backContent }) => {
  const [isActive, setIsActive] = useState(false);
  
  const processedBackContent = processDescription(backContent);

  return (
    <CardContainer onClick={() => setIsActive(!isActive)}>
      <Card isActive={isActive}>
        <Front>{frontContent}</Front>
        <Back>
          {processedBackContent.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Back>
      </Card>
    </CardContainer>
  );
};

export default FlipCard;

import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const Button = styled.a`
  font-weight: 600;
  text-decoration: none;
  color: ${colors.white};
  background-color: ${colors.textAccent};
  padding: 0.3em 0.5em;
  border-radius: 0.3em;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ResumeButton = () => {
  return (
    <Button
      href="https://docs.google.com/document/d/1z-wYnrEx1-lPmTEoEKhYZ5FlTAc-OuAuPKawBVdWqHY/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      title="Resume"
    >
      Resume
    </Button>
  );
};

export default ResumeButton;

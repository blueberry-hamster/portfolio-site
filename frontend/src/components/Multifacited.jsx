import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import RedDiamond from "./Diamond";
import colors from "../styles/_variables.scss";

const Section = styled.div`
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  * {
    transition: all 0.3s ease-in-out;
  }
`;
const Title = styled.h1`
  text-align: center;
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const LeftTags = styled.div`
  flex-direction: column;
`;
const RightTags = styled.div`
  flex-direction: column;
`;
const Tag = styled.div`
  width: fit-content;
  font-size: 1.2em;
  font-weight: bold;
  padding: 1.25em 1.875em;
  margin-bottom: 2em;
  background-color: white;
  position: relative;
  border-radius: 0.375em;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});

  &:hover {
    filter: drop-shadow(0.2em 0.7em 0.6em ${colors.shadowLight});
  }
`;

const Multifacited = () => {
  const tags = [
    { id: "creativity", content: "Creativity", position: "left" },
    { id: "design", content: "Design", position: "left" },
    { id: "full-stack", content: "Full-stack", position: "right" },
    { id: "collaborative", content: "Collaborative", position: "right" },
  ];

  return (
    <Section>
      <Title>Multifacited</Title>
      <Content>
        <LeftTags>
          {tags
            .filter((tag) => tag.position === "left")
            .map((tag, index) => (
              <Tag key={tag.id} >
                {tag.content}
              </Tag>
            ))}
        </LeftTags>
        <RedDiamond />
        <RightTags>
          {tags
            .filter((tag) => tag.position === "right")
            .map((tag, index) => (
              <Tag
                key={tag.id}
              >
                {tag.content}
              </Tag>
            ))}
        </RightTags>
      </Content>
    </Section>
  );
};

export default Multifacited;

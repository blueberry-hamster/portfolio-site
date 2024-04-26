import React, { useState} from "react";
import styled from "styled-components";
import RedDiamond from "./Diamond";
import FlipCard from "./FlipCard"; 

const Section = styled.div`
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2em 4em;
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
  margin-top: 15%;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  postition: relative;
  box-sizing: border-box;
  margin: 0em 4em;
  padding-top: 10em;
`;
const TagsSection = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeftTags = styled(TagsSection)`

`;
const RightTags = styled(TagsSection)`
  align-items: end;
`;

const Multifacited = () => {

  const tags = [
    {
      id: "creativity",
      title: "Creativity",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      position: "left",
    },
    {
      id: "design",
      title: "Design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      position: "left",
    },
    {
      id: "full-stack",
      title: "Full-stack",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      position: "right",
    },
    {
      id: "collaborative",
      title: "Collaborative",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      position: "right",
    },
  ];

  return (
    <Section>
      <Title>Multifacited</Title>
      <Content>
        <LeftTags>
          {tags
            .filter((tag) => tag.position === "left")
            .map((tag) => (
              <FlipCard
                key={tag.id}
                frontContent={tag.title}
                backContent={tag.description}
              />
            ))}
        </LeftTags>
        <RedDiamond />
        <RightTags>
          {tags
            .filter((tag) => tag.position === "right")
            .map((tag) => (
              <FlipCard
                key={tag.id}
                frontContent={tag.title}
                backContent={tag.description}
              />
            ))}
        </RightTags>
      </Content>
    </Section>
  );
};

export default Multifacited;

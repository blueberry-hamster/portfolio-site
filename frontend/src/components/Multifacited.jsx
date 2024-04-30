import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RedDiamond from "./Diamond";
import FlipCard from "./FlipCard"; 

const pageBreak = "1000"

const Section = styled.div`
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  
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
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 18%;
  box-sizing: border-box;
  justify-content: center;

  @media (max-width: ${pageBreak + "px"}) {
    flex-direction: column;
    align-items: center; // Centers items vertically
    justify-content: center; // Helps maintain layout integrity
    padding-top: 10%;
  }
  /* border: 2px solid red; // Temporary border to locate the element
  background-color: rgba(255, 0, 0, 0.1); // Temporary background */
`;
const TagsSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${pageBreak + "px"}) {
    align-items: center;
    box-sizing: border-box;
  }
  /* border: 2px solid red; // Temporary border to locate the element
  background-color: rgba(255, 0, 0, 0.1); // Temporary background */
`;
const LeftTags = styled(TagsSection)`
  flex: 1 1 20%; // Allows shrinking and growing but with limits
`;
const RightTags = styled(TagsSection)`
  flex: 1 1 20%; // Same as LeftTags
  align-items: end;
`;
const AllTags = styled(TagsSection)`
  width: 100%;
`
const DiamondWrapper = styled.div`
  display: flex;
  flex: 0 1 60%; // Takes the remaining space but can shrink if necessary
  max-width: 100%; // Ensure it does not exceed the content width
  height: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: ${pageBreak + "px"}) {
    height: auto;
    margin-bottom: -20%;

    .diamond {
      width: 80vw;
    }
  }
`;

const Multifacited = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // remove eventlistener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < pageBreak;
  
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
      description: "UI/UX for webapps$ 2D digital asset creation",
      position: "left",
    },
    {
      id: "full-stack",
      title: "Full-stack",
      description: "Web, JS, Python$ React, Ruby on Rails, NodeJS$ SQL MongoDB Postgres",
      position: "right",
    },
    {
      id: "collaborative",
      title: "Collaborative",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      position: "right",
    },
  ];

  const MobileLayout = () => {
    return (
      <Content>
        <DiamondWrapper>
          <RedDiamond />
        </DiamondWrapper>
        <AllTags>
          {tags
            .map((tag) => (
              <FlipCard
                key={tag.id}
                frontContent={tag.title}
                backContent={tag.description}
              />
            ))}
        </AllTags>
      </Content>
    );
  };

  const DesktopLayout = () => {
    return (
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
        <DiamondWrapper>
          <RedDiamond />
        </DiamondWrapper>
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
    );
  };

  return (
    <Section>
      <Title>Multifacited</Title>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </Section>
  );
};

export default Multifacited;

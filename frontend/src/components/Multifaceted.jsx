import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RedDiamond from "./Diamond";
import FlipCard from "./FlipCard"; 

const pageBreak = "900"

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
  text-align: left;
  width: fit-content;
  margin-top: 10%;
  p:first-child {
    margin-bottom: -1em;
    font-weight: 400;
    font-size: 0.8em;
  }
`;
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 10%;
  box-sizing: border-box;
  justify-content: center;

  @media (max-width: ${pageBreak + "px"}) {
    flex-direction: column;
    align-items: center; // Centers items vertically
    justify-content: center; // Helps maintain layout integrity
    padding-top: 10%;
  }
`;
const TagsSection = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${pageBreak + "px"}) {
    align-items: center;
    box-sizing: border-box;
  }
`;
const LeftTags = styled(TagsSection)`
  flex: 1 1 25%; // Allows shrinking and growing but with limits
  align-items: flex-end;
`;
const RightTags = styled(TagsSection)`
  flex: 1 1 25%; // Same as LeftTags
  align-items: end;
  align-items: flex-start;
`;
const AllTags = styled(TagsSection)`
  width: 100%;
`
const DiamondWrapper = styled.div`
  display: flex;
  flex: 0 1 50%; // Takes the remaining space but can shrink if necessary
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

const Multifaceted = () => {
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
     id: "full-stack",
     title: "Full-stack",
     description:
       "HTML, CSS, JavaScript, Python, Ruby $React, Ruby on Rails, Node.js $SQL, MongoDB, Postgres",
     position: "left",
   },
   {
     id: "collaboration",
     title: "Collaboration",
     description:
       "Effective in team settings $Experienced in leadership roles $Strong interpersonal communication",
     position: "left",
   },
   {
     id: "design",
     title: "Design",
     description:
       "UI/UX for web applications $creating 2D digital assets $Figma, Sketch, Adobe Photoshop, Illustrator",
     position: "right",
   },
   {
     id: "adaptability",
     title: "Adaptability",
     description:
       "Thrives in dynamic environments $Versatile skill set across multiple disciplines $Rapidly assimilates new technologies",
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
      <Title>
        <p>Uniquely</p>
        <p>Multifaceted</p>
      </Title>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </Section>
  );
};

export default Multifaceted;

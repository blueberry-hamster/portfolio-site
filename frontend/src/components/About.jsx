import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

import linkedinIcon from "../assets/linkedin.svg";
import githubIcon from "../assets/github.svg";
import ResumeButton from "./ResumeButton";
import avatar from "../assets/meavatar.png";

const pageBreak = "900";

const AboutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  padding: 3em;
  box-sizing: border-box;
`;

const Title = styled.h1`
  p:first-child {
    margin-bottom: -1em;
    font-weight: 400;
    font-size: 0.8em;
  }

  @media (max-width: ${pageBreak + "px"}) {
    margin-bottom: -0.5em;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  p {
    max-width: 30em;
  }

  img {
    width: 20em;
    filter: brightness(1.15) saturate(1.3);
  }

  @media (max-width: ${pageBreak + "px"}) {
    flex-direction: column;

    img {
      width: 15em;
    }
  }
`;

const LinksContainer = styled.div`
  margin-top: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; // Space between icons

  @media (max-width: ${pageBreak + "px"}) {
    margin-top: 0;
  }
`;

const SocialIcon = styled.img`
  width: 30px; // Set the size as needed
  height: 30px; // Set the size as needed
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const AboutMe = () => {
  return (
    <AboutContainer>
      <Title>
        <p>Just a Little</p>
        <p>About Me</p>
      </Title>
      <Content>
        <p className="serif">
          Hello, I'm Jiani (Jenny)! I specialize in frontend development and
          have a good handle on backend technologies, too. I'm passionate about
          crafting streamlined, engaging user experiences and functional
          designs.
          <br />
          <br />
          Outside of work, I love exploring local farmer's markets and
          experimenting with new dishes. Take a look around my portfolio to get
          a sense of my work, and let's chat about opportunities for me to join
          your team!
        </p>
        <img src={avatar} alt="Jiani avatar" />
      </Content>
      <LinksContainer>
        <ResumeButton />
        <a
          href="https://github.com/blueberry-hamster"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <SocialIcon src={githubIcon} alt="GitHub" />
        </a>
        <a
          href="https://www.linkedin.com/in/jiani-fan/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <SocialIcon src={linkedinIcon} alt="LinkedIn" />
        </a>
      </LinksContainer>
    </AboutContainer>
  );
};

export default AboutMe;

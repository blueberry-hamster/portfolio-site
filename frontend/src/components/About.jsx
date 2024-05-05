import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

import linkedinIcon from "../assets/linkedin.svg"; 
import githubIcon from "../assets/github.svg"; 
import resumeIcon from "../assets/resume.png"

const AboutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 3em;
  box-sizing: border-box;
`;

const Title = styled.h1`
  p:first-child {
    margin-bottom: -1em;
    font-weight: 400;
    font-size: 0.8em;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  p {
    max-width: 35em;
  }
`;

const LinksContainer = styled.div`
  margin-top: 1.5em;
  display: flex;
  justify-content: center;
  gap: 20px; // Space between icons
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
          Hello, I'm Jenny! I specialize in frontend development and have a good
          handle on backend technologies too. I'm passionate about crafting
          streamlined, engaging user experiences and functional designs.
          <br />
          <br />
          Outside of work, I love exploring local farmer's markets and
          experimenting with new dishes. Take a look around my portfolio to get
          a sense of my work, and let's chat about opportunities for me to join
          your team!
        </p>
      </Content>
      <LinksContainer>
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" title="GitHub">
          <SocialIcon src={githubIcon} alt="GitHub" />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <SocialIcon src={linkedinIcon} alt="LinkedIn" />
        </a>
        <a href="your-resume-link" target="_blank" rel="noopener noreferrer" title="Resume">
          <SocialIcon src={resumeIcon} alt="Resume" />
        </a>
      </LinksContainer>
    </AboutContainer>
  );
};

export default AboutMe;

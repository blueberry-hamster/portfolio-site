import React from "react";
import styled from "styled-components";
import Landing from "./components/Landing";
import HaikuComponent from "./components/HaikuComponent";
import Navbar from "./components/Navbar";
import AboutMe from "./components/About";
import Timeline from "./components/Timeline";
import Multifaceted from "./components/Multifaceted";
import ContactMe from "./components/Contact";
import Credits from "./components/Credits";

const Page = styled.div`
  overflow-x: hidden;
  overflow-y: scroll; // Ensure the container allows scrolling
  /* scroll-snap-type: y proximity; // Enable vertical snapping with a relaxed behavior */
  box-sizing: border-box;
  /* height: 100vh; // This will make the page container fill the viewport */
`;

const Section = styled.div`
  scroll-snap-align: start; // Aligns the top of the section with the top of the viewport
`;

const PaddingL = styled.div`
  height: 25vh;
  background-color: white;
`;
const PaddingM = styled.div`
  height: 15vh;
  background-color: white;
`;
const PaddingS = styled.div`
  height: 10vh;
  background-color: white;
`;

function App() {
  return (
    <Page>
      <Navbar />
      <Section id="landing">
        <Landing />
      </Section>
      <PaddingM />
      <Section id="about-me">
        <AboutMe />
      </Section>
      <PaddingS />
      <Section id="multifaceted">
        <Multifaceted />
      </Section>
      <PaddingS />
      <Section id="timeline">
        <Timeline />
      </Section>
      <PaddingS />
      <Section id="haiku">
        <HaikuComponent />
      </Section>
      <PaddingL />
      <Section id="contact">
        <ContactMe />
      </Section>
      <Section id="credits">
        <Credits />
      </Section>
    </Page>
  );
}

export default App;

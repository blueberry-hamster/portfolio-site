import React from "react";
import styled from "styled-components";
import Landing from "./components/Landing";
import HaikuComponent from "./components/Haiku";
import Navbar from "./components/Navbar";
import AboutMe from"./components/About";
import Timeline from "./components/Timeline";
import Multifacited from "./components/Multifaceted";
import ContactMe from "./components/Contact";
import Credits from "./components/Credits";

const Page = styled.div`
  overflow-x: hidden;
  box-sizing: border-box;
`
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
      <div id="landing">
        <Landing />
      </div>
      <div id="about-me">
        <AboutMe />
      </div>
        {/* <PaddingS />        */}
      <div id="multifaceted">
        <Multifacited />
      </div>
      <PaddingS />
      <div id="timeline">
        <Timeline />
      </div>
      <PaddingS />
      <div id="haiku">
        <HaikuComponent />
      </div>
      <PaddingL />    
        <div id="contact">
          <ContactMe />
        </div>
      <div id="credits">
        <Credits />
      </div>
    </ Page>
  );
}

export default App;

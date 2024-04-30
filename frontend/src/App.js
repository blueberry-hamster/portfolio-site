import React from "react";
import styled from "styled-components";
import Landing from "./components/Landing";
import HaikuComponent from "./components/Haiku";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Multifacited from "./components/Multifacited";
import Credits from "./components/Credits";

const Page = styled.div`
  overflow-x: hidden;
  box-sizing: border-box;
`
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
      <PaddingS />
      <div id="cube">
        <Multifacited />
      </div>
      <PaddingS />
      <div id="timeline">
        <Timeline />
      </div>
      <PaddingM />
      <div id="haiku">
        <HaikuComponent />
      </div>
      <PaddingS />
      <div id="credits">
        <Credits />
      </div>
    </ Page>
  );
}

export default App;

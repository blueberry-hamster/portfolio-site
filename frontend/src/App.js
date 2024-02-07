import React from "react";
import styled from "styled-components";
import Landing from "./components/Landing";
import HaikuComponent from "./components/Haiku";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Multifacited from "./components/Multifacited";

const Page = styled.div`
  overflow-x: hidden;
`
const Padding = styled.div`
  height: 25vh;
  background-color: white;
`;

function App() {
  return (
    <Page>
      <Navbar />
      <div id="landing">
        <Landing />
      </div>
      <Padding />
      <div id="cube">
        <Multifacited />
      </div>
      <Padding />
      <div id="timeline">
        <Timeline />
      </div>
      <Padding />
      <div id="haiku">
        <HaikuComponent />
      </div>
      <Padding />
      
    </ Page>
  );
}

export default App;

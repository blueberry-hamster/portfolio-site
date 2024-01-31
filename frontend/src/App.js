import React from "react";
import styled from "styled-components";
import Landing from "./components/Landing";
import HaikuComponent from "./components/Haiku";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";

const Padding = styled.div`
  height: 25vh;
  background-color: white;
`;

function App() {
  return (
    <>
      <Navbar />
      <div id="section1">
        <Landing />
      </div>
      <Padding />
      <div id="section2">
        <Timeline />
      </div>
      <Padding />
      <div id="section3">
        <HaikuComponent />
      </div>
      <Padding />
      
    </>
  );
}

export default App;

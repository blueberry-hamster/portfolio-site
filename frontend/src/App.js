import React from "react";
import styled from "styled-components";
import Landing from "./components/Landing";
import HaikuComponent from "./components/Haiku";
import Navbar from "./components/Navbar";

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
        <HaikuComponent />
      </div>
      <Padding />
      {/* If you have more sections, continue adding them with their respective IDs */}
    </>
  );
}

export default App;

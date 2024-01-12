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
      <Landing />
      <Padding />
      <HaikuComponent />
      <Padding />
    </>
  );
}

export default App;
